"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Chemistry2MetalCycle = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== آرایه سوالات ====================
  // برای سوال ۲۹۵، مسیر عکس خود را در فیلد image قرار دهید.
  
  const questions = [
      
      {
        id: 286,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "کدام گزینۀ زیر نادرست است؟",
        image: null,
        imageAlt: "",
        options: [
          "استفاده از گیاهان برای استخراج فلزات نیکل و روی مقرون به صرفه نیست.",
          "از براده‌های آهن حاصل از واکنش ترمیت برای جوش دادن خطوط راه آهن استفاده می‌کنند.",
          "واکنش‌پذیری فلز آلومینیم بیشتر از آهن است.",
          "از آهن (III) اکسید به‌عنوان رنگ قرمز در نقاشی استفاده می‌شود."
        ],
        correctIndex: 1,
        answer: "گزینه 2 نادرست است. طبق متن کتاب، روی و نیکل فلزات کمیابی نیستند و درصد آن‌ها در سنگ معدن به قدری هست که نیازی به گیاه‌پالایی نباشد، اما برای استخراج فلزاتی مانند طلا که درصد آن‌ها در سنگ معدن کم است، گیاه‌پالایی مقرون‌به‌صرفه می‌باشد."
      },
      {
        id: 288,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "چه تعداد از عبارت‌های زیر درست می‌باشد؟\nالف) خواص فیزیکی شبه فلزها بیشتر شبیه نافلزها و رفتار شیمیایی آن‌ها همانند فلزهاست.\nب) بیشترین خصلت نافلزی مربوط به عنصری است که ۵ الکترون با l = 1 دارد.\nپ) استفاده از گیاهان برای بیرون کشیدن فلزاتی که درصد آن‌ها در سنگ معدن بیشتر یا مساوی ۲٪ باشد مقرون به صرفه نیست.\nت) به دلیل بازیافت، می‌توان فلزات را منابعی تجدیدپذیر در نظر گرفت.\nث) برخی از مزایای طلا امکان ساخت نخ طلا و تغییر رسانایی الکتریکی آن در دماهای گوناگون است.",
        image: null,
        imageAlt: "",
        options: ["۱", "۲", "۳", "۴"],
        correctIndex: 2,
        answer: "الف) نادرست. خواص فیزیکی شبه‌فلزها بیشتر به فلزها شبیه است و رفتار شیمیایی آن‌ها همانند نافلزها.\nب) درست.\nپ) درست.\nت) نادرست. به دلیل اینکه آهنگ مصرف بیشتر از برگشت است، تجدیدپذیر نیستند.\nث) درست.\nبنابراین ۳ مورد درست است. گزینه ۳ صحیح است."
      },
      {
        id: 289,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "همۀ مطالب زیر نادرست‌اند، به‌جز:",
        image: null,
        imageAlt: "",
        options: [
          "در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود.",
          "آهنگ مصرف و استخراج فلز با آهنگ برگشت فلز به طبیعت به شکل سنگ معدن یکسان است.",
          "بازیافت فلزها و ازجمله فلز آهن ردپای کربن دی اکسید را افزایش می دهد.",
          "غلظت بیشتر گونه‌های فلزی موجود در زمین نسبت به ذخایر اقیانوسی، بهره‌برداری از این منابع را نوید می‌دهد."
        ],
        correctIndex: 0,
        answer: "گزینه ۱ درست است (تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود). گزینه ۲ نادرست (آهنگ مصرف بسیار بیشتر است). گزینه ۳ نادرست (بازیافت باعث کاهش ردپای کربن می‌شود). گزینه ۴ نادرست (غلظت در اقیانوس‌ها بیشتر است). گزینه ۱ صحیح است."
      },
      {
        id: 290,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "کدام گزینه نادرست است؟",
        image: null,
        imageAlt: "",
        options: [
          "فلزات منابعی تجدیدناپذیر هستند که بازیافت آن‌ها سبب کاهش ردپای کربن دی‌اکسید می‌شود.",
          "واکنش ترمیت نشان می‌دهد که واکنش‌پذیری آلومینیم از آهن بیشتر است.",
          "هرچه فلز فعال‌تر باشد میل بیشتری به ایجاد ترکیب داشته و ترکیب‌هایش پایداری بیشتری از خودش دارد.",
          "به‌طورکلی در واکنش‌هایی که به‌شکل طبیعی انجام می‌شوند واکنش‌پذیری فرآورده‌ها بیشتر از واکنش‌دهنده‌ها است."
        ],
        correctIndex: 3,
        answer: "گزینه ۴ نادرست است. در واکنش‌هایی که به شکل طبیعی انجام می‌شوند، واکنش‌پذیری فرآورده‌ها کمتر از واکنش‌دهنده‌ها است. سایر گزینه‌ها درست هستند."
      },
      {
        id: 291,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "کدام‌یک از گزینه‌های زیر نادرست است؟",
        image: null,
        imageAlt: "",
        options: [
          "از بازیافت ۳ قوطی فولادی آن قدر انرژی ذخیره می شود که می توان لامپ ۶۰ واتی را حدود ۲۵ ساعت روشن نگه داشت.",
          "در فرآیند استخراج 1000 kg آهن تقریباً 2000 kg سنگ معدن آن و 1000 kg از منابع معدنی دیگر استفاده می شود.",
          "نفت خام مایع غلیظ و سیاه رنگ یا قهوه ای مایل به سبز است.",
          "در صورت بازیافت فلزات گونه‌های زیستی کمتری از بین می‌روند."
        ],
        correctIndex: 0,
        answer: "گزینه ۱ نادرست است. طبق کتاب درسی، از بازیافت ۷ قوطی فولادی (نه ۳ قوطی) آن‌قدر انرژی ذخیره می‌شود که می‌توان یک لامپ ۶۰ واتی را حدود ۲۵ ساعت روشن نگه داشت."
      },
      {
        id: 292,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "دربارة \"بازیافت فلزها\" چند مورد از موارد زیر نادرست است؟\nالف) موجب اتلاف بیشتر انرژی می‌شود.\nب) موجب کاهش سرعت گرمایش کرة زمین می‌شود.\nپ) تأثیری بر حفظ گونه‌های زیستی ندارد.\nت) به توسعه پایدار کمک می‌کند.\nث) ردپای زیست محیطی انسان را کاهش می‌دهد.",
        image: null,
        imageAlt: "",
        options: ["۱", "۲", "۳", "۴"],
        correctIndex: 0,
        answer: "الف) نادرست. بازیافت موجب کاهش اتلاف انرژی می‌شود.\nب) درست.\nپ) نادرست. بر حفظ گونه‌های زیستی تأثیر دارد.\nت) درست.\nث) درست.\nبنابراین ۲ مورد نادرست است. گزینه 1 صحیح است."
      },
      {
        id: 293,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "چرخۀ جریان فلز از طبیعت به طبیعت کدام است؟",
        image: null,
        imageAlt: "",
        options: [
          "سنگ معدن - استخراج فلز - فلز استخراج شده به صورت آلیاژ و خالص استفاده می شود - فلز خورده و فرسایش می یابد و زنگ می زند و به طبیعت باز می گردد.",
          "سنگ معدن - استخراج فلز - فلز به شکل خالص استفاده می شود - فلز خورده و فرسایش می یابد و با زنگ زدن به طبیعت باز می گردد.",
          "سنگ معدن - استخراج فلز - فلزها در ترکیب با نافلزات به صورت ترکیبات یونی استفاده می شوند - فلز خورده و فرسایش می یابد و زنگ می زند و به طبیعت باز می گردد.",
          "سنگ معدن - فلز استخراج شده به صورت خالص یا آلیاژ آن در ساخت وسایل زندگی به کار می رود - فلزها از طریق فرسایش و زنگ زدن به طبیعت باز می گردند."
        ],
        correctIndex: 0,
        answer: "گزینه 1 صحیح است. چرخه کامل شامل سنگ معدن، استخراج فلز، استفاده خالص یا آلیاژ، و برگشت به طبیعت از طریق فرسایش و زنگ‌زدن است."
      },
      {
        id: 294,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "کدام‌یک از گزینه‌های زیر درست است؟",
        image: null,
        imageAlt: "",
        options: [
          "با قرار دادن فلز مس در محلول آهن (II) سولفات، پس از مدتی رنگ محلول تغییر کرده و رسوب تشکیل می‌شود.",
          "به دلیل واکنش‌پذیری بیشتر کربن نسبت به سدیم، در فولاد مبارکه از کربن برای استخراج آهن استفاده می‌شود.",
          "هرچه فلزی فعال‌تر باشد، میل بیشتری به ایجاد ترکیب دارد و ترکیب‌هایش پایداری بیشتری نسبت به فلز دارند.",
          "باتوجه به چرخه استخراج فلز و برگشت آن به طبیعت، می‌توان گفت فلزات منابعی تجدیدپذیرند."
        ],
        correctIndex: 2,
        answer: "گزینه ۱ نادرست است. مس نمی‌تواند آهن را در محلول جانشین کند (واکنش‌پذیری Fe > Cu).\nگزینه ۲ نادرست است. دلیل استفاده از کربن، دسترسی آسان و صرفه اقتصادی است، نه واکنش‌پذیری بیشتر.\nگزینه ۳ درست است. فلزات فعال تمایل زیادی به تشکیل ترکیب دارند و ترکیباتشان پایدارترند.\nگزینه ۴ نادرست است. فلزات منابع تجدیدناپذیر هستند.\nگزینه ۳ صحیح است."
      },
      {
        id: 295,
        section: "جریان فلز بین محیط زیست و جامعه",
        text: "باتوجه به شکل داده شده چند مورد از عبارت‌های زیر نادرست است؟\nالف) شکل فرآیند استخراج فلز از طبیعت و بازیافت آن به طبیعت را نشان می‌دهد.\nب) طبق شکل قانون پایستگی فلز در طبیعت برقرار نیست.\nپ) آهنگ مصرف و استخراج فلز بسیار بیشتر از آهنگ برگشت فلز به طبیعت به شکل سنگ معدن است.\nت) باتوجه به شکل، فلزها جزء منابع تجدیدپذیر هستند.",
        image: "/img/q295_metal_cycle.png", // <--- مسیر عکس خود را اینجا بگذارید
        imageAlt: "چرخه جریان فلز از طبیعت به طبیعت",
        options: ["۱", "۲", "۳", "۴"],
        correctIndex: 1,
        answer: "الف) درست. شکل چرخه استخراج و بازیافت را نشان می‌دهد.\nب) نادرست. قانون پایستگی ماده برقرار است.\nپ) درست. آهنگ مصرف بیشتر از برگشت است.\nت) نادرست. فلزات منابع تجدیدناپذیرند.\nبنابراین ۲ مورد نادرست است (ب و ت). گزینه ۲ صحیح است."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون شیمی (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              جریان فلز بین محیط زیست و جامعه - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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
                      <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>
                        {q.image}
                      </p>
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
                    
                    {/* رندر تصویر در پاسخنامه */}
                    {q.image && !imageErrors[q.id] && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px'
                      }}>
                        <img src={q.image} alt={q.imageAlt || `سوال ${q.id}`}
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

export default Chemistry2MetalCycle;