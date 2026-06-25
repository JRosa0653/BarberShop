import { useState } from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { Testimonial, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TestimonialsSectionProps {
  currentLang: Language;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ currentLang, testimonials }: TestimonialsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'google' | 'facebook'>('all');
  const t = TRANSLATIONS[currentLang];

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(item => item.source === filter);

  return (
    <section id="testimonials" className="relative py-24 bg-black border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-84 h-84 bg-[#D4AF37]/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-84 h-84 bg-[#C9A227]/3 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
            {currentLang === 'en' ? 'GUEST SATISFACTION' : 'SATISFACCIÓN DE NUESTROS INVITADOS'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            {t.testimonialsTitle}
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D1D5DB]/60 text-sm sm:text-base font-light">
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Aggregate rating badge */}
        <div className="bg-white/[0.01] border border-white/10 rounded-none p-6 sm:p-10 max-w-4xl mx-auto mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center space-x-6">
            <div className="text-center md:text-left shrink-0">
              <span className="text-5xl font-serif font-normal text-white block">4.9</span>
              <div className="flex items-center space-x-1 mt-1 justify-center md:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-serif font-normal text-white mb-1">
                {currentLang === 'en' ? 'Verified Google Business Score' : 'Puntuación Verificada Google Business'}
              </h4>
              <p className="text-xs text-[#D1D5DB]/50 font-light">
                {currentLang === 'en'
                  ? 'Based on over 1,240 verified five-star reviews from our esteemed guests in Santo Domingo.'
                  : 'Basado en más de 1,240 reseñas verificadas de cinco estrellas de nuestros huéspedes en Santo Domingo.'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-[#D4AF37]/5 border border-[#D4AF37]/30 px-5 py-3 rounded-none text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest font-bold">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
            <span>100% {currentLang === 'en' ? 'Verified Guests' : 'Invitados Reales'}</span>
          </div>
        </div>

        {/* Written Review Toggles */}
        <div className="flex items-center justify-center space-x-2 mb-12 border-b border-white/5 pb-6">
          <button
            onClick={() => setFilter('all')}
            className={`border px-5 py-2 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              filter === 'all' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                : 'border-transparent text-white/40 hover:text-white hover:border-white/10'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('google')}
            className={`border px-5 py-2 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              filter === 'google' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                : 'border-transparent text-white/40 hover:text-white hover:border-white/10'
            }`}
          >
            Google
          </button>
          <button
            onClick={() => setFilter('facebook')}
            className={`border px-5 py-2 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              filter === 'facebook' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                : 'border-transparent text-white/40 hover:text-white hover:border-white/10'
            }`}
          >
            Facebook
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="relative bg-white/[0.01] border border-white/10 p-6 rounded-none flex flex-col justify-between shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-300 group"
            >
              <Quote className="absolute top-4 right-4 h-12 w-12 text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none" />

              <div>
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#D1D5DB]/75 font-serif italic leading-relaxed mb-6">
                  "{currentLang === 'en' ? item.comment.en : item.comment.es}"
                </p>
              </div>

              {/* User row */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <span className="text-sm font-semibold text-white block">{item.name}</span>
                  <span className="text-[9px] text-white/40 font-mono block">{item.date}</span>
                </div>

                <span className="text-[9px] uppercase font-mono tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-none border border-white/5">
                  {item.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
