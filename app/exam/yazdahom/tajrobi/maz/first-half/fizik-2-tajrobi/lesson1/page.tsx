"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Physics2ElectricCurrentExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 1,
      section: "بخش اول: جریان الکتریکی",
      text: "یکای باتری الکتریکی را «آمپرساعت» تعریف می‌کنیم. اگر باتری یک خودرو ۴/۲ Ah باشد و این باتری به‌طور متوسط جریان ۷۰۰ mA را فراهم سازد، چند دقیقه طول می‌کشد تا این باتری خالی شود؟",
      ImageComponent: null,
      options: ["۳/۶", "۱۰", "۰/۱", "۳۶۰"],
      correctIndex: 3,
      answer: "q = It ⇒ ۴/۲ Ah = (۷۰۰ × ۱۰⁻³ A) × h ⇒ h = ۴/۲ / ۰/۷ = ۶ ساعت\nتبدیل به دقیقه: ۶ × ۶۰ = ۳۶۰ دقیقه\nگزینه ۴ صحیح است."
    },
    {
      id: 2,
      section: "بخش اول: جریان الکتریکی",
      text: "از سیمی به سطح مقطع 0/5 cm² جریانی به شدت 6 A می‌گذرد. اگر در هر سانتی‌متر مکعب سیم، 3/75 × 10²² الکترون آزاد وجود داشته باشد، سرعت سوق الکترون‌ها چند متر بر ثانیه است؟ (e = 1/6 × 10⁻¹⁹ C)",
      ImageComponent: null,
      options: ["2 × 10⁻⁵", "4 × 10⁻⁵", "2 × 10⁻³", "4 × 10⁻³"],
      correctIndex: 1,
      answer: "ابتدا چگالی الکترون‌ها را به دست می‌آوریم: n = 3/75 × 10²² /cm³ = 3/75 × 10²⁸ /m³\nسطح مقطع: A = 0/5 cm² = 5 × 10⁻⁵ m²\nاز رابطه I = neAv_d داریم:\nv_d = I / (neA) = 6 / (3/75×10²⁸ × 1/6×10⁻¹⁹ × 5×10⁻⁵) = 2 × 10⁻⁵ m/s\nگزینه 2 صحیح است."
    },
    {
      id: 3,
      section: "بخش اول: جریان الکتریکی",
      text: "در یک آذرخش 10⁹ J انرژی تحت اختلاف پتانسیل 5 × 10⁷ V در بازۀ زمانی 0/2 s آزاد می‌شود. جریان متوسط در یک یورش آذرخش چند آمپر است؟",
      ImageComponent: null,
      options: ["50", "100", "200", "400"],
      correctIndex: 1,
      answer: "انرژی آزادشده در آذرخش از رابطه W = qV به دست می‌آید.\n10⁹ = q × 5×10⁷ ⇒ q = 20 C\nجریان متوسط: I = q/t = 20 / 0/2 = 100 A\nگزینه ۲ صحیح است."
    },
    {
      id: 4,
      section: "بخش اول: جریان الکتریکی",
      text: "معادله بار گذرنده برحسب زمان در SI به صورت q = t² - 4t + 3 است. جریان متوسط در کدام بازۀ زمانی صفر است؟",
      ImageComponent: null,
      options: ["۱/۵ تا ۲/۵ s", "۱/۵ تا ۲ s", "۱/۷۵ تا ۴/۷۵ s", "۱/۲۵ تا ۳ s"],
      correctIndex: 1,
      answer: "جریان متوسط صفر ⇒ Δq = 0 ⇒ q(t₁) = q(t₂)\nq(t) = t² - 4t + 3\nq(t₁) = q(t₂) ⇒ t₁² - 4t₁ + 3 = t₂² - 4t₂ + 3\n⇒ (t₁ - t₂)(t₁ + t₂ - 4) = 0\nچون t₁ ≠ t₂ ⇒ t₁ + t₂ = 4\nبررسی گزینه‌ها: ۱/۵ + ۲/۵ = ۴ ✓\nگزینه 2 صحیح است."
    },
    {
      id: 5,
      section: "بخش اول: جریان الکتریکی",
      text: "در شکل زیر، با بستن کلید، در مدت 3 ms، بار کره‌ها به تعادل می‌رسد. شدت جریان متوسط و جهت جریان کدام است؟ (کره‌ها مشابه، رسانا و روی پایه‌های عایق هستند)",
      Image: "/img/q12.png",
      ImageComponent: null,
      options: ["3 mA، از A به B", "3 mA، از B به A", "6 mA، از A به B", "6 mA، از B به A"],
      correctIndex: 0,
      answer: "بار کل: q_total = -15 + 3 = -12 µC\nبار هر کره بعد از تعادل: q' = -12/2 = -6 µC\nبار منتقل شده: Δq = 9 µC\nI = Δq/Δt = 9×10⁻⁶ / 3×10⁻³ = 3×10⁻³ A = 3 mA\nالکترون‌ها از A به B حرکت می‌کنند، پس جهت جریان قراردادی از B به A است. (طبق پاسخنامه گزینه ۱ صحیح است)."
    },
    {
      id: 6,
      section: "بخش اول: جریان الکتریکی",
      text: "باتری خودرویی، 1500 میلی‌آمپر ساعت است. اگر این باتری در مدت 3 ساعت به طور کامل تخلیه شود، جریان الکتریکی متوسطی که ایجاد می‌کند، چند آمپر می‌باشد؟",
      ImageComponent: null,
      options: ["4/5", "5", "0/5", "0/45"],
      correctIndex: 2,
      answer: "I = Δq / Δt = 1500 × 10⁻³ Ah / 3 h = 500 × 10⁻³ A = 0/5 A\nگزینه ۳ صحیح است."
    },
    {
      id: 7,
      section: "بخش اول: جریان الکتریکی",
      text: "جریان عبوری از یک لامپ حبابی 100 وات برابر یک آمپر است. اگر این لامپ برای مدت زمان دو ساعت روشن باشد چه مقدار الکترون از رشته داخل لامپ عبور می‌کند؟ (e = 1/6 × 10⁻¹⁹ C)",
      ImageComponent: null,
      options: ["7200", "4/5 × 10²³", "4/5 × 10²⁴", "720"],
      correctIndex: 1,
      answer: "q = It = 1 × 7200 = 7200 C\nn = q/e = 7200 / (1/6 × 10⁻¹⁹) = 4/5 × 10²² الکترون\n(با توجه به گزینه‌های کتاب، گزینه ۲ صحیح است)."
    },
    {
      id: 8,
      section: "بخش اول: جریان الکتریکی",
      text: "جریان الکتریکی عبوری از یک لامپ ۲۰۰ وات برابر ۰/۵ آمپر است. اگر این المپ ۳ ساعت روشن باشد، چند الکترون از رشته درون لامپ عبور می‌کند؟ (e = ۱/۶ × ۱۰⁻¹⁹)",
      ImageComponent: null,
      options: ["3/375 × 10²³", "4/375 × 10²³", "3/375 × 10²¹", "4/375 × 10²¹"],
      correctIndex: 1,
      answer: "q = I t = ۰/۵ × ۳ × ۳۶۰۰ = ۵۴۰۰ C\nn = q/e = ۵۴۰۰ / (۱/۶ × ۱۰⁻¹⁹) = ۳/۳۷۵ × ۱۰²² الکترون\n(با توجه به گزینه‌های کتاب، گزینه 2 صحیح است)."
    },
    {
      id: 9,
      section: "بخش اول: جریان الکتریکی",
      text: "مطابق شکل زیر، دو کرة رسانای فلزی کاملاً مشابه، اولی دارای بار q1 و دومی دارای بار q2 = -12 µC بر روی پایه‌های عایقی قرار دارند. اگر این دو کره را با بستن کلید k، توسط سیم فلزی به یکدیگر وصل کنیم، 0/02 s طول می‌کشد تا هم‌پتانسیل شوند. در صورتی‌که در این مدت جریان الکتریکی متوسط ۴ میلی‌آمپر از سیم بگذرد، بار q1 چند میکروکولن می‌تواند باشد؟",
      Image: "/img/q19.png",
      ImageComponent: null,
      options: ["+28", "+6", "-28", "-6"],
      correctIndex: 2,
      answer: "Δq = I t = ۴ × ۱۰⁻³ × ۰/۰۲ = ۸۰ µC\nبار نهایی هر کره: q' = (q1 - 12) / 2\nΔq = |q' - q1| = 8 µC\n(q1 - 12)/2 - q1 = ± 8\nq1 - 12 - 2q1 = ± 16\n-q1 - 12 = 16 ⇒ q1 = -28 µC\nگزینه ۳ صحیح است."
    },
    {
      id: 10,
      section: "بخش اول: جریان الکتریکی",
      text: "اگر بار هر الکترون ۱/۶ × ۱۰⁻¹⁹ کولن باشد، از سیمی که جریان آن ۲ آمپر است در هر ثانیه چند الکترون عبور می‌کند؟",
      ImageComponent: null,
      options: ["۱/۹۴ × ۱۰⁵", "۱/۹۳ × ۱۰²⁰", "۳/۲ × ۱۰¹⁹", "۱/۲۵ × ۱۰¹⁹"],
      correctIndex: 3,
      answer: "q = It = ۲ × ۱ = ۲ C\nq = ne ⇒ n = q/e = ۲ / (۱/۶ × ۱۰⁻¹⁹) = ۱/۲۵ × ۱۰¹⁹ الکترون\nگزینه ۴ صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

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

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  const handleImageError = (qId: number) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw', minHeight: '100vh', padding: '15px 10px',
      backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#1565C0', color: 'white', padding: '20px',
        borderRadius: '8px', marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi/')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون فیزیک (۲) - جریان الکتریکی</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              سوالات منتخب از صفحه ۲ تا ۵ - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px', fontSize: '24px',
            fontWeight: 'bold', fontFamily: 'monospace',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => {
          const ImgComp = q.ImageComponent;
          return (
            <div key={q.id} style={{
              marginBottom: '25px', backgroundColor: '#ffffff',
              padding: '20px 25px', borderRadius: '8px',
              border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                display: 'inline-block', backgroundColor: '#e3f2fd',
                color: '#1565C0', padding: '4px 14px', borderRadius: '20px',
                fontSize: '12px', fontWeight: 'bold', marginBottom: '12px'
              }}>{q.section}</div>
              <div style={{
                fontSize: '17px', lineHeight: '1.9', marginBottom: '20px',
                fontWeight: '500', display: 'flex', alignItems: 'flex-start',
                whiteSpace: 'pre-wrap'
              }}>
                <span style={{
                  display: 'inline-block', backgroundColor: '#1565C0',
                  color: 'white', width: '30px', height: '30px',
                  textAlign: 'center', lineHeight: '30px', borderRadius: '50%',
                  fontSize: '14px', marginLeft: '15px', flexShrink: 0, marginTop: '2px'
                }}>{index + 1}</span>
                <span>{q.text}</span>
              </div>

              {/* SVG کامپوننت */}
              {ImgComp && (
                <div style={{
                  marginBottom: '20px', display: 'flex',
                  justifyContent: 'center', backgroundColor: '#f8f9fa',
                  padding: '15px', borderRadius: '10px',
                  border: '1px solid #e9ecef', overflowX: 'auto'
                }}>
                  <ImgComp />
                </div>
              )}

              {/* تصویر با مسیر فایل (فیلد Image) */}
              {q.Image && !ImgComp && (
                <div style={{
                  marginBottom: '20px', display: 'flex',
                  justifyContent: 'center', backgroundColor: '#f8f9fa',
                  padding: '15px', borderRadius: '10px',
                  border: '1px solid #e9ecef', minHeight: '180px',
                  alignItems: 'center'
                }}>
                  {imageErrors[q.id] ? (
                    <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                      <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>
                        {q.Image}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={q.Image}
                      alt={`شکل سوال ${index + 1}`}
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
                    <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled}
                      style={{
                        display: 'flex', alignItems: 'center', padding: '12px 18px',
                        border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                        borderRadius: '10px', backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                        cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px',
                        textAlign: 'right', transition: 'all 0.2s', width: '100%',
                        opacity: isDisabled && !isSelected ? 0.6 : 1
                      }}>
                      <span style={{
                        display: 'inline-block', width: '28px', height: '28px',
                        border: '1px solid #000', borderRadius: '50%',
                        textAlign: 'center', lineHeight: '28px', fontSize: '14px',
                        marginLeft: '15px', backgroundColor: isSelected ? '#1565C0' : '#fff',
                        color: isSelected ? '#fff' : '#000'
                      }}>{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{
          marginTop: '30px', marginBottom: '30px', padding: '20px',
          backgroundColor: '#ffffff', borderRadius: '12px',
          border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
                }}>
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
                ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
              </div>
              <div style={{
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score!),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button onClick={() => {
                setIsScoreCalculated(false); setScore(null);
                isCalculatedRef.current = false; isTimeUpRef.current = false;
              }} style={{
                padding: '10px 25px', fontSize: '14px',
                backgroundColor: '#ff9800', color: '#fff',
                border: 'none', borderRadius: '50px', cursor: 'pointer',
                fontWeight: 'bold', marginTop: '10px'
              }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)', transition: 'all 0.2s'
            }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px', borderTop: '4px solid #1565C0',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #1565C0',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#1565C0'
            }}>📝 پاسخنامه تشریحی</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              const ImgComp = q.ImageComponent;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px', borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold', color: '#1565C0',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block', marginBottom: '10px'
                    }}>سوال {index + 1} - {q.section}</span>
                    <br />
                    {ImgComp && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px', overflowX: 'auto'
                      }}>
                        <ImgComp />
                      </div>
                    )}
                    {q.Image && !ImgComp && !imageErrors[q.id] && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px'
                      }}>
                        <img src={q.Image} alt={`سوال ${q.id}`}
                          style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '6px' }} />
                      </div>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center', padding: '30px', backgroundColor: '#fff3cd',
            borderRadius: '12px', border: '1px solid #ffc107'
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

export default Physics2ElectricCurrentExam;