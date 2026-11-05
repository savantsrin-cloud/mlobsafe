"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sun, 
  Droplets, 
  Flame, 
  Wind, 
  RefreshCw, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Activity,
  ArrowRight,
  TrendingUp,
  Thermometer
} from "lucide-react";

interface CityWeatherConfig {
  id: string;
  nameEn: string;
  nameKm: string;
  noteEn: string;
  noteKm: string;
  lat: number;
  lng: number;
  defaultTemp: number;
  defaultHumidity: number;
}

const CITIES: CityWeatherConfig[] = [
  {
    id: "phnom_penh",
    nameEn: "Phnom Penh",
    nameKm: "រាជធានីភ្នំពេញ",
    noteEn: "Garment SEZs, Tuk-Tuks, Street Vendors",
    noteKm: "តំបន់កាត់ដេរ កង់បី និងអ្នកលក់ដូរតាមផ្លូវ",
    lat: 11.5564,
    lng: 104.9282,
    defaultTemp: 32.0,
    defaultHumidity: 65,
  },
  {
    id: "kratie",
    nameEn: "Kratie",
    nameKm: "ខេត្តក្រចេះ",
    noteEn: "Cambodia 43.0°C All-Time Heat Record Hub",
    noteKm: "ទីតាំងបំបែកកំណត់ត្រាកម្តៅ ៤៣.០°C ប្រវត្តិសាស្ត្រ",
    lat: 12.4881,
    lng: 106.0188,
    defaultTemp: 33.5,
    defaultHumidity: 55,
  },
  {
    id: "battambang",
    nameEn: "Battambang",
    nameKm: "ខេត្តបាត់ដំបង",
    noteEn: "Agricultural Belt & Afternoon Sun Intensity",
    noteKm: "ខ្សែក្រវាត់កសិកម្ម និងកម្ដៅថ្ងៃត្រង់ខ្លាំង",
    lat: 13.0957,
    lng: 103.2022,
    defaultTemp: 32.5,
    defaultHumidity: 60,
  },
  {
    id: "siem_reap",
    nameEn: "Siem Reap",
    nameKm: "ខេត្តសៀមរាប",
    noteEn: "Outdoor Guides, Drivers & Open-Air Markets",
    noteKm: "មគ្គុទ្ទេសក៍ទេសចរណ៍ អ្នករត់កង់បី និងផ្សារចំហរ",
    lat: 13.3633,
    lng: 103.8564,
    defaultTemp: 31.8,
    defaultHumidity: 63,
  },
  {
    id: "kampong_cham",
    nameEn: "Kampong Cham",
    nameKm: "ខេត្តកំពង់ចាម",
    noteEn: "Central River Plains & Transport Junction",
    noteKm: "តំបន់ទំនាបទន្លេមេគង្គ និងចំណតដឹកជញ្ជូន",
    lat: 12.0000,
    lng: 105.4500,
    defaultTemp: 32.2,
    defaultHumidity: 62,
  },
  {
    id: "sihanoukville",
    nameEn: "Sihanoukville",
    nameKm: "ក្រុងព្រះសីហនុ",
    noteEn: "Coastal Ports, Construction & High Humidity",
    noteKm: "កំពង់ផែ សំណង់ និងសំណើមសមុទ្រខ្ពស់ស្អុះស្អាប់",
    lat: 10.6275,
    lng: 103.5221,
    defaultTemp: 30.5,
    defaultHumidity: 75,
  },
];

// Stull's formula for Wet-Bulb Temperature (WBT)
function calculateWetBulb(tempC: number, rh: number): number {
  const T = tempC;
  const RH = rh;
  const Tw =
    T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035;
  return Math.round(Tw * 10) / 10;
}

