"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Thermometer, 
  Droplets, 
  Clock, 
  Activity,
  MapPin,
  Flame
} from "lucide-react";

export default function HeatRiskCalculator() {
  const { language, t } = useLanguage();
  const [temperature, setTemperature] = useState<number>(36);
  const [humidity, setHumidity] = useState<number>(60);

  // Listen for Live Weather values passed from LiveHeatMonitor
  useEffect(() => {
    const handleApplyWeather = (e: any) => {
      if (e && e.detail) {
        if (typeof e.detail.temperature === "number") setTemperature(e.detail.temperature);
        if (typeof e.detail.humidity === "number") setHumidity(e.detail.humidity);
      }
    };
    window.addEventListener("mlobsafe_apply_weather", handleApplyWeather);
    return () => window.removeEventListener("mlobsafe_apply_weather", handleApplyWeather);
  }, []);

  const calculateHeatIndex = (tempC: number, rh: number): number => {
    const T = (tempC * 9) / 5 + 32;
    const R = rh;

    let HI_F = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));

    if (HI_F >= 80) {
      HI_F =
        -42.379 +
        2.04901523 * T +
        10.14333127 * R -
        0.22475541 * T * R -
        0.00683783 * T * T -
        0.05481717 * R * R +
        0.00122874 * T * T * R +
        0.00085282 * T * R * R -
        0.00000199 * T * T * R * R;
    }

    const HI_C = ((HI_F - 32) * 5) / 9;
    return Math.round(HI_C);
  };

  const heatIndex = calculateHeatIndex(temperature, humidity);

  let riskLevel: "safe" | "caution" | "danger" | "extreme" = "safe";
  if (heatIndex < 32) {
    riskLevel = "safe";
  } else if (heatIndex < 39) {
    riskLevel = "caution";
  } else if (heatIndex < 46) {
    riskLevel = "danger";
  } else {
    riskLevel = "extreme";
  }

  const setPreset = (tVal: number, hVal: number) => {
    setTemperature(tVal);
    setHumidity(hVal);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-cream-300">
      
      <div className="pb-6 border-b border-cream-200">
        <div className="flex items-center space-x-2 text-heat-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Activity className="w-4 h-4" />
          <span>{language === "km" ? "ការវាយតម្លៃអាកាសធាតុ" : "Weather & Workplace Assessment"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
          {t.tools.heatRiskTitle}
        </h2>
        <p className="text-base text-gray-700 mt-2 max-w-2xl font-medium">
          {t.tools.heatRiskSub}
        </p>
      </div>

      {/* Desktop 2-Column Split: Controls on Left, Live Assessment & Rules on Right */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (lg:col-span-5): Weather Presets & Sliders */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t.riskTool.presets}
              </div>
              <button
                type="button"
                onClick={() => {
                  fetch("https://api.open-meteo.com/v1/forecast?latitude=11.5564&longitude=104.9282&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FBangkok")
                    .then(res => res.json())
                    .then(data => {
                      if (data && data.current) {
                        setTemperature(Math.round(data.current.temperature_2m));
                        setHumidity(Math.round(data.current.relative_humidity_2m));
                      }
                    })
                    .catch(() => setPreset(32, 65));
                }}
                className="text-xs font-black text-heat-700 hover:text-heat-800 flex items-center gap-1 bg-heat-100 hover:bg-heat-200 px-2.5 py-1 rounded-full transition shadow-xs"
              >
                <MapPin className="w-3 h-3 text-heat-600" />
                <span>{language === "km" ? "ទាញយកអាកាសធាតុភ្នំពេញផ្ទាល់" : "Pull Live Phnom Penh Temp"}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPreset(31, 65)}
                className={`p-2.5 rounded-xl text-xs font-bold border transition text-left flex flex-col justify-between ${
                  temperature === 31 && humidity === 65
                    ? "bg-safety-50 border-safety-400 text-safety-800"
                    : "bg-cream-50 border-cream-200 text-gray-700 hover:bg-cream-100"
                }`}
              >
                <span className="truncate">{t.riskTool.presetMorning}</span>
                <span className="text-xs bg-safety-100 text-safety-800 px-1.5 py-0.5 rounded font-black w-fit mt-1">31°C</span>
              </button>

              <button
                type="button"
                onClick={() => setPreset(37, 55)}
                className={`p-2.5 rounded-xl text-xs font-bold border transition text-left flex flex-col justify-between ${
                  temperature === 37 && humidity === 55
                    ? "bg-heat-50 border-heat-400 text-heat-800"
                    : "bg-cream-50 border-cream-200 text-gray-700 hover:bg-cream-100"
                }`}
              >
                <span className="truncate">{t.riskTool.presetMidday}</span>
                <span className="text-xs bg-heat-100 text-heat-800 px-1.5 py-0.5 rounded font-black w-fit mt-1">37°C</span>
              </button>

              <button
                type="button"
                onClick={() => setPreset(40, 60)}
                className={`p-2.5 rounded-xl text-xs font-bold border transition text-left flex flex-col justify-between ${
                  temperature === 40 && humidity === 60
                    ? "bg-danger-50 border-danger-400 text-danger-800"
                    : "bg-cream-50 border-cream-200 text-gray-700 hover:bg-cream-100"
                }`}
              >
                <span className="truncate">{t.riskTool.presetScorcher}</span>
                <span className="text-xs bg-danger-100 text-danger-800 px-1.5 py-0.5 rounded font-black w-fit mt-1">40°C</span>
              </button>

              <button
                type="button"
                onClick={() => setPreset(43, 50)}
                className={`p-2.5 rounded-xl text-xs font-bold border transition text-left flex flex-col justify-between ${
                  temperature === 43 && humidity === 50
                    ? "bg-red-50 border-red-500 text-red-900 ring-2 ring-red-400"
                    : "bg-cream-50 border-cream-200 text-gray-700 hover:bg-cream-100"
                }`}
              >
                <span className="truncate">{language === "km" ? "កំណត់ត្រាក្រចេះ" : "Kratie Record"}</span>
                <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-black w-fit mt-1">43°C 🔥</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-cream-50 p-4 sm:p-5 rounded-2xl border border-cream-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-heat-700 font-bold text-sm">
                  <Thermometer className="w-5 h-5 text-heat-600" />
                  <span>{t.riskTool.tempLabel}</span>
                </div>
                <div className="text-2xl font-black text-gray-900 bg-white px-3 py-1 rounded-xl shadow-sm border border-cream-300">
                  {temperature}&deg;C{language === "en" ? ` (${Math.round((temperature * 9) / 5 + 32)}°F)` : ""}
                </div>
              </div>
              <input
                type="range"
                min="26"
                max="45"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-3 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-heat-600"
              />
              <div className="flex justify-between text-xs font-semibold text-gray-500">
                <span>26°C (Cooler)</span>
                <span>35°C (Average Hot)</span>
                <span>45°C (Extreme)</span>
              </div>
            </div>

            <div className="bg-cream-50 p-4 sm:p-5 rounded-2xl border border-cream-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-cooling-700 font-bold text-sm">
                  <Droplets className="w-5 h-5 text-cooling-600" />
                  <span>{t.riskTool.humidityLabel}</span>
                </div>
                <div className="text-2xl font-black text-gray-900 bg-white px-3 py-1 rounded-xl shadow-sm border border-cream-300">
                  {humidity}%
                </div>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                step="5"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full h-3 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-cooling-600"
              />
              <div className="flex justify-between text-xs font-semibold text-gray-500">
                <span>30% (Dry)</span>
                <span>65% (Typical Monsoonal)</span>
                <span>95% (Oppressive)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-7): Live Heat Index & Rules */}
        <div className="lg:col-span-7">
          <div
            className={`p-6 sm:p-7 rounded-3xl border-2 transition-all ${
              riskLevel === "extreme"
                ? "bg-danger-50 border-danger-600 shadow-lg shadow-danger-600/10"
                : riskLevel === "danger"
                ? "bg-heat-50 border-heat-600 shadow-md shadow-heat-600/10"
                : riskLevel === "caution"
                ? "bg-amber-50 border-amber-500"
                : "bg-safety-50 border-safety-500"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="flex items-center space-x-5">
                <div
                  className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-white shadow-md flex-shrink-0 ${
                    riskLevel === "extreme"
                      ? "bg-danger-600"
                      : riskLevel === "danger"
                      ? "bg-heat-600"
                      : riskLevel === "caution"
                      ? "bg-amber-500"
                      : "bg-safety-600"
                  }`}
                >
                  <span className="text-3xl leading-none">{heatIndex}&deg;C</span>
                  {language === "en" && (
                    <span className="text-xs font-bold text-white/90">({Math.round((heatIndex * 9) / 5 + 32)}&deg;F)</span>
                  )}
                  <span className="text-xs uppercase font-bold tracking-wider mt-1 opacity-90">Real Feel</span>
                </div>

                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-1 ${
                      riskLevel === "extreme"
                        ? "bg-danger-200 text-danger-900"
                        : riskLevel === "danger"
                        ? "bg-heat-200 text-heat-900"
                        : riskLevel === "caution"
                        ? "bg-amber-200 text-amber-900"
                        : "bg-safety-200 text-safety-900"
                    }`}
                  >
                    {riskLevel === "extreme"
                      ? t.riskTool.statusExtreme
                      : riskLevel === "danger"
                      ? t.riskTool.statusDanger
                      : riskLevel === "caution"
                      ? t.riskTool.statusCaution
                      : t.riskTool.statusNormal}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                    {riskLevel === "extreme"
                      ? language === "km" ? "គ្រោះថ្នាក់កម្រិតខ្ពស់បំផុត (ហានិភ័យខ្យល់គរធ្ងន់ធ្ងរ)" : "Extreme Danger: High Risk of Heat Stroke"
                      : riskLevel === "danger"
                      ? language === "km" ? "គ្រោះថ្នាក់ខ្ពស់ (ហានិភ័យអស់កម្លាំង និងរមួលក្រពើ)" : "Danger: Heat Exhaustion & Cramps Likely"
                      : riskLevel === "caution"
                      ? language === "km" ? "ប្រុងប្រយ័ត្ន (អាចអស់កម្លាំងពេលធ្វើការយូរ)" : "Caution: Fatigue Possible with Prolonged Exposure"
                      : language === "km" ? "កម្រិតសុវត្ថិភាពធម្មតា" : "Safe Zone: Low Environmental Risk"}
                  </h3>
                </div>
              </div>

              <div className="bg-white/90 p-4 rounded-2xl border border-black/5 text-sm font-semibold text-gray-800 sm:max-w-xs flex-shrink-0">
                <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-heat-600" />
                  <span>{language === "km" ? "វដ្តសម្រាកការងារដែលណែនាំ៖" : "Recommended Work-Rest Cycle:"}</span>
                </div>
                <p>
                  {riskLevel === "extreme"
                    ? language === "km" ? "ធ្វើការ ៣០ នាទី / សម្រាកក្នុងម្លប់ ៣០ នាទី (ឬផ្អាកការងារធ្ងន់)" : "30 min work / 30 min shade rest (or suspend heavy labor)"
                    : riskLevel === "danger"
                    ? language === "km" ? "ធ្វើការ ៤០ នាទី / សម្រាកក្នុងម្លប់ ២០ នាទី + ផឹកទឹក ១ កែវ" : "40 min work / 20 min shade rest + 1 cup water"
                    : riskLevel === "caution"
                    ? language === "km" ? "ធ្វើការ ៥០ នាទី / សម្រាកក្នុងម្លប់ ១០ នាទី + ផឹកទឹកត្រជាក់" : "50 min work / 10 min rest in shade + drink cool water"
                    : language === "km" ? "សម្រាកធម្មតាតាមម៉ោងការងារ និងរក្សាជាតិទឹក" : "Standard rest breaks + maintain steady hydration"}
                </p>
              </div>

            </div>

            <div className="mt-5 pt-4 border-t border-black/10">
              <div className="text-xs font-extrabold uppercase tracking-wider text-gray-800 mb-2">
                {t.riskTool.rulesHeading}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-gray-800 font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-heat-600 font-bold">✔</span>
                  <span>
                    {language === "km" 
                      ? "ផឹកទឹកស្អាត ១ កែវរៀងរាល់ ២០-៣០ នាទី (កុំរង់ចាំដល់ស្រេក)" 
                      : "Drink 1 cup of water every 20-30 min (don't wait for thirst)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-heat-600 font-bold">✔</span>
                  <span>
                    {language === "km" 
                      ? "ស្លៀកសម្លៀកបំពាក់ពណ៌ស្រាល និងមានខ្យល់ចេញចូល" 
                      : "Wear light-colored, loose, breathable fabrics"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-heat-600 font-bold">✔</span>
                  <span>
                    {language === "km" 
                      ? "ជៀសវាងការត្រូវពន្លឺថ្ងៃផ្ទាល់ចន្លោះម៉ោង ១១ ព្រឹក - ៣ រសៀល" 
                      : "Avoid direct sun exposure between 11:00 AM - 3:00 PM"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-heat-600 font-bold">✔</span>
                  <span>
                    {language === "km" 
                      ? "ត្រួតពិនិត្យមិត្តរួមការងារ និងដឹងពីទីតាំងឡានពេទ្យ ១១៩" 
                      : "Buddy system: monitor coworkers & keep 119 ready"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
