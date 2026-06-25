import { Scissors, Instagram, Facebook, Youtube, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_HOURS } from '../data/staticData';

interface FooterProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ currentLang, onNavigate }: FooterProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-[#D4AF37]/20 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/5 pb-12 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="p-1.5 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/30">
                <Scissors className="h-4.5 w-4.5 text-[#D4AF37]" />
              </div>
              <span className="font-serif font-normal tracking-[0.2em] text-white text-base">
                GOLD <span className="text-[#D4AF37]">&</span> BLADE
              </span>
            </div>
            <p className="text-xs text-[#D1D5DB]/50 leading-relaxed font-light">
              {currentLang === 'en'
                ? 'An elite sanctuary of grooming mastery blending traditional scissor precision with high-end modern styling.'
                : 'Un santuario de maestría en diseño que fusiona la precisión clásica con el estilismo de alta gama moderno.'}
            </p>
            {/* Social handles */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37] rounded-none text-white/60 hover:text-[#D4AF37] transition-all">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37] rounded-none text-white/60 hover:text-[#D4AF37] transition-all">
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37] rounded-none text-white/60 hover:text-[#D4AF37] transition-all">
                <Youtube className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-serif tracking-[0.2em] text-white font-normal border-l border-[#D4AF37] pl-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#D1D5DB]/60">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  {t.services}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  {t.haircuts}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  {t.aboutUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Business Hours */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-serif tracking-[0.2em] text-white font-normal border-l border-[#D4AF37] pl-3">
              {t.businessHoursTitle}
            </h4>
            <ul className="space-y-2 text-[10px] font-mono text-[#D1D5DB]/50">
              {Object.entries(BUSINESS_HOURS).slice(0, 5).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span>{day}:</span>
                  <span className="text-white/70 font-light">{hours}</span>
                </li>
              ))}
              <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                <span>Weekend Sat:</span>
                <span className="text-[#D4AF37] font-semibold">{BUSINESS_HOURS.Saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Weekend Sun:</span>
                <span className="text-[#D4AF37] font-semibold">{BUSINESS_HOURS.Sunday}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-serif tracking-[0.2em] text-white font-normal border-l border-[#D4AF37] pl-3">
              Flagship Lounge
            </h4>
            <ul className="space-y-3 text-xs text-[#D1D5DB]/60 font-light">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Ave. Winston Churchill, Blue Mall, Santo Domingo</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono font-semibold text-white/90">+1 (849) 453-0811</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono">concierge@goldandblade.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copywrite details */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/30 gap-4">
          <p>© 2026 Gold & Blade Salon & Barbershop. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-[#D4AF37]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#D4AF37]">Terms of VIP Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
