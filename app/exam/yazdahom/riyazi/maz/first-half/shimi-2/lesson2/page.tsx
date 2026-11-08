"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const RandomAtomicRadiusQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ============ ۱۰ سوال غیرپشت‌سرهم از درس دوم (رفتار عناصرها و شعاع اتم) ============
  const questions = [
    // ---------- سوال ۸۲ (صفحه ۱۷) ----------
    {
      id: 82,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text: "کدام گزینه نادرست است؟",
      image: null,
      imageAlt: "",
      options: [
        "در بین نافلزهای دوره دوم جدول دوره‌ای کمترین عدد اتمی مربوط به کربن است.",
        "گاز کلر همانند گوگرد زردرنگ است.",
        "شبه‌فلزها دارای خواص فیزیکی شبیه به فلزها هستند.",
        "عنصرهایی که در گروه ۱۴ جدول دوره‌ای دارای سطحی براق هستند و با ضربه خرد نمی‌شوند."
      ],
      correctIndex: 3,
      answer:
        "گزینه ۴ نادرست است.\nعناصر گروه ۱۴ شامل کربن (سطح تیره، شکننده)، سیلیسیم و ژرمانیم (شبه‌فلز، شکننده) و قلع و سرب (فلز، چکش‌خوار) است؛ بنابراین همه آن‌ها سطح براق ندارند و همه در برابر ضربه مقاوم نیستند.\nگزینه ۱: کربن با عدد اتمی ۶ اولین نافلز دوره دوم است. ✓\nگزینه ۲: گاز کلر (Cl₂) و گوگرد (S) هر دو زردرنگ هستند. ✓\nگزینه ۳: شبه‌فلزها خواص فیزیکی شبیه فلزها و خواص شیمیایی شبیه نافلزها دارند. ✓\nپاسخ: گزینه ۴."
    },

    // ---------- سوال ۸۴ (صفحه ۱۷) ----------
    {
      id: 84,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text:
        "باتوجه به واکنش زیر کدام نتیجه‌گیری در مورد هالوژن A نادرست است؟\nA₂(g) + H₂(g) ──T→ 2HA(g)",
      image: null,
      imageAlt: "",
      options: [
        "اگر A، فلوئور باشد می‌توان گفت که واکنش در هر دمایی به‌شدت انجام می‌شود.",
        "اگر T برابر با دمای اتاق باشد، آنگاه حالت فیزیکی A₂ نمی‌تواند مایع یا جامد باشد.",
        "هالوژن جامد در هر حالت فیزیکی در دمای بالاتر از ۴۰۰ °C با گاز هیدروژن واکنش می‌دهد.",
        "اگر A هالوژنی از دورهٔ سوم جدول تناوبی باشد، آنگاه نقطه جوش HA بالاتر از دمای اتاق است."
      ],
      correctIndex: 3,
      answer:
        "گزینه 4 نادرست است.\nاگر A هالوژن دورهٔ سوم (کلر) باشد، HA همان HCl(g) است که نقطه جوش آن حدود −۸۵ °C است و پایین‌تر از دمای اتاق (۲۵ °C) قرار دارد.\n• گزینه ۱: فلوئور حتی در دمای −۲۰۰ °C به‌سرعت با هیدروژن واکنش می‌دهد. ✓\n• گزینه ۲: در دمای اتاق فقط فلوئور و کلر گاز هستند و با هیدروژن واکنش می‌دهند. ✓\n• گزینه ۳: ید (جامد) در دمای بالاتر از ۴۰۰ °C با هیدروژن واکنش می‌دهد. ✓\nپاسخ: گزینه ۴."
    },

    // ---------- سوال ۹۵ (صفحه ۱۹) ----------
    {
      id: 95,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text:
        "چه تعداد از ویژگی‌های زیر با افزایش عدد اتمی در گروه هالوژن‌ها، افزایش می‌یابد؟\nالف) شعاع یونی\nب) شعاع اتمی\nپ) واکنش‌پذیری\nت) دمای لازم برای واکنش با هیدروژن",
      image: null,
      imageAlt: "",
      options: ["۲", "صفر", "۳", "۴"],
      correctIndex: 2,
      answer:
        "با افزایش عدد اتمی در گروه هالوژن‌ها (از بالا به پایین):\n• شعاع یونی افزایش می‌یابد ✓\n• شعاع اتمی افزایش می‌یابد ✓\n• واکنش‌پذیری کاهش می‌یابد ✗\n• دمای لازم برای واکنش با هیدروژن افزایش می‌یابد ✓\nبنابراین ۳ ویژگی افزایش می‌یابند.\nپاسخ: گزینه ۳ (یعنی ۳ مورد)."
    },

    // ---------- سوال ۱۰۵ (صفحه ۲۰) ----------
    {
      id: 105,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text:
        "کدام موارد درست هستند؟\nالف) به طور کلی در تمام گروه‌های اصلی جدول تناوبی، با کاهش شمارهٔ دوره، شعاع اتمی و واکنش‌پذیری عناصر کاهش پیدا می‌کند.\nب) فلوئور در دمای صفر درجهٔ سلسیوس به سرعت با گاز هیدروژن واکنش می‌دهد.\nپ) تمام فلزات دورهٔ سوم جدول تناوبی متعلق به دستهٔ s جدول هستند.\nت) ترکیب پتاسیم اکسید به مراتب پایدارتر از فلز پتاسیم است.",
      image: null,
      imageAlt: "",
      options: [
        "الف - ب - ت",
        "ب - پ - ت",
        "ب - ت",
        "الف - ت"
      ],
      correctIndex: 2,
      answer:
        "موارد «ب» و «ت» درست هستند.\n• الف) نادرست: در گروه‌های نافلزی (مثل گروه ۱۷)، با کاهش شمارهٔ دوره، واکنش‌پذیری و خصلت نافلزی افزایش می‌یابد، نه کاهش.\n• ب) درست: فلوئور واکنش‌پذیرترین هالوژن است و حتی در دماهای بسیار پایین (تا −۲۰۰ °C) با هیدروژن واکنش می‌دهد؛ پس در ۰ °C قطعاً به‌سرعت واکنش می‌دهد.\n• پ) نادرست: آلومینیم در دورهٔ سوم از دستهٔ p است.\n• ت) درست: پتاسیم فلزی به‌شدت واکنش‌پذیر است و ترکیباتش از خود فلز پایدارترند.\nپاسخ: گزینه ۳ (ب - ت)."
    },

    // ---------- سوال ۱۱۰ (صفحه ۲۱) ----------
    {
      id: 110,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text:
        "باتوجه به جدول زیر (بخشی از جدول تناوبی)، کدام مطلب نادرست است؟\n(گروه‌های ۱، ۲، ۱۴، ۱۵ و ۱۷ در دوره‌های ۲ و ۳ و ۴)",
      image: "/img/q110_ch02.png",
      imageAlt: "جدول تناوبی با عناصر A تا H",
      options: [
        "عنصر A بیشترین خصلت فلزی را بین عناصر هم‌دوره خود دارد.",
        "عنصر E بیشترین خصلت نافلزی را بین عناصر هم‌گروه خود دارد.",
        "عنصر E یک نافلز است و رسانایی الکتریکی کمتری نسبت به عنصر G دارد.",
        "عنصر B نسبت به عناصر G و H خصلت نافلزی بیشتری دارد."
      ],
      correctIndex: 2,
      answer:
        "گزینه 3 نادرست است.\nبا تحلیل جدول: A=Li، C=Be، E=C، D=Na، B=Si، F=K، G=Ge، H=Br.\n• گزینه ۱ درست: Li در دورهٔ ۲ گروه ۱ بیشترین خصلت فلزی را در دورهٔ خود دارد.\n• گزینه ۲ درست: کربن در گروه ۱۴ بیشترین خصلت نافلزی را دارد.\n• گزینه ۳ درست: کربن نافلز است و رسانایی آن از ژرمانیم (شبه‌فلز) کمتر است.\n• گزینه ۴ نادرست: Si نسبت به Ge خصلت نافلزی بیشتری دارد، ولی نسبت به Br خصلت نافلزی کمتری دارد؛ پس «نسبت به هر دو» نادرست است.\nپاسخ: گزینه ۴."
    },

    // ---------- سوال ۱۱۲ (صفحه ۲۱) ----------
    {
      id: 112,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text: "کدام گزینه در ارتباط با هالوژن‌ها درست است؟",
      image: null,
      imageAlt: "",
      options: [
        "حالت فیزیکی بیش از نیمی از آن‌ها در دمای اتاق، گاز است.",
        "تمام هالوژن‌ها دارای ۷ الکترون در آخرین لایهٔ الکترونی خود هستند.",
        "همۀ هالوژن‌ها بی‌رنگ هستند.",
        "گشتاور دوقطبی آن‌ها می‌تواند صفر نباشد."
      ],
      correctIndex: 3,
      answer:
        "گزینه 4 درست است.\n• گزینه ۱ نادرست: از ۴ هالوژن پایدار، فقط ۲ عنصر (F₂ و Cl₂) در دمای اتاق گاز هستند (نیمی، نه بیش از نیمی).\n• گزینه ۲ درست: آرایش لایهٔ ظرفیت همه هالوژن‌ها ns²np⁵ است، یعنی ۷ الکترون در آخرین لایه.\n• گزینه ۳ نادرست: F₂ زرد کمرنگ، Cl₂ زرد متمایل به سبز، Br₂ قهوه‌ای و I₂ بنفش هستند.\n• گزینه ۴ نادرست: مولکول‌های دوتایی هالوژن (X₂) ناقطبی هستند و گشتاور دوقطبی آن‌ها صفر است.\nپاسخ: گزینه ۲."
    },

    // ---------- سوال ۱۲۱ (صفحه ۲۳) ----------
    {
      id: 121,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text: "کدام مورد نادرست است؟",
      image: null,
      imageAlt: "",
      options: [
        "عنصرهای با عدد اتمی ۱۲۰ و ۱۲۱ در آزمایشگاه‌های تحقیقاتی ساخته و شناسایی شده‌اند.",
        "در جدول پیشنهادی شارل ژانت، زیرلایه g به عنوان زیرلایه پنجم پس از زیرلایه‌های f و d، p، s پر می‌شود.",
        "واکنش گاز کلر با فلز پتاسیم شدیدتر از لیتیم است.",
        "در یک دوره از چپ به راست با افزایش عدد اتمی و تعداد الکترون، شعاع اتمی افزایش می‌یابد."
      ],
      correctIndex: 2,
      answer:
        "گزینه 3 نادرست است.\nدر یک دوره از جدول تناوبی، از چپ به راست با افزایش عدد اتمی، بار مؤثر هسته افزایش می‌یابد و شعاع اتمی کاهش می‌یابد (نه افزایش).\n• گزینه ۱ درست: عناصر فوق‌سنگین ۱۲۰ و ۱۲۱ در آزمایشگاه ساخته شده‌اند.\n• گزینه ۲ درست: در جدول شارل ژانت ترتیب پر شدن زیرلایه‌ها بر اساس اصل آفبا است و g بعد از f قرار می‌گیرد.\n• گزینه ۳ درست: پتاسیم فعال‌تر از لیتیم است و واکنش آن با کلر شدیدتر است.\nپاسخ: گزینه ۴."
    },

    // ---------- سوال ۱۲۲ (صفحه ۲۳) ----------
    {
      id: 122,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text:
        "پیرامون دو عنصر ₃₇A و ₃₃B همه گزینه‌های زیر درست هستند؛ به‌جز ......",
      image: null,
      imageAlt: "",
      options: [
        "عنصر A در دستهٔ s و عنصر B در دستهٔ p جدول تناوبی جای دارد.",
        "عنصر A در گروه اول و دورهٔ پنجم و عنصر B در گروه پانزدهم و دورهٔ چهارم جدول تناوبی است.",
        "A یک فلز و B یک نافلز است.",
        "خاصیت فلزی عنصر A بیشتر از B است."
      ],
      correctIndex: 2,
      answer:
        "گزینه ۳ نادرست است.\nعنصر ₃₇A = روبیدیم (Rb): فلز قلیایی، گروه ۱، دورهٔ ۵، دستهٔ s.\nعنصر ₃₃B = آرسنیک (As): شبه‌فلز، گروه ۱۵، دورهٔ ۴، دستهٔ p.\n• گزینه ۱ درست: Rb در دستهٔ s و As در دستهٔ p.\n• گزینه ۲ درست: Rb گروه ۱ دورهٔ ۵ و As گروه ۱۵ دورهٔ ۴.\n• گزینه ۳ نادرست: A فلز است، ولی B شبه‌فلز است نه نافلز.\n• گزینه ۴ درست: خاصیت فلزی Rb (فلز قلیایی) بسیار بیشتر از As (شبه‌فلز) است.\nپاسخ: گزینه ۳."
    },

    // ---------- سوال ۱۳۸ (صفحه ۲۷) ----------
    {
      id: 138,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text: "شعاع اتمی کدام دو عنصر اختلاف کمتری باهم دارند؟",
      image: null,
      imageAlt: "",
      options: [
        "₁₃Al , ₁₂Mg",
        "₁₅P , ₁₄Si",
        "₁₇Cl , ₁₆S",
        "₁₉K , ₁₈Ar"
      ],
      correctIndex: 2,
      answer:
        "گزینه ۳ درست است.\nدر یک دوره از چپ به راست، شعاع اتمی کاهش می‌یابد، اما شیب کاهش در ابتدای دوره (فلزها) بیشتر و در انتهای دوره (نافلزها) کمتر است.\n• Al و Mg: هر دو فلز، تفاوت شعاع نسبتاً زیاد.\n• P و Si: شبه‌فلز و نافلز، تفاوت متوسط.\n• Cl و S: هر دو نافلز انتهای دورهٔ ۳، تفاوت شعاع کمترین مقدار.\n• K و Ar: K در دورهٔ ۴ و Ar در دورهٔ ۳ است، تفاوت شعاع بسیار زیاد.\nپاسخ: گزینه ۳ (Cl و S)."
    },

    // ---------- سوال ۱۴۱ (صفحه ۲۷) ----------
    {
      id: 141,
      section: "درس دوم: رفتار عناصرها و شعاع اتم",
      text:
        "چند مورد از ویژگی‌های زیر برای عنصر ₁₂Mg بیشتر از ₁₁Na است؟\n• شعاع اتمی\n• تعداد الکترون‌های ظرفیتی\n• تعداد لایه‌های الکترونی\n• فعالیت شیمیایی",
      image: null,
      imageAlt: "",
      options: ["۲ مورد", "۱ مورد", "۳ مورد", "۴ مورد"],
      correctIndex: 1,
      answer:
        "فقط ۱ مورد برای Mg بیشتر از Na است.\n• شعاع اتمی: Na > Mg (در دورهٔ ۳ از چپ به راست شعاع کاهش می‌یابد) ✗\n• تعداد الکترون‌های ظرفیتی: Mg (۲) > Na (۱) ✓\n• تعداد لایه‌های الکترونی: هر دو ۳ لایه دارند (یکسان) ✗\n• فعالیت شیمیایی: Na > Mg (فلزات قلیایی فعال‌ترند) ✗\nپاسخ: گزینه ۲ (یعنی ۱ مورد)."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

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
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== خطای تصویر ==========
  const handleImageError = (qId: number) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
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

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return '#28a745';
    if (scoreValue >= 50) return '#ffc107';
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
      width: '100vw', minHeight: '100vh',
      padding: '15px 10px', backgroundColor: '#f8f9fa',
      direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#00897B', color: 'white',
        padding: '20px', borderRadius: '8px',
        marginBottom: '30px', textAlign: 'center',
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
        >
          ← بازگشت
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px' }}>
              🧪 آزمون شیمی (۲) - درس دوم
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              رفتار عناصرها و شعاع اتم - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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
                display: 'inline-block', backgroundColor: '#00897B',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px',
                borderRadius: '50%', fontSize: '14px',
                marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {/* تصویر سوال */}
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
                      border: isSelected ? '3px solid #00897B' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e0f2f1' : '#fff',
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
                      backgroundColor: isSelected ? '#00897B' : '#fff',
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
                  backgroundColor: canCalculate ? '#00897B' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#00897B' }}>
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>
                  {Math.round(score!)}%
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
                  backgroundColor: getScoreColor(score!),
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
            marginTop: '30px', borderTop: '4px solid #00897B',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #00897B',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#00897B'
            }}>
              📝 پاسخنامه تشریحی - درس دوم
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
                      fontWeight: 'bold', color: '#00897B',
                      backgroundColor: '#e0f2f1', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1} - شماره اصلی {q.id}
                    </span>
                    <br />

                    {/* تصویر در پاسخنامه */}
                    {q.image && !imageErrors[q.id] && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px'
                      }}>
                        <img src={q.image} alt={q.imageAlt}
                          style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '6px' }} />
                      </div>
                    )}

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
                    <span style={{ fontWeight: 'bold', color: '#00897B' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>
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

export default RandomAtomicRadiusQuiz;