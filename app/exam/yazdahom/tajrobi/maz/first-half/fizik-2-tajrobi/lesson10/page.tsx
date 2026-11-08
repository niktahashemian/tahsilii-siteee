"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const RandomCapacitorQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس دهم (خازن) ====================
  const questions = [
    // ---------- سوال ۱۳۲ ----------
    {
      id: 134,
      text: "ظرفیت خازن مسطحی ۳۰ µF و بار الکتریکی آن ۱۵ µC است. فاصله صفحات خازن از یکدیگر ۲ میلی‌متر است. بزرگی میدان الکتریکی بین دو صفحه خازن چند واحد SI است؟",
      options: ["۱۰۰۰", "۳۰۰", "۲۵۰", "۵۰۰"],
      correctIndex: 2,
      answer: "ابتدا اختلاف پتانسیل خازن را محاسبه می‌کنیم: V = Q/C = 15×10^-6 / 30×10^-6 = 0.5 V. سپس میدان الکتریکی: E = V/d = 0.5 / 2×10^-3 = 250 V/m. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۳۴ ----------
    {
      id: 141,
      text: "ظرفیت خازن مسطحی ۶۰ µF و بار الکتریکی آن ۳۰ µC است و فاصله صفحات آن از یکدیگر ۱ میلی‌متر است. شدت میدان الکتریکی بین دو صفحه خازن چند نیوتون بر کولن است؟",
      options: ["۲۵۰۰", "۰/۰۲", "۵۰۰", "۰/۰۵۵"],
      correctIndex: 1,
      answer: "ابتدا اختلاف پتانسیل: V = Q/C = 30×10^-6 / 60×10^-6 = 0.5 V. سپس میدان: E = V/d = 0.5 / 10^-3 = 500 N/C. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۳۸ ----------
    {
      id: 148,
      text: "صفحه‌های خازنی به شکل دایره و به شعاع ۳ cm و فاصله صفحه‌ها از یکدیگر ۲ mm و دی‌الکتریک به‌کاررفته در بین صفحه‌ها شیشه است. ظرفیت خازن چند نانوفاراد است؟ (ثابت کولن ۹×۱۰⁹ N.m²/C² و ثابت دی‌الکتریک شیشه ۶ است)",
      options: ["۷/۵ × ۱۰⁻²", "۷/۵ × ۱۰⁻³", "۲۴/۳π", "۲۴/۳"],
      correctIndex: 0,
      answer: "با استفاده از رابطه C = kε₀A/d و توجه به اینکه ε₀ = 1/(4πk) = 1/(4π×9×10⁹): C = 6 × (1/(4π×9×10⁹)) × (π×(0.03)²) / (2×10^-3). با محاسبه: C ≈ 7.5×10^-11 F = 7.5×10^-2 nF. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۴۲ ----------
    {
      id: 142,
      text: "بین دو صفحه خازن مسطحی هوا است و دو سر آن به یک اختلاف پتانسیل ثابتی وصل است. اگر با ثابت ماندن فاصله بین صفحات یک تیغه شیشه‌ای بین صفحات قرار دهیم، بار الکتریکی خازن چگونه تغییر می‌کند؟",
      options: ["ثابت می‌ماند", "افزایش می‌یابد", "کاهش می‌یابد", "بسته به ضخامت شیشه ممکن است افزایش یا کاهش یابد"],
      correctIndex: 1,
      answer: "چون خازن به منبع با ولتاژ ثابت متصل است، با وارد کردن دی‌الکتریک (شیشه)، ظرفیت خازن افزایش می‌یابد (C = kε₀A/d). طبق رابطه Q = CV با ثابت بودن V، بار الکتریکی افزایش می‌یابد. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۴۳ ----------
    {
      id: 143,
      text: "خازنی را با اختلاف پتانسیل ۱۰ V پر می‌کنیم؛ بار الکتریکی Q₁ در آن ذخیره می‌شود. سپس آن را به اختلاف پتانسیل ۴۰ V وصل می‌کنیم. بار الکتریکی هر صفحه به مقدار ΔQ تغییر می‌کند. نسبت ΔQ/Q₁ کدام است؟",
      options: ["۱/۲", "۱/۳", "۳", "۴"],
      correctIndex: 2,
      answer: "چون ظرفیت خازن ثابت است، بار با ولتاژ متناسب است: Q₂/Q₁ = V₂/V₁ = 40/10 = 4. بنابراین Q₂ = 4Q₁ و ΔQ = Q₂ - Q₁ = 3Q₁. پس ΔQ/Q₁ = 3. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۵۰ ----------
    {
      id: 150,
      text: "اگر در شکل زیر، باتری را با یک باتری ۹ ولتی عوض کنیم، بار روی صفحات خازن ۳۰ µC افزایش می‌یابد. بار اولیه خازن چند میکروکولن بوده است؟ (ولتاژ اولیه باتری ۳ ولت است)",
      image: "/img/q150.png",
      imageAlt: "مدار خازن با باتری",
      options: ["۱۵", "۲۰", "۳۰", "۴۵"],
      correctIndex: 0,
      answer: "ظرفیت خازن ثابت است: C = Q₁/V₁ = Q₂/V₂. با تغییر ولتاژ از ۳ به ۹: Q₂/Q₁ = 9/3 = 3. بنابراین Q₂ = 3Q₁. از طرفی Q₂ - Q₁ = 30 µC → 2Q₁ = 30 → Q₁ = 15 µC. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۵۷ ----------
    {
      id: 157,
      text: "اگر بار ذخیره شده روی صفحات خازنی q، فاصله صفحات آن از هم d و مساحت مشترک صفحات آن A باشد و فاصله بین صفحات آن با هوا پر شده باشد، کدام گزینه می‌تواند نشان‌دهنده میدان الکتریکی بین صفحات این خازن باشد؟",
      options: ["Ad/ (ε₀A)", "ε₀A / q", "A/ (dq)", "ε₀Ad / q"],
      correctIndex: 3,
      answer: "میدان الکتریکی بین صفحات خازن از رابطه E = V/d به دست می‌آید. با جایگذاری V = Q/C و C = ε₀A/d: E = Q/(ε₀A). گزینه 4 صحیح است."
    },

    // ---------- سوال ۱۶۴ ----------
    {
      id: 164,
      text: "فاصله بین صفحه‌های خازنی که دی‌الکتریک آن هوا است، ۲ میکرون و مساحت صفحه‌های آن ۴۰۰ cm² است. اگر این خازن را به اختلاف پتانسیل ۵۰ V وصل کنیم، چند میکروکولن بار الکتریکی در آن ذخیره می‌شود؟ (ε₀ = ۸/۸۵ × ۱۰⁻¹² C²/N.m²)",
      options: ["۱/۷۷", "۵/۳۱", "۷/۰۸", "۸/۸۵"],
      correctIndex: 3,
      answer: "ظرفیت خازن: C = ε₀A/d = 8.85×10^-12 × 400×10^-4 / 2×10^-6 = 1.77×10^-7 F. سپس بار: Q = CV = 1.77×10^-7 × 50 = 8.85×10^-6 C ≈ 1.77 µC (با محاسبه دقیق‌تر). گزینه 4 صحیح است."
    },

    // ---------- سوال ۱۷۴ ----------
    {
      id: 174,
      text: "صفحه‌های خازن تخت مستطیل‌شکلی با ابعاد ۵۰ cm و ۲۰ cm با فاصله ۱ mm از یکدیگر قرار دارند و از دی‌الکتریک با ثابت ۱۰ به‌طور کامل پر شده است. اگر اختلاف‌پتانسیل ۲۰ ولت به دو صفحه خازن وصل کنیم، بار ذخیره‌شده در خازن چند نانوکولن می‌شود؟ (ε₀ = ۸ × ۱۰⁻¹² C²/N.m²)",
      options: ["۸۰", "۱۶۰", "۴۰", "۱۲۰"],
      correctIndex: 1,
      answer: "مساحت A = 0.5 × 0.2 = 0.1 m². ظرفیت: C = kε₀A/d = 10 × 8×10^-12 × 0.1 / 10^-3 = 8×10^-9 F. بار: Q = CV = 8×10^-9 × 20 = 160×10^-9 C = 160 nC. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۹۱ ----------
    {
      id: 191,
      text: "خازن مسطح پر شده‌ای را از منبع پتانسیل جدا می‌کنیم. اگر فاصله بین صفحات خازن را زیاد کنیم، کدام کمیت افزایش می‌یابد؟",
      options: ["اختلاف پتانسیل بین دو صفحه", "ظرفیت خازن", "بار الکتریکی", "شدت میدان الکتریکی بین صفحات"],
      correctIndex: 0,
      answer: "چون خازن از منبع جدا شده، بار الکتریکی Q ثابت می‌ماند. با افزایش فاصله d، ظرفیت C = ε₀A/d کاهش می‌یابد. طبق V = Q/C، با کاهش C و ثابت بودن Q، اختلاف پتانسیل V افزایش می‌یابد. گزینه ۱ صحیح است."
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
        backgroundColor: '#bf360c', color: 'white',
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
              ⚡ آزمون ۱۰ سوال تصادفی - خازن
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
                display: 'inline-block', backgroundColor: '#bf360c',
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
                      border: isSelected ? '3px solid #bf360c' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fbe9e7' : '#fff',
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
                      backgroundColor: isSelected ? '#bf360c' : '#fff',
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
                  backgroundColor: canCalculate ? '#bf360c' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#bf360c' }}>
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
            marginTop: '30px', borderTop: '4px solid #bf360c',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #bf360c',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#bf360c'
            }}>
              📝 پاسخنامه تشریحی خازن
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
                      fontWeight: 'bold', color: '#bf360c',
                      backgroundColor: '#fbe9e7', padding: '5px 15px',
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
                    <span style={{ fontWeight: 'bold', color: '#bf360c' }}>📖 توضیح: </span>
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

export default RandomCapacitorQuiz;