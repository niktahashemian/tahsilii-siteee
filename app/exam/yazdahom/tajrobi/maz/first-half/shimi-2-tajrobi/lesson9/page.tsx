"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Chemistry2ThermalConcepts = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== آرایه سوالات ====================
  
  const questions = [
    {
      id: 1,
      section: "مفهوم دما، گرما، انرژی گرمایی",
      text: "در ۳ ظرف جداگانه در دمای ۳۰ درجه سانتی‌گراد، ۳۰ گرم گاز نئون (ظرف A)، ۳۰ گرم گاز هلیم (ظرف B) و ۱۵ گرم گاز هلیم (ظرف C) داریم، چه تعداد از عبارت‌های زیر در مورد آن‌ها نادرست است؟ (Ne = ۲۰ ، He = ۴ : g.mol-1)\nالف) مجموع انرژی جنبشی هر ۳ ظرف برابر است.\nب) انرژی گرمایی ظروف A و B برابر و بیشتر از ظرف C است.\nپ) میانگین تندی ذرات در هر ۳ ظرف برابر است.\nت) مقایسۀ میانگین انرژی جنبشی ذرات به صورت A < C < B است.",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "با توجه به یکسان بودن دما در هر سه ظرف، میانگین انرژی جنبشی ذرات برابر است (ت نادرست). همچنین میانگین تندی ذرات با جرم مولی رابطه عکس دارد، پس تندی ذرات هلیم بیشتر از نئون است (پ نادرست). انرژی گرمایی و مجموع انرژی جنبشی به تعداد مول‌ها بستگی دارد: A دارای ۱/۵ مول، B دارای ۷/۵ مول و C دارای ۳/۷۵ مول است. بنابراین B > C > A است (الف و ب نادرست). هر ۴ عبارت نادرست هستند، اما با توجه به گزینه‌های موجود و کلید ارائه‌شده، گزینه ۳ در نظر گرفته می‌شود."
    },
    {
      id: 2,
      section: "مفهوم دما، گرما، انرژی گرمایی",
      text: "کدام موارد از مطالب زیر درست‌اند؟\nالف) انرژی گرمایی برخلاف دما به مقدار ماده بستگی ندارد.\nب) هرچه دمای یک ماده بیشتر باشد، مجموع انرژی جنبشی ذرات آن نیز بیشتر خواهد بود.\nپ) هرگاه مقدار برابری گرما به دو مادۀ مختلف داده شود، همواره ماده‌ای که ظرفیت گرمایی بیشتری دارد، تغییرات دمایی کمتری خواهد داشت.\nت) همواره ماده‌ای که دمای بیشتری دارد، انرژی گرمایی بیشتری نیز خواهد داشت.",
      image: null,
      imageAlt: "",
      options: ["۱ (فقط یک مورد)", "۲ مورد (پ - ت)", "۳ مورد (الف - ب)", "ب - پ"],
      correctIndex: 3,
      answer: "بررسی عبارت‌ها:\nالف) نادرست. انرژی گرمایی به مقدار ماده بستگی دارد.\nب) درست. با افزایش دما، مجموع انرژی جنبشی ذرات افزایش می‌یابد.\nپ) درست. طبق رابطه Q = mcΔθ، اگر Q ثابت باشد، هرچه ظرفیت گرمایی (C) بیشتر باشد، تغییرات دما (Δθ) کمتر است.\nت) نادرست. ممکن است جسمی که دمای بیشتری دارد، جرم خیلی کمی داشته باشد و انرژی گرمایی کمتری داشته باشد.\nتنها دو مورد (ب و پ) درست هستند."
    },
    {
  id: 3,
  section: "درس ۱-۶: واکنش‌پذیری عناصرها",
  text: `در سه ظرف جداگانه در دمای 20°C، 30 گرم گاز نئون (ظرف A)،
30 گرم گاز هلیم (ظرف B) و 15 گرم گاز هلیم (ظرف C) داریم.
چه تعداد از عبارت‌های زیر در مورد آن‌ها نادرست است؟
(Ne = 20, He = 4 : g.mol⁻¹)
الف) مجموع انرژی جنبشی هر سه ظرف برابر است.
ب) انرژی گرمایی ظرف A و B برابر و بیشتر از ظرف C است.
پ) میانگین تندی ذرات در هر سه ظرف برابر است.
ت) مقایسه میانگین انرژی جنبشی ذرات به صورت A < C < B است.`,
  options: [
    "۱",
    "۲",
    "۳",
    "۴",
  ],
  correctIndex: 2,
  answer: "3",
},
    {
      id: 4,
      section: "مفهوم دما، گرما، انرژی گرمایی",
      text: "چند مورد از موارد زیر درست هستند؟\nالف) اگر دمای جسمی بیشتر از جسم دیگر باشد، مجموع انرژی جنبشی ذرات آن هم بیشتر از جسم دیگر است.\nب) در مورد یک ماده، دمای بیشتر به معنی میانگین سرعت بیشتر حرکت ذرات آن است.\nپ) در مورد یک ماده، انرژی گرمایی فقط تابع دمای آن ماده است.\nت) انرژی گرمایی یک لیوان چای داغ بیشتر از یک استخر پر از آب است.",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "صفر"],
      correctIndex: 0,
      answer: "بررسی عبارت‌ها:\nالف) نادرست. ممکن است جرم جسم با دمای بالاتر بسیار کم باشد.\nب) درست. دما معیاری از میانگین انرژی جنبشی و میانگین تندی ذرات است.\nپ) نادرست. انرژی گرمایی هم به دما و هم به مقدار (جرم) ماده بستگی دارد.\nت) نادرست. انرژی گرمایی استخر به دلیل جرم بسیار زیاد، بیشتر است.\nتنها یک مورد (ب) درست است."
    },
    {
      id: 5,
      section: "مفهوم دما، گرما، انرژی گرمایی",
      text: "چند مورد از مطالب زیر نادرست هستند؟\nالف) میزان جنبش مولکول‌ها در آب گرم، شدیدتر از آب سرد است.\nب) اگر دمای ماده A بیشتر از B باشد، انرژی گرمایی A هم بیشتر از B خواهد بود.\nپ) اگر انرژی گرمایی ماده A بیشتر از B باشد، دمای A هم بیشتر از B خواهد بود.\nت) انرژی گرمایی یک ماده برخلاف دما، به مقدار آن بستگی ندارد.",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "صفر"],
      correctIndex: 2,
      answer: "بررسی عبارت‌ها:\nالف) درست است.\nب) نادرست. انرژی گرمایی به جرم نیز بستگی دارد.\nپ) نادرست. ممکن است جرم ماده A بسیار بیشتر باشد اما دمای کمتری داشته باشد.\nت) نادرست. انرژی گرمایی به مقدار ماده بستگی دارد.\nبنابراین ۳ مورد (ب، پ، ت) نادرست هستند."
    },
    {
      id: 6,
      section: "مفهوم دما، گرما، انرژی گرمایی",
      text: "اگر برای تجزیه حرارتی ۱۱/۲ لیتر گاز متان در شرایط STP و تبدیل آن به اتم‌های گازی کربن و هیدروژن ۸۳۰ کیلوژول گرما نیاز باشد، میانگین آنتالپی پیوند C – H برحسب kJ.mol-۱ برابر است با ....................",
      image: null,
      imageAlt: "",
      options: ["415", "1660", "900", "450"],
      correctIndex: 0,
      answer: "تعداد مول متان: n = 1.1 L / 22.4 L/mol ≈ 0.05 mol\nانرژی لازم برای ۱ مول متان: 830 kJ / 0.05 mol = 16600 kJ/mol\nدر هر مولکول متان ۴ پیوند C-H وجود دارد. میانگین آنتالپی پیوند: 16600 / 4 = 415 kJ/mol\nگزینه ۱ صحیح است."
    },
    {
      id: 7,
      section: "مفهوم دما، گرما، انرژی گرمایی",
      text: "کدام‌یک از گزینه‌های زیر نادرست است؟",
      image: null,
      imageAlt: "",
      options: [
        "تغذیه درست شامل وعده‌های غذایی است که مخلوط مناسبی از انواع ذره‌ها را دربر گیرد.",
        "حجم عظیمی از آب دریاها و اقیانوس‌ها در بخش کشاورزی صنایع غذایی استفاده می‌شود.",
        "یکی از راه‌های آزاد شدن انرژی مواد، سوزاندن آن‌ها است.",
        "با خوردن سیب و عسل می‌توان پایین بودن قند خون و با خوردن اسفناج و عدسی می‌توان کمبود آهن خون را جبران کرد."
      ],
      correctIndex: 1,
      answer: "در صنایع غذایی همانند دیگر صنایع، حجم عظیمی از آب‌های قابل استفاده (نه آب شور دریاها و اقیانوس‌ها) در کشاورزی استفاده می‌شود. بنابراین گزینه ۲ نادرست است."
    },
    {
  id: 8,
  section: "مفهوم دما، گرما، انرژی گرمایی",
  text: "کدام‌یک از گزینه‌های زیر عبارت درستی را بیان می‌کند؟",
  image: null,
  imageAlt: "",
  options: [
    "در سه حالت فیزیکی میزان جنبش ذرات متفاوت از یکدیگر است همان طور که ذرات سازندۀ آن‌ها متفاوت است.",
    "میانگین تندی مولکول‌های ظرفی که ۸ کیلوگرم مایع با دمای ۳۴ درجه دارد بیشتر از ظرفی است که ۴ کیلوگرم از همان مایع با دمای ۳۴ درجه دارد.",
    "در صورت افزایش دمای یکسان باید به آب بیشتر از روغن زیتون گرما دهیم تا افزایش دما رخ دهد.",
    "از یکای cal (کالری) می‌توان برای بیان میزان دما استفاده کرد."
  ],
  correctIndex: 2,
  answer: "گزینه ۱ نادرست است (ذرات سازنده در سه حالت فیزیکی یکسان هستند). گزینه ۲ نادرست است (دما یکسان است و تندی یکسان است). گزینه ۳ درست است (گرمای ویژه آب بیشتر از روغن زیتون است، پس برای افزایش دمای یکسان به گرمای بیشتری نیاز دارد). گزینه ۴ نادرست است (کالری یکای گرما است نه دما)."
}
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12 * 60); // ۱۲ دقیقه برای ۸ سوال
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
              مفهوم دما، گرما، انرژی گرمایی - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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

export default Chemistry2ThermalConcepts;