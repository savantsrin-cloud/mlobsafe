"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Droplets, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CupSoda, 
  CheckCircle2, 
  Sun, 
  Volume2
} from "lucide-react";

export default function WaterReminder() {
  const { language, t } = useLanguage();

  const [selectedMinutes, setSelectedMinutes] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [alarmTriggered, setAlarmTriggered] = useState<boolean>(false);

  const [cupsCount, setCupsCount] = useState<number>(3);
  const totalCups = 8;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("heatguard_cups");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 12) {
        setCupsCount(parsed);
      }
    }
  }, []);

  const handleCupToggle = (index: number) => {
    let nextCount: number;
    if (index + 1 === cupsCount) {
      nextCount = index;
    } else {
      nextCount = index + 1;
    }
    setCupsCount(nextCount);
    localStorage.setItem("heatguard_cups", nextCount.toString());
  };

  const resetCups = () => {
    setCupsCount(0);
    localStorage.setItem("heatguard_cups", "0");
  };

  const changeInterval = (mins: number) => {
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
    setAlarmTriggered(false);
  };

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // AudioContext not supported or blocked
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setAlarmTriggered(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(selectedMinutes * 60);
      setAlarmTriggered(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
    setAlarmTriggered(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.min(Math.round((cupsCount / totalCups) * 100), 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-cream-300">
      
      <div className="pb-6 border-b border-cream-200">
        <div className="flex items-center space-x-2 text-cooling-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Droplets className="w-4 h-4" />
          <span>{language === "km" ? "ការគ្រប់គ្រងជាតិទឹក" : "Hydration & Rest Management"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {t.tools.waterTrackerTitle}
        </h2>
        <p className="text-base text-gray-700 mt-2 max-w-2xl font-medium">
          {t.tools.waterTrackerSub}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <div className="bg-gradient-to-br from-cooling-50/70 to-cream-50 p-6 rounded-3xl border border-cooling-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cooling-600" />
                <span>{t.waterTool.timerHeading}</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {t.waterTool.timerDesc}
              </p>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition ${
                soundEnabled
                  ? "bg-cooling-100 text-cooling-700 border-cooling-300"
                  : "bg-gray-100 text-gray-400 border-gray-200"
              }`}
              title="Sound alert toggle"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">{t.waterTool.timerInterval}</span>
            {[30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => changeInterval(mins)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedMinutes === mins
                    ? "bg-cooling-600 text-white shadow-sm"
                    : "bg-white text-gray-700 hover:bg-cooling-50 border border-cooling-200"
                }`}
              >
                {mins} {language === "km" ? "នាទី" : "min"}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-inner border border-cooling-100">
            <div className="text-5xl sm:text-6xl font-black text-cooling-700 tracking-wider font-mono">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs font-semibold text-gray-400 mt-2 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-heat-500" />
              <span>
                {language === "km" 
                  ? "រំលឹកចូលម្លប់ និងផឹកទឹកត្រជាក់" 
                  : "Reminder to rest in shade & rehydrate"}
              </span>
            </div>

            {alarmTriggered && (
              <div className="mt-4 p-3 bg-danger-100 text-danger-900 border border-danger-300 rounded-xl text-xs font-bold text-center animate-bounce">
                🔔 {language === "km" ? "ដល់ម៉ោងហើយ! សូមសម្រាកក្នុងម្លប់ ៥ នាទី និងផឹកទឹកមួយកែវ!" : "Time's up! Take a 5-minute shade break and drink a glass of water!"}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={toggleTimer}
              className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                isRunning
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-cooling-600 hover:bg-cooling-700 text-white shadow-cooling-600/20"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>{t.waterTool.pauseTimer}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.waterTool.startTimer}</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="py-3 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-700 font-bold text-sm border border-gray-200 transition flex items-center justify-center"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-cream-50/70 p-6 rounded-3xl border border-cream-300 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <CupSoda className="w-5 h-5 text-cooling-600" />
                <span>{t.waterTool.dailyIntakeHeading}</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {t.waterTool.dailyIntakeDesc}
              </p>
            </div>

            <button
              onClick={resetCups}
              className="text-xs font-semibold text-gray-400 hover:text-danger-600 underline"
            >
              {t.waterTool.resetTracker}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
              <span>{cupsCount} / {totalCups} {t.waterTool.cupsDrank} (~{((cupsCount * 350) / 1000).toFixed(1)}L)</span>
              <span className="text-cooling-700 font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cooling-500 to-cooling-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: totalCups }).map((_, idx) => {
              const isFilled = idx < cupsCount;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCupToggle(idx)}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all transform active:scale-95 ${
                    isFilled
                      ? "bg-cooling-600 text-white border-cooling-700 shadow-md shadow-cooling-600/20"
                      : "bg-white text-gray-400 border-gray-200 hover:border-cooling-300 hover:bg-cooling-50/50"
                  }`}
                  aria-label={`Water cup ${idx + 1}`}
                >
                  <CupSoda className={`w-6 h-6 ${isFilled ? "text-white" : "text-gray-300"}`} />
                  <span className="text-xs font-bold">
                    #{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
              cupsCount >= totalCups
                ? "bg-safety-50 text-safety-900 border border-safety-200"
                : "bg-cooling-50 text-cooling-900 border border-cooling-200"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${cupsCount >= totalCups ? "text-safety-600" : "text-cooling-600"}`} />
            <span>
              {cupsCount >= totalCups ? t.waterTool.greatJob : t.waterTool.keepGoing}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
