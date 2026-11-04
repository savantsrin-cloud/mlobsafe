"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { heatIllnesses } from "@/data/heatStressTranslations";
import SeasonalTimeline from "@/components/SeasonalTimeline";
import { 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle, 
  PhoneCall, 
  Search, 
  BookOpen
} from "lucide-react";

export default function SignsPage() {
  const { language, t } = useLanguage();
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredIllnesses = heatIllnesses.filter((item) => {
    const matchesFilter = filterSeverity === "all" || item.severity === filterSeverity;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.nameEn.toLowerCase().includes(q) ||
      item.nameKm.toLowerCase().includes(q) ||
      item.shortDescEn.toLowerCase().includes(q) ||
      item.shortDescKm.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger-50 border border-danger-200 text-danger-700 text-xs font-extrabold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-danger-600" />
          <span>{language === "km" ? "ការណែនាំវេជ្ជសាស្ត្រផ្លូវការ" : "Official Health Guidelines"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          {t.nav.signs}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
          {language === "km"
            ? "ស្វែងយល់អំពីជំងឺបង្កដោយកម្ដៅទាំង ៦ ប្រភេទ រួមមាន៖ ខ្យល់គរធ្ងន់ធ្ងរ អស់កម្លាំងដោយកម្តៅ ជំងឺរលាយសាច់ដុំ (Rhabdomyolysis) សន្លប់ រមួលក្រពើ និងកន្ទួលកម្តៅ។"
            : "Learn the warning signs, symptoms, and emergency actions for the six primary heat-related illnesses."}
        </p>
      </div>

      <div className="p-6 sm:p-7 rounded-3xl bg-danger-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-danger-700 animate-fadeIn">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
            <AlertTriangle className="w-7 h-7 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white text-danger-800 font-black text-xs uppercase tracking-wider mb-1.5">
              {language === "km" ? "ការព្រមានសង្គ្រោះបន្ទាន់" : "Emergency Medical Warning"}
            </div>
            <h2 className="font-black text-2xl sm:text-3xl leading-snug">
              {language === "km" 
                ? "គ្រោះថ្នាក់នៃខ្យល់គរធ្ងន់ធ្ងរ (Heat Stroke)" 
                : "The Danger of Heat Stroke"}
            </h2>
            <p className="text-base text-white/95 mt-1 font-semibold leading-relaxed max-w-2xl">
              {language === "km"
                ? "«វាអាចធ្វើឱ្យខូចខាតខួរក្បាល តម្រងនោម បេះដូង និងប្រព័ន្ធភាពស៊ាំរាងកាយ ហើយអាចបណ្ដាលឱ្យស្លាប់បាន។» ប្រសិនបើសង្ស័យ សូមហៅលេខ ១១៩ ជាបន្ទាន់!"
                : "«It can damage the brain, kidneys, heart and immune system, and can cause death.» Call 119 and initiate rapid cooling immediately!"}
            </p>
          </div>
        </div>

        <a
          href="tel:119"
          className="inline-flex items-center gap-2 bg-white text-danger-700 hover:bg-yellow-50 font-black px-6 py-3.5 rounded-2xl text-base shadow-md transition self-stretch sm:self-auto justify-center flex-shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{language === "km" ? "ទូរសព្ទទៅ ១១៩ ភ្លាម" : "Call Ambulance: 119"}</span>
        </a>
      </div>

      <section>
        <SeasonalTimeline />
      </section>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-cream-300 shadow-sm">
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterSeverity("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterSeverity === "all"
                ? "bg-gray-900 text-white"
                : "bg-cream-100 text-gray-700 hover:bg-cream-200"
            }`}
          >
            {language === "km" ? "ជំងឺទាំង ៦ ប្រភេទ" : "All 6 Heat Illnesses"}
          </button>

          <button
            onClick={() => setFilterSeverity("emergency")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterSeverity === "emergency"
                ? "bg-danger-600 text-white"
                : "bg-danger-50 text-danger-800 hover:bg-danger-100 border border-danger-200"
            }`}
          >
            {language === "km" ? "សង្គ្រោះបន្ទាន់ (Heat Stroke & Rhabdo)" : "Emergency (Stroke & Rhabdo)"}
          </button>

          <button
            onClick={() => setFilterSeverity("moderate")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterSeverity === "moderate"
                ? "bg-amber-500 text-white"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
            }`}
          >
            {language === "km" ? "កម្រិតមធ្យម (Exhaustion & Syncope)" : "Moderate (Exhaustion/Syncope)"}
          </button>

          <button
            onClick={() => setFilterSeverity("mild")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterSeverity === "mild"
                ? "bg-safety-600 text-white"
                : "bg-safety-50 text-safety-800 hover:bg-safety-100 border border-safety-200"
            }`}
          >
            {language === "km" ? "កម្រិតស្រាល (Cramps & Rash)" : "Mild (Cramps & Rash)"}
          </button>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === "km" ? "ស្វែងរកជំងឺ ឬរោគសញ្ញា..." : "Search CDC heat illness..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-gray-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-heat-500"
          />
        </div>

      </div>

      <div className="space-y-8">
        {filteredIllnesses.map((item) => {
          const isEmergency = item.severity === "emergency";
          const isModerate = item.severity === "moderate";

          return (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all bg-white shadow-soft hover:shadow-card group ${
                isEmergency
                  ? "border-danger-500 ring-2 ring-danger-200"
                  : isModerate
                  ? "border-amber-400"
                  : "border-safety-400"
              }`}
            >
              {/* Photo Header */}
              {item.imageUrl && (
                <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden mb-6 border border-gray-200 bg-gray-100 shadow-xs">
                  <img
                    src={item.imageUrl}
                    alt={language === "km" ? (item.imageAltKm || item.nameKm) : (item.imageAltEn || item.nameEn)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-block px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs ${
                        isEmergency
                          ? "bg-danger-600 text-white"
                          : isModerate
                          ? "bg-amber-500 text-white"
                          : "bg-safety-600 text-white"
                      }`}
                    >
                      {language === "km" ? item.severityLabelKm : item.severityLabelEn}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs sm:text-sm font-bold drop-shadow">
                    {language === "km" ? item.imageAltKm : item.imageAltEn}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {language === "km" ? item.nameKm : item.nameEn}
                  </h2>
                </div>

                {isEmergency && (
                  <a
                    href="tel:119"
                    className="inline-flex items-center gap-1.5 bg-danger-600 hover:bg-danger-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-sm shadow-md transition self-start sm:self-center"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{language === "km" ? "ហៅ ១១៩ ជាបន្ទាន់" : "Call 119 Hotline"}</span>
                  </a>
                )}
              </div>

              <p className="text-base text-gray-700 font-medium mt-4 leading-relaxed">
                {language === "km" ? item.shortDescKm : item.shortDescEn}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <h3 className="font-black text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-heat-600" />
                    <span>{language === "km" ? "រោគសញ្ញាសម្គាល់" : "Warning Symptoms"}</span>
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700 font-medium">
                    {(language === "km" ? item.symptomsKm : item.symptomsEn).map((sym, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="text-heat-600 font-bold">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-safety-50/70 border border-safety-200">
                  <h3 className="font-black text-lg text-safety-950 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-safety-600" />
                    <span>{language === "km" ? "វិធីសង្គ្រោះបឋម" : "Immediate Actions"}</span>
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-800 font-medium">
                    {(language === "km" ? item.whatToDoKm : item.whatToDoEn).map((action, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-safety-600 font-bold">✔</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-danger-50/70 border border-danger-200 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-lg text-danger-950 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-danger-600" />
                      <span>{language === "km" ? "ពេលណាត្រូវទៅជួបគ្រូពេទ្យ?" : "When to Seek Medical Help"}</span>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-800 font-semibold leading-relaxed">
                      {language === "km" ? item.seekMedicalKm : item.seekMedicalEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-danger-200/60 flex items-center justify-between text-xs font-bold text-danger-800">
                    <span>{language === "km" ? "ខ្សែទូរសព្ទសង្គ្រោះបន្ទាន់" : "National Hotlines"}</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-danger-300 font-black">119 / 115</span>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
