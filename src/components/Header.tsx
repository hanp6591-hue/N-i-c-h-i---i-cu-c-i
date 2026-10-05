import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, NavigationTab, Industry } from '../types';
import { 
  Building2, 
  DollarSign, 
  Star, 
  FileText, 
  ShieldCheck, 
  Bell, 
  Bookmark, 
  Sparkles,
  Menu,
  X,
  User,
  GraduationCap,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Check,
  RotateCcw,
  MapPin,
  Clock
} from 'lucide-react';

export interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  savedCount: number;
  alertsCount: number;
  onOpenSaved: () => void;
  onOpenAlerts: () => void;
  userProfile: UserProfile | null;
  onOpenLogin: () => void;
  // Search & Filter state
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  experienceTab: 'all' | 'no-experience' | 'has-experience';
  onExperienceTabChange: (tab: 'all' | 'no-experience' | 'has-experience') => void;
  selectedIndustry: string;
  onIndustryChange: (ind: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedSalaryBand: string;
  onSalaryBandChange: (band: string) => void;
  selectedJobType: string;
  onJobTypeChange: (type: string) => void;
  industries: Industry[];
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalNoExpCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  alertsCount,
  onOpenSaved,
  onOpenAlerts,
  userProfile,
  onOpenLogin,
  searchTerm,
  onSearchTermChange,
  experienceTab,
  onExperienceTabChange,
  selectedIndustry,
  onIndustryChange,
  selectedCity,
  onCityChange,
  selectedSalaryBand,
  onSalaryBandChange,
  selectedJobType,
  onJobTypeChange,
  industries,
  onResetFilters,
  totalFilteredCount,
  totalNoExpCount
}) => {
  // Dropdown states
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [facebookMenuOpen, setFacebookMenuOpen] = useState(false);

  const experienceDropdownRef = useRef<HTMLDivElement>(null);
  const facebookMenuRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (experienceDropdownRef.current && !experienceDropdownRef.current.contains(event.target as Node)) {
        setIsExperienceDropdownOpen(false);
      }
      if (facebookMenuRef.current && !facebookMenuRef.current.contains(event.target as Node)) {
        setFacebookMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = 
    searchTerm.trim() !== '' ||
    experienceTab !== 'all' ||
    selectedIndustry !== 'all' ||
    selectedCity !== 'all' ||
    selectedSalaryBand !== 'all' ||
    selectedJobType !== 'all';

  // The 5 Facebook-style menu items requested by the user
  const menuItems: { id: NavigationTab; label: string; desc: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    { 
      id: 'salary', 
      label: 'Mức lương', 
      desc: 'So sánh mức lương thị trường & deal lương', 
      icon: DollarSign, 
      color: '#FFD273' 
    },
    { 
      id: 'reviews', 
      label: 'Đánh giá', 
      desc: 'Review phỏng vấn & quy trình tuyển dụng thực tế', 
      icon: Star, 
      color: '#FEC5E6' 
    },
    { 
      id: 'cv-guide', 
      label: 'Gợi ý CV', 
      desc: 'Hướng dẫn viết CV & tạo Portfolio Google Sites', 
      icon: FileText, 
      color: '#BFAEE3' 
    },
    { 
      id: 'anti-scam', 
      label: 'Phòng tránh', 
      desc: 'Cẩm nang nhận biết bẫy lừa đảo & trung gian', 
      icon: ShieldCheck, 
      color: '#FEE686' 
    },
    { 
      id: 'employer-post', 
      label: 'Đăng tuyển', 
      desc: 'Dành cho doanh nghiệp đăng tin trực tiếp', 
      icon: Building2, 
      color: '#FFD273' 
    }
  ];

  const handleSelectMenuTab = (tab: NavigationTab) => {
    onTabChange(tab);
    setFacebookMenuOpen(false);
  };

  const handleLogoClick = () => {
    onTabChange('jobs');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Top Banner with Brand Palette */}
      <div 
        className="text-slate-800 text-xs py-1 px-4"
        style={{
          background: 'linear-gradient(90deg, #BFAEE3 0%, #FEC5E6 35%, #FFD273 70%, #FEE686 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 font-medium truncate">
            <span className="font-bold text-slate-900 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-950" />
              100% Trực tiếp Doanh nghiệp
            </span>
            <span className="hidden sm:inline text-slate-700">• Tuyệt đối không qua trung gian • Cam kết 0đ chi phí ứng tuyển</span>
          </div>
          <div className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 text-slate-800 shadow-2xs">
            ★ Tuyển dụng minh bạch
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 1. OFFICIAL APP LOGO (Replaces text 'Nối cơ hội - Đổi cuộc đời', clickable to Home) */}
          <button 
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0 transition-transform active:scale-95"
            title="Về trang chủ Nối cơ hội - Đổi cuộc đời"
            aria-label="Về trang chủ"
          >
            <img 
              src="/app_logo.png" 
              alt="Logo Nối cơ hội - Đổi cuộc đời" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm group-hover:scale-105 group-hover:drop-shadow-md transition-all"
            />
          </button>

          {/* 2. THANH TÌM KIẾM TRÊN HEADER (Desktop layout) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-2">
            <div className="w-full relative flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white rounded-2xl border border-slate-200/90 focus-within:border-[#BFAEE3] focus-within:ring-2 focus-within:ring-[#BFAEE3]/40 transition-all shadow-inner px-2.5 py-1">
              {/* Search Icon */}
              <Search className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Text Input */}
              <input
                id="header-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  onSearchTermChange(e.target.value);
                  if (activeTab !== 'jobs') onTabChange('jobs');
                }}
                placeholder="Tìm việc làm, vị trí, kỹ năng..."
                className="w-full pl-2 pr-2 py-1 text-xs sm:text-sm font-medium bg-transparent focus:outline-hidden text-slate-800 placeholder-slate-400"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => onSearchTermChange('')}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Xóa từ khóa"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Divider */}
              <div className="h-5 w-px bg-slate-300/80 mx-1 shrink-0" />

              {/* MỤC "KINH NGHIỆM" DUY NHẤT (Gộp Chưa có KN & Đã có KN vào 1 mục, mở ra để chọn) */}
              <div className="relative shrink-0" ref={experienceDropdownRef}>
                <button
                  type="button"
                  id="btn-header-exp-dropdown"
                  onClick={() => setIsExperienceDropdownOpen(!isExperienceDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs"
                  style={
                    experienceTab === 'no-experience'
                      ? { backgroundColor: '#FFD273', borderColor: '#e6bd67', color: '#3d2b02' }
                      : experienceTab === 'has-experience'
                      ? { backgroundColor: '#FEC5E6', borderColor: '#f2a8d4', color: '#1E293B' }
                      : { backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#475569' }
                  }
                  title="Lọc theo mức độ kinh nghiệm"
                >
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">
                    {experienceTab === 'no-experience' 
                      ? 'Chưa có KN' 
                      : experienceTab === 'has-experience' 
                      ? 'Đã có KN' 
                      : 'Kinh nghiệm'}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExperienceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu lựa chọn Kinh nghiệm */}
                {isExperienceDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Chọn mức kinh nghiệm
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onExperienceTabChange('all');
                        setIsExperienceDropdownOpen(false);
                        if (activeTab !== 'jobs') onTabChange('jobs');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        experienceTab === 'all' ? 'text-slate-900 font-bold bg-slate-50' : 'text-slate-700'
                      }`}
                    >
                      <span>Tất cả kinh nghiệm</span>
                      {experienceTab === 'all' && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>

                    <button
                      type="button"
                      id="opt-exp-no-experience"
                      onClick={() => {
                        onExperienceTabChange('no-experience');
                        setIsExperienceDropdownOpen(false);
                        if (activeTab !== 'jobs') onTabChange('jobs');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between hover:bg-amber-50 cursor-pointer ${
                        experienceTab === 'no-experience' ? 'text-amber-900 bg-amber-50/70' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                        <span>Chưa có kinh nghiệm</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFD273] text-[#3d2b02]">
                        {totalNoExpCount}
                      </span>
                    </button>

                    <button
                      type="button"
                      id="opt-exp-has-experience"
                      onClick={() => {
                        onExperienceTabChange('has-experience');
                        setIsExperienceDropdownOpen(false);
                        if (activeTab !== 'jobs') onTabChange('jobs');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between hover:bg-pink-50 cursor-pointer ${
                        experienceTab === 'has-experience' ? 'text-pink-900 bg-pink-50/70' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-pink-700" />
                        <span>Đã có kinh nghiệm</span>
                      </div>
                      {experienceTab === 'has-experience' && <Check className="w-3.5 h-3.5 text-pink-900" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Nút Bộ lọc nâng cao */}
              <button
                type="button"
                id="btn-header-advanced-filters"
                onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
                className={`ml-1 flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border shrink-0 shadow-2xs ${
                  isAdvancedFiltersOpen || hasActiveFilters
                    ? 'bg-[#FFD273] border-[#e6bd67] text-[#1E293B]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title="Mở bộ lọc nâng cao (Khối ngành, Địa điểm, Mức lương, Hình thức)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Bộ lọc</span>
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                )}
              </button>

              {/* Nút Xóa lọc nếu đang có filter */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="ml-1 p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white cursor-pointer transition-colors"
                  title="Đặt lại bộ lọc"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. RIGHT HEADER CONTROLS */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* 3.1. VIỆC LÀM ĐÃ LƯU (Được đưa trực tiếp ra ngoài Header theo yêu cầu) */}
            <button
              type="button"
              id="btn-header-saved-direct"
              onClick={onOpenSaved}
              className="relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-[#DEB5D7] bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold cursor-pointer transition-all shadow-2xs active:scale-95"
              title="Việc làm đã lưu"
            >
              <Bookmark className="w-4 h-4 text-purple-700 shrink-0" />
              <span className="hidden sm:inline">Việc làm đã lưu</span>
              {savedCount > 0 && (
                <span 
                  className="px-1.5 py-0.2 rounded-full text-[10px] font-black shadow-2xs border border-white"
                  style={{ backgroundColor: '#FFD273', color: '#3d2b02' }}
                >
                  {savedCount}
                </span>
              )}
            </button>

            {/* 3.2. THÔNG BÁO VIỆC LÀM (Được đưa trực tiếp ra ngoài Header theo yêu cầu) */}
            <button
              type="button"
              id="btn-header-alerts-direct"
              onClick={onOpenAlerts}
              className="relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-[#DEB5D7] bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold cursor-pointer transition-all shadow-2xs active:scale-95"
              title="Thông báo việc làm"
            >
              <Bell className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="hidden sm:inline">Thông báo</span>
              {alertsCount > 0 && (
                <span 
                  className="px-1.5 py-0.2 rounded-full text-[10px] font-black shadow-2xs border border-white"
                  style={{ backgroundColor: '#FEC5E6', color: '#1E293B' }}
                >
                  {alertsCount}
                </span>
              )}
            </button>

            {/* 3.3. USER PROFILE / ĐĂNG NHẬP */}
            <button
              type="button"
              id="btn-header-user-profile"
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              style={
                userProfile?.isRegistered
                  ? {
                      backgroundColor: 'rgba(255, 210, 115, 0.25)',
                      borderColor: '#FFD273',
                      color: '#3d2b02'
                    }
                  : {
                      backgroundColor: '#FEE686',
                      borderColor: '#FFD273',
                      color: '#1E293B'
                    }
              }
              title={userProfile?.isRegistered ? 'Hồ sơ người dùng' : 'Đăng nhập thông tin cá nhân'}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-900 text-[10px] font-black"
                style={{ backgroundColor: userProfile?.isRegistered ? '#FFD273' : '#FEC5E6' }}
              >
                {userProfile?.isRegistered ? userProfile.fullName.charAt(0) : <User className="w-3 h-3 text-slate-800" />}
              </div>
              <span className="hidden xl:inline max-w-[100px] truncate">
                {userProfile?.isRegistered ? userProfile.fullName : 'Đăng nhập'}
              </span>
            </button>

            {/* 3.4. MENU DẤU BA GẠCH (☰) (Chuẩn phong cách Facebook) */}
            <div className="relative" ref={facebookMenuRef}>
              <button
                type="button"
                id="btn-facebook-hamburger-menu"
                onClick={() => setFacebookMenuOpen(!facebookMenuOpen)}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all cursor-pointer shadow-2xs hover:bg-slate-50 active:scale-95"
                style={{
                  backgroundColor: facebookMenuOpen ? 'rgba(255, 210, 115, 0.4)' : '#ffffff',
                  borderColor: facebookMenuOpen ? '#FFD273' : '#DEB5D7',
                  color: '#1E293B'
                }}
                title="Menu chức năng dấu ba gạch"
                aria-label="Menu chức năng"
              >
                {/* 3 horizontal bars */}
                <div className="w-4 h-3.5 flex flex-col justify-between items-center pointer-events-none">
                  <span className={`w-full h-[2.5px] rounded-full bg-slate-800 transition-all ${facebookMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
                  <span className={`w-full h-[2.5px] rounded-full bg-slate-800 transition-all ${facebookMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-[2.5px] rounded-full bg-slate-800 transition-all ${facebookMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
                </div>
              </button>

              {/* Facebook-style Dropdown Menu: Chứa chính xác 5 mục yêu cầu: Mức lương, Đánh giá, Gợi ý CV, Phòng tránh, Đăng tuyển */}
              {facebookMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Menu className="w-3.5 h-3.5 text-purple-700" />
                      Menu chức năng
                    </span>
                  </div>

                  <div className="space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          id={`menu-item-${item.id}`}
                          type="button"
                          onClick={() => handleSelectMenuTab(item.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-gradient-to-r from-[#FFD273]/35 to-[#FEC5E6]/35 border-[#DEB5D7] shadow-2xs font-bold'
                              : 'border-transparent hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                            style={{ backgroundColor: item.color, color: '#1E293B' }}
                          >
                            <Icon className="w-4 h-4 stroke-[2.2]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{item.label}</span>
                              {isActive && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#FFD273] text-[#3d2b02]">
                                  Đang xem
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate leading-tight">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* 4. THANH TÌM KIẾM TRÊN HEADER CHO GIAO DIỆN MOBILE (Hiển thị ngay dưới Logo và các nút) */}
        <div className="md:hidden mt-2 pt-2 border-t border-slate-100">
          <div className="relative flex items-center bg-slate-100/90 rounded-2xl border border-slate-200/90 px-2.5 py-1">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchTermChange(e.target.value);
                if (activeTab !== 'jobs') onTabChange('jobs');
              }}
              placeholder="Tìm việc làm, vị trí, công ty..."
              className="w-full pl-2 pr-1 py-1 text-xs font-medium bg-transparent focus:outline-hidden text-slate-800 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchTermChange('')}
                className="p-1 text-slate-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {/* Mục Kinh nghiệm gộp trên mobile */}
            <div className="relative shrink-0 ml-1">
              <button
                type="button"
                onClick={() => setIsExperienceDropdownOpen(!isExperienceDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold border"
                style={
                  experienceTab === 'no-experience'
                    ? { backgroundColor: '#FFD273', borderColor: '#e6bd67', color: '#3d2b02' }
                    : experienceTab === 'has-experience'
                    ? { backgroundColor: '#FEC5E6', borderColor: '#f2a8d4', color: '#1E293B' }
                    : { backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#475569' }
                }
              >
                <span>
                  {experienceTab === 'no-experience' 
                    ? 'Chưa KN' 
                    : experienceTab === 'has-experience' 
                    ? 'Đã KN' 
                    : 'Kinh nghiệm'}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Nút Bộ lọc trên mobile */}
            <button
              type="button"
              onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
              className={`ml-1 flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold border shrink-0 ${
                isAdvancedFiltersOpen || hasActiveFilters
                  ? 'bg-[#FFD273] border-[#e6bd67] text-[#1E293B]'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5. BỘ LỌC NÂNG CAO (Nơi DUY NHẤT trong toàn bộ app có mục "Khối ngành") */}
        {isAdvancedFiltersOpen && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-200/90 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-slate-700">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#8d427d]" />
                  Bộ lọc nâng cao
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-normal">
                    Tìm thấy <strong className="text-slate-900 font-bold">{totalFilteredCount}</strong> việc làm
                  </span>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={onResetFilters}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Xóa lọc
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {/* 5.1. KHỐI NGÀNH (THE ONLY PLACE IN THE APP FOR KHỐI NGÀNH) */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-purple-700" />
                    Khối ngành tuyển dụng:
                  </label>
                  <select
                    id="filter-select-industry-header"
                    value={selectedIndustry}
                    onChange={(e) => {
                      onIndustryChange(e.target.value);
                      if (activeTab !== 'jobs') onTabChange('jobs');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3] cursor-pointer"
                  >
                    <option value="all">Tất cả các ngành</option>
                    {industries.map((ind) => (
                      <option key={ind.code} value={ind.code}>
                        {ind.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5.2. ĐỊA ĐIỂM LÀM VIỆC */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-600" />
                    Địa điểm làm việc:
                  </label>
                  <select
                    id="filter-select-city-header"
                    value={selectedCity}
                    onChange={(e) => {
                      onCityChange(e.target.value);
                      if (activeTab !== 'jobs') onTabChange('jobs');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3] cursor-pointer"
                  >
                    <option value="all">Tất cả địa điểm</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Toàn quốc">Toàn quốc / Nhiều chi nhánh</option>
                  </select>
                </div>

                {/* 5.3. MỨC LƯƠNG */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-amber-700" />
                    Mức lương:
                  </label>
                  <select
                    id="filter-select-salary-header"
                    value={selectedSalaryBand}
                    onChange={(e) => {
                      onSalaryBandChange(e.target.value);
                      if (activeTab !== 'jobs') onTabChange('jobs');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3] cursor-pointer"
                  >
                    <option value="all">Tất cả mức lương</option>
                    <option value="under-7">Dưới 7 triệu / tháng</option>
                    <option value="7-10">7 - 10 triệu / tháng</option>
                    <option value="10-15">10 - 15 triệu / tháng</option>
                    <option value="above-15">Trên 15 triệu / tháng</option>
                  </select>
                </div>

                {/* 5.4. HÌNH THỨC LÀM VIỆC */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-700" />
                    Hình thức làm việc:
                  </label>
                  <select
                    id="filter-select-jobtype-header"
                    value={selectedJobType}
                    onChange={(e) => {
                      onJobTypeChange(e.target.value);
                      if (activeTab !== 'jobs') onTabChange('jobs');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#BFAEE3] cursor-pointer"
                  >
                    <option value="all">Tất cả hình thức</option>
                    <option value="full-time">Toàn thời gian (Full-time)</option>
                    <option value="part-time">Bán thời gian (Part-time)</option>
                    <option value="internship">Thực tập sinh (Internship)</option>
                  </select>
                </div>
              </div>

              {/* Danh sách Tất cả các ngành hiển thị đầy đủ tên không viết tắt */}
              <div className="pt-2.5 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5 text-purple-700" />
                    Tất cả các ngành (Tên đầy đủ rõ ràng):
                  </span>
                  {selectedIndustry !== 'all' && (
                    <button
                      type="button"
                      onClick={() => onIndustryChange('all')}
                      className="text-rose-600 hover:underline font-bold text-[11px] cursor-pointer"
                    >
                      Xem tất cả ngành
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onIndustryChange('all');
                      if (activeTab !== 'jobs') onTabChange('jobs');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      selectedIndustry === 'all'
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    Tất cả các ngành
                  </button>

                  {industries.map((ind) => {
                    const isSelected = selectedIndustry === ind.code;
                    return (
                      <button
                        key={ind.code}
                        type="button"
                        onClick={() => {
                          onIndustryChange(isSelected ? 'all' : ind.code);
                          if (activeTab !== 'jobs') onTabChange('jobs');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                          isSelected
                            ? 'shadow-xs font-bold text-slate-900 border-[#e6bd67]'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                        }`}
                        style={
                          isSelected
                            ? { backgroundColor: '#FFD273' }
                            : undefined
                        }
                      >
                        <span>{ind.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
