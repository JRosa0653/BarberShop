import { useState } from 'react';
import { Sparkles, Clock, DollarSign, Instagram, Calendar } from 'lucide-react';
import { GalleryItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface GallerySectionProps {
  currentLang: Language;
  galleryItems: GalleryItem[];
  onNavigate?: (sectionId: string) => void;
}

export default function GallerySection({ currentLang, galleryItems, onNavigate }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = TRANSLATIONS[currentLang];

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'Fade', label: t.categories.fade },
    { id: 'Textured Crop', label: t.categories.textured_crop },
    { id: 'Pompadour', label: t.categories.pompadour },
    { id: 'Classic Cuts', label: t.categories.classic_cuts },
    { id: 'Beard Styles', label: t.categories.beard_styles }
  ];

  // Filter gallery items
  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="relative py-24 bg-black border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#D4AF37]/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#C9A227]/3 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
            {currentLang === 'en' ? 'OUR STYLING DICTIONARY' : 'NUESTRO DICCIONARIO DE ESTILOS'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            {currentLang === 'en' ? 'Luxury Lookbook & Details' : 'Catálogo de Estilos de Lujo'}
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D1D5DB]/60 text-sm sm:text-base font-light">
            {currentLang === 'en'
              ? 'Explore custom specifications, specialized cutting techniques, and maintenance guidelines for our signature looks.'
              : 'Explore especificaciones personalizadas, técnicas de corte especializadas y pautas de mantenimiento de nuestros estilos.'}
          </p>
        </div>

        {/* Categories Tab Filters */}
        <div id="gallery-categories-filters" className="flex items-center justify-start lg:justify-center overflow-x-auto space-x-2 pb-6 mb-12 scrollbar-none border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-white/5 text-white/80 border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Typographic Style Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const desc = item.description?.[currentLang] || (currentLang === 'en' ? 'Bespoke precision styling' : 'Estilismo de precisión personalizado');
            return (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                className="group relative bg-white/[0.01] border border-white/10 hover:border-[#D4AF37]/40 p-8 flex flex-col justify-between transition-all duration-500 shadow-2xl min-h-[300px]"
              >
                {/* Subtle top accents */}
                <div className="absolute top-0 left-0 w-2 h-[2px] bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
                
                <div>
                  {/* Category & Header */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#D4AF37]">
                      {item.category}
                    </span>
                    <Sparkles className="h-4 w-4 text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                  </div>

                  <h3 className="font-serif font-normal text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-4">
                    {item.title}
                  </h3>

                  <p className="text-[#D1D5DB]/60 text-xs sm:text-sm leading-relaxed font-light mb-6">
                    {desc}
                  </p>
                </div>

                {/* Pricing & Duration info footer */}
                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[11px] font-mono text-[#D1D5DB]/50">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-[#D1D5DB]/30 tracking-wider mb-0.5">{t.estimatedPrice}</span>
                    <span className="text-sm font-semibold text-[#D4AF37] font-mono">RD$ {item.estimatedPrice.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] uppercase text-[#D1D5DB]/30 tracking-wider mb-0.5">
                      {currentLang === 'en' ? 'Duration' : 'Duración'}
                    </span>
                    <span className="text-sm font-semibold text-white font-mono">{item.estimatedDuration} {t.durationMinutes || 'min'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Banner */}
        <div className="mt-16 bg-white/[0.01] border border-white/10 rounded-none p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/3 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center space-x-4 relative z-10">
            <div className="p-4 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/20 text-[#D4AF37]">
              <Instagram className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-normal text-white mb-2">
                {currentLang === 'en' ? 'Our Digital Lookbook on Instagram' : 'Nuestro Catálogo Digital en Instagram'}
              </h4>
              <p className="text-xs text-[#D1D5DB]/50 max-w-lg leading-relaxed font-light">
                {currentLang === 'en'
                  ? 'Follow us @GoldAndBlade for weekly style updates, before-and-after reels, and live Dominican masterclasses.'
                  : 'Síguenos en @GoldAndBlade para ver actualizaciones de estilo, carretes de antes y después, y clases magistrales en vivo.'}
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-white hover:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-none transition-all duration-300 whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" />
            <span>{currentLang === 'en' ? 'Follow Lookbook' : 'Seguir Catálogo'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
