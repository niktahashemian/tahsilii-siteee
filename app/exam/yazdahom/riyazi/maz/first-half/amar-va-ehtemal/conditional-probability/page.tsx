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

const ConditionalProbabilityQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ✅ سوالات درس ۲-۳: احتمال شرطی
  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: 'اگر P(A ∩ B) = ۰/۲ و P(B) = ۰/۵ باشد، P(A|B) کدام است؟',
        options: ['۰/۱', '۰/۲', '۰/۴', '۰/۷'],
        correctIndex: 2,
        answer: 'طبق تعریف احتمال شرطی: P(A|B) = P(A ∩ B) / P(B) = ۰/۲ / ۰/۵ = ۰/۴.',
      },
      {
        id: 2,
        text: 'در پرتاب یک تاس سالم، اگر بدانیم عدد آمده زوج است، احتمال این‌که عدد ۴ باشد کدام است؟',
        options: ['۱/۶', '۱/۳', '۱/۲', '۲/۳'],
        correctIndex: 1,
        answer: 'فضای نمونه کاهش می‌یابد به {۲, ۴, ۶} (۳ حالت). فقط یک حالت (عدد ۴) مطلوب است. پس P = ۱/۳.',
      },
      {
        id: 3,
        text: 'در پرتاب یک تاس سالم، اگر بدانیم عدد آمده بزرگ‌تر از ۳ است، احتمال این‌که عدد زوج باشد کدام است؟',
        options: ['۱/۳', '۱/۲', '۲/۳', '۳/۴'],
        correctIndex: 2,
        answer: 'فضای نمونه کاهش‌یافته: {۴, ۵, ۶} (۳ حالت). اعداد زوج در این مجموعه: ۴ و ۶ (۲ حالت). پس P = ۲/۳.',
      },
      {
        id: 4,
        text: 'اگر A و B دو پیشامد مستقل باشند، P(A|B) برابر کدام است؟',
        options: ['P(B)', 'P(A)', 'P(A ∩ B)', 'P(A) + P(B)'],
        correctIndex: 1,
        answer: 'برای پیشامدهای مستقل: P(A ∩ B) = P(A) × P(B). پس P(A|B) = P(A ∩ B) / P(B) = P(A). یعنی وقوع B تأثیری بر احتمال A ندارد.',
      },
      {
        id: 5,
        text: 'اگر P(A) = ۰/۶ و P(B) = ۰/۴ و P(A ∩ B) = ۰/۲۴ باشد، آیا A و B مستقل هستند؟',
        options: [
          'بله، چون P(A ∩ B) = P(A) × P(B)',
          'خیر، چون P(A ∩ B) ≠ P(A) × P(B)',
          'بله، چون P(A|B) = P(B)',
          'خیر، چون P(A) > P(B)',
        ],
        correctIndex: 0,
        answer: 'P(A) × P(B) = ۰/۶ × ۰/۴ = ۰/۲۴ که برابر P(A ∩ B) است. پس دو پیشامد مستقل هستند.',
      },
      {
        id: 6,
        text: 'در پرتاب دو سکه‌ی سالم، اگر بدانیم حداقل یک شیر آمده است، احتمال این‌که هر دو شیر باشند کدام است؟',
        options: ['۱/۲', '۱/۳', '۱/۴', '۳/۴'],
        correctIndex: 1,
        answer: 'فضای نمونه: {شش, شخ, خش, خخ}. پیشامد «حداقل یک شیر»: {شش, شخ, خش} (۳ حالت). پیشامد «هر دو شیر»: {شش} (۱ حالت). پس P = ۱/۳.',
      },
      {
        id: 7,
        text: 'اگر P(B) = ۰/۶ و P(A|B) = ۰/۵ باشد، P(A ∩ B) کدام است؟',
        options: ['۰/۱', '۰/۳', '۰/۵', '۱/۱'],
        correctIndex: 1,
        answer: 'از تعریف احتمال شرطی: P(A ∩ B) = P(A|B) × P(B) = ۰/۵ × ۰/۶ = ۰/۳.',
      },
      {
        id: 8,
        text: 'در پرتاب یک تاس سالم، اگر بدانیم عدد آمده اول است، احتمال این‌که عدد ۲ باشد کدام است؟',
        options: ['۱/۳', '۱/۶', '۱/۲', '۲/۳'],
        correctIndex: 0,
        answer: 'اعداد اول تاس: ۲، ۳، ۵ (۳ حالت). فقط یک حالت (عدد ۲) مطلوب است. پس P = ۱/۳.',
      },
      {
        id: 9,
        text: 'اگر A و B دو پیشامد مستقل با P(A) = ۰/۳ و P(B) = ۰/۵ باشند، P(A ∪ B) کدام است؟',
        options: ['۰/۱۵', '۰/۵', '۰/۶۵', '۰/۸'],
        correctIndex: 2,
        answer: 'برای مستقل‌ها: P(A ∩ B) = ۰/۳ × ۰/۵ = ۰/۱۵. سپس P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = ۰/۳ + ۰/۵ − ۰/۱۵ = ۰/۶۵.',
      },
      {
        id: 10,
        text: 'در پرتاب دو تاس سالم، اگر بدانیم مجموع اعداد ۸ است، احتمال این‌که یکی از تاس‌ها ۳ باشد کدام است؟',
        options: ['۱/۵', '۲/۵', '۱/۳', '۲/۳'],
        correctIndex: 1,
        answer: 'حالات مجموع ۸: (۲,۶), (۳,۵), (۴,۴), (۵,۳), (۶,۲) یعنی ۵ حالت. حالاتی که یکی از تاس‌ها ۳ است: (۳,۵) و (۵,۳) یعنی ۲ حالت. پس P = ۲/۵.',
      },
    ],
    []
  );

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
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
              🎲 آزمون آمار و احتمال - احتمال شرطی
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
              📝 پاسخنامه تشریحی احتمال شرطی
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

export default ConditionalProbabilityQuiz;