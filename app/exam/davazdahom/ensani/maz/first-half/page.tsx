'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  questionCount: number;
}

export default function LessonsPage() {
  const params = useParams();
  const router = useRouter();

  const grade = params.grade as string;       // 'davazdahom'
  const field = params.field as string;       // 'ensani'
  const exam = params.exam as string;         // 'ghalamchi' | 'maz' | ...
  const semester = params.semester as string; // 'first-half' | 'second-half'

  // ======================== توابع تبدیل نام‌ها ========================
  const getGradeName = (gradePath: string): string => {
    const map: Record<string, string> = {
      dahom: 'دهم',
      yazdahom: 'یازدهم',
      davazdahom: 'دوازدهم',
    };
    return map[gradePath] || gradePath;
  };

  const getFieldName = (fieldPath: string): string => {
    const map: Record<string, string> = {
      ensani: 'انسانی',
      riyazi: 'ریاضی',
      tajrobi: 'تجربی',
    };
    return map[fieldPath] || fieldPath;
  };

  const getExamName = (examPath: string): string => {
    const map: Record<string, string> = {
      ghalamchi: 'قلمچی',
      gozine2: 'گزینه دو',
      sanjesh: 'سنجش',
      maz: 'ماز',
      kheilisabz: 'خیلی سبز',
    };
    return map[examPath] || examPath;
  };

  const getSemesterName = (semesterPath: string): string => {
    const map: Record<string, string> = {
      'first-half': 'نیم‌سال اول',
      'second-half': 'نیم‌سال دوم',
    };
    return map[semesterPath] || semesterPath;
  };

  // ======================== لیست دروس کنکوری دوازدهم انسانی ========================
  const lessons: Lesson[] = [
    {
      id: 1,
      name: 'ریاضی و آمار (3)',
      icon: '📐',
      color: '#F44336',
      description: 'تابع، معادله درجه دوم، هندسه تحلیلی و آمار و احتمال',
      questionCount: 10,
    },
    {
      id: 2,
      name: 'علوم و فنون ادبی (3)',
      icon: '✍️',
      color: '#4CAF50',
      description: 'عروض، قافیه، آرایه‌های ادبی و سبک‌شناسی',
      questionCount: 10,
    },
    {
      id: 3,
      name: 'عربی (3) - زبان قرآن',
      icon: '📜',
      color: '#795548',
      description: 'قواعد، ترجمه، متون قرآنی و واژگان عربی اختصاصی',
      questionCount: 10,
    },
    {
      id: 4,
      name: 'تاریخ (3) - ایران و جهان معاصر',
      icon: '🏛️',
      color: '#FFC107',
      description: 'تاریخ ایران معاصر و تحولات جهان در قرن بیستم',
      questionCount: 10,
    },
    {
      id: 5,
      name: 'جغرافیا (3)',
      icon: '🌍',
      color: '#795548',
      description: 'جغرافیای شهری، روستایی، ناحیه‌ای و ژئوپلیتیک',
      questionCount: 10,
    },
    {
      id: 6,
      name: 'جامعه‌شناسی (3)',
      icon: '👥',
      color: '#00BCD4',
      description: 'هویت اجتماعی، تحولات جهان، نظام جهانی و ایران',
      questionCount: 10,
    },
    {
      id: 7,
      name: 'فلسفه (2)',
      icon: '💭',
      color: '#607D8B',
      description: 'مفاهیم فلسفی، هستی‌شناسی، معرفت‌شناسی و فلسفه اسلامی',
      questionCount: 10,
    },
  ];

  // ======================== نگاشت نام درس به slug ========================
  const getLessonSlug = (lessonName: string): string => {
    const trimmed = lessonName.trim();
    const slugMap: Record<string, string> = {
      'ریاضی و آمار (3)': 'riyazi-va-amar-3-ensani',
      'علوم و فنون ادبی (3)': 'olum-va-fonun-adabi-3-ensani',
      'عربی (3) - زبان قرآن': 'arabi-3-ensani',
      'تاریخ (3) - ایران و جهان معاصر': 'tarikh-3-ensani',
      'جغرافیا (3)': 'joghrafia-3-ensani',
      'جامعه‌شناسی (3)': 'jame-shenasi-3-ensani',
      'فلسفه (2)': 'falsafe-2-ensani',
    };
    return slugMap[trimmed] || trimmed.replace(/ /g, '-').toLowerCase();
  };

  // ======================== هندلر کلیک روی درس ========================
  const handleLessonClick = (lessonName: string) => {
    const lessonSlug = getLessonSlug(lessonName);
    router.push(`/exam/davazdahom/ensani/maz/first-half/${lessonSlug}`);
  };

  return (
    <div className="exam-lessons-container">
      <div className="exam-header">
        <Link href="/" className="back-to-home">
          ← بازگشت به صفحه اصلی
        </Link>
        <h1 className="exam-title">
          📚 {getExamName(exam)} - {getGradeName(grade)} {getFieldName(field)}
        </h1>
        <p className="exam-subtitle">
          {getSemesterName(semester)} - درس مورد نظر خود را انتخاب کنید:
        </p>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson-card"
            onClick={() => handleLessonClick(lesson.name)}
          >
            <div className="lesson-icon">{lesson.icon}</div>
            <h3 className="lesson-name">{lesson.name}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <div className="lesson-stats">
              <span className="question-count">📝 {lesson.questionCount} سوال</span>
            </div>
            <div className="lesson-button" style={{ backgroundColor: lesson.color }}>
              شروع آزمون {lesson.name}
            </div>
          </div>
        ))}
      </div>

      <div className="info-box">
        <p>💡 هر آزمون شامل سوالات تخصصی {getSemesterName(semester)} {getGradeName(grade)} {getFieldName(field)} می‌باشد.</p>
        <p>📊 پس از اتمام آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🎯 دروس فوق، دروس اختصاصی کنکور انسانی هستند که از آنها سؤال طرح می‌شود.</p>
      </div>

      <style jsx>{`
        .exam-lessons-container {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          direction: rtl;
          font-family: 'Vazir', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .exam-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .back-to-home {
          display: inline-block;
          background: #4a5568;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .back-to-home:hover {
          background: #2d3748;
        }
        .exam-title {
          font-size: 2rem;
          color: #1a202c;
          margin: 0.5rem 0;
        }
        .exam-subtitle {
          color: #4a5568;
          font-size: 1rem;
        }
        .lessons-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .lesson-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .lesson-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .lesson-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .lesson-name {
          font-size: 1.15rem;
          font-weight: bold;
          margin: 0.5rem 0;
          color: #2d3748;
        }
        .lesson-description {
          font-size: 0.85rem;
          color: #718096;
          margin: 0.5rem 0;
          line-height: 1.4;
        }
        .lesson-stats {
          margin: 1rem 0;
        }
        .question-count {
          background: #edf2f7;
          padding: 0.2rem 0.6rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          color: #4a5568;
        }
        .lesson-button {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          color: white;
          font-size: 0.85rem;
          font-weight: bold;
          text-align: center;
          transition: opacity 0.2s;
          border: none;
        }
        .lesson-button:hover {
          opacity: 0.9;
        }
        .info-box {
          background: white;
          border-radius: 1rem;
          padding: 1rem;
          margin-top: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          color: #4a5568;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .exam-lessons-container {
            padding: 1rem;
          }
          .exam-title {
            font-size: 1.5rem;
          }
          .lessons-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}