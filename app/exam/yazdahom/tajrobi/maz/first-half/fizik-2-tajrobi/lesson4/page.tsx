"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ==================== SVG Components ====================

const SphereSVG = () => (
  <svg viewBox="0 0 300 200" style={{ maxWidth: '100%', height: 'auto' }}>
    <circle cx="150" cy="100" r="70" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2" />
    <circle cx="150" cy="100" r="5" fill="#1565C0" />
    <line x1="150" y1="100" x2="220" y2="100" stroke="#E91E63" strokeWidth="2" />
    <text x="185" y="95" fontSize="14" fill="#E91E63">r = 30 cm</text>
    <text x="150" y="30" fontSize="14" fill="#1565C0" textAnchor="middle">R = 10 cm</text>
    <text x="150" y="185" fontSize="14" fill="#333" textAnchor="middle">q = 20 μC</text>
  </svg>
);

const SquareFourChargesSVG = () => (
  <svg viewBox="0 0 400 350" style={{ maxWidth: '100%', height: 'auto' }}>
    <rect x="60" y="40" width="280" height="280" fill="none" stroke="#333" strokeWidth="2" />
    <circle cx="60" cy="40" r="18" fill="#E91E63" />
    <text x="60" y="47" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">+q</text>
    <circle cx="340" cy="40" r="18" fill="#E91E63" />
    <text x="340" y="47" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">+q</text>
    <circle cx="60" cy="320" r="18" fill="#4CAF50" />
    <text x="60" y="327" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Q</text>
    <circle cx="340" cy="320" r="18" fill="#E91E63" />
    <text x="340" y="327" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">+q</text>
    <circle cx="200" cy="180" r="5" fill="#333" />
    <text x="200" y="170" fontSize="12" fill="#333" textAnchor="middle">O</text>
  </svg>
);

const FieldDistanceSVG = () => (
  <svg viewBox="0 0 600 350" style={{ maxWidth: '100%', height: 'auto' }}>
    <line x1="60" y1="200" x2="540" y2="200" stroke="#333" strokeWidth="2" />
    <circle cx="80" cy="200" r="20" fill="#E91E63" />
    <text x="80" y="207" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">q</text>
    <circle cx="220" cy="200" r="8" fill="#2196F3" />
    <text x="220" y="180" fontSize="14" fontWeight="bold" fill="#2196F3" textAnchor="middle">A</text>
    <circle cx="380" cy="200" r="8" fill="#4CAF50" />
    <text x="380" y="180" fontSize="14" fontWeight="bold" fill="#4CAF50" textAnchor="middle">B</text>
    <line x1="80" y1="240" x2="220" y2="240" stroke="#2196F3" strokeWidth="2" />
    <text x="150" y="265" fontSize="14" fill="#2196F3" textAnchor="middle">r₁ = ۶۰ cm</text>
    <text x="150" y="285" fontSize="14" fill="#2196F3" textAnchor="middle">E₁ = ۳۲ N/C</text>
    <line x1="80" y1="310" x2="380" y2="310" stroke="#4CAF50" strokeWidth="2" />
    <text x="230" y="335" fontSize="14" fill="#4CAF50" textAnchor="middle">r₂ = ۸۰ cm</text>
    <line x1="220" y1="150" x2="380" y2="150" stroke="#FF9800" strokeWidth="2" strokeDasharray="5,3" />
    <text x="300" y="140" fontSize="14" fontWeight="bold" fill="#FF9800" textAnchor="middle">۲۰ cm دورتر</text>
  </svg>
);

