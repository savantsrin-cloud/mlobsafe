import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Share2, 
  Check, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import { translations } from '../data/translations';

export default function HeatQuiz({ lang }) {
  const t = translations[lang].quiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentQ = quizQuestions[currentIndex];

  const handleSelect = (idx) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      // Trigger festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
    setCopiedLink(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'km' ? 'តេស្តចំណេះដឹង' : 'Knowledge Check'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            {t.sub}
          </p>
        </div>

        {!isFinished && (
          <div className="text-xs font-bold bg-slate-100 px-3.5 py-1.5 rounded-full text-slate-700 self-start sm:self-auto border border-slate-200">
            {t.questionCount} {currentIndex + 1} {t.of} {quizQuestions.length}
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="mt-6 max-w-3xl">
          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
            {currentIndex + 1}. {lang === 'km' ? currentQ.questionKm : currentQ.questionEn}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {(lang === 'km' ? currentQ.optionsKm : currentQ.optionsEn).map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswer;
              
              let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-orange-50/50 hover:border-orange-300";
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-medium";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-50 border-red-500 text-red-950";
                } else {
                  btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-xs uppercase w-6 h-6 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed">{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Answered */}
          {hasAnswered && (
            <div className="mt-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200 animate-fadeIn">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{lang === 'km' ? 'ការពន្យល់លម្អិត៖' : 'Explanation:'}</span>
              </h4>
              <p className="text-sm text-amber-950 leading-relaxed">
                {lang === 'km' ? currentQ.explanationKm : currentQ.explanationEn}
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <span>{currentIndex < quizQuestions.length - 1 ? t.nextBtn : t.finishBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished View / Certificate Card */
        <div className="mt-6 text-center max-w-xl mx-auto py-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner mb-4">
            <Award className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {lang === 'km' ? 'ជើងឯកសុវត្ថិភាពកម្ដៅ' : 'Heat Safety Champion'}
          </span>

          <h3 className="text-3xl font-black text-slate-900 mt-4 mb-2">
            {score === 5 ? t.scorePerfect : score >= 3 ? t.scoreGood : t.scoreLow}
          </h3>

          <p className="text-base text-slate-600 mb-6">
            {lang === 'km' 
              ? `អ្នកឆ្លើយត្រូវ ${score} ក្នុងចំណោម ${quizQuestions.length} សំណួរ!`
              : `You scored ${score} out of ${quizQuestions.length} questions correctly!`}
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left mb-6 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'km' ? 'ចងចាំ ៣ ចំណុចសំខាន់៖' : 'Remember 3 Key Takeaways:'}</span>
            </div>
            <p>1. {lang === 'km' ? 'ផឹកទឹកស្អាត ១ កែវរៀងរាល់ ១ ម៉ោងមុនពេលស្រេក' : 'Drink 1 cup of clean water every hour before feeling thirsty.'}</p>
            <p>2. {lang === 'km' ? 'ជៀសវាងភេសជ្ជៈប៉ូវកម្លាំងផ្អែមខ្លាំងក្នុងអាកាសធាតុក្តៅ' : 'Avoid high-sugar energy drinks in extreme heat.'}</p>
            <p>3. {lang === 'km' ? 'ស្បែកស្ងួតក្តៅគ្មានញើស + សន្លប់ = ហៅឡានពេទ្យ ១១៩ ភ្លាម' : 'Hot dry skin with no sweat + fainting = Call 119 immediately.'}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-5 py-2.5 rounded-xl border border-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>{t.retakeBtn}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? t.copyLinkSuccess : t.shareBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
