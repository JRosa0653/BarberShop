import { CustomSection, Language } from '../types';
import { Play, Sparkles, Video, Image as ImageIcon, FileText } from 'lucide-react';

interface CustomSectionsRendererProps {
  currentLang: Language;
  sections: CustomSection[];
}

export default function CustomSectionsRenderer({ currentLang, sections }: CustomSectionsRendererProps) {
  if (!sections || sections.length === 0) return null;

  // Safe helper to convert standard youtube urls to embed links
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v') || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov') || url.includes('/mp4');
  };

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {sortedSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="relative py-24 bg-black border-t border-white/5 overflow-hidden"
        >
          {/* Subtle decorative background spots */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#D4AF37]/2 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-[#C9A227]/2 rounded-full blur-[130px] pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold mb-3 block">
                {currentLang === 'en' ? 'EXCLUSIVE FEATURE' : 'DETALLE EXCLUSIVO'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
                {currentLang === 'en' ? section.titleEn : section.titleEs}
              </h2>
              <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mb-6" />
              {(section.subtitleEn || section.subtitleEs) && (
                <p className="text-[#D1D5DB]/60 text-sm sm:text-base font-light">
                  {currentLang === 'en' ? section.subtitleEn : section.subtitleEs}
                </p>
              )}
            </div>

            {/* Grid Items of the Section */}
            {section.items && section.items.length > 0 ? (
              <div className={`grid grid-cols-1 ${section.items.length === 1 ? 'max-w-3xl mx-auto' : 'md:grid-cols-2'} gap-8 lg:gap-12`}>
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    id={`custom-item-${item.id}`}
                    className="bg-[#121212]/50 border border-white/5 rounded-none p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37]/20 transition-all duration-300 group"
                  >
                    <div>
                      {/* Media container */}
                      {item.type === 'image' && item.mediaUrl && (
                        <div className="relative aspect-video w-full mb-6 overflow-hidden border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
                          <img
                            src={item.mediaUrl}
                            alt={currentLang === 'en' ? item.titleEn : item.titleEs}
                            className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {item.type === 'video' && item.mediaUrl && (
                        <div className="relative aspect-video w-full mb-6 overflow-hidden border border-white/10 bg-black">
                          {isVideoUrl(item.mediaUrl) ? (
                            <video
                              src={item.mediaUrl}
                              controls
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <iframe
                              src={getEmbedUrl(item.mediaUrl)}
                              title={currentLang === 'en' ? item.titleEn : item.titleEs}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                      )}

                      {/* Item Title */}
                      {(item.titleEn || item.titleEs) && (
                        <h3 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                          {currentLang === 'en' ? item.titleEn : item.titleEs}
                        </h3>
                      )}

                      {/* Item Description */}
                      {(item.descEn || item.descEs) && (
                        <p className="text-sm text-white/50 font-light leading-relaxed">
                          {currentLang === 'en' ? item.descEn : item.descEs}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#D4AF37]/40">
                      <span className="uppercase">{currentLang === 'en' ? 'GOLD & BLADE EXCLUSIVE' : 'EXCLUSIVO GOLD & BLADE'}</span>
                      <span className="flex items-center space-x-1">
                        {item.type === 'video' && <Video className="h-3 w-3 text-[#D4AF37]" />}
                        {item.type === 'image' && <ImageIcon className="h-3 w-3 text-[#D4AF37]" />}
                        {item.type === 'text' && <FileText className="h-3 w-3 text-[#D4AF37]" />}
                        <span className="uppercase">{item.type}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/40 py-8 italic font-light text-sm">
                {currentLang === 'en' ? 'No items in this section.' : 'Esta sección no tiene elementos todavía.'}
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
