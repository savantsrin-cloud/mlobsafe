"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { lawAndPolicyData } from "@/data/heatStressTranslations";
import { 
  Info, 
  PhoneCall, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  Send, 
  FileText,
  BadgeCheck,
  Target,
  HeartHandshake,
  Umbrella,
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    workplace: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      
      {/* 1. Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cooling-50 border border-cooling-200 text-cooling-800 text-xs font-black uppercase tracking-wider">
          <Umbrella className="w-4 h-4 text-cooling-600" />
          <span>{language === "km" ? "យុទ្ធនាការលើកកម្ពស់សុខភាពកម្ដៅ" : "Public Health Heat Stress Initiative"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          {language === "km" ? "អំពីយុទ្ធនាការ & ទំនាក់ទំនង" : "About the Campaign & Contact"}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-semibold">
          {language === "km"
            ? "ស្វែងយល់ពីបេសកកម្ម គោលបំណង ច្បាប់ការងារ និងទំនាក់ទំនងនៃយុទ្ធនាការ Shade Safety : ម្លប់សុវត្ថិភាព។"
            : "Learn about the mission, objectives, labour protection policies, and contact channels for Shade Safety : ម្លប់សុវត្ថិភាព."}
        </p>
      </div>

      {/* 2. Campaign Introduction & Objectives */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-heat-200 shadow-card space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-heat-700 bg-heat-100 px-3 py-1 rounded-full">
              {language === "km" ? "គំនិតផ្តួចផ្តើមយុទ្ធនាការ" : "Campaign Idea & Vision"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2">
              {language === "km" ? (
                <>
                  <span className="text-cooling-600">ម្លប់សុវត្ថិភាព</span> : <span className="text-heat-600">Shade Safety</span>
                </>
              ) : (
                <>
                  <span className="text-heat-600">Shade Safety</span> : <span className="text-cooling-600">ម្លប់សុវត្ថិភាព</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg font-bold text-cooling-700 mt-1">
              &ldquo;{language === "km" ? "ទទួលស្គាល់សញ្ញា ការពារសុខភាពរបស់អ្នក" : "Recognise the Signs. Protect Your Health."}&rdquo;
            </p>
          </div>
        </div>

        {/* Community & Legal Rights Visual Banner */}
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group">
          <img
            src="/images/hub-about-law.jpg"
            alt="Cambodian worker protection and legal rights"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/20 shadow-xs">
            {language === "km" ? "ប្រភព៖ ច្បាប់ការងារ (Wix)" : "Credit: Labour Law (Wix)"}
          </div>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-xs font-black uppercase tracking-wider bg-cooling-600 px-3 py-1 rounded-xl mb-1.5 inline-block">
              {language === "km" ? "សាមគ្គីភាពសុខភាពសហគមន៍" : "Grassroots Community Solidarity"}
            </span>
            <div className="text-base sm:text-lg font-black leading-snug">
              {language === "km" 
                ? "ការគាំពារសុខភាពកម្មករកម្ពុជាក្នុងការប្រឈមមុខនឹងការប្រែប្រួលអាកាសធាតុ" 
                : "Supporting Cambodian Workers in the Face of Climate Change"}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-heat-50/70 border-l-4 border-heat-500 text-base sm:text-lg font-medium text-gray-800 leading-relaxed">
          {language === "km"
            ? "«គេហទំព័រដែលជួយកម្មករកាត់ដេរ អ្នករត់កង់បី/ម៉ូតូឌុប និងអ្នកលក់ដូរតាមផ្លូវនៅកម្ពុជា ឱ្យស្គាល់សញ្ញាជំងឺកម្ដៅ និងការពារខ្លួនក្នុងរដូវក្តៅខ្លាំង។»"
            : "“A website that helps garment workers, transport workers and informal food sellers in Cambodia to recognise the signs of heat illness and protect themselves during the hot season.”"}
        </div>

        {/* 4 Core Objectives */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-heat-600" />
            <span>{language === "km" ? "គោលបំណងចម្បងនៃយុទ្ធនាការ" : "Campaign Objectives"}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-2 text-base font-black text-heat-700">
                <CheckCircle2 className="w-5 h-5 text-safety-600" />
                <span>{language === "km" ? "១. ស្គាល់សញ្ញាជំងឺកម្ដៅទាន់ពេល" : "1. Early Symptom Recognition"}</span>
              </div>
              <p className="text-base text-gray-700 font-medium leading-relaxed pl-7">
                {language === "km"
                  ? "ជួយឱ្យកម្មករ និងសហការីអាចសម្គាល់រោគសញ្ញាជំងឺកម្ដៅទាំង ៦ ដូចជា វិលមុខ រមួលក្រពើ សន្លប់ និងខ្យល់គរ ដើម្បីសង្គ្រោះបឋមបានទាន់ពេលវេលា។"
                  : "Help workers and peers spot warning signs of heat illnesses (dizziness, cramps, fainting, heat stroke) to act fast."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-2 text-base font-black text-cooling-700">
                <CheckCircle2 className="w-5 h-5 text-safety-600" />
                <span>{language === "km" ? "២. ការពារសុវត្ថិភាពតាមមុខរបរជាក់ស្តែង" : "2. Tailored Workplace Protection"}</span>
              </div>
              <p className="text-base text-gray-700 font-medium leading-relaxed pl-7">
                {language === "km"
                  ? "ផ្តល់វិធានការជាក់ស្តែង និងងាយអនុវត្តសម្រាប់កម្មករកាត់ដេរ អ្នកដឹកជញ្ជូន និងអ្នកលក់ដូរតាមផ្លូវនៅកម្ពុជា។"
                  : "Provide actionable protection tips tailored for garment workers, transport workers and informal food sellers in Cambodia."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-2 text-base font-black text-safety-700">
                <CheckCircle2 className="w-5 h-5 text-safety-600" />
                <span>{language === "km" ? "៣. ជំរុញទម្លាប់ផឹកទឹក & សម្រាកម្លប់" : "3. Promote Hydration & Hourly Rest"}</span>
              </div>
              <p className="text-base text-gray-700 font-medium leading-relaxed pl-7">
                {language === "km"
                  ? "ប្រើប្រាស់កម្មវិធីរាប់ម៉ោង និងតារាងកត់ត្រាការផឹកទឹក ដើម្បីរំលឹកឱ្យកម្មករសម្រាក ៥ នាទីក្នុងម្លប់ និងផឹកទឹក ១ កែវរៀងរាល់ម៉ោង។"
                  : "Provide a simple timer and water tracker checklist reminding workers to pause in shade and rehydrate hourly."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-2 text-base font-black text-danger-700">
                <CheckCircle2 className="w-5 h-5 text-safety-600" />
                <span>{language === "km" ? "៤. ការពារគ្រោះថ្នាក់បាត់បង់ជីវិត" : "4. Prevent Fatal Heat Stroke"}</span>
              </div>
              <p className="text-base text-gray-700 font-medium leading-relaxed pl-7">
                {language === "km"
                  ? "ផ្សព្វផ្សាយសារព្រមានសង្គ្រោះបន្ទាន់ និងលេខទូរសព្ទសង្គ្រោះ ១១៩ និង ១១៥ ដោយឥតគិតថ្លៃ។"
                  : "Disseminate life-saving emergency medical warnings and direct access to 119 and 115 helplines."}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 3. National Legal & Policy Box */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-md space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-800">
              {language === "km" ? "ក្របខ័ណ្ឌច្បាប់ជាតិ" : "National Legal Framework"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {language === "km" ? lawAndPolicyData.titleKm : lawAndPolicyData.titleEn}
            </h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border-l-4 border-amber-600 shadow-sm text-sm sm:text-base font-bold text-gray-900 leading-relaxed">
          &ldquo;{language === "km" ? lawAndPolicyData.contentKm : lawAndPolicyData.contentEn}&rdquo;
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {lawAndPolicyData.articles.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>{item.article}</span>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                {language === "km" ? item.detailKm : item.detailEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Emergency Contacts Directory */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gray-900 text-white space-y-6 shadow-xl">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-heat-400 mb-1">
            {language === "km" ? "ទំនាក់ទំនងសង្គ្រោះបន្ទាន់ជាតិ" : "National Emergency Hotlines"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {language === "km" ? "លេខទូរសព្ទសង្គ្រោះ ២៤ ម៉ោង (ឥតគិតថ្លៃ)" : "24/7 Toll-Free Emergency Contacts"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <a
            href="tel:119"
            className="p-5 rounded-2xl bg-danger-950 border-2 border-danger-700 hover:bg-danger-900 transition flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-danger-300 uppercase">
                {language === "km" ? "ឡានពេទ្យសង្គ្រោះបន្ទាន់" : "Ambulance"}
              </div>
              <div className="text-3xl font-black text-white mt-1">119</div>
              <div className="text-xs text-danger-400 mt-0.5 font-semibold">24/7 Free Hotline</div>
            </div>
            <PhoneCall className="w-7 h-7 text-danger-400 animate-pulse" />
          </a>

          <a
            href="tel:115"
            className="p-5 rounded-2xl bg-cooling-950 border-2 border-cooling-700 hover:bg-cooling-900 transition flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-cooling-300 uppercase">
                {language === "km" ? "ក្រសួងសុខាភិបាល" : "Ministry of Health"}
              </div>
              <div className="text-3xl font-black text-white mt-1">115</div>
              <div className="text-xs text-cooling-400 mt-0.5 font-semibold">Toll-free Hotline</div>
            </div>
            <PhoneCall className="w-7 h-7 text-cooling-400" />
          </a>

          <a
            href="tel:117"
            className="p-5 rounded-2xl bg-gray-800 border border-gray-700 hover:bg-gray-700 transition flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase">
                {language === "km" ? "នគរបាលជាតិ" : "National Police"}
              </div>
              <div className="text-3xl font-black text-white mt-1">117</div>
              <div className="text-xs text-gray-400 mt-0.5 font-semibold">24/7 Response</div>
            </div>
            <PhoneCall className="w-7 h-7 text-gray-400" />
          </a>

          <a
            href="tel:118"
            className="p-5 rounded-2xl bg-gray-800 border border-gray-700 hover:bg-gray-700 transition flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase">
                {language === "km" ? "ពន្លត់អគ្គិភ័យ" : "Fire Rescue"}
              </div>
              <div className="text-3xl font-black text-white mt-1">118</div>
              <div className="text-xs text-gray-400 mt-0.5 font-semibold">Emergency Fire Service</div>
            </div>
            <PhoneCall className="w-7 h-7 text-gray-400" />
          </a>

        </div>
      </section>

      {/* 7. Poster & Outreach Request Form */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-300 shadow-card max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">
          {language === "km" ? "ស្នើសុំផ្ទាំងរូបភាព & ទំនាក់ទំនង" : "Request Posters & Contact"}
        </h2>
        <p className="text-base text-gray-700 mb-6 text-center font-medium">
          {language === "km"
            ? "តើអ្នកចង់បានផ្ទាំងរូបភាពសុខភាពកម្ដៅ (Shade Safety Posters) សម្រាប់រោងចក្រ សហគមន៍ ឬទីកន្លែងរបស់អ្នក?"
            : "Would you like Shade Safety : ម្លប់សុវត្ថិភាព posters for your workplace or community?"}
        </p>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-safety-50 border border-safety-300 text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-safety-600 mx-auto" />
            <h3 className="text-xl font-bold text-safety-950">
              {language === "km" ? "សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើរួចរាល់។" : "Thank you! Your request has been received."}
            </h3>
            <p className="text-sm text-safety-800">
              {language === "km" 
                ? "ក្រុមការងារយុទ្ធនាការនឹងទាក់ទងមកអ្នកវិញក្នុងពេលឆាប់ៗ។" 
                : "Our campaign outreach team will contact you shortly."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {language === "km" ? "ឈ្មោះរបស់អ្នក" : "Your Name"}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={language === "km" ? "ឧ. សុខា" : "e.g. Sokha"}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-cream-50 text-base focus:outline-none focus:ring-2 focus:ring-heat-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {language === "km" ? "រោងចក្រ ឬស្ថាប័ន / មុខរបរ" : "Factory / Workplace / Occupation"}
              </label>
              <input
                type="text"
                required
                value={formData.workplace}
                onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                placeholder={language === "km" ? "ឧ. កម្មកររោងចក្រកាត់ដេរ / អ្នករត់កង់បី" : "e.g. Garment factory worker / PassApp driver"}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-cream-50 text-base focus:outline-none focus:ring-2 focus:ring-heat-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {language === "km" ? "លេខទូរសព្ទទំនាក់ទំនង" : "Phone Number"}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="012 345 678"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-cream-50 text-base focus:outline-none focus:ring-2 focus:ring-heat-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {language === "km" ? "សារ ឬសំណើសុំ" : "Message or Request"}
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={language === "km" ? "បញ្ជាក់ចំនួនផ្ទាំងរូបភាព ឬទីតាំងដែលត្រូវការ..." : "Number of posters or questions..."}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-cream-50 text-base focus:outline-none focus:ring-2 focus:ring-heat-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-heat-600 hover:bg-heat-700 text-white font-black text-base shadow-md shadow-heat-600/20 transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{language === "km" ? "ផ្ញើសារសំណើសុំ" : "Submit Request"}</span>
            </button>
          </form>
        )}
      </section>

    </div>
  );
}
