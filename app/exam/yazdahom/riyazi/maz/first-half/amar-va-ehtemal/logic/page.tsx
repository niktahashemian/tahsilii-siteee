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

const LogicMathQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ✅ سوالات استخراج‌شده از PDF (درس ۱-۱: آشنایی با منطق ریاضی)
  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: 'کدام جمله گزاره است؟',
        options: ['عدد ۲ اول است.', 'کتاب را بخوان.', 'امروز چه روزی است؟', 'x + ۳ > ۷'],
        correctIndex: 0,
        answer: 'گزاره جمله‌ای خبری است که فقط یکی از ارزش‌های درست یا نادرست را دارد. جمله امری و پرسشی گزاره نیست و جمله x + ۳ > ۷ به مقدار x بستگی دارد (گزاره‌نما).',
      },
      {
        id: 2,
        text: 'گزاره (p ∧ q) ⇒ p همواره چگونه است؟',
        options: ['همواره درست', 'همواره نادرست', 'گاهی درست', 'وابسته به q'],
        correctIndex: 0,
        answer: 'اگر p ∧ q درست باشد، p هم درست است و شرط برقرار است. اگر p ∧ q نادرست باشد، کل گزاره شرطی درست است. پس همواره درست است (گویاگویی).',
      },
      {
        id: 3,
        text: 'اگر p نادرست باشد، ارزش گزاره p ⇒ q کدام است؟',
        options: ['همواره درست', 'همواره نادرست', 'برابر q', 'برابر ¬q'],
        correctIndex: 0,
        answer: 'گزاره شرطی وقتی مقدمش نادرست باشد، همواره درست است، چه q درست باشد چه نادرست.',
      },
      {
        id: 4,
        text: 'کدام گزاره درست است؟',
        options: ['∀x ∈ ℝ: x² > ۰', '∃x ∈ ℕ: x = −۱', '∀x ∈ ℝ: x + ۱ > x', '∃x ∈ ℤ: x² = ۲'],
        correctIndex: 2,
        answer: 'برای هر عدد حقیقی x، همیشه x + ۱ > x است. گزینه اول با x = ۰ رد می‌شود، گزینه دوم و چهارم هم جواب ندارند.',
      },
      {
        id: 5,
        text: 'نقیض گزاره «∃x ∈ ℤ: x² = x» کدام است؟',
        options: ['∀x ∈ ℤ: x² ≠ x', '∃x ∈ ℤ: x² ≠ x', '∀x ∈ ℤ: x² = x', '∃x ∈ ℤ: x² > x'],
        correctIndex: 0,
        answer: 'نقیض سور وجودی، سور همگانی است و نقیض x² = x می‌شود x² ≠ x. پس نقیض کل گزاره، ∀x ∈ ℤ: x² ≠ x است.',
      },
      {
        id: 6,
        text: 'ارزش گزاره «∃x ∈ ℝ: x² + ۱ = ۰» کدام است؟',
        options: ['درست', 'نادرست', 'بستگی به x دارد', 'گزاره‌نما است'],
        correctIndex: 1,
        answer: 'برای هر عدد حقیقی x، x² ≥ ۰ است، پس x² + ۱ ≥ ۱ و هرگز صفر نمی‌شود. بنابراین گزاره وجودی نادرست است.',
      },
      {
        id: 7,
        text: 'اگر p درست و q نادرست باشد، ارزش گزاره p ∨ (q ∧ ¬p) کدام است؟',
        options: ['درست', 'نادرست', 'بستگی به p دارد', 'قابل تعیین نیست'],
        correctIndex: 0,
        answer: '¬p نادرست است، پس q ∧ ¬p = نادرست ∧ نادرست = نادرست. سپس p ∨ نادرست = درست ∨ نادرست = درست.',
      },
      {
        id: 8,
        text: 'هم‌ارزی ¬(p ∧ q) ≡ (¬p) ∨ (¬q) بیانگر کدام قانون منطقی است؟',
        options: ['قانون جذب', 'قانون دمورگان', 'قانون توزیع‌پذیری', 'قانون تناقض'],
        correctIndex: 1,
        answer: 'این هم‌ارزی یکی از قوانین دمورگان است: نقیض ترکیب عطفی، معادل ترکیب فصلی نقیض‌هاست. قانون دیگر: ¬(p ∨ q) ≡ (¬p) ∧ (¬q).',
      },
      {
        id: 9,
        text: 'کدام گزاره همواره درست (گویاگویی) است؟',
        options: ['p ⇒ (p ∧ q)', '(p ∨ q) ⇒ p', 'p ∨ ¬p', 'p ∧ ¬p'],
        correctIndex: 2,
        answer: 'گزاره p ∨ ¬p در تمام حالت‌ها درست است (قانون طرد شق ثالث). گزینه ۴ همواره نادرست است و گزینه‌های ۱ و ۲ در برخی حالت‌ها نادرست می‌شوند.',
      },
      {
        id: 10,
        text: 'اگر A = {۱, ۲, ۳} و B = {۳, ۴} باشد، حاصل (A ∪ B) − (A ∩ B) کدام است؟',
        options: ['{۱, ۲, ۳, ۴}', '{۱, ۲, ۴}', '{۳}', '{۱, ۲}'],
        correctIndex: 1,
        answer: 'A ∪ B = {۱, ۲, ۳, ۴} و A ∩ B = {۳}. تفاضل: {۱, ۲, ۳, ۴} − {۳} = {۱, ۲, ۴} (تفاضل متقارن دو مجموعه).',
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
              📐 آزمون آمار و احتمال - آشنایی با منطق ریاضی
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
              📝 پاسخنامه تشریحی آشنایی با منطق ریاضی
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

export default LogicMathQuiz;