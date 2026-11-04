"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { heatCareTimeline } from "@/data/heatStressTranslations";
import { Calendar, Bike, Shirt, Sprout, Clock, Sun } from "lucide-react";

export default function SeasonalTimeline() {
  const { language } = useLanguage();

  const getMonthIcon = (month: string) => {
    switch (month) {
      case "March": return <Bike className="w-5 h-5 text-blue-600" />;
      case "April": return <Shirt className="w-5 h-5 text-purple-600" />;
      case "May": return <Sprout className="w-5 h-5 text-safety-600" />;
      default: return <Clock className="w-5 h-5 text-heat-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-cream-300 space-y-6">
      
      {/* Hot Season Banner 2027 */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-heat-600 to-danger-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-yellow-300 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-yellow-300">
              {language === "km" ? "ការប្រកាសអាសន្នជាតិស្ដីពីកម្ដៅ" : "National Seasonal Advisory"}
            </div>
            <div className="text-base sm:text-lg font-black leading-snug">
              {language === "km" 
                ? "រដូវក្ដៅខ្លាំង៖ ខែមីនា ដល់ ខែឧសភា ឆ្នាំ ២០២៧" 
                : "Hot Season Peak Alert: March to May 2027"}
            </div>
            <div className="text-xs sm:text-sm text-white/90">
              {language === "km" 
                ? "បាតុភូតអាកាសធាតុក្ដៅខ្លាំង El Niño ដោយមានហានិភ័យអាកាសធាតុក្ដៅខ្លាំងដល់ឆ្នាំ ២០២៧" 
                : "Strong El Niño conditions bringing extreme hot seasonal risks into 2027"}
            </div>
          </div>
        </div>

        <span className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-white text-danger-700 font-extrabold text-xs shadow-sm">
          {language === "km" ? "ប្រុងប្រយ័ត្នខ្ពស់" : "High Alert Period"}
        </span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-heat-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Calendar className="w-4 h-4" />
          <span>{language === "km" ? "ពេលណាដែលត្រូវប្រុងប្រយ័ត្នខ្ពស់?" : "When to Be Careful: Worker Timeline"}</span>
        </div>
        <h3 className="text-2xl font-black text-gray-900">
          {language === "km" 
            ? "កាលវិភាគសម្ពាធកម្ដៅតាមមុខរបរ" 
            : "Heat Stress Seasonal Timeline by Occupation"}
        </h3>
        <p className="text-base text-gray-700 mt-2 max-w-3xl leading-relaxed font-medium">
          {language === "km"
            ? "កម្មករតាមមុខរបរអាទិភាពទាំង ៣ ជួបប្រទះសម្ពាធកម្តៅឡើងដល់ចំណុចខ្ពស់នៅខែខុសៗគ្នា៖ អ្នករត់កង់បី/ដឹកជញ្ជូន (មីនា) កម្មករកាត់ដេរ (មេសា) និងអ្នកលក់ដូរតាមផ្លូវ (ឧសភា)។"
            : "Workers in the 3 priority sectors face peak heat at different times: transport drivers (March), garment workers (April), and street food sellers (May)."}
        </p>
      </div>

      {/* 3 Step Timeline with Real Worker Photos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {heatCareTimeline.map((item, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-heat-200 hover:border-cooling-400 transition-all flex flex-col justify-between shadow-soft hover:shadow-card group min-w-0"
          >
            <div>
              {/* Authentic Worker Photo Header */}
              {item.imageUrl && (
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 shadow-xs border border-gray-200 bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={language === "km" ? (item.imageAltKm || item.targetGroupKm) : (item.imageAltEn || item.targetGroupEn)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  {/* Month Tag badge */}
                  <div className="absolute top-2.5 left-2.5 bg-heat-600/90 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-xl shadow-xs border border-white/20">
                    {language === "km" ? item.monthKm : item.monthEn}
                  </div>

                  {/* Photo Source Credit */}
                  {item.imageCreditEn && (
                    <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-lg border border-white/20 shadow-xs">
                      {language === "km" ? (item.imageCreditKm || item.imageCreditEn) : item.imageCreditEn}
                    </div>
                  )}

                  {/* Bottom caption */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-bold leading-tight drop-shadow">
                    {language === "km" ? item.targetGroupKm : item.targetGroupEn}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-heat-100 text-heat-800 border border-heat-200">
                  {language === "km" ? `ខែ${item.monthKm} • កំពូលកម្ដៅ` : `${item.monthEn} Peak`}
                </span>
                <div className="w-8 h-8 rounded-xl bg-cooling-50 border border-cooling-200 flex items-center justify-center flex-shrink-0">
                  {getMonthIcon(item.monthEn)}
                </div>
              </div>

              <h4 className="font-black text-xl text-gray-900 mb-3 break-words leading-snug">
                {language === "km" ? item.targetGroupKm : item.targetGroupEn}
              </h4>

              <div className="text-xs sm:text-sm text-danger-900 bg-red-50 p-3 rounded-2xl border border-red-200 mb-3 font-semibold leading-relaxed break-words">
                <span className="font-black block mb-1 text-red-700">⚠️ {language === "km" ? "មូលហេតុគ្រោះថ្នាក់៖" : "Risk Factor:"}</span>
                <span className="break-words">{language === "km" ? item.riskFactorKm : item.riskFactorEn}</span>
              </div>

              <div className="text-xs sm:text-sm text-safety-950 bg-safety-50 p-3 rounded-2xl border border-safety-200 font-medium leading-relaxed break-words">
                <span className="font-black block mb-1 text-safety-800">✔ {language === "km" ? "វិធានការការពារអាទិភាព៖" : "Action Required:"}</span>
                <span className="break-words">{language === "km" ? item.adviceKm : item.adviceEn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
