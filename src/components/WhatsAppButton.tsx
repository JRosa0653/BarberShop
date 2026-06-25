import { MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface WhatsAppButtonProps {
  currentLang: Language;
}

export default function WhatsAppButton({ currentLang }: WhatsAppButtonProps) {
  const text = currentLang === 'en'
    ? 'Hello! I am browsing Gold & Blade and have a question about your luxury grooming services...'
    : '¡Hola! Estoy navegando en Gold & Blade y tengo una consulta sobre sus servicios de barbería de lujo...';

  const link = `https://wa.me/18494530811?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp-action"
      className="fixed bottom-6 right-6 z-40 group flex items-center space-x-2 bg-gradient-to-r from-[#25D366] to-[#20ba5a] hover:from-[#20ba5a] hover:to-[#1b9a4b] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      title={currentLang === 'en' ? 'Chat on WhatsApp' : 'Chat por WhatsApp'}
    >
      {/* Label tooltips */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-xs font-bold uppercase tracking-wider font-sans whitespace-nowrap block">
        {currentLang === 'en' ? 'Chat With Us' : 'Escríbenos'}
      </span>
      <MessageCircle className="h-6 w-6 stroke-[2.5]" />
    </a>
  );
}
