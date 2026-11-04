import React, { useState } from 'react';
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  CloudRain, 
  CloudLightning,
  Sparkles, 
  ChevronRight,
  Maximize2,
  RefreshCw,
  Info,
  ShieldCheck,
  Search
} from 'lucide-react';
import { cambodiaProvinces, getAqiCategory } from '../data/provincesData';
import { translations } from '../data/translations';

export default function CambodiaMap({ lang, onSelectProvinceForCalculator }) {
  const t = translations[lang].mapSection;
  const [activeOverlay, setActiveOverlay] = useState('temp'); // 'temp', 'pm2_5', 'wind', 'rain'
  const [selectedProvinceId, setSelectedProvinceId] = useState('phnom-penh');
  const [iframeKey, setIframeKey] = useState(0);

  const selectedProvince = cambodiaProvinces.find(p => p.id === selectedProvinceId) || cambodiaProvinces[0];
  const aqiInfo = getAqiCategory(selectedProvince.aqi, lang);

  // Dynamic Windy Embed URL centered on Cambodia (Lat: 12.5657, Lon: 104.9910, Zoom: 6)
  const windyEmbedUrl = `https://embed.windy.com/embed2.html?lat=12.5657&lon=104.9910&detailLat=${selectedProvince.temp ? '11.5564' : '12.5657'}&detailLon=104.9282&width=100%&height=520&zoom=6&level=surface&overlay=${activeOverlay}&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=%C2%B0C&radarRange=-1`;

  const layerOptions = [
    { 
      id: 'temp', 
      labelKm: '🌡️ សីតុណ្ហភាព & កម្តៅ (Temperature)', 
      labelEn: '🌡️ Temperature & Heat',
      activeColor: 'bg-orange-600 text-white' 
    },
    { 
      id: 'pm2_5', 
      labelKm: '🍃 ធូលី PM2.5 & ខ្យល់ (Air Quality)', 
      labelEn: '🍃 PM2.5 Air Quality',
      activeColor: 'bg-emerald-600 text-white' 
    },
    { 
      id: 'wind', 
      labelKm: '💨 ចរន្តខ្យល់ (Wind Stream)', 
      labelEn: '💨 Wind Streams',
      activeColor: 'bg-sky-600 text-white' 
    },
    { 
      id: 'rain', 
      labelKm: '🌧️ ភ្លៀងធ្លាក់ (Rainfall)', 
      labelEn: '🌧️ Rain Accumulation',
      activeColor: 'bg-indigo-600 text-white' 
    }
  ];

  const handleRefreshMap = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'km' ? 'ផែនទីផ្ទាល់ពីផ្កាយរណប (Live Satellite Map)' : 'Live Satellite Weather Map'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {t.sub}
          </p>
        </div>

        {/* Quick Map Reload */}
        <button
          onClick={handleRefreshMap}
          className="inline-flex items-center gap-2 self-start lg:self-auto text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors"
          title="Reload live satellite feed"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>{lang === 'km' ? 'ផ្ទុកទិន្នន័យឡើងវិញ' : 'Refresh Live Feed'}</span>
        </button>
      </div>

      {/* Layer Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-5">
        <div className="flex flex-wrap items-center gap-2">
          {layerOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveOverlay(opt.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeOverlay === opt.id
                  ? `${opt.activeColor} shadow-xs scale-102`
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {lang === 'km' ? opt.labelKm : opt.labelEn}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          Powered by ECMWF & Windy.com
        </span>
      </div>

      {/* Real Live Interactive Windy Map Embed */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-950">
        <iframe
          key={`${activeOverlay}-${iframeKey}`}
          title="Cambodia Live Heat and Weather Map"
          width="100%"
          height="520"
          src={windyEmbedUrl}
          frameBorder="0"
          className="w-full h-[450px] sm:h-[520px] rounded-3xl block"
          loading="lazy"
        />

        {/* Floating Quick Instructions Banner */}
        <div className="absolute top-3 left-3 z-10 hidden sm:flex items-center gap-2 bg-black/75 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl border border-white/20">
          <Info className="w-3.5 h-3.5 text-orange-400" />
          <span>{lang === 'km' ? 'អាចអូសពង្រីក/បង្រួម (Zoom/Pan) និងចុច Play នៅខាងក្រោមដើម្បីមើលចរន្តកម្ដៅ' : 'Interactive: Zoom, pan, or hit Play at bottom to view heat forecast'}</span>
        </div>
      </div>

      {/* Bottom Province Inspection & Quick Selection Bar */}
      <div className="mt-8 bg-slate-50/80 rounded-3xl p-6 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>{lang === 'km' ? 'ជ្រើសរើសខេត្តដើម្បីមើលព័ត៌មានលម្អិត៖' : 'Inspect Province Specific Data:'}</span>
          </span>

          <span className="text-xs font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
            {lang === 'km' ? selectedProvince.nameKm : selectedProvince.nameEn}
          </span>
        </div>

        {/* Quick Province Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 my-4">
          {cambodiaProvinces.slice(0, 8).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProvinceId(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                p.id === selectedProvinceId
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {lang === 'km' ? p.nameKm : p.nameEn}
            </button>
          ))}
          <span className="text-xs text-slate-400 italic">
            {lang === 'km' ? '+ ១៧ ខេត្តទៀតក្នុងឧបករណ៍គណនា' : '+ 17 more in calculator'}
          </span>
        </div>

        {/* Selected Province Metrics & Health Advisory Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Temperature & Real Feel */}
          <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-2xs">
            <span className="text-xs text-slate-500 block">
              {t.tempLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-600 font-mono my-0.5">
              {selectedProvince.temp}°C
            </div>
            <div className="text-[11px] text-slate-500">
              {lang === 'km' ? 'កម្តៅជាក់ស្តែង៖' : 'Real Feel:'} <strong className="text-slate-800 font-mono">
                {Math.round(selectedProvince.temp + (selectedProvince.humidity > 60 ? 4 : 2))}°C
              </strong>
            </div>
          </div>

          {/* AQI Score */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-xs text-slate-500 block">
              {t.aqiLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono my-0.5">
              {selectedProvince.aqi}
            </div>
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${aqiInfo.color}`}>
              {lang === 'km' ? aqiInfo.statusKm : aqiInfo.statusEn}
            </span>
          </div>

          {/* Worker Safety Advisory for Selected Province */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                {t.workerAdviceTitle}
              </span>
              <p className="text-xs text-amber-950 leading-relaxed">
                {lang === 'km' ? selectedProvince.workerAlertKm : selectedProvince.workerAlertEn}
              </p>
            </div>

            {onSelectProvinceForCalculator && (
              <button
                onClick={() => onSelectProvinceForCalculator(selectedProvince.temp, selectedProvince.humidity)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:text-orange-900 underline self-start"
              >
                <span>{lang === 'km' ? 'គណនាហានិភ័យសម្រាប់ខេត្តនេះ' : 'Calculate Risk for this Province'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
