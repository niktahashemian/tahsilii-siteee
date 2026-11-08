"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    id: 7,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "چه تعداد از عناصر زیر هم در واکنش با دیگر عنصرها الکترون از دست می‌دهند و هم در اثر ضربه خرد نمی‌شوند؟\nCl, Ge, S, Al, C, Mg, Sn",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer:
      "عنصرهایی که هم الکترون از دست می‌دهند و هم در اثر ضربه خرد نمی‌شوند، فلزهای چکش‌خوار هستند.\nاز میان عناصر داده‌شده، Al، Mg و Sn فلز هستند و این ویژگی را دارند.\nGe شبه‌فلز است و الکترون به اشتراک می‌گذارد و در اثر ضربه خرد می‌شود. Cl، S و C نیز نافلز هستند.\nبنابراین تعداد درست = ۳.\nگزینه ۳ صحیح است.",
  },
  {
    id: 12,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "اگر ۲۵/۲۵ گرم پتاسیم نیترات با خلوص ۸۰ درصد، بر اثر گرما در دمای بالای ۵۰۰ درجه سانتی‌گراد به میزان ۵۰ درصد، مطابق واکنش موازنه‌نشده زیر تجزیه شود، جرم مواد جامد برجای‌مانده در ظرف چند گرم است؟\nKNO₃(s) → K₂O(s) + N₂(g) + O₂(g)\n(N = 14, O = 16, K = 39 : g.mol⁻¹)",
    options: ["۴/۷۵", "۱۴/۸۵", "۱۹/۸۵", "۲۰/۲۰"],
    correctIndex: 2,
    answer:
      "جرم KNO₃ خالص = ۲۵/۲۵ × ۰/۸ = ۲۰/۲ گرم.\nمقداری که تجزیه می‌شود = ۲۰/۲ × ۰/۵ = ۱۰/۱ گرم.\nمعادله موازنه‌شده: 4KNO₃ → 2K₂O + 2N₂ + 5O₂.\nجرم گازهای N₂ و O₂ متناسب با ۱۰/۱ گرم KNO₃ حدود ۵/۴ گرم است.\nجرم جامد باقی‌مانده = ۲۵/۲۵ − ۵/۴ = ۱۹/۸۵ گرم.\nگزینه ۳ صحیح است.",
  },
  {
    id: 18,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "چند مورد از عبارت‌های زیر درست است؟\nالف) تعدادی از عنصرهای اصلی دستهٔ p، شبه‌فلز و بقیه نافلز محسوب می‌شوند.\nب) عنصرهای دستهٔ اصلی ۵ همگی فلز هستند و رسانای جریان برق می‌باشند.\nپ) در تناوب سوم شمار نافلزهای جامد و شمار عنصرهای گازی یکسان است.\nت) عنصرهای چکش‌خوار نظیر سرب و ژرمانیوم سخت بوده و بر اثر ضربه خرد نمی‌شوند.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 0,
    answer:
      "فقط عبارت «پ» درست است.\nدر تناوب سوم، نافلزهای جامد فسفر و گوگرد هستند و عنصرهای گازی کلر و آرگون؛ بنابراین شمار نافلزهای جامد (۲) و شمار عنصرهای گازی (۲) برابر است.\nعبارت الف نادرست است؛ زیرا در دستهٔ p هم فلز، هم شبه‌فلز و هم نافلز وجود دارد.\nعبارت ب نادرست است؛ دستهٔ اصلی ۵ شامل نافلزهایی مانند نیتروژن و فسفر نیز می‌شود.\nعبارت ت نادرست است؛ ژرمانیوم شبه‌فلز است و در اثر ضربه خرد می‌شود.\nبنابراین تنها ۱ مورد درست است. گزینه ۱ صحیح است.",
  },
  {
    id: 21,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "عناصر «ژرمانیم» و «قلع» در چه تعداد از ویژگی‌های زیر مشترک هستند؟\nالف) به اشتراک گذاشتن الکترون هنگام واکنش\nب) دورهٔ یکسان در جدول تناوبی عناصر\nپ) نسبت شمار الکترون‌های ظرفیتی به شمار الکترون‌های لایهٔ سوم\nت) رسانایی الکتریکی بالا",
    options: ["۲", "۴", "۱", "۳"],
    correctIndex: 2,
    answer:
      "تنها ویژگی «پ» مشترک است.\nژرمانیم و قلع هر دو در گروه ۱۴ جدول تناوبی هستند؛ بنابراین هر دو ۴ الکترون ظرفیتی دارند و لایهٔ سوم آن‌ها نیز کامل و دارای ۱۸ الکترون است. پس نسبت شمار الکترون‌های ظرفیتی به الکترون‌های لایهٔ سوم در هر دو برابر است.\nاما دورهٔ آن‌ها یکسان نیست؛ ژرمانیم در دورهٔ چهارم و قلع در دورهٔ پنجم است.\nرسانایی الکتریکی قلع بالاست، ولی ژرمانیم رسانایی کمی دارد.\nقلع در واکنش‌ها الکترون از دست می‌دهد، ولی ژرمانیم الکترون به اشتراک می‌گذارد.\nبنابراین فقط ۱ ویژگی مشترک است. گزینه ۱ صحیح است.",
  },
  {
    id: 29,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "در چند گروه از جدول تناوبی، هر سه گونه از عنصرها (فلز، نافلز و شبه‌فلز) یافت می‌شود؟",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 1,
    answer:
      "در گروه‌های ۱۴ و ۱۵ جدول تناوبی هر سه گونهٔ فلز، نافلز و شبه‌فلز دیده می‌شود.\nگروه ۱۴: کربن (نافلز)، سیلیسیم و ژرمانیم (شبه‌فلز)، قلع و سرب (فلز).\nگروه ۱۵: نیتروژن و فسفر (نافلز)، آرسنیک و آنتیموان (شبه‌فلز)، بیسموت (فلز).\nبنابراین در ۲ گروه این ویژگی وجود دارد. گزینه ۲ صحیح است.",
  },
  {
    id: 42,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "در متن زیر چند غلط علمی وجود دارد؟\n«جدول تناوبی عناصر شامل ۷ گروه و ۱۸ دوره است. تنها تعیین گروه عناصر در جدول تناوبی، کمک شایانی به پیش‌بینی خواص و رفتار آن‌ها خواهد کرد.»",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 1,
    answer:
      "در این متن دو غلط علمی وجود دارد:\n۱) جدول تناوبی شامل ۷ دوره و ۱۸ گروه است، نه ۷ گروه و ۱۸ دوره.\n۲) برای پیش‌بینی خواص و رفتار عناصر، تعیین هم دوره و هم گروه اهمیت دارد؛ نه تنها گروه.\nبنابراین ۲ غلط وجود دارد. گزینه ۲ صحیح است.",
  },
  {
    id: 55,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "در دورهٔ سوم جدول تناوبی به ترتیب از راست به چپ چند نافلز، چند شبه‌فلز و چند فلز قرار دارد؟",
    options: ["۴، ۱، ۳", "۴، ۴، ۴", "۴، ۲، ۲", "۵، ۵، ۵"],
    correctIndex: 0,
    answer:
      "دورهٔ سوم شامل: Na، Mg، Al (فلز)، Si (شبه‌فلز)، P، S، Cl، Ar (نافلز) است.\nاز راست به چپ: Cl، S، P، Ar (۴ نافلز)، Si (۱ شبه‌فلز)، Al، Mg، Na (۳ فلز).\nبنابراین ترتیب «۴ نافلز، ۱ شبه‌فلز، ۳ فلز» است.\nگزینه ۱ صحیح است.",
  },
  {
    id: 64,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "همه گزینه‌های زیر درست هستند؛ به‌جز ............\n۱) سدیم فلزی نرم است که با چاقو بریده می‌شود.\n۲) بیشترین خصلت فلزی در هر دوره از جدول تناوبی مربوط به فلزات گروه اول است.\n۳) خواص فیزیکی عناصر همانند خواص شیمیایی آن‌ها به صورت دوره‌ای تکرار می‌شود.\n۴) بیشترین خصلت نافلزی در هر دوره از جدول تناوبی مربوط به عناصر گروه پانزدهم است.",
    options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
    correctIndex: 3,
    answer:
      "گزینه ۴ نادرست است.\nدر هر دوره از جدول تناوبی، بیشترین خصلت نافلزی مربوط به عناصر گروه ۱۷ (هالوژن‌ها) است، نه گروه ۱۵.\nگزینه‌های ۱، ۲ و ۳ درست هستند.\nبنابراین پاسخ گزینه ۴ است.",
  },
  {
    id: 68,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text: "کدام عنصر زیر خصلت فلزی بیشتری دارد؟",
    options: ["₁₁B", "₁₂A", "₃₇D", "₁₃C"],
    correctIndex: 2,
    answer:
      "خصلت فلزی در جدول تناوبی از بالا به پایین در یک گروه افزایش می‌یابد و در یک دوره از چپ به راست کاهش می‌یابد.\nعنصر ₃₇D همان روبیدیم (Rb) از گروه اول و دورهٔ پنجم است و در میان گزینه‌ها بیشترین خصلت فلزی را دارد.\nعناصر ₁₁B (Na)، ₁₂A (Mg) و ₁₃C (Al) در دورهٔ سوم هستند و خصلت فلزی کمتری نسبت به Rb دارند.\nگزینه ۳ صحیح است.",
  },
  {
    id: 73,
    section: "درس اول: الگوها و روندها در رفتار مواد و عناصر",
    text:
      "کدام گزینه درست است؟\n۱) همهٔ عناصر دستهٔ p در واکنش با دیگر اتم‌ها، الکترون به اشتراک می‌گذارند.\n۲) همهٔ نافلزات در دستهٔ p قرار گرفته‌اند.\n۳) همهٔ فلزات با از دست دادن الکترون، به آرایش گاز نجیب قبل از خود می‌رسند.\n۴) سرعت واکنش هالوژن‌ها با گاز هیدروژن، با افزایش عدد اتمی آن‌ها کاهش می‌یابد.",
    options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
    correctIndex: 3,
    answer:
      "گزینه ۴ درست است.\nدر گروه هالوژن‌ها با افزایش عدد اتمی، شعاع اتمی افزایش می‌یابد و واکنش‌پذیری کاهش می‌یابد؛ بنابراین سرعت واکنش با گاز هیدروژن نیز کاهش می‌یابد.\nگزینه ۱ نادرست است؛ همهٔ عناصر دستهٔ p لزوماً الکترون به اشتراک نمی‌گذارند.\nگزینه ۲ نادرست است؛ هلیم و هیدروژن از دستهٔ s هستند.\nگزینه ۳ نادرست است؛ برخی فلزات واسطه با از دست دادن الکترون به آرایش گاز نجیب نمی‌رسند.\nپاسخ گزینه ۴ است.",
  },
];

