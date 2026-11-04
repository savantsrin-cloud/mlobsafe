import React, { useState } from 'react';
import { 
  Sun, 
  Droplets, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldAlert, 
  Share2
} from 'lucide-react';
import { translations } from '../data/translations';
import ShareModal from './ShareModal';

export default function Navbar({ activePage, setActivePage, lang, setLang, onOpenWaterTimer, unreadWaterCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'signs', label: t.nav.signs },
    { id: 'protect', label: t.nav.protect },
    { id: 'why', label: t.nav.whyMatters },
    { id: 'about', label: t.nav.about },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 shadow-xs">
        {/* Top Emergency Hotlines Banner */}
        <div className="bg-amber-600 text-white text-xs sm:text-sm font-medium px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 transition-colors">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-200 animate-pulse flex-shrink-0" />
            <span>{t.emergencyBar.alert}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a 
              href="tel:119" 
              className="inline-flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white px-2.5 py-0.5 rounded-full transition-all shadow-xs"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{t.emergencyBar.call119}</span>
            </a>
            <a 
              href="tel:115" 
              className="inline-flex items-center gap-1 bg-amber-800 hover:bg-amber-900 text-white px-2.5 py-0.5 rounded-full transition-all"
            >
              <span>{t.emergencyBar.call115}</span>
            </a>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="bg-white/95 backdrop-blur-md border-b border-orange-100 px-4 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo & Brand Name */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg sm:text-xl text-slate-900 leading-tight group-hover:text-orange-600 transition-colors flex items-center gap-1.5">
                  <span>{t.brandName}</span>
                  <span className="text-xs bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded-full border border-orange-200 hidden sm:inline">
                    {lang === 'km' ? 'កម្ពុជា' : 'Cambodia'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  {t.brandSub}
                </p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activePage === item.id
                      ? 'bg-orange-50 text-orange-700 font-semibold shadow-2xs'
                      : 'hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Actions: Share Button, Water Reminder & Language Switcher */}
            <div className="flex items-center gap-2">
              {/* Share Website Button */}
              <button
                onClick={() => setShareModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-orange-200 transition-all shadow-2xs"
                title="Share link with friends or team"
              >
                <Share2 className="w-4 h-4 text-orange-600" />
                <span className="hidden sm:inline">{lang === 'km' ? 'ចែករំលែក' : 'Share'}</span>
              </button>

              {/* Water Reminder Quick Pill */}
              <button
                onClick={onOpenWaterTimer}
                className="inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl border border-sky-200 transition-all shadow-2xs"
                title="Open Water Reminder & Tracker"
              >
                <Droplets className="w-4 h-4 text-sky-600" />
                <span className="hidden md:inline">{t.nav.waterTimer}</span>
                <span className="bg-sky-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                  {unreadWaterCount}
                </span>
              </button>

              {/* Language Switch Button */}
              <button
                onClick={() => setLang(lang === 'km' ? 'en' : 'km')}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl border border-slate-300 transition-colors"
                title="Switch Language / ប្តូរភាសា"
              >
                <span className="text-base">{lang === 'km' ? '🇬🇧' : '🇰🇭'}</span>
                <span>{t.nav.langSwitch}</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-1 pb-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? 'bg-orange-50 text-orange-700 font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Share Modal Dialog */}
      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        lang={lang} 
      />
    </>
  );
}
