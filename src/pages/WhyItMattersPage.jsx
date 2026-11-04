import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  AlertTriangle, 
  HeartCrack, 
  Flame, 
  Users, 
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { statsData } from '../data/statsData';

export default function WhyItMattersPage({ lang }) {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-4">
          <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
          <span>{lang === 'km' ? 'ទិន្នន័យ និងផលប៉ះពាល់ពិត' : 'Evidence & Impact'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          {lang === 'km' ? 'ហេតុអ្វីបានជាបញ្ហាកម្ដៅនេះសំខាន់?' : 'Why Heat Stress Matters in Cambodia'}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {lang === 'km'
            ? 'ការកើនឡើងកម្ដៅនៅកម្ពុជាមិនមែនគ្រាន់តែជាបញ្ហាអាកាសធាតុនោះទេ តែវាជាបញ្ហាសុខភាពសាធារណៈ សុវត្ថិភាពការងារ និងសេដ្ឋកិច្ចគ្រួសាររបស់ពលកររាប់លាននាក់។'
            : 'Rising tropical temperatures are not merely an environmental shift—they are a critical public health and economic crisis affecting millions of Cambodian livelihoods.'}
        </p>
      </div>

      {/* Hero Metrics 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.heroStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="text-4xl sm:text-5xl font-black text-orange-600 font-mono tracking-tight mb-2">
                {lang === 'km' ? item.metric : item.metricEn}
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                {lang === 'km' ? item.titleKm : item.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'km' ? item.descKm : item.descEn}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
              {lang === 'km' ? 'ទិន្នន័យពីក្រសួងសុខាភិបាល និង ILO' : 'MoH Cambodia & ILO Data'}
            </div>
          </div>
        ))}
      </div>

      {/* Sector In-Depth Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {lang === 'km' ? 'ផលប៉ះពាល់លើក្រុមកម្មករ' : 'Disproportionate Sector Impacts'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            {lang === 'km' ? 'តើអ្នកណាខ្លះដែលរងផលប៉ះពាល់ខ្លាំងជាងគេ?' : 'Who Bears the Heaviest Burden?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(lang === 'km' ? statsData.keyIssuesKm : statsData.keyIssuesEn).map((issue, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  {issue.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {issue.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-orange-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span>{lang === 'km' ? 'ត្រូវការការយកចិត្តទុកដាក់ជាបន្ទាន់' : 'Requires proactive intervention'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chronic Health Impact: Kidneys & Long-term Body Strain */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-lg">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 text-red-200 text-xs font-bold border border-red-700">
            <HeartCrack className="w-3.5 h-3.5 text-red-400" />
            <span>{lang === 'km' ? 'គ្រោះថ្នាក់សុខភាពរយៈពេលវែង' : 'Long-Term Occupational Risk'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {lang === 'km' ? 'គ្រោះថ្នាក់ជំងឺខ្សោយតម្រងនោមរ៉ាំរ៉ៃ (CKDu)' : 'Chronic Kidney Disease of Non-Traditional Origin'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {lang === 'km'
              ? 'ការខ្វះជាតិទឹកដដែលៗជារៀងរាល់ថ្ងៃក្រោមអាកាសធាតុក្តៅ ធ្វើឱ្យតម្រងនោមខ្វះឈាមទៅចិញ្ចឹម និងបង្កឱ្យមានការកកកុញជាតិពុល។ ការសិក្សាវេជ្ជសាស្ត្រទូទាំងពិភពលោកបង្ហាញថា កម្មករដែលខ្វះជាតិទឹកជាប្រចាំមានហានិភ័យខ្ពស់ក្នុងការខូចតម្រងនោមមុនវ័យ ដោយមិនដឹងខ្លួន។'
              : 'Repeated sub-clinical dehydration day after day under extreme ambient heat restricts renal perfusion and triggers micro-vascular injury. Agricultural, construction, and factory workers continually sweating without electrolyte replacement are twice as vulnerable to premature kidney failure.'}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'km' ? 'ដំណោះស្រាយងាយស្រួល៖ ញ៉ាំទឹកស្អាត ១ កែវ/ម៉ោង' : 'Simple Remedy: 1 glass of water every hour'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
