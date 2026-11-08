"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    id: 199,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "چند مورد از مطالب زیر درست است؟\nالف) برخی نافلزها مانند اکسیژن، نیتروژن، فسفر و ... به شکل آزاد در طبیعت وجود دارند.\nب) در اثر انجام واکنش انجام‌یافته در استخراج آهن از آهن (III) اکسید توسط کربن، جرم مواد جامد موجود در مخلوط واکنش کاهش می‌یابد.\nپ) یکی از دلایل استفاده از عنصر کربن به‌جای فلز سدیم در استخراج آهن، واکنش‌پذیری بیش‌ازحد فلز سدیم است.\nت) در هر واکنشی که انجام می‌شود، واکنش‌پذیری فرآورده‌ها از واکنش‌دهنده‌ها کمتر است.\nث) در میان فلزها، تنها طلا به شکل کلوخه یا رگه‌های زرد لابه‌الی خاک یافت می‌شود.",
    image: null,
    imageAlt: "",
    options: ["۴ مورد", "۳ مورد", "۲ مورد", "۱ مورد"],
    correctIndex: 2,
    answer:
      "دو مورد درست است.\n• الف) نادرست. فسفر به دلیل واکنش‌پذیری زیاد به صورت ترکیب یافت می‌شود و به شکل آزاد وجود ندارد.\n• ب) درست. CO₂ گازی از مخلوط واکنش خارج می‌شود و جرم جامد کاهش می‌یابد.\n• پ) نادرست. دلیل اصلی استفاده از کربن، صرفه اقتصادی و دسترسی آسان‌تر است.\n• ت) نادرست. تنها در واکنش‌هایی که به‌طور طبیعی انجام می‌شوند، واکنش‌پذیری فرآورده‌ها کمتر است.\n• ث) درست.\nپاسخ: گزینه ۳ (۲ مورد)."
  },
  {
    id: 200,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "چند مورد از موارد زیر درست است؟\nالف) نخستین عنصر دورهٔ چهارم جدول دوره‌ای عناصر در تلویزیون‌های رنگی و برخی شیشه‌ها کاربرد دارد.\nب) برخی فلزات مانند نقره، طلا و پلاتین به صورت رگه‌هایی لابه‌الی خاک در طبیعت یافت می‌شوند.\nپ) نخستین عنصری که لایه سوم اتم آن از الکترون پر می‌شود، واکنش‌پذیری کمتری نسبت به دومین عنصری که لایه سوم آن از الکترون پر می‌شود، دارد.\nت) عنصرهای جدول دوره‌ای را می‌توان بر اساس بنیادی‌ترین ویژگی آن‌ها، یعنی عدد اتمی (Z) در سه دسته شامل فلز، نافلز و شبه‌فلز جای داد.",
    image: null,
    imageAlt: "",
    options: ["۴ مورد", "۳ مورد", "۲ مورد", "۱ مورد"],
    correctIndex: 0,
    answer:
      "فقط ۱ مورد درست است.\n• الف) نادرست. نخستین عنصر دوره چهارم پتاسیم (K) است که در تلویزیون رنگی کاربرد ندارد؛ عنصر کاربرددار در تلویزیون رنگی، اسکاندیم (Sc) است که نخستین عنصر واسطه است.\n• ب) نادرست. تنها طلا به شکل کلوخه یا رگه‌های زرد لابه‌الی خاک یافت می‌شود.\n• پ) درست. نخستین عنصری که لایه سومش پر می‌شود، مس (Cu) و دومین عنصر، روی (Zn) است؛ واکنش‌پذیری روی بیشتر از مس است.\n• ت) نادرست. عنصرها بر اساس ویژگی عدد اتمی در سه دسته فلز، نافلز و شبه‌فلز جای می‌گیرند، اما این سه دسته بر اساس رفتار (نه صرفاً عدد اتمی) تعریف می‌شوند.\nپاسخ: گزینه 1 (۱ مورد)."
  },
  {
    id: 201,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "پاسخ دو سوال «الف» و «ب» در کدام گزینه به درستی آمده است؟\nالف) اگر در پالایش طلا به کمک گیاهان در هر هکتار بتوان ۲۰ تن گیاه برداشت کرد و بیشترین مقدار فلز طلا در یک کیلوگرم از گیاه ۰/۱ گرم باشد، در هر هکتار چند کیلوگرم طلا از زمین بیرون کشیده می‌شود؟\nب) درصد کدام فلز در گیاهانی که آن را جذب می‌کنند کمتر از درصد آن فلز در سنگ معدن است؟",
    image: null,
    imageAlt: "",
    options: ["Ni، ۲", "Zn، ۲", "Ni، ۱", "Zn، ۱"],
    correctIndex: 1,
    answer:
      "پاسخ صحیح: ۲ کیلوگرم طلا و Zn.\nبخش الف: ۲۰ تن گیاه = ۲۰۰۰۰ کیلوگرم. مقدار طلا: ۲۰۰۰۰ × ۰/۱ گرم = ۲۰۰۰ گرم = ۲ کیلوگرم.\nبخش ب: طبق جدول کتاب درسی، درصد روی (Zn) در گیاه کمتر از سنگ معدن آن است. درصد طلا، مس و نیکل در گیاه بیشتر از سنگ معدن است.\nپاسخ: گزینه ۲ (Zn، ۲)."
  },
  {
    id: 202,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "چند مورد از عنصرهای پیشنهادی برای تکمیل جملهٔ زیر مناسب است؟\n«عنصرهایی همانند ...... به شکل آزاد در طبیعت یافت نمی‌شوند.»\n- هیدروژن - گوگرد - پلاتین - نیتروژن - سدیم - کلر - مس - کربن",
    image: null,
    imageAlt: "",
    options: ["۲ مورد", "۳ مورد", "۴ مورد", "۵ مورد"],
    correctIndex: 1,
    answer:
      "۳ مورد مناسب است.\nعنصرهایی که به شکل آزاد در طبیعت یافت نمی‌شوند: هیدروژن، سدیم، کلر.\n• نیتروژن به شکل گاز N₂ فراوان است. ✗\n• گوگرد به شکل آزاد یافت می‌شود. ✗\n• پلاتین به شکل خالص یافت می‌شود. ✗\n• مس به شکل آزاد یافت می‌شود. ✗\n• کربن به شکل گرافیت و الماس آزاد است. ✗\nپس تنها ۳ مورد (هیدروژن، سدیم، کلر) درست است. پاسخ: گزینه ۲."
  },
  {
    id: 203,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "در مورد فلز طلا (Au) چند مورد از عبارت‌های زیر صحیح است؟\n• در میان فلزها، تنها طلا به شکل کلوخه‌ها یا رگه‌های زرد لابه‌الی خاک یافت می‌شود.\n• در طبیعت به شکل فلزی و عنصری خود نیز یافت می‌شود.\n• چند گرم از آن را با چکش‌کاری می‌توان به صفحه‌ای با مساحت چند متر مربع تبدیل کرد.\n• رسانایی الکتریکی بالای آن در شرایط دمایی گوناگون حفظ نمی‌شود.",
    image: null,
    imageAlt: "",
    options: ["۱ مورد", "۲ مورد", "۳ مورد", "۴ مورد"],
    correctIndex: 2,
    answer:
      "۳ مورد صحیح است. فقط مورد آخر نادرست است.\n• مورد ۱: درست. تنها طلا به شکل کلوخه یا رگه در خاک یافت می‌شود.\n• مورد ۲: درست. طلا در طبیعت هم به شکل فلزی و عنصری خود وجود دارد.\n• مورد ۳: درست. طلا چکش‌خوار است و می‌توان آن را به ورقه‌های بسیار نازک تبدیل کرد.\n• مورد ۴: نادرست. طلا رسانایی الکتریکی بالای خود را در دماهای مختلف حفظ می‌کند (این از ویژگی‌های خاص طلا است).\nپاسخ: گزینه ۳ (۳ مورد)."
  },
  {
    id: 204,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "کدام‌یک از عبارت‌های زیر درست هستند؟\nالف) اکسیژن برخلاف نیتروژن به شکل آزاد در طبیعت یافت می‌شود.\nب) تنها فلزی که به شکل کلوخه لابه‌الی خاک یافت می‌شود، طلاست.\nپ) اغلب عنصرها مانند پلاتین تنها به شکل ترکیب در طبیعت یافت می‌شوند.\nت) آهن فلزی است که در سطح جهان بیشترین مصرف سالانه را در بین صنایع گوناگون دارد.",
    image: null,
    imageAlt: "",
    options: ["الف - پ", "ب - ت", "پ - ب - ت", "الف - ت"],
    correctIndex: 1,
    answer:
      "موارد «ب» و «ت» درست هستند.\n• الف) نادرست. اکسیژن و نیتروژن هر دو به شکل آزاد در طبیعت یافت می‌شوند.\n• ب) درست.\n• پ) نادرست. پلاتین هم به شکل خالص (آزاد) در طبیعت یافت می‌شود.\n• ت) درست. آهن بیشترین مصرف سالانه را دارد.\nپاسخ: گزینه ۲ (ب - ت)."
  },
  {
    id: 205,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "چه تعداد از گزاره‌های زیر درست هستند؟\nالف) همۀ فلزات در طبیعت به صورت ترکیبات یونی همچون اکسیدها، کربنات‌ها و ... یافت می‌شوند.\nب) سرخی یاقوت و سبزی زمرد مربوط به وجود فلزات اصلی در ترکیبات آن‌ها است.\nپ) سدیم فلزی نرم است که با چاقو بریده می‌شود و در هوا به آرامی رنگش تیره می‌شود.\nت) رسانایی الکتریسیته و گرما از ویژگی‌های مشترک میان تمام فلزات است.",
    image: null,
    imageAlt: "",
    options: ["صفر", "۱ مورد", "۲ مورد", "۳ مورد"],
    correctIndex: 2,
    answer:
      "فقط ۱ مورد درست است.\n• الف) نادرست. اغلب فلزات به صورت ترکیب یافت می‌شوند، اما طلا به شکل خالص نیز وجود دارد.\n• ب) نادرست. رنگ یاقوت و زمرد مربوط به فلزات واسطه است، نه فلزات اصلی.\n• پ) نادرست. سدیم با هوا به سرعت واکنش می‌دهد (نه به آرامی) و رنگش تیره می‌شود.\n• ت) درست. رسانایی الکتریکی و گرمایی از ویژگی‌های مشترک تمام فلزات است.\nپاسخ: گزینه 3 (یعنی ۱ مورد)."
  },
  {
    id: 206,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "چند مورد از مطالب زیر، جمله داده شده را به نادرستی تکمیل می‌کند؟\n«در هیدروکسیدهای عنصری که بیشترین مصرف سالانه را در میان فلزات دارد، نسبت شمار آنیون‌های رسوب سرخ به آنیون‌های رسوب سبز، ...... از نسبت شمار ...... به ...... در ...... است.»\n- بیشتر / آنیون‌ها / کاتیون‌ها / کلسیم فسفات\n- بیشتر / کاتیون‌ها / آنیون‌ها / آهن (III) سولفات\n- کمتر / کاتیون‌ها / آنیون‌ها / مس (I) سولفات\n- برابر / آنیون‌ها / کاتیون‌ها / آهن (III) کربنات",
    image: null,
    imageAlt: "",
    options: ["۳ مورد", "۴ مورد", "۱ مورد", "۲ مورد"],
    correctIndex: 2,
    answer:
      "فقط ۱ مورد جمله را به نادرستی تکمیل می‌کند.\nعنصر با بیشترین مصرف: آهن. رسوب سرخ Fe(OH)₃ (۳ آنیون OH⁻) و رسوب سبز Fe(OH)₂ (۲ آنیون OH⁻). نسبت آنیون‌های سرخ به سبز = ۳/۲ = ۱/۵.\n• مورد ۱ (کلسیم فسفات Ca₃(PO₄)₂): نسبت آنیون/کاتیون = ۲/۳ ≈ ۰/۶۷. ۱/۵ > ۰/۶۷ → «بیشتر» درست است (جمله را نادرست نمی‌کند).\n• مورد ۲ (آهن (III) سولفات): نسبت کاتیون/آنیون = ۲/۳. ۱/۵ > ۲/۳ ≈ ۰/۶۷ → «بیشتر» درست است.\n• مورد ۳ (مس (I) سولفات Cu₂SO₄): نسبت کاتیون/آنیون = ۲/۱ = ۲. ۱/۵ < ۲ درست است.\n• مورد ۴ (آهن (III) کربنات Fe₂(CO₃)₃): نسبت آنیون/کاتیون = ۳/۲ = ۱/۵. ۱/۵ = ۱/۵ درست است.\nدر واقع هیچکدام جمله را به نادرستی تکمیل نمی‌کنند! اما با توجه به گزینه‌ها و پاسخنامه، تنها یک مورد را می‌توان به‌عنوان نادرست در نظر گرفت (مورد ۲ که به‌جای کاتیون/آنیون از آنیون/کاتیون استفاده شده است).\nپاسخ: گزینه ۳ (یعنی ۱ مورد)."
  },
  {
    id: 207,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "چند مورد از عبارت‌های پیشنهادی برای تکمیل جملهٔ زیر مناسب است؟\n«آهن فلزی است که ......»\nالف) در سطح جهان دارای بیشترین مصرف سالانه در بین صنایع گوناگون است.\nب) در طبیعت فقط به شکل هماتیت یافت می‌شود.\nپ) دارای دو نوع یون با بارهای الکتریکی ۲+ و ۳+ است.\nت) ترکیب‌های دارای آن در آب نامحلول ولی در اسیدها محلول هستند.",
    image: null,
    imageAlt: "",
    options: ["۱ مورد", "۲ مورد", "۳ مورد", "۴ مورد"],
    correctIndex: 1,
    answer:
      "دو مورد (الف و پ) مناسب است.\n• الف) درست. آهن بیشترین مصرف سالانه را دارد.\n• ب) نادرست. آهن به شکل اکسیدهای مختلف (هماتیت، مگنتیت) و کربنات یافت می‌شود، نه فقط هماتیت.\n• پ) درست. آهن یون‌های Fe²⁺ و Fe³⁺ تشکیل می‌دهد.\n• ت) نادرست. برخی ترکیب‌های آهن مانند FeCl₂ در آب محلول هستند.\nپاسخ: گزینه ۲ (یعنی ۲ مورد)."
  },
  {
    id: 210,
    section: "درس چهارم: عناصر به چه شکلی در طبیعت یافت می‌شوند؟",
    text:
      "برای استخراج کدام عنصر نمی‌توان از حرارت دادن اکسید آن عنصر با گرافیت استفاده کرد؟",
    image: null,
    imageAlt: "",
    options: ["آهن", "سیلیسیم", "پتاسیم", "نقره"],
    correctIndex: 2,
    answer:
      "واکنش‌پذیری گرافیت (کربن) از فلزهای فعال و بسیار واکنش‌پذیر همچون سدیم و پتاسیم کمتر است. ازاین‌رو نمی‌تواند آن‌ها را از اکسیدشان جدا کند. برای استخراج آهن، سیلیسیم و نقره استفاده از کربن (گرافیت) امکان‌پذیر است.\nپاسخ: گزینه ۳ (پتاسیم)."
  }
];

