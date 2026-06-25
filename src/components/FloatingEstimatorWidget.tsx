import { useState, useEffect } from 'react';
import { Calculator, X, Clock, Plus, Minus, Scissors, ShieldCheck, ChevronRight } from 'lucide-react';
import { Service, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FloatingEstimatorWidgetProps {
  currentLang: Language;
  services: Service[];
  selectedServiceIds: string[];
  toggleServiceSelection: (serviceId: string) => void;
  onProceedToBooking: () => void;
}

export default function FloatingEstimatorWidget({
  currentLang,
  services,
  selectedServiceIds,
  toggleServiceSelection,
  onProceedToBooking,
}: FloatingEstimatorWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'selected' | 'add'>('selected');
  const t = TRANSLATIONS[currentLang];

  // Live calculations
  const selectedServices = services.filter((s) => selectedServiceIds.includes(s.id));
  const basePrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const hasDiscount = selectedServices.length >= 3;
  const discountAmount = hasDiscount ? basePrice * 0.1 : 0;
  const finalPrice = basePrice - discountAmount;

  // Group services by category for quick-add list
  const categories = Array.from(new Set(services.map((s) => s.category)));

  const handleBook = () => {
    setIsOpen(false);
    onProceedToBooking();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="floating-estimator-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 group flex items-center justify-center bg-black border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title={currentLang === 'en' ? 'Open Price Estimator' : 'Abrir Estimador de Precios'}
      >
        <Calculator className="h-6 w-6 stroke-[2]" />
        
        {/* Selection Badge Count */}
        {selectedServiceIds.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border border-black animate-pulse">
            {selectedServiceIds.length}
          </span>
        )}

        {/* Expandable Label */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-[10px] font-bold uppercase tracking-wider font-mono whitespace-nowrap block pl-0 group-hover:pl-2">
          {currentLang === 'en' ? 'Price Estimator' : 'Cotizador'}
        </span>
      </button>

      {/* Floating Drawer Panel */}
      {isOpen && (
        <div
          id="floating-estimator-panel"
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-48px)] sm:w-[420px] max-h-[80vh] bg-[#050505]/95 border border-[#D4AF37]/30 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-[#D4AF37]" />
              <h3 className="font-serif font-normal text-white text-base tracking-wide">
                {currentLang === 'en' ? 'Elite Price Estimator' : 'Cotizador de Servicios'}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 bg-black/40 text-xs">
            <button
              onClick={() => setActiveTab('selected')}
              className={`flex-1 py-3 text-center uppercase tracking-wider font-mono border-b ${
                activeTab === 'selected'
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              {currentLang === 'en' ? `Selected (${selectedServiceIds.length})` : `Seleccionados (${selectedServiceIds.length})`}
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-3 text-center uppercase tracking-wider font-mono border-b ${
                activeTab === 'add'
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              {currentLang === 'en' ? 'Quick Add +' : 'Agregar Servicios +'}
            </button>
          </div>

          {/* Panel Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[40vh] scrollbar-thin scrollbar-thumb-white/10">
            {activeTab === 'selected' ? (
              selectedServices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-[#D1D5DB]/40 font-mono italic">
                    {currentLang === 'en' ? 'No premium services selected yet.' : 'Ningún servicio premium seleccionado aún.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="mt-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline"
                  >
                    {currentLang === 'en' ? 'Browse & Add Services →' : 'Ver y agregar servicios →'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedServices.map((s, index) => (
                    <div
                      key={s.id}
                      className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 hover:border-[#D4AF37]/30 transition-colors"
                    >
                      <div>
                        <p className="text-[8px] text-gray-500 uppercase tracking-widest font-mono">0{index + 1}. {s.category}</p>
                        <h4 className="text-sm font-serif text-white">{currentLang === 'en' ? s.name.en : s.name.es}</h4>
                        <p className="text-[10px] text-gray-400 font-mono">{s.duration} Min</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-[#D4AF37] font-serif text-sm">RD$ {s.price}</span>
                        <button
                          onClick={() => toggleServiceSelection(s.id)}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              /* Quick Add Service list grouped by categories */
              <div className="space-y-6">
                {categories.map((cat) => {
                  const catServices = services.filter((s) => s.category === cat);
                  return (
                    <div key={cat} className="space-y-2">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono block border-b border-white/5 pb-1">
                        {cat}
                      </span>
                      <div className="space-y-1.5">
                        {catServices.map((s) => {
                          const isSelected = selectedServiceIds.includes(s.id);
                          return (
                            <div
                              key={s.id}
                              onClick={() => toggleServiceSelection(s.id)}
                              className={`flex justify-between items-center p-2.5 border text-xs cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-white/10 border-[#D4AF37]/50'
                                  : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <p className="font-serif text-white truncate">{currentLang === 'en' ? s.name.en : s.name.es}</p>
                                <p className="text-[10px] text-gray-500 font-mono">{s.duration} mins</p>
                              </div>
                              <div className="flex items-center space-x-2 shrink-0">
                                <span className="text-[#D4AF37] font-mono font-medium">RD$ {s.price}</span>
                                <div className={`h-4.5 w-4.5 border flex items-center justify-center ${isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/30 text-transparent'}`}>
                                  <Plus className="h-3 w-3 stroke-[3]" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Summary Area */}
          <div className="p-5 border-t border-white/10 bg-black space-y-4">
            {selectedServiceIds.length > 0 && (
              <div className="space-y-2 font-mono text-xs border-b border-white/5 pb-3">
                {/* 10% discount dynamic banner */}
                {selectedServiceIds.length >= 3 ? (
                  <div className="flex items-start space-x-2 bg-green-950/20 border border-green-500/20 p-2 text-green-400 mb-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-green-400" />
                    <div className="text-[10px]">
                      <span className="font-bold block uppercase tracking-wider">{t.packageDiscount} (10% OFF)</span>
                      <span>{t.saving}: <strong>RD$ {discountAmount.toFixed(2)}</strong></span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-[#D1D5DB]/40 uppercase tracking-wider flex justify-between bg-white/5 p-2 mb-2 border border-white/5">
                    <span>{currentLang === 'en' ? 'Add 3+ for 10% discount' : 'Suma 3+ para 10% desc.'}</span>
                    <span className="font-bold text-[#D4AF37]">{selectedServiceIds.length}/3</span>
                  </div>
                )}

                <div className="flex justify-between text-white/40">
                  <span>SUBTOTAL:</span>
                  <span>RD$ {basePrice.toFixed(2)}</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-green-400">
                    <span>DESCUENTO:</span>
                    <span>-RD$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/40">
                  <span>{currentLang === 'en' ? 'DURATION:' : 'DURACIÓN:'}</span>
                  <span className="text-white">{totalDuration} Mins</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-white font-serif text-sm">TOTAL ESTIMADO:</span>
                  <span className="text-lg font-serif text-[#D4AF37]">RD$ {finalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="py-3 border border-white/20 hover:border-white/40 text-white font-bold text-[10px] tracking-wider uppercase rounded-none transition-colors cursor-pointer"
              >
                {currentLang === 'en' ? 'Minimize' : 'Minimizar'}
              </button>
              <button
                disabled={selectedServiceIds.length === 0}
                onClick={handleBook}
                className={`py-3 font-bold text-[10px] tracking-wider uppercase rounded-none transition-colors flex items-center justify-center space-x-1.5 ${
                  selectedServiceIds.length > 0
                    ? 'bg-[#D4AF37] text-black hover:bg-white cursor-pointer'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                <span>{currentLang === 'en' ? 'Book Now' : 'Reservar'}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
