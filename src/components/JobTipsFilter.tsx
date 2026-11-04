"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { jobTipsData } from "@/data/heatStressTranslations";
import { JobCategory } from "@/types/heatStress";
import { 
  Shirt, 
  Bike, 
  Utensils,
  Layers, 
  CheckCircle, 
  MapPin, 
  Sun,
  Droplets,
  Thermometer,
  Umbrella,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";

export default function JobTipsFilter() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("all");

  const categories = [
    { id: "all" as JobCategory, labelEn: "All 3 Core Jobs", labelKm: "មុខរបរទាំង ៣", icon: Layers },
    { id: "garment" as JobCategory, labelEn: "Garment Workers", labelKm: "កម្មករកាត់ដេរ", icon: Shirt },
    { id: "transport" as JobCategory, labelEn: "Transport Drivers", labelKm: "អ្នករត់កង់បី / ម៉ូតូឌុប", icon: Bike },
    { id: "food_seller" as JobCategory, labelEn: "Street Food Sellers", labelKm: "អ្នកលក់ដូរតាមផ្លូវ", icon: Utensils },
  ];

  const filteredTips = selectedCategory === "all"
    ? jobTipsData
    : jobTipsData.filter((item) => item.category === selectedCategory);

  const renderCategoryIcon = (cat: string) => {
    switch (cat) {
      case "garment": return <Shirt className="w-5 h-5 text-purple-600" />;
      case "transport": return <Bike className="w-5 h-5 text-cooling-600" />;
      case "food_seller": return <Utensils className="w-5 h-5 text-heat-600" />;
      default: return <ShieldCheck className="w-5 h-5 text-heat-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-heat-200">
      
      {/* Header */}
      <div className="pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-heat-600 font-black text-xs uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === "km" ? "គន្លឹះសុវត្ថិភាពតាមមុខរបរជាក់ស្តែង" : "Sector-Specific Protection & Real Workers"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-normal leading-normal">
          {t.tools.jobTipsTitle}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mt-2 max-w-3xl font-medium leading-relaxed">
          {t.tools.jobTipsSub}
        </p>

        {/* 5 Core Icons Quick Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-gray-700">
          <span className="text-gray-400 uppercase text-xs tracking-wider">
            {language === "km" ? "និមិត្តសញ្ញាការពារ៖" : "Core Protection Icons:"}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-heat-100 text-heat-800 border border-heat-200">
            <Sun className="w-3.5 h-3.5 text-heat-600" />
            <span>{language === "km" ? "ព្រះអាទិត្យ ☀️" : "Sun ☀️"}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cooling-100 text-cooling-800 border border-cooling-200">
            <Droplets className="w-3.5 h-3.5 text-cooling-600" />
            <span>{language === "km" ? "ដំណក់ទឹក 💧" : "Water 💧"}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
            <Thermometer className="w-3.5 h-3.5 text-red-600" />
            <span>{language === "km" ? "ទែម៉ូម៉ែត្រ 🌡️" : "Thermometer 🌡️"}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <Umbrella className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === "km" ? "ម្លប់ ⛱️" : "Shade ⛱️"}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === "km" ? "គ្រោះថ្នាក់ ⚠️" : "Warning ⚠️"}</span>
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all shadow-sm ${
                isSelected
                  ? "bg-heat-500 text-white shadow-heat-500/30 ring-2 ring-heat-500 ring-offset-2"
                  : "bg-cooling-50/70 text-gray-800 hover:bg-cooling-100 border border-cooling-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{language === "km" ? cat.labelKm : cat.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Worker Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-heat-200 hover:border-cooling-400 transition-all flex flex-col justify-between hover:shadow-card group"
          >
            <div>
              {/* Real Worker Photo */}
              {tip.imageUrl && (
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-200 bg-gray-100">
                  <img
                    src={tip.imageUrl}
                    alt={language === "km" ? tip.imageAltKm : tip.imageAltEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Photo Source Credit */}
                  {tip.imageCreditEn && (
                    <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-lg border border-white/20 shadow-xs">
                      {language === "km" ? (tip.imageCreditKm || tip.imageCreditEn) : tip.imageCreditEn}
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-bold leading-tight drop-shadow">
                    {language === "km" ? tip.imageAltKm : tip.imageAltEn}
                  </div>
                </div>
              )}

              {/* Role badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cooling-50 text-cooling-800 border border-cooling-200 max-w-full break-words">
                  {renderCategoryIcon(tip.category)}
                  <span>{language === "km" ? tip.roleKm : tip.roleEn}</span>
                </span>
                
                <span className="text-xs font-black text-heat-700 bg-heat-100 px-3 py-1 rounded-full border border-heat-200 flex-shrink-0">
                  {language === "km" ? "អនុវត្តជាប្រចាំ" : "Daily Rule"}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 leading-snug break-words">
                {language === "km" ? tip.titleKm : tip.titleEn}
              </h3>

              <div className="flex items-start space-x-1.5 text-xs sm:text-sm font-medium text-gray-600 mb-4 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 break-words">
                <MapPin className="w-3.5 h-3.5 text-heat-600 flex-shrink-0 mt-0.5" />
                <span className="break-words min-w-0">{language === "km" ? tip.environmentKm : tip.environmentEn}</span>
              </div>

              {/* Key Action highlight in Orange */}
              <div className="p-4 rounded-2xl bg-heat-50 border-2 border-heat-200 text-heat-950 text-base font-bold mb-4 leading-relaxed break-words">
                <span className="text-heat-700 mr-1.5 font-black flex-shrink-0">⚡ {language === "km" ? "សកម្មភាពបន្ទាន់៖" : "Key Action:"}</span>
                <span className="break-words">{language === "km" ? tip.keyActionKm : tip.keyActionEn}</span>
              </div>

              {/* Checkpoints with 16px Body Text */}
              <ul className="space-y-2.5 text-base text-gray-800 font-medium">
                {(language === "km" ? tip.tipsKm : tip.tipsEn).map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-safety-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed break-words">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom 5 Core Icons Status */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-1.5 text-cooling-700">
                <Droplets className="w-4 h-4 text-cooling-600 flex-shrink-0" />
                <span className="break-words">{language === "km" ? "ផឹកទឹកជាប្រចាំ 💧" : "Hydrate 💧"}</span>
              </span>
              <span className="flex items-center gap-1.5 text-heat-700">
                <Umbrella className="w-4 h-4 text-heat-600 flex-shrink-0" />
                <span className="break-words">{language === "km" ? "សម្រាកម្លប់ ⛱️" : "Safe Shade ⛱️"}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}