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
    id: 117,
    section: "گفتار دو: حواس ویژه",
    text: "کدام گزینه عبارت زیر را به درستی تکمیل می‌کند؟ \"ساختاری از مغز که در ............ نقش دارد ممکن نیست در ............ نقش داشته باشد\"",
    options: [
      "پردازش اطلاعات حسی - برقراری ارتباط بین بخش‌های حسی و حرکتی",
      "یادگیری درس زیست - تبدیل حافظۀ کوتاه مدت به حافظۀ بلندمدت",
      "تنظیم نیروی حاصل از خون به دیوارۀ رگها - انعکاس تخلیۀ ادرار",
      "تنظیم تنفس - تنظیم ترشح بزاق از سه جفت غدۀ بزرگ دهان"
    ],
    correctIndex: 2,
    answer: "بصل النخاع و هیپوتالاموس در تنظیم فشار خون نقش دارند، اما مرکز انعکاس تخلیۀ ادرار نخاع است. بنابراین ساختاری که در تنظیم فشار خون نقش دارد نمی‌تواند در انعکاس تخلیه ادرار نقش داشته باشد. گزینه ۳ صحیح است."
  },
  {
    id: 127,
    section: "گفتار دو: حواس ویژه",
    text: "دربارة دستگاه عصبی جاندارى كه سامانة دفعى به صورت لولة مالپيگى داشته و گياهخوار است، مى‌توان گفت ............",
    options: [
      "هر گرة عصبي در طناب عصبي آن، ممكن است از بندهاي مجاور هم پيام دريافت كند.",
      "فعالیت هر جفت از پاها توسط یک گرة عصبی جدای از سایرین کنترل می‌شود.",
      "مغز از چند گرة عصبی به هم جوش‌خورده تشکیل شده که به‌طناب‌های عصبی متصل است.",
      "بلندترین رشته‌های عصبی درون پاها، مربوط به پاهای جلویی و کوتاه‌ترین آن مربوط به پاهای عقبی است."
    ],
    correctIndex: 0,
    answer: "ملخ دارای لوله‌های مالپیگی (دفع) و گیاهخوار است. در دستگاه عصبی ملخ، هر گره عصبی در طناب عصبی می‌تواند از بندهای مجاور هم پیام دریافت کند. گزینه ۱ صحیح است.",
  },
  {
    id: 138,
    section: "گفتار دو: حواس ویژه",
    text: "مرکز تنظیم تعادل بدن، در پشت قسمتی از مغز قرار گرفته است. کدام عبارت، مشخصه همه بخش های این قسمت می باشد؟",
    options: [
      "در تنظیم ترشح مواد موثر در خط اول دفاعی بدن نقش دارند",
      "وضعیت کانال‌های غشایی یاخته‌های آن تغییر می‌کنند",
      "در تنظیم پاسخ‌های سریع و غیرارادی ماهیچه‌ها نقش دارند",
      "موجب تنظیم فعالیت ماهیچه‌های تنفسی می‌شوند"
    ],
    correctIndex: 1,
    answer: "مرکز تعادل مخچه است که در پشت ساقه مغز قرار دارد. منظور بخش ساقه مغز است. تمام یاخته‌های عصبی ساقه مغز با تحریک، پتانسیل و وضعیت کانال‌های غشایی خود را تغییر می‌دهند. گزینه ۲ صحیح است."
  },
  {
    id: 150,
    section: "گفتار دو: حواس ویژه",
    text: "کدام عبارت صحیح می‌باشد؟",
    options: [
      "اعصاب خودمختار اکثر مواقع فعال هستند و فعالیت ناآگاهانه دارند",
      "اعصاب پیکری همواره حامل پیام‌های عصبی آگاهانه هستند",
      "اعصاب پیکری همواره حامل پیام‌های حرکتی‌اند که به سلول‌هایی مختلط با چندین هسته عصب‌دهی می‌کنند",
      "اعصاب حاوی پیام‌های حرکتی غیرارادی همواره اعصاب هم‌حس و پادهم‌حس هستند"
    ],
    correctIndex: 2,
    answer: "اعصاب پیکری همواره دارای پیام‌های حرکتی‌اند که به سلول‌هایی مختلط با چندین هسته (ماهیچه‌های اسکلتی) عصب‌دهی می‌کنند. گزینه ۳ صحیح است."
  },
  {
    id: 160,
    section: "گفتار دو: حواس ویژه",
    text: "کدام عبارت، دربارۀ بخش‌های مختلف مغز گوسفند، نادرست است؟",
    options: [
      "در زیر بطن اول و دوم و جلوی بطن سوم، رابط بین تالاموس‌ها قرار دارد.",
      "در لبة پايين تالاموس‌ها، اپي‌فيز و در پشت آن، بطن سوم قابل مشاهده هستند.",
      "اتصال محکم تالاموس‌ها به هم با یک رابط، جداکردن آن‌ها را از هم مشکل می‌کند.",
      "پس از برش کرمنه در امتداد شیار بین دو نیمکرۀ مخچه، بیش از یک ساختار دیده می‌شود."
    ],
    correctIndex: 2,
    answer: "بطن سوم در عقب تالاموس‌ها قرار دارد، نه در پشت اپی‌فیز. گزینه 3 نادرست است."
  },
  {
    id: 170,
    section: "گفتار دو: حواس ویژه",
    text: "مطابق شکل زیر، کدام عبارت به درستی بیان نشده است؟",
    options: [
      "به دنبال مصرف نوشیدنی‌های الکلی، فعالیت یاخته‌های عصبی در بخش (1) با اختلال مواجه می‌شود.",
      "بخش (2) می‌تواند بسیاری از اطلاعات وارد شده به مغز را به طور کامل تقویت و پردازش نماید.",
      "بخش (4)، مسیر عبور پیام‌های حسی و حرکتی در بخش مرکزی دستگاه عصبی انسان است.",
      "بخش (3) دارای چهار برجستگی است که هیچ کدام از آن‌ها به پل مغزی متصل نیستند."
    ],
    correctIndex: 1,
    answer: "بخش (2) تالاموس است. تالاموس محل پردازش اولیه و تقویت اطلاعات حسی است، نه پردازش کامل. پردازش نهایی در قشر مخ انجام می‌شود. گزینه ۲ نادرست است.",
    Image: "/img/q170.png" // تصویر مغز (لطفا تصویر را در این مسیر قرار دهید)
  },
  {
    id: 185,
    section: "گفتار دو: حواس ویژه",
    text: "چند مورد برای تکمیل عبارت زیر مناسب است؟ \"به‌منظور ...... به‌طور حتم باید ......\"\nالف) انقباض ماهیچه صاف - ناقل عصبی تحریکی روی آن تأثیر بگذارد.\nب) انجام هرگونه انقباض غیرارادی ماهیچه - دستگاه عصبی خودمختار فعالیت کند.\nج) انجام هرگونه انقباض ارادی ماهیچه - دستگاه عصبی پیکری فعالیت نماید.\nد) انقباض ماهیچه مخطط - ناقل عصبی تحریکی روی آن تأثیر بگذارد.",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    answer: "فقط مورد (ج) درست است. الف) نادرست (ماهیچه صاف می‌تواند تحت تأثیر هورمون هم باشد). ب) نادرست (انعکاس‌ها غیرارادی هستند اما توسط دستگاه پیکری کنترل می‌شوند). د) نادرست (ماهیچه قلبی مخطط است اما خودبه‌خودی منقبض می‌شود). گزینه 3 صحیح است."
  },
  {
    id: 204,
    section: "گفتار دو: حواس ویژه",
    text: "کدام گزینه، در ارتباط با فعالیت تشریح مغز گوسفند عبارت زیر را به درستی تکمیل می‌کند؟ \"در تشریح مغز از بالا در زیر غدة اپی‌فیز ......\"",
    options: [
      "شبکه‌های مویرگی با مویرگ‌های پیوسته در بطن 1 و 2 مغز مایع مغزی - نخاعی ترشح می‌کنند.",
      "یاخته‌های عصبی برجستگی‌های چهارگانه در فعالیت‌های مختلف مغز میانی نقش ایفا می‌کند.",
      "با ایجاد برش طولی در رابط سه گوش می‌توان تالاموس‌ها را در زیر آن دید که توسط رابطی به یکدیگر متصل شده‌اند.",
      "با ایجاد برش در کرمنیه مخچه در امتداد شیار بین دو نیمکرة آن می‌توان درخت زندگی و سومین بطن مغز را مشاهده کرد."
    ],
    correctIndex: 1,
    answer: "طبق شکل، زیر اپی‌فیز برجستگی‌های چهارگانه قرار دارند. با برش در مخچه، درخت زندگی و بطن چهارم دیده می‌شوند. گزینه 2 صحیح است."
  },
  {
    id: 217,
    section: "گفتار دو: حواس ویژه",
    text: "کدام گزینه به درستی بیان شده است؟",
    options: [
      "بزرگ‌ترین لوب مخ دارای سه مرز مشترک با سایر لوب‌ها است.",
      "کوچک‌ترین لوب مخ دارای دو مرز مشترک با لوب‌های گیجگاهی و آهیانه‌ای است.",
      "لوب گیجگاهی برخلاف لوب آهیانه‌ای دارای سه مرز مشترک با سایر لوب‌ها است.",
      "لوب پیشانی همانند لوب آهیانه‌ای دارای دو مرز مشترک با سایر لوب‌ها است."
    ],
    correctIndex: 1,
    answer: "لوب پیشانی (بزرگ‌ترین لوب مخ) دارای دو مرز مشترک با لوب‌های آهیانه‌ای و گیجگاهی است. لوب آهیانه‌ای با ۳ لوب و لوب گیجگاهی با ۳ لوب مرز مشترک دارند. لوب پس‌سری (کوچک‌ترین لوب) با ۲ لوب (گیجگاهی و آهیانه‌ای) مرز مشترک دارد. گزینه ۲ صحیح است."
  },
  {
    id: 238,
    section: "گفتار دو: حواس ویژه",
    text: "کدام گزینه، باتوجه به شکل زیر که مغز گوسفند را نشان می‌دهد، نادرست است؟",
    options: [
      "پس از برش طولی در بخش \"5\"، بخش \"3\" قابل مشاهده می‌شوند.",
      "برای دیدن بخش \"1\"، برش کرمنیۀ مخچه در امتداد شیار دو نیمکرۀ آن، لازم است.",
      "در لبة پايين تالاموس‌ها، بخش \"4\" و در پشت اين بخش نيز بخش \"3\" قرار گرفته است.",
      "در دو طرف بخش \"5\"، فضای بطن‌های ۱ و ۲ و داخل این بطن‌ها نیز بخش \"3\" مستقر است."
    ],
    correctIndex: 0,
    answer: "برای مشاهده بخش ۳ (درخت زندگی)، باید برش در مخچه ایجاد شود، نه در رابط سه گوش. گزینه ۱ نادرست است.",
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
              درس دوم: حواس (گفتار دو) - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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