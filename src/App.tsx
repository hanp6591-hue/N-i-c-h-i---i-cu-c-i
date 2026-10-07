import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { JobList } from './components/JobList';
import { IndustryDirectory } from './components/IndustryDirectory';
import { IndustryCompaniesView } from './components/IndustryCompaniesView';
import { SalaryComparison } from './components/SalaryComparison';
import { RecruitmentReviews } from './components/RecruitmentReviews';
import { CVGuideAndBuilder } from './components/CVGuideAndBuilder';
import { AntiScamGuide } from './components/AntiScamGuide';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { SavedJobsModal } from './components/SavedJobsModal';
import { JobAlertsModal } from './components/JobAlertsModal';
import { LoginProfileModal } from './components/LoginProfileModal';
import { EmployerPostJob } from './components/EmployerPostJob';

import { 
  MOCK_INDUSTRIES, 
  MOCK_COMPANIES, 
  MOCK_JOBS, 
  MOCK_SALARY_BENCHMARKS, 
  MOCK_RECRUITMENT_REVIEWS, 
  MOCK_INITIAL_ALERTS 
} from './data/mockData';
import { Job, RecruitmentReview, JobAlert, ApplicationRecord, NavigationTab, UserProfile } from './types';
import { 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Heart, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle2,
  FileText,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('jobs');
  const [selectedIndustryCode, setSelectedIndustryCode] = useState<string>('CNKT');

  // User Profile State (Requirement: "Khi vào app có mục đăng nhập thông tin cá nhân gồm họ và tên, ngày tháng năm sinh, email, công việc hiện tại, giới tính")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('user_profile_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fullName: 'Nguyễn Thị Mai Lan',
      birthDate: '2003-08-20',
      email: 'mailan.nguyen@example.com',
      currentOccupation: 'Sinh viên mới tốt nghiệp - Chưa có kinh nghiệm',
      gender: 'Nữ',
      phoneNumber: '0912 345 678',
      portfolioUrl: 'https://sites.google.com/view/mailan-portfolio',
      isRegistered: true
    };
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Core Data State
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [companies] = useState(MOCK_COMPANIES);
  const [industries] = useState(MOCK_INDUSTRIES);
  const [salaryBenchmarks] = useState(MOCK_SALARY_BENCHMARKS);
  const [reviews, setReviews] = useState<RecruitmentReview[]>(MOCK_RECRUITMENT_REVIEWS);
  const [alerts, setAlerts] = useState<JobAlert[]>(MOCK_INITIAL_ALERTS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  // Modals state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  // Dedicated independent states for Saved Jobs and Job Alerts
  const [isSavedJobsOpen, setIsSavedJobsOpen] = useState(false);
  const [isJobAlertsOpen, setIsJobAlertsOpen] = useState(false);

  // Global Search & Filter State for Header Search Bar
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceTab, setExperienceTab] = useState<'all' | 'no-experience' | 'has-experience'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSalaryBand, setSelectedSalaryBand] = useState<string>('all');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');

  // Filter computation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Experience Filter
      if (experienceTab === 'no-experience') {
        if (job.experienceRequired !== 'no-experience') return false;
      } else if (experienceTab === 'has-experience') {
        if (job.experienceRequired === 'no-experience') return false;
      }

      // 2. Keyword Search (title, company, tags, description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.companyName.toLowerCase().includes(query);
        const matchesTags = job.tags.some(t => t.toLowerCase().includes(query));
        const matchesIndustry = job.industryName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesTags && !matchesIndustry) {
          return false;
        }
      }

      // 3. Khối ngành chính (From Bộ lọc nâng cao ONLY)
      if (selectedIndustry !== 'all' && job.industryCode !== selectedIndustry) {
        return false;
      }

      // 4. Location / City
      if (selectedCity !== 'all') {
        const cityNorm = selectedCity.toLowerCase();
        const jobCityNorm = (job.city || '').toLowerCase();
        const jobLocNorm = (job.location || '').toLowerCase();

        if (cityNorm === 'toàn quốc') {
          const isNationwide = jobCityNorm.includes('toàn quốc') || 
                               jobLocNorm.includes('toàn quốc') || 
                               jobLocNorm.includes('nhiều') || 
                               jobLocNorm.includes('gần nhà');
          if (!isNationwide) return false;
        } else {
          // Specific city: check city, location, or nationwide jobs open to all cities
          let matchesCity = false;
          if (cityNorm.includes('hồ chí minh')) {
            matchesCity = jobCityNorm.includes('hồ chí minh') || jobCityNorm.includes('hcm') ||
                          jobLocNorm.includes('hồ chí minh') || jobLocNorm.includes('hcm');
          } else if (cityNorm.includes('hà nội')) {
            matchesCity = jobCityNorm.includes('hà nội') || jobLocNorm.includes('hà nội');
          } else if (cityNorm.includes('đà nẵng')) {
            matchesCity = jobCityNorm.includes('đà nẵng') || jobLocNorm.includes('đà nẵng');
          } else if (cityNorm.includes('bình dương')) {
            matchesCity = jobCityNorm.includes('bình dương') || jobLocNorm.includes('bình dương');
          } else if (cityNorm.includes('cần thơ')) {
            matchesCity = jobCityNorm.includes('cần thơ') || jobLocNorm.includes('cần thơ');
          } else if (cityNorm.includes('hải phòng')) {
            matchesCity = jobCityNorm.includes('hải phòng') || jobLocNorm.includes('hải phòng');
          } else {
            matchesCity = jobCityNorm.includes(cityNorm) || jobLocNorm.includes(cityNorm);
          }

          // Nationwide positions are applicable across all cities
          if (jobCityNorm.includes('toàn quốc') || jobLocNorm.includes('toàn quốc')) {
            matchesCity = true;
          }

          if (!matchesCity) return false;
        }
      }

      // 5. Salary Band (Dynamic overlap matching)
      if (selectedSalaryBand !== 'all') {
        if (selectedSalaryBand === 'under-7') {
          if (job.salaryMin >= 7 && job.salaryMax > 7) return false;
        } else if (selectedSalaryBand === '7-10') {
          if (job.salaryMin > 10 || job.salaryMax < 7) return false;
        } else if (selectedSalaryBand === '10-15') {
          if (job.salaryMin > 15 || job.salaryMax < 10) return false;
        } else if (selectedSalaryBand === 'above-15') {
          if (job.salaryMax < 15) return false;
        }
      }

      // 6. Job Type
      if (selectedJobType !== 'all') {
        if (selectedJobType === 'full-time') {
          if (job.jobType !== 'full-time' && job.jobType !== 'long-term') return false;
        } else if (job.jobType !== selectedJobType) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, experienceTab, searchTerm, selectedIndustry, selectedCity, selectedSalaryBand, selectedJobType]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setExperienceTab('all');
    setSelectedIndustry('all');
    setSelectedCity('all');
    setSelectedSalaryBand('all');
    setSelectedJobType('all');
  };

  const noExpJobsCount = jobs.filter(j => j.experienceRequired === 'no-experience').length;
  const hasExpJobsCount = jobs.filter(j => j.experienceRequired !== 'no-experience').length;

  // Handlers
  const handleAddNewJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    setActiveTab('jobs');
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('user_profile_data', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleSelectJobForDetail = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleQuickApply = (job: Job) => {
    setApplyJob(job);
    setIsApplyOpen(true);
  };

  const handleSubmitApplication = (app: ApplicationRecord) => {
    setApplications(prev => [app, ...prev]);
  };

  const handleOpenSavedJobs = () => {
    setIsSavedJobsOpen(true);
  };

  const handleCloseSavedJobs = () => {
    setIsSavedJobsOpen(false);
    if (activeTab === 'saved-jobs') {
      setActiveTab('jobs');
    }
  };

  const handleOpenJobAlerts = () => {
    setIsJobAlertsOpen(true);
  };

  const handleCloseJobAlerts = () => {
    setIsJobAlertsOpen(false);
    if (activeTab === 'job-alerts') {
      setActiveTab('jobs');
    }
  };

  const handleNavigationChange = (tab: NavigationTab) => {
    if (tab === 'saved-jobs') {
      handleOpenSavedJobs();
    } else if (tab === 'job-alerts') {
      handleOpenJobAlerts();
    } else {
      setActiveTab(tab);
    }
  };

  const handleSelectIndustryFromDirectory = (industryCode: string) => {
    setSelectedIndustryCode(industryCode);
    setActiveTab('industry-companies');
  };

  const handleAddReview = (newReview: RecruitmentReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const handleAddAlert = (newAlert: JobAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleRemoveAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // Selected industry object for industry-companies view
  const currentIndustry = industries.find(i => i.code === selectedIndustryCode) || industries[0];
  const savedJobsList = jobs.filter(j => savedJobIds.includes(j.id));
  const selectedJobCompany = selectedJob ? companies.find(c => c.id === selectedJob.companyId) : undefined;

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col text-slate-800 font-sans antialiased">
      {/* Top Application Header with Search Bar, Externalized Saved/Alerts, and 5-item Facebook Menu */}
      <Header
        activeTab={activeTab}
        onTabChange={handleNavigationChange}
        savedCount={savedJobIds.length}
        alertsCount={alerts.length}
        onOpenSaved={handleOpenSavedJobs}
        onOpenAlerts={handleOpenJobAlerts}
        userProfile={userProfile}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        experienceTab={experienceTab}
        onExperienceTabChange={setExperienceTab}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedSalaryBand={selectedSalaryBand}
        onSalaryBandChange={setSelectedSalaryBand}
        selectedJobType={selectedJobType}
        onJobTypeChange={setSelectedJobType}
        industries={industries}
        onResetFilters={handleResetFilters}
        totalFilteredCount={filteredJobs.length}
        totalNoExpCount={noExpJobsCount}
      />

      {/* Profile quick banner if user has profile */}
      {userProfile?.isRegistered && (
        <div 
          className="border-b py-2 px-4 text-xs"
          style={{
            backgroundColor: 'rgba(255, 210, 115, 0.25)',
            borderColor: 'rgba(255, 210, 115, 0.6)'
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFD273' }} />
              <span>
                Xin chào <strong>{userProfile.fullName}</strong> ({userProfile.currentOccupation}) • Giới tính: {userProfile.gender} • Ngày sinh: {userProfile.birthDate}
              </span>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="font-bold underline hover:opacity-80 transition-opacity cursor-pointer text-xs"
              style={{ color: '#8d427d' }}
            >
              Cập nhật thông tin cá nhân
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* TAB 1: VIỆC LÀM (Job List with Hero Welcome Banner & Filtered Jobs) */}
        {activeTab === 'jobs' && (
          <JobList
            jobs={filteredJobs}
            savedJobIds={savedJobIds}
            onToggleSave={handleToggleSaveJob}
            onSelectJob={handleSelectJobForDetail}
            onQuickApply={handleQuickApply}
            onNavigateToEmployerPost={() => setActiveTab('employer-post')}
            experienceTab={experienceTab}
            onSelectExperienceTab={(tab) => setExperienceTab(tab)}
            noExpJobsCount={noExpJobsCount}
            hasExpJobsCount={hasExpJobsCount}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* TAB 2: KHỐI NGÀNH (Industry Directory: CNKT, DVVT, KTTM, MKT, GDĐT, YTHC, NHDD) */}
        {activeTab === 'industries' && (
          <IndustryDirectory
            industries={industries}
            onSelectIndustry={handleSelectIndustryFromDirectory}
            onBrowseJobsByIndustry={(indCode) => {
              setSelectedIndustryCode(indCode);
              setActiveTab('industry-companies');
            }}
          />
        )}

        {/* TAB 2.1: DOANH NGHIỆP THUỘC KHỐI NGÀNH (Navigated when clicking on an industry) */}
        {activeTab === 'industry-companies' && (
          <IndustryCompaniesView
            industry={currentIndustry}
            companies={companies}
            jobs={jobs}
            onBack={() => setActiveTab('industries')}
            onSelectJob={handleSelectJobForDetail}
            onQuickApply={handleQuickApply}
          />
        )}

        {/* TAB 3: SO SÁNH MỨC LƯƠNG (Salary Benchmark & Deal Salary Tips) */}
        {activeTab === 'salary' && (
          <SalaryComparison
            benchmarks={salaryBenchmarks}
            onSelectIndustryJobs={(indCode) => {
              setSelectedIndustryCode(indCode);
              setActiveTab('industry-companies');
            }}
          />
        )}

        {/* TAB 4: ĐÁNH GIÁ TUYỂN DỤNG (Recruitment Reviews from real candidates) */}
        {activeTab === 'reviews' && (
          <RecruitmentReviews
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {/* TAB 5: GỢI Ý VIẾT CV & GOOGLE SITES (CV Guidelines, Portfolio Site Guide, AI Assistant) */}
        {activeTab === 'cv-guide' && (
          <CVGuideAndBuilder />
        )}

        {/* TAB 6: PHÒNG TRÁNH LỪA ĐẢO & TRUNG GIAN (Anti-Scam Guide) */}
        {activeTab === 'anti-scam' && (
          <AntiScamGuide />
        )}

        {/* TAB 7: ĐĂNG TUYỂN DÀNH CHO DOANH NGHIỆP (Requirement: Thêm mục cho doanh nghiệp đăng tuyển thông tin) */}
        {activeTab === 'employer-post' && (
          <EmployerPostJob
            industries={industries}
            onAddNewJob={handleAddNewJob}
            onNavigateToJobs={() => setActiveTab('jobs')}
          />
        )}
      </main>

      {/* Application Modals */}
      <LoginProfileModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      <JobDetailModal
        job={selectedJob}
        company={selectedJobCompany}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleSave={handleToggleSaveJob}
        onOpenApply={handleQuickApply}
      />

      <ApplyModal
        job={applyJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmitApplication={handleSubmitApplication}
        userProfile={userProfile}
        onOpenLoginProfile={() => setIsLoginModalOpen(true)}
      />

      {/* 1. Modal Việc làm đã lưu - Độc lập hoàn toàn */}
      <SavedJobsModal
        isOpen={isSavedJobsOpen}
        onClose={handleCloseSavedJobs}
        savedJobs={savedJobsList}
        onRemoveSavedJob={handleToggleSaveJob}
        onSelectJob={handleSelectJobForDetail}
        onQuickApply={handleQuickApply}
      />

      {/* 2. Modal Thông báo việc làm - Độc lập hoàn toàn */}
      <JobAlertsModal
        isOpen={isJobAlertsOpen}
        onClose={handleCloseJobAlerts}
        alerts={alerts}
        onAddAlert={handleAddAlert}
        onRemoveAlert={handleRemoveAlert}
        industries={industries}
      />

      {/* Footer styled with palette (FFD273, FEE686, FEC5E6, DEB5D7, BFAEE3) */}
      <footer 
        className="text-slate-300 text-xs border-t mt-12 pt-10 pb-10"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #28374D 50%, #172335 100%)',
          borderColor: 'rgba(222, 181, 215, 0.4)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/app_logo.png" 
                  alt="Logo Nối cơ hội - Đổi cuộc đời" 
                  className="w-10 h-10 object-contain drop-shadow-md"
                />
                <span className="text-white font-extrabold text-base tracking-tight">
                  Nối cơ hội - Đổi cuộc đời
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs max-w-md">
                Nền tảng việc làm và phát triển năng lực nghề nghiệp dành cho <strong>mọi lứa tuổi</strong>, 
                đặc biệt là <strong>sinh viên năm cuối, mới tốt nghiệp, học sinh & người chưa có kinh nghiệm</strong>. 
                Rút ngắn thời gian tìm việc, kết nối trực tiếp 100% với doanh nghiệp, bảo vệ thông tin cá nhân và đẩy lùi lừa đảo môi giới.
              </p>
              <div className="flex items-center gap-2 font-bold text-xs" style={{ color: '#FFD273' }}>
                <ShieldCheck className="w-4 h-4 text-[#FFD273]" />
                <span>Cam kết 100% doanh nghiệp xác thực • Tuyệt đối không thu phí ứng viên</span>
              </div>
            </div>

            <div>
              <h4 
                className="font-bold text-xs uppercase tracking-wider mb-3"
                style={{ color: '#FEE686' }}
              >
                Khối ngành trọng điểm
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• CNKT - Công nghệ & Kỹ thuật số</li>
                <li>• DVVT - Dịch vụ, Vận tải & Chuỗi cung ứng</li>
                <li>• KTTM - Kinh tế, Thương mại & Bán lẻ</li>
                <li>• MKT - Marketing, Sáng tạo & Truyền thông</li>
                <li>• GDĐT - Giáo dục, Khóa học & Đào tạo</li>
                <li>• YTHC - Y tế, Chăm sóc sức khỏe & Hành chính</li>
              </ul>
            </div>

            <div>
              <h4 
                className="font-bold text-xs uppercase tracking-wider mb-3"
                style={{ color: '#FEC5E6' }}
              >
                Hỗ trợ & Bảo vệ
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• Hướng dẫn làm Portfolio Google Sites</li>
                <li>• Bảng so sánh mức lương thị trường chuẩn</li>
                <li>• Đánh giá phỏng vấn thực tế từ cộng đồng</li>
                <li>• Cẩm nang nhận biết & phòng chống lừa đảo</li>
                <li>• Tổng đài bảo vệ người tìm việc: 156 / 113</li>
              </ul>
            </div>
          </div>

          <div 
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <span>
              © 2026 Nối cơ hội - Đổi cuộc đời. Dự án kết nối việc làm minh bạch, không qua trung gian.
            </span>
            <div className="flex items-center gap-4 font-semibold text-slate-200">
              <span style={{ color: '#FFD273' }}>✓ Không qua trung gian</span>
              <span style={{ color: '#BFAEE3' }}>✓ Bảo mật thông tin</span>
              <span style={{ color: '#FEE686' }}>✓ 0đ phí ứng tuyển</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
