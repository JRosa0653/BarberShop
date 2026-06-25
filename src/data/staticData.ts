import { Service, Barber, GalleryItem, Testimonial, CustomSection } from '../types';

export const INITIAL_SERVICES: Service[] = [
  // Haircuts
  {
    id: 's1',
    name: { en: 'Signature Fade Cut', es: 'Corte Degradado Firma' },
    category: 'Haircuts',
    price: 800,
    duration: 35,
    description: {
      en: 'Precision bald/skin fade, blow-dry styling, hot towel and dynamic neck shave.',
      es: 'Corte degradado a la piel de precisión, peinado con secador, toalla caliente y afeitado de cuello.'
    },
    isPopular: true
  },
  {
    id: 's2',
    name: { en: 'Executive Classic Cut', es: 'Corte Clásico Ejecutivo' },
    category: 'Haircuts',
    price: 700,
    duration: 30,
    description: {
      en: 'Traditional scissor/clipper haircut customized to your head shape, completed with style guidance.',
      es: 'Corte de cabello tradicional con tijera o máquina adaptado a tu estilo, finalizado con asesoramiento.'
    }
  },
  {
    id: 's3',
    name: { en: 'Modern Textured Crop', es: 'Texturizado Moderno Crop' },
    category: 'Haircuts',
    price: 850,
    duration: 40,
    description: {
      en: 'Highly textured contemporary look with blunt fringe and layered top, styled with premium matte clay.',
      es: 'Estilo contemporáneo texturizado con flequillo recto y capas superiores, peinado con arcilla mate premium.'
    }
  },
  // Beard Grooming
  {
    id: 's4',
    name: { en: 'Royal Hot Towel Shave', es: 'Afeitado Real con Toalla Caliente' },
    category: 'Beard Grooming',
    price: 700,
    duration: 30,
    description: {
      en: 'Traditional straight razor shave with premium pre-shave oils, warm lather, and cooling essential oils.',
      es: 'Afeitado tradicional con navaja libre, aceites pre-afeitado premium, espuma caliente y aceites esenciales.'
    },
    isPopular: true
  },
  {
    id: 's5',
    name: { en: 'Beard Sculpting & Therapy', es: 'Esculpido de Barba y Terapia' },
    category: 'Beard Grooming',
    price: 600,
    duration: 25,
    description: {
      en: 'Detailed shaping and alignment, line work with straight razor, finished with premium hydrating beard oils.',
      es: 'Perfilado y alineado detallado, definición con navaja libre, finalizado con aceites hidratantes premium.'
    }
  },
  // Hair Coloring
  {
    id: 's6',
    name: { en: 'Luxury Full Platinum Bleach', es: 'Decoloración Platino de Lujo' },
    category: 'Hair Coloring',
    price: 4500,
    duration: 120,
    description: {
      en: 'Premium multi-step platinum transformation with deep Plex hair-bond restructuring therapy.',
      es: 'Transformación a platino premium en varios pasos con terapia de restauración de enlaces Plex.'
    }
  },
  {
    id: 's7',
    name: { en: 'Classic Cover/Grey Camouflage', es: 'Camuflaje de Canas Clásico' },
    category: 'Hair Coloring',
    price: 1500,
    duration: 45,
    description: {
      en: 'Natural, subtle gray coverage that fades out gracefully over 4-6 weeks without harsh roots.',
      es: 'Cobertura de canas natural y sutil que desaparece gradualmente en 4-6 semanas sin raíces marcadas.'
    }
  },
  // Hair Treatments
  {
    id: 's8',
    name: { en: 'Premium Keratin Therapy', es: 'Terapia de Queratina Premium' },
    category: 'Hair Treatments',
    price: 3500,
    duration: 90,
    description: {
      en: 'Intense smoothing and frizz-control treatment that reconstructs hair strands and boosts natural shine.',
      es: 'Tratamiento alisador y anti-frizz intenso que reconstruye la fibra capilar y aporta brillo natural.'
    }
  },
  {
    id: 's9',
    name: { en: 'Detoxifying Scalp Spa', es: 'Spa Capilar Desintoxicante' },
    category: 'Hair Treatments',
    price: 1200,
    duration: 40,
    description: {
      en: 'Exfoliating activated charcoal scrub, clarifying shampoo, steam session and nourishing vitamin massage.',
      es: 'Exfoliación con carbón activado, champú purificante, sesión de vapor y masaje de vitaminas nutricionales.'
    }
  },
  // Women's Hair Services
  {
    id: 's10',
    name: { en: 'Couture Cut & Runway Blowout', es: 'Corte Alta Costura y Peinado Runway' },
    category: "Women's Hair Services",
    price: 2500,
    duration: 75,
    description: {
      en: 'Premium bespoke haircut, deep restructuring wash, and voluminous modern blowout styling.',
      es: 'Corte de cabello personalizado, lavado restaurador profundo y peinado con volumen de pasarela.'
    },
    isPopular: true
  },
  {
    id: 's11',
    name: { en: 'Balayage Artistry & Glaze', es: 'Balayage Artístico y Matiz' },
    category: "Women's Hair Services",
    price: 6500,
    duration: 180,
    description: {
      en: 'Hand-painted sun-kissed luxury highlights including protective smart-bond plex and custom glaze toner.',
      es: 'Reflejos dorados pintados a mano alzada, incluye plex protector inteligente y tónico de matiz.'
    }
  },
  // Kids & Special Services
  {
    id: 's12',
    name: { en: 'Young Gentleman Cut', es: 'Corte para Joven Caballero' },
    category: 'Kids Haircuts',
    price: 500,
    duration: 25,
    description: {
      en: 'Premium, patient haircut experience for kids under 12, finished with a styling lesson and sweet treat.',
      es: 'Experiencia de corte premium y paciente para niños menores de 12 años, peinado y dulce sorpresa.'
    }
  },
  {
    id: 's13',
    name: { en: 'The Imperial Package (All-In)', es: 'El Paquete Imperial (Todo Incluido)' },
    category: 'Premium Packages',
    price: 2800,
    duration: 80,
    description: {
      en: 'Signature Haircut, Scalp Detox Massage, Beard Sculpting with Hot Towel Shave and Face Clay Mask.',
      es: 'Corte de Firma, Masaje Detox de Cuero Cabelludo, Perfilado de Barba con Toalla Caliente y Mascarilla Facial.'
    },
    isPopular: true
  }
];

export const INITIAL_BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Alexander Mercer',
    role: { en: 'Master Barber & Founder', es: 'Maestro Barbero y Fundador' },
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fm=webp&fit=crop&q=75&w=350',
    specialties: ['Fades', 'Classic Scissors', 'Beard Artistry', 'Platinum Bleach']
  },
  {
    id: 'b2',
    name: 'Sofia Rodriguez',
    role: { en: 'Senior Stylist / Color Expert', es: 'Estilista Senior / Experta en Color' },
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp&fit=crop&q=75&w=350',
    specialties: ['Women\'s Cuts', 'Balayage', 'Keratin Treatments', 'Styling']
  },
  {
    id: 'b3',
    name: 'Marcus Vance',
    role: { en: 'Senior Barber & Shave Specialist', es: 'Barbero Senior y Especialista en Afeitado' },
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?fm=webp&fit=crop&q=75&w=350',
    specialties: ['Skin Fades', 'Hot Towel Shaves', 'Beard Therapy', 'Kids Cuts']
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Flawless Mid Skin Fade',
    category: 'Fade',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?fm=webp&fit=crop&q=75&w=500',
    beforeImage: 'https://images.unsplash.com/photo-1599351431247-f50940f3f86b?fm=webp&fit=crop&q=75&w=500',
    estimatedPrice: 800,
    estimatedDuration: 35,
    description: {
      en: 'A seamless, smooth skin transition positioned exactly midway. Hand-crafted styling with pomade for sharp texture, sharp contour work around the temples, and classic neck shaving.',
      es: 'Una transición de piel suave y fluida posicionada exactamente a la mitad. Peinado artesanal con pomada para lograr texturas marcadas, delineado de patillas ultra-definido y afeitado clásico.'
    }
  },
  {
    id: 'g2',
    title: 'Textured Crop with Matte Finish',
    category: 'Textured Crop',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?fm=webp&fit=crop&q=75&w=500',
    estimatedPrice: 900,
    estimatedDuration: 40,
    description: {
      en: 'Highly layered top with clean forward-swept bangs and tight side clipper fades. Styled with local organic clay for a natural-looking volume and lightweight feel.',
      es: 'Corte superior muy texturizado en capas con flequillo recto hacia adelante y degradado lateral corto. Moldeado con arcilla mate orgánica para un volumen natural y ligero.'
    }
  },
  {
    id: 'g3',
    title: 'Royal Shave & Alignment',
    category: 'Beard Styles',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?fm=webp&fit=crop&q=75&w=500',
    estimatedPrice: 700,
    estimatedDuration: 30,
    description: {
      en: 'The ultimate royal beard treatment: premium pre-shave steam, triple hot towel therapy, razor edge alignment, and cold-stone closing treatment with essential oil massages.',
      es: 'El tratamiento de barba definitivo: vapor pre-afeitado premium, terapia de triple toalla caliente, alineación milimétrica con navaja libre y sellado con piedras frías y aceites esenciales.'
    }
  },
  {
    id: 'g4',
    title: 'Modern High Volume Pompadour',
    category: 'Pompadour',
    image: 'https://images.unsplash.com/photo-1634480256802-7cb5b451f99a?fm=webp&fit=crop&q=75&w=500',
    estimatedPrice: 800,
    estimatedDuration: 30,
    description: {
      en: 'A dramatic, high-volume classic styled with modern dry styling techniques. Side taper fades to keep the spotlight on the clean, sweeping hair movement.',
      es: 'Un peinado clásico de gran volumen esculpido con secador y técnicas modernas de fijación en seco. Degradado cónico en los laterales para destacar la forma y fluidez del peinado.'
    }
  },
  {
    id: 'g5',
    title: 'Golden Balayage Waves',
    category: 'Classic Cuts',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?fm=webp&fit=crop&q=75&w=500',
    estimatedPrice: 6500,
    estimatedDuration: 180,
    description: {
      en: 'Meticulous, hand-painted sunkissed luxury highlights tailored to your natural waves. Includes deep plex bond restructuring for maximum shine, silkiness and heat protection.',
      es: 'Reflejos dorados de alta gama pintados a mano alzada para mimetizarse perfectamente con tus ondas naturales. Incluye tratamiento reconstructor plex profundo para brillo y sedosidad.'
    }
  },
  {
    id: 'g6',
    title: 'Buzz Cut with Razor Design',
    category: 'Buzz Cut',
    image: 'https://images.unsplash.com/photo-1599351431247-f50940f3f86b?fm=webp&fit=crop&q=75&w=500',
    estimatedPrice: 600,
    estimatedDuration: 25,
    description: {
      en: 'Ultra-short precision clipper cut with customized geometric line designs carved with straight razors. Extremely bold, clean, low-maintenance look.',
      es: 'Corte ultra corto a máquina de precisión con diseño geométrico personalizado tallado con navaja. Un aspecto sumamente audaz, limpio y libre de mantenimiento.'
    }
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Manny Cruz',
    rating: 5,
    comment: {
      en: 'The level of professionalism at Gold & Blade is unmatched. Alexander pays meticulous attention to detail. Absolute masterpiece cuts, the absolute best in Santo Domingo!',
      es: 'El nivel de profesionalismo en Gold & Blade es insuperable. Alexander presta una atención al detalle impresionante. ¡El mejor corte de Santo Domingo, sin duda!'
    },
    date: 'Hace 3 días',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=webp&fit=crop&q=75&w=100',
    source: 'google'
  },
  {
    id: 't2',
    name: 'Pamela Sued',
    rating: 5,
    comment: {
      en: 'Sofia completely transformed my hair coloring with her bespoke balayage treatment. The atmosphere at Blue Mall is extremely elegant and relaxing.',
      es: 'Sofía transformó por completo el color de mi cabello con su balayage personalizado. El ambiente aquí en Blue Mall es súper elegante, lujoso y relajante.'
    },
    date: 'Hace 1 semana',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=webp&fit=crop&q=75&w=100',
    source: 'google'
  },
  {
    id: 't3',
    name: 'Albert Pujols',
    rating: 5,
    comment: {
      en: 'Best hot towel shave I have ever had. Marcus Vance is a perfectionist. Will definitely be a regular client whenever I am in Santo Domingo.',
      es: 'El mejor afeitado con toalla caliente que me he hecho en el país. Marcus Vance es un verdadero perfeccionista. Definitivamente seré cliente fijo cada vez que esté en Santo Domingo.'
    },
    date: 'Hace 2 semanas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp&fit=crop&q=75&w=100',
    source: 'facebook'
  }
];

