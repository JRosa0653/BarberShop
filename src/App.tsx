/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Language, Service, GalleryItem, Testimonial, Appointment, SEOConfig, ContactMessage, CustomSection } from './types';
import { INITIAL_SERVICES, INITIAL_BARBERS, INITIAL_GALLERY, INITIAL_TESTIMONIALS, INITIAL_CUSTOM_SECTIONS } from './data/staticData';

// Navbar + Hero load immediately (above-the-fold, user sees these first)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LazySection from './components/LazySection';

// Everything below the fold is lazy — only downloads when the user scrolls near it
const ServicesSection      = lazy(() => import('./components/ServicesSection'));
const GallerySection       = lazy(() => import('./components/GallerySection'));
const BookingSection       = lazy(() => import('./components/BookingSection'));
const AboutSection         = lazy(() => import('./components/AboutSection'));
const TestimonialsSection  = lazy(() => import('./components/TestimonialsSection'));
const ContactSection       = lazy(() => import('./components/ContactSection'));
const CustomSectionsRenderer = lazy(() => import('./components/CustomSectionsRenderer'));
const AdminPanel           = lazy(() => import('./components/AdminPanel'));
const WhatsAppButton       = lazy(() => import('./components/WhatsAppButton'));
const FloatingEstimatorWidget = lazy(() => import('./components/FloatingEstimatorWidget'));
const Footer               = lazy(() => import('./components/Footer'));

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // State Management linked with Local Storage (Lazy Initialization)
  const [services, setServices] = useState<Service[]>(() => {
    const cached = localStorage.getItem('services');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_SERVICES;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const cached = localStorage.getItem('gallery');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_GALLERY;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const cached = localStorage.getItem('testimonials');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_TESTIMONIALS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const cached = localStorage.getItem('bookings');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'app-seed-1',
        customerName: 'George Clooney',
        customerEmail: 'george@clooney.com',
        customerPhone: '+1 (310) 555-0199',
        services: ['s1', 's4'], // Signature Fade, Hot Towel Shave
        barberId: 'b1',
        date: '2026-06-23',
        time: '11:00 AM',
        status: 'completed',
        totalPrice: 80,
        totalDuration: 65,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'app-seed-2',
        customerName: 'Angelina Jolie',
        customerEmail: 'angelina@jolie.com',
        customerPhone: '+1 (310) 555-0244',
        services: ['s10'], // Couture Cut
        barberId: 'b2',
        date: '2026-06-24',
        time: '02:30 PM',
        status: 'completed',
        totalPrice: 95,
        totalDuration: 75,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'app-seed-3',
        customerName: 'Brad Pitt',
        customerEmail: 'brad@pitt.com',
        customerPhone: '+1 (310) 555-0422',
        services: ['s13'], // Imperial Package
        barberId: 'b3',
        date: '2026-06-25',
        time: '12:00 PM',
        status: 'confirmed',
        totalPrice: 95,
        totalDuration: 80,
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [seoConfig, setSeoConfig] = useState<SEOConfig>(() => {
    const cached = localStorage.getItem('seo_config');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Correct any legacy paths to use the new root-level /public assets
        let favicon = parsed.favicon;
        let ogImage = parsed.ogImage;
        if (!favicon || favicon.includes('/src/assets/') || favicon.includes('1782364993074')) {
          favicon = '/favicon_gold_blade.webp';
        }
        if (!ogImage || ogImage.includes('/src/assets/') || ogImage.includes('1782365008208')) {
          ogImage = '/og_image_gold_blade.webp';
        }
        return {
          ...parsed,
          favicon,
          ogImage
        };
      } catch (e) {
        // Fallback
      }
    }
    return {
      metaTitle: 'Gold & Blade Salon & Barbershop | Luxury Hair Styling & Precision Grooming',
      metaDescription: 'Experience premium styling, custom fades, royal hot towel shaves, and luxury hair coloring at Gold & Blade. Book your appointment online.',
      ogImage: '/og_image_gold_blade.webp',
      keywords: 'luxury salon, premium barbershop, haircut fade, beard sculpting, hot towel shave, balayage color',
      favicon: '/favicon_gold_blade.webp',
      localSchema: {
        name: 'Gold & Blade Salon & Barbershop',
        address: 'Ave. Winston Churchill, Santo Domingo',
        telephone: '+1 (849) 453-0811',
        priceRange: '$$$'
      }
    };
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const cached = localStorage.getItem('contact_messages');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'msg-seed-1',
        name: 'Carlos Santana',
        phone: '+1 (809) 555-0144',
        subject: 'Reserva de grupo VIP',
        message: 'Hola, me gustaría saber si tienen paquetes especiales para un grupo de 6 personas para este viernes en la tarde. Gracias.',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        status: 'unread'
      },
      {
        id: 'msg-seed-2',
        name: 'María Rodríguez',
        phone: '+1 (829) 555-0299',
        subject: 'Pregunta sobre Balayage',
        message: 'Buenas noches, quería consultar si el servicio de Balayage incluye hidratación profunda. Mi cabello está un poco maltratado.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'read'
      }
    ];
  });

  const [customSections, setCustomSections] = useState<CustomSection[]>(() => {
    const cached = localStorage.getItem('custom_sections');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_CUSTOM_SECTIONS;
  });

  // Selected Services in Price Estimator state
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // ── OPTIMIZED: Single debounced localStorage write (replaces 7 individual useEffects)
  // Batches all state changes and writes once, 400ms after the last change.
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem('services', JSON.stringify(services));
      localStorage.setItem('gallery', JSON.stringify(galleryItems));
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
      localStorage.setItem('bookings', JSON.stringify(appointments));
      localStorage.setItem('seo_config', JSON.stringify(seoConfig));
      localStorage.setItem('contact_messages', JSON.stringify(contactMessages));
      localStorage.setItem('custom_sections', JSON.stringify(customSections));
    }, 400);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [services, galleryItems, testimonials, appointments, seoConfig, contactMessages, customSections]);

  // Update HTML Document Head meta tags whenever SEO state changes!
  useEffect(() => {
    document.title = seoConfig.metaTitle;
    
    // Helper to build absolute URLs for social crawlers (WhatsApp, Facebook, etc.)
    const makeAbsolute = (url: string) => {
      if (!url) return '';
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const favPath = seoConfig.favicon || '/favicon_gold_blade_1782364993074.jpg';
    const ogPath = seoConfig.ogImage || '/og_image_gold_blade_1782365008208.jpg';

    // Manage description tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoConfig.metaDescription);

    // Manage keywords tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoConfig.keywords);

    // Manage favicon tag
    let linkFavicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (!linkFavicon) {
      linkFavicon = document.createElement('link');
      linkFavicon.setAttribute('rel', 'icon');
      document.head.appendChild(linkFavicon);
    }
    linkFavicon.setAttribute('href', makeAbsolute(favPath));

    // Manage Open Graph Title tag
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', seoConfig.metaTitle);

    // Manage Open Graph Description tag
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', seoConfig.metaDescription);

    // Manage Open Graph Image tag
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', makeAbsolute(ogPath));

    // Manage Twitter Title tag
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', seoConfig.metaTitle);

    // Manage Twitter Description tag
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', seoConfig.metaDescription);

    // Manage Twitter Image tag
    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImg) {
      twitterImg = document.createElement('meta');
      twitterImg.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImg);
    }
    twitterImg.setAttribute('content', makeAbsolute(ogPath));
  }, [seoConfig]);

  // Section Observer for Active Nav Highlighter (throttled to max 10 calls/sec)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sections = ['home', 'services', 'gallery', 'about', 'testimonials', 'contact', 'admin'];
        const scrollPosition = window.scrollY + 200;
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      setIsAdminOpen(true);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Connects Price Estimator "Proceed to Booking" with reservation engine
  const handleProceedToBooking = () => {
    handleNavigate('booking');
  };

  // Called when client successfully books appointment
  const handleBookingSuccess = (newApp: Appointment) => {
    setAppointments(prev => [newApp, ...prev]);
  };

  const handleSendMessage = (msg: { name: string; phone: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      phone: msg.phone,
      subject: msg.subject || '',
      message: msg.message,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    setContactMessages(prev => [newMsg, ...prev]);
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-[#D4AF37] selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Structural Headers */}
      <Navbar
        currentLang={lang}
        setLang={setLang}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Pages & Sections blocks */}
      <main>
        {/* Hero — loads immediately, no lazy */}
        <Hero currentLang={lang} onNavigate={handleNavigate} />

        {/* Everything below: only starts downloading when user scrolls near it */}
        <LazySection fallbackHeight="60vh" bg="#0a0a0a">
          <ServicesSection
            currentLang={lang}
            services={services}
            selectedServiceIds={selectedServiceIds}
            toggleServiceSelection={toggleServiceSelection}
            onProceedToBooking={handleProceedToBooking}
          />
        </LazySection>

        <LazySection fallbackHeight="50vh" bg="#070707">
          <GallerySection currentLang={lang} galleryItems={galleryItems} />
        </LazySection>

        <LazySection fallbackHeight="80vh" bg="#0a0a0a">
          <BookingSection
            currentLang={lang}
            services={services}
            barbers={INITIAL_BARBERS}
            selectedServiceIds={selectedServiceIds}
            toggleServiceSelection={toggleServiceSelection}
            onBookingSuccess={handleBookingSuccess}
          />
        </LazySection>

        <LazySection fallbackHeight="50vh" bg="#070707">
          <AboutSection currentLang={lang} barbers={INITIAL_BARBERS} />
        </LazySection>

        <LazySection fallbackHeight="40vh" bg="#0a0a0a">
          <TestimonialsSection currentLang={lang} testimonials={testimonials} />
        </LazySection>

        <LazySection fallbackHeight="20vh" bg="#070707">
          <CustomSectionsRenderer currentLang={lang} sections={customSections} />
        </LazySection>

        <LazySection fallbackHeight="50vh" bg="#0a0a0a">
          <ContactSection currentLang={lang} onSendMessage={handleSendMessage} />
        </LazySection>

        {/* AdminPanel: only fetched when isAdminOpen becomes true */}
        {isAdminOpen && (
          <Suspense fallback={null}>
            <AdminPanel
              currentLang={lang}
              isOpen={isAdminOpen}
              onClose={() => setIsAdminOpen(false)}
              services={services}
              setServices={setServices}
              galleryItems={galleryItems}
              setGalleryItems={setGalleryItems}
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              appointments={appointments}
              setAppointments={setAppointments}
              seoConfig={seoConfig}
              setSeoConfig={setSeoConfig}
              contactMessages={contactMessages}
              setContactMessages={setContactMessages}
              customSections={customSections}
              setCustomSections={setCustomSections}
            />
          </Suspense>
        )}
      </main>

      <Suspense fallback={null}>
        <WhatsAppButton currentLang={lang} />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingEstimatorWidget
          currentLang={lang}
          services={services}
          selectedServiceIds={selectedServiceIds}
          toggleServiceSelection={toggleServiceSelection}
          onProceedToBooking={handleProceedToBooking}
        />
      </Suspense>

      <LazySection fallbackHeight="200px" bg="#050505">
        <Footer currentLang={lang} onNavigate={handleNavigate} />
      </LazySection>
    </div>
  );
}
