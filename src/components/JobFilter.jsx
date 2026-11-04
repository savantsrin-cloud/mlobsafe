import React, { useState } from 'react';
import { Shirt, Bike, Utensils, Shield, Check, Info } from 'lucide-react';
import { jobTipsData } from '../data/jobTips';
import { translations } from '../data/translations';

export default function JobFilter({ lang }) {
  const t = translations[lang].jobTips;
  const [selectedJob, setSelectedJob] = useState('all');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-orange-600" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-sky-600" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-emerald-600" />;
      default:
        return <Shield className="w-5 h-5 text-slate-600" />;
    }
  };

  const filteredJobs = selectedJob === 'all' 
    ? jobTipsData 
    : jobTipsData.filter((j) => j.id === selectedJob);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'km' ? 'ការណែនាំតាមវិស័យ' : 'Sector Guidance'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            {t.sub}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <button
          onClick={() => setSelectedJob('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            selectedJob === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {t.allJobs}
        </button>
        <button
          onClick={() => setSelectedJob('garment')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            selectedJob === 'garment'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-orange-50 hover:bg-orange-100 text-orange-800'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>{t.garment}</span>
        </button>
        <button
          onClick={() => setSelectedJob('transport')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            selectedJob === 'transport'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-sky-50 hover:bg-sky-100 text-sky-800'
          }`}
        >
          <Bike className="w-4 h-4" />
          <span>{t.transport}</span>
        </button>
        <button
          onClick={() => setSelectedJob('street-vendor')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            selectedJob === 'street-vendor'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>{t.streetVendor}</span>
        </button>
      </div>

      {/* Job Cards Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-200">
                  {getIcon(job.icon)}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
                  {lang === 'km' ? job.badgeKm : job.badgeEn}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'km' ? job.titleKm : job.titleEn}
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                {lang === 'km' ? job.summaryKm : job.summaryEn}
              </p>

              <div className="space-y-3.5">
                {(lang === 'km' ? job.tipsKm : job.tipsEn).map((tip, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{lang === 'km' ? 'អនុវត្តជាប្រចាំក្នុងម៉ោងធ្វើការ' : 'Practice consistently during your shift'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
