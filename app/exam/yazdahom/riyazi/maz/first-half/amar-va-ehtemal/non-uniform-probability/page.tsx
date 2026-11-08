"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// ✅ تعریف تایپ برای سؤال
interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  answer: string;
}

const NonUniformProbabilityQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ✅ سوالات درس ۲-۲: احتمال غیرهم‌شأنس
  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: 'در یک تاس ناسالم، احتمال آمدن هر عدد متناسب با خود عدد است. یعنی P(۱) = k، P(۲) = ۲k، ... و P(۶) = ۶k. مقدار k کدام است؟',
        options: ['۱/۶', '۱/۱۲', '۱/۲۱', '۱/۲۴'],
        correctIndex: 2,
        answer: 'مجموع احتمال‌ها باید ۱ باشد: k + ۲k + ۳k + ۴k + ۵k + ۶k = ۲۱k = ۱، پس k = ۱/۲۱.',
      },
      {
        id: 2,
        text: 'در همان تاس ناسالم (P(n) = n·k با k = ۱/۲۱)، احتمال آمدن عدد زوج کدام است؟',
        options: ['۱/۲', '۴/۷', '۸/۲۱', '۱۱/۲۱'],
        correctIndex: 1,
        answer: 'اعداد زوج ۲، ۴ و ۶ هستند. P = ۲k + ۴k + ۶k = ۱۲k = ۱۲/۲۱ = ۴/۷.',
      },
      {
        id: 3,
        text: 'در یک فضای نمونه‌ای غیرهم‌شأنس با ۳ پیشامد ساده، اگر احتمال‌ها به ترتیب ۰/۲، ۰/۳ و ۰/۵ باشند، احتمال پیشامد {اولی, سومی} کدام است؟',
        options: ['۰/۲', '۰/۵', '۰/۷', '۰/۸'],
        correctIndex: 2,
        answer: 'در فضای غیرهم‌شأنس، احتمال اجتماع پیشامدهای ناسازگار برابر مجموع احتمال‌های آن‌هاست: ۰/۲ + ۰/۵ = ۰/۷.',
      },
      {
        id: 4,
        text: 'در پرتاب یک سکه ناسالم، احتمال شیر ۰/۷ است. احتمال خط کدام است؟',
        options: ['۰/۷', '۰/۳', '۰/۵', '۰/۷۰'],
        correctIndex: 1,
        answer: 'مجموع احتمال شیر و خط باید ۱ باشد: P(خط) = ۱ − ۰/۷ = ۰/۳.',
      },
      {
        id: 5,
        text: 'در تاس ناسالمی که P(n) = n/۲۱ باشد، احتمال آمدن عددی بزرگ‌تر از ۴ کدام است؟',
        options: ['۲/۷', '۵/۲۱', '۱۱/۲۱', '۱/۳'],
        correctIndex: 2,
        answer: 'اعداد بزرگ‌تر از ۴: ۵ و ۶. P = ۵/۲۱ + ۶/۲۱ = ۱۱/۲۱.',
      },
      {
        id: 6,
        text: 'در یک فضای غیرهم‌شأنس، کدام شرط برای احتمال‌های پیشامدهای ساده ضروری است؟',
        options: [
          'همه برابر ۱/n باشند',
          'مجموع آن‌ها برابر ۱ باشد',
          'همه بزرگ‌تر از ۱ باشند',
          'حاصل‌ضرب آن‌ها برابر ۱ باشد',
        ],
        correctIndex: 1,
        answer: 'در هر فضای نمونه‌ای (هم‌شأنس یا غیرهم‌شأنس)، مجموع احتمال‌های پیشامدهای ساده برابر ۱ است. در فضای هم‌شأنس، هر کدام ۱/n است، اما در غیرهم‌شأنس لزوماً برابر نیستند.',
      },
      {
        id: 7,
        text: 'در تاس ناسالمی که P(۱) = ۰/۱، P(۲) = ۰/۱، P(۳) = ۰/۲، P(۴) = ۰/۲، P(۵) = ۰/۲ باشد، P(۶) کدام است؟',
        options: ['۰/۱', '۰/۲', '۰/۳', '۰/۴'],
        correctIndex: 1,
        answer: 'مجموع باید ۱ باشد: ۰/۱ + ۰/۱ + ۰/۲ + ۰/۲ + ۰/۲ = ۰/۸. پس P(۶) = ۱ − ۰/۸ = ۰/۲.',
      },
      {
        id: 8,
        text: 'در تاس ناسالم با P(n) = n/۲۱، پیشامد «آمدن عددی اول» (۲، ۳، ۵) چه احتمالی دارد؟',
        options: ['۱۰/۲۱', '۵/۲۱', '۶/۲۱', '۱۱/۲۱'],
        correctIndex: 0,
        answer: 'اعداد اول تاس: ۲، ۳، ۵. P = ۲/۲۱ + ۳/۲۱ + ۵/۲۱ = ۱۰/۲۱.',
      },
    ],
    []
  );

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ========== محاسبه درصد ==========
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
  }, [selectedAnswers, questions]);

  // ========== انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // ========== تایمر ==========
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

  // ========== پایان زمان ==========
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
    <div
      style={{
        fontFamily: 'Tahoma, Arial, sans-serif',
        width: '100vw',
        minHeight: '100vh',
        padding: '15px 10px',
        backgroundColor: '#f8f9fa',
        direction: 'rtl',
        textAlign: 'right',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* ==================== هدر ==================== */}
      <div
        style={{
          backgroundColor: '#1A237E',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <button
          onClick={() => router.push('/exam/yazdahom/riyazi/maz/first-half/amar-va-ehtemal')}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ← بازگشت
        </button>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              🎲 آزمون آمار و احتمال - احتمال غیرهم‌شأنس
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div
            style={{
              backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
              padding: '10px 25px',
              borderRadius: '50px',
              fontSize: '24px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* ==================== سوالات ==================== */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div
            key={q.id}
            style={{
              marginBottom: '25px',
              backgroundColor: '#ffffff',
              padding: '20px 25px',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '17px',
                lineHeight: '1.9',
                marginBottom: '20px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'flex-start',
                whiteSpace: 'pre-wrap',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#1A237E',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  textAlign: 'center',
                  lineHeight: '30px',
                  borderRadius: '50%',
                  fontSize: '14px',
                  marginLeft: '15px',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px 30px',
                marginRight: '20px',
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
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '28px',
                        height: '28px',
                        border: '1px solid #000',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '28px',
                        fontSize: '14px',
                        marginLeft: '15px',
                        backgroundColor: isSelected ? '#1A237E' : '#fff',
                        color: isSelected ? '#fff' : '#000',
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

        {/* ==================== دکمه محاسبه ==================== */}
        <div
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            textAlign: 'center',
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
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6,
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A237E' }}>
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score as number), fontSize: '28px' }}>
                  {Math.round(score as number)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>
                    (زمان پایان یافت)
                  </span>
                )}
              </div>
              <div
                style={{
                  width: '80%',
                  maxWidth: '400px',
                  height: '20px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  margin: '15px auto',
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
                    height: '100%',
                    backgroundColor: getScoreColor(score as number),
                    transition: 'width 0.8s ease-in-out',
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
                  padding: '10px 25px',
                  fontSize: '14px',
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '10px',
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
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}
          >
            {showAnswers ? '❌ بستن پاسخنامه' : '📄 مشاهده پاسخنامه تشریحی'}
          </button>
        </div>

        {/* ==================== پاسخنامه ==================== */}
        {showAnswers && isScoreCalculated && (
          <div
            style={{
              marginTop: '30px',
              borderTop: '4px solid #1A237E',
              paddingTop: '40px',
              backgroundColor: '#ffffff',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              width: '100%',
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                borderBottom: '3px solid #1A237E',
                paddingBottom: '20px',
                marginBottom: '40px',
                fontSize: '26px',
                color: '#1A237E',
              }}
            >
              📝 پاسخنامه تشریحی احتمال غیرهم‌شأنس
            </h2>

            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  style={{
                    marginBottom: '35px',
                    borderBottom: '1px dashed #ced4da',
                    paddingBottom: '25px',
                  }}
                >
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span
                      style={{
                        fontWeight: 'bold',
                        color: '#1A237E',
                        backgroundColor: '#e8eaf6',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        marginBottom: '10px',
                      }}
                    >
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح: </span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span
                          style={{
                            fontWeight: 'bold',
                            color: isCorrect ? '#28a745' : '#dc3545',
                          }}
                        >
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
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
              textAlign: 'center',
              padding: '30px',
              backgroundColor: '#fff3cd',
              borderRadius: '12px',
              border: '1px solid #ffc107',
            }}
          >
            <p style={{ fontSize: '18px', color: '#856404' }}>
              ⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید تا پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonUniformProbabilityQuiz;