import React, { useState, useMemo } from 'react';
import { 
  Stethoscope, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle, 
  PhoneCall, 
  RefreshCw, 
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { translations } from '../data/translations';

const symptomsList = [
  {
    id: 'fainting_confusion',
    labelKm: 'សន្លប់ ឬវង្វេងវង្វាន់ និយាយមិនត្រង់មាត់',
    labelEn: 'Fainting, confusion, slurred speech',
    isCritical: true,
  },
  {
    id: 'dry_hot_skin',
    labelKm: 'ស្បែកក្តៅខ្លាំង ស្ងួត គ្មានញើសចេញទាល់តែសោះ',
    labelEn: 'Extremely hot, red, completely dry skin (no sweat)',
    isCritical: true,
  },
  {
    id: 'rapid_pulse',
    labelKm: 'ចង្វាក់បេះដូងដើរញាប់ខ្លាំង និងពិបាកដកដង្ហើម',
    labelEn: 'Very rapid pounding pulse & shortness of breath',
    isCritical: true,
  },
  {
    id: 'dizzy',
    labelKm: 'វិលមុខ ធីងធោង ស្រវាំងភ្នែក',
    labelEn: 'Dizziness, lightheadedness, blurred vision',
    isCritical: false,
  },
  {
    id: 'cramps',
    labelKm: 'រមួលក្រពើ កន្ត្រាក់សាច់ដុំកំភួនជើង ឬពោះ',
    labelEn: 'Painful muscle spasms / cramps (calves, abdomen)',
    isCritical: false,
  },
  {
    id: 'heavy_sweat',
    labelKm: 'បែកញើសជោកខ្លួនខ្លាំង ខុសពីធម្មតា',
    labelEn: 'Heavy, drenching sweat and sticky cold skin',
    isCritical: false,
  },
  {
    id: 'headache',
    labelKm: 'ឈឺក្បាលខ្ទោកៗ តឹងណែនសៀតផ្កា',
    labelEn: 'Throbbing headache and pressure',
    isCritical: false,
  },
  {
    id: 'nausea',
    labelKm: 'ចង្អោរ ឬក្អួតចង្អោរ អស់កម្លាំងល្ហិតល្ហៃ',
    labelEn: 'Nausea, upset stomach, or vomiting',
    isCritical: false,
  },
];

export default function SymptomChecker({ lang, onNavigateToSigns }) {
  const t = translations[lang].symptomChecker;
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (id) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleClear = () => {
    setSelectedSymptoms([]);
  };

  // Determine Triage outcome
  const triage = useMemo(() => {
    if (selectedSymptoms.length === 0) return null;

    const hasCritical = selectedSymptoms.some((id) => {
      const sym = symptomsList.find((s) => s.id === id);
      return sym?.isCritical;
    });

    if (hasCritical) {
      return {
        level: 'RED',
        titleKm: '🚨 អាសន្នជីវិត៖ សង្ស័យស្ទះកម្ដៅ (Heat Stroke)!',
        titleEn: '🚨 Critical Emergency: Suspected Heat Stroke!',
        descKm: 'នេះជាស្ថានភាពអាសន្នគំរាមកំហែងដល់អាយុជីវិត។ ត្រូវសកម្មភាពភ្លាមៗ កុំបង្អង់យូរ!',
        descEn: 'This is a life-threatening medical crisis requiring immediate intervention.',
        actionsKm: [
          '📞 តេហៅឡានពេទ្យលេខ ១១៩ ឬនាំអ្នកជំងឺទៅបន្ទប់សង្គ្រោះបន្ទាន់ភ្លាមៗ!',
          'សែងគាត់ទៅកន្លែងម្លប់ត្រជាក់ ឬបន្ទប់មានកង្ហារ/ម៉ាស៊ីនត្រជាក់ជាបន្ទាន់',
          'ដោះសម្លៀកបំពាក់ក្រាស់ៗចេញ',
          'យកក្រណាត់ត្រជាក់ជូតពេញខ្លួន ជាពិសេសកញ្ចឹងក ក្លៀក និងក្រលៀន',
          '⚠️ បើគាត់សន្លប់ ឬវង្វេង ហាមបញ្ចុកទឹក ឬថ្នាំពេទ្យដាច់ខាត (ខ្លាចស្ទះដង្ហើម)'
        ],
        actionsEn: [
          '📞 Call Cambodia Ambulance 119 immediately or transport to hospital emergency ward!',
          'Move the victim into airy shade or an air-conditioned room right away',
          'Loosen or strip heavy work clothes',
          'Apply ice/cold damp towels to neck, armpits, and groin to rapidly drop temperature',
          '⚠️ NEVER force fluids or tablets if unconscious or disoriented (aspiration hazard)'
        ],
        badgeColor: 'bg-red-600 text-white',
        boxBg: 'bg-red-50 border-red-300 text-red-950',
      };
    } else if (selectedSymptoms.length >= 2) {
      return {
        level: 'YELLOW',
        titleKm: '⚠️ គ្រោះថ្នាក់៖ អស់កម្លាំង ឬរមួលក្រពើដោយកម្ដៅ (Heat Exhaustion)',
        titleEn: '⚠️ Warning: Heat Exhaustion / Muscle Cramps',
        descKm: 'រាងកាយរបស់អ្នកកំពុងបាត់បង់ជាតិទឹក និងអំបិលរ៉ែច្រើន។ ប្រសិនបើបន្តធ្វើការ នឹងវិវត្តទៅជាស្ទះកម្ដៅ។',
        descEn: 'Significant dehydration and electrolyte depletion. Continuing exertion risks progression into heat stroke.',
        actionsKm: [
          'ឈប់ធ្វើការងារជាបន្ទាន់ ហើយចូលទៅសម្រាកក្នុងម្លប់ ឬកន្លែងមានខ្យល់ចេញចូលស្រួល',
          'ផឹកទឹកស្អាត ឬទឹកលាយអំបិលរ៉ែ (ORS) យឺតៗម្ដងបន្តិចៗ',
          'ដោះមួក ស្បែកជើង និងបន្ធូរសម្លៀកបំពាក់ឱ្យស្រាលស្រួលខ្លួន',
          'យកកន្សែងសើមត្រជាក់ជូតមុខ និងកញ្ចឹងក',
          'បើអាការៈមិនធូរស្រាលក្នុងរយៈពេល ៣០ នាទី ត្រូវទៅជួបពេទ្យ'
        ],
        actionsEn: [
          'Cease work immediately and take a shaded, ventilated break',
          'Sip clean water or Oral Rehydration Solution (ORS) slowly',
          'Remove helmet, unbutton collar, and elevate feet slightly',
          'Drape cool wet towels across neck and forehead',
          'If nausea or weakness persists past 30 minutes, visit the clinic'
        ],
        badgeColor: 'bg-amber-600 text-white',
        boxBg: 'bg-amber-50 border-amber-300 text-amber-950',
      };
    } else {
      return {
        level: 'GREEN',
        titleKm: '🟢 កម្រិតស្រាល៖ សញ្ញាខ្វះជាតិទឹកដំបូង',
        titleEn: '🟢 Mild: Early Heat Strain / Mild Dehydration',
        descKm: 'រាងកាយចាប់ផ្តើមរងសម្ពាធកម្ដៅ។ ចាត់វិធានការការពារមុនពេលស្ថានភាពធ្ងន់ធ្ងរ។',
        descEn: 'Early physiological strain. Rehydrate and cool down now before symptoms intensify.',
        actionsKm: [
          'ញ៉ាំទឹកស្អាត ១ ទៅ ២ កែវភ្លាមៗ',
          'សម្រាកក្នុងម្លប់យ៉ាងហោចណាស់ ១០ ទៅ ១៥ នាទី',
          'តាមដានអាការៈ ប្រសិនបើកើនឡើងសញ្ញាផ្សេងទៀត សូមឈប់ធ្វើការ'
        ],
        actionsEn: [
          'Drink 1 to 2 glasses of clean water immediately',
          'Rest in the shade for 10-15 minutes',
          'Monitor your condition; do not let body temperature climb'
        ],
        badgeColor: 'bg-emerald-600 text-white',
        boxBg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
      };
    }
  }, [selectedSymptoms]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-red-600" />
            <span>{lang === 'km' ? 'វាយតម្លៃរហ័ស' : 'Rapid Health Assessment'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            {t.sub}
          </p>
        </div>

        {selectedSymptoms.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.actions.clear}</span>
          </button>
        )}
      </div>

      {/* Symptom Tap Buttons Grid */}
      <div className="mt-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
          {t.instructions}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {symptomsList.map((item) => {
            const isSelected = selectedSymptoms.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleSymptom(item.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? item.isCritical
                      ? 'bg-red-50 border-red-500 text-red-950 shadow-sm'
                      : 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sm leading-snug">
                    {lang === 'km' ? item.labelKm : item.labelEn}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border mt-0.5 ${
                      isSelected
                        ? item.isCritical
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-amber-600 border-amber-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {item.isCritical && (
                  <span className="mt-2 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 self-start">
                    {lang === 'km' ? 'សញ្ញាគ្រោះថ្នាក់ខ្លាំង' : 'Critical Sign'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Triage Assessment Results */}
      {triage ? (
        <div className={`mt-8 p-6 sm:p-8 rounded-3xl border-2 transition-all ${triage.boxBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full self-start ${triage.badgeColor}`}>
              {triage.level === 'RED' ? (lang === 'km' ? 'កម្រិតក្រហម៖ អាសន្ន' : 'RED LEVEL: EMERGENCY') :
               triage.level === 'YELLOW' ? (lang === 'km' ? 'កម្រិតលឿង៖ គួរប្រយ័ត្ន' : 'YELLOW LEVEL: WARNING') :
               (lang === 'km' ? 'កម្រិតបៃតង៖ ស្រាល' : 'GREEN LEVEL: MILD')}
            </span>

            {triage.level === 'RED' && (
              <a
                href="tel:119"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>{lang === 'km' ? 'ហៅឡានពេទ្យ ១១៩ ភ្លាម' : 'Call 119 Ambulance Now'}</span>
              </a>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black mb-2">
            {lang === 'km' ? triage.titleKm : triage.titleEn}
          </h3>
          <p className="text-sm font-medium mb-6 opacity-90 max-w-2xl">
            {lang === 'km' ? triage.descKm : triage.descEn}
          </p>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-black/10">
            <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'km' ? 'វិធានការសង្គ្រោះបន្ទាន់ដែលត្រូវធ្វើភ្លាមៗ៖' : 'Immediate First-Aid Protocol:'}</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-800">
              {(lang === 'km' ? triage.actionsKm : triage.actionsEn).map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-orange-600 flex-shrink-0 mt-0.5">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {onNavigateToSigns && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={onNavigateToSigns}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-orange-600 underline"
              >
                <span>{lang === 'km' ? 'ស្វែងយល់បន្ថែមពីជំងឺទាំង ៦ បង្កដោយកម្ដៅ' : 'Read details on the 6 heat illnesses'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-sm">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <span>{lang === 'km' ? 'សូមចុចលើរោគសញ្ញាខាងលើ ដើម្បីមើលការណែនាំពីរបៀបជួយសង្គ្រោះ' : 'Tap any symptoms above to view instant first aid instructions.'}</span>
        </div>
      )}
    </div>
  );
}
