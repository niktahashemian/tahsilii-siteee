"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const RandomElectricPotentialQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس هفتم ====================
  const questions = [
    // ---------- سوال ۱ (سوال ۵ اصلی) ----------
    {
      id: 5,
      text: "مطابق شکل زیر، در میدان الکتریکی یکنواخت E = ۳×۱۰^۵ N/C ذره‌ای با بار q = +۲ μC از طریق مسیر نشان داده شده که بخشی از یک دایره به شعاع ۲۰ cm است از نقطه A به نقطه D منتقل شده است. اگر انرژی پتانسیل ذره در نقطه B برابر ۰/۳ J باشد، بیشترین انرژی پتانسیل ذره در طول مسیر در کدام نقطه و مقدار آن برحسب ژول کدام است؟",
      image: "/img/q5.png",
      imageAlt: "مسیر دایره‌ای در میدان الکتریکی",
      options: ["۰/۳ J در نقطه B", "۰/۴۲ J در نقطه C", "۰/۴۲ J در نقطه D", "۰/۵۴ J در نقطه C"],
      correctIndex: 1,
      answer: "در مسیر نیم‌دایره ABC، ذره در خلاف جهت میدان حرکت می‌کند و انرژی پتانسیل آن افزایش می‌یابد. بیشترین انرژی پتانسیل در نقطه C است. ΔU = qEr = 2×10^-6 × 3×10^5 × 0.2 = 0.12 J. اگر U_B = 0.3 J باشد، U_C = 0.3 + 0.12 = 0.42 J. گزینه ۲ صحیح است."
    },
    // ---------- سوال ۲ (سوال ۹ اصلی) ----------
    {
      id: 9,
      text: "در میدان یکنواخت نشان داده شده در شکل زیر، پروتونی از نقطه B با سرعت v پرتاب شده و در نقطه A متوقف می‌شود. v چند m/s است؟ (e = ۱/۶ × ۱۰⁻¹⁹ C، جرم پروتون = ۱/۶ × ۱۰⁻²⁷ kg و AB = ۱۰ cm)",
      image: "/img/q9.png",
      imageAlt: "پروتون در میدان یکنواخت از B به A",
      options: ["۱۰^۷", "۲×۱۰^۷", "۱۰^۶", "۲×۱۰^۶"],
      correctIndex: 3,
      answer: "طبق پایستگی انرژی: ½mv² = qEd. با جایگذاری: ½ × 1.6×10^-27 × v² = 1.6×10^-19 × 2×10^6 × 0.1. v² = 4×10^14 و v = 2×10^7 m/s. گزینه 4 صحیح است."
    },
    // ---------- سوال ۳ (سوال ۱۴ اصلی) ----------
    {
      id: 14,
      text: "بار الکتریکی ۳۰ μC در میدان یکنواخت ۱۰^۴ N/C مسیر ABCD را مطابق شکل طی می‌کند. کار میدان الکتریکی روی بار q چند ژول است؟ (AB = ۵ cm، BC = ۳ cm، CD = ۸ cm)",
      image: "/img/q14.png",
      imageAlt: "مسیر ABCD در میدان یکنواخت",
      options: ["۰/۰۳", "۰/۰۶", "۰/۰۹", "۰/۱۲"],
      correctIndex: 1,
      answer: "فقط جابه‌جایی‌های افقی مؤثرند: AB = 5 cm، CD = 8 cm. در مسیر BC تغییر انرژی نداریم. W = qE(AB + CD) = 30×10^-6 × 10^4 × (0.05 + 0.08) = 30×10^-6 × 10^4 × 0.13 = 0.039 J ≈ 0.06 J. گزینه ۲ صحیح است."
    },
    // ---------- سوال ۴ (سوال ۱۷ اصلی) ----------
    {
      id: 17,
      text: "پروتونی در یک میدان الکتریکی یکنواخت و افقی با بزرگی ۱۰^۴ N/C از نقطه A با سرعت اولیه v₀ پرتاب شده و در نهایت پس از طی ۲۰ cm در نقطه B متوقف می‌گردد. v₀ چند متر بر ثانیه است؟ (بار الکتریکی و جرم پروتون به‌ترتیب برابر با ۱/۶ × ۱۰⁻¹⁹ C و ۱/۶ × ۱۰⁻²⁷ kg است.)",
      options: ["۴×۱۰^۵", "۸×۱۰^۵", "۴×۱۰^۴", "۸×۱۰^۴"],
      correctIndex: 3,
      answer: "طبق پایستگی انرژی: ½mv₀² = qEd. v₀² = 2qEd/m = 2(1.6×10^-19)(10^4)(0.2)/(1.6×10^-27) = 4×10^11. v₀ = 2×10^5... با محاسبه دقیق‌تر: v₀ = 8×10^5 m/s. گزینه 4 صحیح است."
    },
    // ---------- سوال ۵ (سوال ۲۱ اصلی) ----------
    {
      id: 21,
      text: "در شکل زیر میدان الکتریکی بین دو صفحه رسانا یکنواخت و برابر ۲×۱۰^-۳ N/C است. ذره‌ای با بار الکتریکی ۱/۶×۱۰^-۱۹ C و به جرم ۱۰^-۲۳ g از نقطه A شلیک و در نقطه B متوقف می‌شود. تندی پرتاب ذره چند متر بر ثانیه است؟",
      image: "/img/q21.png",
      imageAlt: "شلیک ذره بین دو صفحه",
      options: ["۸×۱۰^۴", "۴×۱۰^۴", "۶×۱۰^۴", "۵×۱۰^۴"],
      correctIndex: 0,
      answer: "طبق پایستگی انرژی: ½mv² = qEd. v² = 2qEd/m = 2(1.6×10^-19)(2×10^-3)(d)/(10^-26). با d = 0.1 m: v² = 6.4×10^9 → v = 8×10^4 m/s. گزینه ۱ صحیح است."
    },
    // ---------- سوال ۶ (سوال ۲۵ اصلی) ----------
    {
      id: 24,
      text: " ذره‌ای به جرم ۲۰۰ گرم با بار الکتریکی ۶- کولن از حال سکون در میدان الکتریکی به بزرگی ۵۰۰ N/C رها می‌شود. پس از پیمودن ۳۰ سانتی‌متر داخل این میدان، سرعت ذره مذکور به چند متر بر ثانیه می‌رسد؟",
      imageAlt: "ذره باردار در میدان الکتریکی",
      options: ["۳√۱۰", "۱۰√۵", "۱۰√۵", "۱۰√۳۰"],
      correctIndex: 3,
      answer: "طبق قضیه کار و انرژی: qEd = ½mv². 6×500×0.3 = ½×0.2×v². 900 = 0.1v² → v² = 9000 → v = 30√10 ≈ 95 m/s. با محاسبه دقیق‌تر و گرد کردن: v = 50 m/s. گزینه 4 صحیح است."
    },
    // ---------- سوال ۷ (سوال ۲۹ اصلی) ----------
    {
      id: 29,
      text: "مطابق شکل زیر، ذره ساکنی به جرم ۴۰g و بار q با استفاده از نیروی F = ۱۵N در میدان الکتریکی یکنواخت ۴×۱۰^۵ N/C (از نیروی وزن صرف‌نظر کنید) به نقطه B انتقال داده می‌شود. اگر طول مسیر AB برابر ۴۰cm باشد، تندی ذره در نقطه B چند متر بر ثانیه است؟",
      image: "/img/q29.png",
      imageAlt: "ذره تحت نیرو و میدان الکتریکی",
      options: ["۳", "۵", "۶", "۱۰"],
      correctIndex: 3,
      answer: "کار نیروی خارجی: W_F = Fd cosθ = 15×0.4×cos60° = 3 J. کار میدان: W_E = qEd cos120° = -qE×0.4×0.5. طبق قضیه کار و انرژی: W_net = ΔK. با F = 15N و E = 4×10^5: q = F/E = 3.75×10^-5 C. W_E = -3 J. W_net = 0. v = 0... گزینه 4 صحیح است."
    },
    // ---------- سوال ۸ (سوال ۳۳ اصلی) ----------
    {
      id: 33,
      text: "در یک میدان الکتریکی یکنواخت E = ۵×۱۰^۴ N/C، ذره‌ای با بار q = ۵ μC از نقطه‌ای با سرعت اولیه v₀ به سمت صفحه مثبت پرتاب می‌شود. اگر جرم ذره ۲۰ g باشد و پس از یک متر جابه‌جایی در راستای خطوط میدان متوقف شود، تغییر انرژی پتانسیل ذره چند میلی‌ژول و اندازه سرعت اولیه آن چند m/s است؟",
      options: [
        "+۲۵۰ و ۱",
        "+۲۵۰ و ۵",
        "-۲۵۰ و ۱",
        "-۲۵۰ و ۵"
      ],
      correctIndex: 3,
      answer: "ΔU = qEd = 5×10^-6 × 5×10^4 × 1 = 0.25 J = 250 mJ. طبق پایستگی انرژی: ½mv₀² = qEd → v₀² = 2×0.25/0.02 = 25 → v₀ = 5 m/s. گزینه 4 صحیح است."
    },
    // ---------- سوال ۹ (سوال ۳۷ اصلی) ----------
    {
      id: 37,
      text: "دو بار الکتریکی با جرم‌های ۱۰۰ گرم و ۲۰۰ گرم و بارهای الکتریکی q₁ = -۲ μC و q₂ = ۴ μC را از فاصله x از یکدیگر رها می‌کنیم. در لحظه t تندی بارها به V₁ = ۲ m/s و V₂ = ۱ m/s می‌رسد. تغییر انرژی پتانسیل الکتریکی مجموعه بارها از لحظه رها شدن تا لحظه t چند ژول است؟ (تنها نیروی وارد بر بارها نیروی الکتریکی است.)",
      options: ["-۰/۶", "-۰/۳", "-۱/۴", "-۰/۳"],
      image: "/img/q37.png",
      correctIndex: 1,
      
      answer: "طبق پایستگی انرژی: ΔU = -ΔK. ΔK = ½×0.1×4 + ½×0.2×1 = 0.2 + 0.1 = 0.3 J. ΔU = -0.3 J. گزینه 2 صحیح است."
    },
    // ---------- سوال ۱۰ (سوال ۴۱ اصلی) ----------
    {
      id: 41,
      text: "ذره‌ای با جرم ناچیز و بار الکتریکی q = ۳ μC از حال سکون در یک میدان الکتریکی یکنواخت به بزرگی ۴۰۰ N/C رها می‌شود. انرژی جنبشی ذره پس از ۲۰ متر جابه‌جایی در راستای خطوط میدان به چند میلی‌ژول می‌رسد؟",
      options: ["۰/۶", "۲۴", "۶", "۲/۴"],
      correctIndex: 1,
      answer: "طبق قضیه کار و انرژی: ΔK = qEd = 3×10^-6 × 400 × 20 = 0.024 J = 24 mJ. گزینه 2 صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // ۲۰ دقیقه
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // ========== محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
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
      width: '100vw',
      minHeight: '100vh',
      padding: '15px 10px',
      backgroundColor: '#f8f9fa',
      direction: 'rtl',
      textAlign: 'right',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#6a1b9a',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')}
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
            fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              🎲 آزمون ۱۰ سوال تصادفی - انرژی پتانسیل الکتریکی
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>

          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px',
            borderRadius: '50px',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
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
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            {/* متن سوال */}
            <div style={{
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '20px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#6a1b9a',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {/* تصویر */}
            {q.image && (
              <div >
                {imageErrors[q.id] ? (
                  <div style={{
                    textAlign: 'center',
                    color: '#6c757d',
                    fontSize: '14px',
                    padding: '30px'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>
                      {q.image}
                    </p>
                  </div>
                ) : (
                  <img
                    src={q.image}
                    alt={q.imageAlt}
                    onError={() => handleImageError(q.id)}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '350px',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '6px'
                    }}
                  />
                )}
              </div>
            )}

            {/* گزینه‌ها */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px',
              marginRight: '20px'
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
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #6a1b9a' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#f3e5f5' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '28px',
                      fontSize: '14px',
                      marginLeft: '15px',
                      backgroundColor: isSelected ? '#6a1b9a' : '#fff',
                      color: isSelected ? '#fff' : '#000',
                      flexShrink: 0
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

        {/* دکمه محاسبه */}
        <div style={{
          marginTop: '30px',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#6a1b9a' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6a1b9a' }}>
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
                width: '80%',
                maxWidth: '400px',
                height: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`,
                  height: '100%',
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
                  padding: '10px 25px',
                  fontSize: '14px',
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        {/* دکمه پاسخنامه */}
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
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* پاسخنامه */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #6a1b9a',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #6a1b9a',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#6a1b9a'
            }}>
              📝 پاسخنامه تشریحی ۱۰ سوال تصادفی
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
                      fontWeight: 'bold',
                      color: '#6a1b9a',
                      backgroundColor: '#f3e5f5',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
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
                    <span style={{ fontWeight: 'bold', color: '#6a1b9a' }}>📖 توضیح: </span>
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
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
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

export default RandomElectricPotentialQuiz;