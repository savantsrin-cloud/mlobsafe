import React, { useState } from 'react';
import { 
  HeartHandshake, 
  PhoneCall, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  FileText,
  MapPin,
  Building
} from 'lucide-react';

export default function AboutContactPage({ lang }) {
  const [formData, setFormData] = useState({ name: '', phone: '', job: 'garment', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-4">
          <HeartHandshake className="w-3.5 h-3.5 text-orange-600" />
          <span>{lang === 'km' ? 'អំពីគម្រោងយុទ្ធនាការ' : 'About the Campaign'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          {lang === 'km' ? 'អំពីយើង និងទំនាក់ទំនង' : 'About Shade Safety & Contacts'}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {lang === 'km'
            ? 'យុទ្ធនាការ «ម្លប់សុវត្ថិភាព» (Shade Safety) ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងកាត់បន្ថយគ្រោះថ្នាក់ និងការបាត់បង់ជីវិតដោយសារកម្ដៅថ្ងៃក្នុងចំណោមពលករ និងអ្នកប្រកបរបរក្រៅប្រព័ន្ធនៅប្រទេសកម្ពុជា។'
            : 'Shade Safety (ម្លប់សុវត្ថិភាព) is a grassroots health-protection prototype empowering Cambodian workers with accessible, life-saving heat safety knowledge.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Campaign Mission & Sources (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Mission & Objectives */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === 'km' ? 'បេសកកម្ម និងគោលបំណង' : 'Our Mission & Goals'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'km'
                ? 'ក្នុងអំឡុងរដូវប្រាំង និងខែដែលក្តៅខ្លាំង (ខែមីនា ដល់ឧសភា) សីតុណ្ហភាពនៅកម្ពុជាអាចកើនឡើងហួសពី ៤០°C។ គម្រោងនេះផ្តល់នូវចំណេះដឹងវេជ្ជសាស្ត្រជាភាសាខ្មែរសាមញ្ញ ឧបករណ៍វាយតម្លៃហានិភ័យកម្ដៅ និងការរំលឹកញ៉ាំទឹក ដើម្បីការពារសុខភាពពលករ។'
                : 'During Cambodia’s intense dry season (March–May), ambient temperatures frequently soar past 40°C. We translate medical protocols into plain Khmer and English with interactive daily tools to safeguard workers.'}
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                <span className="font-bold text-sm text-orange-900 block mb-1">
                  {lang === 'km' ? '១. ការពារការសន្លប់' : '1. Prevent Fainting'}
                </span>
                <span className="text-xs text-orange-800">
                  {lang === 'km' ? 'កាត់បន្ថយករណីដួលសន្លប់ក្នុងរោងចក្រ និងតាមផ្លូវ' : 'Eliminate sudden heat collapse on factory floors and transit routes.'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="font-bold text-sm text-sky-900 block mb-1">
                  {lang === 'km' ? '២. បង្កើតទម្លាប់ញ៉ាំទឹក' : '2. Hydration Habit'}
                </span>
                <span className="text-xs text-sky-800">
                  {lang === 'km' ? 'រំលឹកឱ្យញ៉ាំទឹកស្អាត ១ កែវរៀងរាល់ ១ ម៉ោងជាប្រចាំ' : 'Establish hourly water intake to shield kidney health.'}
                </span>
              </div>
            </div>
          </div>

          {/* Sources and Scientific References */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <span>{lang === 'km' ? 'ប្រភពព័ត៌មាន និងឯកសារយោង' : 'Data Sources & Medical References'}</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>WHO (World Health Organization):</strong> Heat and Health Technical Guidelines & Oral Rehydration Solution standards.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>Ministry of Health Cambodia (ក្រសួងសុខាភិបាល):</strong> Public health seasonal advisories on heat-related illness prevention.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>ILO (International Labour Organization):</strong> Working on a Warmer Planet — The impact of heat stress on labour productivity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>Ministry of Labour and Vocational Training (MLVT):</strong> Occupational Safety and Health (OSH) regulations for factories.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Emergency Directory + Feedback Form (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Emergency Directory Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-400" />
              <span>{lang === 'km' ? 'លេខទូរស័ព្ទសង្គ្រោះបន្ទាន់' : 'Emergency Directory'}</span>
            </h3>

            <div className="space-y-3">
              <a
                href="tel:119"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-red-950/80 border border-red-800 hover:bg-red-900 transition-colors"
              >
                <div>
                  <div className="font-bold text-sm text-white">
                    {lang === 'km' ? 'ឡានពេទ្យសង្គ្រោះបន្ទាន់' : 'Ambulance Emergency (SAMU)'}
                  </div>
                  <div className="text-xs text-red-300">
                    {lang === 'km' ? 'ទូទាំងប្រទេស ២៤/៧' : 'Nationwide 24/7'}
                  </div>
                </div>
                <span className="text-2xl font-black text-red-400 font-mono">119</span>
              </a>

              <a
                href="tel:115"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <div>
                  <div className="font-bold text-sm text-white">
                    {lang === 'km' ? 'ខ្សែទូរស័ព្ទសុខាភិបាល (CDC)' : 'MoH CDC Health Hotline'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'km' ? 'ឥតគិតថ្លៃ' : 'Toll-Free'}
                  </div>
                </div>
                <span className="text-2xl font-black text-amber-400 font-mono">115</span>
              </a>
            </div>
          </div>

          {/* Feedback & Inquiries Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              {lang === 'km' ? 'មតិយោបល់ និងទំនាក់ទំនង' : 'Send Feedback or Inquiry'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'km'
                ? 'តើលោកអ្នកចង់ឱ្យយុទ្ធនាការនេះបន្ថែមមុខងារ ឬសម្ភារៈអប់រំណាមួយ?'
                : 'Have ideas or want to partner on heat safety in your community?'}
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-950">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-base mb-1">
                  {lang === 'km' ? 'អរគុណច្រើន!' : 'Thank you!'}
                </h4>
                <p className="text-xs">
                  {lang === 'km' ? 'មតិយោបល់របស់អ្នកត្រូវបានកត់ត្រាទុកដោយជោគជ័យ។' : 'Your message has been received.'}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', job: 'garment', message: '' }); }}
                  className="mt-4 text-xs font-semibold text-emerald-700 underline"
                >
                  {lang === 'km' ? 'ផ្ញើសារថ្មីមួយទៀត' : 'Send another note'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'km' ? 'ឈ្មោះរបស់អ្នក *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'km' ? 'ឧ. សុខា' : 'e.g. Sokha'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'km' ? 'លេខទូរស័ព្ទ / Telegram' : 'Phone / Telegram'}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="012 xxx xxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'km' ? 'មុខរបរ ឬអង្គភាព' : 'Role / Organization'}
                  </label>
                  <select
                    value={formData.job}
                    onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="garment">{lang === 'km' ? 'កម្មកររោងចក្រកាត់ដេរ' : 'Garment Worker'}</option>
                    <option value="transport">{lang === 'km' ? 'អ្នករត់កង់បី / PassApp / ម៉ូតូ' : 'Tuk-Tuk / PassApp Driver'}</option>
                    <option value="street-vendor">{lang === 'km' ? 'អ្នកលក់ដូរតាមចិញ្ចើមផ្លូវ' : 'Street Food Vendor'}</option>
                    <option value="ngo">{lang === 'km' ? 'អង្គការសង្គមស៊ីវិល / OSH' : 'NGO / Health Advocate'}</option>
                    <option value="other">{lang === 'km' ? 'ផ្សេងៗ' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'km' ? 'សារ ឬសំណូមពរ *' : 'Message or Feedback *'}
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'km' ? 'សរសេរសាររបស់អ្នកនៅទីនេះ...' : 'Share your thought or inquiry...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'km' ? 'ផ្ញើសារឥឡូវនេះ' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
