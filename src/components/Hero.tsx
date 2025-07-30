import React from 'react';
import { ArrowDown, Github,  Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent animate-gradient leading-tight">
                {t('welcomeMessage')}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                {t('heroSubtitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                {t('heroDescription')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Old</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-red-600">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-purple-600">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-green-600">4+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Certificates</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-red-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg">
                {t('viewMyWork')}
              </button>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <a href="https://github.com/mohamedemad-10" className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </a>

                <a href="mailto:mohamedemad.front@gmail.com" className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
                  <Mail className="w-6 h-6 text-red-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated Background Circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-red-400 opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-red-400 to-blue-400 opacity-30 animate-pulse-slow"></div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500 to-red-500 opacity-40 animate-spin-slow"></div>
              
              {/* Profile Image Placeholder */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center shadow-2xl">
                <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-inner">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    ME
                  </div>
                </div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg animate-float">
                <span className="text-2xl">⚛️</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg animate-float-delayed">
                <span className="text-2xl">🌐</span>
              </div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
    </section>
  );
}