"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import SymptomChecker from "@/components/SymptomChecker";
import HeatRiskCalculator from "@/components/HeatRiskCalculator";
import WaterReminder from "@/components/WaterReminder";
import HeatQuiz from "@/components/HeatQuiz";
import SeasonalTimeline from "@/components/SeasonalTimeline";
import CoreIconsBar from "@/components/CoreIconsBar";
import JobTipsFilter from "@/components/JobTipsFilter";
import dynamic from "next/dynamic";

const CambodiaHeatMap = dynamic(() => import("@/components/CambodiaHeatMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] bg-[#0f1117] rounded-3xl flex flex-col items-center justify-center text-white space-y-3 border-2 border-gray-800">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-sm font-bold text-gray-300">Loading Cambodia Heat Radar Map...</div>
    </div>
  ),
});
import { 
  HeartPulse, 
  ShieldCheck, 
  BarChart3, 
  Info, 
  PhoneCall, 
  ArrowRight, 
  Sun, 
  AlertTriangle, 
  BookOpen, 
  Umbrella, 
  Droplets, 
  Activity, 
  HelpCircle,
  Compass
} from "lucide-react";

type ToolTab = "symptoms" | "risk" | "water" | "quiz" | "map";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [activeToolTab, setActiveToolTab] = useState<ToolTab>("symptoms");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#symptom-checker") setActiveToolTab("symptoms");
      else if (hash === "#heat-risk") setActiveToolTab("risk");
      else if (hash === "#water-reminder") setActiveToolTab("water");
      else if (hash === "#heat-quiz") setActiveToolTab("quiz");
      else if (hash === "#heat-map-tool") setActiveToolTab("map");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selectTab = (tab: ToolTab, elementId?: string) => {
    setActiveToolTab(tab);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-24">
      
      {/* 1. Hero Section - Computer Desktop Centered & Widescreen Format */}
      <section className="relative overflow-hidden bg-gradient-to-b from-heat-100/70 via-cooling-50/30 to-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b-2 border-heat-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Hot Season Alert Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-heat-500/15 border-2 border-heat-400 text-heat-900 text-xs sm:text-sm font-black tracking-wide shadow-xs">
            <Sun className="w-4 h-4 text-heat-600 animate-spin-slow flex-shrink-0" />
            <span>
              {language === "km" 
                ? "យុទ្ធនាការ ម្លប់សុវត្ថិភាព | ការប្រកាសអាសន្នរដូវក្ដៅ៖ មីនា - ឧសភា" 
                : "Shade Safety Campaign | Hot Season Alert: March - May"}
            </span>
          </div>

          {/* Title with Brand Name: Khmer title first in Khmer version */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-normal leading-normal break-words max-w-4xl mx-auto">
            {language === "km" ? (
              <>
                <span className="text-cooling-600">ម្លប់សុវត្ថិភាព</span>{" "}
                <span className="text-gray-900">:</span>{" "}
                <span className="text-heat-600">Shade Safety</span>
              </>
            ) : (
              <>
                <span className="text-heat-600">Shade Safety</span>{" "}
                <span className="text-gray-900">:</span>{" "}
                <span className="text-cooling-600">ម្លប់សុវត្ថិភាព</span>
              </>
            )}
            <span className="block text-xl sm:text-2xl lg:text-3xl text-gray-900 font-extrabold mt-3 tracking-normal leading-relaxed break-words">
              {language === "km" ? "«ទទួលស្គាល់សញ្ញា ការពារសុខភាពរបស់អ្នក»" : "\"Recognise the Signs. Protect Your Health.\""}
            </span>
          </h1>

          {/* Target Audience & Purpose Subtitle */}
          <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-semibold max-w-3xl mx-auto break-words">
            {language === "km"
              ? "គេហទំព័រដែលជួយកម្មករកាត់ដេរ អ្នករត់កង់បី/ម៉ូតូឌុប និងអ្នកលក់ដូរតាមផ្លូវនៅកម្ពុជា ឱ្យស្គាល់សញ្ញាជំងឺកម្ដៅ និងការពារខ្លួនក្នុងរដូវក្តៅខ្លាំង។"
              : "A website that helps garment workers, transport workers and informal food sellers in Cambodia to recognise the signs of heat illness and protect themselves during the hot season."}
          </p>

          {/* CTA Action Buttons - Linked to Interactive Suite Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => selectTab("symptoms", "interactive-tools")}
              className="inline-flex items-center gap-2 bg-heat-500 hover:bg-heat-600 text-white font-black px-7 py-4 rounded-2xl shadow-lg shadow-heat-500/30 transition transform hover:-translate-y-0.5 text-base sm:text-lg"
            >
              <HeartPulse className="w-5 h-5 flex-shrink-0" />
              <span>{t.hero.ctaCheckSigns}</span>
            </button>

            <button
              onClick={() => selectTab("risk", "interactive-tools")}
              className="inline-flex items-center gap-2 bg-white hover:bg-cooling-50 text-gray-900 font-black px-7 py-4 rounded-2xl border-2 border-cooling-300 shadow-md transition transform hover:-translate-y-0.5 text-base sm:text-lg"
            >
              <Sun className="w-5 h-5 text-heat-600 flex-shrink-0" />
              <span>{t.hero.ctaRiskCheck}</span>
            </button>

            <a
              href="#cambodia-heat-map"
              className="inline-flex items-center gap-2 bg-white hover:bg-heat-50 text-heat-900 font-black px-7 py-4 rounded-2xl border-2 border-heat-400 shadow-md transition transform hover:-translate-y-0.5 text-base sm:text-lg"
            >
              <Compass className="w-5 h-5 text-heat-600 animate-spin-slow flex-shrink-0" />
              <span>{language === "km" ? "ផែនទីកម្ដៅកម្ពុជា" : "Cambodia Heat Map"}</span>
            </a>
          </div>

          {/* 3 Core Rule Quick Badges Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-gray-700">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-heat-200 shadow-xs break-words">
              <Sun className="w-4 h-4 text-heat-600 flex-shrink-0" />
              <span>{language === "km" ? "កម្ដៅខ្លាំង៖ ១១ព្រឹក - ៣រសៀល" : "Peak Sun: 11am - 3pm"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-cooling-200 shadow-xs break-words">
              <Droplets className="w-4 h-4 text-cooling-600 flex-shrink-0" />
              <span>{language === "km" ? "ផឹកទឹក៖ ១កែវ / ២០-៣០នាទី" : "Hydration: 1 Cup / 20-30 min"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-safety-200 shadow-xs break-words">
              <Umbrella className="w-4 h-4 text-safety-600 flex-shrink-0" />
              <span>{language === "km" ? "សម្រាកម្លប់៖ ៥-១០នាទី / ម៉ោង" : "Rest in Shade: 5-10 min / hr"}</span>
            </span>
          </div>

          {/* Emergency Hotline Button */}
          <div className="pt-2 flex items-center justify-center">
            <a
              href="tel:119"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-50 border-2 border-red-300 text-red-800 font-black text-xs sm:text-sm hover:bg-red-100 transition shadow-xs break-words"
            >
              <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse flex-shrink-0" />
              <span>{t.hero.emergencyHotlineText}</span>
              <span className="underline text-red-700">{t.hero.call119}</span>
            </a>
          </div>

          {/* 3 Priority Occupations Quick Visual Showcase (Desktop computer layout) */}
          <div className="pt-4 border-t border-heat-200/80 max-w-4xl mx-auto">
            <div className="text-xs font-black uppercase tracking-wider text-heat-700 mb-3 flex items-center justify-center gap-1.5">
              <span>{language === "km" ? "មុខរបរគោលដៅអាទិភាពទាំង ៣ នៃយុទ្ធនាការ" : "3 Campaign Priority Occupations"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {/* Garment Worker */}
              <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-purple-200 shadow-xs group bg-gray-100">
                <img
                  src="/images/cambodian-garment-worker.jpg"
                  alt="Cambodian Garment Worker"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                  Nikkei Asia
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-[11px] font-black uppercase text-purple-300">
                    {language === "km" ? "រោងចក្រកាត់ដេរ" : "Garment Sector"}
                  </div>
                  <div className="text-sm font-bold leading-tight drop-shadow">
                    {language === "km" ? "កម្មករកាត់ដេរ" : "Garment Workers"}
                  </div>
                </div>
              </div>

              {/* Tuk-Tuk Driver */}
              <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-cooling-200 shadow-xs group bg-gray-100">
                <img
                  src="/images/cambodian-tuktuk-driver.jpg"
                  alt="Cambodian Tuk-Tuk Driver"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                  Kampuchea Thmey
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-[11px] font-black uppercase text-cooling-300">
                    {language === "km" ? "ដឹកជញ្ជូន" : "Transport Sector"}
                  </div>
                  <div className="text-sm font-bold leading-tight drop-shadow">
                    {language === "km" ? "អ្នករត់កង់បី & ម៉ូតូឌុប" : "Tuk-Tuk & Drivers"}
                  </div>
                </div>
              </div>

              {/* Street Food Seller */}
              <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-heat-200 shadow-xs group bg-gray-100">
                <img
                  src="/images/cambodian-street-food-seller.jpg"
                  alt="Cambodian Street Food Seller"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                  Khmer Times
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-[11px] font-black uppercase text-amber-300">
                    {language === "km" ? "លក់ដូរតាមផ្លូវ" : "Street Food Sector"}
                  </div>
                  <div className="text-sm font-bold leading-tight drop-shadow">
                    {language === "km" ? "អ្នកលក់ដូរតាមចិញ្ចើមផ្លូវ" : "Street Food Sellers"}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. 5 Core Icons Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoreIconsBar />
      </section>

      {/* 3. Sector-Specific Protection with Real Worker Photos & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-heat-600 bg-heat-100 px-3 py-1 rounded-full">
              {language === "km" ? "ផ្នែកទី ១ | ការការពារតាមមុខរបរ" : "Section 01 | Sector-Specific Protection"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
              {language === "km" ? "វិធានការការពារតាមមុខរបរការងាររបស់អ្នក" : "Actionable Heat Protection by Occupation"}
            </h2>
          </div>
        </div>
        <JobTipsFilter />
      </section>

      {/* 4. Cambodia Heat Stress Risk Map (Dedicated Interactive Section) */}
      <section id="cambodia-heat-map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-heat-700 bg-heat-100 px-3 py-1 rounded-full border border-heat-200">
            {language === "km" ? "ផ្នែកទី ២ | ផែនទីកម្ដៅកម្ពុជា" : "Section 02 | Cambodia Heat Stress Map"}
          </span>
        </div>
        <CambodiaHeatMap />
      </section>

      {/* 5. Interactive Safety Suite - Segmented Tabbed Workspace */}
      <section id="interactive-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cooling-100 text-cooling-800 text-xs font-black uppercase tracking-wider">
            <Activity className="w-4 h-4 text-cooling-600" />
            <span>{language === "km" ? "ផ្នែកទី ៣ | ឧបករណ៍អន្តរកម្ម" : "Section 03 | Interactive Safety Suite"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-normal leading-normal break-words">
            {language === "km" 
              ? "ឧបករណ៍សុវត្ថិភាពកម្ដៅអន្តរកម្ម" 
              : "Interactive Heat Safety Tools Suite"}
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed break-words">
            {language === "km"
              ? "ជ្រើសរើសឧបករណ៍ខាងក្រោមដើម្បីពិនិត្យរោគសញ្ញា គណនាហានិភ័យកម្ដៅ ពិនិត្យផែនទី រំលឹកផឹកទឹក ឬធ្វើតេស្តចំណេះដឹង។"
              : "Select a tool below to check health symptoms, calculate live heat risk, inspect regional heat map, set hydration timers, or test your knowledge."}
          </p>

          {/* 5 Tool Segmented Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setActiveToolTab("symptoms")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-sm break-words ${
                activeToolTab === "symptoms"
                  ? "bg-red-600 text-white shadow-red-600/25 ring-2 ring-red-600 ring-offset-2"
                  : "bg-white text-gray-800 hover:bg-red-50 border border-gray-200"
              }`}
            >
              <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-current flex-shrink-0" />
              <span>{language === "km" ? "១. ពិនិត្យរោគសញ្ញា" : "1. Symptom Checker"}</span>
            </button>

            <button
              onClick={() => setActiveToolTab("risk")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-sm break-words ${
                activeToolTab === "risk"
                  ? "bg-heat-600 text-white shadow-heat-600/25 ring-2 ring-heat-600 ring-offset-2"
                  : "bg-white text-gray-800 hover:bg-heat-50 border border-gray-200"
              }`}
            >
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-current flex-shrink-0" />
              <span>{language === "km" ? "២. គណនាហានិភ័យ" : "2. Heat Risk Check"}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("cambodia-heat-map");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-sm break-words bg-white text-gray-800 hover:bg-purple-50 border border-gray-200"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
              <span>{language === "km" ? "៣. ផែនទីកម្ដៅកម្ពុជា" : "3. Cambodia Heat Map"}</span>
            </button>

            <button
              onClick={() => setActiveToolTab("water")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-sm break-words ${
                activeToolTab === "water"
                  ? "bg-cooling-600 text-white shadow-cooling-600/25 ring-2 ring-cooling-600 ring-offset-2"
                  : "bg-white text-gray-800 hover:bg-cooling-50 border border-gray-200"
              }`}
            >
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-current flex-shrink-0" />
              <span>{language === "km" ? "៤. រំលឹកផឹកទឹក & ម្លប់" : "4. Drink Water Reminder"}</span>
            </button>

            <button
              onClick={() => setActiveToolTab("quiz")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-sm break-words ${
                activeToolTab === "quiz"
                  ? "bg-amber-600 text-white shadow-amber-600/25 ring-2 ring-amber-600 ring-offset-2"
                  : "bg-white text-gray-800 hover:bg-amber-50 border border-gray-200"
              }`}
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-current flex-shrink-0" />
              <span>{language === "km" ? "៥. តេស្តចំណេះដឹង" : "5. Safety Quiz"}</span>
            </button>
          </div>
        </div>

        {/* Active Tool Rendering */}
        <div className="transition-all duration-300">
          {activeToolTab === "symptoms" && (
            <div id="symptom-checker" className="animate-fadeIn">
              <SymptomChecker />
            </div>
          )}

          {activeToolTab === "risk" && (
            <div id="heat-risk" className="animate-fadeIn">
              <HeatRiskCalculator />
            </div>
          )}

          {activeToolTab === "map" && (
            <div id="heat-map-tool" className="p-8 text-center bg-white rounded-3xl border-2 border-heat-200 space-y-4">
              <Compass className="w-12 h-12 text-heat-600 mx-auto animate-spin-slow" />
              <h3 className="text-xl font-black text-gray-900">
                {language === "km" ? "ផែនទីកម្ដៅស្ថិតនៅផ្នែកខាងលើ" : "Interactive Heat Map Section"}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {language === "km" ? "ចុចប៊ូតុងខាងក្រោមដើម្បីទៅកាន់ផែនទីកម្ដៅ Zoom Earth ដោយផ្ទាល់" : "Click below to jump directly to the Zoom Earth Heat Radar Map"}
              </p>
              <a
                href="#cambodia-heat-map"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-heat-600 text-white font-black hover:bg-heat-700 transition shadow-md"
              >
                <span>{language === "km" ? "មើលផែនទីកម្ដៅឥឡូវនេះ" : "View Live Heat Radar Map"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {activeToolTab === "water" && (
            <div id="water-reminder" className="animate-fadeIn">
              <WaterReminder />
            </div>
          )}

          {activeToolTab === "quiz" && (
            <div id="heat-quiz" className="animate-fadeIn">
              <HeatQuiz />
            </div>
          )}
        </div>

      </section>

      {/* 5. Seasonal Hot Season Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-heat-600 bg-heat-100 px-3 py-1 rounded-full">
            {language === "km" ? "ផ្នែកទី ៤ | កាលវិភាគរដូវក្ដៅ" : "Section 04 | Seasonal Advisory"}
          </span>
        </div>
        <SeasonalTimeline />
      </section>

      {/* 6. Quick Navigation Hub - 4 Knowledge Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-cooling-600 bg-cooling-100 px-3 py-1 rounded-full">
            {language === "km" ? "ផ្នែកទី ៥ | ស្វែងយល់បន្ថែម" : "Section 05 | Explore Knowledge Hub"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {language === "km" ? "ទំព័រធំៗទាំង ៤ នៃយុទ្ធនាការ" : "Explore the 4 Campaign Hubs"}
          </h2>
          <p className="text-base text-gray-700 font-medium">
            {language === "km" 
              ? "ស្វែងយល់លម្អិតអំពីរោគសញ្ញា គន្លឹះការពារ ទិន្នន័យជាក់ស្តែង និងច្បាប់ការងារ" 
              : "Discover comprehensive symptom guides, prevention strategies, scientific data, and labour laws."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Hub 1: Know the Signs (6 Heat Illnesses) */}
          <Link
            href="/signs"
            className="group p-5 sm:p-6 rounded-3xl bg-white border-2 border-heat-200 hover:border-red-400 hover:shadow-card transition flex flex-col justify-between min-w-0"
          >
            <div>
              {/* Image banner with source credit */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-xs border border-gray-100 bg-gray-100">
                <img
                  src="/images/hub-signs-heat-illness.jpg"
                  alt="Understanding Heat-Related Illnesses"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  {language === "km" ? "ជំងឺកម្ដៅទាំង ៦" : "6 Heat Illnesses"}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 shadow-xs">
                  {language === "km" ? "ប្រភព៖ Heat Illness Guide" : "Credit: Health Guide"}
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs flex-shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-red-600 transition leading-snug break-words">
                {t.nav.signs}
              </h3>
              <p className="text-base text-gray-700 mt-2 leading-relaxed font-medium break-words">
                {language === "km"
                  ? "ស្វែងយល់ពីជំងឺបង្កដោយកម្ដៅទាំង ៦ ប្រភេទ រួមទាំងជំងឺរលាយសាច់ដុំ Rhabdomyolysis និងវិធីសង្គ្រោះបឋម។"
                  : "The 6 official heat illnesses, including Rhabdomyolysis warning signs and emergency first aid."}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm sm:text-base font-black text-red-600">
              <span className="break-words">{language === "km" ? "មើលជំងឺទាំង ៦ ប្រភេទ" : "Explore 6 Signs"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </Link>

          {/* Hub 2: Protect Yourself (Hydration & Rest) */}
          <Link
            href="/protect"
            className="group p-5 sm:p-6 rounded-3xl bg-white border-2 border-heat-200 hover:border-safety-400 hover:shadow-card transition flex flex-col justify-between min-w-0"
          >
            <div>
              {/* Image banner with source credit */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-xs border border-gray-100 bg-gray-100">
                <img
                  src="/images/hub-protect-hydration.jpg"
                  alt="Worker Hydration and Shade Rest Protection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 bg-safety-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  {language === "km" ? "សសរស្តម្ភទាំង ៣" : "3 Protection Pillars"}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 shadow-xs">
                  {language === "km" ? "ប្រភព៖ ការណែនាំផឹកទឹក" : "Credit: Hydration Safety"}
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-safety-100 text-safety-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-safety-600 transition leading-snug break-words">
                {t.nav.protect}
              </h3>
              <p className="text-base text-gray-700 mt-2 leading-relaxed font-medium break-words">
                {language === "km"
                  ? "គន្លឹះសុវត្ថិភាពជាក់ស្តែង ការដោះស្រាយសម្ពាធការងារ និងការការពារខ្លួនពេញមួយវេន។"
                  : "Practical protection tips, addressing piece-rate pay constraints, and shift hydration rules."}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm sm:text-base font-black text-safety-600">
              <span className="break-words">{language === "km" ? "មើលគន្លឹះសុវត្ថិភាព" : "View Tips"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </Link>

          {/* Hub 3: Why It Matters (Data & Statistics) */}
          <Link
            href="/why-it-matters"
            className="group p-5 sm:p-6 rounded-3xl bg-white border-2 border-heat-200 hover:border-heat-400 hover:shadow-card transition flex flex-col justify-between min-w-0"
          >
            <div>
              {/* Image banner with source credit */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-xs border border-gray-100 bg-gray-100">
                <img
                  src="/images/hub-why-matters-statistics.jpg"
                  alt="Heat-Related Illnesses Statistical Distribution Chart"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 bg-heat-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  {language === "km" ? "ទិន្នន័យ & ស្ថិតិ" : "Facts & Trends"}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 shadow-xs">
                  {language === "km" ? "ប្រភព៖ HRI Research Data" : "Credit: HRI Research"}
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-heat-100 text-heat-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs flex-shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-heat-600 transition leading-snug break-words">
                {t.nav.why}
              </h3>
              <p className="text-base text-gray-700 mt-2 leading-relaxed font-medium break-words">
                {language === "km"
                  ? "ទិន្នន័យជាក់ស្តែងអំពីការប្រឈមកម្តៅនៅកន្លែងធ្វើការ សីតុណ្ហភាពរោងចក្រ និងផលប៉ះពាល់សុខភាព។"
                  : "Empirical data on workplace heat exposure, factory temperatures, and occupational health impacts."}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm sm:text-base font-black text-heat-600">
              <span className="break-words">{language === "km" ? "មើលទិន្នន័យជាក់ស្តែង" : "Read Facts"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </Link>

          {/* Hub 4: About & Legal Framework */}
          <Link
            href="/about"
            className="group p-5 sm:p-6 rounded-3xl bg-white border-2 border-heat-200 hover:border-cooling-400 hover:shadow-card transition flex flex-col justify-between min-w-0"
          >
            <div>
              {/* Image banner with source credit */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-xs border border-gray-100 bg-gray-100">
                <img
                  src="/images/hub-about-law.jpg"
                  alt="Cambodia Labour Law and Legal Framework"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 bg-cooling-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  {language === "km" ? "ច្បាប់ & ទំនាក់ទំនង" : "Law & Contact"}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 shadow-xs">
                  {language === "km" ? "ប្រភព៖ ច្បាប់ការងារ (Wix)" : "Credit: Labour Law (Wix)"}
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-cooling-100 text-cooling-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs flex-shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-cooling-600 transition leading-snug break-words">
                {t.nav.about}
              </h3>
              <p className="text-base text-gray-700 mt-2 leading-relaxed font-medium break-words">
                {language === "km"
                  ? "ច្បាប់ការងារ (មាត្រា ២២៩-២៣០) ប្រកាស ១៤៧ ស្តីពីបរិស្ថានកម្តៅ និងការទំនាក់ទំនង។"
                  : "Labour Law Articles 229-230, Prakas 147 thermal workplace policies, and campaign contact."}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm sm:text-base font-black text-cooling-600">
              <span className="break-words">{language === "km" ? "ច្បាប់ & ទំនាក់ទំនង" : "Law & Contact"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </Link>

        </div>
      </section>

      {/* 7. Emergency Danger Hotline Call-out */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-r from-heat-600 to-red-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-red-400">
          <div className="space-y-3 text-center md:text-left min-w-0 max-w-full">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 text-xs sm:text-sm font-black uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-yellow-300 flex-shrink-0" />
              <span className="break-words">{language === "km" ? "ការព្រមានសង្គ្រោះបន្ទាន់" : "Emergency Medical Alert"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black break-words leading-normal">
              {language === "km" 
                ? "គ្រោះថ្នាក់នៃខ្យល់គរធ្ងន់ធ្ងរ (Heat Stroke)" 
                : "Heat Stroke is a Severe Medical Emergency"}
            </h2>
            <p className="text-base sm:text-lg text-white/95 max-w-xl font-medium leading-relaxed break-words">
              {language === "km"
                ? "«វាអាចធ្វើឱ្យខូចខាតខួរក្បាល តម្រងនោម បេះដូង និងប្រព័ន្ធភាពស៊ាំរាងកាយ ហើយអាចបណ្ដាលឱ្យស្លាប់បាន។» ហៅឡានពេទ្យលេខ ១១៩ ភ្លាម និងបញ្ចុះកម្ដៅរាងកាយជាបន្ទាន់!"
                : "«It can damage the brain, kidneys, heart and immune system, and can cause death.» Call 119 immediately, move the worker to shade, and rapidly cool their core temperature."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="tel:119"
              className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-yellow-50 font-black px-7 py-4 rounded-2xl text-base sm:text-lg shadow-lg transition"
            >
              <PhoneCall className="w-5 h-5 animate-bounce flex-shrink-0" />
              <span>{language === "km" ? "ទូរសព្ទទៅ ១១៩" : "Call 119 Now"}</span>
            </a>
            <Link
              href="/signs"
              className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 text-white font-bold px-6 py-4 rounded-2xl text-base border border-white/30 transition"
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              <span>{language === "km" ? "មើលជំងឺទាំង ៦ ប្រភេទ" : "Review 6 Heat Illnesses"}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}