const Chemistry2PatternsTrends = () => {
  const router = useRouter();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
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

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
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
    if (scoreValue >= 80) return "#28a745";
    if (scoreValue >= 50) return "#ffc107";
    return "#dc3545";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
          backgroundColor: "#1565C0",
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
            router.push(
              "/exam/yazdahom/riyazi/maz/first-half/shimi-2"
            )
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
              🧪 آزمون شیمی (۲) - درس اول
            </h1>
            <p style={{ marginTop: "10px", fontSize: "16px", opacity: 0.9 }}>
              الگوها و روندها در رفتار مواد و عناصر - {QUESTIONS.length} سوال -
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
                backgroundColor: "#e3f2fd",
                color: "#1565C0",
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
                  backgroundColor: "#1565C0",
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
                        ? "3px solid #1565C0"
                        : "1px solid #dee2e6",
                      borderRadius: "10px",
                      backgroundColor: isSelected ? "#e3f2fd" : "#fff",
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
                        backgroundColor: isSelected ? "#1565C0" : "#fff",
                        color: isSelected ? "#fff" : "#000",
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
                  backgroundColor: canCalculate ? "#1565C0" : "#6c757d",
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
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1565C0" }}>
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

              {!isTimeUp && (
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
              )}
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
              borderTop: "4px solid #1565C0",
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
                borderBottom: "3px solid #1565C0",
                paddingBottom: "20px",
                marginBottom: "40px",
                fontSize: "26px",
                color: "#1565C0",
              }}
            >
              📝 پاسخنامه تشریحی
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
                        color: "#1565C0",
                        backgroundColor: "#e3f2fd",
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

                    <span style={{ fontWeight: "bold", color: "#1565C0" }}>
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

export default Chemistry2PatternsTrends;