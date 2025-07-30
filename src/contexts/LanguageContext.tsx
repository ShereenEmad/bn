import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    certificates: 'Certificates',
    blog: 'Blog',
    contact: 'Contact',
    signIn: 'Sign In',
    dashboard: 'Dashboard',
    logout: 'Logout',
    
    // Hero
    welcomeMessage: 'Welcome to my digital world',
    heroSubtitle: 'Frontend Developer & FC Barcelona Fan',
    heroDescription: 'Passionate 15-year-old developer from Egypt, dreaming to become a professional engineer',
    viewMyWork: 'View My Work',
    
    // About
    aboutTitle: 'About Me',
    aboutDescription: 'Get to know more about Mohamed Emad, his journey, skills, and aspirations',
    personalInfo: 'Personal Information',
    name: 'Name',
    age: 'Age',
    location: 'Location',
    education: 'Education',
    favorites: 'Favorites',
    players: 'Players',
    shows: 'TV Shows',
    
    // Skills
    skillsTitle: 'Technical Skills',
    skillsDescription: 'Technologies and tools I work with',
    
    // Projects
    projectsTitle: 'My Projects',
    projectsDescription: 'Explore my portfolio of projects showcasing various skills and technologies',
    
    // Certificates
    certificatesTitle: 'Certifications',
    certificatesDescription: 'Professional certifications and achievements',
    
    // Blog
    blogTitle: 'Blog & Articles',
    blogDescription: 'Thoughts, tutorials, and insights from my development journey',
    
    // Contact
    contactTitle: 'Get In Touch',
    contactDescription: 'Ready to start your next project? Let\'s discuss how we can work together',
    messageMe: 'Message on WhatsApp',
  },
  ar: {
    // Header (Arabic)
    home: 'الرئيسية',
    about: 'نبذة عني',
    skills: 'المهارات',
    projects: 'المشاريع',
    certificates: 'الشهادات',
    blog: 'المدونة',
    contact: 'التواصل',
    signIn: 'تسجيل الدخول',
    dashboard: 'لوحة التحكم',
    logout: 'تسجيل الخروج',
    
    // Hero (Arabic)
    welcomeMessage: 'مرحباً بكم في عالمي الرقمي',
    heroSubtitle: 'مطور واجهات أمامية ومشجع برشلونة',
    heroDescription: 'مطور شغوف عمره 15 عام من مصر، يحلم بأن يصبح مهندساً محترفاً',
    viewMyWork: 'شاهد أعمالي',
    
    // About (Arabic)
    aboutTitle: 'نبذة عني',
    aboutDescription: 'تعرف أكثر على محمد عماد، رحلته، مهاراته وطموحاته',
    personalInfo: 'المعلومات الشخصية',
    name: 'الاسم',
    age: 'العمر',
    location: 'الموقع',
    education: 'التعليم',
    favorites: 'المفضلات',
    players: 'اللاعبين',
    shows: 'المسلسلات',
    
    // Skills (Arabic)
    skillsTitle: 'المهارات التقنية',
    skillsDescription: 'التقنيات والأدوات التي أعمل بها',
    
    // Projects (Arabic)
    projectsTitle: 'مشاريعي',
    projectsDescription: 'استكشف مجموعة مشاريعي التي تعرض مهارات وتقنيات مختلفة',
    
    // Certificates (Arabic)
    certificatesTitle: 'الشهادات',
    certificatesDescription: 'الشهادات المهنية والإنجازات',
    
    // Blog (Arabic)
    blogTitle: 'المدونة والمقالات',
    blogDescription: 'أفكار ودروس ورؤى من رحلتي في التطوير',
    
    // Contact (Arabic)
    contactTitle: 'تواصل معي',
    contactDescription: 'مستعد لبدء مشروعك القادم؟ دعنا نناقش كيف يمكننا العمل معاً',
    messageMe: 'راسلني على واتساب',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored && (stored === 'en' || stored === 'ar')) {
      setLanguage(stored as 'en' | 'ar');
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}