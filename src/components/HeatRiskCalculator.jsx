import React, { useState, useMemo } from 'react';
import { 
  Thermometer, 
  Droplets, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle,
  Search,
  Check,
  AlertOctagon,
  Flame
} from 'lucide-react';
import { translations } from '../data/translations';
import { cambodiaProvinces } from '../data/provincesData';

// NOAA Heat Index calculation in Celsius
function calculateHeatIndex(tempC, humidity) {
  // Convert Celsius to Fahrenheit
  const T = (tempC * 9/5) + 32;
  const RH = humidity;

  // Rothfusz regression equation
  let HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (RH * 0.094));

  if (HI >= 80) {
    HI = -42.379 + 2.04901523 * T + 10.14333127 * RH - 0.22475541 * T * RH
      - 0.00683783 * T * T - 0.05481717 * RH * RH + 0.00122874 * T * T * RH
      + 0.00085282 * T * RH * RH - 0.00000199 * T * T * RH * RH;

    if (RH < 13 && T >= 80 && T <= 112) {
      const adj1 = ((13 - RH) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
      HI -= adj1;
    } else if (RH > 85 && T >= 80 && T <= 87) {
      const adj2 = ((RH - 85) / 10) * ((87 - T) / 5);
      HI += adj2;
    }
  }

  // Convert back to Celsius
  const HIC = (HI - 32) * 5/9;
  return Math.round(HIC);
}

