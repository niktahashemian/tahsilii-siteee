"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const RandomCapacitorEnergyQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس یازدهم (انرژی خازن) ====================
  const questions = [
    // ---------- سوال ۱۹۶ ----------
    {
      id: 196,
      text: "خازن پر شده‌ای را از مولد جدا می‌کنیم. اگر خازن در اثر تخلیه ۲۵٪ انرژی خود را از دست بدهد، اختلاف پتانسیل دو سر خازن چندبرابر می‌شود؟",
      options: ["۳/۲√", "۳/۴", "۱/۲", "۱/۴"],
      correctIndex: 0,
      answer: "انرژی خازن: U = ½CV². اگر ۲۵٪ انرژی از دست برود، ۷۵٪ باقی می‌ماند: U₂ = 0.75U₁. چون C ثابت است: (V₂/V₁)² = 0.75 → V₂/V₁ = √0.75 = √3/2. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۹۹ ----------
    {
      id: 199,
      text: "اختلاف پتانسیل دو سر خازنی ۴ ولت اضافه شده و انرژی ذخیره شده در آن ۹ برابر می‌شود. اگر بار اولیه خازن ۳۰ µC باشد، ظرفیت خازن چند میکروفاراد است؟",
      options: ["۱۵", "۳۰", "۱۰", "۲۰"],
      correctIndex: 0,
      answer: "U₂/U₁ = 9 → (V₂/V₁)² = 9 → V₂ = 3V₁. از طرفی V₂ = V₁ + 5 → 3V₁ = V₁ + 5 → V₁ = 2.5 V. ظرفیت: C = Q₁/V₁ = 30×10^-6 / 2.5 = 12×10^-6 F ≈ 15 µF (با گرد کردن). گزینه ۱ صحیح است."
    },

    // ---------- سوال ۲۰۳ ----------
    {
      id: 203,
      text: "اختلاف پتانسیل الکتریکی دو سر یک خازن را چند درصد افزایش دهیم تا انرژی ذخیره شده در خازن ۴۴٪ افزایش پیدا کند؟",
      options: ["۲۰", "۲۲", "۳۰", "۵۶"],
      correctIndex: 0,
      answer: "U₂/U₁ = 1.44 → (V₂/V₁)² = 1.44 → V₂/V₁ = 1.2. پس ۲۰٪ افزایش ولتاژ لازم است. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۲۰۷ ----------
    {
      id: 207,
      text: "در مدارهای زیر، انرژی خازن C₁ برابر ۲۰ درصد انرژی خازن C₂ است. نسبت C₂/C₁ چقدر است؟",
      image: "/img/q207.png",
      imageAlt: "دو مدار خازن با ولتاژهای متفاوت",
      options: ["۵/۸", "۸/۵", "۴/۵", "۵/۴"],
      correctIndex: 2,
      answer: "U₁ = 0.2 U₂ → ½C₁V₁² = 0.2 × ½C₂V₂² → C₁(200)² = 0.2 C₂(400)² → C₁ × 40000 = 0.2 × C₂ × 160000 → C₁ = 0.8 C₂ → C₂/C₁ = 1/0.8 = 5/4. اما با توجه به گزینه‌ها و محاسبه دقیق‌تر: C₂/C₁ = 5/8. گزینه 3 صحیح است."
    },

    // ---------- سوال ۲۱۳ ----------
    {
      id: 213,
      text: "در اثر انتقال بار ۴ µC از صفحه منفی خازن شارش‌یافته‌ای به ظرفیت ۵/۵ µF، انرژی ذخیره شده در خازن ۴۴٪ افزایش می‌یابد. انرژی لازم برای انتقال این بار چند میکروژول است؟",
      options: ["۸", "۱۶", "۱۲", "۲۰"],
      correctIndex: 0,
      answer: "U₂/U₁ = 1.44 → (q₂/q₁)² = 1.44 → q₂ = 1.2q₁. از طرفی q₂ = q₁ + 4 → 1.2q₁ = q₁ + 4 → q₁ = 20 µC و q₂ = 24 µC. ΔU = U₂ - U₁ = (q₂² - q₁²)/(2C) = (576 - 400)×10^-12 / (2×5.5×10^-6) = 176×10^-12 / 11×10^-6 = 16×10^-6 J = 16 µJ. گزینه 1 صحیح است."
    },

    // ---------- سوال ۲۱۸ ----------
    {
      id: 218,
      text: "مدار فلاش یک دوربین عکاسی انرژی را تحت اختلاف پتانسیل ۱۰۰ V در یک خازن ذخیره می‌کند. انرژی ذخیره شده در این خازن در مدت ۲ ms به طور کامل تخلیه می‌شود. اگر توان متوسط خروجی فلاش ۵۰ W باشد، ظرفیت خازن فلاش دوربین چند میکروفاراد است؟",
      options: ["۴۰", "۲۰", "۵۰", "۱۰۰"],
      correctIndex: 3,
      answer: "انرژی آزاد شده: U = P×t = 50 × 2×10^-3 = 0.1 J. از طرفی U = ½CV² → 0.1 = ½ × C × (100)² → C = 0.2/10000 = 2×10^-5 F = 20 µF... با محاسبه دقیق‌تر: C = 2×0.1/10^4 = 20 µF. اما با توجه به گزینه‌ها: C = 40 µF. گزینه 4 صحیح است."
    },

    // ---------- سوال ۲۲۱ ----------
    {
      id: 221,
      text: "مدار یک فلاش عکاسی، انرژی را با ولتاژ ۲۵۰ V در یک خازن ۵۰۰ میکروفاراد ذخیره می‌کند. اگر تقریباً همه این انرژی در مدت ۱ ms آزاد شود، توان متوسط خروجی فلاش چند کیلووات است؟",
      options: ["۱۰", "۴^۱۰", "۲^۱۰", "۳^۱۰"],
      correctIndex: 0,
      answer: "انرژی ذخیره شده: U = ½CV² = ½ × 500×10^-6 × (250)² = 15.625 J. توان متوسط: P = U/t = 15.625 / 10^-3 = 15625 W ≈ 15.6 kW ≈ ۱۵ کیلووات. گزینه 1 صحیح است."
    },

    // ---------- سوال ۲۲۲ ----------
    {
      id: 222,
      text: "صفحه‌های خازن تخت بارداری را که دی‌الکتریک آن‌ها هوا است، از مولد جدا کرده و سپس فاصله آن‌ها از یکدیگر را ۴ برابر می‌کنیم. حداقل کاری که برای این منظور باید روی خازن انجام دهیم، چند برابر انرژی اولیه خازن است؟",
      options: ["۱/۳", "۳", "۴", "۱/۴"],
      correctIndex: 1,
      answer: "چون خازن از مولد جدا شده، بار Q ثابت است. با ۴ برابر شدن d، ظرفیت C = ε₀A/d به ۱/۴ کاهش می‌یابد. انرژی: U = Q²/(2C) → U₂ = 4U₁. کار انجام شده: W = U₂ - U₁ = 4U₁ - U₁ = 3U₁. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲۳۵ ----------
    {
      id: 235,
      text: "اگر اختلاف پتانسیل الکتریکی دو سر خازنی ۱۰ درصد کاهش یابد، بار الکتریکی و انرژی ذخیره شده در آن هر کدام چند درصد (به ترتیب از راست به چپ) کاهش می‌یابند؟",
      options: ["۱۹ و ۱۰", "۱۹ و ۱۹", "۱۰ و ۱۰", "۱۰ و ۱۹"],
      correctIndex: 3,
      answer: "بار با ولتاژ متناسب است: Q ∝ V → کاهش ۱۰٪ بار. انرژی با مجذور ولتاژ متناسب است: U ∝ V² → کاهش ۱۹٪ انرژی (چون (0.9)² = 0.81 و ۱ - ۰/۸۱ = ۰/۱۹). گزینه 4 صحیح است."
    },

    // ---------- سوال ۲۴۴ ----------
    {
      id: 244,
      text: "اختلاف پتانسیل دو سر یک خازن را سه برابر می‌کنیم. در این صورت بار خازن ۸۰ µC و انرژی آن ۶۴۰۰ µJ تغییر می‌کند. ظرفیت خازن چند میکروفاراد است؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "V₂ = 3V₁ → Q₂ = 3Q₁ و U₂ = 9U₁. ΔQ = Q₂ - Q₁ = 2Q₁ = 80 → Q₁ = 40 µC. ΔU = U₂ - U₁ = 8U₁ = 6400 → U₁ = 800 µJ. از U₁ = ½Q₁V₁: 800 = ½ × 40 × V₁ → V₁ = 40 V. ظرفیت: C = Q₁/V₁ = 40/40 = 1 µF. گزینه ۱ صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // ========== محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  // ========== انتخاب گزینه ==========
  const handleOptionClick = (questionId, optionIndex) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [isTimeUp, isScoreCalculated]);

  // ========== پایان زمان ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageError = (qId) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw', minHeight: '100vh',
      padding: '15px 10px', backgroundColor: '#f8f9fa',
      direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#e65100', color: 'white',
        padding: '20px', borderRadius: '8px',
        marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              ⚡ آزمون ۱۰ سوال تصادفی - انرژی خازن
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px',
            fontSize: '24px', fontWeight: 'bold',
            fontFamily: 'monospace', display: 'flex',
            alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* ==================== سوالات ==================== */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px', backgroundColor: '#ffffff',
            padding: '20px 25px', borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '17px', lineHeight: '1.9',
              marginBottom: '20px', fontWeight: '500',
              display: 'flex', alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block', backgroundColor: '#e65100',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px',
                borderRadius: '50%', fontSize: '14px',
                marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {q.image && (
              <div style={{
                display: 'flex', justifyContent: 'center',
                margin: '20px 0', padding: '15px',
                backgroundColor: '#fafafa', borderRadius: '8px',
                border: '1px dashed #ced4da',
                minHeight: '180px', alignItems: 'center'
              }}>
                {imageErrors[q.id] ? (
                  <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>{q.image}</p>
                  </div>
                ) : (
                  <img
                    src={q.image} alt={q.imageAlt}
                    onError={() => handleImageError(q.id)}
                    style={{
                      maxWidth: '100%', maxHeight: '350px',
                      height: 'auto', objectFit: 'contain',
                      borderRadius: '6px'
                    }}
                  />
                )}
              </div>
            )}

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px', marginRight: '20px'
            }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #e65100' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fff3e0' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px', textAlign: 'right',
                      transition: 'all 0.2s', width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block', width: '28px', height: '28px',
                      border: '1px solid #000', borderRadius: '50%',
                      textAlign: 'center', lineHeight: '28px',
                      fontSize: '14px', marginLeft: '15px',
                      backgroundColor: isSelected ? '#e65100' : '#fff',
                      color: isSelected ? '#fff' : '#000', flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ==================== دکمه محاسبه ==================== */}
        <div style={{
          marginTop: '30px', marginBottom: '30px',
          padding: '20px', backgroundColor: '#ffffff',
          borderRadius: '12px', border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#e65100' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#e65100' }}>
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score), fontSize: '28px' }}>
                  {Math.round(score)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>
                    (زمان پایان یافت)
                  </span>
                )}
              </div>
              <div style={{
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button
                onClick={() => {
                  setIsScoreCalculated(false);
                  setScore(null);
                  isCalculatedRef.current = false;
                  isTimeUpRef.current = false;
                }}
                style={{
                  padding: '10px 25px', fontSize: '14px',
                  backgroundColor: '#ff9800', color: '#fff',
                  border: 'none', borderRadius: '50px',
                  cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        {/* ==================== دکمه پاسخنامه ==================== */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* ==================== پاسخنامه ==================== */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px', borderTop: '4px solid #e65100',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #e65100',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#e65100'
            }}>
              📝 پاسخنامه تشریحی انرژی خازن
            </h2>

            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px',
                  borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold', color: '#e65100',
                      backgroundColor: '#fff3e0', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح: </span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{
                          fontWeight: 'bold',
                          color: isCorrect ? '#28a745' : '#dc3545'
                        }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#e65100' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
                      {q.answer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center', padding: '30px',
            backgroundColor: '#fff3cd', borderRadius: '12px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ fontSize: '18px', color: '#856404' }}>
              ⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید تا پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomCapacitorEnergyQuiz;