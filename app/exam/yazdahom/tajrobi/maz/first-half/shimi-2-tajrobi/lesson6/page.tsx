"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    id: 208,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "آرایش الکترونی عنصر A به 4s1 و عنصر B به 3s1 ختم می‌شود، چه تعداد از عبارت‌های زیر می‌تواند پیرامون دو عنصر A و B درست باشد؟\nالف) واکنش‌پذیری عنصر A از عنصر B کمتر است.\nب) هر دو در دورهٔ سوم جدول تناوبی جای دارند.\nپ) وجود فلز A در طبیعت دیده شده است.\nت) هر دو در یک گروه جدول تناوبی هستند.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "A = K (پتاسیم) و B = Na (سدیم) هستند.\nالف) نادرست، واکنش‌پذیری K بیشتر است.\nب) نادرست، K در دوره ۴ است.\nپ) نادرست، فلزات قلیایی در طبیعت به شکل ترکیب یافت می‌شوند.\nت) درست، هر دو در گروه ۱ هستند.\nپاسخ: گزینه 3 (فقط ۱ مورد درست است)."
  },
  {
    id: 209,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "کدام گزینه درست است؟",
    image: null,
    imageAlt: "",
    options: [
      "تمایل تبدیل به کاتیون در آهن بیشتر از سدیم است.",
      "سرعت واکنش در هوای مرطوب در روی بیشتر از نقره است.",
      "در واکنش ۴ FeO(s) + C(s) → ... واکنش‌پذیری واکنش‌دهنده‌ها از فرآورده‌ها کمتر است.",
      "واکنش ۵ Na2O(s) + C(s) → ... به‌طور طبیعی انجام می‌شود."
    ],
    correctIndex: 1,
    answer: "واکنش‌پذیری روی از نقره بیشتر است، بنابراین در هوای مرطوب سریع‌تر واکنش می‌دهد.\nگزینه ۱ نادرست است (واکنش‌پذیری سدیم بیشتر است).\nگزینه ۳ نادرست است.\nگزینه ۴ نادرست است (کربن نمی‌تواند سدیم را از اکسید جدا کند).\nپاسخ: گزینه ۲."
  },
  {
    id: 210,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "برای استخراج کدام عنصر نمی‌توان از حرارت دادن اکسید آن عنصر با گرافیت استفاده کرد؟",
    image: null,
    imageAlt: "",
    options: ["آهن", "سیلیسیم", "پتاسیم", "نقره"],
    correctIndex: 2,
    answer: "واکنش‌پذیری گرافیت (کربن) از فلزهای فعال و بسیار واکنش‌پذیر همچون سدیم و پتاسیم کمتر است. ازاین‌رو نمی‌تواند آن‌ها را از اکسیدشان جدا کند. برای استخراج آهن، سیلیسیم و نقره استفاده از کربن (گرافیت) امکان‌پذیر است.\nپاسخ: گزینه ۳ (پتاسیم)."
  },
  {
  id: 225,
  section: "درس ۱-۶: واکنش‌پذیری عنصرها",
  text: "کدام واکنش انجام‌پذیر نیست؟",
  image: null,
  imageAlt: "",
  options: [
    "KI + Br₂ →",
    "KBr + I₂ →",
    "KBr + Cl₂ →",
    "KI + Cl₂ →"
  ],
  correctIndex: 1,
  answer: "واکنش‌پذیری هالوژن‌ها به ترتیب Cl₂ > Br₂ > I₂ است و هر هالوژن می‌تواند یون هالید کم‌واکنش‌تر را جابه‌جا کند.\nگزینه ۱: Br₂ از I₂ واکنش‌پذیرتر است، پس واکنش انجام‌پذیر است.\nگزینه ۲: I₂ از Br₂ کم‌واکنش‌تر است و نمی‌تواند یون Br⁻ را جابه‌جا کند، پس واکنش انجام‌پذیر نیست.\nگزینه ۳: Cl₂ از Br₂ واکنش‌پذیرتر است، پس واکنش انجام‌پذیر است.\nگزینه ۴: Cl₂ از I₂ واکنش‌پذیرتر است، پس واکنش انجام‌پذیر است.\nپاسخ: گزینه ۲."
},
  {
    id: 226,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "کدام گزینه زیر نادرست است؟\n۱) شرایط نگهداری عنصر سدیم از آلومینیم آسان‌تر است.\n۲) تمایل تبدیل به حالت ترکیب مواد در عنصر سدیم بیشتر از پتاسیم است.\n۳) واکنش‌پذیری فلزات قلیایی خاکی از واکنش‌پذیری فلزات قلیایی و واسطه بیشتر است.\n۴) تمایل به کاتیون شدن در عنصر روی بیشتر از عنصر مس است.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 3,
    answer: "واکنش‌پذیری فلزات قلیایی (گروه اول) از فلزات قلیایی خاکی (گروه دوم) بیشتر است. بنابراین گزینه 4 نادرست است.\nپاسخ: گزینه ۳."
  },
  {
    id: 227,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "باتوجه به واکنش‌های زیر، کدام مقایسه در مورد واکنش‌پذیری عنصرها صحیح است؟\nI) Fe(s) + CuO(s) → FeO(s) + Cu(s)\nII) FeO(s) + C(s) → CO(g) + Fe(s)\nIII) Na2O(s) + C(s) → واکنش نمی‌دهد\nIV) Zn(s) + CuCl2(aq) → ZnCl2(aq) + Cu(s)",
    image: null,
    imageAlt: "",
    options: ["Na > Fe > C", "Cu > Zn > Na", "Na > C > Fe", "Cu > Na > Fe"],
    correctIndex: 2,
    answer: "واکنش I: Fe > Cu\nواکنش II: C > Fe\nواکنش III: Na > C (چون Na2O با C واکنش نمی‌دهد، پس C نمی‌تواند Na را جدا کند)\nواکنش IV: Zn > Cu\nترکیب این روابط: Na > C > Fe > Cu.\nبنابراین Na > C > Fe درست است.\nپاسخ: گزینه ۳."
  },
  {
    id: 228,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "کدام گزینۀ زیر پیرامون کاتیون و آنیون NaCl نادرست است؟ (11Na, 17Cl)\n۱) عنصر کاتیون آن فلزی نرم است که با چاقو بریده می‌شود.\n۲) جلای نقره‌ای فلز سدیم در مجاورت هوا به آرامی از بین می‌رود و سطح آن کدر می‌شود.\n۳) عنصر آنیون آن در دمای اتاق به آرامی با گاز هیدروژن واکنش می‌دهد.\n۴) هر دو عنصر سدیم و کلر در دورۀ سوم جدول تناوبی جای دارند.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 1,
    answer: "گاز کلر در دمای اتاق به‌آرامی با گاز هیدروژن واکنش می‌دهد، نادرست است. (کلر در دمای اتاق به آرامی واکنش می‌دهد، اما عبارت درست آن است که کلر به سرعت واکنش می‌دهد، نه به آرامی در این متن خاص).\nپاسخ: گزینه 2."
  },
  {
    id: 229,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "کدام فلز در شرایط یکسان در هوای مرطوب سریع‌تر واکنش می‌دهد؟",
    image: null,
    imageAlt: "",
    options: ["K", "Fe", "Cu", "Na"],
    correctIndex: 0,
    answer: "پتاسیم (K) در گروه اول و پایین‌تر از سدیم قرار دارد، بنابراین واکنش‌پذیری بیشتری دارد و در هوای مرطوب سریع‌تر واکنش می‌دهد.\nپاسخ: گزینه ۱."
  },
  {
    id: 230,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "کدام مقایسۀ زیر به درستی انجام شده است؟",
    image: null,
    imageAlt: "",
    options: [
      "Ag > Fe : تمایل به تبدیل شدن به کاتیون",
      "Cu < Au : واکنش سریع‌تر در هوای مرطوب",
      "Fe < C : سهل بودن تأمین شرایط نگهداری",
      "Zn < Na : تمایل به تبدیل شدن به کاتیون"
    ],
    correctIndex: 3,
    answer: "تمایل به تبدیل شدن به کاتیون در سدیم (فلز قلیایی) بیشتر از روی (فلز واسطه) است. بنابراین Zn < Na درست است.\nپاسخ: گزینه 4."
  },
  {
    id: 231,
    section: "درس ۱-۶: واکنش‌پذیری عناصرها",
    text: "واکنش‌پذیری فلز A از B بیشتر است. چه تعداد از عبارت‌های زیر پیرامون این دو عنصر درست می‌باشد؟\nالف) اگر عنصر A طلا باشد، عنصر B می‌تواند روی باشد.\nب) فلز A در هوای مرطوب سریع‌تر از فلز B واکنش می‌دهد.\nپ) شرایط نگهداری B از A آسان‌تر است.\nت) عنصر B به نسبت A تمایل کمتری برای کاتیون شدن دارد.",
    image: null,
    imageAlt: "",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "عبارت‌های ب و پ درست هستند. (A واکنش‌پذیرتر است، پس سریع‌تر واکنش می‌دهد و B که کم‌واکنش‌پذیرتر است شرایط نگهداری آسان‌تری دارد).\nپاسخ: گزینه ۳ (یعنی ۲ مورد درست است)."
  },
];

const Chemistry2ReactivityOfElements = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins for more questions
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
              🌍 آزمون شیمی (۲) - درس ۱-۶: واکنش‌پذیری عناصرها
            </h1>
            <p style={{ marginTop: "10px", fontSize: "16px", opacity: 0.9 }}>
              سری واکنش‌پذیری فلزها، واکنش‌های جانشینی و ترمیت — {QUESTIONS.length} سوال —
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
              📝 پاسخنامه تشریحی - درس ۱-۶
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

export default Chemistry2ReactivityOfElements;