import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Clock, User, Scissors, Check, ChevronRight, ChevronLeft, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Service, Barber, Appointment, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BookingSectionProps {
  currentLang: Language;
  services: Service[];
  barbers: Barber[];
  selectedServiceIds: string[];
  toggleServiceSelection: (serviceId: string) => void;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingSection({
  currentLang,
  services,
  barbers,
  selectedServiceIds,
  toggleServiceSelection,
  onBookingSuccess,
}: BookingSectionProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedBarberId, setSelectedBarberId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [recentBooking, setRecentBooking] = useState<Appointment | null>(null);

  const t = TRANSLATIONS[currentLang];

  // Sync step 1 when user clicks "Proceed to Live Booking" with selected services
  useEffect(() => {
    if (selectedServiceIds.length > 0 && step === 1) {
      // Stay on step 1 but highlights selected services
    }
  }, [selectedServiceIds]);

  // Generate next 14 days for Date Picker
  const dateOptions: { value: string; label: string; isSunday: boolean }[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + i);
    const yyyy = futureDate.getFullYear();
    const mm = String(futureDate.getMonth() + 1).padStart(2, '0');
    const dd = String(futureDate.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const dayName = futureDate.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'es-ES', { weekday: 'short' });
    const dayNum = futureDate.getDate();
    const isSunday = futureDate.getDay() === 0;

    dateOptions.push({
      value: dateStr,
      label: `${dayName} ${dayNum}`,
      isSunday,
    });
  }

  // Predefined gorgeous time slots adjusted for operating hours
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM',
    '05:30 PM', '06:30 PM'
  ];

  const sundaySlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:30 PM', '02:30 PM'];

  const getAvailableSlots = () => {
    if (!selectedDate) return [];
    const chosenOption = dateOptions.find(d => d.value === selectedDate);
    return chosenOption?.isSunday ? sundaySlots : timeSlots;
  };

  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const isPackageDiscountApplied = selectedServices.length >= 3;
  const discountAmount = isPackageDiscountApplied ? subtotal * 0.1 : 0;
  const finalPrice = subtotal - discountAmount;

  const handleNextStep = () => {
    if (step === 1 && selectedServiceIds.length === 0) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) return;

    const chosenBarber = barbers.find(b => b.id === selectedBarberId);
    const barberName = chosenBarber ? chosenBarber.name : (currentLang === 'en' ? 'Any Elite Barber / Stylist' : 'Cualquier experto disponible');

    const newAppointment: Appointment = {
      id: 'app-' + Math.random().toString(36).substr(2, 9),
      customerName,
      customerEmail,
      customerPhone,
      services: selectedServiceIds,
      barberId: selectedBarberId,
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      totalPrice: finalPrice,
      totalDuration: totalDuration,
      notes: customerNotes,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage database
    const currentBookingsStr = localStorage.getItem('bookings');
    let currentBookings: Appointment[] = [];
    if (currentBookingsStr) {
      currentBookings = JSON.parse(currentBookingsStr);
    }
    currentBookings.unshift(newAppointment);
    localStorage.setItem('bookings', JSON.stringify(currentBookings));

    setRecentBooking(newAppointment);
    setIsSubmitted(true);
    onBookingSuccess(newAppointment);
  };

  // Prepares the WhatsApp link text
  const getWhatsAppLink = () => {
    if (!recentBooking) return '';
    const chosenBarber = barbers.find(b => b.id === recentBooking.barberId);
    const barberName = chosenBarber ? chosenBarber.name : (currentLang === 'en' ? 'Any Available Stylist' : 'Cualquier Estilista');
    
    const serviceNames = selectedServices
      .map(s => currentLang === 'en' ? s.name.en : s.name.es)
      .join(', ');

    const dateStr = recentBooking.date;
    const timeStr = recentBooking.time;

    const text = currentLang === 'en'
      ? `Hello! I would like to confirm my premium booking at Gold & Blade:\n\n👤 *Client:* ${recentBooking.customerName}\n✂️ *Services:* ${serviceNames}\n💈 *Expert:* ${barberName}\n📅 *Date:* ${dateStr}\n⏰ *Time:* ${timeStr}\n💵 *Total Price:* $${recentBooking.totalPrice.toFixed(2)}\n⏱️ *Duration:* ${recentBooking.totalDuration} mins\n\nThank you!`
      : `¡Hola! Me gustaría confirmar mi reservación premium en Gold & Blade:\n\n👤 *Cliente:* ${recentBooking.customerName}\n✂️ *Servicios:* ${serviceNames}\n💈 *Experto:* ${barberName}\n📅 *Fecha:* ${dateStr}\n⏰ *Hora:* ${timeStr}\n💵 *Precio Total:* $${recentBooking.totalPrice.toFixed(2)}\n⏱️ *Duración:* ${recentBooking.totalDuration} min\n\n¡Muchas gracias!`;

    return `https://wa.me/18494530811?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setStep(1);
    setSelectedBarberId('any');
    setSelectedDate('');
    setSelectedTime('');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerNotes('');
    setIsSubmitted(false);
    setRecentBooking(null);
  };

  return (
    <section id="booking" className="relative py-24 bg-gradient-to-b from-[#0A0A0A] to-black border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
            {currentLang === 'en' ? 'LIVE RESERVATION ENGINE' : 'MOTOR DE RESERVA EN VIVO'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            {t.bookingTitle}
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D1D5DB]/60 text-sm sm:text-base leading-relaxed font-light">
            {t.bookingSubtitle}
          </p>
        </div>

        {/* Dynamic Multi-Step Area */}
        {!isSubmitted ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-none p-6 sm:p-10 shadow-2xl">
            {/* Step Indicators */}
            <div id="booking-steps-nav" className="flex items-center justify-between border-b border-white/15 pb-8 mb-8 overflow-x-auto">
              {[1, 2, 3, 4].map((sNum) => {
                const labels = [t.stepService, t.stepBarber, t.stepDateTime, t.stepDetails];
                return (
                  <div key={sNum} className="flex items-center space-x-2 shrink-0">
                    <div
                      className={`h-7 w-7 rounded-none border flex items-center justify-center text-[10px] font-bold font-mono transition-all duration-300 ${
                        step === sNum
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                          : step > sNum
                          ? 'bg-white/20 border-white/30 text-white'
                          : 'bg-white/5 border border-white/10 text-white/40'
                      }`}
                    >
                      {step > sNum ? <Check className="h-3.5 w-3.5" /> : sNum}
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold hidden sm:inline ${
                        step === sNum ? 'text-[#D4AF37]' : 'text-white/40'
                      }`}
                    >
                      {labels[sNum - 1]}
                    </span>
                    {sNum < 4 && <ChevronRight className="h-3.5 w-3.5 text-white/10 hidden sm:block" />}
                  </div>
                );
              })}
            </div>

            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <div id="booking-step-1" className="space-y-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                  <h3 className="text-lg font-serif text-white flex items-center space-x-2">
                    <Scissors className="h-4 w-4 text-[#D4AF37]" />
                    <span>{t.stepService}</span>
                  </h3>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">
                    {selectedServiceIds.length} {currentLang === 'en' ? 'Selected' : 'Seleccionado(s)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                  {services.map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleServiceSelection(service.id)}
                        className={`p-4 rounded-none border cursor-pointer transition-all duration-300 flex justify-between items-center ${
                          isSelected
                            ? 'bg-white/10 border-[#D4AF37]'
                            : 'bg-white/[0.01] hover:bg-white/[0.03] border-white/10 hover:border-[#D4AF37]/30'
                        }`}
                      >
                        <div className="pr-4 truncate">
                          <span className="font-serif text-sm text-white block truncate">
                            {currentLang === 'en' ? service.name.en : service.name.es}
                          </span>
                          <span className="text-[10px] text-gray-500 flex items-center gap-1 font-mono mt-1">
                            <Clock className="h-3 w-3" />
                            {service.duration} mins
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 shrink-0">
                          <span className="text-sm font-serif text-[#D4AF37]">RD$ {service.price}</span>
                          <div
                            className={`h-4 w-4 rounded-none border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                                : 'border-white/30 text-transparent'
                            }`}
                          >
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-6 border-t border-white/5">
                  <button
                    disabled={selectedServiceIds.length === 0}
                    onClick={handleNextStep}
                    className={`px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
                      selectedServiceIds.length > 0
                        ? 'bg-[#D4AF37] text-black hover:bg-[#C9A227]'
                        : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <span>{t.nextStep}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: STYLIST / BARBER SELECTION */}
            {step === 2 && (
              <div id="booking-step-2" className="space-y-6">
                <h3 className="text-lg font-serif text-white flex items-center space-x-2 mb-4 pb-2 border-b border-white/5">
                  <User className="h-4 w-4 text-[#D4AF37]" />
                  <span>{t.stepBarber}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  {/* Any Stylist Option */}
                  <div
                    onClick={() => setSelectedBarberId('any')}
                    className={`p-5 rounded-none border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center ${
                      selectedBarberId === 'any'
                        ? 'bg-white/10 border-[#D4AF37] shadow-xl'
                        : 'bg-white/[0.01] border-white/10 hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-none bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <span className="font-serif text-sm text-white">{t.anyBarber}</span>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-mono">{currentLang === 'en' ? 'Instant Assignment' : 'Asignación inmediata'}</p>
                  </div>

                  {/* Individual Barbers */}
                  {barbers.map((barber) => (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`p-5 rounded-none border cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                        selectedBarberId === barber.id
                          ? 'bg-white/10 border-[#D4AF37] shadow-xl'
                          : 'bg-white/[0.01] border-white/10 hover:border-[#D4AF37]/30'
                      }`}
                    >
                      <div className="relative mb-4">
                        <div className="h-14 w-14 rounded-none bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-base font-bold select-none">
                          {barber.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {selectedBarberId === barber.id && (
                          <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-black p-0.5 rounded-none border border-black">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="font-serif text-sm text-white">{barber.name}</span>
                      <span className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mt-0.5">
                        {currentLang === 'en' ? barber.role.en : barber.role.es}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-center mt-3">
                        {barber.specialties.slice(0, 2).map(s => (
                          <span key={s} className="bg-white/5 text-[8px] uppercase tracking-wider text-gray-400 px-1.5 py-0.5 rounded-none font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5 mt-8">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3.5 border border-white/10 hover:border-[#D4AF37]/40 text-white rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t.prevStep}</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#C9A227] text-black rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-2 transition-all duration-300 cursor-pointer"
                  >
                    <span>{t.nextStep}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME PICKER */}
            {step === 3 && (
              <div id="booking-step-3" className="space-y-6">
                <h3 className="text-lg font-serif text-white flex items-center space-x-2 mb-4 pb-2 border-b border-white/5">
                  <Calendar className="h-4 w-4 text-[#D4AF37]" />
                  <span>{t.stepDateTime}</span>
                </h3>

                {/* Day selector grids */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
                    {currentLang === 'en' ? 'Select Date' : 'Selecciona Fecha'}
                  </label>
                  <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
                    {dateOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSelectedDate(opt.value);
                          setSelectedTime(''); // Reset selected time when date changes
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-none border min-w-[76px] transition-all duration-300 cursor-pointer ${
                          selectedDate === opt.value
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-white/5 text-white/80 border-white/10 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-wider font-mono">
                          {opt.label.split(' ')[0]}
                        </span>
                        <span className="text-lg font-serif mt-1">
                          {opt.label.split(' ')[1]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time selector grid */}
                {selectedDate && (
                  <div className="space-y-3 pt-4 border-t border-white/5 animate-fade-in">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
                      {currentLang === 'en' ? 'Select Available Time Slot' : 'Selecciona un Horario Disponible'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {getAvailableSlots().map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-none border font-mono text-xs transition-all duration-300 cursor-pointer ${
                            selectedTime === time
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-white/5 text-white/70 border-white/10 hover:border-[#D4AF37]/40'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-white/5 mt-8">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3.5 border border-white/10 hover:border-[#D4AF37]/40 text-white rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t.prevStep}</span>
                  </button>

                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleNextStep}
                    className={`px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
                      selectedDate && selectedTime
                        ? 'bg-[#D4AF37] text-black hover:bg-[#C9A227]'
                        : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <span>{t.nextStep}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CUSTOMER DETAILS & REVIEW */}
            {step === 4 && (
              <form onSubmit={handleSubmitBooking} id="booking-step-4" className="space-y-6">
                <h3 className="text-lg font-serif text-white flex items-center space-x-2 mb-4 pb-2 border-b border-white/5">
                  <User className="h-4 w-4 text-[#D4AF37]" />
                  <span>{t.enterContactInfo}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Form Fields */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-1.5 block">
                        {t.fullName} <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-1.5 block">
                        {t.emailAddress} <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="johndoe@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-all"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-1.5 block">
                        {t.phoneNumber} (WhatsApp) <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 (849) 453-0811"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-all"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-1.5 block">
                        {t.notesLabel}
                      </label>
                      <textarea
                        rows={3}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder={currentLang === 'en' ? 'Special instructions, beard style preference, etc.' : 'Instrucciones especiales, preferencias, etc.'}
                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Right Column: High-End Summary Card */}
                  <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-none flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] border-b border-white/10 pb-3 mb-4 font-sans">
                        {t.bookingSummary}
                      </h4>

                      <ul className="space-y-4">
                        {/* Services List */}
                        <li className="flex items-start space-x-3">
                          <Scissors className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[9px] text-gray-500 block font-mono uppercase tracking-wider">{t.services}</span>
                            <span className="text-sm text-white font-serif font-normal">
                              {selectedServices.map(s => currentLang === 'en' ? s.name.en : s.name.es).join(', ')}
                            </span>
                          </div>
                        </li>

                        {/* Barber */}
                        <li className="flex items-start space-x-3">
                          <User className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[9px] text-gray-500 block font-mono uppercase tracking-wider">{t.selectedBarber}</span>
                            <span className="text-sm text-white font-serif font-normal">
                              {selectedBarberId === 'any'
                                ? t.anyBarber
                                : barbers.find(b => b.id === selectedBarberId)?.name}
                            </span>
                          </div>
                        </li>

                        {/* Date/Time */}
                        <li className="flex items-start space-x-3">
                          <Clock className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[9px] text-gray-500 block font-mono uppercase tracking-wider">{t.stepDateTime}</span>
                            <span className="text-sm text-white font-serif font-normal">
                              {selectedDate} @ {selectedTime}
                            </span>
                          </div>
                        </li>
                      </ul>

                      {/* Line-item cost breakdown */}
                      <div className="border-t border-white/10 mt-6 pt-4 space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-gray-500">
                          <span>SUBTOTAL:</span>
                          <span>RD$ {subtotal.toFixed(2)}</span>
                        </div>
                        {isPackageDiscountApplied && (
                          <div className="flex justify-between text-green-400">
                            <span>PACKAGE DISCOUNT (10%):</span>
                            <span>-RD$ {discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-500">
                          <span>ESTIMATED DURATION:</span>
                          <span>{totalDuration} Mins</span>
                        </div>
                        <div className="flex justify-between items-baseline text-sm pt-2 border-t border-white/10">
                          <span className="text-white font-serif">{t.estimatedTotal}:</span>
                          <span className="text-xl font-serif text-[#D4AF37]">RD$ {finalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center space-x-2 text-[9px] uppercase tracking-wider text-gray-500 font-mono">
                      <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                      <span>{currentLang === 'en' ? 'SSL Secured Encrypted Booking Direct-to-Salon' : 'Reserva Encriptada Segura SSL Directa al Salón'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5 mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3.5 border border-white/10 hover:border-[#D4AF37]/40 text-white rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t.prevStep}</span>
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#C9A227] text-black rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center space-x-2 transition-all duration-300 cursor-pointer"
                  >
                    <span>{t.confirmBookingBtn}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* SUCCESS SCREEN WITH WHATSAPP LINK FOR DIRECT NOTIFICATION AND CLIENT SATISFACTION */
          <div
            id="booking-success-message"
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-none text-center shadow-2xl max-w-2xl mx-auto relative overflow-hidden animate-fade-in"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl" />

            <div className="h-16 w-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-none flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">
              {t.successTitle}
            </h3>

            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
              {t.successDesc}
            </p>

            {/* WhatsApp CTA Action */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-none mb-8">
              <div className="flex items-center justify-center space-x-2 text-[#D4AF37] mb-2">
                <MessageSquare className="h-4 w-4" />
                <span className="font-bold text-xs tracking-widest uppercase font-sans">
                  {t.whatsappConfirmTitle}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-light mb-4">
                {t.whatsappConfirmDesc}
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-none transition-all duration-300"
              >
                <span>{t.openWhatsAppBtn}</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="text-[#D4AF37] hover:text-[#C9A227] font-bold text-xs uppercase tracking-widest cursor-pointer underline underline-offset-4"
            >
              {t.bookAnother}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
