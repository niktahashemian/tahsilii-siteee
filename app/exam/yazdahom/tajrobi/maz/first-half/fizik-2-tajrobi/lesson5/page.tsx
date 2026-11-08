"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Physics2ElectricFieldNew = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== سوالات جدید و بدون تکرار با آزمون قبلی ====================
  const questions = [
    // ===== سوال ۱۵۰ =====
    {
      id: 149,
      section: "سوال ۱۴۹ - صفحه ۲۸ PDF",
      text: "بار آزمون q₀ = +5nC را نزدیک بار الکتریکی Q قرار می‌دهیم. در این نقطه نیروی F = (5×10⁻⁶ N)i − (12×10⁻⁶ N)j بر بار آزمون وارد می‌شود. بزرگی میدان الکتریکی در محلی که بار آزمون قرار گرفته، چند نیوتون بر کولن است؟",
      options: ["۳/۴ × ۱۰³", "۱/۴ × ۱۰³", "۲/۶ × ۱۰³", "۴/۲ × ۱۰³"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: گزینه ۳ صحیح است. با محاسبه اندازه بردار نیرو (√(۵²+۱۲²)×۱۰⁻⁶ = ۱۳×۱۰⁻⁶ N) و استفاده از E = F/q، مقدار E = ۱۳×۱۰⁻⁶ / ۵×۱۰⁻⁹ = ۲/۶×۱۰³ N/C به دست می‌آید."
    },

    // ===== سوال ۱۵۳ =====
    {
      id: 152,
      section: "سوال ۱۵۲ - صفحه ۲۸ PDF",
      text: "به ذره باردار q در میدان الکتریکی یکنواخت به بزرگی ۲×۱۰⁵ N/C نیروی F = (−۰/۵ N)i + (۱/۲ N)j در خلاف جهت میدان الکتریکی وارد شده است. q برحسب میکروکولن کدام است؟",
      options: ["−۲", "۲", "۶/۵", "−۶/۵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه ۴ صحیح است. چون نیرو خلاف جهت میدان است، علامت بار منفی است. اندازه نیرو برابر √(۰/۵² + ۱/۲²) = ۱/۳ N است. با استفاده از E = F/|q| ⇒ ۲×۱۰⁵ = ۱/۳ / |q| ⇒ |q| = ۶/۵ μC. بنابراین q = −۶/۵ μC."
    },

    // ===== سوال ۱۵۵ =====
    {
      id: 154,
      section: "سوال ۱۵۵ - صفحه ۲۸ PDF",
      text: "کره رسانایی به شعاع ۱۰ cm بار الکتریکی ۲۰ μC دارد. در فاصله ۳۰ cm از مرکز کره میدان الکتریکی آن چند نیوتون بر کولن است؟ (k = ۹×۱۰⁹ N·m²/C²)",
      options: ["۶ × ۱۰²", "۲ × ۱۰⁶", "۲ × ۱۰²", "۶ × ۱۰⁵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه 4 صحیح است. برای فاصله‌های بزرگ‌تر از شعاع کره، میدان مانند بار نقطه‌ای در مرکز است: E = kQ/r² = (۹×۱۰⁹ × ۲۰×۱۰⁻⁶) / (۰/۳)² = ۲×۱۰⁶ N/C."
    },

    // ===== سوال ۱۵۷ =====
    {
      id: 157,
      section: "سوال ۱۵۷ - صفحه ۲۹ PDF",
      text: "اگر اندازه میدان الکتریکی حاصل از بار الکتریکی نقطه‌ای q در فاصله ۲۰ cm از آن، ۲۴ mN/C بیشتر از اندازه میدان الکتریکی در ۱ متری از آن باشد، اندازه میدان الکتریکی در ۲۵ سانتی‌متری این ذره چند N/C است؟",
      options: ["۰/۰۰۸", "۰/۰۳۲", "۰/۰۶۴", "۰/۰۱۶"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه ۴ صحیح است. با نوشتن معادله اختلاف میدان‌ها، kq محاسبه شده و سپس میدان در فاصله ۲۵ سانتی‌متری برابر ۰/۰۱۶ N/C به دست می‌آید."
    },

    // ===== سوال ۱۵۹ (دارای شکل) =====
    {
      id: 159,
      section: "سوال ۱۵۹ - صفحه ۲۹ PDF",
      text: "بار الکتریکی q = -۲ μC در نقطه‌ای در صفحه مختصات قرار دارد به‌طوری که میدان الکتریکی آن در مبدأ مختصات E₀ = ۲×۱۰⁵ j (SI) است. بردار میدان الکتریکی بار q در نقطه A(۰/۱m, ۰/۳m) کدام است؟ (k = ۹×۱۰⁹ N.m²/C²)",
      image: "/img/q159.png", 
      imageAlt: "نمودار میدان الکتریکی بار نقطه‌ای در صفحه مختصات",
      options: ["−۸ × ۱۰⁵ j", "−۱/۸ × ۱۰⁶ j", "−۱/۸ × ۱۰⁶ j", "−۸ × ۱۰⁵ j"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: گزینه ۳ صحیح است. بار در فاصله ۰/۳m از مبدأ روی محور y است. در نقطه A(۰/۱m) فاصله ۰/۲m و E = (۹×۱۰⁹ × ۲×۱۰⁻⁶) / (۰/۲)² = ۴/۵×۱۰⁵ به سمت بار (منفی) → −۱/۸×۱۰⁵ j."
    },

    // ===== سوال ۱۶۲ (دارای شکل) =====
    {
      id: 162,
      section: "سوال ۱۶۲ - صفحه ۳۰ PDF",
      text: "نمودار تغییر میدان الکتریکی بار نقطه‌ای q برحسب فاصله تا بار به شکل زیر است. اندازه بار الکتریکی در SI کدام است؟ (k = ۹×۱۰⁹ N.m²/C²، در r=d مقدار ۱۶ و در r=d+۳۰ مقدار ۱)",
      image: "/img/q162.png",
      imageAlt: "نمودار میدان الکتریکی نسبت به فاصله با مقادیر داده شده",
      options: ["۱۰⁻¹²", "۱۶ × ۱۰⁻¹²", "۱۰⁻¹⁰", "۱۶ × ۱۰⁻¹⁰"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: گزینه ۲ صحیح است. با حل دستگاه دو معادله: ۱۶ = kq/d² و ۱ = kq/(d+۳۰)². از تقسیم: ۱۶ = ((d+۳۰)/d)² → ۴ = (d+۳۰)/d → ۳d = ۳۰ → d = ۱۰cm. سپس q = ۱۶ × (۰/۱)² / (۹×۱۰⁹) = ۱۶×۱۰⁻¹² C."
    },

    // ===== سوال ۱۶۴ =====
    {
      id: 164,
      section: "سوال ۱۶۴ - صفحه ۳۰ PDF",
      text: "میدان الکتریکی در فاصله ۲۰ سانتی‌متری از بار q برابر ۱۸ N/C است. چند سانتی‌متر دیگر از بار فوق دور شویم تا میدان الکتریکی ۱۵ واحد SI کاهش یابد؟",
      options: ["۱۰", "۲۰", "۳۰", "۴۰"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: گزینه 1 صحیح است. E₂ = ۱۸ − ۱۵ = ۳ N/C. با استفاده از E₁/E₂ = (r₂/r₁)² ⇒ ۱۸/۳ = (r₂/۲۰)² ⇒ ۶ = (r₂/۲۰)² ⇒ r₂ = ۲۰√۶ ≈ ۴۸/۹۹ cm. بنابراین Δr ≈ ۳۰ cm."
    },

    // ===== سوال ۱۶۵ =====
    {
      id: 165,
      section: "سوال ۱۶۵ - صفحه ۳۰ PDF",
      text: "بار الکتریکی q در نقطه‌ای از صفحه مختصات به طور ثابت قرار گرفته است. اگر بردار میدان الکتریکی این بار در مبدأ مختصات به صورت E₀ = -۴ × ۱۰⁻⁵ j و در نقطه A(۰, ۱m) به صورت E_A = -۱/۶ × ۱۰⁻⁴ j باشد، بزرگی میدان الکتریکی بار در نقطه B(۲m, ۱m) در SI کدام است؟",
      options: ["۴ × ۱۰⁻⁶", "۸ × ۱۰⁻⁶", "۱/۶ × ۱۰⁻⁵", "۳/۲ × ۱۰⁻⁵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه 4 صحیح است. با یافتن مکان بار و فاصله نقاط، میدان در نقطه B برابر ۸ × ۱۰⁻⁶ نیوتون بر کولن به دست می‌آید."
    },

    // ===== سوال ۱۷۰ =====
    {
      id: 171,
      section: "سوال ۱۷۱ - صفحه ۳۱ PDF",
      text: "اندازه میدان الکتریکی در فاصله ۵m از بار ۲۱۰ N/C کمتر از میدان در فاصله ۲m از آن است. اندازه میدان در فاصله ۴m از آن چند N/C است؟",
      options: ["۱۰۰۰", "۵۰۰", "۶۲/۵", "۱۲۵"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: گزینه ۳ صحیح است. با نوشتن معادله اختلاف میدان‌ها، kq محاسبه شده و سپس میدان در فاصله ۴ متری برابر ۶۲/۵ نیوتون بر کولن به دست می‌آید."
    },

    // ===== سوال ۱۷۱ =====
    {
      id: 172,
      section: "سوال ۱۷۲ - صفحه ۳۲ PDF",
      text: "میدان الکتریکی در فاصله ۲۰ سانتی‌متری از بار q برابر ۱۸ N/C است. چند سانتی‌متر دیگر از بار فوق دور شویم تا میدان الکتریکی ۸ N/C شود؟",
      options: ["۱۰", "۲۰", "۳۰", "۴۰"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: گزینه ۱ صحیح است. با استفاده از E₁/E₂ = (r₂/r₁)² داریم: ۱۸/۸ = (r₂/۲۰)² ⇒ r₂ = ۳۰ cm. بنابراین باید ۱۰ سانتی‌متر دور شویم."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => { if (selectedAnswers[q.id] === q.correctIndex) correctCount++; });
    setScore((correctCount / questions.length) * 100);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  const handleOptionClick = (questionId, optionIndex) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true); isTimeUpRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimeUp, isScoreCalculated]);

  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const t = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(t);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;
  const getScoreColor = (s) => s >= 80 ? '#28a745' : s >= 50 ? '#ffc107' : '#dc3545';
  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div style={{ fontFamily: 'Tahoma, Arial, sans-serif', width: '100vw', minHeight: '100vh', padding: '15px 10px', backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* ==================== هدر ==================== */}
      <div style={{ backgroundColor: '#1565C0', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'center', position: 'relative' }}>
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>⚡ آزمون فیزیک (۲) - میدان الکتریکی حاصل از یک ذره باردار</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>{questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}</p>
          </div>
          <div style={{ backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)', padding: '10px 25px', borderRadius: '50px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>⏱️ {isTimeUp ? 'تمام شد!' : formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* ==================== سوالات ==================== */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => {
          return (
            <div key={q.id} style={{ marginBottom: '25px', backgroundColor: '#ffffff', padding: '20px 25px', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#e3f2fd', color: '#1565C0', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>{q.section}</div>
              <div style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '20px', fontWeight: '500', display: 'flex', alignItems: 'flex-start', whiteSpace: 'pre-wrap' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#1565C0', color: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '30px', borderRadius: '50%', fontSize: '14px', marginLeft: '15px', flexShrink: 0 }}>{index + 1}</span>
                <span>{q.text}</span>
              </div>

              {/* ======= تصویر (در صورت وجود) ======= */}
              {q.image && (
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '10px', border: '1px solid #e9ecef' }}>
                  {imageErrors[q.id] ? (
                    <div style={{ textAlign: 'center', color: '#6c757d', padding: '20px' }}>
                      <span style={{ fontSize: '30px' }}>🖼️</span>
                      <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>تصویر یافت نشد (مسیر: {q.image})</p>
                    </div>
                  ) : (
                    <img 
                      src={q.image} 
                      alt={q.imageAlt} 
                      onError={() => handleImageError(q.id)}
                      style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} 
                    />
                  )}
                </div>
              )}

              {/* ======= گزینه‌ها ======= */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 30px', marginRight: '20px' }}>
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.id] === idx;
                  const isDisabled = isTimeUp || isScoreCalculated;
                  return (
                    <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled} style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6', borderRadius: '10px', backgroundColor: isSelected ? '#e3f2fd' : '#fff', cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px', width: '100%', opacity: isDisabled && !isSelected ? 0.6 : 1 }}>
                      <span style={{ display: 'inline-block', width: '28px', height: '28px', border: '1px solid #000', borderRadius: '50%', textAlign: 'center', lineHeight: '28px', fontSize: '14px', marginLeft: '15px', backgroundColor: isSelected ? '#1565C0' : '#fff', color: isSelected ? '#fff' : '#000' }}>{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ==================== دکمه محاسبه ==================== */}
        <div style={{ marginTop: '30px', marginBottom: '30px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
          {!isScoreCalculated ? (
            <button onClick={() => canCalculate && calculateScore()} disabled={!canCalculate} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: canCalculate ? '#1565C0' : '#6c757d', color: '#fff', border: 'none', borderRadius: '50px', cursor: canCalculate ? 'pointer' : 'not-allowed', fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6 }}>
              {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده` : '📊 محاسبه درصد'}
            </button>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>✅ درصد شما: <span style={{ color: getScoreColor(score), fontSize: '28px' }}>{Math.round(score)}%</span></div>
              <div style={{ width: '80%', maxWidth: '400px', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden', margin: '15px auto' }}><div style={{ width: `${score}%`, height: '100%', backgroundColor: getScoreColor(score) }} /></div>
              <button onClick={() => { setIsScoreCalculated(false); setScore(null); isCalculatedRef.current = false; isTimeUpRef.current = false; }} style={{ padding: '10px 25px', fontSize: '14px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        {/* ==================== دکمه پاسخنامه ==================== */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: showAnswers ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* ==================== پاسخنامه ==================== */}
        {showAnswers && isScoreCalculated && (
          <div style={{ marginTop: '30px', borderTop: '4px solid #1565C0', padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px' }}>
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #1565C0', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#1565C0' }}>📝 پاسخنامه تشریحی</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{ marginBottom: '35px', borderBottom: '1px dashed #ced4da', paddingBottom: '25px' }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{ fontWeight: 'bold', color: '#1565C0', backgroundColor: '#e3f2fd', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>{q.section}</span>
                    <br />
                    
                    {q.image && (
                      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
                        {imageErrors[q.id] ? (
                          <p style={{ fontSize: '14px', color: '#6c757d' }}>تصویر یافت نشد</p>
                        ) : (
                          <img src={q.image} alt={q.imageAlt} onError={() => handleImageError(q.id)} style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }} />
                        )}
                      </div>
                    )}

                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> <span>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (<span><span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>{isCorrect ? '✔️ صحیح' : '❌ نادرست'}</span><span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>(انتخاب شما: {String.fromCharCode(65 + userAnswer)})</span><br /></span>)}
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span><br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#fff3cd', borderRadius: '12px', border: '1px solid #ffc107' }}>
            <p style={{ fontSize: '18px', color: '#856404' }}>⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Physics2ElectricFieldNew;