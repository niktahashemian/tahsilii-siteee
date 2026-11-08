/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// تعریف اینترفیس برای جلوگیری از خطای TypeScript
interface Question {
  id: number;
  section: string;
  text: string;
  options: string[];
  correctIndex: number;
  answer: string;
  Image?: string;
  ImageComponent?: React.FC;
}

// انتقال سوالات به بیرون از کامپوننت برای جلوگیری از هشدار useCallback
const questions: Question[] = [
  {
    id: 3,
    section: "گفتار سه: حواس",
    text: "کدام‌یک از تفاوت‌های حواس پیکری و حواس ویژه می‌باشد؟",
    options: [
      "حواس پیکری بر خلاف حواس ویژه پیام عصبی ایجادشده را به دستگاه عصبی مرکزی می‌فرستد.",
      "تحریک گیرندۀ حواس ویژه به صورت تغییر در نفوذپذیری غشای آن‌ها می‌باشد.",
      "گیرندۀ حواس پیکری بر خلاف گیرندۀ حواس ویژه در بخش‌های گوناگون بدن پراکنده هستند.",
      "حواس ویژه بر خلاف حواس پیکری دارای گیرندۀ نوری نمی‌باشند."
    ],
    correctIndex: 2,
    answer: "گیرنده‌های حواس پیکری در بخش‌های گوناگون بدن (پوست، ماهیچه‌ها، مفاصل و اندام‌های داخلی) پراکنده هستند، در حالی که گیرنده‌های حواس ویژه در اندام‌های حسی خاص (چشم، گوش، بینی و زبان) متمرکز هستند. گزینه ۳ صحیح است."
  },
  {
    id: 7,
    section: "گفتار سه: حواس",
    text: "............. وجه .......... حواس پیکری و حواس ویژه این است که",
    options: [
      "تشابه - هر دو در اندام های خاصی از بدن استقرار یافته و پراکنده نیستند",
      "تشابه - برخی از گیرندهای مرتبط با آن ها از نوع دمایی و درد هستند",
      "تفاوت - تنها در یک گروه از آن ها اول لوب پس سری تحریک می شود...",
      "تفاوت - فقط گیرندهای یکی از آن ها توانایی ایجاد پیام عصبی دارد"
    ],
    correctIndex: 2,
    answer: "تفاوت حواس پیکری و ویژه در این است که پیام‌های حواس ویژه (مثل بینایی) ابتدا به تالاموس و سپس به بخش‌های خاصی از قشر مخ (مثل لوب پس‌سری برای بینایی) می‌روند، در حالی که حواس پیکری به قشر حسی-پیکری (لوب آهیانه‌ای) می‌روند. گزینه ۳ صحیح است."
  },
  {
    id: 12,
    section: "گفتار سه: حواس",
    text: "شکل زیر گیرندۀ .......... را نمایش می دهد و قسمت .......... است.",
    options: [
      "فشار A ، غلاف پوشش پیوندی چندالیه",
      "لمس B ، پایانۀ آکسونی الیه الیه",
      "فشار B ، انتهای دندریتی چندالیه",
      "لمس A ، پوشش پیوندی الیه الیه"
    ],
    correctIndex: 2,
    answer: "شکل مربوط به گیرنده فشار (جسمک پاچینی) است. بخش A غلاف پوشش پیوندی و بخش B انتهای دندریتی (آکسون) نورون حسی است که در مرکز قرار دارد. گزینه ۳ صحیح است.",
    Image: "/images/q12.png" // تصویر گیرنده فشار (لطفا تصویر را در این مسیر قرار دهید)
  },
  {
    id: 18,
    section: "گفتار سه: حواس",
    text: "کدام گزینه، عبارت زیر را به درستی تکمیل می کند؟ \"می توان گفت ............\"",
    options: [
      "گيرندۀ حس وضعيت در ماهيچۀ چهارسر بر خلاف ماهيچۀ قلبي يافت مي شود.",
      "گيرندۀ دمایی موجود در تالاموس به تغییرات دمای محیط حساس است.",
      "گيرنده های درد فقط پس از آسیب جدی بافت، مغز را از اثر متحرک آگاه می کنند.",
      "در سرخرگ آئورت فقط گیرندۀ حساس به فشار خون یافت می شود."
    ],
    correctIndex: 0,
    answer: "گیرنده‌های حس وضعیت (دوک‌های عضلانی) در ماهیچه‌های اسکلتی مانند چهارسر ران یافت می‌شوند، اما ماهیچه قلبی فاقد این گیرنده‌هاست. گزینه ۱ صحیح است."
  },
  {
    id: 23,
    section: "گفتار سه: حواس",
    text: "نمی توان گفت ............",
    options: [
      "گیرنده های درد در بخش های درونی بدن مانند دیوارۀ سرخرگ ها قرار دارند.",
      "گیرنده های دمایی درون بدن به تغییرات دمای درونی و بیرونی بدن حساس هستند.",
      "گیرندۀ درد بر خلاف گیرندۀ فشار دارای انتهای دارینه ای (دندریتی) آزاد می باشد.",
      "بسیاری گیرنده ها وقتی مدتی در معرض محرک ثابتی قرار گیرند، پیام عصبی کمتری ایجاد می کنند."
    ],
    correctIndex: 1,
    answer: "گیرنده‌های دمایی درون بدن (مانند هیپوتالاموس) بیشتر به دمای درونی خون حساس هستند، نه به تغییرات دمای بیرونی. گزینه ۲ نادرست است."
  },
  {
    id: 29,
    section: "گفتار سه: حواس",
    text: "چند عبارت، در رابطه با گیرنده های دمایی حواس پیکری، به طور درستی بیان شده است؟\nالف) درک گرما یا سرما توسط این گیرنده ها در بخش هایی از سطح یا درون بدن رخ می دهد.\nب) الزاما همه این گیرنده ها ماهیت مکانیکی داشته و تغییرات دمایی را دریافت می کنند.\nج) همواره در بخش هایی از درون بدن مانند برخی سیاهرگ های بزرگ جای دارند.\nد) برخلاف گیرنده های تماسی در پوست پوشاننده سطح بدن یافت نمی شوند.",
    options: ["صفر", "1", "2", "3"],
    correctIndex: 0,
    answer: "طبق کلید، هیچ یک از عبارت‌ها به طور کامل درست نیستند (گزینه ۱). گیرنده‌های دمایی در پوست و اندام‌های داخلی هستند، الزاماً مکانیکی نیستند و در پوست هم یافت می‌شوند."
  },
  {
    id: 34,
    section: "گفتار سه: حواس",
    text: "در بدن انسان همۀ گیرنده های از نوع گیرندۀ زیر، فقط ..........",
    options: [
      "در ماهیچه های اسکلتی و کپسول پوشانندۀ مفصل ها قرار دارند.",
      "به دنبال تغییر طول ماهیچه تحریک شده و پیام عصبی تولید می کنند.",
      "چگونگی قرارگیری قسمت های مختلف بدن را حین حرکت به مغز اطلاع می دهند.",
      "انتهایی از دندریت نورون حسی هستند و به محرک های مکانیکی پاسخ می دهند."
    ],
    correctIndex: 2,
    answer: "شکل مربوط به دوک عضلانی (گیرنده حس وضعیت) است. این گیرنده‌ها اطلاعات مربوط به وضعیت و حرکات بدن را به مغز می‌فرستند. گزینه ۳ صحیح است.",
    Image: "/images/q34.png" // تصویر دوک عضلانی (لطفا تصویر را در این مسیر قرار دهید)
  },
  {
    id: 41,
    section: "گفتار سه: حواس",
    text: "کدام گزینه برای تکمیل عبارت داده شده، مناسب است؟ \"عوامل مختلفی در تحریک گیرنده های بدن و ایجاد پیام عصبی در آن ها، مؤثر هستند. در رابطه با این عوامل و سازوکار آن ها می توان گفت ..........\"",
    options: [
      "هر گیرنده موجود در وسیع ترین اندام بدن، تنها توسط یک نوع خاصی از این عوامل تحریک می شود.",
      "تغییر شکل در اثر فشار، مکانیسم مشابه مورد استفاده برای تحریک همۀ گیرنده های حواس پیکری است.",
      "حضور مواد شیمیایی خاص همانند تغییرات ناگهانی دما می تواند غلظت یون ها در مایع بین یاخته ای را تغییر دهد.",
      "عامل تحریک کنندۀ گیرنده های درد هیچ گاه نمی تواند گیرنده های موجود در برخی سیاهرگ های بزرگ را تحریک کند."
    ],
    correctIndex: 0,
    answer: "طبق کلید، گزینه ۱ صحیح است (گیرنده‌های پوست می‌توانند توسط محرک‌های مختلف تحریک شوند، اما این عبارت در کتاب به صورت خاصی مطرح شده است)."
  },
  {
    id: 46,
    section: "گفتار سه: حواس",
    text: "کدام گزینه در مورد گیرنده فشار در پوست صحیح نیست؟",
    options: [
      "پوشش پیوندی فقط انتهای بدون میلین دارینه (ندریت) نورون حسی را می پوشاند.",
      "تحت فشار قرارگرفتن پوشش پیوندی گیرنده، کانال های دریچه دار سدیم را باز می کند.",
      "بعد از تبدیل اثر محرک به پیام عصبی، پتانسیل عصبی درون دارینه (ندریت) حسی منفی می شود.",
      "پوشش پیوندی اطراف این گیرنده منعطف و چند لایه است."
    ],
    correctIndex: 2,
    answer: "با باز شدن کانال‌های سدیمی، یون سدیم وارد دندریت شده و پتانسیل درون آن مثبت می‌شود (دپلاریزاسیون). بنابراین گزینه ۳ نادرست است."
  },
  {
    id: 50,
    section: "گفتار سه: حواس",
    text: "در مکانیسم شنوایی",
    options: [
      "در تمام بخش های گوش انتقال صوت به شکل مکانیکی است.",
      "استخوان گیج گاهی و مواد ترشح شده از غده های درون مجرا، تنها عوامل حفاظتی سیستم شنوایی هستند.",
      "ادامه گیرنده های مژک دار شنوایی عصب شنوایی را می سازد که به تنهایی عصب گوش را تشکیل می دهد.",
      "لرزش مایع درون حلزونی، یاخته هایی را که با پوشش ژالتینی در تماس اند را تحریک می کند."
    ],
    correctIndex: 3,
    answer: "در بخش حلزونی گوش، لرزش مایع درون آن باعث خم شدن مژک‌های یاخته‌های مژک‌دار می‌شود که با ماده ژلاتینی (پوشش تکتوریال) در تماس هستند و پیام عصبی تولید می‌شود. گزینه ۴ صحیح است."
  }
];

export default function ZistShenasi2ExamPage() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 دقیقه برای 10 سوال
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
  }, [selectedAnswers]);

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
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/zist-shenasi-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧠 آزمون زیست‌شناسی (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              درس دوم: حواس (گفتار سه) - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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
                        color: isSelected ? '#fff' : '#000', flexShrink: 0
                      }}>{String.fromCharCode(65 + idx)}</span>
                      <span>{opt}</span>
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
                    <span style={{ fontSize: '15px', marginRight: '5px' }}>{q.options[q.correctIndex]}</span>
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