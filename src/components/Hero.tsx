import { Calendar, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ currentLang, onNavigate }: HeroProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20"
    >
      {/* Background Image — responsive srcset, eager for LCP */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=webp&fit=crop&q=80&w=900"
          srcSet="
            https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=webp&fit=crop&q=75&w=640  640w,
            https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=webp&fit=crop&q=75&w=900  900w,
            https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=webp&fit=crop&q=80&w=1400 1400w
          "
          sizes="100vw"
          alt="Gold & Blade Luxury Barber Salon"
          className="w-full h-full object-cover opacity-40"
          style={{ filter: 'saturate(0.8) contrast(1.1)', transform: 'scale(1.05)' }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black z-10" />
      </div>

      {/* Gold decorative glows — CSS only, no JS needed */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '-100px', right: '-100px', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', borderRadius: '50%' }}
      />

      {/* Hero Content — CSS animations, no motion library */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16">

        {/* Badge */}
        <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block font-mono hero-fade-in">
          {currentLang === 'en'
            ? 'ESTABLISHED 2026 • SANTO DOMINGO • BLUE MALL'
            : 'ESTABLECIDO 2026 • SANTO DOMINGO • BLUE MALL'}
        </span>

        {/* Heading */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-white mb-8 font-normal tracking-tight">
          <span className="block text-[#D4AF37] hero-slide-up" style={{ animationDelay: '0.1s' }}>
            {currentLang === 'en' ? 'Mastery' : 'Maestría'}
          </span>
          <span className="block italic font-light opacity-90 mt-1 hero-slide-up" style={{ animationDelay: '0.25s' }}>
            {currentLang === 'en' ? 'of Style' : 'en Estilo'}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-md mx-auto text-sm sm:text-base text-gray-400 leading-relaxed mb-10 font-light hero-fade-in"
          style={{ animationDelay: '0.4s' }}>
          {t.heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20 hero-fade-in"
          style={{ animationDelay: '0.55s' }}>
          <button
            id="hero-book-now-btn"
            onClick={() => onNavigate('booking')}
            className="w-full sm:w-auto bg-[#D4AF37] text-black hover:bg-[#C9A227] transition-colors duration-200 font-bold uppercase tracking-[0.2em] text-xs px-10 py-4 cursor-pointer"
          >
            {t.bookAppointment}
          </button>
          <button
            id="hero-explore-services-btn"
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto border border-white/20 hover:border-[#D4AF37] text-white hover:bg-white/5 transition-colors duration-200 uppercase tracking-[0.2em] text-xs px-10 py-4 cursor-pointer"
          >
            {t.exploreServices}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 border-l border-white/20 pl-8 py-2 max-w-xl mx-auto hero-fade-in"
          style={{ animationDelay: '0.7s' }}>
          <div className="text-left w-full sm:w-auto">
            <div className="text-3xl font-serif text-[#D4AF37] font-medium">10+</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{t.yearsExperience}</div>
          </div>
          <div className="text-left w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
            <div className="text-3xl font-serif text-[#D4AF37] font-medium">3 Elite</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{t.licensedStaff}</div>
          </div>
          <div className="text-left w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
            <div className="text-3xl font-serif text-[#D4AF37] font-medium">4.9 / 5</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{t.fiveStarReviews}</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
