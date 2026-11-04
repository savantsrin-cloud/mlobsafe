"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Umbrella, 
  PhoneCall, 
  Heart, 
  Droplets, 
  Sun, 
  Thermometer, 
  AlertTriangle 
} from "lucide-react";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-12 border-t-4 border-heat-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-heat-500 to-cooling-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
                <Umbrella className="w-7 h-7" />
              </div>
              <div>
                <div className="font-black text-xl text-white">
                  {language === "km" ? (
                    <>
                      <span className="text-cooling-400">ម្លប់សុវត្ថិភាព</span> : <span className="text-heat-500">Shade Safety</span>
                    </>
                  ) : (
                    <>
                      <span className="text-heat-500">Shade Safety</span> : <span className="text-cooling-400">ម្លប់សុវត្ថិភាព</span>
                    </>
                  )}
                </div>
                <div className="text-xs font-bold text-cooling-400">
                  {language === "km" ? "ទទួលស្គាល់សញ្ញា ការពារសុខភាពរបស់អ្នក" : "Recognise the Signs. Protect Your Health."}
                </div>
              </div>
            </div>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              {language === "km"
                ? "គេហទំព័រដែលជួយកម្មករកាត់ដេរ អ្នកដឹកជញ្ជូន និងអ្នកលក់ដូរតាមផ្លូវនៅកម្ពុជា ឱ្យស្គាល់សញ្ញាជំងឺកម្ដៅ និងការពារខ្លួនក្នុងរដូវក្តៅខ្លាំង។"
                : "A website that helps garment workers, transport workers and informal food sellers in Cambodia to recognise the signs of heat illness and protect themselves during the hot season."}
            </p>
            
            {/* 5 Icons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-gray-400">
              <span title="Sun (ព្រះអាទិត្យ)" className="p-2 rounded-xl bg-heat-900/60 text-heat-400 border border-heat-800">☀️ ព្រះអាទិត្យ</span>
              <span title="Water drop (ដំណក់ទឹក)" className="p-2 rounded-xl bg-cooling-900/60 text-cooling-400 border border-cooling-800">💧 ទឹក</span>
              <span title="Thermometer (ទែម៉ូម៉ែត្រ)" className="p-2 rounded-xl bg-red-900/60 text-red-400 border border-red-800">🌡️ កម្តៅ</span>
              <span title="Safe Shade (ម្លប់)" className="p-2 rounded-xl bg-blue-900/60 text-blue-400 border border-blue-800">⛱️ ម្លប់</span>
              <span title="Warning (គ្រោះថ្នាក់)" className="p-2 rounded-xl bg-amber-900/60 text-amber-400 border border-amber-800">⚠️ អាសន្ន</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3 text-base font-medium">
              <li>
                <Link href="/" className="hover:text-heat-400 transition flex items-center gap-2">
                  <span className="text-heat-500 font-bold">›</span> {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/signs" className="hover:text-heat-400 transition flex items-center gap-2">
                  <span className="text-heat-500 font-bold">›</span> {t.nav.signs}
                </Link>
              </li>
              <li>
                <Link href="/protect" className="hover:text-heat-400 transition flex items-center gap-2">
                  <span className="text-heat-500 font-bold">›</span> {t.nav.protect}
                </Link>
              </li>
              <li>
                <Link href="/why-it-matters" className="hover:text-heat-400 transition flex items-center gap-2">
                  <span className="text-heat-500 font-bold">›</span> {t.nav.why}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-heat-400 transition flex items-center gap-2">
                  <span className="text-heat-500 font-bold">›</span> {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-4">
              {t.footer.emergencyHeading}
            </h3>
            <div className="space-y-3">
              <a
                href="tel:119"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-danger-950/80 border-2 border-danger-700 text-danger-200 hover:bg-danger-900 transition font-black text-sm"
              >
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-5 h-5 text-danger-400 animate-pulse" />
                  <span>{t.footer.ambulance}</span>
                </div>
                <span className="bg-danger-700 text-white text-xs px-2.5 py-1 rounded-lg font-black">
                  119
                </span>
              </a>

              <a
                href="tel:115"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-cooling-950/80 border-2 border-cooling-700 text-cooling-200 hover:bg-cooling-900 transition font-black text-sm"
              >
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-5 h-5 text-cooling-400" />
                  <span>{t.footer.moh}</span>
                </div>
                <span className="bg-cooling-700 text-white text-xs px-2.5 py-1 rounded-lg font-black">
                  115
                </span>
              </a>

              <a
                href="tel:117"
                className="flex items-center justify-between p-3 rounded-2xl bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 transition font-bold text-xs"
              >
                <span>{t.footer.police}</span>
                <span className="bg-gray-800 text-gray-200 text-xs px-2 py-0.5 rounded-lg">117</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 font-semibold space-y-2">
          <p>{t.footer.rightsNotice}</p>
          <p className="flex items-center justify-center space-x-1 text-gray-400">
            <span>© 2026 Shade Safety : ម្លប់សុវត្ថិភាព | Cambodia Worker Heat Safety.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
