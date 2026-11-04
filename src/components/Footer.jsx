import React from 'react';
import { Sun, PhoneCall, ShieldCheck, ExternalLink, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ lang, setActivePage }) {
  const t = translations[lang];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">
                  {t.brandName}
                </span>
                <span className="text-xs bg-orange-950 text-orange-400 font-semibold px-2 py-0.5 rounded ml-2 border border-orange-800">
                  {lang === 'km' ? 'កម្ពុជា' : 'Cambodia'}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'km' ? 'ផ្អែកលើការស្រាវជ្រាវវេជ្ជសាស្ត្រ និងសុវត្ថិភាពការងារ' : 'Evidence-based public health initiative'}</span>
            </div>
          </div>

          {/* Emergency Hotlines (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              {t.footer.emergencyTitle}
            </h4>
            <div className="space-y-3">
              <a
                href="tel:119"
                className="flex items-center justify-between p-3 rounded-xl bg-red-950/60 border border-red-800/80 hover:bg-red-900/60 transition-colors text-white"
              >
                <div>
                  <div className="font-bold text-sm text-red-200">
                    {t.footer.ambulance}
                  </div>
                  <div className="text-xs text-red-400">
                    {lang === 'km' ? 'ហៅបន្ទាន់ ២៤ម៉ោង/៧ថ្ងៃ' : '24/7 Emergency Line'}
                  </div>
                </div>
                <span className="font-black text-xl text-red-400 font-mono">119</span>
              </a>

              <a
                href="tel:115"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition-colors text-white"
              >
                <div>
                  <div className="font-bold text-sm text-slate-200">
                    {t.footer.cdc}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'km' ? 'ទូរស័ព្ទឥតគិតថ្លៃ' : 'Toll-Free Health Hotline'}
                  </div>
                </div>
                <span className="font-black text-xl text-amber-400 font-mono">115</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('signs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  {t.nav.signs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('protect'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  {t.nav.protect}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('why'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  {t.nav.whyMatters}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>{lang === 'km' ? 'បង្កើតឡើងដើម្បីសុខភាពពលករកម្ពុជា' : 'Built for the health & safety of Cambodian workers'}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
