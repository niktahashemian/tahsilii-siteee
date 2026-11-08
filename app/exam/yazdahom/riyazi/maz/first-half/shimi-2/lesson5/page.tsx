"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// ==================== نمودارهای SVG ====================

const ChartIncreasing = () => (
  <svg viewBox="0 0 220 130" style={{ width: "100%", maxWidth: "220px", height: "auto", display: "block", margin: "0 auto" }}>
    <line x1="25" y1="110" x2="205" y2="110" stroke="#333" strokeWidth="1.5" />
    <line x1="25" y1="110" x2="25" y2="10" stroke="#333" strokeWidth="1.5" />
    <polyline points="28,108 34,85 46,70 68,55 95,40 130,25 170,13 200,8" fill="none" stroke="#1565C0" strokeWidth="2.2" />
    <text x="115" y="126" fontSize="9" fill="#333" textAnchor="middle">شماره گروه</text>
    <text x="10" y="65" fontSize="9" fill="#333" textAnchor="middle" transform="rotate(-90 10 65)">واکنش‌پذیری</text>
  </svg>
);

const ChartWShape = () => (
  <svg viewBox="0 0 220 130" style={{ width: "100%", maxWidth: "220px", height: "auto", display: "block", margin: "0 auto" }}>
    <line x1="25" y1="110" x2="205" y2="110" stroke="#333" strokeWidth="1.5" />
    <line x1="25" y1="110" x2="25" y2="10" stroke="#333" strokeWidth="1.5" />
    <polyline points="28,25 45,75 70,95 95,85 120,55 145,25 165,50 185,95 200,108" fill="none" stroke="#1565C0" strokeWidth="2.2" />
    <text x="115" y="126" fontSize="9" fill="#333" textAnchor="middle">شماره گروه</text>
    <text x="10" y="65" fontSize="9" fill="#333" textAnchor="middle" transform="rotate(-90 10 65)">واکنش‌پذیری</text>
  </svg>
);

const ChartDecreasing = () => (
  <svg viewBox="0 0 220 130" style={{ width: "100%", maxWidth: "220px", height: "auto", display: "block", margin: "0 auto" }}>
    <line x1="25" y1="110" x2="205" y2="110" stroke="#333" strokeWidth="1.5" />
    <line x1="25" y1="110" x2="25" y2="10" stroke="#333" strokeWidth="1.5" />
    <polyline points="28,15 45,45 65,75 90,95 120,102 155,106 195,108" fill="none" stroke="#1565C0" strokeWidth="2.2" />
    <text x="115" y="126" fontSize="9" fill="#333" textAnchor="middle">شماره گروه</text>
    <text x="10" y="65" fontSize="9" fill="#333" textAnchor="middle" transform="rotate(-90 10 65)">واکنش‌پذیری</text>
  </svg>
);

const ChartVShape = () => (
  <svg viewBox="0 0 220 130" style={{ width: "100%", maxWidth: "220px", height: "auto", display: "block", margin: "0 auto" }}>
    <line x1="25" y1="110" x2="205" y2="110" stroke="#333" strokeWidth="1.5" />
    <line x1="25" y1="110" x2="25" y2="10" stroke="#333" strokeWidth="1.5" />
    <polyline points="28,20 60,80 95,100 130,60 165,40 195,70" fill="none" stroke="#1565C0" strokeWidth="2.2" />
    <text x="115" y="126" fontSize="9" fill="#333" textAnchor="middle">شماره گروه</text>
    <text x="10" y="65" fontSize="9" fill="#333" textAnchor="middle" transform="rotate(-90 10 65)">واکنش‌پذیری</text>
  </svg>
);

// ==================== تایپ‌ها ====================

type ChartOption = {
  label: string;
  Chart: () => React.ReactElement;
};

type ChartQuestion = {
  id: number;
  section: string;
  text: string;
  hasChartOptions: true;
  options: ChartOption[];
  correctIndex: number;
  answer: string;
};

type TextQuestion = {
  id: number;
  section: string;
  text: string;
  hasChartOptions: false;
  options: string[];
  correctIndex: number;
  answer: string;
};

