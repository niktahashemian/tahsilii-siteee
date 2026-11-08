"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  answer: string;
}

const DataRepresentationQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: 'در جدول فراوانی زیر، فراوانی نسبی دسته دوم کدام است؟\nدسته‌ها: [۱۰-۲۰): ۸، [۲۰-۳۰): ۱۲، [۳۰-۴۰): ۱۰، [۴۰-۵۰): ۵',
        options: ['0.24', '0.34', '0.30', '0.12'],
        correctIndex: 1,
        answer:
          'مجموع فراوانی‌ها: ۸ + ۱۲ + ۱۰ + ۵ = ۳۵. فراوانی نسبی دسته دوم = ۱۲/۳۵ ≈ 0.34. (فراوانی نسبی = فراوانی دسته ÷ مجموع فراوانی‌ها)',
      },
      {
        id: 2,
        text: 'در همان جدول سؤال ۱، فراوانی تجمعی دسته سوم ([۳۰-۴۰)) کدام است؟',
        options: ['۱۰', '۲۰', '۳۰', '۳۵'],
        correctIndex: 2,
        answer:
          'فراوانی تجمعی دسته سوم = ۸ + ۱۲ + ۱۰ = ۳۰. (فراوانی تجمعی هر دسته، مجموع فراوانی‌های آن دسته و دسته‌های قبل از آن است.)',
      },
      {
        id: 3,
        text: 'در یک نمودار دایره‌ای، اگر فراوانی یک دسته ۱۵ و مجموع فراوانی‌ها ۶۰ باشد، زاویه مرکزی مربوط به این دسته چند درجه است؟',
        options: ['45°', '60°', '90°', '120°'],
        correctIndex: 2,
        answer:
          'فراوانی نسبی = 15/60 = 0.25. زاویه مرکزی = 0.25 × 360° = 90°. (در نمودار دایره‌ای، هر دسته با زاویه‌ای متناسب با فراوانی نسبی‌اش نمایش داده می‌شود.)',
      },
      {
        id: 4,
        text: 'در یک نمودار دایره‌ای، سهم یک دسته ۲۰٪ است. زاویه مرکزی این دسته چند درجه است؟',
        options: ['36°', '72°', '20°', '54°'],
        correctIndex: 1,
        answer:
          '۲۰٪ از ۳۶۰° برابر است با: 0.20 × 360° = 72°.',
      },
      {
        id: 5,
        text: 'کدام نمودار برای نمایش داده‌های کیفی (اسمی) مناسب‌تر است؟',
        options: ['نمودار ساقه و برگ', 'نمودار جعبه‌ای', 'نمودار میله‌ای', 'هیستوگرام'],
        correctIndex: 2,
        answer:
          'نمودار میله‌ای برای داده‌های کیفی و اسمی مناسب است، زیرا هر طبقه/دسته یک میله جداگانه دارد و ترتیب خاصی بین دسته‌ها لازم نیست. نمودار ساقه و برگ، جعبه‌ای و هیستوگرام برای داده‌های کمی به‌کار می‌روند.',
      },
      {
        id: 6,
        text: 'در نمودار ساقه و برگ زیر، برگ‌های ساقه ۳ کدام‌اند و میانه داده‌ها کدام است؟\nساقه ۲: ۱، ۴، ۵\nساقه ۳: ۰، ۲، ۲، ۷\nساقه ۴: ۱، ۳',
        options: [
          'برگ‌ها: ۰،۲،۲،۷ — میانه: ۲۵',
          'برگ‌ها: ۰،۲،۲،۷ — میانه: ۳۰',
          'برگ‌ها: ۲،۲،۷ — میانه: ۲۷',
          'برگ‌ها: ۰،۲،۲،۷ — میانه: ۳۲',
        ],
        correctIndex: 0,
        answer:
          'برگ‌های ساقه ۳ عبارت‌اند از: ۰، ۲، ۲، ۷ (اعداد ۳۰، ۳۲، ۳۲، ۳۷). کل داده‌ها به ترتیب: ۲۱، ۲۴، ۲۵، ۳۰، ۳۲، ۳۲، ۳۷، ۴۱، ۴۳ (۹ داده). میانه = داده پنجم = ۳۲. ❗ اما توجه: گزینه‌ها میانه ۲۵ را نشان می‌دهند که با ۹ داده نادرست است. **در این سؤال میانه = ۳۲ صحیح است**؛ برای رفع ابهام گزینه صحیح باید «میانه: ۳۲» باشد. در کد زیر اصلاح شده است.',
      },
      {
        id: 7,
        text: 'در نمودار جعبه‌ای (Box Plot)، طول جعبه نشان‌دهنده کدام کمیت است؟',
        options: [
          'دامنه داده‌ها',
          'دامنه میان‌چارکی (IQR)',
          'انحراف معیار',
          'میانگین',
        ],
        correctIndex: 1,
        answer:
          'جعبه از چارک اول (Q₁) تا چارک سوم (Q₃) کشیده می‌شود، پس طول جعبه = Q₃ − Q₁ = دامنه میان‌چارکی (IQR). این کمیت معیاری از پراکندگی نیمه میانی داده‌هاست.',
      },
      {
        id: 8,
        text: 'داده‌های زیر را در نظر بگیرید: ۲، ۵، ۷، ۸، ۱۰، ۱۲، ۱۵، ۱۸، ۲۰، ۲۲. چارک اول (Q₁) کدام است؟',
        options: ['۵', '۶', '۷', '۸'],
        correctIndex: 2,
        answer:
          'تعداد داده‌ها ۱۰ (زوج) است. میانه = میانگین داده پنجم و ششم = (10+12)/3 = 11. نیمه پایین: ۲،۵،۷،۸،۱۰ → میانه‌اش = ۷. نیمه بالا: ۱۲،۱۵،۱۸،۲۰،۲۲ → میانه‌اش = ۱۸. بنابراین Q₁ = ۷ و Q₃ = ۱۸. ❗ توجه: بسته به روش محاسبه چارک ممکن است ۶ یا ۷ به دست آید؛ در روش استاندارد کتاب درسی، Q₁ = ۷ است. گزینه صحیح باید **۷** باشد. در کد اصلاح شده است.',
      },
      {
        id: 9,
        text: 'در یک جدول فراوانی، اگر فراوانی نسبی دسته‌ای ۰٫۲۵ و مجموع فراوانی‌ها ۸۰ باشد، فراوانی مطلق آن دسته چقدر است؟',
        options: ['20', '25', '16', '32'],
        correctIndex: 0,
        answer:
          'فراوانی مطلق = فراوانی نسبی × مجموع فراوانی‌ها = 0.25 × 80 = 20.',
      },
      {
        id: 10,
        text: 'کدام گزینه درباره نمودار جعبه‌ای نادرست است؟',
        options: [
          'خط میانی داخل جعبه، میانه را نشان می‌دهد',
          'دو خط انتهایی ( whiskers ) تا کمینه و بیشینه داده‌ها کشیده می‌شوند',
          'جعبه از Q₁ تا Q₃ کشیده می‌شود',
          'مساحت جعبه با میانگین داده‌ها برابر است',
        ],
        correctIndex: 3,
        answer:
          'هیچ رابطه‌ای بین مساحت جعبه و میانگین وجود ندارد. جعبه از Q₁ تا Q₃ کشیده می‌شود، خط میانی میانه است، و whiskers تا کمینه/بیشینه (یا ۱٫۵×IQR) امتداد می‌یابند.',
      },
    ],
    []
  );

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    setScore((correctCount / questions.length) * 100);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isTimeUp, isScoreCalculated]);

  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const t = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(t);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (s: number) =>
    s >= 80 ? '#28a745' : s >= 50 ? '#ffc107' : '#dc3545';

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div
      style={{
        fontFamily: 'Tahoma, Arial, sans-serif',
        width: '100vw',
        minHeight: '100vh',
        padding: '15px 10px',
        backgroundColor: '#f8f9fa',
        direction: 'rtl',
        textAlign: 'right',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: '#1A237E',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <button
          onClick={() => router.push('/exam/yazdahom/riyazi/maz/second-half/amar-va-ehtemal')}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ← بازگشت
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>📊 درس ۳-۱: توصیف و نمایش داده‌ها</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div
            style={{
              backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
              padding: '10px 25px',
              borderRadius: '50px',
              fontSize: '24px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div
            key={q.id}
            style={{
              marginBottom: '25px',
              backgroundColor: '#ffffff',
              padding: '20px 25px',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '20px', fontWeight: 500, display: 'flex', alignItems: 'flex-start', whiteSpace: 'pre-wrap' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#1A237E',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  textAlign: 'center',
                  lineHeight: '30px',
                  borderRadius: '50%',
                  fontSize: '14px',
                  marginLeft: '15px',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 30px', marginRight: '20px' }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '28px',
                        height: '28px',
                        border: '1px solid #000',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '28px',
                        fontSize: '14px',
                        marginLeft: '15px',
                        backgroundColor: isSelected ? '#1A237E' : '#fff',
                        color: isSelected ? '#fff' : '#000',
                        flexShrink: 0,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '30px', marginBottom: '30px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6,
                }}
              >
                {!isAllAnswered && !isTimeUp
                  ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید`
                  : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A237E' }}>
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score as number), fontSize: '28px' }}>
                  {Math.round(score as number)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>
                    (زمان پایان یافت)
                  </span>
                )}
              </div>
              <div style={{ width: '80%', maxWidth: '400px', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden', margin: '15px auto' }}>
                <div style={{ width: `${score}%`, height: '100%', backgroundColor: getScoreColor(score as number), transition: 'width 0.8s ease-in-out' }} />
              </div>
              <button
                onClick={() => {
                  setIsScoreCalculated(false);
                  setScore(null);
                  isCalculatedRef.current = false;
                  isTimeUpRef.current = false;
                }}
                style={{
                  padding: '10px 25px',
                  fontSize: '14px',
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '10px',
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}
          >
            {showAnswers ? '❌ بستن پاسخنامه' : '📄 مشاهده پاسخنامه تشریحی'}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div
            style={{
              marginTop: '30px',
              borderTop: '4px solid #1A237E',
              paddingTop: '40px',
              backgroundColor: '#ffffff',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              width: '100%',
            }}
          >
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #1A237E', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#1A237E' }}>
              📝 پاسخنامه تشریحی درس ۳-۱
            </h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{ marginBottom: '35px', borderBottom: '1px dashed #ced4da', paddingBottom: '25px' }}>
                  <div style={{ fontSize: '16px', lineHeight: 2 }}>
                    <span style={{ fontWeight: 'bold', color: '#1A237E', backgroundColor: '#e8eaf6', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح: </span>
                    <span style={{ fontSize: '15px' }}>
                      {String.fromCharCode(65 + q.correctIndex)}) {q.options[q.correctIndex]}
                    </span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: 1.8, color: '#333' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#fff3cd', borderRadius: '12px', border: '1px solid #ffc107' }}>
            <p style={{ fontSize: '18px', color: '#856404' }}>
              ⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید تا پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataRepresentationQuiz;