import React from 'react';
import { Code, Palette, Smartphone, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  const skills = [
    {
      category: 'Languages',
      icon: <Code className="w-8 h-8" />,
      items: [
        { name: 'HTML5', level: 95, color: 'bg-orange-500' },
        { name: 'CSS3', level: 90, color: 'bg-blue-500' },
        { name: 'JavaScript', level: 85, color: 'bg-yellow-500' },
        { name: 'ECMAScript', level: 80, color: 'bg-green-500' }
      ]
    },
    {
      category: 'Frameworks',
      icon: <Globe className="w-8 h-8" />,
      items: [
        { name: 'React.js', level: 80, color: 'bg-cyan-500' },
        { name: 'Bootstrap', level: 90, color: 'bg-purple-500' },
        { name: 'Tailwind CSS', level: 95, color: 'bg-teal-500' }
      ]
    },
    {
      category: 'Design',
      icon: <Palette className="w-8 h-8" />,
      items: [
        { name: 'Responsive Design', level: 90, color: 'bg-indigo-500' },
        { name: 'Color Theory', level: 80, color: 'bg-red-500' }
      ]
    },
    {
      category: 'Development',
      icon: <Smartphone className="w-8 h-8" />,
      items: [
        { name: 'Mobile First', level: 85, color: 'bg-emerald-500' },
        { name: 'Cross-browser', level: 80, color: 'bg-amber-500' },
        { name: 'Performance', level: 75, color: 'bg-violet-500' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            {t('skillsTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('skillsDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center text-white mr-4">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {skillGroup.category}
                </h3>
              </div>

              <div className="space-y-4">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: skill.level + '%',
                          animation: `fillBar 2s ease-out ${skillIndex * 0.2}s forwards`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-red-600 p-8 rounded-2xl text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Learning Progress</h3>
            <p className="text-blue-100">My continuous journey in mastering frontend technologies</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Current Focus</h4>
              <div className="space-y-3">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span>React Advanced Patterns</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span>Backend Integration</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Next Goals</h4>
              <div className="space-y-2">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <span>TypeScript Mastery</span>
                </div>
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <span>Node.js & Express</span>
                </div>
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <span>MongoDB & Database Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}