type Question = ChartQuestion | TextQuestion;

// ==================== سوالات (بیرون از کامپوننت برای جلوگیری از هشدار exhaustive-deps) ====================

const questions: Question[] = [
  {
    id: 210,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text: "برای استخراج کدام عنصر نمی‌توان از حرارت دادن اکسید آن عنصر با گرافیت استفاده کرد؟",
    hasChartOptions: false,
    options: ["آهن", "سیلیسیم", "پتاسیم", "نقره"],
    correctIndex: 2,
    answer:
      "واکنش‌پذیری گرافیت (کربن) از فلزهای فعال و بسیار واکنش‌پذیر همچون سدیم و پتاسیم کمتر است. ازاین‌رو نمی‌تواند آن‌ها را از اکسیدشان جدا کند. برای استخراج آهن، سیلیسیم و نقره استفاده از کربن (گرافیت) امکان‌پذیر است.\nپاسخ: گزینه ۳ (پتاسیم)."
  },
  {
    id: 218,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text:
      "در گروه هالوژن‌ها با کاهش عدد اتمی چه تعداد از ویژگی‌های زیر افزایش می‌یابد؟\nالف) شعاع اتمی\nب) شمار لایه‌های الکترونی\nپ) دمای لازم برای واکنش با گاز هیدروژن\nت) واکنش‌پذیری\nث) خصلت نافلزی",
    hasChartOptions: false,
    options: ["۲", "۳", "۴", "۵"],
    correctIndex: 0,
    answer:
      "با کاهش عدد اتمی در گروه هالوژن‌ها (از پایین به بالا):\n• شعاع اتمی: کاهش می‌یابد ✗\n• شمار لایه‌های الکترونی: کاهش می‌یابد ✗\n• دمای لازم برای واکنش با هیدروژن: کاهش می‌یابد ✗\n• واکنش‌پذیری: افزایش می‌یابد ✓\n• خصلت نافلزی: افزایش می‌یابد ✓\nبنابراین ۲ ویژگی افزایش می‌یابند.\nپاسخ: گزینه ۱ (۲ مورد)."
  },
  {
    id: 219,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text: "کدام واکنش انجام‌پذیر نیست؟",
    hasChartOptions: false,
    options: [
      "KI + Br₂ → ",
      "KBr + I₂ → ",
      "KBr + Cl₂ → ",
      "KI + Cl₂ → "
    ],
    correctIndex: 1,
    answer:
      "فعالیت شیمیایی هالوژن‌ها از بالا به پایین کاهش می‌یابد: Cl₂ > Br₂ > I₂.\nیک هالوژن پایین‌تر نمی‌تواند هالوژن بالاتر را از ترکیبش خارج کند:\n• KI + Br₂ → KBr + I₂: Br₂ قوی‌تر از I₂ است ✓\n• KBr + I₂ → KI + Br₂: I₂ ضعیف‌تر از Br₂ است ✗\n• KBr + Cl₂ → KCl + Br₂: Cl₂ قوی‌تر از Br₂ است ✓\n• KI + Cl₂ → KCl + I₂: Cl₂ قوی‌تر از I₂ است ✓\nپاسخ: گزینه ۲ (KBr + I₂)."
  },
  {
    id: 223,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text: "کدام فلز در شرایط یکسان در هوای مرطوب سریع‌تر واکنش می‌دهد؟",
    hasChartOptions: false,
    options: [" (K)", " (Fe)", " (Cu)", " (Na)"],
    correctIndex: 0,
    answer:
      "در گروه فلزهای قلیایی، واکنش‌پذیری از بالا به پایین افزایش می‌یابد: Li < Na < K < Rb < Cs. پس پتاسیم از سدیم فعال‌تر است.\nهمچنین واکنش‌پذیری فلزهای قلیایی از فلزهای واسطه (Fe, Cu) بسیار بیشتر است.\nترتیب واکنش‌پذیری: K > Na > Fe > Cu.\nپاسخ: گزینه ۱ (پتاسیم)."
  },
  {
    id: 230,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text: "اگر فلز A فعال‌تر از فلز B باشد، آنگاه کدام نتیجه‌گیری درست است؟",
    hasChartOptions: false,
    options: [
      "بار الکتریکی کاتیون فلز A مثبت‌تر از بار الکتریکی کاتیون فلز B است.",
      "استخراج فلز B دشوارتر از استخراج فلز A از کانی‌های دارای آن‌ها است.",
      "عدد اتمی A و B می‌تواند به ترتیب ۱۹ و ۲۹ باشد.",
      "واکنش اکسید AO(s)+ B(s) به‌طور طبیعی انجام می‌شود، زیرا پایداریAO از B بیشتر است."
    ],
    correctIndex: 2,
    answer:
      "• گزینه ۱: نادرست. ارتباطی میان فعال بودن فلز و بار الکتریکی کاتیون آن وجود ندارد.\n• گزینه ۲: نادرست. هرچه فلز فعال‌تر باشد، استخراج آن سخت‌تر است.\n• گزینه ۳: درست. عدد اتمی ۱۹ (پتاسیم) و ۲۹ (مس). پتاسیم (A) فعال‌تر از مس (B) است.\n• گزینه ۴: نادرست. اگر A فعال‌تر باشد، پایداری ترکیب‌هایش بیشتر است.\nپاسخ: گزینه ۳."
  },
  {
    id: 233,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text: "برای جوش دادن خطوط راه‌آهن از کدام‌یک از واکنش‌های زیر استفاده می‌شود؟ (واکنش‌ها موازنه نشده هستند)",
    hasChartOptions: false,
    options: [
      "Fe₂O₃(s)→ Fe₃O4(s) + O₂(g)",
      "Fe₂O₃(s)+Al(s) → AI₂O₃(s) + O₂(g)",
      "Fe₂O₃(s) + C(s) → CO₂(g) + Fe(I)",
      "Fe₂O₃(s) + C(s) → CO₂(g) + Fe(l)"
    ],
    correctIndex: 1,
    answer:
      "از واکنش ترمیت برای جوش دادن خطوط راه‌آهن استفاده می‌شود:\nFe₂O₃(s) + 2Al(s) → Al₂O₃(s) + 2Fe(l)\nدر این واکنش، آلومینیم (فلز فعال‌تر) آهن را از اکسیدش کاهش می‌دهد و گرمای زیادی آزاد می‌شود که آهن را مذاب می‌کند.\nپاسخ: گزینه 2."
  },
  {
    id: 237,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text:
      "در هر واکنش شیمیایی که به‌طور طبیعی انجام می‌شود، واکنش‌پذیری و سطح انرژی واکنش‌دهنده‌ها از فرآورده‌ها ...... بوده و پایداری واکنش‌دهنده‌ها از فرآورده‌ها ...... است؛ بنابراین با انجام واکنش خودبه‌خودی، به‌اندازه اختلاف سطح انرژی واکنش‌دهنده‌ها و فرآورده‌ها، گرما ...... می‌شود و واکنش ...... است.",
    hasChartOptions: false,
    options: [
      "بیشتر - بیشتر - آزاد - گرماده",
      "کمتر - کمتر - جذب - گرماگیر",
      "کمتر - بیشتر - جذب - گرماگیر",
      "بیشتر - کمتر - آزاد - گرماده"
    ],
    correctIndex: 3,
    answer:
      "در هر واکنش شیمیایی که به‌طور طبیعی انجام می‌شود:\n• واکنش‌پذیری و سطح انرژی واکنش‌دهنده‌ها از فرآورده‌ها بیشتر است.\n• پایداری واکنش‌دهنده‌ها از فرآورده‌ها کمتر است.\n• به‌اندازه اختلاف سطح انرژی، گرما آزاد می‌شود.\n• پس واکنش گرماده است.\nپاسخ: گزینه ۴ (بیشتر - کمتر - آزاد - گرماده)."
  },
  {
    id: 246,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text: "نمودار کلی تغییر واکنش‌پذیری عنصرهای دورهٔ دوم جدول دوره‌ای به کدام صورت است؟",
    hasChartOptions: true,
    options: [
      { label: "نمودار ۱ (صعودی)", Chart: ChartIncreasing },
      { label: "نمودار ۲ (W شکل)", Chart: ChartWShape },
      { label: "نمودار ۳ (نزولی)", Chart: ChartDecreasing },
      { label: "نمودار ۴ (V شکل)", Chart: ChartVShape }
    ],
    correctIndex: 1,
    answer:
      "در دوره دوم جدول تناوبی:\n• لیتیم (فلز قلیایی، گروه ۱): واکنش‌پذیری بسیار بالا\n• با حرکت به راست، واکنش‌پذیری کاهش می‌یابد تا به کربن (گروه ۱۴) می‌رسد.\n• سپس واکنش‌پذیری افزایش می‌یابد تا به فلوئور (هالوژن، گروه ۱۷) می‌رسد که واکنش‌پذیری بسیار بالایی دارد.\n• در نهایت به نئون (گاز نجیب، گروه ۱۸) می‌رسد که واکنش‌پذیری آن صفر است.\nبنابراین نمودار «W» شکل است: ابتدا کاهش، سپس افزایش، و در انتها کاهش شدید به صفر.\nپاسخ: گزینه ۲ (نمودار W شکل)."
  },
  {
    id: 248,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text:
      "چه تعداد از عبارت‌های زیر درست است؟\nالف) عنصر کروم همانند وانادیم دو یون با بارهای ۲ و ۳ بار مثبت دارد.\nب) جلای نقره‌ای فلز سدیم در مجاورت هوا به‌سرعت از بین می‌رود.\nپ) فلزهای دستة d همانند فلزهای دستة s چکش‌خوارند و قابلیت ورقه شدن دارند.\nت) گاز کلر در دمای اتاق به‌آرامی واکنش می‌دهد.",
    hasChartOptions: false,
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 3,
    answer:
      "تمامی ۴ عبارت درست هستند:\n• الف) کروم (₂₄Cr) همانند وانادیم (₂₃V) یون‌های Cr²⁺ و Cr³⁺ (و V²⁺ و V³⁺) تشکیل می‌دهد. ✓\n• ب) سدیم فلزی بسیار فعال است و در هوا سریع اکسید می‌شود. ✓\n• پ) فلزهای دسته d (واسطه) همانند فلزهای دسته s چکش‌خوار و ورقه‌شدنی هستند. ✓\n• ت) گاز کلر در دمای اتاق به‌آرامی با گاز هیدروژن واکنش می‌دهد. ✓\nپاسخ: گزینه ۴ (۴ مورد)."
  },
  {
    id: 250,
    section: "درس پنجم: واکنش‌پذیری عناصرها",
    text:
      "باتوجه به معادله‌های موازنه‌نشدهٔ واکنش‌های زیر، نسبت جرم مولی ترکیب شیمیایی فلزی که استخراج آن از سایر فلزها آسان‌تر است به جرم مولی فلزی که واکنش‌پذیرترین است، کدام گزینه می‌باشد؟\nI) Mg + TiCl₃ → MgCl₂ + Ti\nII) Ti + FeCl₂ → Fe + TiCl₂\nIII) Fe + AgNO₃ → Fe(NO₃)₂ + Ag\n(Ag=۱۰۸, N=۱۴, O=۱۶, Mg=۲۴, Ti=۴۸, Fe=۵۶, Cu=۶۴, Cl=۳۵/۵ : g.mol⁻¹)",
    hasChartOptions: false,
    options: ["۴/۵", "۶", "۰/۱۵", "۷"],
    correctIndex: 3,
    answer:
      "از سه واکنش داده شده، ترتیب واکنش‌پذیری فلزها به‌صورت زیر به‌دست می‌آید:\nMg > Ti > Fe > Ag\n• واکنش‌پذیرترین فلز: Mg (جرم مولی ۲۴)\n• فلزی که استخراج آن آسان‌ترین است: Ag (کم‌فعال‌ترین، جرم مولی ۱۰۸)\nترکیب شیمیایی Ag در این واکنش: AgNO₃ (جرم مولی = ۱۰۸ + ۱۴ + ۴۸ = ۱۷۰)\nنسبت: ۱۷۰ / ۲۴ ≈ ۷\nپاسخ: گزینه ۴ (۷)."
  }
];

