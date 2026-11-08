"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ✅ تعریف تایپ برای سؤال
interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  answer: string;
  image?: string;
  imageAlt?: string;
}

const SetOperationsQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ✅ useMemo برای جلوگیری از خطای exhaustive-deps
  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: 'کدام رابطه بیانگر قانون جابه‌جایی برای اجتماع است؟',
        options: [
          'A ∪ (B ∪ C) = (A ∪ B) ∪ C',
          'A ∪ B = B ∪ A',
          'A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)',
          "(A ∪ B)' = A' ∩ B'",
        ],
        correctIndex: 1,
        answer: 'قانون جابه‌جایی برای اجتماع می‌گوید ترتیب مجموعه‌ها در عمل اجتماع مهم نیست: A ∪ B = B ∪ A. گزینه ۱ شرکت‌پذیری، گزینه ۳ توزیع‌پذیری و گزینه ۴ دمورگان است.',
      },
      {
        id: 2,
        text: "(A ∪ B)' معادل کدام است؟",
        options: ["A' ∪ B'", "A' ∩ B'", 'A ∩ B', 'A − B'],
        correctIndex: 1,
        answer: "طبق قانون دمورگان، متمم اجتماع دو مجموعه برابر است با اشتراک متمم‌های آن‌ها: (A ∪ B)' = A' ∩ B'.",
      },
      {
        id: 3,
        text: 'قانون جذب (هم‌پوشانی) کدام است؟',
        options: [
          'A ∪ (A ∩ B) = A',
          'A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)',
          "(A ∩ B)' = A' ∪ B'",
          "A − B = A ∩ B'",
        ],
        correctIndex: 0,
        answer: 'قانون جذب بیان می‌کند: A ∪ (A ∩ B) = A و A ∩ (A ∪ B) = A. گزینه ۲ توزیع‌پذیری، گزینه ۳ دمورگان و گزینه ۴ تعریف تفاضل است.',
      },
      {
        id: 4,
        text: 'A ∪ (B ∩ C) معادل کدام است؟',
        options: [
          '(A ∪ B) ∪ (A ∪ C)',
          '(A ∪ B) ∩ (A ∪ C)',
          '(A ∩ B) ∪ (A ∩ C)',
          '(A ∩ B) ∩ (A ∩ C)',
        ],
        correctIndex: 1,
        answer: 'طبق قانون توزیع‌پذیری اجتماع نسبت به اشتراک: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C).',
      },
      {
        id: 5,
        text: 'اگر A = {۱, ۲, ۳}، B = {۲, ۳, ۴} و C = {۳, ۴, ۵} باشد، حاصل A ∩ (B ∪ C) کدام است؟',
        options: ['{۱, ۲, ۳}', '{۲, ۳}', '{۳}', '{۲, ۳, ۴, ۵}'],
        correctIndex: 1,
        answer: 'ابتدا B ∪ C = {۲, ۳, ۴, ۵}. سپس A ∩ (B ∪ C) = {۱, ۲, ۳} ∩ {۲, ۳, ۴, ۵} = {۲, ۳}.',
      },
      {
        id: 6,
        text: "(A ∩ B)' معادل کدام است؟",
        options: ["A' ∩ B'", "A' ∪ B'", 'A ∪ B', 'A − B'],
        correctIndex: 1,
        answer: "طبق قانون دمورگان، متمم اشتراک دو مجموعه برابر است با اجتماع متمم‌های آن‌ها: (A ∩ B)' = A' ∪ B'.",
      },
      {
        id: 7,
        text: 'A − B معادل کدام است؟',
        options: ["A ∩ B'", "A' ∩ B", "A ∪ B'", "A' ∪ B"],
        correctIndex: 0,
        answer: "تفاضل دو مجموعه A − B شامل اعضایی از A است که در B نیستند، یعنی A ∩ B'.",
      },
      {
        id: 8,
        text: 'کدام رابطه بیانگر قانون شرکت‌پذیری برای اشتراک است؟',
        options: [
          'A ∩ B = B ∩ A',
          'A ∩ (B ∩ C) = (A ∩ B) ∩ C',
          'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)',
          'A ∩ (A ∪ B) = A',
        ],
        correctIndex: 1,
        answer: 'قانون شرکت‌پذیری برای اشتراک: A ∩ (B ∩ C) = (A ∩ B) ∩ C. گزینه ۱ جابه‌جایی، گزینه ۳ توزیع‌پذیری و گزینه ۴ جذب است.',
      },
      {
        id: 9,
        text: 'اگر A = {۱, ۲, ۳, ۴} و B = {۳, ۴, ۵} باشد، (A ∩ B)′ در مجموعه مرجع U = {۱, ۲, ۳, ۴, ۵, ۶} کدام است؟',
        options: ['{۱, ۲, ۵, ۶}', '{۱, ۲, ۳, ۴}', '{۵, ۶}', '{۳, ۴}'],
        correctIndex: 0,
        answer: "A ∩ B = {۳, ۴}. متمم آن در U: {۱, ۲, ۵, ۶}. همچنین با دمورگان: A' ∪ B' = {۵, ۶} ∪ {۱, ۲, ۶} = {۱, ۲, ۵, ۶}.",
      },
      {
        id: 10,
        text: "عبارت (A ∪ B) ∩ (A ∪ B') ساده می‌شود به:",
        options: ['A', 'B', 'A ∪ B', 'A ∩ B'],
        correctIndex: 0,
        answer: "طبق قانون توزیع‌پذیری (فاکتورگیری): (A ∪ B) ∩ (A ∪ B') = A ∪ (B ∩ B'). چون B ∩ B' = ∅، حاصل A ∪ ∅ = A است.",
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
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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

  const handleImageError = (qId: number) => {
    setImageErrors((prev) => ({ ...prev, [qId]: true }));
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
              📐 آزمون آمار و احتمال - قوانین اعمال بین مجموعه‌ها
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

            {q.image && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                  padding: '15px',
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                  border: '1px dashed #ced4da',
                  minHeight: '180px',
                  alignItems: 'center',
                }}
              >
                {imageErrors[q.id] ? (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#6c757d',
                      fontSize: '14px',
                      padding: '30px',
                    }}
                  >
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    <p
                      style={{
                        margin: '5px 0 0 0',
                        direction: 'ltr',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        color: '#adb5bd',
                      }}
                    >
                      {q.image}
                    </p>
                  </div>
                ) : (
                  <Image
                    src={q.image}
                    alt={q.imageAlt || `تصویر سوال ${q.id}`}
                    onError={() => handleImageError(q.id)}
                    width={600}
                    height={350}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '350px',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '6px',
                    }}
                  />
                )}
              </div>
            )}

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
              📝 پاسخنامه تشریحی قوانین اعمال بین مجموعه‌ها
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

export default SetOperationsQuiz;