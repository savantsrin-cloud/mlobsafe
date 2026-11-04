import React, { useState, useEffect } from 'react';
import { Droplets, Bell, Play, Pause, RotateCcw, CheckCircle2, Shield, Info, Volume2 } from 'lucide-react';
import { translations } from '../data/translations';
import { playChimeSound } from '../utils/audio';

export default function WaterReminder({ lang, waterCups, setWaterCups }) {
  const t = translations[lang].waterTracker;
  
  // Timer state in seconds (default 60 mins = 3600 seconds)
  const DEFAULT_TIME = 60 * 60;
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Trigger alarm
      playChimeSound();
      setShowNotification(true);
      setTimeLeft(DEFAULT_TIME); // reset to next cycle
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, DEFAULT_TIME]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handleTestChime = () => {
    playChimeSound();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleLogCup = () => {
    if (waterCups < 12) {
      setWaterCups(waterCups + 1);
      playChimeSound();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-sky-100 relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-100 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Alert toast when timer triggers */}
      {showNotification && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500 text-white flex items-center justify-between gap-3 shadow-lg animate-bounce">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 animate-spin flex-shrink-0" />
            <span className="font-bold text-sm sm:text-base">{t.chimeAlert}</span>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-xs bg-white text-amber-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-100"
          >
            OK
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-3">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span>{lang === 'km' ? 'ការពារការខ្សោះជាតិទឹក' : 'Hydration Protocol'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            {t.sub}
          </p>
        </div>

        {/* Quick test chime button */}
        <button
          onClick={handleTestChime}
          className="inline-flex items-center gap-2 self-start lg:self-auto text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl border border-sky-200 transition-colors"
          title="Test sound notification"
        >
          <Volume2 className="w-4 h-4 text-sky-600" />
          <span>{lang === 'km' ? 'សាកល្បងសំឡេងរោទិ៍' : 'Test Reminder Chime'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Left Side: Countdown Timer */}
        <div className="bg-sky-50/60 rounded-2xl p-6 border border-sky-100 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              {t.nextReminderIn}
            </span>
            <div className="text-5xl sm:text-6xl font-black text-sky-950 font-mono tracking-tight my-4">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-slate-500">
              {isRunning 
                ? (lang === 'km' ? 'កំពុងដំណើរការ... នឹងរោទិ៍រៀងរាល់ ១ ម៉ោង' : 'Active countdown. Chimes every 60 minutes.')
                : (lang === 'km' ? 'បានផ្អាក។ ចុច «ចាប់ផ្ដើម» ដើម្បីបើកការរំលឹក' : 'Paused. Click Start to begin tracking.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-6">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Play className="w-4 h-4" />
                <span>{t.startTimer}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Pause className="w-4 h-4" />
                <span>{t.pauseTimer}</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(DEFAULT_TIME);
              }}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>{t.resetTimer}</span>
            </button>

            {/* 10s Demo trigger for quick review */}
            <button
              onClick={() => {
                setTimeLeft(5);
                setIsRunning(true);
              }}
              className="text-[11px] text-sky-700 hover:underline px-2 py-1"
              title="Set to 5 seconds to test automatic alarm trigger"
            >
              {lang === 'km' ? 'កំណត់ ៥វិនាទី (តេស្ត)' : '5s Quick Test'}
            </button>
          </div>
        </div>

        {/* Right Side: Daily 8-Cup Water Log */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.cupsLogged}
              </span>
              <span className="text-base font-extrabold text-sky-700">
                {waterCups} / 8 {lang === 'km' ? 'កែវ' : 'Cups'}
              </span>
            </div>

            {/* Visual Glasses Display (Up to 8 standard) */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 my-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-16 rounded-xl flex flex-col items-center justify-center border transition-all ${
                    i < waterCups
                      ? 'bg-sky-500 border-sky-600 text-white shadow-sm scale-105'
                      : 'bg-white border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  <Droplets className={`w-5 h-5 ${i < waterCups ? 'text-white' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-bold mt-1">#{i + 1}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              {t.targetText}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleLogCup}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <span>{t.logCup}</span>
            </button>
            {waterCups > 0 && (
              <button
                onClick={() => setWaterCups(0)}
                className="text-xs text-slate-500 hover:text-slate-700 underline px-2 py-1"
              >
                {t.resetCups}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Helpful Public Health Guidance Tip */}
      <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-950">
          <strong className="font-bold text-amber-900">{t.tipTitle} </strong>
          <span>{t.tipBody}</span>
        </div>
      </div>
    </div>
  );
}
