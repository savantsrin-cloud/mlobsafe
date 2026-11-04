import React, { useState } from 'react';
import { 
  Sun, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Thermometer, 
  Clock, 
  Award,
  PhoneCall,
  Flame,
  CheckCircle2,
  Users,
  Map
} from 'lucide-react';
import { translations } from '../data/translations';
import CambodiaMap from '../components/CambodiaMap';
import HeatRiskCalculator from '../components/HeatRiskCalculator';
import SymptomChecker from '../components/SymptomChecker';
import WaterReminder from '../components/WaterReminder';
import JobFilter from '../components/JobFilter';
import HeatQuiz from '../components/HeatQuiz';

export default function HomePage({ 
  lang, 
  setActivePage, 
  waterCups, 
  setWaterCups,
  waterRef 
}) {
  const t = translations[lang];
  const [calcTemp, setCalcTemp] = useState(38);
  const [calcHumidity, setCalcHumidity] = useState(62);

  const handleSelectProvinceForCalculator = (temp, humidity) => {
    setCalcTemp(temp);
    setCalcHumidity(humidity);
    const el = document.getElementById('heat-risk-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-orange-500 via-amber-500 to-amber-600 text-white p-8 md:p-14 shadow-xl">
        {/* Decorative background sun & heat waves */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-700/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-amber-100 text-xs font-semibold mb-6 border border-white/20">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Key Campaign Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 text-white">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-xl text-amber-50/95 leading-relaxed max-w-2xl mb-8 font-normal">
            {t.hero.desc}
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#map-section"
              className="inline-flex items-center gap-2 bg-white text-orange-900 hover:bg-amber-50 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              <Map className="w-5 h-5 text-orange-600" />
              <span>{t.hero.ctaViewMap}</span>
            </a>

            <a
              href="#heat-risk-section"
              className="inline-flex items-center gap-2 bg-black/25 hover:bg-black/35 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-white/30 backdrop-blur-sm transition-all"
            >
              <Thermometer className="w-5 h-5 text-amber-200" />
              <span>{t.hero.ctaCheckRisk}</span>
            </a>

            <a
              href="#symptom-section"
              className="inline-flex items-center gap-2 bg-black/25 hover:bg-black/35 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-white/30 backdrop-blur-sm transition-all"
            >
              <span>{t.hero.ctaCheckSymptoms}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Key Facts Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20">
            {t.hero.quickFacts.map((fact, idx) => (
              <div key={idx} className="bg-black/15 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="text-xs uppercase font-bold text-amber-200 tracking-wider">
                  {fact.label}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white my-1 font-mono">
                  {fact.value}
                </div>
                <div className="text-xs text-amber-100/80">
                  {fact.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Golden Safety Rules for Cambodia's Hot Season */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            {lang === 'km' ? 'គោលការណ៍មាស ៣ យ៉ាង' : '3 Golden Hot Season Rules'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {lang === 'km' ? 'ការពារខ្លួនឱ្យរួចផុតពីការសន្លប់ និងគ្រោះថ្នាក់' : 'Stay Safe from Syncope & Heat Stress'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-black text-xl mb-4 shadow-md shadow-sky-500/20">
                💧
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'km' ? '១. ញ៉ាំទឹកមុនពេលស្រេក' : '1. Hydrate Before Thirst'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'km'
                  ? 'ញ៉ាំទឹកស្អាត ១ កែវរៀងរាល់ ១ ម៉ោង។ កុំរង់ចាំដល់ស្ងួតក ឬស្រេកទឹកខ្លាំង ទើបញ៉ាំ ព្រោះរាងកាយបានខ្សោះជាតិទឹករួចទៅហើយ។'
                  : 'Sip 1 full cup of clean water every hour. Thirst is a delayed symptom of dehydration.'}
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-sky-700">
              {lang === 'km' ? 'គោលដៅ៖ ២ ទៅ ៣ លីត្រក្នុងមួយថ្ងៃ' : 'Target: 2-3 Liters per shift'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl mb-4 shadow-md shadow-amber-500/20">
                ⛱️
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'km' ? '២. រកម្លប់ និងសម្រាក' : '2. Seek Ventilated Shade'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'km'
                  ? 'សម្រាកក្នុងម្លប់យ៉ាងហោចណាស់ ១០ នាទីរៀងរាល់ម៉ោងក្តៅខ្លាំង (១១:៣០ ព្រឹក ដល់ ២:៣០ រសៀល)។ ដោះមួក ឬអាវក្រាស់ចេញដើម្បីបញ្ចេញកម្តៅ។'
                  : 'Take 10-minute shade breaks during peak heat (11:30 AM to 2:30 PM). Loosen heavy clothing to shed heat.'}
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-amber-800">
              {lang === 'km' ? 'ជៀសវាងការឈរហាលថ្ងៃយូរ' : 'Avoid continuous sun exposure'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-red-50/70 border border-red-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl mb-4 shadow-md shadow-red-600/20">
                🚨
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'km' ? '៣. ស្គាល់សញ្ញាអាសន្ន' : '3. Spot Red-Flag Symptoms'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'km'
                  ? 'បើឃើញស្បែកក្តៅក្រហមស្ងួត (គ្មានញើស) ឬមានអារម្មណ៍វង្វេងវង្វាន់ សន្លប់ ត្រូវតេហៅឡានពេទ្យ ១១៩ ភ្លាម។ នេះជាជំងឺខ្យល់គរធ្ងន់ធ្ងរ!'
                  : 'Hot dry skin with zero sweat + confusion or fainting = Heat Stroke. Call 119 immediately.'}
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-red-700">
              {lang === 'km' ? 'លេខទូរស័ព្ទសង្គ្រោះ៖ ១១៩' : 'Emergency Hotline: 119'}
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURE: Cambodia Interactive Heat & Air Quality (AQI) Map */}
      <div id="map-section">
        <CambodiaMap 
          lang={lang} 
          onSelectProvinceForCalculator={handleSelectProvinceForCalculator}
        />
      </div>

      {/* Interactive Tool 1: Heat Risk Calculator with Province Search & 55°C Extreme Danger Warning */}
      <div id="heat-risk-section">
        <HeatRiskCalculator 
          lang={lang} 
          externalTemp={calcTemp}
          externalHumidity={calcHumidity}
        />
      </div>

      {/* Interactive Tool 2: Symptom Checker & Triage */}
      <div id="symptom-section">
        <SymptomChecker 
          lang={lang} 
          onNavigateToSigns={() => {
            setActivePage('signs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      </div>

      {/* Interactive Tool 3: Water & Rest Hourly Reminder */}
      <div id="water-section" ref={waterRef}>
        <WaterReminder 
          lang={lang} 
          waterCups={waterCups} 
          setWaterCups={setWaterCups} 
        />
      </div>

      {/* Interactive Tool 4: Job-Specific Protection Filters */}
      <section>
        <JobFilter lang={lang} />
      </section>

      {/* Interactive Tool 5: Heat Safety Quiz */}
      <section>
        <HeatQuiz lang={lang} />
      </section>
    </div>
  );
}
