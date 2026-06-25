import { useState } from 'react';
import { Sparkles, Clock, Check, Plus, Minus, ShieldCheck, ChevronRight } from 'lucide-react';
import { Service, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ServicesSectionProps {
  currentLang: Language;
  services: Service[];
  selectedServiceIds: string[];
  toggleServiceSelection: (serviceId: string) => void;
  onProceedToBooking: () => void;
}

export default function ServicesSection({
  currentLang,
  services,
  selectedServiceIds,
  toggleServiceSelection,
  onProceedToBooking
}: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const t = TRANSLATIONS[currentLang];

  // Derive unique categories from available services
  const categories = ['All', 'Haircuts', 'Beard Grooming', 'Hair Coloring', 'Hair Treatments', "Women's Hair Services", 'Kids Haircuts', 'Premium Packages'];

  // Filter services by active category
  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  // Live Estimator Calculations
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const basePrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  
  // Apply 10% discount if 3 or more services are selected
  const hasDiscount = selectedServices.length >= 3;
  const discountAmount = hasDiscount ? basePrice * 0.1 : 0;
  const finalPrice = basePrice - discountAmount;

  return (
    <section id="services" className="relative py-24 bg-black border-t border-white/5">
      {/* Background Ornaments */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#C9A227]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
            {currentLang === 'en' ? 'EXCLUSIVE BARBERING & STYLING' : 'BARBERÍA Y ESTILISMO EXCLUSIVO'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            {t.servicesTitle}
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D1D5DB]/60 text-sm sm:text-base leading-relaxed font-light">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Categories Scroller Tabs */}
        <div id="service-categories-tabs" className="flex items-center justify-start lg:justify-center overflow-x-auto space-x-2 pb-6 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-bold whitespace-nowrap border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-[#D4AF37]/40 hover:text-white'
              }`}
            >
              {cat === 'All' ? (currentLang === 'en' ? 'All Services' : 'Todos') : cat}
            </button>
          ))}
        </div>

        {/* Split Grid: Services on Left (or main), Interactive Price Estimator on Right (Sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Services Roster */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => {
                const isSelected = selectedServiceIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    className={`relative p-6 rounded-none border transition-all duration-300 group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white/5 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/5'
                        : 'bg-white/[0.01] hover:bg-white/[0.03] border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div>
                      {/* Title & Badge */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-serif text-lg text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                          {currentLang === 'en' ? service.name.en : service.name.es}
                        </h3>
                        {service.isPopular && (
                          <span className="flex items-center space-x-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] uppercase font-mono px-2 py-0.5 rounded-none shrink-0">
                            <Sparkles className="h-2.5 w-2.5" />
                            <span>{t.popular}</span>
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#D1D5DB]/50 line-clamp-2 mb-4 font-light">
                        {currentLang === 'en' ? service.description.en : service.description.es}
                      </p>
                    </div>

                    {/* Footer Row (Price, Duration & Action Button) */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-serif text-[#D4AF37]">RD$ {service.price}</span>
                        <span className="text-[11px] text-[#D1D5DB]/40 flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3" />
                          {service.duration} {t.durationMinutes}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleServiceSelection(service.id)}
                        className={`flex items-center justify-center p-2 rounded-none transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-white/5 border border-white/10 hover:border-[#D4AF37] text-white/80 hover:text-white'
                        }`}
                        title={isSelected ? "Remove service" : "Select service"}
                      >
                        {isSelected ? <Minus className="h-4 w-4 stroke-[3]" /> : <Plus className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Luxury Interactive Estimator Widget */}
          <div className="lg:sticky lg:top-28">
            <div
              id="live-price-estimator-widget"
              className="relative p-6 sm:p-8 rounded-none bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col"
            >
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#D4AF37] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl font-serif mb-4 flex justify-between items-center text-white border-b border-white/10 pb-4">
                {t.priceEstimatorTitle}
                <span className="text-[10px] font-sans tracking-widest text-green-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {currentLang === 'en' ? 'OPEN NOW' : 'ABIERTO'}
                </span>
              </h3>

              <p className="text-xs text-[#D1D5DB]/60 leading-relaxed mb-6 font-light">
                {t.priceEstimatorDesc}
              </p>

              {/* Selected Services Listing */}
              <div className="flex-1 min-h-[140px] max-h-[220px] overflow-y-auto mb-6 pr-2 space-y-3 border-b border-white/5 pb-4 scrollbar-thin scrollbar-thumb-white/10">
                {selectedServices.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-6">
                    <p className="text-xs text-[#D1D5DB]/40 font-mono italic">
                      {currentLang === 'en' ? 'No premium services selected yet.' : 'Ningún servicio premium seleccionado aún.'}
                    </p>
                    <p className="text-[11px] text-[#D4AF37]/50 mt-1 uppercase tracking-wider font-mono">
                      {currentLang === 'en' ? 'Select options to build look' : 'Selecciona opciones para estimar'}
                    </p>
                  </div>
                ) : (
                  selectedServices.map((s, index) => (
                    <div key={s.id} className="group cursor-pointer">
                      <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-[#D4AF37] transition-colors duration-200">
                        <div className="truncate pr-2">
                          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-mono">0{index + 1}. {s.category}</p>
                          <p className="font-medium text-white text-sm truncate">{currentLang === 'en' ? s.name.en : s.name.es}</p>
                        </div>
                        <div className="text-right shrink-0 flex items-end space-x-2">
                          <div>
                            <p className="text-[10px] text-gray-500 font-mono">{s.duration} Min</p>
                            <p className="text-[#D4AF37] font-serif text-sm">RD$ {s.price}</p>
                          </div>
                          <button
                            onClick={() => toggleServiceSelection(s.id)}
                            className="text-white/40 hover:text-red-400 p-1 cursor-pointer transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Package discount notification if applicable */}
              {selectedServices.length > 0 && (
                <div className="mb-6">
                  {selectedServices.length >= 3 ? (
                    <div className="flex items-start space-x-2 bg-green-950/20 border border-green-500/20 p-3 rounded-none text-green-400">
                      <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-green-400" />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider block">{t.packageDiscount}</span>
                        <span className="text-[10px] text-green-400/80">{t.saving}: <strong className="font-mono">RD$ {discountAmount.toFixed(2)}</strong></span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/5 p-3 rounded-none text-[10px] text-[#D1D5DB]/50 uppercase tracking-wider flex items-center justify-between">
                      <span>{currentLang === 'en' ? 'Add 3+ for 10% discount' : 'Suma 3+ para 10% desc.'}</span>
                      <span className="font-bold text-[#D4AF37] font-mono">{selectedServices.length}/3</span>
                    </div>
                  )}
                </div>
              )}

              {/* Total Calculation Display */}
              <div className="space-y-2 mb-6 font-mono text-xs border-b border-white/5 pb-4">
                <div className="flex justify-between text-[#D1D5DB]/40">
                  <span>SUBTOTAL:</span>
                  <span>RD$ {basePrice.toFixed(2)}</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-green-400">
                    <span>DISCOUNT:</span>
                    <span>-RD$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#D1D5DB]/40">
                  <span>ESTIMATED DURATION:</span>
                  <span className="text-white">{totalDuration} Mins</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-white font-serif text-sm">TOTAL ESTIMATE:</span>
                  <span className="text-xl sm:text-2xl font-serif text-[#D4AF37]">RD$ {finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Interactive Booking Action CTA */}
              <button
                id="estimator-proceed-booking-btn"
                disabled={selectedServices.length === 0}
                onClick={onProceedToBooking}
                className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  selectedServices.length > 0
                    ? 'bg-[#D4AF37] text-black hover:bg-[#C9A227] cursor-pointer'
                    : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                {t.proceedBooking}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
