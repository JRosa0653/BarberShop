import { useState, useEffect } from 'react';
import { Menu, X, Globe, Scissors, Calendar } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ currentLang, setLang, onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'services', label: t.services },
    { id: 'gallery', label: t.haircuts },
    { id: 'about', label: t.aboutUs },
    { id: 'testimonials', label: t.testimonials },
    { id: 'contact', label: t.contact },
    { id: 'admin', label: t.admin },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="nav-brand-logo"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[225deg]">
              <span className="text-[#D4AF37] text-[10px] font-extrabold -rotate-45 block font-sans">G</span>
            </div>
            <div>
              <span className="font-serif font-normal text-xl sm:text-2xl tracking-[0.1em] text-white">
                GOLD <span className="text-[#D4AF37] font-sans font-semibold">&</span> BLADE
              </span>
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#D1D5DB]/40 font-mono -mt-1">Salon & Barbershop</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`desktop-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-[#D4AF37] relative ${
                  activeSection === item.id || (item.id === 'admin' && activeSection === 'admin')
                    ? 'text-[#D4AF37]'
                    : 'text-white/70'
                }`}
              >
                {item.label}
                {(activeSection === item.id || (item.id === 'admin' && activeSection === 'admin')) && (
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#D4AF37]" />
                )}
              </button>
            ))}
          </div>

          {/* Language Toggle & Booking CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Language Selector */}
            <div id="desktop-lang-selector" className="flex items-center space-x-1 border border-white/10 rounded-full px-3 py-1 bg-white/5">
              <Globe className="h-4 w-4 text-[#D4AF37]" />
              <button
                onClick={() => setLang('en')}
                className={`text-xs font-semibold px-1.5 py-0.5 rounded transition-all ${
                  currentLang === 'en' ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`text-xs font-semibold px-1.5 py-0.5 rounded transition-all ${
                  currentLang === 'es' ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>

            {/* Book Now Button */}
            <button
              id="desktop-book-now-cta"
              onClick={() => handleNavClick('booking')}
              className="border border-[#D4AF37] px-6 py-2.5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-semibold"
            >
              {t.bookNow}
            </button>
          </div>

          {/* Mobile menu and language button */}
          <div className="flex items-center lg:hidden space-x-3">
            {/* Mobile Lang Button */}
            <button
              onClick={() => setLang(currentLang === 'en' ? 'es' : 'en')}
              className="p-2 border border-white/10 rounded-full bg-white/5 text-xs font-bold text-[#D4AF37]"
              title="Toggle Language"
            >
              {currentLang.toUpperCase()}
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden absolute top-full left-0 w-full bg-black/95 border-b border-[#D4AF37]/20 backdrop-blur-xl animate-fade-in py-4">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-l-4 border-[#D4AF37]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 px-4">
              <button
                id="mobile-book-now-cta"
                onClick={() => handleNavClick('booking')}
                className="flex items-center justify-center space-x-2 w-full bg-[#D4AF37] hover:bg-[#C9A227] text-black font-bold py-3 rounded-xl transition-all shadow-lg"
              >
                <Calendar className="h-5 w-5" />
                <span>{t.bookAppointment}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
