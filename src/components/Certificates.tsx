import React from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Certificates() {
  const { t } = useLanguage();

  const certificates = [
    {
      id: 1,
      title: 'HTML & CSS Fundamentals',
      issuer: 'FreeCodeCamp',
      date: '2024',
      description: 'Comprehensive course covering HTML5 and CSS3 fundamentals',
      color: 'from-orange-500 to-red-500',
      icon: '🏆',
      verified: true
    },
    {
      id: 2,
      title: 'JavaScript Algorithms',
      issuer: 'Coursera',
      date: '2024',
      description: 'Advanced JavaScript programming and algorithm design',
      color: 'from-yellow-500 to-orange-500',
      icon: '⭐',
      verified: true
    },
    {
      id: 3,
      title: 'React Development',
      issuer: 'Udemy',
      date: '2024',
      description: 'Modern React development with hooks and context',
      color: 'from-blue-500 to-cyan-500',
      icon: '🎯',
      verified: true
    },
    {
      id: 4,
      title: 'Frontend Web Development',
      issuer: 'edX',
      date: '2024',
      description: 'Complete frontend development specialization',
      color: 'from-purple-500 to-pink-500',
      icon: '🚀',
      verified: true
    }
  ];

  return (
    <section id="certificates" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            {t('certificatesTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('certificatesDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${cert.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{cert.icon}</div>
                  {cert.verified && (
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Verified
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <div className="flex items-center text-white/80">
                  <Award className="w-4 h-4 mr-2" />
                  <span>{cert.issuer}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {cert.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{cert.date}</span>
                  </div>
                  
                  <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                    <span className="mr-2">View Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 p-8 rounded-2xl text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Learning Progress</h3>
            <p className="text-blue-100">Tracking my continuous learning journey in web development</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-3xl font-bold mb-2">HTML5</div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="text-sm text-blue-100">Advanced</div>
            </div>
            
            <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-3xl font-bold mb-2">CSS3</div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <div className="text-sm text-blue-100">Advanced</div>
            </div>
            
            <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-3xl font-bold mb-2">JavaScript</div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-sm text-blue-100">Intermediate+</div>
            </div>
            
            <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-3xl font-bold mb-2">React</div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="text-sm text-blue-100">Intermediate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}