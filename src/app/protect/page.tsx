"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import JobTipsFilter from "@/components/JobTipsFilter";
import WaterReminder from "@/components/WaterReminder";
import CoreIconsBar from "@/components/CoreIconsBar";
import { whyWorkersCantRest } from "@/data/heatStressTranslations";
import { 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  AlertOctagon, 
  DollarSign,
  ArrowRight,
  Umbrella,
  Thermometer,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function ProtectPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heat-100 border border-heat-300 text-heat-800 text-xs font-black uppercase tracking-wider">
          <Umbrella className="w-4 h-4 text-heat-600" />
          <span>{language === "km" ? "ម្លប់សុវត្ថិភាព • ការការពារសុវត្ថិភាពការងារ" : "Safe Shade • Workplace Protection"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          {t.nav.protect}
        </h1>
        <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-semibold">
          {language === "km"
            ? "វិធានការការពារខ្លួនជាក់ស្តែងសម្រាប់កម្មករកាត់ដេរ អ្នកដឹកជញ្ជូន និងអ្នកលក់ដូរតាមផ្លូវនៅកម្ពុជា ផ្អែកលើសសរស្តម្ភធំៗទាំង ៣៖ ផឹកទឹក សម្រាកម្លប់ និងការពារកម្តៅថ្ងៃ រួមទាំងការដោះស្រាយសម្ពាធការងារ។"
            : "Practical heat safety advice for garment workers, transport workers and informal food sellers in Cambodia built upon 3 foundational pillars: Hydration, Shade Rest, and Sun Avoidance."}
        </p>
      </div>

      {/* 5 Core Icons Strip */}
      <CoreIconsBar />

      {/* Piece-rate Pay Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-heat-50/80 border-2 border-heat-300 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heat-200 text-heat-900 text-xs font-black uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-heat-800" />
              <span>{language === "km" ? "ការយល់ដឹងអំពីសម្ពាធការងារ" : "Workplace Safety Reality"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              {language === "km" 
                ? "មូលហេតុដែលកម្មករពិបាកឈប់សម្រាកផឹកទឹក" 
                : "Why Workers Struggle to Rest & Hydrate"}
            </h2>
            <blockquote className="text-base sm:text-lg font-bold text-heat-950 italic border-l-4 border-heat-500 pl-4 my-2 leading-relaxed">
              &ldquo;{language === "km" ? whyWorkersCantRest.quoteKm : whyWorkersCantRest.quoteEn}&rdquo;
            </blockquote>
            <p className="text-base text-gray-800 font-medium leading-relaxed max-w-3xl">
              {language === "km"
                ? "ការណែនាំសម្រាប់និយោជក និងប្រធានរោងចក្រ៖ ត្រូវអនុញ្ញាតឱ្យកម្មករសម្រាកផឹកទឹក ៥ នាទីរៀងរាល់ម៉ោង និងសម្រួលកូតាផលិតកម្មនៅថ្ងៃក្តៅខ្លាំង ដើម្បីការពារករណីដួលសន្លប់ទ្រង់ទ្រាយធំ។"
                : "Employer Action Required: Management must institutionalize paid 5-minute hydration and shade intervals and adjust piece-rate expectations during heatwaves to prevent mass faints."}
            </p>
          </div>

          <Link
            href="/why-it-matters"
            className="inline-flex items-center gap-2 bg-heat-600 hover:bg-heat-700 text-white font-black px-6 py-3.5 rounded-2xl text-base shadow-md transition flex-shrink-0"
          >
            <span>{language === "km" ? "មើលទិន្នន័យជាក់ស្តែង" : "Read Facts"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3 Pillars of Protection - With Visual Photos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Water */}
        <div className="p-6 sm:p-7 rounded-3xl bg-cooling-50 border-2 border-cooling-300 flex flex-col justify-between shadow-soft hover:shadow-card transition group">
          <div>
            {/* Visual Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 shadow-xs border border-cooling-200 bg-white">
              <img
                src="/images/hub-protect-hydration.jpg"
                alt="Continuous clean water hydration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-2.5 bg-cooling-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                {language === "km" ? "សសរស្តម្ភទី ១ • ទឹកស្អាត 💧" : "Pillar 1 • Hydration 💧"}
              </div>
              <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 shadow-xs">
                {language === "km" ? "ប្រភព៖ ការណែនាំផឹកទឹក" : "Credit: Hydration Safety"}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-cooling-500 text-white flex items-center justify-center shadow-md shadow-cooling-500/25 flex-shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-cooling-700">
                  {language === "km" ? "ការបំពេញជាតិទឹក" : "Hydration Rule"}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {language === "km" ? "ផឹកទឹកឱ្យបានទៀងទាត់" : "Continuous Hydration"}
                </h2>
              </div>
            </div>

            <p className="text-base text-gray-700 font-medium leading-relaxed mb-4">
              {language === "km"
                ? "ផឹកទឹកស្អាត ១ កែវរៀងរាល់ ២០-៣០ នាទី។ កុំរង់ចាំដល់ស្រេកទឹកខ្លាំងទើបផឹក។ ប្រើប្រាស់ទឹកអូរ៉ាលីត (ORS) ឬទឹកដូងស្រស់នៅថ្ងៃក្តៅខ្លាំង ដើម្បីការពារជំងឺរលាយសាច់ដុំ (Rhabdomyolysis)។"
                : "Drink 1 cup of clean water every 20-30 minutes. Do not wait until parched. Incorporate oral rehydration salts (ORS) or coconut water on extreme heat days to protect kidney function."}
            </p>
            <div className="p-3 bg-white rounded-xl border border-cooling-200 text-xs sm:text-sm font-bold text-red-700 flex items-start gap-1.5 shadow-xs">
              <AlertOctagon className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>
                {language === "km" 
                  ? "ជៀសវាងភេសជ្ជៈប៉ូវកម្លាំងផ្អែមខ្លាំង និងគ្រឿងស្រវឹង ព្រោះធ្វើឱ្យខ្វះជាតិទឹក!" 
                  : "Avoid energy drinks, excessive sugar, and alcohol which accelerate dehydration!"}
              </span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Shade */}
        <div className="p-6 sm:p-7 rounded-3xl bg-heat-50 border-2 border-heat-300 flex flex-col justify-between shadow-soft hover:shadow-card transition group">
          <div>
            {/* Visual Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 shadow-xs border border-heat-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80"
                alt="Workers resting together in shade"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-2.5 bg-heat-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                {language === "km" ? "សសរស្តម្ភទី ២ • ម្លប់សុវត្ថិភាព ⛱️" : "Pillar 2 • Safe Shade ⛱️"}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-heat-500 text-white flex items-center justify-center shadow-md shadow-heat-500/25 flex-shrink-0">
                <Umbrella className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-heat-700">
                  {language === "km" ? "ការបញ្ចុះកម្តៅ" : "Core Cooling"}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {language === "km" ? "សម្រាកក្នុងម្លប់ជាប្រចាំ" : "Rest in Shade Hourly"}
                </h2>
              </div>
            </div>

            <p className="text-base text-gray-700 font-medium leading-relaxed mb-4">
              {language === "km"
                ? "ឆ្លៀតសម្រាក ៥-១០ នាទីក្នុងម្លប់ ឬកន្លែងមានកង្ហាររៀងរាល់មួយម៉ោងម្តង ដើម្បីឱ្យរាងកាយបញ្ចុះកម្តៅ និងបន្ថយចង្វាក់បេះដូង។"
                : "Take 5-10 minute rest breaks in shaded or ventilated areas every hour to allow your core body temperature to reset and heart rate to normalize."}
            </p>
            <div className="p-3 bg-white rounded-xl border border-heat-200 text-xs sm:text-sm font-bold text-gray-800 flex items-start gap-1.5 shadow-xs">
              <Sparkles className="w-4 h-4 text-heat-600 flex-shrink-0 mt-0.5" />
              <span>
                {language === "km" 
                  ? "ជូតមុខ និងកញ្ចឹងកដោយក្រណាត់ត្រជាក់សើមពេលសម្រាក" 
                  : "Apply a cool damp cloth to forehead and back of neck during rests"}
              </span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Sun Avoidance */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-cooling-300 flex flex-col justify-between shadow-soft hover:shadow-card transition group">
          <div>
            {/* Visual Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 shadow-xs border border-cooling-200 bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
                alt="Sun protection and UV shade"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-2.5 bg-cooling-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                {language === "km" ? "សសរស្តម្ភទី ៣ • ការពារថ្ងៃ ☀️" : "Pillar 3 • Sun Defense ☀️"}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-cooling-600 text-white flex items-center justify-center shadow-md shadow-cooling-600/25 flex-shrink-0">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-cooling-700">
                  {language === "km" ? "ម៉ោងគ្រោះថ្នាក់" : "Peak Sun Hours"}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {language === "km" ? "ជៀសវាងកម្ដៅថ្ងៃត្រង់" : "Avoid Peak Sun (11-3)"}
                </h2>
              </div>
            </div>

            <p className="text-base text-gray-700 font-medium leading-relaxed mb-4">
              {language === "km"
                ? "កាំរស្មីព្រះអាទិត្យក្តៅខ្លាំងបំផុតចន្លោះម៉ោង ១១:០០ ព្រឹក ដល់ ៣:០០ រសៀល។ ស្លៀកពាក់អាវដៃវែងពណ៌ស្រាល ប្រើក្រមា ឬពាក់មួកការពារ។"
                : "Solar radiation reaches dangerous peaks between 11:00 AM and 3:00 PM. Wear lightweight, light-colored long sleeves, UV hats, or a Cambodian kroma."}
            </p>
            <div className="p-3 bg-cooling-50 rounded-xl border border-cooling-200 text-xs sm:text-sm font-bold text-gray-800 flex items-start gap-1.5 shadow-xs">
              <CheckCircle className="w-4 h-4 text-cooling-600 flex-shrink-0 mt-0.5" />
              <span>
                {language === "km" 
                  ? "សម្លៀកបំពាក់ពណ៌ស្រាលជួយជះកម្ដៅថ្ងៃចេញ មិនស្រូបកម្តៅ" 
                  : "Light colors reflect solar rays rather than absorbing heat"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Sector Tips Filter with Photos */}
      <section>
        <JobTipsFilter />
      </section>

      {/* Water & Shade Hourly Reminder */}
      <section>
        <WaterReminder />
      </section>

    </div>
  );
}