// ==================== کامپوننت ====================

const Chemistry2Reactivity = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimeUp, isScoreCalculated]);

  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return "#C62828";
    if (scoreValue >= 50) return "#ffc107";
    return "#dc3545";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        fontFamily: "Tahoma, Arial, sans-serif",
        width: "100vw",
        minHeight: "100vh",
        padding: "15px 10px",
        backgroundColor: "#f8f9fa",
        direction: "rtl",
        textAlign: "right",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#C62828",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() =>
            router.push("/exam/yazdahom/riyazi/maz/first-half/shimi-2")
          }
          style={{
            position: "absolute",
            left: "20px",
            top: "20px",
            padding: "8px 16px",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← بازگشت
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "26px" }}>
              ⚡ آزمون شیمی (۲) - درس پنجم
            </h1>
            <p style={{ marginTop: "10px", fontSize: "16px", opacity: 0.9 }}>
              واکنش‌پذیری عناصرها — {questions.length} سوال — پاسخ داده شده:{" "}
              {answeredCount}/{questions.length}
            </p>
          </div>

          <div
            style={{
              backgroundColor: isTimeUp ? "#dc3545" : "rgba(255,255,255,0.15)",
              padding: "10px 25px",
              borderRadius: "50px",
              fontSize: "24px",
              fontWeight: "bold",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>⏱️</span>
            <span>{isTimeUp ? "⏰ تمام شد!" : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        {questions.map((q, index) => (
          <div
            key={q.id}
            style={{
              marginBottom: "25px",
              backgroundColor: "#ffffff",
              padding: "20px 25px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                fontSize: "17px",
                lineHeight: "1.9",
                marginBottom: "20px",
                fontWeight: "500",
                display: "flex",
                alignItems: "flex-start",
                whiteSpace: "pre-wrap",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#C62828",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                  lineHeight: "30px",
                  borderRadius: "50%",
                  fontSize: "14px",
                  marginLeft: "15px",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {q.hasChartOptions ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px 20px",
                  marginRight: "20px",
                }}
              >
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.id] === idx;
                  const isDisabled = isTimeUp || isScoreCalculated;
                  const ChartComp = opt.Chart;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(q.id, idx)}
                      disabled={isDisabled}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px",
                        border: isSelected ? "3px solid #C62828" : "1px solid #dee2e6",
                        borderRadius: "10px",
                        backgroundColor: isSelected ? "#ffebee" : "#fff",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        transition: "all 0.2s",
                        width: "100%",
                        opacity: isDisabled && !isSelected ? 0.6 : 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "6px",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "28px",
                            height: "28px",
                            border: "1px solid #000",
                            borderRadius: "50%",
                            textAlign: "center",
                            lineHeight: "28px",
                            fontSize: "14px",
                            marginLeft: "10px",
                            backgroundColor: isSelected ? "#C62828" : "#fff",
                            color: isSelected ? "#fff" : "#000",
                            flexShrink: 0,
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span style={{ fontSize: "14px" }}>{opt.label}</span>
                      </div>
                      <ChartComp />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px 30px",
                  marginRight: "20px",
                }}
              >
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.id] === idx;
                  const isDisabled = isTimeUp || isScoreCalculated;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(q.id, idx)}
                      disabled={isDisabled}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 18px",
                        border: isSelected ? "3px solid #C62828" : "1px solid #dee2e6",
                        borderRadius: "10px",
                        backgroundColor: isSelected ? "#ffebee" : "#fff",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        fontSize: "15px",
                        textAlign: "right",
                        transition: "all 0.2s",
                        width: "100%",
                        opacity: isDisabled && !isSelected ? 0.6 : 1,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "28px",
                          height: "28px",
                          border: "1px solid #000",
                          borderRadius: "50%",
                          textAlign: "center",
                          lineHeight: "28px",
                          fontSize: "14px",
                          marginLeft: "15px",
                          backgroundColor: isSelected ? "#C62828" : "#fff",
                          color: isSelected ? "#fff" : "#000",
                          flexShrink: 0,
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #dee2e6",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => {
                  if (canCalculate) calculateScore();
                }}
                disabled={!canCalculate}
                style={{
                  padding: "15px 40px",
                  fontSize: "18px",
                  backgroundColor: canCalculate ? "#C62828" : "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50px",
                  cursor: canCalculate ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                  opacity: canCalculate ? 1 : 0.6,
                }}
              >
                {!isAllAnswered && !isTimeUp
                  ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید`
                  : "📊 محاسبه درصد"}
              </button>

              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#C62828" }}>
                ✅ درصد شما:{" "}
                <span style={{ color: getScoreColor(score!), fontSize: "28px" }}>
                  {Math.round(score!)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: "14px", color: "#dc3545", marginRight: "15px" }}>
                    (زمان پایان یافت)
                  </span>
                )}
              </div>

              <div
                style={{
                  width: "80%",
                  maxWidth: "400px",
                  height: "20px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "10px",
                  overflow: "hidden",
                  margin: "15px auto",
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
                    height: "100%",
                    backgroundColor: getScoreColor(score!),
                    transition: "width 0.8s ease-in-out",
                  }}
                />
              </div>

              <button
                onClick={() => {
                  setIsScoreCalculated(false);
                  setScore(null);
                  isCalculatedRef.current = false;
                  isTimeUpRef.current = false;
                }}
                style={{
                  padding: "10px 25px",
                  fontSize: "14px",
                  backgroundColor: "#ff9800",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "60px" }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: "15px 40px",
              fontSize: "18px",
              backgroundColor: showAnswers ? "#dc3545" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "all 0.2s",
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div
            style={{
              marginTop: "30px",
              borderTop: "4px solid #C62828",
              paddingTop: "40px",
              backgroundColor: "#ffffff",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              width: "100%",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                borderBottom: "3px solid #C62828",
                paddingBottom: "20px",
                marginBottom: "40px",
                fontSize: "26px",
                color: "#C62828",
              }}
            >
              📝 پاسخنامه تشریحی - درس پنجم
            </h2>

            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;

              const correctOption = q.options[q.correctIndex];
              const correctLabel =
                typeof correctOption === "string" ? correctOption : correctOption.label;

              return (
                <div
                  key={q.id}
                  style={{
                    marginBottom: "35px",
                    borderBottom: "1px dashed #ced4da",
                    paddingBottom: "25px",
                  }}
                >
                  <div style={{ fontSize: "16px", lineHeight: "2" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#C62828",
                        backgroundColor: "#ffebee",
                        padding: "5px 15px",
                        borderRadius: "20px",
                        display: "inline-block",
                        marginBottom: "10px",
                      }}
                    >
                      سوال {index + 1} - شماره اصلی {q.id}
                    </span>
                    <br />

                    <span style={{ fontWeight: "bold", color: "#28a745" }}>
                      ✅ پاسخ صحیح:
                    </span>
                    <span style={{ fontSize: "15px" }}> {correctLabel}</span>
                    <br />

                    {userAnswer !== undefined && (
                      <span>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: isCorrect ? "#28a745" : "#dc3545",
                          }}
                        >
                          {isCorrect ? "✔️ صحیح" : "❌ نادرست"}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            marginRight: "10px",
                          }}
                        >
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}

                    {q.hasChartOptions && (
                      <div
                        style={{
                          margin: "15px 0",
                          padding: "15px",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px dashed #ced4da",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {React.createElement(q.options[q.correctIndex].Chart)}
                      </div>
                    )}

                    <span style={{ fontWeight: "bold", color: "#C62828" }}>
                      📖 توضیح:
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.8",
                        color: "#333",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {q.answer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "#fff3cd",
              borderRadius: "12px",
              border: "1px solid #ffc107",
            }}
          >
            <p style={{ fontSize: "18px", color: "#856404" }}>
              ⚠️ لطفاً ابتدا روی دکمه <strong>«محاسبه درصد»</strong> کلیک کنید تا
              پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chemistry2Reactivity;