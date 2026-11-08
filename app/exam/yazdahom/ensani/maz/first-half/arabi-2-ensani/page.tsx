'use client';
import { useState } from 'react';
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

export default function ArabicChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'درس اول: مَواعِظُ قَیِّمَةٌ',
      icon: '📖',
      color: '#1A237E',
      examSlug: 'lesson1-exam',
      examName: 'آزمون درس اول: مواعظ قیمة',
      examQuestionCount: 20,
      lessons: [
        { id: 1, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس اول (مواعظ قیمة)', questionCount: 10, slug: 'lesson1-text' },
        { id: 2, name: 'قواعد: اسم فاعل، اسم مفعول و اسم مبالغه', description: 'شناخت و ساخت اسم فاعل، اسم مفعول و اسم مبالغه', questionCount: 10, slug: 'lesson1-grammar' },
      ]
    },
    {
      id: 2,
      name: 'درس دوم: صِناعَةُ التَّلْميعِ في الْأدَبِ الْفارِسيِّ',
      icon: '📝',
      color: '#1565C0',
      examSlug: 'lesson2-exam',
      examName: 'آزمون درس دوم: صناعة التلمیع',
      examQuestionCount: 20,
      lessons: [
        { id: 3, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس دوم (صناعة التلمیع)', questionCount: 10, slug: 'lesson2-text' },
        { id: 4, name: 'قواعد: اسم تفضیل و اسم مکان', description: 'آموزش اسم تفضیل، اسم مکان و کاربرد آن‌ها', questionCount: 10, slug: 'lesson2-grammar' },
      ]
    },
    {
      id: 3,
      name: 'درس سوم: عَجائِبُ الْمَخلوقاتِ',
      icon: '🌍',
      color: '#2E7D32',
      examSlug: 'lesson3-exam',
      examName: 'آزمون درس سوم: عجائب المخلوقات',
      examQuestionCount: 20,
      lessons: [
        { id: 5, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس سوم (عجائب المخلوقات)', questionCount: 10, slug: 'lesson3-text' },
        { id: 6, name: 'قواعد: اسلوب شرط و ادوات آن', description: 'شناخت جملات شرطی، ادوات شرط و ابزارهای آن', questionCount: 10, slug: 'lesson3-grammar' },
      ]
    },
    {
      id: 4,
      name: 'درس چهارم: تأثیرُ اللُّغَةِ الْفارِسيَّةِ عَلَی اللُّغَةِ الْعَرَبيَّةِ',
      icon: '🔗',
      color: '#E65100',
      examSlug: 'lesson4-exam',
      examName: 'آزمون درس چهارم: تأثیر اللغة الفارسیة',
      examQuestionCount: 20,
      lessons: [
        { id: 7, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس چهارم (تأثیر اللغة الفارسیة)', questionCount: 10, slug: 'lesson4-text' },
        { id: 8, name: 'قواعد: ترجمه اسم معرفه و نکره + ترجمه فعل مضارع', description: 'آموزش ترجمه صحیح اسم‌های معرفه و نکره و فعل مضارع', questionCount: 10, slug: 'lesson4-grammar' },
      ]
    },
    {
      id: 5,
      name: 'درس پنجم: اَلصِّدْقُ',
      icon: '💎',
      color: '#6A1B9A',
      examSlug: 'lesson5-exam',
      examName: 'آزمون درس پنجم: الصدق',
      examQuestionCount: 20,
      lessons: [
        { id: 9, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس پنجم (الصدق)', questionCount: 10, slug: 'lesson5-text' },
        { id: 10, name: 'قواعد: ادامه ترجمه فعل مضارع', description: 'تمرین و تثبیت ترجمه فعل مضارع در جملات مختلف', questionCount: 10, slug: 'lesson5-grammar' },
      ]
    },
    {
      id: 6,
      name: 'درس ششم: اِرْحَموا ثَلاثاً',
      icon: '🤲',
      color: '#00838F',
      examSlug: 'lesson6-exam',
      examName: 'آزمون درس ششم: ارحموا ثلاثاً',
      examQuestionCount: 20,
      lessons: [
        { id: 11, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس ششم (ارحموا ثلاثاً)', questionCount: 10, slug: 'lesson6-text' },
        { id: 12, name: 'قواعد: مروری بر قواعد مهم', description: 'مرور و تمرین قواعد کلیدی دروس گذشته', questionCount: 10, slug: 'lesson6-grammar' },
      ]
    },
    {
      id: 7,
      name: 'درس هفتم: لا تَقْنَطوا',
      icon: '🌟',
      color: '#AD1457',
      examSlug: 'lesson7-exam',
      examName: 'آزمون درس هفتم: لا تقنطوا',
      examQuestionCount: 20,
      lessons: [
        { id: 13, name: 'متن و ترجمه', description: 'ترجمه و درک متن درس هفتم (لا تقنطوا)', questionCount: 10, slug: 'lesson7-text' },
        { id: 14, name: 'قواعد: آداب الکلام + اعراب الفعل المضارع (عوامل نصب و جزم)', description: 'آموزش آداب سخن گفتن و اعراب فعل مضارع با عوامل نصب و جزم', questionCount: 10, slug: 'lesson7-grammar' },
      ]
    },
    {
      id: 8,
      name: '🏆 آزمون جامع کل کتاب عربی (۲) انسانی',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب عربی (۲) انسانی',
      examQuestionCount: 60,
      lessons: [
        { id: 15, name: '📚 کل دروس کتاب عربی (۲) انسانی', description: 'شامل تمام مباحث: متن و ترجمه، قواعد و تحلیل صرفی و نحوی', questionCount: 60, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/ensani/maz/first-half/arabi-2-ensani/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/ensani/maz/first-half/arabi-2-ensani/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => router.push('/exam/yazdahom/ensani/maz/first-half')} style={styles.backButton}>
          ← بازگشت به لیست دروس
        </button>
        <h1 style={styles.title}>📚 عربی (۲) - پایه یازدهم انسانی (ماز)</h1>
        <p style={styles.subtitle}>برای شروع، روی هر درس کلیک کنید و سپس بخش مورد نظر (متن، قواعد یا آزمون جامع) را انتخاب نمایید</p>
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
                    <p style={styles.lessonDescription}>آزمون جامع تمام مباحث این درس</p>
                    <div style={styles.lessonStats}>
                      <span style={styles.questionCount}>📝 {chapter.examQuestionCount} سوال</span>
                      <span style={styles.durationBadge}>⏱️ {Math.floor(chapter.examQuestionCount * 1.5)} دقیقه</span>
                    </div>
                  </div>
                  <div style={styles.examButton}>شروع آزمون جامع →</div>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerText}>📖 بخش‌های درس</span>
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
        <p>💡 نکته: برای شروع آزمون هر بخش یا آزمون جامع درس، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام مباحث آن درس می‌باشند.</p>
        <p>📚 این آزمون‌ها مطابق با کتاب عربی، زبان قرآن (۲) پایه یازدهم رشته انسانی طراحی شده‌اند.</p>
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