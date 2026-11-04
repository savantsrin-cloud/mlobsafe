import React, { useState } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  HelpCircle,
  Activity,
  HeartPulse
} from 'lucide-react';
import { illnesses } from '../data/illnesses';

export default function KnowSignsPage({ lang }) {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const filteredIllnesses = selectedSeverity === 'all'
    ? illnesses
    : illnesses.filter(item => item.severity === selectedSeverity);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-4">
          <Activity className="w-3.5 h-3.5 text-red-600" />
          <span>{lang === 'km' ? 'សៀវភៅណែនាំរោគសញ្ញា' : 'Clinical Symptom Directory'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          {lang === 'km' ? 'សម្គាល់សញ្ញាដែលបានបង្កដោយកម្ដៅ' : 'Recognise the 6 Heat-Related Illnesses'}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {lang === 'km'
            ? 'ការយល់ដឹងពីភាពខុសគ្នារវាងការអស់កម្លាំងធម្មតា និងជំងឺស្ទះកម្ដៅដែលគំរាមកំហែងដល់អាយុជីវិត អាចជួយសង្គ្រោះខ្លួនអ្នក និងមិត្តរួមការងារបានទាន់ពេលវេលា។'
            : 'Understanding early warning signs versus fatal emergency symptoms enables swift, life-saving intervention across Cambodian workplaces.'}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            {lang === 'km' ? 'តម្រងកម្រិតគ្រោះថ្នាក់៖' : 'Severity Filter:'}
          </span>
          <button
            onClick={() => setSelectedSeverity('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedSeverity === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'km' ? 'ទាំងអស់ (៦ ជំងឺ)' : 'All (6 Illnesses)'}
          </button>
          <button
            onClick={() => setSelectedSeverity('emergency')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedSeverity === 'emergency'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            {lang === 'km' ? '🚨 អាសន្នជីវិត (Heat Stroke)' : '🚨 Emergency (Heat Stroke)'}
          </button>
          <button
            onClick={() => setSelectedSeverity('warning')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedSeverity === 'warning'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            {lang === 'km' ? '⚠️ គ្រោះថ្នាក់ (Warning)' : '⚠️ Warning'}
          </button>
          <button
            onClick={() => setSelectedSeverity('caution')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedSeverity === 'caution'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {lang === 'km' ? '🟢 គួរប្រុងប្រយ័ត្ន (Caution)' : '🟢 Caution'}
          </button>
        </div>
      </div>

      {/* Critical Comparison Matrix: Heat Exhaustion VS Heat Stroke */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-red-50 rounded-3xl p-6 sm:p-8 border-2 border-orange-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <HeartPulse className="w-5 h-5 text-red-600" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'km' ? 'ចំណុចខុសគ្នាដាច់ស្រឡះ៖ អស់កម្លាំង (Exhaustion) និង ស្ទះកម្ដៅ (Stroke)' : 'Critical Comparison: Heat Exhaustion vs. Heat Stroke'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-3xl">
          {lang === 'km'
            ? 'កុំច្រឡំរវាងស្ថានភាពទាំងពីរនេះ! ស្ទះកម្ដៅគឺជាស្ថានភាពអាសន្នគំរាមកំហែងដល់ជីវិតដែលត្រូវបញ្ជូនទៅពេទ្យភ្លាមៗ។'
            : 'Never confuse the two! Heat stroke is a medical emergency requiring urgent cooling and 119 ambulance dispatch.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heat Exhaustion Box */}
          <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-xs">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              {lang === 'km' ? 'អស់កម្លាំងដោយកម្ដៅ (Heat Exhaustion)' : 'Heat Exhaustion'}
            </span>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{lang === 'km' ? 'ស្បែក៖ ស្លេកស្លាំង ត្រជាក់ និងបែកញើសជោកជាំ' : 'Skin: Pale, cool, and sweating heavily'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{lang === 'km' ? 'ស្មារតី៖ នៅដឹងខ្លួន តែវិលមុខ និងធីងធោង' : 'Mental state: Conscious, but dizzy and nauseous'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{lang === 'km' ? 'ជីពចរ៖ ដើរញាប់តែខ្សោយ' : 'Pulse: Fast but weak'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{lang === 'km' ? 'វិធានការ៖ សម្រាកក្នុងម្លប់ ផឹកទឹកត្រជាក់/ORS' : 'Action: Rest in shade, sip water/ORS slowly'}</span>
              </li>
            </ul>
          </div>

          {/* Heat Stroke Box */}
          <div className="bg-white p-6 rounded-2xl border-2 border-red-400 shadow-xs">
            <span className="text-xs font-black uppercase tracking-wider text-red-800 bg-red-100 px-3 py-1 rounded-full">
              {lang === 'km' ? 'ស្ទះកម្ដៅ (Heat Stroke) — អាសន្នជីវិត!' : 'Heat Stroke — Medical Emergency!'}
            </span>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2 font-black text-red-700">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{lang === 'km' ? 'ស្បែក៖ ក្រហមក្តៅខ្លាំង និងស្ងួត (គ្មានញើសទាល់តែសោះ)' : 'Skin: Hot, red, completely dry (NO sweat)'}</span>
              </li>
              <li className="flex items-center gap-2 font-bold text-red-700">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{lang === 'km' ? 'ស្មារតី៖ វង្វេងវង្វាន់ និយាយមិនត្រង់មាត់ ឬសន្លប់' : 'Mental state: Confusion, delirium, unconsciousness'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{lang === 'km' ? 'សីតុណ្ហភាពខ្លួន៖ ឡើងលើស ៤០°C ជីពចរលោតកន្ត្រាក់ខ្លាំង' : 'Temperature: Above 40°C, strong pounding pulse'}</span>
              </li>
              <li className="flex items-center gap-2 font-black text-red-800">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{lang === 'km' ? 'វិធានការ៖ តេហៅឡានពេទ្យ ១១៩ ជាបន្ទាន់បំផុត!' : 'Action: Call 119 Ambulance IMMEDIATELY!'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6 Illness Cards */}
      <div className="space-y-8">
        {filteredIllnesses.map((item) => {
          const isEmergency = item.severity === 'emergency';
          const isWarning = item.severity === 'warning';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all ${
                isEmergency
                  ? 'border-red-400 shadow-md ring-1 ring-red-400/30'
                  : isWarning
                  ? 'border-amber-300 shadow-xs'
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${
                    isEmergency ? 'bg-red-600 animate-ping' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {lang === 'km' ? item.titleKm : item.titleEn}
                  </h3>
                </div>

                <span className={`text-xs font-black uppercase px-3 py-1 rounded-full self-start sm:self-auto ${
                  isEmergency ? 'bg-red-600 text-white' : isWarning ? 'bg-amber-500 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isEmergency ? (lang === 'km' ? 'កម្រិតសង្គ្រោះបន្ទាន់' : 'Emergency') :
                   isWarning ? (lang === 'km' ? 'កម្រិតប្រុងប្រយ័ត្នខ្ពស់' : 'Warning') :
                   (lang === 'km' ? 'កម្រិតស្រាល' : 'Caution')}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 my-4 leading-relaxed">
                {lang === 'km' ? item.shortDescKm : item.shortDescEn}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Symptoms Column */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-orange-600" />
                    <span>{lang === 'km' ? 'រោគសញ្ញាសំខាន់ៗ' : 'Key Symptoms'}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {(lang === 'km' ? item.symptomsKm : item.symptomsEn).map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-orange-500">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What To Do Column */}
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'km' ? 'អ្វីដែលត្រូវធ្វើ (First Aid)' : 'What to Do'}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                    {(lang === 'km' ? item.whatToDoKm : item.whatToDoEn).map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-600">✓</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What NOT To Do Column */}
                <div className="bg-red-50/60 p-5 rounded-2xl border border-red-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-red-900 mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>{lang === 'km' ? 'អ្វីដែលហាមដាច់ខាត (Avoid)' : 'What NOT to Do'}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-red-950">
                    {(lang === 'km' ? item.dontDoKm : item.dontDoEn).map((avoid, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
