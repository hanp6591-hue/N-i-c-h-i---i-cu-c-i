import React from 'react';
import { Job } from '../types';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onQuickApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
  onQuickApply
}) => {
  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'internship':
        return 'Thực tập sinh';
      case 'part-time':
        return 'Bán thời gian (Part-time)';
      case 'full-time':
        return 'Toàn thời gian (Full-time)';
      case 'long-term':
        return 'Làm việc lâu dài';
      default:
        return 'Toàn thời gian';
    }
  };

  const isNoExp = job.experienceRequired === 'no-experience';

  return (
    <div 
      id={`job-card-${job.id}`}
      className="bg-white rounded-[20px] border transition-all duration-300 p-5 flex flex-col justify-between shadow-xs hover:shadow-lg relative group"
      style={{
        borderColor: isNoExp ? 'rgba(255, 210, 115, 0.6)' : 'rgba(222, 181, 215, 0.45)',
        boxShadow: isNoExp 
          ? '0 6px 20px -4px rgba(255, 210, 115, 0.22)' 
          : '0 6px 20px -4px rgba(191, 174, 227, 0.15)'
      }}
    >
      {/* Top row: Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {isNoExp ? (
              <span 
                className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs"
                style={{ 
                  backgroundColor: 'rgba(255, 210, 115, 0.25)', 
                  borderColor: '#FFD273', 
                  color: '#453202' 
                }}
              >
                <Sparkles className="w-3 h-3 text-amber-700" /> Không cần kinh nghiệm
              </span>
            ) : (
              <span 
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'rgba(254, 197, 230, 0.35)',
                  borderColor: '#FEC5E6',
                  color: '#6e2b58'
                }}
              >
                <GraduationCap className="w-3 h-3" />
                {job.experienceText}
              </span>
            )}

            <span 
              className="px-2 py-0.5 rounded-full text-[10px] font-extrabold border"
              style={{
                backgroundColor: '#FEE686',
                borderColor: '#FFD273',
                color: '#1E293B'
              }}
            >
              {job.industryCode}
            </span>

            {job.isVerifiedCompany && (
              <span 
                className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: '#BFAEE3',
                  color: '#1e1635'
                }}
              >
                <ShieldCheck className="w-3 h-3 text-purple-900" /> 100% Trực tiếp
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job.id);
            }}
            className="p-2 sm:p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isSaved ? "Bỏ lưu việc làm" : "Lưu việc làm yêu thích"}
            aria-label={isSaved ? "Bỏ lưu việc làm" : "Lưu việc làm yêu thích"}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 fill-current" style={{ color: '#DEB5D7' }} />
            ) : (
              <Bookmark className="w-5 h-5 hover:text-[#DEB5D7]" />
            )}
          </button>
        </div>

        {/* Job Title */}
        <h3 
          onClick={() => onSelectJob(job)}
          className="text-base sm:text-lg font-bold text-slate-900 cursor-pointer transition-colors line-clamp-2 mb-1.5 leading-snug"
          onMouseEnter={(e) => (e.currentTarget.style.color = '#DEB5D7')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
        >
          {job.title}
        </h3>

        {/* Company Name & Verification */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
          <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="font-semibold text-slate-800 line-clamp-1">{job.companyName}</span>
          {job.isDirectHire && (
            <span 
              className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded"
              style={{ backgroundColor: 'rgba(255, 210, 115, 0.25)', color: '#453202' }}
            >
              Không trung gian
            </span>
          )}
        </div>

        {/* Key Metrics: Salary, Location, Type */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <div 
            className="flex items-center gap-1 font-extrabold px-2.5 py-1 rounded-xl border"
            style={{
              backgroundColor: 'rgba(255, 210, 115, 0.2)',
              borderColor: '#FFD273',
              color: '#453202'
            }}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-700" />
            {job.salaryText}
          </div>

          <div className="flex items-center gap-1 text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-xl">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.city}
          </div>

          <div className="flex items-center gap-1 text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {getJobTypeLabel(job.jobType)}
          </div>
        </div>

        {/* Training note if fresh grad / no exp */}
        {job.trainingProvided && (
          <div 
            className="mb-3 rounded-xl px-3 py-1.5 text-xs flex items-center gap-1.5 border"
            style={{
              backgroundColor: 'rgba(254, 230, 134, 0.35)',
              borderColor: '#FEE686',
              color: '#574204'
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />
            <span className="font-semibold">Được đào tạo kèm cặp bài bản từ đầu, có trợ cấp học việc</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[11px] px-2 py-0.5 rounded-[8px] border transition-colors"
              style={{
                backgroundColor: 'rgba(191, 174, 227, 0.25)',
                borderColor: 'rgba(191, 174, 227, 0.6)',
                color: '#2a1a47'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <button
          onClick={() => onSelectJob(job)}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-2.5 px-2 min-h-[44px] flex items-center"
        >
          Xem chi tiết
        </button>

        <button
          onClick={() => onQuickApply(job)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-slate-900 font-bold text-xs shadow-xs hover:opacity-90 active:scale-98 transition-all cursor-pointer border border-[#FFD273]"
          style={{ backgroundColor: '#FFD273' }}
        >
          <span>Ứng tuyển ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
