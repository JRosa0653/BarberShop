import { Shield, Sparkles, HeartHandshake, Compass } from 'lucide-react';
import { Barber, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
  barbers: Barber[];
}

export default function AboutSection({ currentLang, barbers }: AboutSectionProps) {
  const t = TRANSLATIONS[currentLang];

  const interiorPhotos = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?fm=webp&fit=crop&q=75&w=500',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=webp&fit=crop&q=75&w=500',
  ];

  const coreValues = [
    {
      icon: <Shield className="h-6 w-6 text-[#D4AF37]" />,
      title: currentLang === 'en' ? 'Absolute Integrity' : 'Integridad Absoluta',
      desc: currentLang === 'en' ? 'We use top-shelf organic formulas, premium sanitized cutlery and complete transparency.' : 'Fórmulas orgánicas premium, herramientas esterilizadas y total transparencia.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#D4AF37]" />,
      title: currentLang === 'en' ? 'Styling Innovation' : 'Innovación en Estilo',
      desc: currentLang === 'en' ? 'Our master team receives continuous global training in modern skin-fade and color contour techniques.' : 'Capacitación global continua en degradados y técnicas de coloración modernas.',
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-[#D4AF37]" />,
      title: currentLang === 'en' ? 'Uncompromising Comfort' : 'Confort Sin Límites',
      desc: currentLang === 'en' ? 'Relax in top-tier luxury recliners, enjoy premium scotch, espresso, and organic tea while we shape your image.' : 'Relájate en sillones reclinables de lujo con café espresso, té o bebidas de cortesía.',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C9A227]/3 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
            {currentLang === 'en' ? 'ABOUT THE LOUNGE' : 'SOBRE EL SALÓN'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            {t.aboutTitle}
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D1D5DB]/60 text-sm sm:text-base leading-relaxed font-light">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Story & Gallery Images row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#D4AF37] flex items-center space-x-2">
              <Compass className="h-5 w-5" />
              <span>{t.ourStoryTitle}</span>
            </h3>
            <p className="text-sm sm:text-base text-[#D1D5DB]/75 leading-relaxed font-light">
              {t.ourStoryText1}
            </p>
            <p className="text-sm sm:text-base text-[#D1D5DB]/75 leading-relaxed font-light">
              {t.ourStoryText2}
            </p>

            {/* Mission & Vision mini-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-xs uppercase font-serif text-[#D4AF37] tracking-widest block mb-2">{t.ourMission}</span>
                <p className="text-xs text-[#D1D5DB]/50 leading-relaxed font-light">{t.ourMissionText}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-serif text-[#D4AF37] tracking-widest block mb-2">{t.ourVision}</span>
                <p className="text-xs text-[#D1D5DB]/50 leading-relaxed font-light">{t.ourVisionText}</p>
              </div>
            </div>
          </div>

          {/* Salon Photos Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-none overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl relative group">
                <img
                  src={interiorPhotos[0]}
                  alt="Gold & Blade Interior Lounge"
                  className="w-full h-full object-cover grayscale contrast-[1.15] hover:grayscale-0 transition-all duration-750"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-300" />
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-none text-center">
                <span className="text-3xl font-serif text-[#D4AF37] block">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 block mt-2 font-mono">{currentLang === 'en' ? 'Sterilized Cutlery' : 'Herramientas Sanitizadas'}</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-[#D4AF37] p-6 rounded-none text-center text-black">
                <span className="text-3xl font-serif block">15+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold block mt-2 font-mono">{currentLang === 'en' ? 'Style Credentials' : 'Certificaciones de Estilo'}</span>
              </div>
              <div className="rounded-none overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl relative group">
                <img
                  src={interiorPhotos[1]}
                  alt="Premium Leather Chairs"
                  className="w-full h-full object-cover grayscale contrast-[1.15] hover:grayscale-0 transition-all duration-750"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Team section */}
        <div className="mb-24">
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-center text-white mb-12">
            {t.theEliteTeam}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                id={`barber-team-card-${barber.id}`}
                className="bg-white/[0.01] border border-white/10 rounded-none p-6 text-center shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-serif text-white group-hover:text-[#D4AF37] transition-colors">
                    {barber.name}
                  </h4>
                  <p className="text-xs text-[#D4AF37] font-mono mt-1 uppercase tracking-wider">
                    {currentLang === 'en' ? barber.role.en : barber.role.es}
                  </p>
                  
                  {/* Rating display */}
                  <div className="flex items-center justify-center space-x-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-[#D4AF37] text-xs">★</span>
                    ))}
                    <span className="text-[10px] font-mono text-white/40 pl-1">({barber.rating})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center mt-5 border-t border-white/5 pt-5">
                  {barber.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[9px] uppercase font-mono tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-none border border-white/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-16">
          {coreValues.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/20 mb-4">
                {val.icon}
              </div>
              <h4 className="font-serif text-white text-base mb-2">{val.title}</h4>
              <p className="text-xs text-[#D1D5DB]/50 leading-relaxed max-w-xs font-light">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
