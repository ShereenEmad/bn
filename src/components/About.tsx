import React from 'react';
import { MapPin, GraduationCap, Heart, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <Star className="w-6 h-6 mr-3 text-yellow-500" />
                {t('personalInfo')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">👤</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{t('name')}</div>
                    <div className="text-gray-600 dark:text-gray-400">Mohamed Emad</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold">🎂</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{t('age')}</div>
                    <div className="text-gray-600 dark:text-gray-400">15 Years Old</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{t('location')}</div>
                    <div className="text-gray-600 dark:text-gray-400">Qwesna, Ibnahs, Egypt</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{t('education')}</div>
                    <div className="text-gray-600 dark:text-gray-400">First Secondary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <Heart className="w-6 h-6 mr-3 text-red-500" />
                {t('favorites')}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white mb-2">{t('players')}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                      Johan Cruyff
                    </span>
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm">
                      Lionel Messi
                    </span>
                    <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                      Pedri
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white mb-2">{t('shows')}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                      Game of Thrones
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                      La Casa de Papel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Overview */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-red-600 p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-semibold">HTML5</div>
                  <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-semibold">CSS3</div>
                  <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-semibold">Bootstrap</div>
                  <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-semibold">Tailwind CSS
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-semibold">JavaScript</div>
                  <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-semibold">React.js</div>
                  <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* FC Barcelona Fan Card */}
            <div className="bg-gradient-to-r from-blue-800 to-red-800 p-8 rounded-2xl text-white shadow-xl">
              <div className="text-center">
                <div className="text-6xl mb-4">⚽</div>
                <h3 className="text-2xl font-bold mb-2">FC Barcelona Fan</h3>
                <p className="text-blue-100">
                  Passionate supporter of Barcelona's philosophy and beautiful football
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="bg-white/20 px-4 py-2 rounded-full">
                    <span className="text-sm">Favorite player: Messi</span>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-full">
                    <span className="text-sm">Dream: Watch at Camp Nou</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}