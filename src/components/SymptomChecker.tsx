"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { symptomsList } from "@/data/heatStressTranslations";
import { 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  RotateCcw, 
  Sparkles, 
  Info,
  Droplets,
  HeartPulse,
  Brain,
  Zap,
  Flame,
  HelpCircle,
  Frown,
  CupSoda,
  Search
} from "lucide-react";

export default function SymptomChecker() {
  const { language, t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleSymptom = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const filteredSymptoms = symptomsList.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return s.labelEn.toLowerCase().includes(q) || s.labelKm.toLowerCase().includes(q);
  });

  const selectedSymptoms = symptomsList.filter((s) => selectedIds.includes(s.id));
  const hasDanger = selectedSymptoms.some((s) => s.severity === "danger");
  const moderateCount = selectedSymptoms.filter((s) => s.severity === "moderate").length;

  let triageLevel: "none" | "mild" | "caution" | "danger" = "none";
  if (selectedIds.length > 0) {
    if (hasDanger || moderateCount >= 2) {
      triageLevel = "danger";
    } else if (moderateCount >= 1 || selectedIds.length >= 2) {
      triageLevel = "caution";
    } else {
      triageLevel = "mild";
    }
  }

  const renderIcon = (name: string) => {
    switch (name) {
      case "RotateCcw": return <RotateCcw className="w-4 h-4" />;
      case "Brain": return <Brain className="w-4 h-4" />;
      case "Zap": return <Zap className="w-4 h-4" />;
      case "Droplets": return <Droplets className="w-4 h-4" />;
      case "Flame": return <Flame className="w-4 h-4" />;
      case "AlertTriangle": return <AlertTriangle className="w-4 h-4" />;
      case "HelpCircle": return <HelpCircle className="w-4 h-4" />;
      case "Frown": return <Frown className="w-4 h-4" />;
      case "HeartPulse": return <HeartPulse className="w-4 h-4" />;
      case "Sparkles": return <Sparkles className="w-4 h-4" />;
      case "CupSoda": return <CupSoda className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-cream-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-cream-200">
        <div>
          <div className="flex items-center space-x-2 text-heat-600 font-bold text-xs uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>{language === "km" ? "ឧបករណ៍ពិនិត្យសុខភាពរហ័ស" : "Interactive Health Checker"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {t.tools.symptomCheckerTitle}
          </h2>
          <p className="text-base text-gray-700 mt-2 max-w-2xl font-medium">
            {t.tools.symptomCheckerSub}
          </p>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={clearSelection}
            className="self-start sm:self-center text-xs sm:text-sm font-semibold text-gray-500 hover:text-danger-600 px-3.5 py-1.5 rounded-xl border border-gray-200 hover:border-danger-200 bg-gray-50 transition"
          >
            {t.symptomTool.clearSelection} ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Desktop 2-Column Split: Symptoms on Left, Live Triage on Right */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (lg:col-span-7): Search & Symptoms List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <label className="block text-base font-bold text-gray-800">
              {t.symptomTool.instructions}
            </label>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "km" ? "ស្វែងរកអាការៈរោគ..." : "Search symptoms..."}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-heat-500 font-medium"
              />
            </div>
          </div>
          
          {filteredSymptoms.length === 0 ? (
            <div className="p-6 text-center bg-gray-50 rounded-2xl border border-gray-200 text-base text-gray-500 font-medium">
              {language === "km" ? "រកមិនឃើញរោគសញ្ញានេះទេ" : "No symptoms matched your search."}{" "}
              <button
                onClick={() => setSearchQuery("")}
                className="text-heat-600 font-bold underline ml-1"
              >
                {language === "km" ? "សម្អាតការស្វែងរក" : "Reset search"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredSymptoms.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const isDangerItem = item.severity === "danger";

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleSymptom(item.id)}
                    className={`text-left p-3.5 rounded-2xl border text-sm sm:text-base font-semibold transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? isDangerItem
                          ? "bg-danger-500 text-white border-danger-600 shadow-md shadow-danger-500/20"
                          : "bg-heat-600 text-white border-heat-700 shadow-md shadow-heat-500/20"
                        : isDangerItem
                        ? "bg-white border-red-200 text-red-900 hover:border-red-400 hover:bg-red-50/50"
                        : "bg-cream-50/80 border-cream-300 text-gray-800 hover:border-heat-300 hover:bg-heat-50/30"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={isSelected ? "text-white" : isDangerItem ? "text-danger-600" : "text-gray-500"}>
                        {renderIcon(item.iconName)}
                      </span>
                      <span className="leading-snug">
                        {language === "km" ? item.labelKm : item.labelEn}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs flex-shrink-0 ${
                        isSelected
                          ? "bg-white text-gray-900 border-white font-bold"
                          : "border-gray-300 text-transparent"
                      }`}
                    >
                      ✓
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (lg:col-span-5): Live Triage Results Display */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
        {triageLevel === "none" ? (
          <div className="p-6 rounded-2xl bg-cream-100 border border-cream-200 text-center text-gray-500 text-sm flex flex-col items-center justify-center space-y-2">
            <Info className="w-6 h-6 text-heat-500" />
            <p>{t.symptomTool.noSymptomsSelected}</p>
          </div>
        ) : triageLevel === "danger" ? (
          <div className="p-6 rounded-3xl bg-danger-50 border-2 border-danger-500 shadow-lg animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-danger-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertTriangle className="w-7 h-7 animate-bounce" />
              </div>
              <div className="flex-grow">
                <div className="inline-block px-3 py-1 rounded-full bg-danger-600 text-white font-extrabold text-xs uppercase tracking-wider mb-2">
                  {t.symptomTool.statusDanger}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-danger-900">
                  {language === "km" 
                    ? "គ្រោះថ្នាក់ខ្លាំង៖ សង្ស័យកើតខ្យល់គរធ្ងន់ធ្ងរ ឬរលាយសាច់ដុំ (Rhabdomyolysis)!" 
                    : "CRITICAL DANGER: Signs of Heat Stroke or Severe Rhabdomyolysis!"}
                </h3>
                <p className="text-base font-semibold text-danger-800 mt-1">
                  {t.symptomTool.emergencyAlert}
                </p>

                <div className="mt-4 bg-white/90 p-4 rounded-2xl border border-danger-200 space-y-2">
                  <div className="font-bold text-gray-900 text-base">
                    {t.symptomTool.actionSteps}
                  </div>
                  <ul className="list-disc list-inside text-base text-gray-800 space-y-1.5 leading-relaxed">
                    <li>
                      <strong>{language === "km" ? "ហៅឡានពេទ្យលេខ ១១៩ ភ្លាមៗ" : "Call 119 Emergency immediately"}</strong>
                    </li>
                    <li>{language === "km" ? "លើកជនរងគ្រោះទៅកន្លែងម្លប់ ឬបន្ទប់ត្រជាក់ជាបន្ទាន់" : "Move the person to shade or air conditioning immediately"}</li>
                    <li>{language === "km" ? "យកក្រណាត់ត្រជាក់សើមជូតខ្លួន ឬស្អំកញ្ចប់ទឹកកកនៅក្លៀក ក្រលៀន និងកញ្ចឹងក" : "Cool body rapidly with cold wet towels or ice packs on neck, armpits, and groin"}</li>
                    <li>{language === "km" ? "បើទឹកនោមពណ៌តែចាស់ ត្រូវទៅពេទ្យជាបន្ទាន់ដើម្បីពិនិត្យតម្រងនោម" : "If dark tea-colored urine occurs, seek immediate clinical evaluation for Rhabdomyolysis"}</li>
                    <li>{language === "km" ? "កុំបញ្ចុកទឹក ប្រសិនបើជនរងគ្រោះសន្លប់ ឬវង្វេងស្មារតី" : "Do NOT force fluids if the person is unconscious or disoriented"}</li>
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:119"
                    className="inline-flex items-center gap-2 bg-danger-600 hover:bg-danger-700 text-white font-black px-6 py-3.5 rounded-2xl text-base sm:text-lg shadow-lg shadow-danger-600/30 transition transform hover:-translate-y-0.5"
                  >
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                    <span>{language === "km" ? "ទូរសព្ទហៅ ១១៩ ឥឡូវនេះ" : "Call 119 Ambulance Now"}</span>
                  </a>
                  <a
                    href="tel:115"
                    className="inline-flex items-center gap-2 bg-white text-danger-700 border border-danger-300 hover:bg-danger-50 font-bold px-4 py-3.5 rounded-2xl text-sm sm:text-base transition"
                  >
                    <span>{language === "km" ? "ខ្សែទូរសព្ទក្រសួងសុខាភិបាល (១១៥)" : "MoH Hotline (115)"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : triageLevel === "caution" ? (
          <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-500 shadow-md animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider mb-2">
                  {t.symptomTool.statusCaution}
                </div>
                <h3 className="text-xl font-black text-amber-950">
                  {language === "km" 
                    ? "ការប្រុងប្រយ័ត្នខ្ពស់៖ សញ្ញានៃការអស់កម្លាំងដោយកម្ដៅ (Heat Exhaustion)" 
                    : "Caution: Symptoms of Heat Exhaustion Detected"}
                </h3>
                <p className="text-sm text-amber-900 mt-1">
                  {language === "km"
                    ? "រាងកាយរបស់អ្នកកំពុងបាត់បង់ជាតិទឹក និងកើនកម្ដៅខ្លាំង។ ត្រូវផ្អាកការងារ និងសម្រាកជាបន្ទាន់។"
                    : "Your body is losing fluid and overheating. You must stop working and cool down immediately."}
                </p>

                <div className="mt-4 bg-white/90 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <div className="font-bold text-gray-900 text-sm">
                    {t.symptomTool.actionSteps}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    <li>{language === "km" ? "ចូលសម្រាកនៅកន្លែងម្លប់ត្រជាក់យ៉ាងតិច ៣០ នាទី" : "Rest in a cool, shaded area for at least 30 minutes"}</li>
                    <li>{language === "km" ? "ស្រាយសម្លៀកបំពាក់ឱ្យធូរ និងដោះអាវក្រៅចេញ" : "Loosen clothing and remove outer garments"}</li>
                    <li>{language === "km" ? "ក្រេបទឹកត្រជាក់ ឬទឹកអូរ៉ាលីត (ORS) បន្តិចម្តងៗ" : "Sip cool water or oral rehydration salts slowly"}</li>
                    <li>{language === "km" ? "ជូតមុខ និងកញ្ចឹងកដោយក្រណាត់ត្រជាក់សើម" : "Apply cool damp cloth to forehead and back of neck"}</li>
                  </ul>
                  <div className="text-xs font-semibold text-danger-700 pt-2 border-t border-amber-100">
                    ⚠️ {language === "km" 
                      ? "ប្រសិនបើក្អួតចង្អោរ ឬមិនធូរស្រាលក្នុងរយៈពេល ១ ម៉ោង សូមបញ្ជូនទៅជួបគ្រូពេទ្យ!" 
                      : "If vomiting occurs or symptoms do not improve within 1 hour, seek medical help!"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-3xl bg-green-50 border-2 border-green-500 shadow-sm animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="inline-block px-3 py-1 rounded-full bg-green-600 text-white font-extrabold text-xs uppercase tracking-wider mb-2">
                  {t.symptomTool.statusSafe}
                </div>
                <h3 className="text-xl font-bold text-green-950">
                  {language === "km" ? "រោគសញ្ញាកម្រិតស្រាល (Mild Symptoms)" : "Mild Symptoms Detected"}
                </h3>
                <p className="text-sm text-green-900 mt-1">
                  {language === "km"
                    ? "រោគសញ្ញានេះអាចគ្រប់គ្រងបានដោយការសម្រាក និងបំពេញជាតិទឹកឱ្យបានគ្រប់គ្រាន់។"
                    : "These symptoms can generally be managed with early rest and proper hydration."}
                </p>

                <div className="mt-4 bg-white/90 p-4 rounded-2xl border border-green-200 space-y-2">
                  <div className="font-bold text-gray-900 text-sm">
                    {t.symptomTool.actionSteps}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    <li>{language === "km" ? "ផឹកទឹកស្អាត ១-២ កែវភ្លាមៗ" : "Drink 1-2 glasses of clean water immediately"}</li>
                    <li>{language === "km" ? "សម្រាកក្នុងម្លប់ ឬកន្លែងមានកង្ហារបក់" : "Rest in shade with fan ventilation"}</li>
                    <li>{language === "km" ? "លាតសន្ធឹងសាច់ដុំថ្នមៗប្រសិនបើមានការរមួលក្រពើ" : "Gently stretch tight muscles if cramping occurs"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

    </div>
  );
}