export default function LiveHeatMonitor() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<CityWeatherConfig>(CITIES[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Live Weather State
  const [temp, setTemp] = useState<number>(32.0);
  const [humidity, setHumidity] = useState<number>(65);
  const [feelsLike, setFeelsLike] = useState<number>(38.0);
  const [maxTemp, setMaxTemp] = useState<number>(33.5);
  const [minTemp, setMinTemp] = useState<number>(24.5);
  const [windSpeed, setWindSpeed] = useState<number>(4.2);
  const [isLive, setIsLive] = useState<boolean>(false);

  const wetBulb = calculateWetBulb(temp, humidity);

  // Fetch real-time weather from Open-Meteo
  const fetchWeather = async (city: CityWeatherConfig) => {
    setIsRefreshing(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather API failed");
      const data = await res.json();

      if (data && data.current) {
        setTemp(Math.round(data.current.temperature_2m * 10) / 10);
        setHumidity(Math.round(data.current.relative_humidity_2m));
        setFeelsLike(Math.round(data.current.apparent_temperature * 10) / 10);
        setWindSpeed(Math.round(data.current.wind_speed_10m * 10) / 10);
        
        if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_max[0]) {
          setMaxTemp(Math.round(data.daily.temperature_2m_max[0] * 10) / 10);
        }
        if (data.daily && data.daily.temperature_2m_min && data.daily.temperature_2m_min[0]) {
          setMinTemp(Math.round(data.daily.temperature_2m_min[0] * 10) / 10);
        }

        setIsLive(true);
        const now = new Date();
        setLastUpdated(
          now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        );
      }
    } catch (err) {
      console.warn("Using fallback weather values for Cambodia:", err);
      setTemp(city.defaultTemp);
      setHumidity(city.defaultHumidity);
      setFeelsLike(Math.round((city.defaultTemp + 5.5) * 10) / 10);
      setIsLive(false);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  // Determine Heat Risk Tier based on Feels Like (Heat Index)
  let riskColor = "bg-emerald-500";
  let riskBorder = "border-emerald-500";
  let riskBg = "bg-emerald-50";
  let riskText = "text-emerald-900";
  let riskTitleEn = "Low / Moderate Heat Stress";
  let riskTitleKm = "កម្ដៅកម្រិតមធ្យម / ធម្មតា";
  let riskActionEn = "Stay hydrated and drink 1 cup of clean water every 45 minutes.";
  let riskActionKm = "បន្តផឹកទឹកស្អាត ១ កែវរៀងរាល់ ៤៥ នាទីម្តង។";

  if (feelsLike >= 46) {
    riskColor = "bg-red-600";
    riskBorder = "border-red-600";
    riskBg = "bg-red-50";
    riskText = "text-red-900";
    riskTitleEn = "Extreme Danger: Fatal Heat Stroke Risk";
    riskTitleKm = "គ្រោះថ្នាក់កម្រិតខ្ពស់បំផុត៖ ហានិភ័យដាច់សរសៃឈាមកម្ដៅ (Heat Stroke)";
    riskActionEn = "Mandatory 15-minute shade breaks every 45 mins. Stop heavy outdoor work between 11 AM - 3 PM. Call 119 for fainted workers.";
    riskActionKm = "ត្រូវសម្រាកក្នុងម្លប់ ១៥ នាទីរៀងរាល់ ៤៥ នាទី។ ជៀសវាងការងារធ្ងន់ចន្លោះម៉ោង ១១ ព្រឹក - ៣ រសៀល។ ហៅ ១១៩ បើមានអ្នកខ្យល់គរ។";
  } else if (feelsLike >= 39) {
    riskColor = "bg-orange-600";
    riskBorder = "border-orange-500";
    riskBg = "bg-orange-50";
    riskText = "text-orange-900";
    riskTitleEn = "Danger: Heat Exhaustion & Muscle Cramps";
    riskTitleKm = "គ្រោះថ្នាក់៖ អស់កម្លាំងខ្លាំង និងរមួលក្រពើដោយកម្ដៅ";
    riskActionEn = "Take 10-minute shade pauses every hour. Drink 1 cup of cool water every 20 minutes. Pour water on head and neck.";
    riskActionKm = "សម្រាកម្លប់ ១០ នាទីរៀងរាល់ ១ ម៉ោង។ ផឹកទឹកត្រជាក់ ១ កែវរៀងរាល់ ២០ នាទី។ យកទឹកជូតកញ្ចឹងក និងក្បាល។";
  } else if (feelsLike >= 33) {
    riskColor = "bg-amber-500";
    riskBorder = "border-amber-400";
    riskBg = "bg-amber-50";
    riskText = "text-amber-900";
    riskTitleEn = "Extreme Caution: Dehydration & Fatigue";
    riskTitleKm = "ការប្រុងប្រយ័ត្នខ្ពស់៖ ខ្វះជាតិទឹក និងអស់កម្លាំងស្អុះស្អាប់";
    riskActionEn = "Wear wide-brim hats or long cotton sleeves. Keep insulated water flask nearby.";
    riskActionKm = "ពាក់មួក ឬអាវដៃវែងកប្បាស។ ដាក់ដបទឹកត្រជាក់ជាប់ខ្លួន។";
  }

  // Scroll and pass values to Heat Risk Calculator
  const handleApplyToCalculator = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mlobsafe_apply_weather", {
          detail: { temperature: Math.round(temp), humidity: Math.round(humidity) },
        })
      );
      const el = document.getElementById("heat-risk") || document.getElementById("interactive-tools");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div id="live-heat-monitor" className="w-full space-y-6">
      
      {/* 1. MAIN LIVE WEATHER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-heat-300 relative overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider border border-red-200">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>{language === "km" ? "ទិន្នន័យផ្សាយបន្តផ្ទាល់ (Live Weather)" : "Live Real-Time Weather"}</span>
              </span>
              <span className="text-[11px] font-bold text-gray-500">
                {isLive ? (language === "km" ? `ធ្វើបច្ចុប្បន្នភាពម៉ោង ${lastUpdated}` : `Updated at ${lastUpdated}`) : "Cambodia Weather Feed"}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Sun className="w-7 h-7 text-amber-500 animate-spin-slow flex-shrink-0" />
              <span>{language === "km" ? "សីតុណ្ហភាព និងកម្ដៅជាក់ស្ដែងនៅកម្ពុជា" : "Real Temperature & Heat Numbers in Cambodia"}</span>
            </h2>
            <p className="text-sm font-semibold text-gray-600 mt-1">
              {language === "km"
                ? "ទិន្នន័យកម្ដៅថ្ងៃផ្ទាល់ពីផ្កាយរណប និងស្ថានីយឧតុនិយម សម្រាប់ការពារសុវត្ថិភាពកម្មករ"
                : "Real-time thermal monitoring across key Cambodian worker provinces and historical empirical data"}
            </p>
          </div>

          {/* Refresh & Calculator Apply Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchWeather(selectedCity)}
              disabled={isRefreshing}
              className="p-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition flex items-center gap-2 text-xs font-black disabled:opacity-50 shadow-xs border border-gray-200"
              title="Refresh live data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-heat-600" : ""}`} />
              <span className="hidden sm:inline">{language === "km" ? "ផ្ទុកឡើងវិញ" : "Refresh"}</span>
            </button>

            <button
              onClick={handleApplyToCalculator}
              className="px-4 py-2.5 rounded-2xl bg-heat-600 hover:bg-heat-700 text-white transition flex items-center gap-2 text-xs font-black shadow-md hover:shadow-lg"
            >
              <Activity className="w-4 h-4" />
              <span>{language === "km" ? "គណនាហានិភ័យជាមួយកម្ដៅនេះ" : "Calculate My Risk"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* City Switcher Tabs */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-black uppercase tracking-wider text-gray-400 whitespace-nowrap mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-heat-600" />
            {language === "km" ? "ជ្រើសរើសខេត្ត/ក្រុង៖" : "Select City:"}
          </span>
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCity(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition flex items-center gap-1.5 border ${
                selectedCity.id === c.id
                  ? "bg-heat-600 text-white border-heat-600 shadow-sm"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              <span>{language === "km" ? c.nameKm : c.nameEn}</span>
              {c.id === "kratie" && (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                  43°C
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selected City Info Subtitle */}
        <div className="text-xs font-bold text-gray-500 italic mb-4">
          📍 {language === "km" ? selectedCity.noteKm : selectedCity.noteEn}
        </div>

        {/* 4 LIVE METRIC GAUGES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Ambient Air Temperature */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-800 text-xs font-black uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>{language === "km" ? "សីតុណ្ហភាពខ្យល់" : "Air Temperature"}</span>
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-black">
                {isLive ? "LIVE" : "NOW"}
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight flex items-baseline gap-1.5">
                <span>{temp}&deg;C</span>
                <span className="text-sm sm:text-base font-bold text-gray-500">
                  ({Math.round((temp * 9) / 5 + 32)}&deg;F)
                </span>
              </div>
              <div className="text-xs font-semibold text-gray-600 mt-1 flex items-center justify-between">
                <span>{language === "km" ? "ខ្ពស់បំផុតថ្ងៃនេះ៖" : "Today High:"} <strong>{maxTemp}&deg;C</strong></span>
                <span>{language === "km" ? "ទាបបំផុត៖" : "Low:"} <strong>{minTemp}&deg;C</strong></span>
              </div>
            </div>
          </div>

          {/* 2. Feels Like (Heat Index) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-red-800 text-xs font-black uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-600 animate-pulse" />
                <span>{language === "km" ? "កម្ដៅជាក់ស្ដែង (Feels Like)" : "Heat Index (Feels)"}</span>
              </span>
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                REAL FEEL
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-red-700 tracking-tight flex items-baseline gap-1.5">
                <span>{feelsLike}&deg;C</span>
                <span className="text-sm sm:text-base font-bold text-red-500">
                  ({Math.round((feelsLike * 9) / 5 + 32)}&deg;F)
                </span>
              </div>
              <div className="text-xs font-semibold text-red-800 mt-1">
                {language === "km" ? "រួមបញ្ចូលកម្ដៅ + សំណើមបរិយាកាស" : "Temp + Humidity physiological impact"}
              </div>
            </div>
          </div>

          {/* 3. Relative Humidity */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-800 text-xs font-black uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>{language === "km" ? "សំណើមខ្យល់ (Humidity)" : "Relative Humidity"}</span>
              </span>
              <span className="text-[10px] bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded font-black">
                RH %
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight">
                {humidity}%
              </div>
              <div className="text-xs font-semibold text-blue-800 mt-1 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === "km" ? "ល្បឿនខ្យល់៖" : "Wind:"} {windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* 4. Wet-Bulb Temperature (WBT) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-800 text-xs font-black uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-purple-600" />
                <span>{language === "km" ? "កម្ដៅ Wet-Bulb (WBT)" : "Wet-Bulb Temp (WBT)"}</span>
              </span>
              <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded font-black">
                LIMIT 31°C
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-900 tracking-tight flex items-baseline gap-1.5">
                <span>{wetBulb}&deg;C</span>
                <span className="text-sm sm:text-base font-bold text-purple-500">
                  ({Math.round((wetBulb * 9) / 5 + 32)}&deg;F)
                </span>
              </div>
              <div className="text-xs font-semibold text-purple-700 mt-1">
                {wetBulb >= 29 
                  ? (language === "km" ? "⚠️ លើសដែនកំណត់សុវត្ថិភាពការងារ" : "⚠️ Exceeds heavy labor limit") 
                  : (language === "km" ? "កម្រិតបែកញើសបញ្ចុះកម្ដៅបាន" : "Sweat evaporation threshold")}
              </div>
            </div>
          </div>

        </div>

        {/* Real-Time Action Advisory Banner */}
        <div className={`mt-5 p-4 sm:p-5 rounded-2xl border-2 ${riskBorder} ${riskBg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl text-white ${riskColor} flex-shrink-0 mt-0.5`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm sm:text-base font-black ${riskText}`}>
                {language === "km" ? riskTitleKm : riskTitleEn}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5">
                {language === "km" ? riskActionKm : riskActionEn}
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyToCalculator}
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-black transition flex items-center gap-1.5 flex-shrink-0 shadow-xs"
          >
            <span>{language === "km" ? "ដាក់ចូលឧបករណ៍គណនា" : "Apply to Calculator"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 2. REAL VERIFIED HEAT NUMBERS IN CAMBODIA (EMPIRICAL BENCHMARKS) */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-gray-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-800">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>{language === "km" ? "តួលេខ និងកំណត់ត្រាកម្ដៅផ្លូវការនៅកម្ពុជា" : "Official Historical & Measured Heat Records in Cambodia"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {language === "km" ? "តួលេខកម្ដៅជាក់ស្ដែងដែលប៉ះពាល់ដល់ជីវិតកម្មករ" : "The Exact Heat Numbers Threatening Worker Lives"}
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-400">
            Sources: MOWRAM, ILO, MOH & Bradford (2025)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
          
          {/* Card 1: 43.0°C All-Time Record */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition">
            <div className="text-3xl font-black text-amber-400 tracking-tight">
              43.0&deg;C
              <span className="text-sm font-bold text-gray-400 block font-sans">109.4&deg;F</span>
            </div>
            <div className="text-xs font-black text-white mt-2">
              {language === "km" ? "កំណត់ត្រាក្ដៅបំផុត ១៧០ ឆ្នាំ" : "All-Time Hottest in 170 Yrs"}
            </div>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
              {language === "km"
                ? "ខេត្តក្រចេះ (ឧសភា ២០២៤) កត់ត្រាដោយក្រសួងធនធានទឹក និងឧតុនិយម (MOWRAM)។"
                : "Recorded in Kratie Province (May 2024) by MOWRAM, the highest ambient temperature ever."}
            </p>
          </div>

          {/* Card 2: 52.0°C Asphalt Surface */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-400/50 transition">
            <div className="text-3xl font-black text-orange-400 tracking-tight">
              52.0&deg;C
              <span className="text-sm font-bold text-gray-400 block font-sans">125.6&deg;F</span>
            </div>
            <div className="text-xs font-black text-white mt-2">
              {language === "km" ? "កម្ដៅជះលើផ្លូវកៅស៊ូភ្នំពេញ" : "Midday Asphalt Heat"}
            </div>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
              {language === "km"
                ? "សីតុណ្ហភាពលើដងផ្លូវកៅស៊ូ និងដំបូលស័ង្កសីម៉ោង ១១ ព្រឹក - ៣ រសៀល ប៉ះពាល់អ្នករត់កង់បី។"
                : "Surface radiation directly radiating from road tarmac and metal roofs onto Tuk-Tuk drivers."}
            </p>
          </div>

          {/* Card 3: 41.0°C Factory Tin Roofs */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/50 transition">
            <div className="text-3xl font-black text-red-400 tracking-tight">
              41.0&deg;C
              <span className="text-sm font-bold text-gray-400 block font-sans">105.8&deg;F</span>
            </div>
            <div className="text-xs font-black text-white mt-2">
              {language === "km" ? "កម្ដៅក្នុងរោងចក្រកាត់ដេរ" : "Indoor Factory Peak Heat"}
            </div>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
              {language === "km"
                ? "ការវាស់វែងរបស់ ILO រកឃើញ ៦០% នៃរោងចក្រខ្វះខ្យល់ចេញចូល ហើយកម្ដៅក្នុងអគារឡើងដល់ ៤១°C។"
                : "ILO monitoring found indoor work floors reach 31–41°C where ventilation systems are inadequate."}
            </p>
          </div>

          {/* Card 4: 40.0°C Heat Stroke Threshold */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition">
            <div className="text-3xl font-black text-purple-400 tracking-tight">
              40.0&deg;C
              <span className="text-sm font-bold text-gray-400 block font-sans">104.0&deg;F</span>
            </div>
            <div className="text-xs font-black text-white mt-2">
              {language === "km" ? "ដែនកំណត់សង្គ្រោះបន្ទាន់" : "Heat Stroke Core Limit"}
            </div>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
              {language === "km"
                ? "កម្ដៅក្នុងខ្លួនលើស ៤០°C ធ្វើឱ្យខូចខួរក្បាល តម្រងនោម និងបេះដូង (Bradford, 2025; ហៅ ១១៩)។"
                : "Body core temperature above 40°C triggers multi-organ failure. Immediate 119 emergency required."}
            </p>
          </div>

          {/* Card 5: 31.0°C Wet-Bulb Limit */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition">
            <div className="text-3xl font-black text-cyan-400 tracking-tight">
              31.0&deg;C
              <span className="text-sm font-bold text-gray-400 block font-sans">87.8&deg;F WBT</span>
            </div>
            <div className="text-xs font-black text-white mt-2">
              {language === "km" ? "ដែនកំណត់ Wet-Bulb អន្តរជាតិ" : "Critical Wet-Bulb Limit"}
            </div>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
              {language === "km"
                ? "លើសពីកម្រិតនេះ ការបែកញើសលែងមានប្រសិទ្ធភាពបញ្ចុះកម្ដៅរាងកាយ ត្រូវតែសម្រាកម្លប់ជាបន្ទាន់។"
                : "Beyond 31°C WBT, physiological sweat cooling fails, making unshaded physical labor lethal."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
