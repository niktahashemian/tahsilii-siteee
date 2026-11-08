"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    id: 146,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text: "آرایش الکترونی کدام دو جفت کاتیون زیر یکسان نیست؟",
    image: null,
    imageAlt: "",
    options: [
      "₃₀Zn²⁺ , ₂₉Cu⁺",
      "₂₂Ti²⁺ , ₂₃V³⁺",
      "₂₅Mn³⁺ , ₂₄Cr³⁺",
      "₂₆Fe²⁺ , ₂₇Co³⁺"
    ],
    correctIndex: 2,
    answer:
      "بررسی آرایش الکترونی:\n• Zn²⁺ = [Ar]3d¹⁰ و Cu⁺ = [Ar]3d¹⁰ → یکسان ✓\n• Ti²⁺ = [Ar]3d² و V³⁺ = [Ar]3d² → یکسان ✓\n• Mn³⁺ = [Ar]3d⁴ و Cr³⁺ = [Ar]3d³ → متفاوت ✗\n• Fe²⁺ = [Ar]3d⁶ و Co³⁺ = [Ar]3d⁶ → یکسان ✓\nتنها جفت Mn³⁺ و Cr³⁺ آرایش الکترونی یکسان ندارند.\nپاسخ: گزینه ۳."
  },
  {
    id: 150,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "کدام گزینه درست است؟\n۱) آهن همانند فلز سدیم به سرعت با اکسیژن در هوای مرطوب واکنش می‌دهد و به زنگ آهن تبدیل می‌شود.\n۲) کاتیون فلزات گروه ۱۴ جدول دوره‌ای، در واکنش با دیگر اتم‌ها الکترون از دست می‌دهند و به آرایش گاز نجیب ماقبل خود می‌رسند.\n۳) روند کلی تغییر واکنش‌پذیری عناصر دورهٔ دوم جدول دوره‌ای با افزایش شمارهٔ گروه در ابتدا فقط به‌صورت کاهشی و سپس فقط به‌صورت افزایشی است.\n۴) کاتیون فلزی که در تلویزیون رنگی و برخی شیشه‌ها وجود دارد همانند آنیون عنصری که بیشترین خصلت نافلزی را در میان عناصر دورهٔ سوم جدول تناوبی دارد، دارای دو زیرلایه پر از الکترون با l=1 است.",
    image: null,
    imageAlt: "",
    options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
    correctIndex: 3,
    answer:
      "گزینه ۴ درست است.\nکاتیون فلزی که در تلویزیون رنگی و شیشه‌ها کاربرد دارد، Sc³⁺ است:\n₂₁Sc³⁺ : 1s² 2s² 2p⁶ 3s² 3p⁶ (دارای دو زیرلایه p پر: 2p⁶ و 3p⁶)\nآنیون عنصر با بیشترین خصلت نافلزی در دورهٔ ۳، Cl⁻ است:\n₁₇Cl⁻ : 1s² 2s² 2p⁶ 3s² 3p⁶ (دارای دو زیرلایه p پر: 2p⁶ و 3p⁶)\nبررسی سایر گزینه‌ها:\n• گزینه ۱ نادرست: آهن به کندی زنگ می‌زند.\n• گزینه ۲ نادرست: کاتیون فلزات گروه ۱۴ (قلع و سرب) به آرایش گاز نجیب نمی‌رسند.\n• گزینه ۳ نادرست: روند واکنش‌پذیری دورهٔ ۲ از کاهشی شروع و در انتها با رسیدن به گاز نجیب کاهش می‌یابد.\nپاسخ: گزینه ۴."
  },
  {
    id: 161,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "کدام مطلب در مورد کاتیون فلز واسطه در ترکیب Ni درست است؟ (Ni در دورهٔ چهارم و گروه ۱۰ جدول تناوبی قرار دارد)\nالف) شمار الکترون‌ها در بیرونی‌ترین زیرلایه آن برابر با ۲ است.\nب) آرایش الکترونی کاتیون آن شبیه به آرایش الکترونی کاتیون عنصری با عدد اتمی ۲۰ است.\nپ) مجموع شمار الکترون‌ها در لایه‌های دوم و سوم آن برابر است.\nت) بار الکتریکی آن با بار الکتریکی کاتیون فلزی با عدد اتمی ۳۸ برابر است.",
    image: null,
    imageAlt: "",
    options: ["الف - ت - پ", "ب - پ", "ت", "ب - الف"],
    correctIndex: 2,
    answer:
      "فقط عبارت «ت» درست است.\nNi = [Ar]3d⁸4s² → Ni²⁺ = [Ar]3d⁸\n• الف نادرست: بیرونی‌ترین زیرلایه 3d با ۸ الکترون پر شده (نه ۲).\n• ب نادرست: آرایش Ni²⁺ با [Ar]3d⁸ است، اما کاتیون عنصر Z=20 (Ca²⁺) = [Ar] است. این دو یکسان نیستند.\n• پ نادرست: لایهٔ ۲ Ni²⁺ = ۸ الکترون و لایهٔ ۳ آن = ۱۶ الکترون؛ برابر نیستند.\n• ت درست: بار Ni²⁺ = +۲ و بار Sr²⁺ (Z=38) = +۲ یکسان است.\nپاسخ: گزینه ۳."
  },
  {
    id: 169,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "کدام یک از عبارت‌های زیر پیرامون نخستین فلز واسطه در جدول دوره‌ای درست است؟\nالف) در وسایل خانه مانند تلویزیون رنگی و برخی شیشه‌ها وجود دارد.\nب) با تشکیل یون یک بار مثبت به پایداری می‌رسد.\nپ) در زیرلایه l=2 خود یک الکترون دارد.\nت) شمارهٔ بیرونی‌ترین لایهٔ آن برابر ۳ است.",
    image: null,
    imageAlt: "",
    options: ["الف - پ", "ب - ت", "ب - الف", "پ - ت"],
    correctIndex: 0,
    answer:
      "نخستین فلز واسطه اسکاندیم (₂₁Sc) است.\nSc : [Ar]3d¹4s²\n• الف درست: Sc در ساخت لامپ‌های تلویزیون رنگی و برخی شیشه‌های خاص کاربرد دارد.\n• ب نادرست: Sc با از دست دادن ۳ الکترون به یون پایدار Sc³⁺ می‌رسد، نه یون ۱+.\n• پ درست: Sc در زیرلایه 3d (l=2) تنها یک الکترون دارد.\n• ت نادرست: بیرونی‌ترین لایهٔ Sc لایهٔ چهارم است (4s²)، نه سوم.\nپاسخ: گزینه ۱."
  },
  {
    id: 171,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "پاسخ صحیح سوالات زیر، در کدام گزینه به درستی آمده است؟ (گزینه‌ها را از راست به چپ بخوانید)\n• نخستین فلز واسطه با نماد شیمیایی تک‌حرفی در کدام گروه قرار دارد؟\n• دومین گاز نجیب واکنش‌ناپذیر در کدام دوره قرار دارد؟\n• دومین عنصر اصلی در کدام دوره قرار دارد؟",
    image: null,
    imageAlt: "",
    options: ["۱، ۳، ۵", "۱، ۳، ۴", "۱، ۲، ۵", "۲، ۲، ۴"],
    correctIndex: 3,
    answer:
      "• نخستین فلز واسطه با نماد تک‌حرفی: وانادیوم (₂₃V) با نماد V، که در گروه ۵ قرار دارد.\n• دومین گاز نجیب واکنش‌ناپذیر: نئون (Ne)، که در دورهٔ ۲ است.\n• دومین عنصر اصلی: هلیم (He)، که در دورهٔ ۱ است.\nاز راست به چپ: ۱، ۲، ۵\nپاسخ: گزینه 4."
  },
  {
    id: 172,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "کدام گزینه در رابطه با عنصری که در دورهٔ سوم و گروه چهاردهم جدول تناوبی قرار دارد، نادرست است؟",
    image: null,
    imageAlt: "",
    options: [
      "برخلاف عنصر A در واکنش با دیگر اتم‌ها الکترون به اشتراک می‌گذارد.",
      "هم‌گروه با عنصر B (بور) است.",
      "برخلاف عنصر C شکننده است.",
      "مانند عنصر D سطح درخشانی دارد."
    ],
    correctIndex: 1,
    answer:
      "عنصر مورد نظر: سیلیسیم (₁₄Si) — دورهٔ ۳، گروه ۱۴.\n• گزینه ۱: Si الکترون به اشتراک می‌گذارد (پیوند کووالانسی). ✓\n• گزینه ۲: Si در گروه ۱۴ است، ولی بور (B) در گروه ۱۳ قرار دارد؛ پس این دو هم‌گروه نیستند. ✗ (نادرست)\n• گزینه ۳: Si شکننده است. ✓\n• گزینه ۴: Si سطح درخشان دارد. ✓\nپاسخ: گزینه ۲."
  },
  {
    id: 173,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text: "کدام گزینه نادرست است؟",
    image: null,
    imageAlt: "",
    options: [
      "در میان عنصرهای واسطه دورهٔ چهارم، دو عنصر وجود دارند که تعداد الکترون‌های دارای l=2 در اتم آن‌ها با اتم عنصر قبل از خود برابر است.",
      "پنجمین عنصر گروه چهاردهم همانند عنصری که ۱۴ الکترون دارای l=1 دارد، در واکنش با دیگر عنصرها الکترون به اشتراک می‌گذارد.",
      "عنصری که مجموع (n+l) الکترون‌های لایهٔ ظرفیت آن برابر ۱۹ است همانند عنصرهای قبل و زیرین خود به‌صورت مولکول‌های دو اتمی گازی شکل هستند.",
      "عدد اتمی سه عنصری که تعداد الکترون‌های آخرین زیرلایهٔ آن‌ها از تعداد الکترون‌های آخرین زیرلایه هر دو عنصر قبل و بعد از آن‌ها کمتر است، ۱۳، ۲۴ و ۳۷ هستند."
    ],
    correctIndex: 1,
    answer:
      "گزینه ۲ نادرست است.\n• پنجمین عنصر گروه ۱۴: سرب (Pb) که یک فلز است و در واکنش‌ها الکترون از دست می‌دهد.\n• عنصری که ۱۴ الکترون با l=1 دارد: ژرمانیم (Ge) که شبه‌فلز است و الکترون به اشتراک می‌گذارد.\nپس Pb برخلاف Ge عمل می‌کند و این دو در رفتار یکسان نیستند.\nپاسخ: گزینه ۲."
  },
  {
    id: 174,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) هرچه شعاع اتمی یک فلز بزرگ‌تر باشد، آسان‌تر الکترون از دست می‌دهد.\nب) شعاع اتمی عنصر ₃₇Rb بیشتر از ₁₁Na بوده و شعاع اتمی عنصر ₃₂Ge کمتر از ₁₄Si است.\nپ) آرایش الکترونی فشردهٔ عنصر ₂₃V به‌صورت [Ar]3d⁹4s² است.\nت) آرایش الکترونی فشردهٔ عنصر ₂₉Cu به‌صورت [Ar]3d⁹4s² است.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 1,
    answer:
      "فقط الف درست است.\n• الف درست: شعاع بزرگ‌تر → جداشدن الکترون آسان‌تر.\n• ب نادرست: شعاع Rb > Na (درست است) اما شعاع Ge (دورهٔ ۴) بزرگ‌تر از Si (دورهٔ ۳) است؛ پس «Ge کمتر از Si» نادرست است.\n• پ نادرست: ₂₃V = [Ar]3d³4s²، نه 3d⁹4s².\n• ت نادرست: ₂₉Cu = [Ar]3d¹⁰4s¹، نه 3d⁹4s².\nپاسخ: گزینه 2 (یعنی ۱ مورد)."
  },
  {
    id: 182,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "اگر مجموع (n+l) الکترون‌های آخرین زیرلایهٔ کاتیون X²⁺ که متعلق به عنصری واسطه از دورهٔ چهارم جدول تناوبی است، برابر با ۲۰ باشد، چند مورد از موارد زیر دربارهٔ اتم X درست است؟\n• آرایش الکترونی آن به 3d⁵ ختم می‌شود.\n• متعلق به گروه ششم جدول دوره‌ای است.\n• عنصر هم‌دورهٔ آن از گروه ۱۴ جدول تناوبی در اثر ضربه خرد نمی‌شود بلکه شکل آن تغییر می‌کند.\n• نسبت تعداد زیرلایه‌های پرشدهٔ آن به تعداد زیرلایه‌های اشغال‌شده از الکترون حدود ۰/۷۱ است.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 3,
    answer:
      "مجموع (n+l) برای هر الکترون 3d: 3+2=5 است. اگر مجموع = ۲۰ باشد: n×5 = ۲۰ ⇒ n = ۴ الکترون در 3d.\nپس X²⁺ = [Ar]3d⁴ و X = [Ar]3d⁴4s² (کروم).\n• «آرایش به 3d⁵ ختم می‌شود»: نادرست (به 4s² ختم می‌شود، اگرچه 3d⁴ دارد).\n• «گروه ششم»: Cr در گروه ۶ است. درست ✓\n• «Ge در اثر ضربه خرد نمی‌شود بلکه تغییر شکل می‌دهد»: نادرست (Ge شبه‌فلز است و در اثر ضربه خرد می‌شود).\n• «نسبت پرشده به اشغال‌شده ≈ ۰/۷۱»: در Cr، زیرلایه‌های پرشده = ۵ (1s، 2s، 2p، 3s، 3p) و اشغال‌شده = ۷؛ ۵/۷ ≈ ۰/۷۱. درست ✓\nپاسخ: گزینه 4 (یعنی ۲ مورد)."
  },
  {
    id: 186,
    section: "درس سوم: دنیای رنگی با عناصر دسته d",
    text:
      "چه تعداد از عبارت‌های زیر نادرست هستند؟\nالف) تمامی عناصر واسطه در طبیعت به شکل ترکیب‌های یونی یافت می‌شوند.\nب) عنصر Fe برخلاف Ca جزو عناصر دستهٔ d است.\nپ) شمار الکترون در زیرلایه l=2 در دو گونه Fe²⁺ و Fe²⁺ برابر است.\nت) فلزهای دستهٔ d همانند فلزهای دستهٔ s قابلیت ورقه شدن دارند.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 0,
    answer:
      "تنها عبارت «الف» نادرست است.\n• الف نادرست: تمام عناصر واسطه به شکل ترکیب یونی نیستند؛ مثلاً طلا در طبیعت به شکل فلزی و عنصری نیز یافت می‌شود.\n• ب درست: Fe در دستهٔ d و Ca در دستهٔ s است.\n• پ درست: هر دو گونه Fe²⁺ دارای ۳d⁶ هستند و ۶ الکترون d دارند.\n• ت درست: فلزهای d و s هر دو قابلیت ورقه شدن و چکش‌خواری دارند.\nپاسخ: گزینه ۱ (یعنی ۱ مورد)."
  }
];

