"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sun, 
  ArrowDown, 
  ShieldCheck 
} from "lucide-react";

export default function CambodiaHeatMap() {
  const { language } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<string>("temp");

  // Dynamic Windy URL with full layer menu enabled (menu=true) and centered at Southeast Asia / Cambodia (zoom=5)
  const windyMapUrl = `https://embed.windy.com/embed2.html?lat=13.0&lon=105.0&detailLat=11.5564&detailLon=104.9282&width=100%&height=650&zoom=5&level=surface&overlay=${activeLayer}&product=ecmwf&menu=true&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=%C2%B0C&radarRange=-1`;

  const scrollToCalculator = () => {
    const el = document.getElementById("interactive-tools") || document.getElementById("heat-risk");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-heat-400 bg-white">
      {/* Orange Campaign Top Header Banner (Matches screenshot) */}
      <div className="bg-gradient-to-r from-heat-600 via-heat-500 to-amber-600 px-6 py-4 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-2.5 font-black text-lg sm:text-xl tracking-tight">
          <Sun className="w-6 h-6 text-yellow-300 animate-spin-slow flex-shrink-0" />
          <span>
            {language === "km" ? "ការការពារសុខភាពពីកម្ដៅថ្ងៃ" : "Heat Health Protection"}
          </span>
        </div>

        <Link
          href="/about"
          className="text-sm font-bold text-white hover:text-yellow-200 transition-colors bg-white/15 hover:bg-white/25 px-4 py-1.5 rounded-full border border-white/25 backdrop-blur-xs"
        >
          {language === "km" ? "អំពីយើង" : "About Us"}
        </Link>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-[580px] sm:h-[650px] bg-slate-950">
        <iframe
          key={activeLayer}
          title="Cambodia Live Heat and Weather Satellite Map"
          src={windyMapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="w-full h-full block"
          loading="lazy"
        />

        {/* Down Arrow Floating Circle Button to jump to Heat Risk Calculator (Matches screenshot) */}
        <button
          onClick={scrollToCalculator}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:bg-heat-600 hover:scale-110 transition-all border-2 border-white group"
          title={language === "km" ? "ចុះទៅកាន់ឧបករណ៍គណនាកម្ដៅ" : "Scroll to Heat Calculator"}
        >
          <ArrowDown className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Information & Worker Alert Bar */}
      <div className="pt-8 pb-5 px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            {language === "km"
              ? "ផែនទីផ្កាយរណបផ្សាយបន្តផ្ទាល់ (Windy ECMWF)៖ បង្ហាញសីតុណ្ហភាព កម្តៅថ្ងៃ និងចរន្តខ្យល់ទូទាំងប្រទេសកម្ពុជា"
              : "Live Satellite Radar (Windy ECMWF): Real-time heat, temperature gradients, and wind streams across Cambodia."}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>{language === "km" ? "ចុចប៊ូតុង Display more layers (39) នៅលើផែនទីដើម្បីមើលស្រទាប់ផ្សេងៗ" : "Click 'Display more layers (39)' on map to view all overlays"}</span>
        </div>
      </div>
    </div>
  );
}
