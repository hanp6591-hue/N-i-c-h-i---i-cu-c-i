import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface LoginProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  isFirstVisit?: boolean;
}

export const LoginProfileModal: React.FC<LoginProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  isFirstVisit = false
}) => {
  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [birthDate, setBirthDate] = useState(userProfile?.birthDate || '2002-05-15');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [currentOccupation, setCurrentOccupation] = useState(
    userProfile?.currentOccupation || 'Sinh viên năm cuối / Mới tốt nghiệp'
  );
  const [gender, setGender] = useState<'Nam' | 'Nữ' | 'Khác'>(userProfile?.gender || 'Nam');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
  const [portfolioUrl, setPortfolioUrl] = useState(userProfile?.portfolioUrl || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const profile: UserProfile = {
      fullName: fullName.trim(),
      birthDate,
      email: email.trim(),
      currentOccupation,
      gender,
      phoneNumber: phoneNumber.trim() || undefined,
      portfolioUrl: portfolioUrl.trim() || undefined,
      isRegistered: true
    };

    onSaveProfile(profile);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleFillDemoProfile = () => {
    setFullName('Nguyễn Thị Mai Lan');
    setBirthDate('2003-08-20');
    setEmail('mailan.nguyen@example.com');
    setCurrentOccupation('Sinh viên mới tốt nghiệp - Chưa có kinh nghiệm');
    setGender('Nữ');
    setPhoneNumber('0912 345 678');
    setPortfolioUrl('https://sites.google.com/view/mailan-portfolio');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-white/60 overflow-hidden my-0 sm:my-6 max-h-[92vh] sm:max-h-[85vh] flex flex-col transition-all transform animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-200"
        style={{
          boxShadow: '0 20px 40px -10px rgba(152, 84, 99, 0.25), 0 0 25px rgba(241, 142, 144, 0.15)'
        }}
      >
        {/* Modal Top Header with custom brand color */}
        <div 
          className="p-5 sm:p-6 text-white relative overflow-hidden flex-shrink-0"
          style={{ 
            background: 'linear-gradient(135deg, #1E293B 0%, #2A384D 100%)',
            borderBottom: '2px solid #DEB5D7'
          }}
        >
          {/* Mobile pull indicator */}
          <div className="w-12 h-1 bg-white/40 rounded-full mx-auto -mt-2 mb-2 sm:hidden" />

          {/* Decorative subtle gradient overlay with #BFAEE3 and #FFD273 */}
          <div 
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ backgroundColor: '#BFAEE3' }}
          />
          <div 
            className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-2xl opacity-30 pointer-events-none"
            style={{ backgroundColor: '#FFD273' }}
          />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2 shadow-2xs"
                style={{ backgroundColor: '#FEE686', color: '#4d4608' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-900" />
                {isFirstVisit ? 'Chào mừng bạn đến với ứng dụng' : 'Hồ sơ cá nhân & Đăng nhập'}
              </div>
              <h3 className="text-base sm:text-xl font-extrabold tracking-tight">
                {userProfile?.isRegistered ? 'Cập nhật thông tin cá nhân' : 'Đăng nhập thông tin cá nhân'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
                Thông tin giúp tự động kết nối doanh nghiệp phù hợp, hỗ trợ nộp hồ sơ 1 chạm và bảo vệ danh tính 100%.
              </p>
            </div>

            <button
              id="btn-close-login-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Form */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {saveSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div 
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-slate-900 shadow-md animate-bounce"
                style={{ backgroundColor: '#FFD273' }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Đăng nhập thông tin thành công!
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Hồ sơ của bạn đã được cập nhật sẵn sàng để ứng tuyển trực tiếp không qua trung gian.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Demo Fill Option */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
                <span className="text-slate-600 font-medium">Bạn muốn điền thử thông tin nhanh?</span>
                <button
                  type="button"
                  onClick={handleFillDemoProfile}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs border border-[#FFD273]"
                  style={{ backgroundColor: '#FFD273', color: '#1E293B' }}
                >
                  ⚡ Điền mẫu sinh viên
                </button>
              </div>

              {/* 1. Họ và tên */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-login-fullname"
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-rose-300 focus:outline-hidden transition-all bg-white"
                  />
                </div>
              </div>

              {/* 2. Ngày tháng năm sinh & Giới tính */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngày tháng năm sinh <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="input-login-birthdate"
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs font-medium focus:ring-2 focus:ring-rose-300 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Giới tính <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                    {(['Nam', 'Nữ', 'Khác'] as const).map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setGender(g)}
                        className={`py-2.5 min-h-[44px] rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${
                          gender === g
                            ? 'border-[#FFD273] shadow-2xs font-extrabold'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                        style={gender === g ? { backgroundColor: '#FEE686', color: '#1E293B' } : undefined}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    placeholder="email.ungvien@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#BFAEE3] focus:outline-hidden transition-all bg-white"
                  />
                </div>
              </div>

              {/* 4. Công việc hiện tại */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Công việc / Tình trạng hiện tại <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    id="select-login-occupation"
                    value={currentOccupation}
                    onChange={(e) => setCurrentOccupation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#BFAEE3] focus:outline-hidden bg-white text-slate-800 cursor-pointer"
                  >
                    <option value="Sinh viên năm cuối / Mới tốt nghiệp">
                      🎓 Sinh viên năm cuối / Mới tốt nghiệp (Cần tìm việc / thực tập)
                    </option>
                    <option value="Sinh viên mới tốt nghiệp - Chưa có kinh nghiệm">
                      🌱 Sinh viên mới tốt nghiệp - Chưa có kinh nghiệm
                    </option>
                    <option value="Học sinh cấp 3 / Trung cấp / Cao đẳng">
                      🎒 Học sinh cấp 3 / Trung cấp / Cao đẳng (Muốn rèn luyện sớm)
                    </option>
                    <option value="Chưa có kinh nghiệm - Muốn đào tạo từ đầu">
                      ✨ Chưa có kinh nghiệm - Muốn được đào tạo từ đầu
                    </option>
                    <option value="Đang tìm việc làm - Mọi lứa tuổi">
                      🔍 Đang tìm kiếm việc làm (Mọi lứa tuổi)
                    </option>
                    <option value="Người muốn chuyển đổi nghề nghiệp">
                      🔄 Muốn chuyển đổi nghề nghiệp sang lĩnh vực mới
                    </option>
                    <option value="Đã có kinh nghiệm (1-2 năm trở lên)">
                      ⭐ Đã có kinh nghiệm (1-2 năm trở lên)
                    </option>
                  </select>
                </div>
              </div>

              {/* 5. Số điện thoại & Link Google Sites Portfolio (tùy chọn) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Số điện thoại liên hệ (tùy chọn):
                  </label>
                  <input
                    type="tel"
                    placeholder="09xx xxx xxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Link Portfolio / Google Sites (tùy chọn):
                  </label>
                  <input
                    type="url"
                    placeholder="https://sites.google.com/view/..."
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-base sm:text-xs bg-white"
                  />
                </div>
              </div>

              {/* Anti-Scam Assurance */}
              <div 
                className="p-3 rounded-xl border flex items-start gap-2 text-[11px]"
                style={{ backgroundColor: 'rgba(254, 230, 134, 0.35)', borderColor: '#FFD273', color: '#4a3b05' }}
              >
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#FFD273' }} />
                <span>
                  <strong>Cam kết bảo mật 100%:</strong> Thông tin cá nhân của bạn chỉ dùng để kết nối trực tiếp với nhà tuyển dụng được xác thực, không cung cấp cho bên thứ ba, không bị làm phiền bởi các đơn vị môi giới trung gian.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer order-2 sm:order-1 flex items-center justify-center"
                >
                  Để sau / Xem việc làm trước
                </button>

                <button
                  id="btn-submit-login-profile"
                  type="submit"
                  className="px-6 py-3 min-h-[48px] rounded-xl font-bold text-sm text-slate-900 shadow-md transition-all hover:opacity-90 active:scale-98 flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 border border-[#FFD273]"
                  style={{ backgroundColor: '#FFD273' }}
                >
                  <UserCheck className="w-4 h-4" />
                  {userProfile?.isRegistered ? 'Lưu cập nhật' : 'Xác nhận đăng nhập'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
