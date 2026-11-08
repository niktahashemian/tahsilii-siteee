'use client';
import React, { useState } from 'react'; // 👈 React به اینجا اضافه شد
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

export default function ManteghChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    // ==================== بخش اول: منطق و مباحث آن ====================
    {
      id: 1,
      name: 'بخش اول: منطق و مباحث آن',
      icon: '🧠',
      color: '#00897B',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع بخش اول: منطق و مباحث آن',
      examQuestionCount: 10,
      lessons: [
        { id: 1, name: 'درس نخست: منطق، ترازوی اندیشه', description: 'تعریف منطق، فایده و کاربرد آن در اندیشیدن صحیح', questionCount: 10, slug: 'lesson1' },
      ]
    },
    // ==================== بخش دوم: روابط میان ذهن، زبان و خارج ====================
    {
      id: 2,
      name: 'بخش دوم: روابط میان ذهن، زبان و خارج',
      icon: '🗣️',
      color: '#1E88E5',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع بخش دوم: روابط میان ذهن، زبان و خارج',
      examQuestionCount: 20,
      lessons: [
        { id: 2, name: 'درس دوم: لفظ و معنا', description: 'دلالت الفاظ بر معانی، انواع دلالت و رابطه زبان و ذهن', questionCount: 10, slug: 'lesson2' },
        { id: 3, name: 'درس سوم: مفهوم و مصداق', description: 'تفاوت مفهوم کلی و مصداق خارجی، بررسی کلی و جزئی', questionCount: 10, slug: 'lesson3' },
      ]
    },
    // ==================== بخش سوم: تعریف ====================
    {
      id: 3,
      name: 'بخش سوم: تعریف',
      icon: '📖',
      color: '#43A047',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع بخش سوم: تعریف',
      examQuestionCount: 15,
      lessons: [
        { id: 4, name: 'درس چهارم: اقسام و شرایط تعریف', description: 'هدف از تعریف، انواع تعریف (لفظی و حقیقی) و قواعد آن', questionCount: 15, slug: 'lesson4' },
      ]
    },
    // ==================== بخش چهارم: استدلال استقرایی ====================
    {
      id: 4,
      name: 'بخش چهارم: استدلال استقرایی',
      icon: '🔍',
      color: '#FB8C00',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع بخش چهارم: استدلال استقرایی',
      examQuestionCount: 15,
      lessons: [
        { id: 5, name: 'درس پنجم: اقسام استدلال استقرایی', description: 'استدلال استقرایی، تمثیل و انواع آن در منطق', questionCount: 15, slug: 'lesson5' },
      ]
    },
    // ==================== بخش پنجم: قضیه حملی و قیاس اقترانی ====================
    {
      id: 5,
      name: 'بخش پنجم: قضیه حملی و قیاس اقترانی',
      icon: '⚖️',
      color: '#8E24AA',
      examSlug: 'chapter5-exam',
      examName: 'آزمون جامع بخش پنجم: قضیه حملی و قیاس اقترانی',
      examQuestionCount: 30,
      lessons: [
        { id: 6, name: 'درس ششم: قضیه حملی', description: 'تعریف قضیه، ساختار قضیه حملیه و اقسام آن', questionCount: 10, slug: 'lesson6' },
        { id: 7, name: 'درس هفتم: احکام قضایا', description: 'روابط میان قضایا، تناقض و تضاد در قضایای حملیه', questionCount: 10, slug: 'lesson7' },
        { id: 8, name: 'درس هشتم: قیاس اقترانی', description: 'ساختار قیاس، شکل‌های چهارگانه و قواعد آن', questionCount: 10, slug: 'lesson8' },
      ]
    },
    // ==================== بخش ششم: قضیه شرطی و قیاس استثنایی ====================
    {
      id: 6,
      name: 'بخش ششم: قضیه شرطی و قیاس استثنایی',
      icon: '🔀',
      color: '#D81B60',
      examSlug: 'chapter6-exam',
      examName: 'آزمون جامع بخش ششم: قضیه شرطی و قیاس استثنایی',
      examQuestionCount: 20,
      lessons: [
        { id: 9, name: 'درس نهم: قضیه شرطی و قیاس استثنایی', description: 'اقسام قضایای شرطی (متصل و منفصل) و قیاس استثنایی', questionCount: 20, slug: 'lesson9' },
      ]
    },
    // ==================== بخش هفتم: منطق کاربردی ====================
    {
      id: 7,
      name: 'بخش هفتم: منطق کاربردی',
      icon: '💡',
      color: '#F4511E',
      examSlug: 'chapter7-exam',
      examName: 'آزمون جامع بخش هفتم: منطق کاربردی',
      examQuestionCount: 20,
      lessons: [
        { id: 10, name: 'درس دهم: سنجشگری در تفکر', description: 'مغالطات منطقی، تفکر نقادانه و کاربرد منطق در زندگی', questionCount: 20, slug: 'lesson10' },
      ]
    },
    // ==================== آزمون جامع نهایی ====================
    {
      id: 8,
      name: '🏆 آزمون جامع کل کتاب منطق',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب منطق دهم انسانی',
      examQuestionCount: 50,
      lessons: [
        { id: 11, name: '📚 کل دروس کتاب', description: 'شامل تمام ۷ بخش و ۱۰ درس (از منطق، ترازوی اندیشه تا سنجشگری در تفکر)', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/dahom/ensani/maz/first-half/mantegh-ensani/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/dahom/ensani/maz/first-half/mantegh-ensani/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => router.push('/exam/dahom/ensani/maz/first-half')} style={styles.backButton}>
          ← بازگشت به لیست دروس
        </button>
        <h1 style={styles.title}>🧠 منطق - پایه دهم انسانی (ماز)</h1>
        <p style={styles.subtitle}>برای شروع، روی هر بخش کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
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
                    <p style={styles.lessonDescription}>آزمون جامع تمام دروس این بخش</p>
                    <div style={styles.lessonStats}>
                      <span style={styles.questionCount}>📝 {chapter.examQuestionCount} سوال</span>
                      <span style={styles.durationBadge}>⏱️ {Math.floor(chapter.examQuestionCount * 1.5)} دقیقه</span>
                    </div>
                  </div>
                  <div style={styles.examButton}>شروع آزمون جامع →</div>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerText}>📖 دروس بخش</span>
                </div>

                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={styles.lessonCard}
                    onClick={() => handleLessonClick(lesson.slug)}
                  >
                    <div style={styles.lessonIcon}>📘</div>
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
        <p>💡 نکته: برای شروع آزمون هر درس یا آزمون جامع بخش، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس آن بخش می‌باشند.</p>
        <p>📚 این آزمون‌ها مطابق با کتاب منطق پایه دهم رشته انسانی طراحی شده‌اند.</p>
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