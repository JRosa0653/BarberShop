import { useState, useEffect, FormEvent } from 'react';
import { Phone, Mail, MessageSquare, Clock, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_HOURS } from '../data/staticData';

interface ContactSectionProps {
  currentLang: Language;
  onSendMessage: (msg: { name: string; phone: string; subject: string; message: string }) => void;
}

export default function ContactSection({ currentLang, onSendMessage }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; text: string }>({ isOpen: true, text: '' });

  const t = TRANSLATIONS[currentLang];

  // Dynamically calculate "Open Now / Closed Now" status based on operating hours and current time
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      // Get current local day name
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[now.getDay()];
      const hourStr = BUSINESS_HOURS[dayName as keyof typeof BUSINESS_HOURS];

      if (!hourStr) {
        setOpenStatus({ isOpen: false, text: t.openStatusClosed });
        return;
      }

      // Parse hours e.g., "09:00 AM - 07:00 PM"
      const parts = hourStr.split(' - ');
      if (parts.length !== 2) {
        setOpenStatus({ isOpen: false, text: t.openStatusClosed });
        return;
      }

      const convertToMinutes = (timeString: string) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const startMin = convertToMinutes(parts[0]);
      const endMin = convertToMinutes(parts[1]);
      const currentMin = now.getHours() * 60 + now.getMinutes();

      if (currentMin >= startMin && currentMin < endMin) {
        setOpenStatus({
          isOpen: true,
          text: `${t.openStatusOpen} ${t.openStatusUntil} ${parts[1]}`
        });
      } else {
        setOpenStatus({
          isOpen: false,
          text: `${t.openStatusClosed} - ${t.openStatusOpens} ${parts[0]}`
        });
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentLang]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    onSendMessage({
      name,
      phone,
      subject,
      message
    });

    setIsSent(true);
    setName('');
    setPhone('');
    setSubject('');
    setMessage('');
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 bg-black border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#D4AF37]/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#C9A227]/3 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
            {currentLang === 'en' ? 'RESERVE OR ENQUIRE' : 'RESERVE O PREGUNTE'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            {t.contactTitle}
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D1D5DB]/60 text-sm sm:text-base font-light">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Panel: Details, Hours & Map Mock */}
          <div className="space-y-8">
            <div className="bg-white/[0.01] border border-white/10 p-8 rounded-none space-y-6 shadow-2xl">
              
              {/* Live Hours Header with Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-[#D4AF37]" />
                  <h3 className="font-serif font-normal text-xl text-white">
                    {t.businessHoursTitle}
                  </h3>
                </div>
                
                {/* Dynamic Status Pill */}
                <div className={`inline-flex items-center space-x-2 px-3 py-1 border rounded-none text-[10px] font-mono uppercase tracking-wider ${
                  openStatus.isOpen 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-none ${openStatus.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                  <span>{openStatus.text}</span>
                </div>
              </div>

              {/* Weekly Schedule list */}
              <div className="space-y-3 font-mono text-xs">
                {Object.entries(BUSINESS_HOURS).map(([day, hours]) => {
                  const now = new Date();
                  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                  const isToday = days[now.getDay()] === day;
                  return (
                    <div
                      key={day}
                      className={`flex justify-between items-center py-1 transition-colors ${
                        isToday ? 'text-[#D4AF37] font-semibold border-l border-[#D4AF37] pl-3' : 'text-[#D1D5DB]/50'
                      }`}
                    >
                      <span>{currentLang === 'en' ? day : day.replace('Monday', 'Lunes').replace('Tuesday', 'Martes').replace('Wednesday', 'Miércoles').replace('Thursday', 'Jueves').replace('Friday', 'Viernes').replace('Saturday', 'Sábado').replace('Sunday', 'Domingo')}</span>
                      <span>{hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Info List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+18494530811"
                className="bg-white/[0.01] border border-white/10 hover:border-[#D4AF37]/40 p-5 rounded-none flex items-center space-x-4 transition-all"
              >
                <div className="p-3 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/20 text-[#D4AF37]">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block font-mono">Call Lounge</span>
                  <span className="text-xs font-semibold text-white font-mono">+1 (849) 453-0811</span>
                </div>
              </a>

              <a
                href="mailto:concierge@goldandblade.com"
                className="bg-white/[0.01] border border-white/10 hover:border-[#D4AF37]/40 p-5 rounded-none flex items-center space-x-4 transition-all"
              >
                <div className="p-3 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/20 text-[#D4AF37]">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block font-mono">Email Us</span>
                  <span className="text-xs font-semibold text-white font-mono">concierge@goldandblade.com</span>
                </div>
              </a>
            </div>

            {/* Luxury Map Placeholder */}
            <div className="rounded-none overflow-hidden border border-white/10 shadow-2xl relative aspect-video">
              {/* Premium Dark Styled Map Iframe */}
              <iframe
                title="Gold & Blade Flagship Lounge"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3371661141733!2d-69.931211!3d18.47186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI4JzE4LjciTiA2OcKwNTUnNTIuNCJX!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2) brightness(0.95)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 bg-black/90 border border-white/10 px-4 py-2 rounded-none flex items-center space-x-2 backdrop-blur-md">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-[11px] font-medium text-white font-serif">Ave. Winston Churchill, Santo Domingo</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Secure Contact Form */}
          <div className="bg-white/[0.01] border border-[#D4AF37]/20 p-8 sm:p-10 rounded-none shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/3 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-2 mb-6 border-b border-white/5 pb-4">
              <div className="p-1.5 bg-[#D4AF37]/5 rounded-none border border-[#D4AF37]/20">
                <MessageSquare className="h-4.5 w-4.5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-normal text-xl text-white">
                {currentLang === 'en' ? 'Secure Contact Form' : 'Formulario de Contacto Seguro'}
              </h3>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                  {currentLang === 'en' ? 'Your Name' : 'Tu Nombre'} <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/10 focus:outline-none focus:border-[#D4AF37] transition-all font-light"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                  {currentLang === 'en' ? 'Phone Number' : 'Número de Teléfono'} <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (809) 555-0100"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/10 focus:outline-none focus:border-[#D4AF37] transition-all font-light"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                  {currentLang === 'en' ? 'Subject' : 'Asunto'}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Corporate Inquiries, VIP packages...' : 'Consulta corporativa, etc.'}
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/10 focus:outline-none focus:border-[#D4AF37] transition-all font-light"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                  {currentLang === 'en' ? 'Your Message' : 'Tu Mensaje'} <span className="text-[#D4AF37]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Type your message details here...' : 'Detalla tu consulta aquí...'}
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/10 focus:outline-none focus:border-[#D4AF37] transition-all resize-none font-light"
                />
              </div>

              {isSent && (
                <div className="flex items-center space-x-2 text-green-400 text-xs py-2 animate-fade-in font-mono">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.messageSent}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSent}
                className="w-full bg-[#D4AF37] text-black font-semibold text-xs tracking-[0.25em] uppercase py-4 px-6 rounded-none transition-all duration-300 hover:bg-white hover:text-black flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{t.sendMessageBtn}</span>
              </button>
            </form>

            {/* QA Help support prompt */}
            <div className="flex items-center space-x-2 text-[10px] text-[#D1D5DB]/40 justify-center mt-6 font-mono tracking-wider uppercase">
              <HelpCircle className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>{currentLang === 'en' ? 'Response rate: under 2 hours' : 'Tasa de respuesta: menos de 2 horas'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
