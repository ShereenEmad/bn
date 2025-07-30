import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'certificates', href: '#certificates' },
    { key: 'blog', href: '#blog' },
    { key: 'contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: '⚡', href: 'https://github.com/mohamedemad-10' },
    { name: 'Email', icon: '📧', href: 'mailto:mohamedemad.front@gmail.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ME
              </div>
              <div>
                <h3 className="text-xl font-bold">Mohamed Emad</h3>
                <p className="text-gray-400 text-sm">Frontend Developer</p>
              </div>
            </div>
            <p className="text-gray-400">
              15-year-old passionate developer from Egypt, creating beautiful web experiences 
              and dreaming of becoming a professional engineer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Technologies</h4>
            <div className="space-y-2 text-gray-400">
              <div>HTML5 & CSS3</div>
              <div>JavaScript & ES6+</div>
              <div>React.js</div>
              <div>Tailwind CSS</div>
              <div>Bootstrap</div>
              <div>Responsive Design</div>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-4">
              <div className="text-gray-400">
                <div>Qwesna, Ibnahs, Egypt</div>
                <div>mohamedemad.front@gmail.com</div>
                <div>+20 1558042651</div>
              </div>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 transition-all transform hover:scale-110"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400">
            <span>© 2025 Mohamed Emad. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and React.js</span>
          </div>

          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚽</span>
              <span>FC Barcelona Fan</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 hover:text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Barcelona Colors Bar */}
        <div className="mt-8 h-1 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 rounded-full"></div>
      </div>
    </footer>
  );
}