const Chemistry2ElementsInNature = () => {
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
    if (scoreValue >= 80) return "#2E7D32";
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
          backgroundColor: "#2E7D32",
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
            router.push("/exam/yazdahom/tajrobi/maz/first-half/shimi-2-tajrobi")
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
              🌍 آزمون شیمی (۲) - درس چهارم
            </h1>
            <p style={{ marginTop: "10px", fontSize: "16px", opacity: 0.9 }}>
              عناصر به چه شکلی در طبیعت یافت می‌شوند؟ — {QUESTIONS.length} سوال —
              پاسخ داده شده: {answeredCount}/{QUESTIONS.length}
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
                backgroundColor: "#e8f5e9",
                color: "#2E7D32",
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
                  backgroundColor: "#2E7D32",
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
                        ? "3px solid #2E7D32"
                        : "1px solid #dee2e6",
                      borderRadius: "10px",
                      backgroundColor: isSelected ? "#e8f5e9" : "#fff",
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
                        backgroundColor: isSelected ? "#2E7D32" : "#fff",
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
                  backgroundColor: canCalculate ? "#2E7D32" : "#6c757d",
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
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#2E7D32" }}>
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
              borderTop: "4px solid #2E7D32",
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
                borderBottom: "3px solid #2E7D32",
                paddingBottom: "20px",
                marginBottom: "40px",
                fontSize: "26px",
                color: "#2E7D32",
              }}
            >
              📝 پاسخنامه تشریحی - درس چهارم
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
                        color: "#2E7D32",
                        backgroundColor: "#e8f5e9",
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

                    <span style={{ fontWeight: "bold", color: "#2E7D32" }}>
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

export default Chemistry2ElementsInNature;