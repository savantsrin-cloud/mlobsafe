"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sun, Droplets, Thermometer, Umbrella, AlertTriangle } from "lucide-react";

export default function CoreIconsBar() {
  const { language } = useLanguage();

  const coreIcons = [
    {
      id: "sun",
      icon: Sun,
      titleKm: "ព្រះអាទិត្យ",
      titleEn: "Sun",
      descKm: "កម្តៅខ្លាំង ១១:០០ - ៣:០០ រសៀល",
      descEn: "Peak radiation 11am - 3pm",
      bgClass: "bg-heat-500",
      textClass: "text-heat-700",
      borderClass: "border-heat-300",
      lightBg: "bg-heat-50",
      symbol: "☀️",
    },
    {
      id: "water",
      icon: Droplets,
      titleKm: "ដំណក់ទឹក",
      titleEn: "Water Drop",
      descKm: "ផឹក ១ កែវរៀងរាល់ ២០-៣០ នាទី",
      descEn: "1 cup every 20-30 mins",
      bgClass: "bg-cooling-500",
      textClass: "text-cooling-700",
      borderClass: "border-cooling-300",
      lightBg: "bg-cooling-50",
      symbol: "💧",
    },
    {
      id: "thermometer",
      icon: Thermometer,
      titleKm: "ទែម៉ូម៉ែត្រ",
      titleEn: "Thermometer",
      descKm: "តាមដានកម្ដៅលើស ៣៥°C - ៤០°C",
      descEn: "Monitor heat index >35°C",
      bgClass: "bg-danger-500",
      textClass: "text-danger-700",
      borderClass: "border-danger-300",
      lightBg: "bg-danger-50",
      symbol: "🌡️",
    },
    {
      id: "shade",
      icon: Umbrella,
      titleKm: "ម្លប់សុវត្ថិភាព",
      titleEn: "Safe Shade",
      descKm: "សម្រាក ៥-១០ នាទីរៀងរាល់ម៉ោង",
      descEn: "5-10 min hourly cool rest",
      bgClass: "bg-cooling-600",
      textClass: "text-cooling-800",
      borderClass: "border-cooling-300",
      lightBg: "bg-cooling-50",
      symbol: "⛱️",
    },
    {
      id: "warning",
      icon: AlertTriangle,
      titleKm: "សញ្ញាគ្រោះថ្នាក់",
      titleEn: "Warning Signs",
      descKm: "ខ្យល់គរ វិលមុខ ហៅលេខ ១១៩",
      descEn: "Emergency alert, call 119",
      bgClass: "bg-heat-600",
      textClass: "text-heat-800",
      borderClass: "border-heat-400",
      lightBg: "bg-heat-50",
      symbol: "⚠️",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-heat-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-heat-600 bg-heat-100 px-3 py-1 rounded-full">
            {language === "km" ? "និមិត្តសញ្ញាស្នូល ៥" : "5 Core Heat Safety Icons"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {language === "km" 
              ? "ចងចាំនិមិត្តសញ្ញា ៥ យ៉ាងដើម្បីសុវត្ថិភាពកម្ដៅ" 
              : "5 Essential Symbols to Remember for Heat Safety"}
          </h2>
        </div>
        <div className="text-base text-gray-700 font-semibold max-w-sm">
          {language === "km"
            ? "ពន្លឺថ្ងៃ ដំណក់ទឹក កម្តៅ ម្លប់ និងសញ្ញាគ្រោះអាសន្ន ជួយការពារជីវិតអ្នក និងមិត្តរួមការងារ។"
            : "Sun, Water, Thermometer, Shade, and Warning signs to protect yourself and coworkers."}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-6">
        {coreIcons.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl ${item.lightBg} border-2 ${item.borderClass} flex flex-col items-center text-center transition-all hover:scale-102 hover:shadow-md min-w-0 max-w-full`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${item.bgClass} text-white flex items-center justify-center shadow-md mb-3 transform transition group-hover:rotate-6 flex-shrink-0`}>
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="text-base sm:text-lg font-black text-gray-900 leading-snug break-words max-w-full">
                {language === "km" ? item.titleKm : item.titleEn}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-600 mt-1.5 leading-normal break-words max-w-full">
                {language === "km" ? item.descKm : item.descEn}
              </div>
              <span className="mt-2 text-sm sm:text-base font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-xs flex-shrink-0">
                {item.symbol}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