const Chemistry2TransitionElements = () => {
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
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const percentage = (correctCount / QUESTIONS.length) * 100;
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

  const isAllAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return "#7B1FA2";
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
          backgroundColor: "#7B1FA2",
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
              🎨 آزمون شیمی (۲) - درس سوم
            </h1>
            <p style={{ marginTop: "10px", fontSize: "16px", opacity: 0.9 }}>
              دنیای رنگی با عناصر دستهٔ d — {QUESTIONS.length} سوال — پاسخ داده
              شده: {answeredCount}/{QUESTIONS.length}
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
        {QUESTIONS.map((q, index) => (
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
                display: "inline-block",
                backgroundColor: "#f3e5f5",
                color: "#7B1FA2",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              {q.section} - سوال {q.id}
            </div>

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
                  backgroundColor: "#7B1FA2",
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
                      border: isSelected
                        ? "3px solid #7B1FA2"
                        : "1px solid #dee2e6",
                      borderRadius: "10px",
                      backgroundColor: isSelected ? "#f3e5f5" : "#fff",
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
                        backgroundColor: isSelected ? "#7B1FA2" : "#fff",
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
                  backgroundColor: canCalculate ? "#7B1FA2" : "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50px",
                  cursor: canCalculate ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                  opacity: canCalculate ? 1 : 0.6,
                }}
              >
                {!isAllAnswered && !isTimeUp
                  ? `✅ ${answeredCount}/${QUESTIONS.length} پاسخ داده شده - ادامه دهید`
                  : "📊 محاسبه درصد"}
              </button>

              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
                  {QUESTIONS.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#7B1FA2" }}>
                ✅ درصد شما:{" "}
                <span style={{ color: getScoreColor(score!), fontSize: "28px" }}>
                  {Math.round(score!)}%
                </span>
                {isTimeUp && (
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#dc3545",
                      marginRight: "15px",
                    }}
                  >
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
              borderTop: "4px solid #7B1FA2",
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
                borderBottom: "3px solid #7B1FA2",
                paddingBottom: "20px",
                marginBottom: "40px",
                fontSize: "26px",
                color: "#7B1FA2",
              }}
            >
              📝 پاسخنامه تشریحی - درس سوم
            </h2>

            {QUESTIONS.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;

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
                        color: "#7B1FA2",
                        backgroundColor: "#f3e5f5",
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
                    <span style={{ fontSize: "15px" }}>
                      {" "}
                      {q.options[q.correctIndex]}
                    </span>
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

                    <span style={{ fontWeight: "bold", color: "#7B1FA2" }}>
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

export default Chemistry2TransitionElements;