export const BUSINESS_HOURS = {
  Monday: "09:00 AM - 07:00 PM",
  Tuesday: "09:00 AM - 07:00 PM",
  Wednesday: "09:00 AM - 07:00 PM",
  Thursday: "09:00 AM - 07:00 PM",
  Friday: "09:00 AM - 08:00 PM",
  Saturday: "08:00 AM - 08:00 PM",
  Sunday: "09:00 AM - 03:00 PM"
};

export const INITIAL_CUSTOM_SECTIONS: CustomSection[] = [
  {
    id: 'sec-premium-experience',
    titleEn: 'Premium Salon Lounge',
    titleEs: 'Salón de Experiencia Premium',
    subtitleEn: 'Take a virtual tour of our flagship lounge in Santo Domingo',
    subtitleEs: 'Haz un recorrido virtual por nuestro salón insignia en Santo Domingo',
    order: 1,
    items: [
      {
        id: 'item-video-tour',
        type: 'video',
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder or sample embeddable video URL
        titleEn: 'Experience Gold & Blade',
        titleEs: 'Descubre Gold & Blade',
        descEn: 'A high-end look into our premium hair grooming services and luxurious atmosphere.',
        descEs: 'Una mirada exclusiva a nuestros servicios premium de barbería y el ambiente de lujo.'
      },
      {
        id: 'item-img-lounge',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?fm=webp&fit=crop&q=75&w=650',
        titleEn: 'The VIP Private Lounge',
        titleEs: 'El Salón Privado VIP',
        descEn: 'Our secluded grooming suite with private bar and curated whiskey tasting.',
        descEs: 'Nuestra suite de barbería privada con barra exclusiva y cata de whiskey curada.'
      }
    ]
  }
];

