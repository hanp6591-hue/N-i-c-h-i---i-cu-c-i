import React, { useState } from 'react';
import { JobAlert, Industry } from '../types';
import { 
  X, 
  Bell, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Building2,
  DollarSign,
  GraduationCap
} from 'lucide-react';

export interface JobAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: JobAlert[];
  onAddAlert: (alert: JobAlert) => void;
  onRemoveAlert: (alertId: string) => void;
  industries: Industry[];
}

export const JobAlertsModal: React.FC<JobAlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onAddAlert,
  onRemoveAlert,
  industries
}) => {
  // New alert form state
  const [alertKeyword, setAlertKeyword] = useState('');
  const [alertIndustry, setAlertIndustry] = useState('CNKT');
  const [alertCity, setAlertCity] = useState('Hà Nội');
  const [alertSalary, setAlertSalary] = useState('7-10 triệu');
  const [alertExp, setAlertExp] = useState('Không cần kinh nghiệm');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertAddedSuccess, setAlertAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;

    const newAlert: JobAlert = {
      id: `alert-${Date.now()}`,
      keyword: alertKeyword.trim() || 'Tất cả vị trí',
      industryCode: alertIndustry,
      city: alertCity,
      salaryRange: alertSalary,
      experienceRequired: alertExp,
      userEmail: alertEmail.trim(),
      frequency: 'Hàng ngày',
      active: true,
      createdDate: new Date().toLocaleDateString('vi-VN')
    };

    onAddAlert(newAlert);
    setAlertAddedSuccess(true);
    setTimeout(() => {
      setAlertAddedSuccess(false);
      setAlertKeyword('');
      setAlertEmail('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-0 sm:my-6 max-h-[92vh] sm:max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-alerts-title"
      >
        {/* Modal Header: Độc lập chỉ dành riêng cho Thông báo việc làm */}
        <div 
          className="text-white p-4 sm:p-5 sm:px-6 flex items-center justify-between flex-shrink-0"
          style={{ 
            background: 'linear-gradient(135deg, #1E293B 0%, #28374D 100%)',
            borderBottom: '2px solid #FEC5E6'
          }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs"
              style={{ backgroundColor: '#FEC5E6', color: '#1E293B' }}
            >
              <Bell className="w-5 h-5 fill-current text-slate-900" />
            </div>
            <div>
              <h2 id="job-alerts-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Thông báo việc làm</span>
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-black shadow-2xs"
                  style={{ backgroundColor: '#FEC5E6', color: '#1E293B' }}
                >
                  {alerts.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-300">
                Nhận tin tuyển dụng mới tức thì từ doanh nghiệp trực tiếp theo tiêu chí của bạn
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label="Đóng cửa sổ thông báo việc làm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Chỉ hiển thị chức năng chuông báo và cài đặt thông báo */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Section 1: Form thiết lập chuông báo mới */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Thiết lập chuông báo việc làm mới tức thì
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hệ thống sẽ tự động quét và gửi thông báo cơ hội việc làm phù hợp đến bạn ngay khi doanh nghiệp đăng tuyển mới (100% tuyển trực tiếp, 0đ chi phí).
            </p>

            {alertAddedSuccess ? (
              <div 
                className="p-3.5 border rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in"
                style={{ backgroundColor: '#FEE686', borderColor: '#FFD273', color: '#3d2b02' }}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Đã lưu cài đặt thông báo việc làm thành công! Hệ thống sẽ gửi thông báo mới nhất cho bạn.</span>
              </div>
            ) : (
              <form onSubmit={handleCreateAlert} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Từ khóa vị trí mong muốn:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Kho vận, Thực tập sinh, Kế toán, Lập trình..."
                      value={alertKeyword}
                      onChange={(e) => setAlertKeyword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-purple-700" />
                      Khối ngành ưu tiên:
                    </label>
                    <select
                      value={alertIndustry}
                      onChange={(e) => setAlertIndustry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                    >
                      {industries.map((ind) => (
                        <option key={ind.code} value={ind.code}>
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      Khu vực:
                    </label>
                    <select
                      value={alertCity}
                      onChange={(e) => setAlertCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Toàn quốc">Toàn quốc</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                      Yêu cầu kinh nghiệm:
                    </label>
                    <select
                      value={alertExp}
                      onChange={(e) => setAlertExp(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                    >
                      <option value="Không cần kinh nghiệm">🌱 Không cần kinh nghiệm</option>
                      <option value="Có kinh nghiệm">Có kinh nghiệm</option>
                      <option value="Tất cả">Tất cả mức kinh nghiệm</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email nhận tin <span className="text-rose-500">*</span>:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@cuaban.com"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-slate-900 font-bold text-xs shadow-xs transition-all hover:opacity-90 cursor-pointer flex items-center gap-1.5 border border-[#DEB5D7]"
                    style={{ backgroundColor: '#FEC5E6' }}
                  >
                    <Plus className="w-3.5 h-3.5" /> Tạo thông báo việc làm mới
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Section 2: Danh sách các chuông báo đang hoạt động */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-600" />
                Danh sách chuông báo đang hoạt động ({alerts.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                Tần suất: Gửi ngay khi có tin mới
              </span>
            </div>

            {alerts.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 text-center">
                <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-slate-600 font-medium">
                  Bạn chưa có chuông báo nào đang bật.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hãy thiết lập tiêu chí ở form phía trên để nhận thông báo việc làm tự động.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-3.5 sm:p-4 bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl flex items-center justify-between gap-3 shadow-2xs transition-all"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {al.title || al.keyword || 'Tất cả vị trí'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          Khối {al.industryCode}
                        </span>
                        {al.experienceRequired && (
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-bold"
                            style={{ backgroundColor: '#FEE686', color: '#4d4608' }}
                          >
                            {al.experienceRequired}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Đang bật
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                        <span>Khu vực: <strong className="text-slate-700">{al.city}</strong></span>
                        {al.userEmail && (
                          <span>Gửi đến: <strong className="text-slate-700">{al.userEmail}</strong></span>
                        )}
                        {al.createdDate && (
                          <span className="text-slate-400">Tạo: {al.createdDate}</span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveAlert(al.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                      title="Xóa chuông báo này"
                      aria-label="Xóa chuông báo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:px-6 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] text-slate-500">
            Thông báo bảo mật, không gửi thư rác hay quảng cáo ngoài luồng
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobAlertsModal;
