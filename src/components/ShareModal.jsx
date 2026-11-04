import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Globe, Wifi, Send, ExternalLink } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, lang }) {
  const [copiedLink, setCopiedLink] = useState(null);

  if (!isOpen) return null;

  // Active public tunnel URL
  const publicTunnelUrl = "https://tidy-dingo-28.loca.lt";
  const localWifiUrl = "http://192.168.1.4:3060";
  const tunnelPassword = "119.13.156.204";

  const handleCopy = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(null), 3000);
    }
  };

  // QR Code URL via free reliable QR server API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(publicTunnelUrl)}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(publicTunnelUrl)}&text=${encodeURIComponent(
    lang === 'km' 
      ? 'ម្លប់សុវត្ថិភាព · Shade Safety: ការការពារសុខភាពពីកម្ដៅថ្ងៃសម្រាប់កម្មករ និងអ្នករត់កង់បីនៅកម្ពុជា!'
      : 'Shade Safety Cambodia: Heat stress and health safety guide for workers!'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'km' ? 'ចែករំលែកទៅកាន់មិត្តភក្តិ និងក្រុមការងារ' : 'Share with Friends & Teammates'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'km'
              ? 'មិត្តរបស់អ្នកអាចចូលមើលពីទូរស័ព្ទដៃ ឬកុំព្យូទ័របានគ្រប់ទីកន្លែង'
              : 'Your teammates can open and test this prototype from any phone or computer.'}
          </p>
        </div>

        {/* Option 1: Live Public Link */}
        <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-orange-600" />
              <span>{lang === 'km' ? 'តំណភ្ជាប់សាធារណៈ (ប្រើបានគ្រប់ទីកន្លែង)' : 'Public Internet Link (Share Anywhere)'}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {lang === 'km' ? 'ដំណើរការផ្ទាល់' : 'Live Online'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicTunnelUrl}
              className="w-full text-xs sm:text-sm font-bold font-mono bg-white px-3 py-2.5 rounded-xl border border-orange-300 text-orange-950 focus:outline-none"
            />
            <button
              onClick={() => handleCopy(publicTunnelUrl, 'public')}
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              {copiedLink === 'public' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink === 'public' ? (lang === 'km' ? 'បានចម្លង!' : 'Copied!') : (lang === 'km' ? 'ចម្លង' : 'Copy')}</span>
            </button>
          </div>

          <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
            <span>
              {lang === 'km' ? '🔑 បើគេទាមទារលេខសម្ងាត់ IP (Password) សូមវាយ៖ ' : '🔑 If localtunnel prompts for Tunnel Password, enter: '}
              <strong className="font-mono text-orange-900">{tunnelPassword}</strong>
            </span>
            <button
              onClick={() => handleCopy(tunnelPassword, 'pw')}
              className="text-[10px] text-orange-700 underline font-semibold ml-2 hover:text-orange-900"
            >
              {copiedLink === 'pw' ? 'Copied' : 'Copy IP'}
            </button>
          </div>
        </div>

        {/* Option 2: Same Wi-Fi Link */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-sky-600" />
              <span>{lang === 'km' ? 'តំណភ្ជាប់ក្នុងប្រព័ន្ធ Wi-Fi ជាមួយគ្នា' : 'Local Wi-Fi Network Link'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={localWifiUrl}
              className="w-full text-xs sm:text-sm font-mono bg-white px-3 py-2 rounded-xl border border-sky-300 text-slate-800 focus:outline-none"
            />
            <button
              onClick={() => handleCopy(localWifiUrl, 'wifi')}
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
            >
              {copiedLink === 'wifi' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink === 'wifi' ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* QR Code & Direct Social Share */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-slate-100">
          <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex-shrink-0">
            <img 
              src={qrCodeUrl} 
              alt="Scan to open on smartphone" 
              className="w-24 h-24 object-contain rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="text-left space-y-2">
            <div className="text-xs font-bold text-slate-800">
              📱 {lang === 'km' ? 'ស្កេន QR Code លើទូរស័ព្ទដៃ' : 'Scan QR code with phone camera'}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {lang === 'km' 
                ? 'បើកកាមេរ៉ាទូរស័ព្ទស្កេន ដើម្បីបើកមើលគេហទំព័រនេះភ្លាមៗលើទូរស័ព្ទ។'
                : 'Open your phone camera to instantly launch and test on mobile screen.'}
            </p>
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'ផ្ញើតាម Telegram' : 'Share via Telegram'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
