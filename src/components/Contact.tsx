import React from 'react';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = '+201558042651';
    const message = 'Hello Mohamed! I saw your portfolio and would like to discuss a project.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Phone</div>
                    <div className="text-gray-600 dark:text-gray-400">+20 1558042651</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Email</div>
                    <div className="text-gray-600 dark:text-gray-400">mohamedemad.front@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Location</div>
                    <div className="text-gray-600 dark:text-gray-400">Qwesna, Ibnahs, Egypt</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-3 font-semibold text-lg shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>{t('messageMe')}</span>
                </button>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold">🚀</div>
                  <div className="text-sm">Fast Response</div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold">⚽</div>
                  <div className="text-sm">Barcelona Fan</div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold">📱</div>
                  <div className="text-sm">Mobile First</div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold">🎯</div>
                  <div className="text-sm">Goal Oriented</div>
                </div>
              </div>
            </div>
          </div>

          {/* FC Barcelona Fan Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-800 to-red-800 p-8 rounded-2xl text-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">⚽</div>
                <h3 className="text-3xl font-bold mb-4">FC Barcelona Fan</h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Passionate supporter of Barcelona's philosophy of beautiful football. 
                  Just like Barça's tiki-taka, I believe in creating elegant, 
                  well-structured code that flows seamlessly.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Favorite Player</span>
                    <span className="text-yellow-300">Lionel Messi 🐐</span>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Dream</span>
                    <span className="text-yellow-300">Visit Camp Nou 🏟️</span>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Motto</span>
                    <span className="text-yellow-300">Més que un club 💙❤️</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="text-sm text-blue-100">
                  "Football is like coding - it's about passion, precision, and teamwork"
                </div>
                <div className="text-xs text-blue-200 mt-2">- Mohamed Emad</div>
              </div>
            </div>

            {/* Floating Football */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-2xl">⚽</span>
            </div>
          </div>
        </div>

        {/* Follow Me Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Follow Me</h3>
          <div className="flex justify-center space-x-6">
          
            <a
              href="https://github.com/mohamedemad-10"
              className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors transform hover:scale-110"
              title="GitHub"
            >
              <span className="text-xl">⚡</span>
            </a>
            <a
              href="mailto:mohamedemad.front@gmail.com"
              className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors transform hover:scale-110"
              title="Email"
            >
             <span className="text-xl">📧</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}