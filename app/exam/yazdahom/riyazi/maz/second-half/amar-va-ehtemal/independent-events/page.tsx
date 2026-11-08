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

const IndependentDependentEventsQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: 'دو پیشامد A و B مستقل‌اند اگر و تنها اگر:',
        options: [
          'P(A ∩ B) = P(A) + P(B)',
          'P(A ∩ B) = P(A) · P(B)',
          'P(A ∪ B) = P(A) · P(B)',
          'P(A | B) = P(B)',
        ],
        correctIndex: 1,
        answer:
          'تعریف استقلال: P(A ∩ B) = P(A) · P(B). این معادل P(A|B) = P(A) است (وقتی P(B) > 0). گزینه ۱ فرمول جمع برای پیشامدهای ناسازگار است، نه استقلال.',
      },
      {
        id: 2,
        text: 'اگر P(A) = 0.5، P(B) = 0.4 و P(A ∩ B) = 0.2 باشد، آیا A و B مستقل‌اند؟',
        options: [
          'بله، چون P(A ∩ B) = P(A) · P(B)',
          'خیر، چون P(A ∩ B) ≠ P(A) · P(B)',
          'بله، چون ناسازگارند',
          'قابل تعیین نیست',
        ],
        correctIndex: 0,
        answer:
          'P(A) · P(B) = 0.5 × 0.4 = 0.2 که برابر با P(A ∩ B) است. پس دو پیشامد مستقل‌اند.',
      },
      {
        id: 3,
        text: 'اگر P(A) = 0.6، P(B) = 0.5 و P(A ∩ B) = 0.3 باشد، حاصل P(A | B) کدام است؟',
        options: ['0.5', '0.6', '0.3', '0.8'],
        correctIndex: 1,
        answer:
          'P(A | B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.6. توجه کنید که P(A|B) = P(A) است، یعنی وقوع B تأثیری بر احتمال A ندارد و این دو پیشامد مستقل‌اند [citation:1][citation:10].',
      },
      {
        id: 4,
        text: 'در پرتاب یک تاس سالم، A = «عدد زوج» و B = «عدد بزرگ‌تر از ۳». آیا A و B مستقل‌اند؟',
        options: [
          'بله، چون P(A ∩ B) = P(A) · P(B)',
          'خیر، چون P(A ∩ B) ≠ P(A) · P(B)',
          'بله، چون ناسازگارند',
          'قابل تعیین نیست',
        ],
        correctIndex: 1,
        answer:
          'A = {2,4,6} → P(A) = 1/2، B = {4,5,6} → P(B) = 1/2، A ∩ B = {4,6} → P(A ∩ B) = 1/3. اما P(A) · P(B) = 1/4. چون 1/3 ≠ 1/4، مستقل نیستند.',
      },
      {
        id: 5,
        text: 'دو سکه سالم را هم‌زمان پرتاب می‌کنیم. اگر بدانیم حداقل یک سکه شیر آمده است، احتمال این‌که هر دو شیر باشند چقدر است؟',
        options: ['1/4', '1/3', '1/2', '2/3'],
        correctIndex: 1,
        answer:
          'فضای نمونه {شش، شخ، خش، خخ}. B = حداقل یک شیر = {شش، شخ، خش} با احتمال 3/4. A ∩ B = {شش} با احتمال 1/4. پس P(A|B) = (1/4)/(3/4) = 1/3 [citation:1].',
      },
      {
        id: 6,
        text: 'در یک ظرف ۳ مهره سفید و ۲ مهره سیاه وجود دارد. دو مهره به‌ترتیب و بدون جایگذاری خارج می‌کنیم. اگر مهره اول سفید باشد، احتمال این‌که مهره دوم سیاه باشد چقدر است؟',
        options: ['2/5', '1/2', '1/4', '3/5'],
        correctIndex: 1,
        answer:
          'پس از خارج کردن یک مهره سفید، ۴ مهره باقی می‌ماند که ۲ تای آن سیاه است. پس احتمال شرطی = 2/4 = 1/2. این نمونه‌ای از انتخاب بدون جایگذاری است که پیشامدها وابسته‌اند.',
      },
      {
        id: 7,
        text: 'دو پیشامد A و B مستقل هستند و P(A) = 0.5، P(B) = 0.4. حاصل P(A ∪ B) کدام است؟',
        options: ['0.9', '0.7', '0.2', '0.8'],
        correctIndex: 1,
        answer:
          'P(A ∩ B) = 0.5 × 0.4 = 0.2. سپس P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 0.5 + 0.4 − 0.2 = 0.7.',
      },
      {
        id: 8,
        text: 'در یک کارخانه، ۶۰٪ محصولات توسط ماشین A و ۴۰٪ توسط ماشین B تولید می‌شوند. ۲٪ از محصولات ماشین A و ۵٪ از محصولات ماشین B معیوب‌اند. اگر محصولی به تصادف انتخاب شود، احتمال معیوب بودن آن چقدر است؟',
        options: ['0.032', '0.035', '0.07', '0.12'],
        correctIndex: 0,
        answer:
          'طبق قانون احتمال کل: P(معیوب) = P(A)·P(معیوب|A) + P(B)·P(معیوب|B) = 0.6 × 0.02 + 0.4 × 0.05 = 0.012 + 0.020 = 0.032 [citation:7].',
      },
      {
        id: 9,
        text: 'در شرایط سؤال قبل، اگر محصولی معیوب باشد، احتمال این‌که توسط ماشین A تولید شده باشد چقدر است؟',
        options: ['0.375', '0.6', '0.012', '0.32'],
        correctIndex: 0,
        answer:
          'طبق قانون بیز: P(A|معیوب) = P(A)·P(معیوب|A) / P(معیوب) = (0.6 × 0.02) / 0.032 = 0.012 / 0.032 = 0.375 [citation:7].',
      },
      {
        id: 10,
        text: 'دو پیشامد A و B مستقل هستند. اگر P(A) = 0.3 و P(B) = 0.6 باشد، P(Aᶜ ∩ Bᶜ) کدام است؟',
        options: ['0.28', '0.72', '0.18', '0.82'],
        correctIndex: 0,
        answer:
          'P(Aᶜ ∩ Bᶜ) = P((A ∪ B)ᶜ) = 1 − P(A ∪ B). چون مستقل‌اند: P(A ∩ B) = 0.3 × 0.6 = 0.18 و P(A ∪ B) = 0.3 + 0.6 − 0.18 = 0.72. پس پاسخ = 1 − 0.72 = 0.28.',
      },
      {
        id: 11,
        text: 'کدام رابطه درباره پیشامدهای مستقل نادرست است؟',
        options: [
          'P(A ∩ B) = P(A) · P(B)',
          'P(A | B) = P(A)',
          'P(A ∪ B) = P(A) + P(B)',
          "P(A' ∩ B') = P(A') · P(B')",
        ],
        correctIndex: 2,
        answer:
          'P(A ∪ B) = P(A) + P(B) فقط برای پیشامدهای ناسازگار برقرار است، نه مستقل. رابطه صحیح کلی: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
      },
      {
        id: 12,
        text: 'یک تاس را دو بار پرتاب می‌کنیم. اگر بدانیم مجموع دو عدد ۸ شده است، احتمال این‌که عدد تاس اول ۳ باشد چقدر است؟',
        options: ['1/6', '1/5', '1/4', '1/3'],
        correctIndex: 1,
        answer:
          'زوج‌های با مجموع ۸: (2,6), (3,5), (4,4), (5,3), (6,2) → ۵ حالت. تنها حالتی که تاس اول ۳ است: (3,5) → ۱ حالت. پس احتمال شرطی = 1/5.',
      },
      {
        id: 13,
        text: 'سه پیشامد A، B و C مستقل‌اند. اگر P(A) = 0.2، P(B) = 0.5 و P(C) = 0.4 باشد، احتمال این‌که هر سه رخ دهند کدام است؟',
        options: ['0.04', '0.1', '0.4', '0.02'],
        correctIndex: 0,
        answer:
          'برای استقلال سه پیشامد: P(A ∩ B ∩ C) = P(A) · P(B) · P(C) = 0.2 × 0.5 × 0.4 = 0.04.',
      },
      {
        id: 14,
        text: 'دو لامپ به‌طور مستقل کار می‌کنند. احتمال سوختن لامپ اول 0.1 و لامپ دوم 0.2 است. احتمال این‌که حداقل یکی سالم بماند کدام است؟',
        options: ['0.98', '0.72', '0.28', '0.02'],
        correctIndex: 0,
        answer:
          'احتمال سوختن هر دو = 0.1 × 0.2 = 0.02 (چون مستقل‌اند). احتمال این‌که حداقل یکی سالم بماند = 1 − 0.02 = 0.98.',
      },
      {
        id: 15,
        text: 'در یک کلاس ۶۰٪ دانش‌آموزان ریاضی را دوست دارند، ۵۰٪ فیزیک را دوست دارند و ۳۰٪ هر دو را دوست دارند. اگر بدانیم دانش‌آموزی ریاضی را دوست دارد، احتمال این‌که فیزیک را هم دوست داشته باشد چقدر است؟',
        options: ['0.3', '0.5', '0.6', '0.8'],
        correctIndex: 1,
        answer:
          'P(فیزیک|ریاضی) = P(ریاضی ∩ فیزیک) / P(ریاضی) = 0.3 / 0.6 = 0.5.',
      },
    ],
    []
  );

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
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
            <h1 style={{ margin: 0, fontSize: '24px' }}>📊 درس ۲-۴: پیشامدهای مستقل و وابسته</h1>
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
              📝 پاسخنامه تشریحی درس ۲-۴
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

export default IndependentDependentEventsQuiz;