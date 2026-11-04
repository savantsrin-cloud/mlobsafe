import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Wind, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Shirt,
  Bike,
  Utensils
} from 'lucide-react';
import JobFilter from '../components/JobFilter';

export default function ProtectYourselfPage({ lang }) {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'km' ? 'មគ្គុទ្ទេសក៍សុវត្ថិភាព' : 'Worker Prevention Guide'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          {lang === 'km' ? 'វិធីការពារខ្លួនពីកម្ដៅថ្ងៃ និងការសន្លប់' : 'Protect Yourself from Extreme Heat'}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {lang === 'km'
            ? 'វិធានការសាមញ្ញ ចំណាយតិច តែមានប្រសិទ្ធភាពខ្ពស់ សម្រាប់កម្មកររោងចក្រកាត់ដេរ អ្នករត់កង់បី/PassApp និងអ្នកលក់ដូរតាមចិញ្ចើមផ្លូវនៅប្រទេសកម្ពុជា។'
            : 'Low-cost, practical, and highly effective safety measures tailored for Cambodian factory, transport, and street vendors.'}
        </p>
      </div>

      {/* Interactive Sector Guidance Tool */}
      <section>
        <JobFilter lang={lang} />
      </section>

      {/* Hydration Mastery & Homemade ORS Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-6 h-6 text-sky-600" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === 'km' ? 'វិធានការជាតិទឹក និងរូបមន្តទឹកអំបិលរ៉ែ (ORS)' : 'Hydration Guide & DIY Electrolyte (ORS)'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-3xl">
          {lang === 'km'
            ? 'នៅពេលបែកញើសច្រើន រាងកាយមិនត្រឹមតែបាត់បង់ជាតិទឹកទេ ថែមទាំងបាត់បង់ជាតិអំបិលរ៉ែសំខាន់ៗដូចជា សូដ្យូម និងប៉ូតាស្យូម ដែលធ្វើឱ្យងាយរមួលក្រពើ និងសន្លប់។'
            : 'Heavy sweating drains vital mineral salts alongside water. Replacing both prevents painful heat cramps and heart strain.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Shift Hydration Schedule */}
          <div className="bg-sky-50/70 p-6 rounded-2xl border border-sky-100">
            <h3 className="text-lg font-bold text-sky-950 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-600" />
              <span>{lang === 'km' ? 'កាលវិភាគញ៉ាំទឹកក្នុងម៉ោងធ្វើការ' : 'Shift Hydration Schedule'}</span>
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-sky-100">
                <span className="font-bold text-sky-700 w-20 flex-shrink-0">7:00 AM</span>
                <span>{lang === 'km' ? 'ផឹកទឹកស្អាត ១ ទៅ ២ កែវ មុនចេញទៅធ្វើការ' : 'Drink 1-2 glasses of water before leaving home.'}</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-sky-100">
                <span className="font-bold text-sky-700 w-20 flex-shrink-0">9:00 - 11:00</span>
                <span>{lang === 'km' ? 'ញ៉ាំទឹក ១ កែវរៀងរាល់ ១ ម៉ោងម្តងនៅកន្លែងធ្វើការ' : '1 full glass of water every single hour at your station.'}</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-sky-100">
                <span className="font-bold text-sky-700 w-20 flex-shrink-0">12:00 PM</span>
                <span>{lang === 'km' ? 'សម្រាកបាយថ្ងៃត្រង់ ញ៉ាំទឹកស៊ុប ឬទឹកផ្លែឈើស្រស់/ទឹកដូង' : 'Midday meal with soup, coconut water, or fresh fruit.'}</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-sky-100">
                <span className="font-bold text-sky-700 w-20 flex-shrink-0">1:00 - 4:00</span>
                <span>{lang === 'km' ? 'ម៉ោងក្តៅខ្លាំងបំផុត៖ បន្តញ៉ាំទឹក ១ កែវរៀងរាល់ ៤៥ ទៅ ៦០ នាទី' : 'Peak heat hours: 1 glass every 45-60 minutes without fail.'}</span>
              </div>
            </div>
          </div>

          {/* Homemade DIY ORS Electrolyte Recipe */}
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200">
            <h3 className="text-lg font-bold text-amber-950 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{lang === 'km' ? 'រូបមន្តធ្វើទឹកអំបិលរ៉ែ (ORS) ដោយខ្លួនឯង' : 'DIY Oral Rehydration Salts (ORS) Recipe'}</span>
            </h3>
            <p className="text-xs text-amber-900 mb-4">
              {lang === 'km' ? 'រូបមន្តស្តង់ដាររបស់អង្គការសុខភាពពិភពលោក (WHO) ងាយស្រួលធ្វើនៅផ្ទះ៖' : 'Standard WHO home formulation to rapidly halt dehydration:'}
            </p>

            <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-3 text-xs sm:text-sm text-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                <span>{lang === 'km' ? 'ទឹកស្អាត (ទឹកដាំពុះ ឬទឹកបរិសុទ្ធ)៖ ១ លីត្រ (ប្រហែល ៤ ទៅ ៥ កែវ)' : 'Clean boiled or bottled drinking water: 1 Liter'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                <span>{lang === 'km' ? 'ស្ករស៖ ៦ ស្លាបព្រាកាហ្វេកម្រិតស្មើ' : 'Granulated Sugar: 6 level teaspoons'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                <span>{lang === 'km' ? 'អំបិលម៉ត់៖ កន្លះ (១/២) ស្លាបព្រាកាហ្វេ' : 'Common table salt: 1/2 level teaspoon'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 italic">
              * {lang === 'km'
                ? 'កូរឱ្យរលាយចូលគ្នាសព្វ។ ញ៉ាំបន្តិចម្តងៗនៅពេលបែកញើសខ្លាំង ឬមានអារម្មណ៍អស់កម្លាំង។'
                : 'Stir until fully dissolved. Sip slowly throughout strenuous, hot working shifts.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Practical Workplace Cooling Hacks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-2xl mb-3">🧣</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {lang === 'km' ? 'កន្សែងសើមត្រជាក់ត្រង់កញ្ចឹងក' : 'Cold Towel Neck Drape'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'km'
              ? 'កញ្ចឹងកមានសរសៃឈាមធំៗរត់កាត់។ ការស្អំកន្សែងត្រជាក់ត្រង់នេះ ជួយបញ្ចុះកម្ដៅឈាមដែលរត់ទៅខួរក្បាលបានលឿនបំផុត។'
              : 'The back of the neck holds major carotid vessels. Cold wet towels rapidly drop blood temperature feeding the brain.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-2xl mb-3">👕</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {lang === 'km' ? 'សម្លៀកបំពាក់កប្បាសពណ៌ភ្លឺ' : 'Light-Colored Cotton Garments'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'km'
              ? 'ពណ៌ខ្មៅស្រូបកម្ដៅ ៩០%។ ការពាក់អាវពណ៌ស ឬពណ៌ស្រាលជួយជះកម្ដៅថ្ងៃចេញ និងជួយឱ្យស្បែកដកដង្ហើមស្រួល។'
              : 'Dark fabrics absorb solar radiation. White and light pastels reflect sunlight and promote airflow.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-2xl mb-3">🌬️</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {lang === 'km' ? 'បង្កើតចរន្តខ្យល់រត់កាត់' : 'Cross-Ventilation Breezes'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'km'
              ? 'កុំចាក់សោរបង្អួចរោងចក្រ ឬផ្ទះបាយ។ បើកទ្វារសងខាងដើម្បីឱ្យខ្យល់ក្តៅហប់អាចហើរចេញ និងខ្យល់ថ្មីចូលមកជំនួស។'
              : 'Keep windows and opposing doors unblocked to push heated factory air outside and draw in fresh air.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-2xl mb-3">🥥</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {lang === 'km' ? 'ទឹកដូងស្រស់ និងផ្លែឈើជាតិទឹក' : 'Fresh Coconut & Water-Rich Fruit'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'km'
              ? 'ទឹកដូងស្រស់សម្បូរទៅដោយប៉ូតាស្យូម និងជាតិរ៉ែធម្មជាតិ។ ផ្លែឪឡឹក ត្រសក់ និងក្រូចថ្លុង ជួយរក្សាជាតិទឹកបានយូរ។'
              : 'Coconut water is packed with natural potassium and bio-available electrolytes. Watermelon and citrus replenish cells.'}
          </p>
        </div>
      </div>
    </div>
  );
}
