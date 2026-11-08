"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Chemistry2IronCations = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== آرایه سوالات ====================
  // برای هر سوالی که عکس دارد، فیلد image (مسیر عکس) و imageAlt (متن جایگزین عکس) را پر کنید.
  // اگر سوالی عکس ندارد، مقدار image را null بگذارید.
  
  const questions = [
    // ========== سوالات شناسایی کاتیون‌های آهن در ترکیبات ==========
    {
      id: 268,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "در دو لولهٔ آزمایش زیر که شامل محلول حاوی یون‌های Fe²⁺ و Fe³⁺ هستند، قطره‌قطره محلول سدیم هیدروکسید می‌افزاییم. در لولهٔ ۱ و ۲ به ترتیب رسوب‌های ...... و ...... رنگی تشکیل می‌شود.",
      image: "/img/q268_test_tubes.png", // <--- مسیر عکس خود را اینجا بگذارید
      imageAlt: "دو لوله آزمایش حاوی محلول Fe2+ و Fe3+",
      options: ["سبز ژلاتینی - قرمز قهوه‌ای", "قرمز قهوه‌ای - سبز ژلاتینی", "سفید - سبز ژلاتینی", "سفید - قرمز قهوه‌ای"],
      correctIndex: 0,
      answer: "واکنش بین محلول داده‌شده و یون‌های درون هر لولهٔ آزمایش و رنگ رسوب‌های حاصل به‌صورت زیر است:\nلولهٔ آزمایش (۱): Fe²⁺(aq) + ۲NaOH(aq) → Fe(OH)₂(s) + ۲Na⁺(aq) (رسوب سبز ژلاتینی)\nلولهٔ آزمایش (۲): Fe³⁺(aq) + ۳NaOH(aq) → Fe(OH)₃(s) + ۳Na⁺(aq) (رسوب قرمز قهوه‌ای)\nگزینه ۱ صحیح است."
    },
    {
      id: 271,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "کدام گزینه زیر نادرست است؟",
      image: null,
      imageAlt: "",
      options: [
        "برای شناسایی کاتیون یک فلز موجود در محلول، باید آنیونی به محلول اضافه شود تا با کاتیون موردنظر رسوب دهد.",
        "از محلول پتاسیم هیدروکسید می‌توان برای شناسایی یون آهن استفاده کرد.",
        "طی واکنش آهن (II) کلرید با سدیم هیدروکسید، رسوبی قرمز متمایل به قهوه‌ای رنگ حاصل می‌شود.",
        "برای شناسایی کاتیون موجود در زنگ آهن، باید زنگ آهن را در هیدروکلریک اسید حل کرد."
      ],
      correctIndex: 2,
      answer: "آهن (II) هیدروکسید حاصل از واکنش سدیم هیدروکسید و آهن (II) کلرید، رسوبی سبزرنگ است. بنابراین گزینه ۳ نادرست است.\nFeCl₂(aq) + ۲NaOH(aq) → Fe(OH)₂(s) + ۲NaCl(aq)\nرسوب سبز"
    },
    {
      id: 272,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "حالت فیزیکی مواد در کدام گزینه نادرست است؟",
      image: null,
      imageAlt: "",
      options: [
        "CuSO₄(aq) + Fe(s) → Cu(s) + FeSO₄(aq)",
        "FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s) + 3NaCl(s)",
        "C₇H₇(g) + Br₂(l) → C₇H₇Br₂(l)",
        "C₇H₁₇O₂(aq) → 2C₇H₅(OH)(aq) + 2CO₂(g)"
      ],
      correctIndex: 1,
      answer: "در واکنش ۲، NaCl در آب محلول است و باید به صورت (aq) نوشته شود، نه (s).\nFeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s) + 3NaCl(aq)\nبنابراین گزینه ۲ نادرست است."
    },
    {
  id: 273,
  section: "شناسایی کاتیون‌های آهن در ترکیبات",
  text: "دو واکنش زیر مربوط به شناسایی کاتیون موجود در اکسیدی از آهن است. کدام مطلب درست است؟ (Fe = 56, O = 16g.mol )−۱)\nI) Fe₂O₃ + HCl(aq) → A(aq) + H₂O(l)\nII) A(aq) + NaOH(aq) → Fe(OH)₃(s) + NaCl(aq)",
  image: null,
  imageAlt: "",
  options: [
    "نسبت استوکیومتری کاتیون به آنیون در هر دو ترکیب A و اکسید آهن یکسان و برابر با ۳ است.",
    "حالت فیزیکی x و y به ترتیب aq و s است.",
    "نسبت مجموع ضرایب مواد در معادلهٔ موازنه‌شدهٔ (I) به واکنش (II) برابر با ۱/۲ است.",
    "در هر گرم از این اکسید آهن، ۰/۷ گرم آهن وجود دارد."
  ],
  correctIndex: 3,
  answer: "واکنش (I) موازنه‌شده: Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O، پس A = FeCl₃.\nواکنش (II) موازنه‌شده: FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl.\nگزینه ۱: در FeCl₃ نسبت کاتیون به آنیون ۱ به ۳ و در Fe₂O₃ نسبت ۲ به ۳ است، پس یکسان نیست.\nگزینه ۲: x همان Fe(OH)₃ و حالت آن جامد (s) است و y همان NaCl و حالت آن محلول (aq) است، پس عبارت «aq و s» نادرست است.\nگزینه ۳: مجموع ضرایب در (I) برابر ۱+۶+۲+۳ = ۱۲ و در (II) برابر ۱+۳+۱+۳ = ۸ است. نسبت آن‌ها ۱/۵ می‌شود، نه ۱/۲.\nگزینه ۴: جرم مولی Fe₂O₃ = 2(56) + 3(16) = 160 g/mol. جرم آهن در ۱ گرم اکسید: (2×56 / 160) × 1 = 0/7 گرم. این گزینه درست است.\nپاسخ: گزینه ۴."
},
    {
      id: 274,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "عبارت کدام گزینه درست نیست؟",
      image: null,
      imageAlt: "",
      options: [
        "طلا همواره در گذر زمان جلای فلزی خود را حفظ می‌کند و همچنان خوش‌رنگ و درخشان باقی می‌ماند.",
        "به برگه‌ها و رشته‌سیم‌های بسیار نازک از طلا، خط طلا می‌گویند.",
        "مجموع ضرایب مواد در واکنش آهن (III) کلرید با سدیم هیدروکسید برابر ۶ است.",
        "اگر به محلول حاصل از زنگ آهن و هیدروکلریک اسید قطره‌قطره سدیم هیدروکسید اضافه کنیم، رسوب قهوه‌ای‌رنگ تشکیل می‌شود."
      ],
      correctIndex: 2,
      answer: "واکنش آهن (III) کلرید با سدیم هیدروکسید:\nFeCl₃(aq) + ۳NaOH(aq) → Fe(OH)₃(s) + ۳NaCl(aq)\nمجموع ضرایب: ۱ + ۳ + ۱ + ۳ = ۸ است، نه ۶.\nگزینه ۳ نادرست است."
    },
    {
      id: 275,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "برای تشخیص کاتیون موجود در زنگ آهن، واکنش‌های زیر را انجام می‌دهیم. کدام‌یک نادرست است؟ (Fe = 56)\nI) زنگ آهن + هیدروکلریک اسید → X + آب\nII) X + سدیم هیدروکسید → Y + سدیم کلرید",
      image: null,
      imageAlt: "",
      options: [
        "Y سبزرنگ بوده و برخلاف X نامحلول در آب است.",
        "کاتیون موجود در زنگ آهن دارای ۵ الکترون با l = 2 است.",
        "کاتیون موجود در هر دو ترکیب X و Y دارای الکترون‌های مساوی هستند.",
        "X، FeCl₃ است و مجموع ضرایب واکنش اول ۱۲ است."
      ],
      correctIndex: 0,
      answer: "زنگ آهن عمدتاً Fe₂O₃ است. با HCl واکنش می‌دهد و FeCl₃ (X) تولید می‌کند. سپس با NaOH واکنش داده و Fe(OH)₃ (Y) تولید می‌شود که رسوبی قرمزقهوه‌ای است، نه سبز.\nگزینه ۱ نادرست است."
    },
    {
      id: 276,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "اگر میخ آهنی را به محلول مس (II) سولفات وارد کنیم، اتم‌های ...... جایگزین یون‌های ...... شده و نشان می‌دهد آهن از مس ...... است.",
      image: null,
      imageAlt: "",
      options: [
        "Cu, Fe, کم‌واکنش‌پذیرتر",
        "Fe, Cu, واکنش‌پذیرتر",
        "Cu, Fe, واکنش‌پذیرتر",
        "Fe, Cu, کم‌واکنش‌پذیرتر"
      ],
      correctIndex: 1,
      answer: "آهن واکنش‌پذیرتر از مس است، بنابراین اتم‌های آهن (Fe) جایگزین یون‌های مس (Cu²⁺) در محلول می‌شوند.\nFe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)\nگزینه ۲ صحیح است."
    },
    {
      id: 277,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "در مورد واکنش 2Fe₂O₃(s) + 3C(s) → 4Fe(s) + 3CO₂(g) چند مورد از مطالب زیر نادرست هستند؟ (Fe = 56, C = 12, O = 16)\n- از این واکنش در فولاد مبارکه برای استخراج آهن استفاده می‌شود.\n- از واکنش ۱/۶ گرم آهن (III) اکسید با مقدار کافی کربن، ۰/۰۵ مول آهن تولید می‌شود.\n- به ازای تولید ۳۳/۶ لیتر گاز CO₂ در شرایط STP، مقدار ۴۸۰ گرم آهن (III) اکسید استفاده می‌شود.\n- واکنش‌پذیری و فعالیت شیمیایی آهن از کربن بیشتر است.",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "مورد اول: درست. در فولاد مبارکه از کربن برای استخراج آهن استفاده می‌شود.\nمورد دوم: نادرست. ۲ مول Fe₂O₃ (۳۲۰ گرم) ۴ مول Fe تولید می‌کند. ۱/۶ گرم Fe₂O₃ تولید ۰/۰۲ مول Fe می‌کند.\nمورد سوم: نادرست. ۳۳/۶ لیتر CO₂ برابر ۱/۵ مول است. با توجه به معادله، ۱ مول Fe₂O₃ (۱۶۰ گرم) تولید ۱/۵ مول CO₂ می‌کند.\nمورد چهارم: نادرست. واکنش‌پذیری کربن از آهن بیشتر است.\nبنابراین ۳ مورد نادرست است. گزینه ۳ صحیح است."
    },
    {
      id: 278,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) برای شناسایی یون Fe³⁺ همانند یون Fe²⁺ می‌توان از محلول حاوی یون هیدروکسید استفاده کرد.\nب) آهن (II) هیدروکسید محلولی سبزرنگ است.\nپ) زنگ آهن حاوی یون Fe³⁺ است.\nت) زنگ آهن در هیدروکلریک اسید حل می‌شود.",
      image: null,
      imageAlt: "",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "الف) درست. هر دو یون با هیدروکسید رسوب می‌دهند.\nب) نادرست. آهن (II) هیدروکسید یک رسوب سبز ژلاتینی است، نه محلول.\nپ) درست. زنگ آهن حاوی یون Fe³⁺ است.\nت) درست. زنگ آهن در هیدروکلریک اسید حل می‌شود.\nبنابراین ۳ مورد درست است. گزینه ۳ صحیح است."
    },
    
    {
      id: 280,
      section: "شناسایی کاتیون‌های آهن در ترکیبات",
      text: "با افزودن محلول سدیم هیدروکسید به آهن (II) کلرید، رسوبی ...... رنگ تولید می‌گردد. از طرفی اگر به مقداری زنگ آهن، محلول هیدروکلریک اسید افزوده شود، محلولی با فرمول شیمیایی ...... حاصل می‌گردد.",
      image: null,
      imageAlt: "",
      options: [
        "سبز - FeCl₃",
        "سبز - FeCl₂",
        "قرمز قهوه‌ای - FeCl₃",
        "قرمز قهوه‌ای - FeCl₂"
      ],
      correctIndex: 0,
      answer: "افزودن NaOH به FeCl₂ باعث تولید رسوب سبز Fe(OH)₂ می‌شود.\nواکنش زنگ آهن (Fe₂O₃) با HCl باعث تولید FeCl₃ می‌شود.\nبنابراین: سبز - FeCl₃. گزینه ۱ صحیح است."
    },
      ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(22 * 60); // ۲۲ دقیقه
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
              شناسایی کاتیون‌های آهن و رفتار عناصرها - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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

              {/* ==================== رندر تصویر سوال ==================== */}
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
              {/* ======================================================= */}

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
                    
                    {/* ==================== رندر تصویر در پاسخنامه ==================== */}
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
                    {/* ==================================================================== */}
                    
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

export default Chemistry2IronCations;