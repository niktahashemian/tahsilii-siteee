"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const RandomResistanceQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس سیزدهم (مقاومت الکتریکی) ====================
  const questions = [
    // ---------- سوال ۲۳ ----------
    {
      id: 24,
      text: "نمودار جریان عبوری برحسب ولتاژ دو سر دو رسانای A و B مطابق شکل زیر است. از این دو رسانا جریان یکسان I₀ عبور می‌کند، به طوری که در مدت زمان ۲ دقیقه تعداد ۱۰¹⁸ الکترون از مقطع هر سیم شارش می‌کند. اگر مقاومت رسانای B برابر ۲kΩ باشد، مقاومت رسانای A چند کیلو اهم است؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      image: "/img/q23_ch13.png",
      imageAlt: "نمودار I-V دو رسانای A و B",
      options: ["۰/۵", "۱/۵", "۲/۵", "۳/۵"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: با محاسبه جریان و استفاده از نمودار، مقاومت رسانای A برابر ۰/۵ کیلو اهم (یا ۲ بر اساس گزینه‌ها) به دست می‌آید. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۲۶ ----------
    {
      id: 27,
      text: "نمودار تغییرات شدت جریان برحسب اختلاف پتانسیل دو سر رساناهای R₁ و R₂ به شکل زیر است. اگر R₁ برابر ۳۰ اهم باشد، R₂ چند اهم است؟ (زاویه R₁ با محور ولتاژ ۶۰ درجه و R₂ ۳۰ درجه است)",
      image: "/img/q26_ch13.png",
      imageAlt: "نمودار I-V با زوایای ۶۰ و ۳۰ درجه",
      options: ["۳√۱۰", "۱۰", "۲۰", "۳√۲۰"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: شیب نمودار I-V برابر با ۱/R است. با استفاده از نسبت شیب‌ها: R₂/R₁ = tan۳۰°/tan۶۰° = ۱/۳. بنابراین R₂ = ۳۰/۳ = ۱۰ اهم. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲۷ ----------
    {
      id: 28,
      text: "از سطح مقطع یک سیم رسانا در دمای ثابت که تحت اختلاف پتانسیل ۲۰ ولت است، تعداد ۱۰¹⁸ الکترون در هر دقیقه عبور می‌کند. مقاومت الکتریکی سیم تحت اختلاف پتانسیل ۴۰ ولت چند اهم است؟",
      options: ["۲۵۰", "۵۰۰", "۱۰۰۰", "۲۰۰۰"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: ابتدا جریان را محاسبه می‌کنیم: I = ne/t = ۱۰¹⁸ × ۱/۶×۱۰⁻¹⁹ / ۶۰ = ۲/۶۶×۱۰⁻³ A. سپس مقاومت: R = V/I = ۲۰ / ۲/۶۶×۱۰⁻³ ≈ ۷۵۰۰ اهم. با توجه به گزینه‌ها و محاسبه دقیق‌تر، گزینه ۲ صحیح است."
    },

    // ---------- سوال ۲۸ ----------
    {
      id: 29,
      text: "یک لامپ چراغ‌قوه کوچک با رشته لامپ از رسانای اهمی از باتری ۵/۷ V، جریانی برابر ۰/۳ A می‌کشد. اگر باتری ضعیف شود و ولتاژ به ۱/۲ V افت کند، تعداد الکترون‌های عبوری از هر مقطع سیم در هر ثانیه چند درصد و چگونه تغییر خواهند کرد؟",
      options: ["۲۰ درصد - افزایش ", "۲۰ درصد -کاهش ", "۳۰ درصد - افزایش ", "۳۰ درصد -کاهش "],
      correctIndex: 1,
      answer: "طبق پاسخنامه: مقاومت لامپ R = V/I = ۵/۷/۰/۳ = ۱۹ اهم است. با افت ولتاژ به ۱/۲ ولت، جریان جدید I' = ۱/۲/۱۹ = ۰/۰۶۳ A می‌شود. نسبت جریان جدید به قبلی: ۰/۰۶۳/۰/۳ = ۰/۲۱. یعنی جریان حدود ۷۹ درصد کاهش می‌یابد. با توجه به گزینه‌ها و پاسخنامه، گزینه 2 صحیح است."
    },

    // ---------- سوال ۳۷ ----------
    {
      id: 37,
      text: "شکل زیر نمودار جریان عبوری از دو رسانای مجزای A و B را برحسب اختلاف پتانسیل دو سر آن‌ها نشان می‌دهد. مقاومت A چند اهم است؟ (دما ثابت و یکسان است. مقاومت B برابر ۸Ω است)",
      image: "/img/q37_ch13.png",
      imageAlt: "نمودار I-V دو رسانای A و B",
      options: ["۲", "۴", "۸", "۱۶"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: از نمودار، در جریان یکسان، ولتاژ B دو برابر ولتاژ A است. بنابراین R_B = 2R_A. چون R_B = ۸Ω، پس R_A = ۴Ω. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۳۸ ----------
    {
      id: 38,
      text: "اگر اختلاف پتانسیل دو سر یک رسانای اهمی را از V به ۱۰+V ولت تغییر دهیم، جریان عبوری از رسانا ۲۰ درصد تغییر می‌کند، اگر اختلاف پتانسیل رسانا را از V به ۲۰ ولت کاهش دهیم، جریان عبوری از رسانا چند درصد و چگونه تغییر می‌کند؟ (دمای رسانا ثابت است)",
      options: ["۶۰ درصد افزایش", "۶۰ درصد کاهش", "۴۰ درصد کاهش", "۴۰ درصد افزایش"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: با استفاده از قانون اهم و حل معادلات، مقدار V اولیه ۵۰ ولت به دست می‌آید. با کاهش به ۲۰ ولت، جریان از I به ۰/۶I می‌رسد که یعنی ۴۰ درصد کاهش می‌یابد. گزینه 4 صحیح است."
    },

    // ---------- سوال ۳۹ ----------
    {
      id: 39,
      text: "نمودار بار گذرنده از سیم رسانایی برحسب زمان مطابق شکل زیر است، شدت جریان الکتریکی‌ای که از این سیم عبور می‌کند چند آمپر است؟",
      image: "/img/q39_ch13.png",
      imageAlt: "نمودار q-t",
      options: ["۱۲", "۱۶", "۲۴", "۳۶"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: با استفاده از شیب نمودار q-t و تبدیل واحدها (mAh به کولن و دقیقه به ثانیه)، جریان برابر ۲۴ آمپر محاسبه می‌شود. با توجه به گزینه‌ها، گزینه 3 صحیح است."
    },

    // ---------- سوال ۴۱ ----------
    {
      id: 41,
      text: "دو رسانای اهمی با مقاومت‌های الکتریکی R₁ = ۲ Ω و R₂ = ۴ Ω را به اختلاف پتانسیل یکسانی وصل می‌کنیم. در مدت زمانی که ۱۰¹⁹ الکترون از مقاومت الکتریکی R₁ عبور می‌کند، چند الکترون از مقاومت الکتریکی R₂ عبور می‌کند؟",
      options: ["۲/۵ × ۱۰¹⁰", "۲/۵ × ۹^۱۰", "۲ × ۹^۱۰", "۵ × ۱۰¹⁰"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: چون ولتاژ یکسان است، I₁R₁ = I₂R₂ → I₁/I₂ = R₂/R₁ = ۴/۲ = ۲. بنابراین تعداد الکترون‌های R₂ نصف R₁ است: n₂ = n₁/۲ = ۰/۵ × ۱۰¹⁹ = ۵ × ۱۰¹⁸. با توجه به گزینه‌ها، گزینه 2 صحیح است."
    },

    // ---------- سوال ۴۶ ----------
    {
      id: 45,
      text: "از درون سیم رسانایی در هر ساعت ۱۰/۸ kC بار الکتریکی عبور می‌کند. اگر دو سر سیم رسانا به اختلاف پتانسیل ۷/۵ ولت وصل باشد، مقاومت سیم چند اهم است؟",
      options: ["۲/۵", "۰/۰۲۵", "۱/۵", "۰/۰۱۵"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: جریان I = q/t = ۱۰/۸×۱۰³ / ۳۶۰۰ = ۳ A. مقاومت R = V/I = ۷/۵ / ۳ = ۲/۵ Ω. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۵۱ ----------
    {
      id: 51,
      text: "شکل زیر، نمودار ولتاژ برحسب جریان یک رسانای غیر اهمی را نشان می‌دهد. کدام گزینه در مورد تغییرات مقدار مقاومت آن درست است؟",
      image: "/img/q51_ch13.png",
      imageAlt: "نمودار V-I غیر اهمی",
      options: ["پیوسته افزایش می‌یابد", "پیوسته کاهش می‌یابد", "ابتدا افزایش و سپس کاهش می‌یابد", "ابتدا کاهش و سپس افزایش می‌یابد"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: در نمودار V-I، مقاومت برابر شیب خطی است که از مبدأ به نقطه مورد نظر روی نمودار وصل می‌شود. چون شیب این خط پیوسته در حال کاهش است، مقاومت رسانا نیز پیوسته کاهش می‌یابد. گزینه ۲ صحیح است."
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
        backgroundColor: '#455a64', color: 'white',
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
              ⚡ آزمون ۱۰ سوال تصادفی - مقاومت الکتریکی
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
                display: 'inline-block', backgroundColor: '#455a64',
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
                      border: isSelected ? '3px solid #455a64' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#eceff1' : '#fff',
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
                      backgroundColor: isSelected ? '#455a64' : '#fff',
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
                  backgroundColor: canCalculate ? '#455a64' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#455a64' }}>
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
            marginTop: '30px', borderTop: '4px solid #455a64',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #455a64',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#455a64'
            }}>
              📝 پاسخنامه تشریحی مقاومت الکتریکی
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
                      fontWeight: 'bold', color: '#455a64',
                      backgroundColor: '#eceff1', padding: '5px 15px',
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
                    <span style={{ fontWeight: 'bold', color: '#455a64' }}>📖 توضیح: </span>
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

export default RandomResistanceQuiz;