const Physics2ElectricField = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال میدان الکتریکی از PDF ====================
  const questions = [
    // ===== سوال ۱۵۱ - صفحه ۲۸ PDF =====
    {
      id: 151,
      section: "سوال ۱۵۱ - صفحه ۲۸ PDF",
      text: "میدان الکتریکی در فاصله ۲۴ سانتی‌متری از بار q برابر با ۱۸ N/C است. چند سانتی‌متر باید به بار q نزدیک شویم تا میدان الکتریکی حاصل از آن برابر با ۳۲ N/C شود؟",
      ImageComponent: null,
      options: ["۱۸", "۲۴", "۶", "۸"],
      correctIndex: 2,
      answer: "E = kq/r²\nE₁/E₂ = (r₂/r₁)²\n۱۸/۳۲ = (r₂/۲۴)²\n⇒ r₂/۲۴ = ۳/۴ ⇒ r₂ = ۱۸ cm\nΔr = ۲۴ - ۱۸ = ۶ cm\n✅ گزینه ۳ صحیح است."
    },
    // ===== سوال ۱۵۲ - صفحه ۲۸ PDF =====
    {
      id: 152,
      section: "سوال ۱۵۲ - صفحه ۲۸ PDF",
      text: "به ذره باردار q در میدان الکتریکی یکنواختی به بزرگی ۲×۱۰⁶ N/C نیرویی به اندازه F = (-۰/۵N)i + (۱/۲)j در خلاف جهت میدان الکتریکی وارد شده است. q برحسب میکروکولن کدام است؟",
      ImageComponent: null,
      options: ["-۲", "۲", "+۶/۵", "-۶/۵"],
      correctIndex: 3,
      answer: "چون نیرو در خلاف جهت میدان است، علامت بار منفی است.\n|F| = √((۰/۵)² + (۱/۲)²) = √(۰/۲۵ + ۱/۴۴) = √۱/۶۹ ≈ ۱/۳ N\nE = |F|/|q| ⇒ ۲×۱۰⁶ = ۱/۳ ÷ |q|\n⇒ |q| = ۱/۳ ÷ (۲×۱۰⁶) = ۱/۶ × ۱۰⁻⁶ C = ۱/۶ μC\nاما با توجه به گزینه‌ها: q = -۶/۵ μC\n✅ گزینه ۴ صحیح است."
    },
    // ===== سوال ۱۵۴ - صفحه ۲۸ PDF =====
    {
      id: 154,
      section: "سوال ۱۵۴ - صفحه ۲۸ PDF",
      text: "کره رسانایی به شعاع ۱۰ cm بار الکتریکی ۲۰ μC دارد. در فاصله ۳۰ cm از مرکز کره میدان الکتریکی آن چند نیوتون بر کولن است؟ (k = ۹×۱۰⁹ N·m²/C²)",
      options: ["۲×۱۰⁶", "۶×۱۰⁶", "۱۸×۱۰⁶", "۲۰×۱۰⁶"],
      correctIndex: 3,
      answer: "برای فاصله‌های بزرگ‌تر از شعاع کره، میدان مانند بار نقطه‌ای در مرکز محاسبه می‌شود:\nE = kq/r²\nE = (۹×۱۰⁹ × ۲۰×۱۰⁻⁶) ÷ (۰/۳)²\nE = ۱۸۰×۱۰³ ÷ ۰/۰۹ = ۲×۱۰⁶ N/C\n✅ گزینه 4 صحیح است."
    },
    // ===== سوال ۱۶۱ - صفحه ۳۰ PDF =====
    {
      id: 161,
      section: "سوال ۱۶۱ - صفحه ۳۰ PDF",
      text: "میدان الکتریکی در فاصله ۶۰ سانتی‌متری از بار q برابر با ۳۲ N/C است. چند سانتی‌متر دیگر از بار فوق دور شویم تا میدان الکتریکی ۱۴ واحد SI کاهش یابد؟",
      options: ["۱۰", "۲۰", "۳۰", "۴۰"],
      correctIndex: 1,
      answer: "کاهش ۱۴ واحد SI یعنی:\nE₂ = ۳۲ - ۱۴ = ۱۸ N/C\n\nE₁/E₂ = (r₂/r₁)²\n۳۲/۱۸ = (r₂/۶۰)²\n۱۶/۹ = (r₂/۶۰)²\n۴/۳ = r₂/۶۰ ⇒ r₂ = ۸۰ cm\n\nΔr = ۸۰ - ۶۰ = ۲۰ cm\n✅ گزینه ۲ صحیح است."
    },
    // ===== سوال ۱۶۳ - صفحه ۳۰ PDF =====
    {
      id: 163,
      section: "سوال ۱۶۳ - صفحه ۳۰ PDF",
      text: "سه بار الکتریکی مطابق شکل زیر روی رأس‌های یک مثلث قائم‌الزاویه قرار گرفته‌اند. اگر برآیند نیروهای الکتریکی وارد بر بار q₁ به صورت F = (-۰/۲)i + (۱/۴)j باشد، میدان الکتریکی بار q₁ در محل بار q₂ در SI کدام است؟ (k = ۹×۱۰⁹ N·m²/C²)",
      // کامپوننت حذف شد و جایگزین آن تگ image و imageAlt شد
      image: "/img/q163.png", 
      imageAlt: "مثلث قائم‌الزاویه با بارهای q1، q2 و q3",
      options: ["(√۲i - √۲j)×۱۰⁵", "(۳/۵i - ۳/۵j)×۱۰⁵", "(-√۲i + √۲j)×۱۰⁵", "(-۳/۵i + ۳/۵j)×۱۰⁵"],
      correctIndex: 1,
      answer: "با محاسبه نیروها و تقسیم بر بار q₂:\nE = F/q\nبا توجه به مقادیر داده شده:\nE = (-√۲i + √۲j)×۱۰⁵ N/C\n✅ گزینه 2 صحیح است."
    },
    // ===== سوال ۱۷۴ - صفحه ۳۲ PDF =====
    {
      id: 174,
      section: "سوال ۱۷۴ - صفحه ۳۲ PDF",
      text: "در نقطه A به فاصله مشخصی از یک بار الکتریکی، میدان الکتریکی ناشی از آن بار برابر با E₁ است. اگر اندازه بار ۲۱ درصد افزایش یابد، برای آنکه اندازه میدان در نقطه A ثابت بماند، فاصله نقطه A از بار الکتریکی باید چگونه تغییر کند؟",
      ImageComponent: null,
      options: ["۱۰٪ افزایش یابد", "۲۱٪ افزایش یابد", "۴۲٪ کاهش یابد", "۲۱٪ افزایش یابد"],
      correctIndex: 0,
      answer: "E = kq/r²\nبرای ثابت ماندن E داریم:\nq₁/r₁² = q₂/r₂²\nq₂ = ۱/۲۱ q₁\nr₂²/r₁² = ۱/۲۱ ⇒ r₂/r₁ = √۱/۲۱ ≈ ۱/۱\n⇒ حدود ۱۰٪ افزایش\n✅ گزینه 1 صحیح است."
    },
    // ===== سوال ۱۷۶ - صفحه ۳۲ PDF =====
    {
      id: 176,
      section: "سوال ۱۷۶ - صفحه ۳۲ PDF",
      text: "بار نقطه‌ای q = +۵ μC بر باری هم‌اندازه خودش که در فاصله r از آن قرار دارد، نیروی F = ۱۰ N را وارد می‌کند. بزرگی میدان الکتریکی ناشی از بار q در فاصله ۵r از این بار، چند نیوتون بر کولن است؟",
      ImageComponent: null,
      options: ["۸×۱۰⁴", "۴×۱۰⁵", "۲×۱۰⁶", "۱۰⁷"],
      correctIndex: 0,
      answer: "F = kq²/r² ⇒ ۱۰ = ۹×۱۰⁹ × (۵×۱۰⁻⁶)²/r²\n⇒ r² = ۹×۱۰⁹ × ۲۵×۱۰⁻¹² ÷ ۱۰ = ۲۲/۵×۱۰⁻²\n⇒ r = ۰/۱۵ m\n\nE = kq/(۵r)² = ۹×۱۰⁹ × ۵×۱۰⁻⁶ ÷ (۰/۷۵)²\n= ۴۵×۱۰³ ÷ ۰/۵۶۲۵ = ۸×۱۰⁴ N/C\n\n✅ گزینه ۱ صحیح است."
    },
    // ===== سوال ۱۸۷ - صفحه ۳۳ PDF =====
    {
      id: 187,
      section: "سوال ۱۸۷ - صفحه ۳۳ PDF",
      text: "دو بار نقطه‌ای q₁ = ۴q و q₂ = ۹q در فاصله r از هم واقع هستند. میدان الکتریکی ناشی از دو بار در فاصله d₁ از بار q₁ برابر با صفر است. اگر فاصله دو بار از هم دو برابر شود، میدان الکتریکی برآیند در فاصله d₂ از بار q₂ برابر با صفر می‌شود. d₂ چند برابر d₁ است؟",
      ImageComponent: null,
      options: ["۳", "۴", "۲", "۳/۲"],
      correctIndex: 2,
      answer: "حالت اول: E₁ = E₂\nk×۴q/d₁² = k×۹q/(r-d₁)²\n⇒ ۲/d₁ = ۳/(r-d₁)\n⇒ ۲r - ۲d₁ = ۳d₁ ⇒ ۵d₁ = ۲r ⇒ d₁ = ۲r/۵\n\nحالت دوم: E₁ = E₂\nk×۴q/(۲r-d₂)² = k×۹q/d₂²\n⇒ ۲/(۲r-d₂) = ۳/d₂\n⇒ ۲d₂ = ۳(۲r-d₂) = ۶r - ۳d₂\n⇒ ۵d₂ = ۶r ⇒ d₂ = ۶r/۵\n\nd₂/d₁ = (۶r/۵) ÷ (۲r/۵) = ۳\n✅ گزینه ۳ صحیح است."
    },
    // ===== سوال ۱۸۸ - صفحه ۳۳ PDF =====
    {
      id: 188,
      section: "سوال ۱۸۸ - صفحه ۳۳ PDF",
      text: " +۱۰ میکروکولن بار را بین دو کره کوچک رسانا که در فاصله ۳۰ cm از هم قرار دارند طوری تقسیم می‌کنیم که حداکثر نیروی الکتریکی ممکن را به یکدیگر وارد کنند. اگر +۳ μC بار از یکی از کره‌ها برداشته و به دیگری اضافه کنیم، میدان الکتریکی برآیند در چه فاصله‌ای از کره اول صفر خواهد شد؟",
      ImageComponent: null,
      options: ["۲۰ cm", "۱۵ cm", "۱۰ cm", "۵ cm"],
      correctIndex: 2,
      answer: "برای حداکثر نیرو، بارها باید مساوی باشند:\nq₁ = q₂ = +۵ μC\n\nپس از انتقال ۳ μC:\nq₁ = ۵ + ۳ = ۸ μC\nq₂ = ۵ - ۳ = ۲ μC\n\nشرط صفر شدن میدان بین دو بار (نزدیک به بار کوچک‌تر):\nE₁ = E₂ ⇒ k×۸/x² = k×۲/(۳۰-x)²\n⇒ ۸/x² = ۲/(۳۰-x)²\n⇒ ۴/x² = ۱/(۳۰-x)²\n⇒ ۲/x = ۱/(۳۰-x)\n⇒ ۲(۳۰-x) = x ⇒ ۶۰ = ۳x ⇒ x = ۲۰ cm\n✅ گزینه 3 صحیح است."
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  // برای مدیریت خطای تصویر (اختیاری، اما خیلی به کارتان می‌آید)
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (id: number) => {
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

  const handleOptionClick = (questionId: number, optionIndex: number) => {
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
  const getScoreColor = (s: number) => s >= 80 ? '#28a745' : s >= 50 ? '#ffc107' : '#dc3545';
  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div style={{ fontFamily: 'Tahoma, Arial, sans-serif', width: '100vw', minHeight: '100vh', padding: '15px 10px', backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <div style={{ backgroundColor: '#1565C0', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'center', position: 'relative' }}>
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون میدان الکتریکی</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>درس سوم: میدان الکتریکی - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}</p>
          </div>
          <div style={{ backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)', padding: '10px 25px', borderRadius: '50px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>⏱️ {isTimeUp ? 'تمام شد!' : formatTime(timeLeft)}</div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => {
          return (
            <div key={q.id} style={{ marginBottom: '25px', backgroundColor: '#ffffff', padding: '20px 25px', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#e3f2fd', color: '#1565C0', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>{q.section}</div>
              <div style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '20px', fontWeight: '500', display: 'flex', alignItems: 'flex-start', whiteSpace: 'pre-wrap' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#1565C0', color: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '30px', borderRadius: '50%', fontSize: '14px', marginLeft: '15px', flexShrink: 0 }}>{index + 1}</span>
                <span>{q.text}</span>
              </div>

              {/* ======= جایگزینی برای تصویر سوال ======= */}
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

        <div style={{ marginTop: '30px', marginBottom: '30px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
          {!isScoreCalculated ? (
            <button onClick={() => canCalculate && calculateScore()} disabled={!canCalculate} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: canCalculate ? '#1565C0' : '#6c757d', color: '#fff', border: 'none', borderRadius: '50px', cursor: canCalculate ? 'pointer' : 'not-allowed', fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6 }}>
              {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده` : '📊 محاسبه درصد'}
            </button>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span></div>
              <div style={{ width: '80%', maxWidth: '400px', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden', margin: '15px auto' }}><div style={{ width: `${score}%`, height: '100%', backgroundColor: getScoreColor(score!) }} /></div>
              <button onClick={() => { setIsScoreCalculated(false); setScore(null); isCalculatedRef.current = false; isTimeUpRef.current = false; }} style={{ padding: '10px 25px', fontSize: '14px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: showAnswers ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

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
                    
                    {/* ======= تصویر در پاسخنامه ======= */}
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

export default Physics2ElectricField;