"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { heatDataAndStatistics, whyWorkersCantRest } from "@/data/heatStressTranslations";
import SeasonalTimeline from "@/components/SeasonalTimeline";
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
  BarChart3, 
  DollarSign, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function WhyItMattersPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heat-50 border border-heat-200 text-heat-800 text-xs font-extrabold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-heat-600" />
          <span>{language === "km" ? "ទិន្នន័យ និងស្ថិតិផ្លូវការ" : "Evidence-Based Data & Climate Trends"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          {t.nav.why}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
          {language === "km"
            ? "ភស្តុតាង និងទិន្នន័យជាក់ស្តែងអំពីការកើនឡើងកម្តៅនៅកម្ពុជា ការប្រឈមកម្តៅនៅកន្លែងធ្វើការ និងផលប៉ះពាល់ធ្ងន់ធ្ងរលើសុខភាព ផលិតភាព និងសេដ្ឋកិច្ចរបស់ពលករខ្មែរ។"
            : "Verified empirical data on Cambodia's escalating temperatures, workplace heat exposure, and the profound health and economic consequences for Cambodian workers."}
        </p>
      </div>

      {/* Visual Photography Spotlight - Includes 3D Pie Chart of Heat-Related Illnesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden border-2 border-heat-200 shadow-soft group bg-white flex items-center justify-center">
          <img
            src="/images/hub-why-matters-statistics.jpg"
            alt="Distribution of Heat-Related Illnesses: Heat Stroke, Heat Exhaustion"
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/20 shadow-xs z-10">
            {language === "km" ? "ប្រភព៖ ទិន្នន័យស្រាវជ្រាវ HRI" : "Credit: HRI Research Data"}
          </div>
          <div className="absolute bottom-3 left-4 right-4 bg-black/75 backdrop-blur-xs p-2.5 rounded-xl text-white text-xs z-10">
            <span className="font-black text-amber-300">
              {language === "km" ? "ការបែងចែកករណីជំងឺកម្ដៅ៖" : "Heat Illness Classification:"}
            </span>{" "}
            <span>Suspected HE (34.2%), Suspected HS (31.2%), Heat Exhaustion (17.3%), Heat Stroke (6.1%)</span>
          </div>
        </div>

        <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden border-2 border-cooling-200 shadow-soft group">
          <img
            src="/images/hub-about-law.jpg"
            alt="Workers legal rights and policy support"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/20 shadow-xs">
            {language === "km" ? "ប្រភព៖ ច្បាប់ការងារ (Wix)" : "Credit: Labour Law (Wix)"}
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="text-xs font-black uppercase tracking-wider bg-cooling-600 px-3 py-1 rounded-lg mb-2 inline-block">
              {language === "km" ? "សុវត្ថិភាពការងារ និងសិទ្ធិ" : "Labour Protection Rights"}
            </span>
            <h3 className="text-xl font-black">
              {language === "km" ? "សិទ្ធិទទួលបានបរិយាកាសការងារត្រជាក់" : "Right to a Safe & Cool Workplace"}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
              {language === "km" ? "ប្រកាស ១៤៧ ស្តីពីខ្យល់ចេញចូល និងមាត្រា ២២៩-២៣០ នៃច្បាប់ការងារ" : "Prakas 147 and Labour Law Articles 229-230 on Thermal Workplace Environment"}
            </p>
          </div>
        </div>
      </div>

      <section>
        <SeasonalTimeline />
      </section>

      {/* Interactive Provincial Heat Stress Map */}
      <section id="cambodia-heat-map">
        <CambodiaHeatMap />
      </section>

      <section className="space-y-12">
        <div className="border-b border-cream-300 pb-4">
          <div className="text-xs font-black uppercase tracking-wider text-heat-600 mb-1">
            {language === "km" ? "ទិន្នន័យ និងស្ថិតិដែលបានផ្ទៀងផ្ទាត់" : "Verified Data & Statistics"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {language === "km" ? "ទិដ្ឋភាពជាក់ស្ដែងនៃវិបត្តិកម្ដៅនៅកម្ពុជា" : "The Reality of Cambodia's Occupational Heat Crisis"}
          </h2>
        </div>

        {heatDataAndStatistics.map((group) => (
          <div key={group.id} className="space-y-5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-heat-600 rounded-full"></span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                {language === "km" ? group.groupTitleKm : group.groupTitleEn}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft flex flex-col justify-between hover:border-heat-400 hover:shadow-card transition"
                >
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-heat-600 tracking-tight mb-2">
                      {item.metric}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                      {language === "km" ? item.titleKm : item.titleEn}
                    </h4>
                    <p className="text-base text-gray-700 leading-relaxed font-medium">
                      {language === "km" ? item.descriptionKm : item.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="p-8 sm:p-10 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-black uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-amber-800" />
            <span>{language === "km" ? "ឧបសគ្គសេដ្ឋកិច្ច និងប្រាក់ឈ្នួល" : "The Economic Dilemma: Why Workers Can't Rest"}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
            {language === "km" 
              ? "«ការគិតប្រាក់ឈ្នួលតាមចំនួនផលិតផលសម្រេច និងគោលដៅតឹងរ៉ឹង»" 
              : "Piece-Rate Pay vs. Worker Survival"}
          </h3>

          <blockquote className="p-4 rounded-2xl bg-white/90 border-l-4 border-amber-600 text-base sm:text-lg font-bold text-gray-900 italic">
            &ldquo;{language === "km" ? whyWorkersCantRest.quoteKm : whyWorkersCantRest.quoteEn}&rdquo;
          </blockquote>

          <p className="text-base text-gray-700 leading-relaxed font-medium">
            {language === "km" ? whyWorkersCantRest.explanationKm : whyWorkersCantRest.explanationEn}
          </p>
        </div>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-cream-300 text-sm font-bold">
        <Link
          href="/protect"
          className="text-gray-600 hover:text-gray-900 transition flex items-center gap-1.5"
        >
          <span>←</span>
          <span>{language === "km" ? "ត្រឡប់ទៅការការពារខ្លួន" : "Back to Protect Yourself"}</span>
        </Link>
        <Link
          href="/about"
          className="text-heat-600 hover:text-heat-700 transition flex items-center gap-1.5"
        >
          <span>{language === "km" ? "អំពីយុទ្ធនាការ & ទំនាក់ទំនង" : "About & Contact"}</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
}
