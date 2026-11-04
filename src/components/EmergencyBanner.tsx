"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AlertCircle, PhoneCall } from "lucide-react";

export default function EmergencyBanner() {
  const { language } = useLanguage();

  return (
    <div className="bg-danger-600 text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-sm border-b border-danger-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 animate-pulse text-yellow-300" />
          <span>
            {language === "km" ? (
              <span>
                <strong>ការប្រកាសអាសន្នខ្យល់គរធ្ងន់ធ្ងរ៖</strong> អាចធ្វើឱ្យខូចខាតខួរក្បាល តម្រងនោម បេះដូង ប្រព័ន្ធភាពស៊ាំ និងអាចបណ្ដាលឱ្យស្លាប់បាន (Bradford, 2025)។
              </span>
            ) : (
              <span>
                <strong>Emergency Warning:</strong> Heat stroke can damage the brain, kidneys, heart and immune system, and can cause death (Bradford, 2025).
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:119"
            className="inline-flex items-center gap-1.5 bg-white text-danger-700 font-bold px-2.5 py-1 rounded-full shadow hover:bg-yellow-50 transition text-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{language === "km" ? "ហៅឡានពេទ្យ ១១៩" : "Call Ambulance: 119"}</span>
          </a>
          <a
            href="tel:115"
            className="hidden sm:inline-flex items-center gap-1 bg-danger-700 text-white border border-danger-400 font-semibold px-2.5 py-1 rounded-full hover:bg-danger-800 transition text-xs"
          >
            <span>{language === "km" ? "ក្រសួងសុខាភិបាល៖ ១១៥" : "MoH Hotline: 115"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
