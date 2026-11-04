"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Umbrella, 
  Menu, 
  X, 
  PhoneCall, 
  Globe, 
  HeartPulse, 
  ShieldCheck, 
  BarChart3, 
  Info,
  Home,
  Sun,
  Droplets,
  AlertTriangle,
  Compass
} from "lucide-react";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/signs", label: t.nav.signs, icon: HeartPulse },
    { href: "/protect", label: t.nav.protect, icon: ShieldCheck },
    { href: "/why-it-matters", label: t.nav.why, icon: BarChart3 },
    { href: "/about", label: t.nav.about, icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Utility Bar: Emergency Ambulance & Language Switcher (Frees up the entire main navbar) */}
      <div className="bg-heat-50/90 border-b border-heat-200/80 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: 119 Ambulance Hotline */}
          <a
            href="tel:119"
            className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-black tracking-wide"
          >
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>
              {language === "km" 
                ? "សង្គ្រោះបន្ទាន់កម្ដៅថ្ងៃ ហៅ៖ ១១៩ (ឡានពេទ្យឥតគិតថ្លៃ ២៤/៧)" 
                : "Heat Emergency Hotline: Call 119 (Free Ambulance 24/7)"}
            </span>
          </a>

          {/* Right Group: Heat Map Shortcut & Language Switcher */}
          <div className="flex items-center gap-2">
            <a
              href="/#cambodia-heat-map"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heat-100/90 border border-heat-300 text-heat-900 font-black hover:bg-heat-200 transition shadow-xs text-xs"
            >
              <Compass className="w-3.5 h-3.5 text-heat-600 animate-spin-slow" />
              <span>{language === "km" ? "ផែនទីកម្ដៅ" : "Heat Map"}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-cooling-300 text-cooling-900 font-black hover:bg-cooling-50 transition shadow-xs cursor-pointer flex-shrink-0"
              title="Switch language / ប្តូរភាសា"
            >
              <Globe className="w-3.5 h-3.5 text-cooling-600 flex-shrink-0" />
              <span>{language === "km" ? "English" : "ភាសាខ្មែរ"}</span>
              <span className="text-[10px] bg-cooling-100 text-cooling-800 px-1.5 py-0.2 rounded font-black border border-cooling-200">
                {language === "km" ? "KM" : "EN"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Header: Purely for Brand & Navigation Links */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b-2 border-heat-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[72px] sm:min-h-[76px] py-2 gap-4">
            
            {/* Logo & Brand Name */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group flex-shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-heat-500 to-cooling-500 flex items-center justify-center text-white shadow-md shadow-heat-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
                <Umbrella className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-black text-base sm:text-lg lg:text-xl text-gray-900 leading-tight">
                  {language === "km" ? (
                    <>
                      <span className="text-cooling-600">ម្លប់សុវត្ថិភាព</span> <span className="text-gray-900">:</span> <span className="text-heat-600">Shade Safety</span>
                    </>
                  ) : (
                    <>
                      <span className="text-heat-600">Shade Safety</span> <span className="text-gray-900">:</span> <span className="text-cooling-600">ម្លប់សុវត្ថិភាព</span>
                    </>
                  )}
                </div>
                <div className="text-[12px] sm:text-xs text-cooling-700 font-bold leading-tight mt-0.5 whitespace-nowrap">
                  {t.nav.brandSub}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links - Spacious and completely uncrowded */}
            <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-1.5 px-3.5 xl:px-4 py-2.5 rounded-xl text-sm xl:text-base font-bold transition-all whitespace-nowrap ${
                      active
                        ? "bg-heat-500 text-white shadow-sm shadow-heat-500/20"
                        : "text-gray-700 hover:text-heat-700 hover:bg-heat-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-500"} flex-shrink-0`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition border border-gray-200"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-heat-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-lg font-bold transition ${
                  active
                    ? "bg-heat-500 text-white shadow-sm"
                    : "text-gray-800 hover:bg-heat-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-500"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-2">
            <div className="text-xs text-gray-600 font-bold px-2">
              {language === "km" ? "លេខទូរសព្ទសង្គ្រោះបន្ទាន់ឥតគិតថ្លៃ៖" : "Toll-Free Emergency Helplines:"}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:119"
                className="flex items-center justify-center space-x-1.5 bg-heat-600 text-white py-3 rounded-xl text-sm font-black shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>119 (ឡានពេទ្យ)</span>
              </a>
              <a
                href="tel:115"
                className="flex items-center justify-center space-x-1.5 bg-cooling-600 text-white py-3 rounded-xl text-sm font-black shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>115 (ក្រសួង)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>

    {/* Floating Emergency 119 Ambulance Dial Button */}
    <a
      href="tel:119"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-heat-600 hover:from-red-700 hover:to-heat-700 text-white px-5 py-3 rounded-full font-black text-sm shadow-xl shadow-red-600/30 border-2 border-white/80 transition-all transform hover:scale-105 group"
      aria-label="Call 119 Ambulance"
    >
      <PhoneCall className="w-4 h-4 animate-bounce" />
      <span>{language === "km" ? "សង្គ្រោះ ១១៩" : "Ambulance 119"}</span>
    </a>
  </>
  );
}
