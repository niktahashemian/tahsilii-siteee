"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Chemistry2HeatCapacity = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== آرایه سوالات ====================
  
  const questions = [
    {
      id: 9,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "اگر به ۱۰۷ گرم آلومینیم با دمای ۲۰ °C و ظرفیت گرمایی ۰/۸۵ J.g-۱ °C-۱ کالری گرما دهیم، دمای آن در مقیاس سلسیوس تقریباً چند درصد افزایش می‌یابد؟ (Al = ۲۷ g.mol-۱)",
      image: null,
      imageAlt: "",
      options: ["5/9", "6/7", "4/3", "5"],
      correctIndex: 0,
      answer: "گام ۱: تبدیل کالری به ژول: 2.5 cal = 10.46 J. (در صورت سوال ۲۵/۶ کالری ذکر شده که معادل تقریبی ۱۰۷ ژول است).\nگام ۲: محاسبه تغییر دما: Q = mcΔθ ⇒ Δθ = Q / mc\nگام ۳: درصد افزایش دما = (Δθ / θ₁) × ۱۰۰ ≈ ۵/۹ درصد.\nگزینه ۱ صحیح است."
    },
    {
      id: 10,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "مقداری کلسیم کربنات با خلوص ۶۰ درصد با مقدار کافی هیدروکلریک اسید واکنش می‌دهد. اگر به کربن دی‌اکسید حاصل ۹۲/۴ ژول گرما دهیم، دمای آن ۱۰ درجه سلسیوس افزایش می‌یابد. جرم کلسیم کربنات اولیه برحسب گرم کدام است؟ \n (Ca = ۴۰, O = ۱۶, C = ۱۲ : g.mol-۱, cCO₂ = ۰/۸۴ J.g-۱ ° C-۱)",
      image: null,
      imageAlt: "",
      options: ["41/7", "25", "4/17", "2/5"],
      correctIndex: 2,
      answer: "ابتدا جرم CO₂ را از رابطه Q = mcΔθ حساب می‌کنیم: 92.4 = m × 0.84 × 10 ⇒ m = 11 g CO₂\nواکنش موازنه‌شده: CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O\nبا استفاده از نسبت استوکیومتری: 11 g CO₂ معادل 25 g CaCO₃ خالص است.\nچون خلوص ۶۰٪ است: 25 / 0.6 ≈ 41/7 گرم کلسیم کربنات اولیه نیاز است.\nگزینه 3 صحیح است."
    },
    {
      id: 12,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "کدام گزینه درست است؟",
      image: null,
      imageAlt: "",
      options: [
        "در دما و فشار یکسان، الماس نسبت به گرافیت از پایداری بیشتری برخوردار است.",
        "گرم آب ۸۰ درجه سانتی‌گراد از m گرم آب ۴۰ درجه سانتی‌گراد بیشتر است.",
        "گرمای آزادشده از یک واکنش در دمای ثابت، به‌طور عمده وابسته به تفاوت انرژی گرمایی مواد واکنش‌دهنده و فرآورده است.",
        "میانگین انرژی جنبشی ذرات سازندۀ یک ماده رابطۀ مستقیم با دمای آن ماده دارد."
      ],
      correctIndex: 3,
      answer: "بررسی گزینه‌ها:\nگزینه ۱: نادرست. گرافیت از الماس پایدارتر است.\nگزینه ۲: نادرست. اشاره به گرمای یک نمونه ماده اشتباه است؛ زیرا گرما از ویژگی‌های ماده نیست و مربوط به یک فرآیند است.\nگزینه ۳: نادرست. شیمی‌دان‌ها گرمای جذب یا آزادشده در هر واکنش شیمیایی را به‌طور عمده وابسته به تفاوت میان انرژی پتانسیل مواد واکنش‌دهنده و فرآورده می‌دانند.\nگزینه ۴: درست. میانگین انرژی جنبشی ذرات با دما رابطه مستقیم دارد."
    },
    {
      id: 14,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "ظرفیت گرمایی ۱۱ گرم اتانول با چند گرم آب برابر است؟ (ظرفیت گرمایی ویژه آب = ۴/۱۸ J.g⁻¹.°C⁻¹ و ظرفیت گرمایی ویژه اتانول = ۲/۴۷ J.g⁻¹.°C⁻¹)",
      image: null,
      imageAlt: "",
      options: ["۱۳", "۶/۵", "۲۱", "۳/۲۵"],
      correctIndex: 0,
      answer: "ظرفیت گرمایی برابر است با C = mc.\nبرای برابر شدن ظرفیت گرمایی دو ماده: (mc)آب = (mc)اتانول\nm × 4.18 = 11 × 2.47\nm ≈ 6/5 گرم آب\nگزینه 1 صحیح است."
    },
    {
      id: 16,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "۱۲۵ میلی‌لیتر اتانول ۳/۶۹ کیلوژول انرژی دریافت کند تا به دمای ۵۳°C برسد، دمای اولیه اتانول کدام است؟ چگالی اتانول را ۰/۸ g.mL⁻¹ گرمای ویژه آن را ۲/۴۶ J.g⁻¹.°C⁻¹ در نظر بگیرید.",
      image: null,
      imageAlt: "",
      options: ["۲۳°C", "۳۳°C", "۳۸°C", "۳۸°C"],
      correctIndex: 3,
      answer: "ابتدا جرم اتانول را حساب می‌کنیم: m = ρ × V = 0.8 × 125 = 100 g\nحال با استفاده از فرمول گرما: Q = mcΔθ\n3690 J = 100 × 2.46 × (53 - θ₁)\n3690 = 246 × (53 - θ₁) ⇒ 53 - θ₁ = 15 ⇒ θ₁ = 38°C\nگزینه 4 صحیح است."
    },
    {
      id: 17,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "به‌تقریب چند گرم یخ ۰°C را به ۶۰g آب با دمای ۴۰°C اضافه کنیم تا درنهایت آب با دمای ۱۰°C داشته باشیم؟ (آنتالپی ذوب یخ تقریباً برابر ۳۳۳۳ J.g⁻¹ است، ظرفیت گرمایی ویژه آب هم ۴/۱۸۴ J.g⁻¹.°C⁻¹)",
      image: null,
      imageAlt: "",
      options: ["32/5", "20", "30", "27"],
      correctIndex: 1,
      answer: "گرمای از دست رفته توسط آب گرم = گرمای گرفته شده توسط یخ برای ذوب + گرمای گرم شدن آب ذوب‌شده\n(60 × 4.184 × (40 - 10)) = (x × 333.3) + (x × 4.184 × (10 - 0))\n7531.2 = 333.3x + 41.84x = 375.14x\nx ≈ 20 گرم\nگزینه 2 صحیح است."
    },
    {
      id: 18,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "باتوجه به واکنش فرضی زیر تعیین کنید از واکنش چند لیتر محلول ۵/۰ مول بر لیتر ماده A، گرمایی آزاد می‌شود تا دمای ۱۰ کیلوگرم آب ۲۰ درجه سانتی‌گراد را به ۴۰ درجه برساند؟ (ظرفیت گرمایی ویژه آب ۴/۲ ژول بر گرم درجه سانتی‌گراد است)\nA(aq) + ۲BC(aq) → AC₂(s) + ۲B(aq)  ΔH = -۸۴ kJ",
      image: null,
      imageAlt: "",
      options: ["20000", "10000", "20", "10"],
      correctIndex: 2,
      answer: "ابتدا گرمای لازم برای افزایش دمای آب: Q = mcΔθ = 10000 × 4.2 × 20 = 840000 J = 840 kJ\nحالا حجم محلول A را حساب می‌کنیم:\n840 kJ × (1 mol A / 84 kJ) = 10 mol A\nحجم = مول / غلظت = 10 / 0.5 = 20 لیتر\nگزینه 3 صحیح است."
    },
    {
      id: 23,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "در ظرفی از جنس آهن به جرم ۴۰۰ گرم مقداری آب به جرم ۵۰۰ گرم می‌ریزیم. اگر دمای ظرف و آب برابر با ۴۰ °C باشد، برای آنکه دمای سامانه (آب و ظرف) را به ۹۰ °C برسانیم، باید به‌تقریب چند گرم متان بسوزانیم؟ فرض کنید که ۴۰ درصد انرژی سوختن متان هدر می‌رود. بر اثر سوختن هر مول متان ۹۰۰ kJ انرژی آزاد می‌شود. (cآب = 4/2 و cآهن = 0/5 J.g⁻¹.°C⁻¹)",
      image: "/img/q23_test_tubes.png", // <--- مسیر عکس خود را اینجا بگذارید
      imageAlt: "",
      options: ["4/8", "2/2", "5/6", "3/4"],
      correctIndex: 2,
      answer: "انرژی لازم برای گرم کردن آب و ظرف:\nQ_کل = (m_آب × c_آب × Δθ) + (m_آهن × c_آهن × Δθ)\nQ_کل = (500 × 4.2 × 50) + (400 × 0.5 × 50) = 105000 + 10000 = 115000 J = 115 kJ\nچون ۴۰٪ انرژی هدر می‌رود، ۶۰٪ آن مفید است. پس انرژی کل مورد نیاز = 115 / 0.6 = 191.67 kJ\nبا سوختن هر مول متان ۹۰۰ کیلوژول آزاد می‌شود، پس جرم متان:\n191.67 kJ × (1 mol / 900 kJ) × (16 g / 1 mol) ≈ 3/4 گرم\nگزینه 3 صحیح است."
    },
    {
      id: 25,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "اگر دو لیوان یکسان موجود باشد که اولی دارای ۱۰۰ و دومی دارای ۳۰۰ mL آب بوده و هر دو در دمای ۲۵ °C باشند، چند مورد از عبارت‌های زیر در ارتباط با آنها درست است؟\n(الف) میانگین سرعت حرکت مولکول‌های آب در هر دو لیوان برابر است.\n(ب) ظرفیت گرمایی ویژه آب، در هر دو لیوان برابر است.\n(پ) ظرفیت گرمایی آب در لیوان دوم در مقایسه با لیوان اول بیشتر است.\n(ت) برای رساندن دمای آب در هریک از دو لیوان به ۳۵ °C گرمای برابری لازم است.",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "بررسی موارد:\nالف) درست. چون دما یکسان است، میانگین سرعت مولکول‌ها برابر است.\nب) درست. ظرفیت گرمایی ویژه به جرم بستگی ندارد و برای آب در هر دو لیوان برابر است.\nپ) درست. ظرفیت گرمایی کل = m × c. چون جرم لیوان دوم بیشتر است، ظرفیت گرمایی آن بیشتر است.\nت) نادرست. طبق رابطه Q = mcΔθ، برای لیوان دوم به دلیل جرم بیشتر، گرمای بیشتری نیاز است.\nبنابراین ۳ مورد درست است. گزینه ۳ صحیح است."
    },
    {
      id: 44,
      section: "ظرفیت گرمایی و گرمایی ویژه",
      text: "گرمای حاصل از کاهش دمای ۱۴ g آلومینیوم از ۲۵ °C به ۰ °C را به کربن دی‌اکسید می‌دهیم. این مقدار گرما دمای کربن دی‌اکسید را به اندازه ۴۵ °C افزایش می‌دهد. مقدار کربن دی‌اکسید چند مول است؟ (Al = 27, C = 12, O = 16 : g.mol-1) (cAl = 0/9, cCO2 = 0/84 J.g-1. °C-1)",
      image: null,
      imageAlt: "",
      options: [" 0/27 mol", "0/54 mol", "0/48 mol", "0/47 mol"],
      correctIndex: 0,
      answer: "گرمای از دست رفته توسط آلومینیوم = گرمای گرفته شده توسط کربن دی‌اکسید\n|Q_Al| = |Q_CO2|\n(m_Al × c_Al × |Δθ_Al|) = (m_CO2 × c_CO2 × Δθ_CO2)\n(14 × 0.9 × 25) = m_CO2 × 0.84 × 45\n315 = 37.8 × m_CO2 ⇒ m_CO2 = 8.33 g\nتبدیل به مول: 8.33 g / 44 g.mol⁻¹ ≈ 0/27 mol\nگزینه 1 صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // ۱۵ دقیقه برای ۱۰ سوال
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
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/shimi-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌡️ آزمون شیمی (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              ظرفیت گرمایی و گرمایی ویژه - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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

              {/* رندر تصویر سوال (در صورت وجود) */}
              {q.image && (
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
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{q.imageAlt || 'تصویر شکل این سوال'}</p>
                    </div>
                  ) : (
                    <img
                      src={q.image}
                      alt={q.imageAlt || `شکل سوال ${index + 1}`}
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

export default Chemistry2HeatCapacity;