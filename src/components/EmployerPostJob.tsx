import React, { useState } from 'react';
import { Job, Industry } from '../types';
import { 
  Building2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail, 
  Layers, 
  GraduationCap,
  AlertTriangle,
  Briefcase
} from 'lucide-react';

interface EmployerPostJobProps {
  industries: Industry[];
  onAddNewJob: (job: Job) => void;
  onNavigateToJobs: () => void;
}

export const EmployerPostJob: React.FC<EmployerPostJobProps> = ({
  industries,
  onAddNewJob,
  onNavigateToJobs
}) => {
  const [companyName, setCompanyName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [title, setTitle] = useState('');
  const [industryCode, setIndustryCode] = useState(industries[0]?.code || 'CNKT');
  const [subIndustry, setSubIndustry] = useState('');
  const [experienceRequired, setExperienceRequired] = useState<'no-experience' | '1-2-years' | 'above-2-years'>('no-experience');
  const [city, setCity] = useState('Hà Nội');
  const [address, setAddress] = useState('');
  const [salaryType, setSalaryType] = useState<'fixed' | 'negotiable'>('fixed');
  const [salaryMin, setSalaryMin] = useState(7);
  const [salaryMax, setSalaryMax] = useState(12);
  const [jobType, setJobType] = useState<'full-time' | 'part-time' | 'internship' | 'long-term'>('full-time');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [agreedAntiFraud, setAgreedAntiFraud] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdJobTitle, setCreatedJobTitle] = useState('');

  // Selected industry object
  const currentIndustryObj = industries.find(i => i.code === industryCode);
  const availableSubIndustries = currentIndustryObj?.subIndustries || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedAntiFraud) {
      alert('Vui lòng tích cam kết 100% không thu bất kỳ khoản phí nào của người tìm việc.');
      return;
    }

    const indObj = industries.find(i => i.code === industryCode);
    const indName = indObj ? indObj.name : 'Khối ngành kỹ thuật';

    // Parse bullet points
    const descArray = description.trim() 
      ? description.split('\n').filter(s => s.trim().length > 0)
      : ['Tham gia vào các dự án thực tế tại doanh nghiệp', 'Được đào tạo và hướng dẫn từ đội ngũ chuyên môn', 'Báo cáo công việc định kỳ'];

    const reqArray = requirements.trim()
      ? requirements.split('\n').filter(s => s.trim().length > 0)
      : ['Tinh thần cầu tiến, nhiệt huyết và ham học hỏi', 'Có kỹ năng giao tiếp và làm việc nhóm tốt', 'Chấp nhận sinh viên mới ra trường hoặc chưa có kinh nghiệm'];

    const benefitArray = benefits.trim()
      ? benefits.split('\n').filter(s => s.trim().length > 0)
      : ['Lương thưởng cạnh tranh, xét tăng lương định kỳ', 'Đóng BHXH, BHYT đầy đủ theo quy định pháp luật', 'Môi trường trẻ trung, cởi mở, cơ hội thăng tiến rõ ràng'];

    const newJob: Job = {
      id: `job-emp-${Date.now()}`,
      title: title.trim(),
      companyName: companyName.trim(),
      companyLogo: '',
      industryCode: industryCode,
      industryName: indName,
      city: city,
      address: address.trim() || `${city}`,
      salaryMin: salaryType === 'negotiable' ? 0 : Number(salaryMin),
      salaryMax: salaryType === 'negotiable' ? 0 : Number(salaryMax),
      salaryText: salaryType === 'negotiable' ? 'Thỏa thuận theo năng lực' : `${salaryMin} - ${salaryMax} triệu/tháng`,
      experienceRequired: experienceRequired,
      experienceText: experienceRequired === 'no-experience' 
        ? 'Không cần kinh nghiệm (Được đào tạo từ đầu)' 
        : experienceRequired === '1-2-years' 
          ? '1 - 2 năm kinh nghiệm' 
          : 'Trên 2 năm kinh nghiệm',
      jobType: jobType,
      isVerifiedDirect: true,
      postedDate: 'Vừa đăng',
      deadline: 'Còn 30 ngày',
      description: descArray,
      requirements: reqArray,
      benefits: benefitArray,
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      trainingProvided: experienceRequired === 'no-experience',
      directEmployerCommitment: 'Cam kết 100% tuyển dụng trực tiếp, tuyệt đối không thu bất kỳ chi phí nào của ứng viên.',
      tags: [
        industryCode,
        subIndustry || (availableSubIndustries[0] || 'Chuyên môn'),
        experienceRequired === 'no-experience' ? 'Đào tạo từ đầu' : 'Có kinh nghiệm',
        city
      ]
    };

    onAddNewJob(newJob);
    setCreatedJobTitle(newJob.title);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-200">
        <div 
          className="rounded-[24px] p-6 sm:p-10 text-center shadow-xl border"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#DEB5D7',
            boxShadow: '0 20px 40px -10px rgba(191, 174, 227, 0.4)'
          }}
        >
          <div 
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-slate-900 mb-4 shadow-md"
            style={{ backgroundColor: '#FFD273' }}
          >
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: '#FEE686', color: '#4a3b05' }}
          >
            <ShieldCheck className="w-4 h-4 text-amber-800" /> Xác minh trực tiếp thành công
          </span>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            Đăng tin tuyển dụng thành công!
          </h2>

          <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
            Tin tuyển dụng cho vị trí <strong>"{createdJobTitle}"</strong> của <strong>{companyName}</strong> đã được hệ thống kiểm duyệt và hiển thị trực tiếp đến hàng nghìn ứng viên & sinh viên.
          </p>

          <div 
            className="p-4 rounded-[16px] mb-6 text-left text-xs text-slate-700 space-y-1.5 border"
            style={{ backgroundColor: '#FEC5E6', borderColor: '#DEB5D7' }}
          >
            <div className="font-bold flex items-center gap-1.5 text-slate-900">
              <Sparkles className="w-4 h-4 text-purple-900" /> Cam kết bảo vệ quyền lợi ứng viên:
            </div>
            <p className="leading-snug">
              • Tin tuyển dụng của bạn được gắn huy hiệu <strong>"100% Tuyển trực tiếp - 0đ chi phí"</strong>.
            </p>
            <p className="leading-snug">
              • Ứng viên sẽ gửi hồ sơ, Portfolio và liên hệ trực tiếp qua Email ({contactEmail || 'công ty'}) và Số điện thoại ({contactPhone || 'công ty'}).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTitle('');
                setDescription('');
                setRequirements('');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Đăng thêm tin khác
            </button>
            <button
              onClick={onNavigateToJobs}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-slate-900 text-xs font-bold shadow-md transition-all hover:opacity-90 active:scale-98 cursor-pointer flex items-center justify-center gap-2 border border-[#FFD273]"
              style={{ backgroundColor: '#FFD273' }}
            >
              <Briefcase className="w-4 h-4" /> Xem tin tuyển dụng trên trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner Intro with Branded Pastel Palette */}
      <div 
        className="rounded-[24px] p-6 sm:p-8 relative overflow-hidden shadow-lg border"
        style={{
          background: 'linear-gradient(135deg, #FFD273 0%, #FEE686 40%, #FEC5E6 75%, #BFAEE3 100%)',
          borderColor: '#DEB5D7'
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs"
              style={{ backgroundColor: '#FFD273', color: '#3d2b02' }}
            >
              <Building2 className="w-3.5 h-3.5" /> Dành cho Doanh Nghiệp & Nhà Tuyển Dụng
            </span>
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#FEE686', color: '#4a3b05' }}
            >
              ★ Miễn phí 100%
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Đăng Tin Tuyển Dụng Trực Tiếp
          </h1>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            Kết nối trực tiếp với nguồn nhân lực trẻ, sinh viên mới ra trường năng động và người lao động mọi lứa tuổi. <strong>Tuyệt đối không trung gian, không môi giới</strong>, tạo dựng niềm tin thương hiệu uy tín.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-amber-800" /> Tiếp cận nhanh
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-amber-800" /> Tiếp nhận hồ sơ trực tiếp
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-amber-800" /> Xác thực doanh nghiệp uy tín
            </span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-[24px] p-5 sm:p-8 shadow-xl border border-slate-200/80 space-y-6"
        style={{
          boxShadow: '0 12px 35px -8px rgba(191, 174, 227, 0.35)'
        }}
      >
        {/* Step 1: Enterprise Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-900 text-xs font-bold"
              style={{ backgroundColor: '#FFD273' }}
            >
              1
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Thông tin Doanh nghiệp / Đơn vị tuyển dụng
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên công ty / Doanh nghiệp <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Công ty TNHH Giải Pháp Công Nghệ Toàn Cầu"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mã số thuế / Giấy phép kinh doanh <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 010892xxxx (Xác thực chống giả mạo)"
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                🛡️ Mã số thuế giúp bảo vệ ứng viên khỏi các đơn vị mạo danh và công ty "ma".
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Job details */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-900 text-xs font-bold"
              style={{ backgroundColor: '#FFD273' }}
            >
              2
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Chi tiết Vị trí Tuyển dụng
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Chức danh / Tiêu đề công việc <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Kỹ sư Lập trình Web Frontend (Chấp nhận Thực tập / Mới tốt nghiệp)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Industry */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> Khối ngành chính <span className="text-rose-500">*</span>
              </label>
              <select
                value={industryCode}
                onChange={(e) => {
                  setIndustryCode(e.target.value);
                  setSubIndustry('');
                }}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs sm:text-sm bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              >
                {industries.map((ind) => (
                  <option key={ind.code} value={ind.code}>
                    {ind.code} - {ind.shortName}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-industry */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" /> Ngành con chi tiết
              </label>
              <select
                value={subIndustry}
                onChange={(e) => setSubIndustry(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs sm:text-sm bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              >
                <option value="">Tự động theo khối ngành</option>
                {availableSubIndustries.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Yêu cầu kinh nghiệm <span className="text-rose-500">*</span>
              </label>
              <select
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value as any)}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs sm:text-sm bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              >
                <option value="no-experience">Chưa có kinh nghiệm (Đào tạo từ đầu)</option>
                <option value="1-2-years">1 - 2 năm kinh nghiệm</option>
                <option value="above-2-years">Trên 2 năm kinh nghiệm</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Tỉnh / Thành phố <span className="text-rose-500">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs sm:text-sm bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Toàn quốc">Toàn quốc / Nhiều chi nhánh</option>
              </select>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Địa chỉ cụ thể nơi làm việc <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Tầng 6, Tòa nhà Techno, Số 18 đường Duy Tân, Cầu Giấy"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>
          </div>

          {/* Salary & Job Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Hình thức lương
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSalaryType('fixed')}
                  className={`flex-1 py-2.5 min-h-[44px] rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    salaryType === 'fixed'
                      ? 'border-[#FFD273] shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                  style={salaryType === 'fixed' ? { backgroundColor: '#FEE686', color: '#1E293B' } : undefined}
                >
                  Khoảng lương cụ thể
                </button>
                <button
                  type="button"
                  onClick={() => setSalaryType('negotiable')}
                  className={`flex-1 py-2.5 min-h-[44px] rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    salaryType === 'negotiable'
                      ? 'border-[#FFD273] shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                  style={salaryType === 'negotiable' ? { backgroundColor: '#FEE686', color: '#1E293B' } : undefined}
                >
                  Thỏa thuận
                </button>
              </div>
            </div>

            {salaryType === 'fixed' ? (
              <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lương tối thiểu (Triệu/tháng)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lương tối đa (Triệu/tháng)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                  />
                </div>
              </div>
            ) : (
              <div className="sm:col-span-2 flex items-center">
                <p className="text-xs text-slate-500 italic">
                  💡 Mức lương sẽ được thương lượng theo năng lực và đồ án thực tế của ứng viên trong buổi phỏng vấn.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Job Description, Requirements, Benefits */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-900 text-xs font-bold"
              style={{ backgroundColor: '#FFD273' }}
            >
              3
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Mô tả công việc & Quyền lợi
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mô tả công việc (Mỗi ý xuống một dòng) <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Ví dụ:&#10;• Tham gia hỗ trợ các dự án phát triển phần mềm/dịch vụ của công ty&#10;• Học việc và thực hành cùng các chuyên viên kỳ cựu&#10;• Phối hợp hỗ trợ khách hàng và vận hành hệ thống"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yêu cầu ứng viên (Mỗi ý xuống một dòng)
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ:&#10;• Có tinh thần trách nhiệm, chủ động học hỏi&#10;• Biết cơ bản về chuyên ngành hoặc có đồ án tốt nghiệp liên quan"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quyền lợi & Phúc lợi (Mỗi ý xuống một dòng)
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ:&#10;• Đào tạo 1-1 có phụ cấp ngay từ tháng đầu&#10;• Xét duyệt lên nhân viên chính thức sau 2 tháng&#10;• Du lịch, teambuilding, thưởng dự án"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Contact & Direct Application Details */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-900 text-xs font-bold"
              style={{ backgroundColor: '#FFD273' }}
            >
              4
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Thông tin tiếp nhận hồ sơ trực tiếp
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Người phụ trách tuyển dụng
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Ms. Nguyễn Mai (HR Manager)"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email nhận CV trực tiếp <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="tuyendung@congty.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Điện thoại / Hotline / Zalo
              </label>
              <input
                type="text"
                placeholder="09xx xxx xxx"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
              />
            </div>
          </div>
        </div>

        {/* Anti-Fraud Strict Commitment Banner */}
        <div 
          className="p-4 sm:p-5 rounded-[18px] border space-y-2.5"
          style={{
            backgroundColor: 'rgba(254, 230, 134, 0.35)',
            borderColor: '#FFD273'
          }}
        >
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs sm:text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <span>Cam kết vàng về tính minh bạch & phòng chống gian lận</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            Nền tảng <strong>"Nối cơ hội - Đổi cuộc đời"</strong> hoạt động vì cộng đồng, bảo vệ người tìm việc mọi lứa tuổi và sinh viên. Bằng việc đăng tin tuyển dụng, doanh nghiệp cam kết tuân thủ nghiêm ngặt các quy tắc tuyển dụng đạo đức:
          </p>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="check-employer-antifraud"
              type="checkbox"
              required
              checked={agreedAntiFraud}
              onChange={(e) => setAgreedAntiFraud(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="check-employer-antifraud" className="text-xs font-bold text-slate-800 leading-snug cursor-pointer select-none">
              Tôi cam kết 100% doanh nghiệp <strong>tuyệt đối KHÔNG thu bất kỳ khoản phí nào</strong> (phí hồ sơ, đồng phục, cọc tiền), KHÔNG bán khóa học, KHÔNG yêu cầu nạp tiền làm nhiệm vụ. Nếu vi phạm, doanh nghiệp sẽ bị xóa tài khoản và đưa vào danh sách đen cảnh báo cộng đồng.
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onNavigateToJobs}
            className="px-5 py-2.5 min-h-[44px] rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            disabled={!agreedAntiFraud}
            className="px-7 py-3 min-h-[48px] rounded-xl text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:opacity-95 active:scale-98 disabled:opacity-50 border border-[#FFD273]"
            style={{ backgroundColor: '#FFD273' }}
          >
            <Send className="w-4 h-4" />
            <span>Xác nhận & Đăng tin tuyển dụng</span>
          </button>
        </div>
      </form>
    </div>
  );
};