export default function HeatRiskCalculator({ lang, externalTemp, externalHumidity }) {
  const t = translations[lang].heatCalculator;
  const [temp, setTemp] = useState(externalTemp || 38);
  const [humidity, setHumidity] = useState(externalHumidity || 62);
  const [selectedProvinceName, setSelectedProvinceName] = useState(lang === 'km' ? 'រាជធានីភ្នំពេញ' : 'Phnom Penh');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync if external props change from Map
  React.useEffect(() => {
    if (externalTemp) setTemp(externalTemp);
    if (externalHumidity) setHumidity(externalHumidity);
  }, [externalTemp, externalHumidity]);

  const heatIndex = useMemo(() => {
    return calculateHeatIndex(temp, humidity);
  }, [temp, humidity]);

  // Determine risk category based on Heat Index in °C
  // Updated with medically accurate Extreme Danger threshold (>= 54°C - 55°C)
  const riskInfo = useMemo(() => {
    if (heatIndex < 27) {
      return {
        level: 'safe',
        badge: t.levels.safe.name,
        desc: t.levels.safe.desc,
        bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-950',
        pillColor: 'bg-emerald-600 text-white',
        barWidth: '20%',
        barColor: 'bg-emerald-500',
        isExtreme: false
      };
    } else if (heatIndex <= 32) {
      return {
        level: 'caution',
        badge: t.levels.caution.name,
        desc: t.levels.caution.desc,
        bgColor: 'bg-yellow-50 border-yellow-300 text-yellow-950',
        pillColor: 'bg-yellow-500 text-slate-900',
        barWidth: '40%',
        barColor: 'bg-yellow-400',
        isExtreme: false
      };
    } else if (heatIndex <= 41) {
      return {
        level: 'extremeCaution',
        badge: t.levels.extremeCaution.name,
        desc: t.levels.extremeCaution.desc,
        bgColor: 'bg-orange-50 border-orange-300 text-orange-950',
        pillColor: 'bg-orange-600 text-white',
        barWidth: '65%',
        barColor: 'bg-orange-500',
        isExtreme: false
      };
    } else if (heatIndex <= 54) {
      return {
        level: 'danger',
        badge: t.levels.danger.name,
        desc: t.levels.danger.desc,
        bgColor: 'bg-red-50 border-red-300 text-red-950',
        pillColor: 'bg-red-600 text-white',
        barWidth: '85%',
        barColor: 'bg-red-600',
        isExtreme: false
      };
    } else {
      // Heat Index >= 55°C (Extreme Danger)
      return {
        level: 'extremeDanger',
        badge: t.levels.extremeDanger.name,
        desc: t.levels.extremeDanger.desc,
        bgColor: 'bg-red-100 border-red-600 text-red-950 ring-2 ring-red-500/50',
        pillColor: 'bg-red-800 text-white animate-pulse',
        barWidth: '100%',
        barColor: 'bg-red-800',
        isExtreme: true
      };
    }
  }, [heatIndex, t]);

  const filteredProvinces = useMemo(() => {
    if (!searchQuery.trim()) return cambodiaProvinces;
    const q = searchQuery.toLowerCase().trim();
    return cambodiaProvinces.filter(p => 
      p.nameKm.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectProvince = (prov) => {
    setTemp(prov.temp);
    setHumidity(prov.humidity);
    setSelectedProvinceName(lang === 'km' ? prov.nameKm : prov.nameEn);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <Thermometer className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'km' ? 'សន្ទស្សន៍កម្តៅកម្ពុជា' : 'Cambodia Heat Index'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            {t.sub}
          </p>
        </div>

        {/* Selected Province Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-slate-500">
            {lang === 'km' ? 'ខេត្តបច្ចុប្បន្ន៖' : 'Current Area:'}
          </span>
          <span className="text-xs font-bold bg-orange-50 text-orange-800 px-3 py-1.5 rounded-xl border border-orange-200">
            📍 {selectedProvinceName}
          </span>
        </div>
      </div>

      {/* Search Bar for All 25 Provinces */}
      <div className="mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          {t.searchProvinceLabel}
        </label>
        
        <div className="relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder={t.searchProvincePlaceholder}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dropdown list of all 25 provinces */}
          {isSearchOpen && (
            <div className="absolute left-0 right-0 top-12 z-20 max-h-56 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'km' ? 'ខេត្ត-រាជធានីទាំង ២៥ នៅកម្ពុជា' : 'All 25 Provinces of Cambodia'}
              </div>
              {filteredProvinces.map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => handleSelectProvince(prov)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-orange-50 hover:text-orange-950 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-slate-800">
                    {lang === 'km' ? prov.nameKm : prov.nameEn}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-orange-600 font-bold">{prov.temp}°C</span>
                    <span className="text-sky-600">{prov.humidity}% RH</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick popular pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="text-slate-500 font-semibold">{t.presetsTitle}</span>
          <button
            onClick={() => handleSelectProvince(cambodiaProvinces[0])}
            className="bg-white hover:bg-orange-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
          >
            {t.phnomPenh}
          </button>
          <button
            onClick={() => handleSelectProvince(cambodiaProvinces[3])}
            className="bg-white hover:bg-orange-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
          >
            {t.battambang}
          </button>
          <button
            onClick={() => handleSelectProvince(cambodiaProvinces[2])}
            className="bg-white hover:bg-orange-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
          >
            {t.siemReap}
          </button>
          {/* 55°C Extreme Danger Demo Trigger */}
          <button
            onClick={() => {
              setTemp(42);
              setHumidity(65); // Generates Heat Index >= 55°C
              setSelectedProvinceName(lang === 'km' ? 'តេស្តសន្ទស្សន៍ ៥៥°C+' : '55°C+ Hazard Test');
            }}
            className="ml-auto bg-red-100 hover:bg-red-200 text-red-800 font-bold px-2.5 py-1 rounded-lg border border-red-300 flex items-center gap-1"
            title="Simulate Extreme Danger Heat Index >= 55°C"
          >
            <Flame className="w-3 h-3 text-red-600" />
            <span>{lang === 'km' ? 'សាកល្បង ៥៥°C (គ្រោះថ្នាក់បំផុត)' : 'Test 55°C (Extreme Danger)'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Sliders Input Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Temperature Slider */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-600" />
                <span>{t.tempLabel}</span>
              </label>
              <span className="text-2xl font-black text-orange-600 font-mono">
                {temp}°C
              </span>
            </div>
            <input
              type="range"
              min="26"
              max="45"
              step="1"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>26°C</span>
              <span>32°C</span>
              <span>38°C</span>
              <span>45°C</span>
            </div>
          </div>

          {/* Humidity Slider */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>{t.humidityLabel}</span>
              </label>
              <span className="text-2xl font-black text-sky-600 font-mono">
                {humidity}%
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              step="5"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>30% (ស្ងួត/Dry)</span>
              <span>60% (មធ្យម/Average)</span>
              <span>95% (សើមខ្លាំង/Very Humid)</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 italic">
            * {lang === 'km' 
              ? 'សំណើមកាន់តែខ្ពស់ រាងកាយមនុស្សកាន់តែពិបាកបញ្ចេញកម្តៅតាមញើស ធ្វើឱ្យមានអារម្មណ៍ថាក្តៅស្អុះស្អាប់ជាងសីតុណ្ហភាពពិត។'
              : 'High humidity blocks sweat evaporation, making the real-feel thermal impact substantially more dangerous.'}
          </p>
        </div>

        {/* Calculated Result Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className={`p-6 rounded-2xl border-2 transition-all ${riskInfo.bgColor}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.heatIndexResult}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${riskInfo.pillColor}`}>
                {riskInfo.badge}
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <div className="text-6xl font-black font-mono tracking-tight">
                {heatIndex}°C
              </div>
              <span className="text-sm font-medium opacity-80">
                {lang === 'km' ? 'កម្តៅជាក់ស្តែង' : 'Real Feel'}
              </span>
            </div>

            {/* Gauge Progress Bar */}
            <div className="w-full h-3 bg-white/70 rounded-full overflow-hidden my-4 border border-black/10">
              <div 
                className={`h-full transition-all duration-500 ${riskInfo.barColor}`}
                style={{ width: riskInfo.barWidth }}
              />
            </div>

            {/* Recommended Safety Actions & Scientific Accuracy */}
            <div className="mt-4 pt-4 border-t border-black/10">
              <h4 className="font-bold text-sm mb-1.5 flex items-center gap-1.5">
                {riskInfo.isExtreme ? (
                  <AlertOctagon className="w-5 h-5 text-red-700 animate-bounce flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{lang === 'km' ? 'សកម្មភាពណែនាំសុខភាព៖' : 'Medical Action Required:'}</span>
              </h4>
              
              {/* Highlighted Warning for Extreme Danger Level */}
              {riskInfo.isExtreme && (
                <div className="my-2 p-3 rounded-xl bg-red-600 text-white font-black text-xs sm:text-sm leading-snug shadow-sm">
                  ⚠️ គ្រោះថ្នាក់ដល់អាយុជីវិតភ្លាមៗ! ហាមធ្វើការហាលថ្ងៃ ស្វែងរកកន្លែងត្រជាក់ជាបន្ទាន់។
                </div>
              )}

              <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                {riskInfo.desc}
              </p>
            </div>
          </div>

          {/* Quick Warning Advice for Outdoor/Factory Shifts */}
          <div className="mt-4 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <span className="font-medium">
              {lang === 'km' ? '⚠️ កម្មករកាត់ដេរ និងអ្នករត់កង់បី៖ ត្រូវផឹកទឹកឱ្យបាន ២៥០ml រៀងរាល់ ១ ម៉ោង។' : '⚠️ Garment & transport workers: sip 250ml water every hour.'}
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
