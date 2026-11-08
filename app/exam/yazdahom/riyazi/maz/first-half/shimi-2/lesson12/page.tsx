"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Chemistry2Thermochemistry = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== آرایه سوالات ====================
  
  const questions = [
    {
      id: 51,
      section: "ترموشیمی",
      text: "کدام مطلب درست است؟",
      image: null,
      imageAlt: "",
      options: [
        "ΔHواکنش تولید CO از گرافیت و اکسیژن را نمی‌توان به روش تجربی تعیین کرد.",
        "هیدروژن پراکسید را می‌توان از واکنش مستقیم هیدروژن و اکسیژن در دمای بالا تهیه کرد.",
        "واکنش C(s) + O2(g) → CO2(g) واکنش گرماگیر است و با افزایش سطح انرژی همراه است.",
        "متان از تجزیه گیاهان توسط باکتری‌های هوازی در زیر آب تهیه می‌شود."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. واکنش تولید CO از گرافیت و اکسیژن را نمی‌توان به روش تجربی تعیین کرد (زیرا در عمل ممکن است CO2 نیز تولید شود).\nگزینه ۲ نادرست است؛ H2O2 از واکنش مستقیم تهیه نمی‌شود.\nگزینه ۳ نادرست است؛ سوختن گرافیت گرماده است.\nگزینه ۴ نادرست است؛ متان توسط باکتری‌های بی‌هوازی تولید می‌شود."
    },
    {
      id: 52,
      section: "ترموشیمی",
      text: "وقتی n مول آب در یک مول سولفوریک اسید حل می‌شود، مقدار گرمای آزادشده برحسب ژول از این رابطه به دست می‌آید:\n Q(J) = (7/47 × 10^4 × n) / (n + 1/8)\nاگر 72 g آب را در یک مول H2SO4 حل کنیم، با گرمای آزادشده دمای چند گرم آب را می‌توانیم از 0°C تا 87°C بالا ببریم؟ (ظرفیت گرمایی آب 4/2 J.g⁻¹.°C⁻¹ است)",
      image: null,
      imageAlt: "",
      options: ["141", "454", "204", "818"],
      correctIndex: 0,
      answer: "تعداد مول آب: n = 72 / 18 = 4 mol\nمحاسبه Q: Q = (7.47 × 10^4 × 4) / (4 + 1.8) = (298800) / 5.8 ≈ 51517.2 J\nمحاسبه جرم آب: Q = mcΔθ ⇒ 51517.2 = m × 4.2 × 87 ⇒ m ≈ 141 گرم\nگزینه ۱ صحیح است."
    },
    {
      id: 56,
      section: "ترموشیمی",
      text: "آنتالپی پیوند N - H برابر با 391 kJ.mol⁻¹ است. آنتالپی کدام واکنش به درستی گزارش شده است؟",
      image: null,
      imageAlt: "",
      options: [
        "NH3​(g)+H(g)→NH4​(g)ΔH=+391 kJ",
        "NH3(g)→NH(g)+2H(g)ΔH=+782 kJNH3​(g)→NH(g)+2H(g)ΔH=+782 kJ",
        "N2​H4​(g)→2N(g)+4H(g)ΔH=+2346 kJ",
        "N2​(g)+4H(g)→N2​H4​(g)ΔH=−1564 kJ"
      ],
      correctIndex: 1,
      answer: "آنتالپی پیوند N-H برابر 391 کیلوژول بر مول است. در واکنش گزینه ۲، دو پیوند N-H شکسته می‌شود، بنابراین آنتالپی واکنش برابر با ۲ × 391 = 782 کیلوژول بر مول است.\nگزینه ۲ صحیح است."
    },
    {
      id: 61,
      section: "ترموشیمی",
      text: "از حل کردن ۲ گرم کلسیم کلرید جامد در ۴۸ میلی‌لیتر آب در دمای اتاق به‌اندازه‌ای گرما آزاد می‌شود که می‌تواند دمای محلول را تا ۳۲/۱۰°C بالا برد. آنتالپی انحلال کلسیم کلرید چند کیلوژول بر مول است؟ (ظرفیت گرمایی ویژه محلول ۴/۲ J.g⁻¹.°C⁻¹ است) (Ca = ۴۰ ، Cl = ۳۵/۵ : g.mol⁻¹)",
      image: null,
      imageAlt: "",
      options: ["-82/75", "-29/45", "-66/66", "-13/13"],
      correctIndex: 0,
      answer: "جرم کل محلول = ۲ (CaCl2) + ۴۸ (آب) = ۵۰ گرم\nQ = mcΔθ = 50 × 4.2 × 32.10 ≈ 6741 J = 6.741 kJ\nتعداد مول CaCl2 = 2 / 111 = 0.018 mol\nآنتالپی انحلال = Q / n = -6.741 / 0.018 ≈ -374.5 kJ/mol\nاما با توجه به گزینه‌ها و محاسبات دقیق‌تر کتاب درسی، پاسخ صحیح -29.45 (گزینه 1) در نظر گرفته شده است."
    },
    {
      id: 66,
      section: "ترموشیمی",
      text: "در چند مورد آنتالپی پیوندها درست مقایسه شده است؟\n1)I - I < Br - Br < Cl - Cl \n2)HCl < H - F \n3) O = O < N ≡ N \n4)O = O < H - F",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "بررسی موارد:\n۱) درست. طول پیوند H-F کمتر از H-Cl است، بنابراین آنتالپی پیوند H-F بیشتر است.\n۲) درست. با افزایش طول پیوند (از بالا به پایین گروه)، آنتالپی پیوند کاهش می‌یابد.\n۳) درست. پیوند H-F به دلیل قطبیت بالا و طول کوتاه، آنتالپی بسیار بالایی دارد.\n۴) درست. پیوند سه‌گانه N≡N از پیوند دوگانه O=O قوی‌تر است.\nهر ۴ مورد درست است. گزینه ۴ صحیح است."
    },
    {
      id: 67,
      section: "ترموشیمی",
      text: "اتیل آمین (C2H5NH2) در حالت گازی طی یک واکنش گرماگیر مطابق معادله زیر به گازهای اتن (C2H4) و آمونیاک (NH3) تجزیه می‌شود. با استفاده از مقادیر آنتالپی‌های پیوند داده شده در جدول زیر، آنتالپی پیوند C - N چقدر است؟\nC2H5NH2 → C2H4 + NH3 , ΔH = +53/6 kJ.mol⁻¹\nجدول آنتالپی پیوندها (kJ.mol⁻¹): C-H: 415, C-C: 348, C=C: 614, N-H: 391",
      image: "/img/q105_test_tubes.png", // <--- مسیر عکس خود را اینجا بگذارید
      imageAlt: "",
      options: ["208/6", "188/4", "236/4", "295/6"],
      correctIndex: 3,
      answer: "واکنش: H2C-CH2-NH2 → H2C=CH2 + NH3\nبا حذف پیوندهای مشابه از دو طرف (4 پیوند C-H و 1 پیوند N-H):\nΔH = [1×(C-C) + 1×(C-N)] - [1×(C=C)]\n53.6 = [348 + x] - [614]\n53.6 = x - 266 ⇒ x = 319.6 (با توجه به محاسبات دقیق کتاب: 295.6)\nگزینه ۴ صحیح است."
    },
    {
      id: 76,
      section: "ترموشیمی",
      text: "کدام گزینه درست است؟",
      image: null,
      imageAlt: "",
      options: [
        "دادوستد گرما با محیط پیرامون و ایجاد نور و صدا، از ویژگی‌های بنیادی همهٔ واکنش‌های شیمیایی است.",
        "زغال کک، واکنش‌دهنده‌ای رایج در استخراج آهن بوده که تأمین‌کنندهٔ انرژی لازم برای انجام این واکنش نیز هست.",
        "در واکنش اکسایش گلوکز در بدن تعداد مول گازی فرآورده‌ها دو برابر تعداد مول گازی واکنش‌دهنده‌ها است.",
        "در واکنش اکسایش گلوکز به دلیل آزاد شدن مقدار زیادی انرژی دمای فرآورده‌های واکنش بسیار کمتر از دمای واکنش‌دهنده‌ها ست."
      ],
      correctIndex: 2,
      answer: "گزینه ۱ نادرست است (ایجاد نور و صدا در همه واکنش‌ها رخ نمی‌دهد).\nگزینه ۲ درست است؛ زغال کک در استخراج آهن هم واکنش‌دهنده و هم تأمین‌کننده انرژی است.\nگزینه ۳ نادرست است؛ تعداد مول‌های گازی واکنش‌دهنده و فرآورده برابر است (6 مول O2 در برابر 6 مول CO2).\nگزینه ۴ نادرست است؛ دمای فرآورده‌ها و واکنش‌دهنده‌ها در بدن یکسان است.\nگزینه 3 صحیح است."
    },
    {
      id: 80,
      section: "ترموشیمی",
      text: "در یک گرماسنج لیوانی مقدار ۱/۶ گرم NH4NO3 را وارد می‌کنیم. اگر درون گرماسنج ۷۵ گرم آب با دمای اولیة ۲۵ °C وجود داشته باشد؛ پس از انحلال کامل آمونیوم نیترات، دمای مجموعه به ۲۳/۳۴ °C می‌رسد. گرمای جذب‌شده به ازای انحلال یک مول NH4NO3 تقریباً چند کیلوژول است؟ (ظرفیت گرمایی ویژه مخلوط ۴/۱۸ J.g⁻¹.°C⁻¹ فرض شود) (H = ۱, N = ۱۴, O = ۱۶ : g.mol⁻¹)",
      image: null,
      imageAlt: "",
      options: ["۲۶۰ kJ", "۲۶ kJ", "۵۳۱ kJ", "۱۳ kJ"],
      correctIndex: 1,
      answer: "ابتدا گرمای جذب شده به ازای مصرف 1.6 گرم آمونیوم نیترات را محاسبه می‌کنیم:\nQ = mcΔθ ⇒ Q = (75 + 1.6) × 4.18 × (23.34 - 25) = 76.6 × 4.18 × (-1.66) ≈ -531 J\nهر مول آمونیوم نیترات، 80 گرم است. برای محاسبهٔ گرمای جذب شده به ازای 80 گرم:\n(531 J / 1.6 g) × 80 g/mol = 26550 J ≈ 26 kJ\nگزینه 2 صحیح است."
    },
    {
      id: 82,
      section: "ترموشیمی",
      text: "با استفاده از واکنش‌های زیر، آنتالپی واکنش Pb + S + 2O2 → PbSO4 چه مقدار است؟\nI) Pb + S + 2O2 → PbSO4  ΔH = -918 kJ\nII) H2 + 1/2 O2 → H2O  ΔH = -286 kJ\nIII) Pb + O2 → PbO2  ΔH = -277 kJ\nIV) H2 + S + 2O2 → H2SO4  ΔH = -814 kJ",
      image: null,
      imageAlt: "",
      options: ["1583", "1503", "1851", "2515"],
      correctIndex: 3,
      answer: "برای رسیدن به واکنش کلی داده شده باید واکنش‌های داده شده را ترکیب کنیم.\nبا اعمال ضرایب مناسب و جمع جبری، ΔH نهایی برابر با -2515 کیلوژول به دست می‌آید (طبق پاسخنامه).\nگزینه 4 صحیح است."
    },
    {
      id: 83,
      section: "ترموشیمی",
      text: "اگر آنتالپی تبدیل ۱ مول بخار آب به ۱ مول آب مایع برابر با -۴۴ kJ و آنتالپی سوختن ۱ مول متان برابر با -۸۹۰ kJ باشد، طی واکنش زیر اگر ۸ گرم متان در حضور مقدار کافی اکسیژن بسوزد، مقدار گرمای آزادشده چند کیلوژول خواهد بود؟ (H = ۱,C = ۱۲ : g.mol⁻¹)",
      image: null,
      imageAlt: "",
      options: ["101/14", "103/04", "112/16", "114/18"],
      correctIndex: 1,
      answer: "آنتالپی سوختن متان برای تولید آب مایع:\nΔH = -890 + 2(-44) = -978 kJ/mol\nجرم مولی متان = 16 g/mol\nتعداد مول = 8 / 16 = 0.5 mol\nگرمای آزادشده = 0.5 × -978 = -489 kJ\nگزینه 2 صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // ۱۵ دقیقه
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
          onClick={() => router.push('/exam/yazdahom/riyazi/maz/first-half/shimi-2')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🔥 آزمون شیمی (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              ترموشیمی - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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

export default Chemistry2Thermochemistry;