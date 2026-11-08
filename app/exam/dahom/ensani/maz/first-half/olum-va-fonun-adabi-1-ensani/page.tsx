'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Lesson {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  slug: string;
}

interface Chapter {
  id: number;
  name: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  examSlug: string;
  examName: string;
  examQuestionCount: number;
}

export default function OlumVaFonunChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    // ==================== فصل یکم ====================
    {
      id: 1,
      name: 'فصل یکم: مبانی تحلیل متن',
      icon: '📝',
      color: '#00897B', // رنگ سبزآبی
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل یکم',
      examQuestionCount: 20,
      lessons: [
        { id: 1, name: 'درس یکم: مبانی تحلیل متن', description: 'مفاهیم پایه تحلیل متن، ساختار و معنا', questionCount: 10, slug: 'lesson1' },
        { id: 2, name: 'درس دوم: سازها و عوامل تأثیرگذار در شعر فارسی', description: 'عوامل موسیقایی و ساختاری در شعر', questionCount: 10, slug: 'lesson2' },
        { id: 3, name: 'درس سوم: واژگان و آرایه‌های ادبی', description: 'بررسی واژگان و صنایع ادبی در متون', questionCount: 12, slug: 'lesson3' },
        { id: 4, name: 'کارگاه تحلیل فصل اول', description: 'تمرین و تحلیل متون فصل اول', questionCount: 10, slug: 'workshop1' },
      ]
    },
    // ==================== فصل دوم ====================
    {
      id: 2,
      name: 'فصل دوم: تاریخ ادبیات و بدیع',
      icon: '📜',
      color: '#1E88E5', // رنگ آبی
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم',
      examQuestionCount: 20,
      lessons: [
        { id: 5, name: 'درس چهارم: تاریخ ادبیات پیش از اسلام و قرن‌های اولیه هجری', description: 'بررسی تاریخ ادبیات در دوران باستان و قرون اولیه', questionCount: 12, slug: 'lesson4' },
        { id: 6, name: 'درس پنجم: هماهنگی پاره‌های کلام', description: 'تناسب و هماهنگی در ساختار کلام', questionCount: 10, slug: 'lesson5' },
        { id: 7, name: 'درس ششم: سجع و انواع آن', description: 'آرایه سجع و انواع مختلف آن', questionCount: 10, slug: 'lesson6' },
        { id: 8, name: 'کارگاه تحلیل فصل دوم', description: 'تمرین و تحلیل متون فصل دوم', questionCount: 10, slug: 'workshop2' },
      ]
    },
    // ==================== فصل سوم ====================
    {
      id: 3,
      name: 'فصل سوم: سبک‌شناسی و عروض',
      icon: '⚖️',
      color: '#43A047', // رنگ سبز
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم',
      examQuestionCount: 20,
      lessons: [
        { id: 9, name: 'درس هفتم: سبک و سبک‌شناسی (سبک خراسانی)', description: 'شناخت سبک خراسانی و ویژگی‌های آن', questionCount: 12, slug: 'lesson7' },
        { id: 10, name: 'درس هشتم: وزن شعر فارسی', description: 'مبانی عروض و وزن در شعر فارسی', questionCount: 12, slug: 'lesson8' },
        { id: 11, name: 'درس نهم: موازنه و ترصیع', description: 'آرایه‌های موازنه و ترصیع در بدیع', questionCount: 10, slug: 'lesson9' },
        { id: 12, name: 'کارگاه تحلیل فصل سوم', description: 'تمرین و تحلیل متون فصل سوم', questionCount: 10, slug: 'workshop3' },
      ]
    },
    // ==================== فصل چهارم ====================
    {
      id: 4,
      name: 'فصل چهارم: سبک‌شناسی و قافیه',
      icon: '✍️',
      color: '#FB8C00', // رنگ نارنجی
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم',
      examQuestionCount: 20,
      lessons: [
        { id: 13, name: 'درس دهم: زبان و ادبیات فارسی در سده‌های پنجم و ششم و ویژگی‌های سبکی آن', description: 'ویژگی‌های زبانی و ادبی سبک‌های دوره سلجوقی', questionCount: 12, slug: 'lesson10' },
        { id: 14, name: 'درس یازدهم: قافیه', description: 'مبانی قافیه، حروف و انواع آن', questionCount: 10, slug: 'lesson11' },
        { id: 15, name: 'درس دوازدهم: جناس و انواع آن', description: 'آرایه جناس و انواع مختلف آن در ادبیات', questionCount: 10, slug: 'lesson12' },
        { id: 16, name: 'کارگاه تحلیل فصل چهارم', description: 'تمرین و تحلیل متون فصل چهارم', questionCount: 10, slug: 'workshop4' },
      ]
    },
    // ==================== بخش‌های ستایش و نیایش ====================
    {
      id: 5,
      name: 'بخش‌های پایانی و آغازین کتاب',
      icon: '✨',
      color: '#8E24AA', // رنگ بنفش
      examSlug: 'extra-exam',
      examName: 'آزمون جامع ستایش و نیایش',
      examQuestionCount: 15,
      lessons: [
        { id: 17, name: 'ستایش: ای بی نشان', description: 'متن ستایش، معنی و تحلیل ادبی', questionCount: 8, slug: 'setayesh' },
        { id: 18, name: 'نیایش: به امید تو', description: 'متن نیایش، معنی و تحلیل ادبی', questionCount: 8, slug: 'niyayesh' },
      ]
    },
    // ==================== آزمون جامع نهایی ====================
    {
      id: 6,
      name: '🏆 آزمون جامع کل کتاب علوم و فنون ادبی (۱)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب علوم و فنون ادبی (۱) دهم انسانی',
      examQuestionCount: 50,
      lessons: [
        { id: 19, name: '📚 کل دروس کتاب', description: 'شامل تمام ۴ فصل، کارگاه‌های تحلیل، ستایش و نیایش', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/dahom/ensani/maz/first-half/olum-va-fonun-adabi-1-ensani/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/dahom/ensani/maz/first-half/olum-va-fonun-adabi-1-ensani/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => router.push('/exam/dahom/ensani/maz/first-half')} style={styles.backButton}>
          ← بازگشت به لیست دروس
        </button>
        <h1 style={styles.title}>✍️ علوم و فنون ادبی (۱) - پایه دهم انسانی (ماز)</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
      </div>

      <div style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <div key={chapter.id} style={styles.chapterWrapper}>
            <button
              onClick={() => handleChapterClick(chapter.id)}
              style={{
                ...styles.chapterButton,
                backgroundColor: openChapter === chapter.id ? chapter.color : '#4a5568',
              }}
            >
              <span style={styles.chapterIcon}>{chapter.icon}</span>
              <span style={styles.chapterName}>{chapter.name}</span>
              <span style={styles.chapterArrow}>{openChapter === chapter.id ? '▲' : '▼'}</span>
            </button>

            {openChapter === chapter.id && (
              <div style={styles.lessonsContainer}>
                <div
                  style={styles.chapterExamCard}
                  onClick={() => handleChapterExamClick(chapter.examSlug)}
                >
                  <div style={styles.chapterExamIcon}>🎯</div>
                  <div style={styles.lessonInfo}>
                    <h3 style={styles.chapterExamTitle}>{chapter.examName}</h3>
                    <p style={styles.lessonDescription}>آزمون جامع تمام دروس این فصل</p>
                    <div style={styles.lessonStats}>
                      <span style={styles.questionCount}>📝 {chapter.examQuestionCount} سوال</span>
                      <span style={styles.durationBadge}>⏱️ {Math.floor(chapter.examQuestionCount * 1.5)} دقیقه</span>
                    </div>
                  </div>
                  <div style={styles.examButton}>شروع آزمون جامع →</div>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerText}>📖 دروس و کارگاه‌ها</span>
                </div>

                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={styles.lessonCard}
                    onClick={() => handleLessonClick(lesson.slug)}
                  >
                    <div style={styles.lessonIcon}>
                      {lesson.name.includes('کارگاه') ? '🛠️' : '📘'}
                    </div>
                    <div style={styles.lessonInfo}>
                      <h3 style={styles.lessonName}>{lesson.name}</h3>
                      <p style={styles.lessonDescription}>{lesson.description}</p>
                      <div style={styles.lessonStats}>
                        <span style={styles.questionCount}>📝 {lesson.questionCount} سوال</span>
                        <span style={styles.durationBadge}>⏱️ {Math.floor(lesson.questionCount * 1.5)} دقیقه</span>
                      </div>
                    </div>
                    <div style={styles.lessonButton}>شروع آزمون →</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.infoBox}>
        <p>💡 نکته: برای شروع آزمون هر درس، کارگاه تحلیل یا آزمون جامع فصل، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس آن فصل می‌باشند.</p>
        <p>📚 این آزمون‌ها مطابق با کتاب علوم و فنون ادبی (۱) پایه دهم رشته انسانی طراحی شده‌اند.</p>
      </div>

      <style>{`
        .lesson-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .lesson-card:hover .lesson-button {
          background-color: #10b981;
        }
        .chapter-exam-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .chapter-exam-card:hover .exam-button {
          background-color: #10b981;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lessons-container {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f0f4f8',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    padding: '2rem',
    borderRadius: '1rem',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#333',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#1a237e',
    margin: '0.5rem 0',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#555',
    fontSize: '1rem',
  },
  chaptersContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chapterWrapper: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  chapterButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.2rem 1.5rem',
    border: 'none',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  chapterIcon: {
    fontSize: '1.5rem',
  },
  chapterName: {
    flex: 1,
    textAlign: 'right',
    marginRight: '1rem',
  },
  chapterArrow: {
    fontSize: '0.9rem',
  },
  lessonsContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    backgroundColor: '#f8f9fa',
  },
  chapterExamCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '2px solid #81c784',
  },
  chapterExamIcon: {
    fontSize: '2rem',
    marginRight: '1rem',
  },
  chapterExamTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'right',
  },
  divider: {
    textAlign: 'center',
    margin: '0.5rem 0',
    position: 'relative',
  },
  dividerText: {
    backgroundColor: '#e9ecef',
    padding: '0.2rem 1rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    color: '#6c757d',
  },
  lessonCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  lessonIcon: {
    fontSize: '1.8rem',
    marginRight: '1rem',
  },
  lessonInfo: {
    flex: 1,
    textAlign: 'right',
  },
  lessonName: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  lessonDescription: {
    margin: '0.25rem 0',
    fontSize: '0.8rem',
    color: '#666',
  },
  lessonStats: {
    marginTop: '0.25rem',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  questionCount: {
    backgroundColor: '#f0f0f0',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    color: '#555',
  },
  durationBadge: {
    backgroundColor: '#e3f2fd',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    color: '#1565c0',
  },
  lessonButton: {
    backgroundColor: '#9C27B0',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  examButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginTop: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#555',
  },
};