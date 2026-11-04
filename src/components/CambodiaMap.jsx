import React, { useState } from 'react';
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  ChevronRight,
  Layers,
  LayoutGrid,
  Map as MapIcon
} from 'lucide-react';
import { cambodiaProvinces, getAqiCategory } from '../data/provincesData';
import { translations } from '../data/translations';

export default function CambodiaMap({ lang, onSelectProvinceForCalculator }) {
  const t = translations[lang].mapSection;
  const [activeMode, setActiveMode] = useState('heat'); // 'heat' or 'aqi'
  const [viewStyle, setViewStyle] = useState('map'); // 'map' or 'grid'
  const [selectedProvinceId, setSelectedProvinceId] = useState('phnom-penh');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const selectedProvince = cambodiaProvinces.find(p => p.id === selectedProvinceId) || cambodiaProvinces[0];
  const aqiInfo = getAqiCategory(selectedProvince.aqi, lang);

  // Group provinces by region
  const regions = [
    { id: 'all', nameKm: 'ខេត្តទាំងអស់ (២៥)', nameEn: 'All (25)' },
    { id: 'Central', nameKm: 'កណ្ដាល & រាជធានី', nameEn: 'Central' },
    { id: 'Northwest', nameKm: 'ភាគពាយ័ព្យ', nameEn: 'Northwest' },
    { id: 'Coast', nameKm: 'តំបន់ឆ្នេរ', nameEn: 'Coastal' },
    { id: 'Northeast', nameKm: 'ភាគឦសាន', nameEn: 'Northeast' },
    { id: 'South East', nameKm: 'ភាគអាគ្នេយ៍', nameEn: 'Southeast' }
  ];

  const filteredProvinces = cambodiaProvinces.filter(p => {
    const matchesSearch = !searchQuery.trim() || 
      p.nameKm.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase().trim());
    
    const matchesRegion = selectedRegion === 'all' || 
      p.region.toLowerCase().includes(selectedRegion.toLowerCase());

    return matchesSearch && matchesRegion;
  });

  const getProvinceHeatIndex = (temp, humidity) => {
    const T = (temp * 9/5) + 32;
    const RH = humidity;
    let HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (RH * 0.094));
    if (HI >= 80) {
      HI = -42.379 + 2.04901523 * T + 10.14333127 * RH - 0.22475541 * T * RH
        - 0.00683783 * T * T - 0.05481717 * RH * RH + 0.00122874 * T * T * RH
        + 0.00085282 * T * RH * RH - 0.00000199 * T * T * RH * RH;
    }
    return Math.round((HI - 32) * 5/9);
  };

  const getHeatBadge = (temp) => {
    if (temp >= 40) return { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700', fill: '#DC2626' };
    if (temp >= 38) return { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600', fill: '#F97316' };
    if (temp >= 36) return { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-600', fill: '#F59E0B' };
    return { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600', fill: '#10B981' };
  };

  const getAqiBadge = (aqi) => {
    if (aqi > 150) return { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700', fill: '#DC2626' };
    if (aqi > 100) return { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600', fill: '#F97316' };
    if (aqi > 50) return { bg: 'bg-yellow-400', text: 'text-slate-900', border: 'border-yellow-500', fill: '#EAB308' };
    return { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600', fill: '#10B981' };
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'km' ? 'ផែនទីពេលវេលាជាក់ស្តែង (Live Map)' : 'Live Environmental Map'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {t.sub}
          </p>
        </div>

        {/* View Style (Map vs Regional Grid) & Mode Switchers */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Map vs Grid View */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewStyle('map')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                viewStyle === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'ផែនទី SVG' : 'Map View'}</span>
            </button>
            <button
              onClick={() => setViewStyle('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                viewStyle === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'តារាងខេត្ត (២៥)' : 'Grid (25)'}</span>
            </button>
          </div>

          {/* Metric Toggle: Heat vs AQI */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveMode('heat')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === 'heat'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'កម្តៅ (°C)' : 'Heat (°C)'}</span>
            </button>
            <button
              onClick={() => setActiveMode('aqi')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === 'aqi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>AQI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Map or Grid View (7 cols) + Selected Province Details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Side: Map or Province Grid (7 cols) */}
        <div className="lg:col-span-7">
          {viewStyle === 'map' ? (
            /* Interactive SVG Cambodia Map */
            <div className="bg-[#FAF5EB] rounded-3xl p-4 sm:p-6 border border-amber-200/80 relative flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex items-center justify-between text-xs text-amber-900/60 font-bold mb-2">
                <span>📍 ចុចលើឈ្មោះខេត្តដើម្បីមើលព័ត៌មានលម្អិត</span>
                <span className="hidden sm:inline">ព្រះរាជាណាចក្រកម្ពុជា • CAMBODIA</span>
              </div>

              <div className="relative w-full h-[380px] sm:h-[430px] flex items-center justify-center">
                <svg
                  viewBox="120 90 680 510"
                  className="w-full h-full drop-shadow-sm select-none"
                >
                  {/* Detailed Cambodia Land Silhouette */}
                  <path
                    d="M 190,260 
                       C 200,200 230,160 290,140 
                       C 350,120 440,125 500,135 
                       C 560,145 640,140 700,170 
                       C 750,200 780,260 770,330 
                       C 760,400 690,440 640,490 
                       C 600,530 520,550 460,570 
                       C 400,590 350,580 310,550 
                       C 270,520 230,480 240,420 
                       C 230,370 180,330 170,290 Z"
                    fill="#EFE4CF"
                    stroke="#D6C4A5"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Tonle Sap Lake */}
                  <ellipse
                    cx="360"
                    cy="320"
                    rx="70"
                    ry="30"
                    fill="#BAE6FD"
                    stroke="#7DD3FC"
                    strokeWidth="1.5"
                    transform="rotate(-25, 360, 320)"
                    opacity="0.9"
                  />
                  <text
                    x="335"
                    y="325"
                    fontSize="11"
                    fill="#0284C7"
                    fontWeight="bold"
                    opacity="0.8"
                  >
                    បឹងទន្លេសាប
                  </text>

                  {/* Mekong River */}
                  <path
                    d="M 620,140 Q 610,240 580,310 T 540,390 T 490,440 T 490,560"
                    fill="none"
                    stroke="#7DD3FC"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* Province Interactive Hotspot Nodes */}
                  {cambodiaProvinces.map((prov) => {
                    const isSelected = prov.id === selectedProvinceId;
                    const badge = activeMode === 'heat' ? getHeatBadge(prov.temp) : getAqiBadge(prov.aqi);

                    return (
                      <g
                        key={prov.id}
                        onClick={() => setSelectedProvinceId(prov.id)}
                        className="cursor-pointer transition-transform hover:scale-110"
                        transform={`translate(${prov.x}, ${prov.y})`}
                      >
                        {isSelected && (
                          <circle
                            r="18"
                            fill="none"
                            stroke={badge.fill}
                            strokeWidth="2.5"
                            className="animate-ping"
                            opacity="0.6"
                          />
                        )}

                        <circle
                          r={isSelected ? "13" : "10"}
                          fill={badge.fill}
                          stroke="#FFFFFF"
                          strokeWidth={isSelected ? "3" : "2"}
                          className="shadow-sm transition-all"
                        />

                        <text
                          textAnchor="middle"
                          dy="4"
                          fontSize={isSelected ? "9" : "8"}
                          fill="#FFFFFF"
                          fontWeight="bold"
                        >
                          {activeMode === 'heat' ? `${prov.temp}°` : prov.aqi}
                        </text>

                        <text
                          textAnchor="middle"
                          dy="22"
                          fontSize="9"
                          fill="#1E293B"
                          fontWeight={isSelected ? "bold" : "600"}
                          className="select-none pointer-events-none drop-shadow-xs"
                        >
                          {lang === 'km' ? prov.nameKm.replace('ខេត្ត', '').replace('រាជធានី', '') : prov.nameEn}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map Color Legend Footer */}
              <div className="pt-3 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-700">
                  {t.legendTitle}
                </span>
                {activeMode === 'heat' ? (
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &lt;36°C</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 36-37°C</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> 38-39°C</span>
                    <span className="flex items-center gap-1 font-bold text-red-700"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> ≥40°C</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 0-50 (Good)</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> 51-100</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> 101-150</span>
                    <span className="flex items-center gap-1 font-bold text-red-700"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> 151+</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* All 25 Provinces Grid View */
            <div className="bg-slate-50/80 rounded-3xl p-5 border border-slate-200">
              {/* Region Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {regions.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedRegion === r.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                    }`}
                  >
                    {lang === 'km' ? r.nameKm : r.nameEn}
                  </button>
                ))}
              </div>

              {/* 25 Province Cards Scrollable Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredProvinces.map(prov => {
                  const isSelected = prov.id === selectedProvinceId;
                  const heatBadge = getHeatBadge(prov.temp);
                  const aqiBadge = getAqiBadge(prov.aqi);

                  return (
                    <button
                      key={prov.id}
                      onClick={() => setSelectedProvinceId(prov.id)}
                      className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-orange-50 border-orange-500 shadow-xs ring-1 ring-orange-400'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {lang === 'km' ? prov.nameKm : prov.nameEn}
                      </div>
                      <div className="flex items-center justify-between gap-1 mt-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] ${heatBadge.bg} ${heatBadge.text}`}>
                          {prov.temp}°C
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          AQI {prov.aqi}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Selected Province Detailed Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200">
            {/* Search Dropdown / Input */}
            <div className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'km' ? '🔍 ស្វែងរកខេត្តទាំង ២៥...' : '🔍 Search 25 provinces...'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Province Header */}
            <div className="pb-4 border-b border-slate-200 flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                  {selectedProvince.region} Region
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {lang === 'km' ? selectedProvince.nameKm : selectedProvince.nameEn}
                </h3>
              </div>
              <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-slate-200">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
            </div>

            {/* Metrics Dual Display: Heat & AQI */}
            <div className="grid grid-cols-2 gap-4 my-4">
              {/* Temperature Card */}
              <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-2xs">
                <span className="text-xs text-slate-500 block">
                  {t.tempLabel}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-orange-600 font-mono my-0.5">
                  {selectedProvince.temp}°C
                </div>
                <div className="text-[11px] text-slate-500">
                  {t.realFeelLabel}: <strong className="text-slate-800 font-mono">{getProvinceHeatIndex(selectedProvince.temp, selectedProvince.humidity)}°C</strong>
                </div>
              </div>

              {/* AQI Air Quality Card */}
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
                <span className="text-xs text-slate-500 block">
                  {t.aqiLabel}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono my-0.5">
                  {selectedProvince.aqi}
                </div>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${aqiInfo.color}`}>
                  {lang === 'km' ? aqiInfo.statusKm : aqiInfo.statusEn}
                </span>
              </div>
            </div>

            {/* Worker Safety Advisory for this Specific Province */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{t.workerAdviceTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                {lang === 'km' ? selectedProvince.workerAlertKm : selectedProvince.workerAlertEn}
              </p>
            </div>
          </div>

          {/* Action: Sync with Heat Risk Calculator */}
          {onSelectProvinceForCalculator && (
            <button
              onClick={() => onSelectProvinceForCalculator(selectedProvince.temp, selectedProvince.humidity)}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-orange-600 text-white font-bold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-md group"
            >
              <Thermometer className="w-4 h-4 text-orange-400 group-hover:text-white" />
              <span>
                {lang === 'km' 
                  ? `បញ្ចូលទិន្នន័យ ${selectedProvince.nameKm} ទៅការគណនាកម្ដៅ` 
                  : `Calculate Heat Risk for ${selectedProvince.nameEn}`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
