"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const RandomResistanceFactorsQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس چهاردهم ====================
  const questions = [
    // ---------- سوال ۵۳ ----------
    {
      id: 53,
      text: "جرم دو سیم هم‌جنس A و B با یکدیگر برابر بوده و شعاع سطح مقطع سیم A، دو برابر شعاع سطح مقطع سیم B است. اگر مقاومت الکتریکی سیم B برابر با ۲۴ اهم باشد، مقاومت الکتریکی سیم A برابر با چند اهم است؟",
      options: ["۶", "۱/۵", "۲/۳", "۱/۶"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: چون جرم و جنس دو سیم یکسان است، حجم آنها برابر است: V_A = V_B → A_A L_A = A_B L_B → L_A/L_B = A_B/A_A = (r_B/r_A)^2 = (1/2)^2 = 1/4. مقاومت: R_A/R_B = (L_A/L_B) × (A_B/A_A) = (1/4) × (1/4) = 1/16. بنابراین R_A = 24/16 = ۱/۵ اهم. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۵۶ ----------
    {
      id: 56,
      text: "مکعب مستطیل رسانایی با ابعاد  ۲cm × ۴ cm × ۸ cm در اختیار داریم. اگر این مکعب مستطیل را در مداری قرار دهیم، نسبت بیشترین مقاومت الکتریکی ممکن به کوچک‌ترین مقاومت کدام گزینه است؟",
      options: ["۳۲", "۸", "۱۶", "۴"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: R = ρ(L/A). بیشترین مقاومت وقتی است که طول بیشترین (۸) و سطح مقطع کمترین (۲×۴=۸) باشد: R_max ∝ ۸/۸ = ۱. کمترین مقاومت وقتی است که طول کمترین (۲) و سطح مقطع بیشترین (۴×۸=۳۲) باشد: R_min ∝ ۲/۳۲ = ۱/۱۶. نسبت R_max/R_min = ۱ / (۱/۱۶) = ۱۶. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۵۷ ----------
    {
      id: 57,
      text: "طول یک سیم فلزی ۱۰ cm و قطر مقطع آن ۲ mm است. اگر سیم را از ابزاری عبور دهیم تا بدون تغییر جرم، مقاومت الکتریکی آن ۳۶ برابر شود، طول آن چند سانتی‌متر می‌شود؟",
      options: ["۳۰", "۶۰", "۹۰", "۱۲۰"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: در تغییر شکل بدون تغییر جرم، حجم ثابت است: V = AL = ثابت. بنابراین R = ρL/A = ρL^2/V. چون ρ و V ثابت هستند، R ∝ L^2. پس (L_2/L_1)^2 = R_2/R_1 = ۳۶ → L_2/L_1 = ۶ → L_2 = ۶ × ۱۰ = ۶۰ cm. گزینه 2 صحیح است."
    },

    // ---------- سوال ۵۹ ----------
    {
      id: 59,
      text: "سیمی به مقاومت ۱۰ Ω به اختلاف پتانسیل ۲۰ V وصل است. اگر سیم را بکشیم تا قطر آن نصف شود و به همان اختلاف پتانسیل وصل شود، جریان گذرنده از سیم چند آمپر می‌شود؟",
      options: ["۰/۱۲۵", "۰/۲", "۱", "۱/۵"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: با نصف شدن قطر، سطح مقطع به ۱/۴ کاهش می‌یابد. حجم ثابت است، پس طول ۴ برابر می‌شود. مقاومت جدید: R' = R × (L'/L) × (A/A') = ۱۰ × ۴ × ۴ = ۱۶۰ Ω. جریان جدید: I' = V/R' = ۲۰/۱۶۰ = ۰/۱۲۵ A. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۶۸ ----------
    {
      id: 68,
      text: "طول سیم مسی A، دو برابر طول سیم مسی B است و قطر مقطع سیم A، نصف قطر مقطع سیم B است. مقاومت الکتریکی سیم A، چندبرابر مقاومت الکتریکی سیم B است؟",
      options: ["۱/۲", "۲", "۴", "۸"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: L_A = 2L_B و r_A = 1/2 r_B → A_A = 1/4 A_B. نسبت مقاومت‌ها: R_A/R_B = (L_A/L_B) × (A_B/A_A) = ۲ × ۴ = ۸. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۶۹ ----------
    {
      id: 69,
      text: "دو سیم رسانای فلزی a و b دارای مقاومت، جرم و طول یکسان هستند، اگر مقاومت ویژه سیم a، دو برابر مقاومت ویژه سیم b باشد، چگالی سیم a چندبرابر چگالی سیم b است؟",
      options: ["۱/۲", "۲", "۱", "۴"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: R = ρL/A و A = m/(dL) → R = ρ d L^2 / m. چون R، L و m یکسان هستند: ρ_a d_a = ρ_b d_b. با توجه به ρ_a = ۲ρ_b: ۲ρ_b d_a = ρ_b d_b → d_a = ۱/۲ d_b. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۷۲ ----------
    {
      id: 71,
      text: "اگر طول یک سیم مسی دو برابر و سطح مقطع آن ۱/۴ برابر شود، در حالتی که این سیم به اختلاف پتانسیل ثابتی وصل باشد، جریان در حالت دوم چند برابر است؟",
      options: ["۲", "۸", "۱/۸", "۱/۲"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: مقاومت جدید: R' = ρ(2L)/(A/4) = ۸ρL/A = ۸R. با ولتاژ ثابت: I' = V/R' = V/(8R) = ۱/۸ I. گزینه 3 صحیح است."
    },

    // ---------- سوال ۷۸ ----------
    {
      id: 78,
      text: "مقاومت یک سیم مسی در دمای ۲۰°C برابر ۴۰Ω است. از سیم جریان الکتریکی عبور می‌کند و در اثر افزایش دما، مقاومت الکتریکی آن به ۴۶/۸Ω می‌رسد. دمای سیم در این حالت، چند درجه سلسیوس شده است؟ (α = ۰/۰۰۶۸۱/K)",
      options: ["۲۲/۵", "۲۵", "۳۷/۵", "۴۵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: R_2 = R_1(1 + αΔθ) → ۴۶/۸ = ۴۰(۱ + ۰/۰۰۶۸۱ × Δθ) → ۱/۱۷ = ۱ + ۰/۰۰۶۸۱Δθ → ۰/۱۷ = ۰/۰۰۶۸۱Δθ → Δθ = ۲۵°C. دمای نهایی: θ_2 = θ_1 + Δθ = ۲۰ + ۲۵ = ۴۵°C. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۸۱ ----------
    {
      id: 81,
      text: "جرم دو سیم هم‌جنس A و B با یکدیگر برابر بوده و شعاع مقطع سیم B، دو برابر شعاع مقطع سیم A است. اگر مقاومت الکتریکی سیم A برابر با ۲۰Ω باشد، مقاومت الکتریکی سیم B چند اهم است؟",
      options: ["۱۰", "۵", "۲/۵", "۱/۲۵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: چون جرم و جنس یکسان است، حجم برابر است: V_A = V_B → A_A L_A = A_B L_B → L_A/L_B = A_B/A_A = (r_B/r_A)^2 = (2/1)^2 = ۴. مقاومت: R_A/R_B = (L_A/L_B) × (A_B/A_A) = ۴ × ۴ = ۱۶. بنابراین R_B = R_A/۱۶ = ۲۰/۱۶ = ۱/۲۵ Ω. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۸۶ ----------
    {
      id: 86,
      text: "با افزایش دما، مقاومت الکتریکی یک قطعه ژرمانیم، ...... و مقاومت الکتریکی یک قطعه مس ...... می‌یابد.",
      options: ["افزایش - کاهش", "کاهش - افزایش", "افزایش - ثابت", "ثابت - افزایش"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: ژرمانیم یک نیمه‌رسانا است و با افزایش دما، مقاومت الکتریکی آن کاهش می‌یابد. مس یک رسانای فلزی است و با افزایش دما، مقاومت الکتریکی آن افزایش می‌یابد. گزینه ۲ صحیح است."
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
        backgroundColor: '#5d4037', color: 'white',
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
              ⚡ آزمون ۱۰ سوال تصادفی - عوامل مؤثر بر مقاومت
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
                display: 'inline-block', backgroundColor: '#5d4037',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px',
                borderRadius: '50%', fontSize: '14px',
                marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            

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
                      border: isSelected ? '3px solid #5d4037' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#efebe9' : '#fff',
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
                      backgroundColor: isSelected ? '#5d4037' : '#fff',
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
                  backgroundColor: canCalculate ? '#5d4037' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#5d4037' }}>
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
            marginTop: '30px', borderTop: '4px solid #5d4037',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #5d4037',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#5d4037'
            }}>
              📝 پاسخنامه تشریحی عوامل مؤثر بر مقاومت
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
                      fontWeight: 'bold', color: '#5d4037',
                      backgroundColor: '#efebe9', padding: '5px 15px',
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
                    <span style={{ fontWeight: 'bold', color: '#5d4037' }}>📖 توضیح: </span>
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

export default RandomResistanceFactorsQuiz;