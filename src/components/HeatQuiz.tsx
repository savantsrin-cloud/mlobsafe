"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { quizQuestions } from "@/data/heatStressTranslations";
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Share2, 
  Award, 
  ChevronRight,
  Check
} from "lucide-react";

export default function HeatQuiz() {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentQ = quizQuestions[currentIndex];
  const totalQ = quizQuestions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setCopied(false);
  };

  const handleShare = () => {
    const text = language === "km"
      ? `ខ្ញុំបានពិន្ទុ ${score}/${totalQ} លើតេស្តសុវត្ថិភាពកម្ដៅ (Shade Safety Quiz)! សាកល្បងទាំងអស់គ្នាដើម្បីការពារសុខភាព៖ http://localhost:9090`
      : `I scored ${score}/${totalQ} on the Shade Safety Quiz! Test your knowledge and stay safe this hot season: http://localhost:9090`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-cream-300">
      
      <div className="pb-6 border-b border-cream-200">
        <div className="flex items-center space-x-2 text-heat-600 font-bold text-xs uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>{language === "km" ? "តេស្តចំណេះដឹងរហ័ស" : "Knowledge Check"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {t.tools.quizTitle}
        </h2>
        <p className="text-base text-gray-700 mt-2 max-w-2xl font-medium">
          {t.tools.quizSub}
        </p>
      </div>

      {!isCompleted ? (
        <div className="mt-6">
          
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-500 mb-3">
            <span>
              {t.quizTool.questionCount} {currentIndex + 1} {t.quizTool.of} {totalQ}
            </span>
            <span className="text-heat-600">
              {language === "km" ? `ពិន្ទុបច្ចុប្បន្ន៖ ${score}` : `Score: ${score}`}
            </span>
          </div>

          <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-heat-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-5">
            {language === "km" ? currentQ.questionKm : currentQ.questionEn}
          </h3>

          <div className="space-y-3">
            {(language === "km" ? currentQ.optionsKm : currentQ.optionsEn).map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = "bg-cream-50 hover:bg-cream-100 border-cream-300 text-gray-800";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-safety-100 border-safety-500 text-safety-900 font-bold";
                } else if (isSelected) {
                  btnStyle = "bg-danger-100 border-danger-500 text-danger-900 font-bold";
                } else {
                  btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isAnswered && (
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-safety-600" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-danger-600" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 rounded-2xl bg-cream-100 border border-cream-300 animate-fadeIn">
              <div className="flex items-start gap-3">
                {selectedOption === currentQ.correctIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-safety-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-sm sm:text-base text-gray-800">
                  <div className="font-bold mb-1">
                    {selectedOption === currentQ.correctIndex ? t.quizTool.correct : t.quizTool.incorrect}
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {language === "km" ? currentQ.explanationKm : currentQ.explanationEn}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 bg-heat-600 hover:bg-heat-700 text-white font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl shadow-md transition"
                >
                  <span>{currentIndex + 1 === totalQ ? (language === "km" ? "មើលលទ្ធផល" : "See Results") : t.quizTool.nextBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="mt-8 text-center py-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-heat-500 to-amber-400 text-white flex items-center justify-center shadow-lg mb-4">
            <Award className="w-10 h-10" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            {t.quizTool.scoreTitle}
          </h3>

          <div className="text-lg font-bold text-gray-700 mb-3">
            {t.quizTool.scoreDesc} <span className="text-heat-600 font-black text-2xl">{score}</span> / {totalQ}
          </div>

          <p className="text-sm text-gray-600 max-w-md mx-auto mb-8">
            {score === 5
              ? t.quizTool.perfectScore
              : score >= 3
              ? t.quizTool.goodScore
              : t.quizTool.tryAgain}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 bg-cream-100 hover:bg-cream-200 text-gray-800 font-bold px-5 py-3 rounded-2xl text-sm border border-cream-300 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.quizTool.retakeBtn}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-heat-600 hover:bg-heat-700 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? (language === "km" ? "បានចម្លងរួចរាល់!" : "Copied to Clipboard!") : (language === "km" ? "ចែករំលែកលទ្ធផល" : "Share Result")}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
