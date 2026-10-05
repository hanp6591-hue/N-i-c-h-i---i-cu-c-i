import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  Briefcase, 
  Building2, 
  DollarSign, 
  ShieldCheck, 
  User, 
  Bookmark,
  Star,
  FileText
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  userProfile: UserProfile | null;
  onOpenProfile: () => void;
  savedJobsCount: number;
  onOpenSavedModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  userProfile,
  onOpenProfile,
  savedJobsCount,
  onOpenSavedModal
}) => {
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-all backdrop-blur-xl bg-white/95"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(222, 181, 215, 0.8)',
        boxShadow: '0 -4px 20px -2px rgba(191, 174, 227, 0.35)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <nav aria-label="Mobile Navigation" className="flex items-center justify-around px-1 py-1.5 h-16 max-w-md mx-auto">
        {/* 1. Nối cơ hội */}
        <button
          type="button"
          onClick={() => onTabChange('jobs')}
          className={`flex-1 flex flex-col items-center justify-center min-w-0 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'jobs' ? 'scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
          style={activeTab === 'jobs' ? { color: '#8d427d' } : undefined}
        >
          <div className="relative">
            <Briefcase className={`w-5 h-5 transition-transform ${activeTab === 'jobs' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'jobs' && (
              <span 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #FFD273 0%, #DEB5D7 100%)' }}
              />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 truncate tracking-tight ${activeTab === 'jobs' ? 'font-bold' : 'font-medium'}`}>
            Nối cơ hội
          </span>
        </button>

        {/* 2. Đánh giá */}
        <button
          type="button"
          onClick={() => onTabChange('reviews')}
          className={`flex-1 flex flex-col items-center justify-center min-w-0 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'reviews' ? 'scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
          style={activeTab === 'reviews' ? { color: '#8d427d' } : undefined}
        >
          <div className="relative">
            <Star className={`w-5 h-5 transition-transform ${activeTab === 'reviews' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'reviews' && (
              <span 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #FFD273 0%, #DEB5D7 100%)' }}
              />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 truncate tracking-tight ${activeTab === 'reviews' ? 'font-bold' : 'font-medium'}`}>
            Đánh giá
          </span>
        </button>

        {/* 3. Mức lương */}
        <button
          type="button"
          onClick={() => onTabChange('salary')}
          className={`flex-1 flex flex-col items-center justify-center min-w-0 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'salary' ? 'scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
          style={activeTab === 'salary' ? { color: '#8d427d' } : undefined}
        >
          <div className="relative">
            <DollarSign className={`w-5 h-5 transition-transform ${activeTab === 'salary' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'salary' && (
              <span 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #FFD273 0%, #DEB5D7 100%)' }}
              />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 truncate tracking-tight ${activeTab === 'salary' ? 'font-bold' : 'font-medium'}`}>
            Mức lương
          </span>
        </button>

        {/* 4. Phòng tránh */}
        <button
          type="button"
          onClick={() => onTabChange('anti-scam')}
          className={`flex-1 flex flex-col items-center justify-center min-w-0 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'anti-scam' ? 'scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
          style={activeTab === 'anti-scam' ? { color: '#8d427d' } : undefined}
        >
          <div className="relative">
            <ShieldCheck className={`w-5 h-5 transition-transform ${activeTab === 'anti-scam' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'anti-scam' && (
              <span 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #FFD273 0%, #DEB5D7 100%)' }}
              />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 truncate tracking-tight ${activeTab === 'anti-scam' ? 'font-bold' : 'font-medium'}`}>
            Phòng tránh
          </span>
        </button>

        {/* 5. Đã lưu / Yêu thích */}
        <button
          type="button"
          onClick={onOpenSavedModal}
          className="flex-1 flex flex-col items-center justify-center min-w-0 py-1 px-1 rounded-xl transition-all cursor-pointer text-slate-500 hover:text-slate-800"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 stroke-2" />
            {savedJobsCount > 0 && (
              <span 
                className="absolute -top-1 -right-1.5 text-slate-900 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFD273' }}
              >
                {savedJobsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 truncate tracking-tight font-medium">
            Đã lưu
          </span>
        </button>

        {/* 6. Hồ sơ cá nhân / Đăng nhập */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex-1 flex flex-col items-center justify-center min-w-0 py-1 px-1 rounded-xl transition-all cursor-pointer text-slate-500 hover:text-slate-800"
        >
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center text-slate-900 text-[10px] font-extrabold shadow-2xs"
            style={{ backgroundColor: userProfile?.isRegistered ? '#FFD273' : '#FEC5E6' }}
          >
            {userProfile?.isRegistered ? userProfile.fullName.charAt(0) : <User className="w-3.5 h-3.5" />}
          </div>
          <span className="text-[10px] mt-0.5 truncate tracking-tight font-medium max-w-[50px]">
            {userProfile?.isRegistered ? 'Hồ sơ' : 'Đăng nhập'}
          </span>
        </button>
      </nav>
    </div>
  );
};
