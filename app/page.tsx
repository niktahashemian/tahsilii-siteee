'use client';

import { useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import './assets/css/style.css';

export default function HomePage() {
  
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const grades = [
    { id: 1, name: 'دهم', value: '10' },
    { id: 2, name: 'یازدهم', value: '11' },
    { id: 3, name: 'دوازدهم', value: '12' }
  ];

  const exams = [
    { id: 1, name: 'آزمون قلمچی', value: 'ghalamchi', icon: '📚', color: '#4CAF50' },
    { id: 2, name: 'آزمون ماز', value: 'maz', icon: '🎯', color: '#2196F3' },
    { id: 3, name: 'آزمون گزینه دو', value: 'gozine2', icon: '⭐', color: '#FF9800' },
    { id: 4, name: 'آزمون سنجش', value: 'sanjesh', icon: '⭐', color: '#6011a1ff' },
    { id: 5, name: 'خیلی سبز', value: 'kheili sabz', icon: '⭐', color: '#ec0f22ff' }
  ];

  const handleGradeClick = (gradeName: string) => {
    setSelectedGrade(gradeName);
    setSelectedField(null);
    setSelectedExam(null);
    console.log(`پایه ${gradeName} انتخاب شد`);
  };

  const handleFieldClick = (fieldName: string) => {
    setSelectedField(fieldName);
    setSelectedExam(null);
    console.log(`رشته ${fieldName} انتخاب شد`);
  };

  const handleExamClick = (examValue: string) => {
    setSelectedExam(examValue);
    console.log(`آزمون ${examValue} انتخاب شد`);
  };

  const resetSelection = () => {
    setSelectedGrade(null);
    setSelectedField(null);
    setSelectedExam(null);
  };

  const goBackToExams = () => {
    setSelectedExam(null);
  };

  // تبدیل نام فارسی پایه به انگلیسی برای مسیر
  const getGradePath = (grade: string) => {
    const gradeMap: { [key: string]: string } = {
      'دهم': 'dahom',
      'یازدهم': 'yazdahom',
      'دوازدهم': 'davazdahom'
    };
    return gradeMap[grade] || grade;
  };

  // نیم سال‌ها
  const semesters = [
    { id: 1, name: 'نیم سال اول', value: 'first-half' },
    { id: 2, name: 'نیم سال دوم', value: 'second-half' }
  ];

  return (
    <div className="container">
      <Link href="/">
                                              <Image
                                                  src="/img/parto.PNG"
                                                  className="ras-logo-image"
                                                  alt="پرتو امید"
                                                  width={120}
                                                  height={20}
                                                  priority
                                              />
                                          </Link>
      <div className="buttonGroup">
        {grades.map((grade) => (
          <button
            key={grade.id}
            className="gradeButton"
            onClick={() => handleGradeClick(grade.name)}
          >
            پایه {grade.name}
          </button>
        ))}
      </div>

      {/* نمایش رشته‌ها */}
      {selectedGrade && !selectedField && (
        <div className="reshte">
          <div className="message" onClick={() => handleFieldClick('ensani')}>
            {selectedGrade} انسانی 
          </div>
          <div className="message" onClick={() => handleFieldClick('riyazi')}>
            {selectedGrade} ریاضی
          </div>
          <div className="message" onClick={() => handleFieldClick('tajrobi')}>
            {selectedGrade} تجربی
          </div>
          {/* <div className="message" onClick={() => handleFieldClick('tajrobi')}>
            {selectedGrade} تربیت بدنی
          </div> */}
        </div>
      )}

      {/* نمایش آزمون‌ها بعد از انتخاب رشته */}
      {selectedGrade && selectedField && !selectedExam && (
        <div className="exam-section">
          <div className="exam-header">
            <button onClick={() => setSelectedField(null)} className="back-button">
              ← بازگشت به انتخاب رشته
            </button>
            <h2 className="exam-title">
              {selectedGrade} {selectedField === 'ensani' ? 'انسانی' : selectedField === 'riyazi' ? 'ریاضی' : 'تجربی'}
            </h2>
            <p className="exam-subtitle">یکی از آزمون‌های زیر را انتخاب کنید:</p>
          </div>

          <div className="exam-grid">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="exam-card"
                style={{ '--exam-color': exam.color } as React.CSSProperties}
                onClick={() => handleExamClick(exam.value)}
              >
                <div className="exam-icon">{exam.icon}</div>
                <h3 className="exam-name">{exam.name}</h3>
                <p className="exam-description">
                  آزمون جامع {exam.name} برای پایه {selectedGrade}
                </p>
                <div className="exam-button">
                  انتخاب آزمون
                </div>
              </div>
            ))}
          </div>

          <button onClick={resetSelection} className="resetButton">
            انتخاب مجدد پایه و رشته
          </button>
        </div>
      )}

      {/* نمایش نیم سال‌ها بعد از انتخاب آزمون */}
      {selectedGrade && selectedField && selectedExam && (
        <div className="semester-section">
          <div className="semester-header">
            <button onClick={goBackToExams} className="back-button">
              ← بازگشت به انتخاب آزمون
            </button>
            <h2 className="semester-title">
              {exams.find(e => e.value === selectedExam)?.name}
            </h2>
            <p className="semester-subtitle">
              {selectedGrade} {selectedField === 'ensani' ? 'انسانی' : selectedField === 'riyazi' ? 'ریاضی' : 'تجربی'}
            </p>
            <p>لطفاً نیم سال مورد نظر را انتخاب کنید:</p>
          </div>

          <div className="semester-buttons">
            {semesters.map((semester) => (
              <Link
                key={semester.id}
                href={`/exam/${getGradePath(selectedGrade)}/${selectedField}/${selectedExam}/${semester.value}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="semester-card">
                  <div className="semester-icon">
                    {semester.id === 1 ? '📖' : '📚'}
                  </div>
                  <h3 className="semester-name">{semester.name}</h3>
                  <p className="semester-description">
                    {semester.id === 1 
                      ? 'مباحث نیم سال اول' 
                      : 'مباحث نیم سال دوم'}
                  </p>
                  <div className="semester-button">
                    شروع {semester.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button onClick={resetSelection} className="resetButton">
            انتخاب مجدد پایه و رشته
          </button>
        </div>
      )}
    </div>
  );
}