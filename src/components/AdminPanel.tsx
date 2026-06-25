import { useState, useEffect, FormEvent } from 'react';
import {
  TrendingUp, Calendar, Users, DollarSign, LogOut, Check, X, CheckCircle, Trash2,
  Plus, Edit3, ShieldAlert, Award, Sliders, Globe, Share2, Save, Download, RefreshCw, Mail,
  Layers, Video, Image as ImageIcon, FileText, ArrowUp, ArrowDown, Play
} from 'lucide-react';
import { Appointment, Service, GalleryItem, Testimonial, Language, SEOConfig, ContactMessage, CustomSection, CustomContentItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_SERVICES, INITIAL_TESTIMONIALS, INITIAL_GALLERY } from '../data/staticData';

interface AdminPanelProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  setServices: (services: Service[]) => void;
  galleryItems: GalleryItem[];
  setGalleryItems: (items: GalleryItem[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  seoConfig: SEOConfig;
  setSeoConfig: (config: SEOConfig) => void;
  contactMessages: ContactMessage[];
  setContactMessages: (messages: ContactMessage[]) => void;
  customSections: CustomSection[];
  setCustomSections: (sections: CustomSection[]) => void;
}

export default function AdminPanel({
  currentLang,
  isOpen,
  onClose,
  services,
  setServices,
  galleryItems,
  setGalleryItems,
  testimonials,
  setTestimonials,
  appointments,
  setAppointments,
  seoConfig,
  setSeoConfig,
  contactMessages,
  setContactMessages,
  customSections,
  setCustomSections
}: AdminPanelProps) {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'services' | 'seo' | 'messages' | 'sections'>('dashboard');

  // Stored Admin Credentials (with default fallback)
  const [storedAdminUsername, setStoredAdminUsername] = useState(() => {
    return localStorage.getItem('admin_portal_username') || 'admin';
  });
  const [storedAdminPassword, setStoredAdminPassword] = useState(() => {
    return localStorage.getItem('admin_portal_password') || 'goldblade2026';
  });

  // Inputs for changing credentials
  const [newAdminUsername, setNewAdminUsername] = useState(storedAdminUsername);
  const [newAdminPassword, setNewAdminPassword] = useState(storedAdminPassword);

  // Service Edit States
  const [isEditingService, setIsEditingService] = useState<string | null>(null); // serviceId or 'new'
  const [editNameEn, setEditNameEn] = useState('');
  const [editNameEs, setEditNameEs] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editDuration, setEditDuration] = useState(0);
  const [editCategory, setEditCategory] = useState('Haircuts');
  const [editDescEn, setEditDescEn] = useState('');
  const [editDescEs, setEditDescEs] = useState('');

  // SEO states
  const [seoMetaTitle, setSeoMetaTitle] = useState(seoConfig.metaTitle);
  const [seoMetaDesc, setSeoMetaDesc] = useState(seoConfig.metaDescription);
  const [seoKeywords, setSeoKeywords] = useState(seoConfig.keywords);
  const [seoName, setSeoName] = useState(seoConfig.localSchema.name);
  const [seoTel, setSeoTel] = useState(seoConfig.localSchema.telephone);
  const [seoFavicon, setSeoFavicon] = useState(seoConfig.favicon || '/favicon_gold_blade_1782364993074.jpg');
  const [seoOgImage, setSeoOgImage] = useState(seoConfig.ogImage || '/og_image_gold_blade_1782365008208.jpg');

  // Section Edit States
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null); // sectionId or 'new'
  const [sectTitleEn, setSectTitleEn] = useState('');
  const [sectTitleEs, setSectTitleEs] = useState('');
  const [sectSubtitleEn, setSectSubtitleEn] = useState('');
  const [sectSubtitleEs, setSectSubtitleEs] = useState('');
  const [sectOrder, setSectOrder] = useState(1);

  // Content Item Edit States
  const [editingSectionForItems, setEditingSectionForItems] = useState<string | null>(null); // sectionId where we edit/add items
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // itemId or 'new'
  const [itemType, setItemType] = useState<'image' | 'video' | 'text'>('image');
  const [itemMediaUrl, setItemMediaUrl] = useState('');
  const [itemTitleEn, setItemTitleEn] = useState('');
  const [itemTitleEs, setItemTitleEs] = useState('');
  const [itemDescEn, setItemDescEn] = useState('');
  const [itemDescEs, setItemDescEs] = useState('');

  const t = TRANSLATIONS[currentLang];

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === storedAdminUsername.toLowerCase() && password === storedAdminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError(t.invalidCredentials);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Manage Bookings (Update appointment status)
  const updateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setAppointments(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  // Delete booking
  const deleteAppointment = (id: string) => {
    const filtered = appointments.filter(app => app.id !== id);
    setAppointments(filtered);
    localStorage.setItem('bookings', JSON.stringify(filtered));
  };

  // Edit / Create Services
  const handleEditServiceClick = (service: Service | 'new') => {
    if (service === 'new') {
      setIsEditingService('new');
      setEditNameEn('');
      setEditNameEs('');
      setEditPrice(40);
      setEditDuration(30);
      setEditCategory('Haircuts');
      setEditDescEn('');
      setEditDescEs('');
    } else {
      setIsEditingService(service.id);
      setEditNameEn(service.name.en);
      setEditNameEs(service.name.es);
      setEditPrice(service.price);
      setEditDuration(service.duration);
      setEditCategory(service.category);
      setEditDescEn(service.description.en);
      setEditDescEs(service.description.es);
    }
  };

  const handleSaveService = (e: FormEvent) => {
    e.preventDefault();
    if (!editNameEn || !editNameEs || editPrice <= 0 || editDuration <= 0) return;

    if (isEditingService === 'new') {
      const newService: Service = {
        id: 's-' + Math.random().toString(36).substr(2, 9),
        name: { en: editNameEn, es: editNameEs },
        category: editCategory,
        price: Number(editPrice),
        duration: Number(editDuration),
        description: { en: editDescEn, es: editDescEs }
      };
      const updated = [...services, newService];
      setServices(updated);
      localStorage.setItem('services', JSON.stringify(updated));
    } else {
      const updated = services.map(s => {
        if (s.id === isEditingService) {
          return {
            ...s,
            name: { en: editNameEn, es: editNameEs },
            category: editCategory,
            price: Number(editPrice),
            duration: Number(editDuration),
            description: { en: editDescEn, es: editDescEs }
          };
        }
        return s;
      });
      setServices(updated);
      localStorage.setItem('services', JSON.stringify(updated));
    }
    setIsEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    const filtered = services.filter(s => s.id !== id);
    setServices(filtered);
    localStorage.setItem('services', JSON.stringify(filtered));
  };

  // SEO configurations saver
  const handleSaveSEO = (e: FormEvent) => {
    e.preventDefault();
    const updated: SEOConfig = {
      ...seoConfig,
      metaTitle: seoMetaTitle,
      metaDescription: seoMetaDesc,
      keywords: seoKeywords,
      ogImage: seoOgImage,
      favicon: seoFavicon,
      localSchema: {
        ...seoConfig.localSchema,
        name: seoName,
        telephone: seoTel
      }
    };
    setSeoConfig(updated);
    localStorage.setItem('seo_config', JSON.stringify(updated));
    alert(currentLang === 'en' ? 'SEO config deployed and updated!' : '¡Configuración SEO guardada y desplegada!');
  };

  // Admin portal credentials saver
  const handleSaveCredentials = (e: FormEvent) => {
    e.preventDefault();
    if (!newAdminUsername.trim() || !newAdminPassword.trim()) {
      alert(currentLang === 'en' ? 'Username and password cannot be empty.' : 'El usuario y la contraseña no pueden estar vacíos.');
      return;
    }

    setStoredAdminUsername(newAdminUsername);
    setStoredAdminPassword(newAdminPassword);
    localStorage.setItem('admin_portal_username', newAdminUsername);
    localStorage.setItem('admin_portal_password', newAdminPassword);

    alert(currentLang === 'en' ? 'Administrative portal credentials updated successfully!' : '¡Credenciales del portal administrativo actualizadas con éxito!');
  };

  // Toggle message status between read and unread
  const toggleMessageStatus = (id: string) => {
    const updated = contactMessages.map(msg => {
      if (msg.id === id) {
        return { ...msg, status: (msg.status === 'read' ? 'unread' as const : 'read' as const) };
      }
      return msg;
    });
    setContactMessages(updated);
  };

  // Delete message
  const deleteContactMessage = (id: string) => {
    const filtered = contactMessages.filter(msg => msg.id !== id);
    setContactMessages(filtered);
  };

  // Save Section
  const handleSaveSection = (e: FormEvent) => {
    e.preventDefault();
    if (!sectTitleEn.trim() || !sectTitleEs.trim()) {
      alert(currentLang === 'en' ? 'Please provide both English and Spanish titles.' : 'Por favor proporcione títulos en inglés y español.');
      return;
    }

    if (editingSectionId === 'new') {
      const newSection: CustomSection = {
        id: `sec-${Date.now()}`,
        titleEn: sectTitleEn,
        titleEs: sectTitleEs,
        subtitleEn: sectSubtitleEn,
        subtitleEs: sectSubtitleEs,
        order: sectOrder || (customSections.length + 1),
        items: []
      };
      const updated = [...customSections, newSection];
      setCustomSections(updated);
      localStorage.setItem('custom_sections', JSON.stringify(updated));
    } else {
      const updated = customSections.map(sec => {
        if (sec.id === editingSectionId) {
          return {
            ...sec,
            titleEn: sectTitleEn,
            titleEs: sectTitleEs,
            subtitleEn: sectSubtitleEn,
            subtitleEs: sectSubtitleEs,
            order: sectOrder
          };
        }
        return sec;
      });
      setCustomSections(updated);
      localStorage.setItem('custom_sections', JSON.stringify(updated));
    }
    setEditingSectionId(null);
    setSectTitleEn('');
    setSectTitleEs('');
    setSectSubtitleEn('');
    setSectSubtitleEs('');
  };

  // Start Editing Section
  const handleStartEditSection = (sec: CustomSection | 'new') => {
    if (sec === 'new') {
      setEditingSectionId('new');
      setSectTitleEn('');
      setSectTitleEs('');
      setSectSubtitleEn('');
      setSectSubtitleEs('');
      setSectOrder(customSections.length + 1);
    } else {
      setEditingSectionId(sec.id);
      setSectTitleEn(sec.titleEn);
      setSectTitleEs(sec.titleEs);
      setSectSubtitleEn(sec.subtitleEn || '');
      setSectSubtitleEs(sec.subtitleEs || '');
      setSectOrder(sec.order || 1);
    }
  };

  // Delete Section
  const handleDeleteSection = (id: string) => {
    const confirmDelete = window.confirm(currentLang === 'en' ? 'Are you sure you want to delete this section?' : '¿Estás seguro de que quieres eliminar esta sección?');
    if (!confirmDelete) return;
    const filtered = customSections.filter(sec => sec.id !== id);
    setCustomSections(filtered);
    localStorage.setItem('custom_sections', JSON.stringify(filtered));
  };

  // Reordering sections
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const sorted = [...customSections].sort((a, b) => (a.order || 0) - (b.order || 0));
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sorted.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = sorted[index];
    sorted[index] = sorted[targetIndex];
    sorted[targetIndex] = temp;

    // Reassign orders
    const updated = sorted.map((sec, i) => ({
      ...sec,
      order: i + 1
    }));

    setCustomSections(updated);
    localStorage.setItem('custom_sections', JSON.stringify(updated));
  };

  // Save Content Item to Section
  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    if (!editingSectionForItems) return;

    const targetSection = customSections.find(s => s.id === editingSectionForItems);
    if (!targetSection) return;

    if (editingItemId === 'new') {
      const newItem: CustomContentItem = {
        id: `item-${Date.now()}`,
        type: itemType,
        mediaUrl: itemMediaUrl,
        titleEn: itemTitleEn,
        titleEs: itemTitleEs,
        descEn: itemDescEn,
        descEs: itemDescEs
      };
      const updated = customSections.map(sec => {
        if (sec.id === editingSectionForItems) {
          return {
            ...sec,
            items: [...sec.items, newItem]
          };
        }
        return sec;
      });
      setCustomSections(updated);
      localStorage.setItem('custom_sections', JSON.stringify(updated));
    } else {
      const updated = customSections.map(sec => {
        if (sec.id === editingSectionForItems) {
          const updatedItems = sec.items.map(item => {
            if (item.id === editingItemId) {
              return {
                ...item,
                type: itemType,
                mediaUrl: itemMediaUrl,
                titleEn: itemTitleEn,
                titleEs: itemTitleEs,
                descEn: itemDescEn,
                descEs: itemDescEs
              };
            }
            return item;
          });
          return {
            ...sec,
            items: updatedItems
          };
        }
        return sec;
      });
      setCustomSections(updated);
      localStorage.setItem('custom_sections', JSON.stringify(updated));
    }

    setEditingItemId(null);
    setItemType('image');
    setItemMediaUrl('');
    setItemTitleEn('');
    setItemTitleEs('');
    setItemDescEn('');
    setItemDescEs('');
  };

  // Start Edit Content Item
  const handleStartEditItem = (sectionId: string, item: CustomContentItem | 'new') => {
    setEditingSectionForItems(sectionId);
    if (item === 'new') {
      setEditingItemId('new');
      setItemType('image');
      setItemMediaUrl('');
      setItemTitleEn('');
      setItemTitleEs('');
      setItemDescEn('');
      setItemDescEs('');
    } else {
      setEditingItemId(item.id);
      setItemType(item.type);
      setItemMediaUrl(item.mediaUrl || '');
      setItemTitleEn(item.titleEn || '');
      setItemTitleEs(item.titleEs || '');
      setItemDescEn(item.descEn || '');
      setItemDescEs(item.descEs || '');
    }
  };

  // Delete Content Item
  const handleDeleteItem = (sectionId: string, itemId: string) => {
    const updated = customSections.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.filter(item => item.id !== itemId)
        };
      }
      return sec;
    });
    setCustomSections(updated);
    localStorage.setItem('custom_sections', JSON.stringify(updated));
  };

  // Export Bookings to JSON File
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appointments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gold_blade_appointments_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Derive active stats with completed bookings and revenue breakdown
  const completedBookings = appointments.filter(app => app.status === 'completed');
  const activeBookings = appointments.filter(app => app.status !== 'cancelled');
  const completedRevenue = completedBookings.reduce((sum, app) => sum + app.totalPrice, 0);
  const activeRevenue = activeBookings.reduce((sum, app) => sum + app.totalPrice, 0);
  const totalCount = appointments.length;
  const completedCount = completedBookings.length;
  const activeCount = appointments.filter(app => app.status === 'confirmed' || app.status === 'pending').length;
  const avgBookingValue = completedCount > 0 ? completedRevenue / completedCount : (totalCount > 0 ? activeRevenue / totalCount : 0);
  
  // Combine completed bookings and contact messages for live activity feed
  const activityFeed = [
    ...completedBookings.map(app => ({
      id: app.id,
      type: 'booking' as const,
      title: currentLang === 'en' ? `Booking Completed: ${app.customerName}` : `Cita Completada: ${app.customerName}`,
      detail: currentLang === 'en' 
        ? `Value: RD$ ${app.totalPrice.toFixed(2)} on ${app.date} ${app.time}`
        : `Valor: RD$ ${app.totalPrice.toFixed(2)} el ${app.date} a las ${app.time}`,
      time: new Date(app.createdAt || Date.now()).toLocaleDateString(),
      timestamp: new Date(app.createdAt || Date.now()).getTime(),
      badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20'
    })),
    ...contactMessages.map(msg => ({
      id: msg.id,
      type: 'contact' as const,
      title: currentLang === 'en' ? `Secure Contact: ${msg.name}` : `Contacto Seguro: ${msg.name}`,
      detail: `${msg.subject ? `[${msg.subject}] ` : ''}"${msg.message.substring(0, 80)}${msg.message.length > 80 ? '...' : ''}"`,
      time: new Date(msg.createdAt).toLocaleDateString(),
      timestamp: new Date(msg.createdAt).getTime(),
      badgeColor: 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20'
    }))
  ]
  .sort((a, b) => b.timestamp - a.timestamp)
  .slice(0, 5);
  
  // Real layout
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-y-auto">
        <div className="relative w-full max-w-md bg-[#0A0A0A] border border-[#D4AF37]/30 p-8 rounded-none shadow-2xl flex flex-col text-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white hover:bg-white/5 p-2 rounded-none transition-colors z-50 cursor-pointer"
            title="Close Admin Panel"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="h-12 w-12 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto mb-6">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <h3 className="text-2xl font-serif text-white mb-2">{t.adminTitle}</h3>
          <p className="text-xs text-[#D1D5DB]/50 mb-6 font-mono tracking-wider">
            SECURE ACCESS PROTOCOL
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs uppercase font-mono tracking-widest text-white/50 block mb-1">
                {t.adminUsername}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs uppercase font-mono tracking-widest text-white/50 block mb-1">
                {t.adminPassword}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="goldblade2026"
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] text-sm font-mono"
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs font-mono text-center pt-2">
                {loginError}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-white hover:text-black text-black font-bold py-3 rounded-none text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                {t.loginBtn}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4">
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
              {storedAdminUsername === 'admin' && storedAdminPassword === 'goldblade2026'
                ? (currentLang === 'en' ? 'DEFAULT PIN: admin / goldblade2026' : 'PIN POR DEFECTO: admin / goldblade2026')
                : (currentLang === 'en' ? 'AUTHORIZED CUSTOM CREDENTIALS ACTIVE' : 'CREDENCIALES PERSONALIZADAS ACTIVAS')
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#050505] border border-white/10 rounded-none shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white hover:bg-white/5 p-2 rounded-none transition-colors z-50 cursor-pointer"
          title="Close Admin Panel"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Dashboard Title & Tabs header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
              AUTHORIZED OPERATIONS PANEL
            </span>
            <h2 className="text-3xl font-bold text-white flex items-center space-x-2">
              <Award className="h-7 w-7 text-[#D4AF37]" />
              <span>{t.adminTitle}</span>
            </h2>
          </div>

          {/* Action Row */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportData}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold font-mono"
              title="Export Bookings to CSV/JSON"
            >
              <Download className="h-4 w-4 text-[#D4AF37]" />
              <span>Export Bookings</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-red-950/25 hover:bg-red-900/40 border border-red-500/20 text-red-400 text-xs font-bold"
            >
              <LogOut className="h-4 w-4" />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
        </div>

        {/* Tab Controllers */}
        <div id="admin-tabs" className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-white/5 text-white/70 border-white/5 hover:border-white/10'
            }`}
          >
            📊 {t.activeTabDashboard}
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all ${
              activeTab === 'appointments'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-white/5 text-white/70 border-white/5'
            }`}
          >
            📅 {t.activeTabAppointments} ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all ${
              activeTab === 'services'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-white/5 text-white/70 border-white/5'
            }`}
          >
            ✂️ {t.activeTabServices}
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all ${
              activeTab === 'seo'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-white/5 text-white/70 border-white/5'
            }`}
          >
            🌐 {t.activeTabSEO}
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all ${
              activeTab === 'messages'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-white/5 text-white/70 border-white/5'
            }`}
          >
            ✉️ {currentLang === 'en' ? 'Secure Contacts' : 'Mensajes'} ({contactMessages.filter(m => m.status === 'unread').length > 0 ? `${contactMessages.filter(m => m.status === 'unread').length} nuevos` : contactMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all ${
              activeTab === 'sections'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-white/5 text-white/70 border-white/5'
            }`}
          >
            🗂️ {currentLang === 'en' ? 'Custom Sections' : 'Secciones de Página'}
          </button>
        </div>

        {/* TAB 1: ANALYTICS / DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div id="admin-tab-dashboard" className="space-y-8 animate-fade-in">
            {/* Quick Metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* Stat 1: Revenue */}
              <div className="bg-[#121212]/90 border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-mono font-bold">
                    {t.totalRevenue}
                  </span>
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-white font-mono">RD$ {completedRevenue.toFixed(2)}</span>
                <p className="text-[10px] text-white/40 mt-1 font-mono">
                  {currentLang === 'en' ? 'Projected: ' : 'Proyectado: '} 
                  <span className="text-green-400">RD$ {activeRevenue.toFixed(2)}</span>
                </p>
              </div>

              {/* Stat 2: Appointments */}
              <div className="bg-[#121212]/90 border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-mono font-bold">
                    {t.totalAppointments}
                  </span>
                  <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-3xl font-extrabold text-white font-mono">{totalCount}</span>
                <p className="text-[10px] text-white/40 mt-1 font-mono">
                  {completedCount} {currentLang === 'en' ? 'completed •' : 'completadas •'} {activeCount} {currentLang === 'en' ? 'active' : 'activas'}
                </p>
              </div>

              {/* Stat 3: Average Ticket */}
              <div className="bg-[#121212]/90 border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-mono font-bold">
                    {t.averageBooking}
                  </span>
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-white font-mono">RD$ {avgBookingValue.toFixed(2)}</span>
                <p className="text-[10px] text-blue-400/80 mt-1 font-mono">
                  {currentLang === 'en' ? 'Based on completed sessions' : 'Basado en sesiones completas'}
                </p>
              </div>

              {/* Stat 4: Secure Contacts */}
              <div className="bg-[#121212]/90 border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-mono font-bold">
                    {currentLang === 'en' ? 'Secure Contacts' : 'Contactos Seguros'}
                  </span>
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-3xl font-extrabold text-white font-mono">{contactMessages.length}</span>
                <p className="text-[10px] text-purple-400/80 mt-1 font-mono">
                  {contactMessages.filter(m => m.status === 'unread').length} {currentLang === 'en' ? 'unread messages' : 'mensajes sin leer'}
                </p>
              </div>
            </div>

            {/* Custom SVG Sleek Bar Chart for weekly load */}
            <div className="bg-[#121212]/90 border border-white/5 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-lg font-bold text-white mb-6">
                {currentLang === 'en' ? 'Weekly Operations Capacity' : 'Capacidad de Operaciones Semanal'}
              </h3>
              <div className="h-48 flex items-end justify-between gap-2 pt-4 border-b border-white/10 pb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const values = [65, 78, 85, 92, 110, 120, 45]; // Dummy luxury values
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-white/5 rounded-t-lg relative group overflow-hidden" style={{ height: '140px' }}>
                        <div
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#C9A227] to-[#D4AF37] rounded-t-md transition-all duration-1000"
                          style={{ height: `${(values[idx] / 120) * 100}%` }}
                        />
                        {/* Hover tag */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-black text-[#D4AF37] text-[10px] font-mono font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {values[idx]}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-white/40 mt-3 uppercase tracking-wider">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Activity Feed (Secure Contacts & Completed Bookings) */}
            <div className="bg-[#121212]/90 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                <Mail className="h-5 w-5 text-[#D4AF37]" />
                <h3 className="text-lg font-bold text-white">
                  {currentLang === 'en' ? 'Live Activity Feed' : 'Registro de Actividad en Vivo'}
                </h3>
              </div>
              
              {activityFeed.length === 0 ? (
                <p className="text-sm text-white/40 italic py-4 text-center">
                  {currentLang === 'en' ? 'No recent operations recorded yet.' : 'No hay operaciones recientes registradas aún.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {activityFeed.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-all gap-4"
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className={`mt-0.5 p-2 rounded-xl border ${item.badgeColor}`}>
                          {item.type === 'booking' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-white/50 mt-0.5 line-clamp-1 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-[10px] font-mono text-white/30 sm:self-center">
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS BOOKINGS MANAGER */}
        {activeTab === 'appointments' && (
          <div id="admin-tab-appointments" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                {currentLang === 'en' ? 'Active Appointment Roster' : 'Listado de Citas Activas'}
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#121212]/90">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs font-mono uppercase tracking-wider text-white/60">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Services</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-white/40 italic">
                        {t.noBookings}
                      </td>
                    </tr>
                  ) : (
                    appointments.map((app) => {
                      // Lookup service names
                      const appServices = services.filter(s => app.services.includes(s.id));
                      const serviceNames = appServices.map(s => currentLang === 'en' ? s.name.en : s.name.es).join(', ');

                      return (
                        <tr key={app.id} id={`admin-appointment-row-${app.id}`} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-white block">{app.customerName}</span>
                            <span className="text-xs text-white/40 font-mono block">{app.customerPhone}</span>
                          </td>
                          <td className="p-4 max-w-[200px] truncate">
                            <span className="text-white/80" title={serviceNames}>
                              {serviceNames || 'N/A'}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-xs">
                            <span className="text-white block">{app.date}</span>
                            <span className="text-[#D4AF37] block">{app.time}</span>
                          </td>
                          <td className="p-4 font-mono font-bold text-[#D4AF37]">
                            RD$ {app.totalPrice.toFixed(2)}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${
                              app.status === 'confirmed'
                                ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                                : app.status === 'completed'
                                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                : app.status === 'cancelled'
                                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                                : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-500'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-1.5">
                              {app.status === 'pending' && (
                                <button
                                  onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                                  className="p-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-black transition-all"
                                  title={t.actionConfirm}
                                >
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {app.status !== 'completed' && app.status !== 'cancelled' && (
                                <button
                                  onClick={() => updateAppointmentStatus(app.id, 'completed')}
                                  className="p-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500 hover:text-black transition-all"
                                  title={t.actionComplete}
                                >
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {app.status !== 'cancelled' && (
                                <button
                                  onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                                  className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500 hover:text-black transition-all"
                                  title={t.actionCancel}
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteAppointment(app.id)}
                                className="p-1.5 bg-white/5 border border-white/10 text-white/50 hover:bg-red-500 hover:text-black rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES CATALOG MANAGEMENT */}
        {activeTab === 'services' && (
          <div id="admin-tab-services" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                {currentLang === 'en' ? 'Manage Services Catalog' : 'Administrar Catálogo de Servicios'}
              </h3>
              <button
                onClick={() => handleEditServiceClick('new')}
                className="flex items-center space-x-1.5 px-4 py-2 bg-[#D4AF37] hover:bg-[#C9A227] text-black font-extrabold rounded-xl text-xs"
              >
                <Plus className="h-4 w-4" />
                <span>{t.addServiceBtn}</span>
              </button>
            </div>

            {/* Service Edit/Add modal inline */}
            {isEditingService && (
              <form onSubmit={handleSaveService} className="bg-[#161616] border border-[#D4AF37]/30 p-6 rounded-2xl space-y-4">
                <h4 className="text-sm font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  {isEditingService === 'new' ? 'CREATE SERVICE' : 'EDIT SERVICE'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.serviceNameEn}</label>
                    <input
                      type="text"
                      required
                      value={editNameEn}
                      onChange={(e) => setEditNameEn(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.serviceNameEs}</label>
                    <input
                      type="text"
                      required
                      value={editNameEs}
                      onChange={(e) => setEditNameEs(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.servicePrice}</label>
                    <input
                      type="number"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.serviceDuration}</label>
                    <input
                      type="number"
                      required
                      value={editDuration}
                      onChange={(e) => setEditDuration(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.serviceCategory}</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="Haircuts">Haircuts</option>
                      <option value="Beard Grooming">Beard Grooming</option>
                      <option value="Hair Coloring">Hair Coloring</option>
                      <option value="Hair Treatments">Hair Treatments</option>
                      <option value="Women's Hair Services">Women's Hair Services</option>
                      <option value="Kids Haircuts">Kids Haircuts</option>
                      <option value="Premium Packages">Premium Packages</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.serviceDescEn}</label>
                    <textarea
                      value={editDescEn}
                      onChange={(e) => setEditDescEn(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/60 block mb-1">{t.serviceDescEs}</label>
                    <textarea
                      value={editDescEs}
                      onChange={(e) => setEditDescEs(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingService(null)}
                    className="px-4 py-2 border border-white/10 hover:border-white/20 text-white rounded-lg text-xs"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#C9A227] text-black font-extrabold rounded-lg text-xs"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </form>
            )}

            {/* List catalog in table */}
            <div className="bg-[#121212]/90 border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs font-mono text-white/60">
                    <th className="p-4">Name (EN/ES)</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {services.map(s => (
                    <tr key={s.id} className="hover:bg-white/[0.01]">
                      <td className="p-4">
                        <span className="font-bold text-white block">{s.name.en}</span>
                        <span className="text-xs text-[#D1D5DB]/50 block italic">{s.name.es}</span>
                      </td>
                      <td className="p-4 text-xs font-mono">{s.category}</td>
                      <td className="p-4 font-mono font-bold text-[#D4AF37]">RD$ {s.price}</td>
                      <td className="p-4 font-mono">{s.duration} mins</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => handleEditServiceClick(s)}
                            className="p-1.5 bg-white/5 border border-white/10 text-white hover:text-[#D4AF37] rounded-lg transition-all"
                            title={t.editServiceBtn}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 bg-white/5 border border-white/10 text-white/50 hover:bg-red-500 hover:text-black rounded-lg transition-all"
                            title={t.deleteServiceBtn}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SEO MANAGER ENGINE */}
        {activeTab === 'seo' && (
          <div id="admin-tab-seo" className="space-y-6 animate-fade-in">
            <form onSubmit={handleSaveSEO} className="bg-[#121212]/90 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                <Globe className="h-5 w-5 text-[#D4AF37]" />
                <h3 className="font-bold text-lg text-white">Local SEO & Meta Settings Engine</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    required
                    value={seoMetaTitle}
                    onChange={(e) => setSeoMetaTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1.5">Keywords (Comma Separated)</label>
                  <input
                    type="text"
                    required
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1.5">Meta Description (150-160 chars recommended)</label>
                  <textarea
                    required
                    value={seoMetaDesc}
                    onChange={(e) => setSeoMetaDesc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm resize-none"
                    rows={3}
                  />
                </div>

                <div className="border-t border-white/5 pt-6 md:col-span-2">
                  <h4 className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold mb-4">
                    Schema.org LocalBusiness Structured Data Setup
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/60 block mb-1">Business Registered Name</label>
                      <input
                        type="text"
                        required
                        value={seoName}
                        onChange={(e) => setSeoName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-white/60 block mb-1">Contact Telephone</label>
                      <input
                        type="text"
                        required
                        value={seoTel}
                        onChange={(e) => setSeoTel(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 md:col-span-2">
                  <h4 className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold mb-4">
                    {currentLang === 'en' ? 'Favicon & Open Graph (Social Sharing)' : 'Favicon y Open Graph (Compartir en Redes)'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-white/60 block mb-1">
                        {currentLang === 'en' ? 'Favicon Image URL (Square 1:1)' : 'URL del Icono Favicon (Cuadrado 1:1)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={seoFavicon}
                        onChange={(e) => setSeoFavicon(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                        placeholder="/favicon_gold_blade_1782364993074.jpg"
                      />
                      <p className="text-[10px] text-white/30 mt-1">
                        {currentLang === 'en' ? 'Provide a URL for the browser favicon (suggested 1:1 image)' : 'URL del icono para la pestaña del navegador (sugerido 1:1)'}
                      </p>
                      {seoFavicon && (
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="text-[10px] text-white/40">{currentLang === 'en' ? 'Preview:' : 'Vista previa:'}</span>
                          <img
                            src={seoFavicon}
                            alt="Favicon preview"
                            className="w-8 h-8 rounded-md bg-black border border-white/15 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/60 block mb-1">
                        {currentLang === 'en' ? 'OG Image URL (Social Share 16:9)' : 'URL de Imagen OG (Redes Sociales 16:9)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={seoOgImage}
                        onChange={(e) => setSeoOgImage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                        placeholder="/og_image_gold_blade_1782365008208.jpg"
                      />
                      <p className="text-[10px] text-white/30 mt-1">
                        {currentLang === 'en' ? 'Provide a URL for social share previews (suggested 16:9 aspect ratio)' : 'URL para las previsualizaciones al compartir en redes (sugerido 16:9)'}
                      </p>
                      {seoOgImage && (
                        <div className="mt-2 flex flex-col space-y-1">
                          <span className="text-[10px] text-white/40">{currentLang === 'en' ? 'Preview:' : 'Vista previa:'}</span>
                          <img
                            src={seoOgImage}
                            alt="OG Image preview"
                            className="w-full max-w-[200px] h-24 rounded-lg bg-black border border-white/15 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* JSON-LD preview display */}
              <div className="bg-black/60 p-4 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase font-mono text-[#D4AF37] block mb-2">Google Schema Markup Payload Preview</span>
                <pre className="text-[11px] font-mono text-green-400 overflow-x-auto select-all">
{`{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "${seoName}",
  "url": "https://goldandblade.com",
  "telephone": "${seoTel}",
  "priceRange": "$$$"
}`}
                </pre>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-[#D4AF37] hover:bg-[#C9A227] text-black font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>{t.saveBtn}</span>
                </button>
              </div>
            </form>

            {/* Form: Change Admin Credentials */}
            <form onSubmit={handleSaveCredentials} className="bg-[#121212]/90 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl mt-8">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                <ShieldAlert className="h-5 w-5 text-[#D4AF37]" />
                <h3 className="font-bold text-lg text-white">
                  {currentLang === 'en' ? 'Administrative Portal Credentials' : 'Credenciales del Portal Administrativo'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1.5">
                    {currentLang === 'en' ? 'Portal Username' : 'Usuario del Portal'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminUsername}
                    onChange={(e) => setNewAdminUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm"
                    placeholder="admin"
                  />
                  <p className="text-[11px] text-white/30 mt-1">
                    {currentLang === 'en' ? 'The username used to log in as administrator' : 'El nombre de usuario para iniciar sesión'}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-white/50 block mb-1.5">
                    {currentLang === 'en' ? 'Portal Password' : 'Contraseña del Portal'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm"
                    placeholder="goldblade2026"
                  />
                  <p className="text-[11px] text-white/30 mt-1">
                    {currentLang === 'en' ? 'The secret passcode to access this portal' : 'La clave secreta para acceder a este portal'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-[#D4AF37] hover:bg-[#C9A227] text-black font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>
                    {currentLang === 'en' ? 'Update Portal Credentials' : 'Actualizar Credenciales del Portal'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: SECURE CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div id="admin-tab-messages" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#D4AF37]" />
                <h3 className="font-bold text-lg text-white">
                  {currentLang === 'en' ? 'Secure Contact Messages' : 'Mensajes de Contacto Seguro'}
                </h3>
              </div>
              <span className="text-xs font-mono bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/20">
                {contactMessages.length} {currentLang === 'en' ? 'messages total' : 'mensajes en total'}
              </span>
            </div>

            {contactMessages.length === 0 ? (
              <div className="bg-[#121212]/90 border border-white/5 p-12 text-center rounded-3xl">
                <Mail className="h-10 w-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 text-sm">
                  {currentLang === 'en' ? 'No messages received yet.' : 'No se han recibido mensajes todavía.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-[#121212]/90 border p-6 rounded-3xl transition-all ${
                      msg.status === 'unread' ? 'border-[#D4AF37]/40 shadow-lg' : 'border-white/5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center space-x-2.5">
                          <span className="text-sm font-bold text-white">{msg.name}</span>
                          {msg.status === 'unread' && (
                            <span className="text-[9px] uppercase font-mono tracking-wider text-black bg-[#D4AF37] px-1.5 py-0.5 font-bold">
                              {currentLang === 'en' ? 'NEW' : 'NUEVO'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#D4AF37] font-mono block mt-1">{msg.phone}</span>
                      </div>
                      
                      <div className="flex flex-col sm:items-end text-left sm:text-right">
                        <span className="text-[10px] text-white/40 font-mono">
                          {new Date(msg.createdAt).toLocaleString(currentLang === 'es' ? 'es-DO' : 'en-US')}
                        </span>
                        {msg.subject && (
                          <span className="text-xs text-white/80 font-serif font-medium mt-1">
                            {currentLang === 'en' ? 'Subject:' : 'Asunto:'} <span className="text-[#D4AF37] font-sans font-light">{msg.subject}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-white/70 py-4 font-light whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="flex justify-end items-center space-x-3 pt-4 border-t border-white/5">
                      <button
                        onClick={() => toggleMessageStatus(msg.id)}
                        className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold border transition-colors flex items-center space-x-1.5 cursor-pointer ${
                          msg.status === 'unread'
                            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            : 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20'
                        }`}
                      >
                        <Check className="h-3 w-3" />
                        <span>
                          {msg.status === 'unread' 
                            ? (currentLang === 'en' ? 'Mark as Read' : 'Marcar como Leído')
                            : (currentLang === 'en' ? 'Mark as Unread' : 'Marcar como No Leído')
                          }
                        </span>
                      </button>

                      <button
                        onClick={() => deleteContactMessage(msg.id)}
                        className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 transition-colors flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>{currentLang === 'en' ? 'Delete' : 'Eliminar'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: CUSTOM SECTIONS */}
        {activeTab === 'sections' && (
          <div id="admin-tab-sections" className="space-y-8 animate-fade-in text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
              <div className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-[#D4AF37]" />
                <h3 className="font-bold text-lg">
                  {currentLang === 'en' ? 'Custom Sections & Media Content' : 'Secciones Personalizadas y Contenidos'}
                </h3>
              </div>
              <button
                onClick={() => handleStartEditSection('new')}
                className="bg-[#D4AF37] hover:bg-[#C9A227] text-black text-xs font-bold px-4 py-2 font-mono uppercase tracking-wider transition-colors flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>{currentLang === 'en' ? 'Add Section' : 'Añadir Sección'}</span>
              </button>
            </div>

            {/* FORM: Create or Edit Section */}
            {editingSectionId !== null && (
              <form onSubmit={handleSaveSection} className="bg-[#121212]/90 border border-[#D4AF37]/30 p-6 rounded-none space-y-4">
                <h4 className="font-serif text-lg text-[#D4AF37]">
                  {editingSectionId === 'new' 
                    ? (currentLang === 'en' ? 'New Page Section' : 'Nueva Sección de Página')
                    : (currentLang === 'en' ? 'Edit Page Section' : 'Editar Sección de Página')
                  }
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Title (English)' : 'Título (Inglés)'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={sectTitleEn}
                      onChange={(e) => setSectTitleEn(e.target.value)}
                      placeholder="e.g. Premium Experience"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Title (Spanish)' : 'Título (Español)'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={sectTitleEs}
                      onChange={(e) => setSectTitleEs(e.target.value)}
                      placeholder="ej. Experiencia Premium"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Subtitle (English)' : 'Subtítulo (Inglés)'}
                    </label>
                    <input
                      type="text"
                      value={sectSubtitleEn}
                      onChange={(e) => setSectSubtitleEn(e.target.value)}
                      placeholder="e.g. Experience the beauty of our lounge"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Subtitle (Spanish)' : 'Subtítulo (Español)'}
                    </label>
                    <input
                      type="text"
                      value={sectSubtitleEs}
                      onChange={(e) => setSectSubtitleEs(e.target.value)}
                      placeholder="ej. Experimenta la belleza de nuestro salón"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Display Order' : 'Orden de Visualización'}
                    </label>
                    <input
                      type="number"
                      value={sectOrder}
                      onChange={(e) => setSectOrder(parseInt(e.target.value) || 1)}
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingSectionId(null)}
                    className="border border-white/10 hover:bg-white/5 text-white text-xs font-mono px-4 py-2 uppercase tracking-wider"
                  >
                    {currentLang === 'en' ? 'Cancel' : 'Cancelar'}
                  </button>
                  <button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#C9A227] text-black text-xs font-mono font-bold px-4 py-2 uppercase tracking-wider"
                  >
                    {currentLang === 'en' ? 'Save Section' : 'Guardar Sección'}
                  </button>
                </div>
              </form>
            )}

            {/* FORM: Create or Edit Content Item */}
            {editingItemId !== null && (
              <form onSubmit={handleSaveItem} className="bg-[#121212]/90 border border-purple-500/30 p-6 rounded-none space-y-4">
                <h4 className="font-serif text-lg text-purple-400">
                  {editingItemId === 'new'
                    ? (currentLang === 'en' ? 'New Section Content (Image, Video or Text)' : 'Nuevo Contenido (Imagen, Video o Texto)')
                    : (currentLang === 'en' ? 'Edit Section Content' : 'Editar Contenido')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Content Type' : 'Tipo de Contenido'}
                    </label>
                    <select
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value as any)}
                      className="w-full bg-[#121212] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="image">{currentLang === 'en' ? '🖼️ Image' : '🖼️ Imagen'}</option>
                      <option value="video">{currentLang === 'en' ? '🎥 Video Link' : '🎥 Video (Youtube/MP4)'}</option>
                      <option value="text">{currentLang === 'en' ? '📝 Text Block' : '📝 Solo Texto'}</option>
                    </select>
                  </div>

                  {itemType !== 'text' && (
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                        {itemType === 'video' 
                          ? (currentLang === 'en' ? 'Video URL (YouTube embed or direct mp4)' : 'URL del Video (YouTube o link directo)')
                          : (currentLang === 'en' ? 'Image URL (Unsplash or web address)' : 'URL de la Imagen')
                        } *
                      </label>
                      <input
                        type="url"
                        required
                        value={itemMediaUrl}
                        onChange={(e) => setItemMediaUrl(e.target.value)}
                        placeholder={itemType === 'video' ? "https://www.youtube.com/embed/..." : "https://images.unsplash.com/..."}
                        className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Title/Heading (English)' : 'Título (Inglés)'}
                    </label>
                    <input
                      type="text"
                      value={itemTitleEn}
                      onChange={(e) => setItemTitleEn(e.target.value)}
                      placeholder="e.g. VIP Bar and Lounge"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Title/Heading (Spanish)' : 'Título (Español)'}
                    </label>
                    <input
                      type="text"
                      value={itemTitleEs}
                      onChange={(e) => setItemTitleEs(e.target.value)}
                      placeholder="ej. Bar y Lounge VIP"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Description (English)' : 'Descripción (Inglés)'}
                    </label>
                    <textarea
                      rows={3}
                      value={itemDescEn}
                      onChange={(e) => setItemDescEn(e.target.value)}
                      placeholder="e.g. Complimentary drinks with premium whiskeys while waiting for your stylist."
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#D1D5DB]/50 mb-1.5 block">
                      {currentLang === 'en' ? 'Description (Spanish)' : 'Descripción (Español)'}
                    </label>
                    <textarea
                      rows={3}
                      value={itemDescEs}
                      onChange={(e) => setItemDescEs(e.target.value)}
                      placeholder="ej. Bebidas de cortesía con whiskeys premium mientras esperas a tu estilista."
                      className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingItemId(null)}
                    className="border border-white/10 hover:bg-white/5 text-white text-xs font-mono px-4 py-2 uppercase tracking-wider"
                  >
                    {currentLang === 'en' ? 'Cancel' : 'Cancelar'}
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold px-4 py-2 uppercase tracking-wider"
                  >
                    {currentLang === 'en' ? 'Save Content' : 'Guardar Contenido'}
                  </button>
                </div>
              </form>
            )}

            {/* SECTIONS LIST */}
            {customSections.length === 0 ? (
              <div className="bg-[#121212]/90 border border-white/5 p-12 text-center rounded-none">
                <Layers className="h-10 w-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 text-sm">
                  {currentLang === 'en' ? 'No custom sections created yet.' : 'No se han creado secciones personalizadas todavía.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {[...customSections]
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((sec, index) => (
                    <div
                      key={sec.id}
                      className="bg-[#121212]/90 border border-white/5 p-6 space-y-4 rounded-none"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-3 gap-4">
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-0.5">
                              {currentLang === 'en' ? 'Section' : 'Sección'} {sec.order}
                            </span>
                            <h4 className="font-serif text-lg font-medium text-white">
                              {currentLang === 'en' ? sec.titleEn : sec.titleEs}
                            </h4>
                          </div>
                          <span className="text-xs text-white/40 block mt-1">
                            {currentLang === 'en' ? sec.subtitleEn : sec.subtitleEs}
                          </span>
                        </div>

                        {/* Section Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleMoveSection(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/5 text-white/80 transition-colors"
                            title={currentLang === 'en' ? 'Move Up' : 'Mover Arriba'}
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveSection(index, 'down')}
                            disabled={index === customSections.length - 1}
                            className="p-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/5 text-white/80 transition-colors"
                            title={currentLang === 'en' ? 'Move Down' : 'Mover Abajo'}
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleStartEditSection(sec)}
                            className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-colors flex items-center space-x-1 font-mono"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>{currentLang === 'en' ? 'Edit' : 'Editar'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSection(sec.id)}
                            className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-400 transition-colors flex items-center space-x-1 font-mono"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>{currentLang === 'en' ? 'Delete' : 'Eliminar'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Items Management for this Section */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#D1D5DB]/40 font-bold">
                            {currentLang === 'en' ? 'Content Items' : 'Elementos de Contenido'} ({sec.items?.length || 0})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStartEditItem(sec.id, 'new')}
                            className="text-[10px] font-mono text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 border border-purple-500/20 bg-purple-500/5 px-2 py-1"
                          >
                            <Plus className="h-3 w-3" />
                            <span>{currentLang === 'en' ? 'Add Image/Video' : 'Añadir Imagen/Video/Texto'}</span>
                          </button>
                        </div>

                        {sec.items && sec.items.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sec.items.map(item => (
                              <div
                                key={item.id}
                                className="bg-[#181818] border border-white/5 p-4 flex flex-col justify-between rounded-none group"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                    <span className="text-[9px] uppercase font-mono tracking-widest text-purple-400 flex items-center space-x-1">
                                      {item.type === 'video' && <Video className="h-3 w-3 inline mr-1" />}
                                      {item.type === 'image' && <ImageIcon className="h-3 w-3 inline mr-1" />}
                                      {item.type === 'text' && <FileText className="h-3 w-3 inline mr-1" />}
                                      <span>{item.type}</span>
                                    </span>
                                    <div className="flex items-center space-x-1.5">
                                      <button
                                        type="button"
                                        onClick={() => handleStartEditItem(sec.id, item)}
                                        className="text-white/40 hover:text-[#D4AF37] transition-colors"
                                        title="Edit Item"
                                      >
                                        <Edit3 className="h-3 w-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteItem(sec.id, item.id)}
                                        className="text-white/40 hover:text-red-400 transition-colors"
                                        title="Delete Item"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Media Thumbnail */}
                                  {item.type !== 'text' && item.mediaUrl && (
                                    <div className="aspect-video w-full mb-3 overflow-hidden border border-white/10 bg-black">
                                      {item.type === 'image' ? (
                                        <img
                                          src={item.mediaUrl}
                                          alt={item.titleEn}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-white/40 bg-black/60 relative">
                                          <Play className="h-6 w-6 text-white/50 absolute" />
                                          <span className="mt-8 font-mono text-[9px] truncate max-w-[150px]">{item.mediaUrl}</span>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  <h5 className="font-serif text-sm text-white font-medium mb-1 truncate">
                                    {currentLang === 'en' ? item.titleEn : item.titleEs}
                                  </h5>
                                  <p className="text-xs text-white/50 font-light line-clamp-2 leading-relaxed">
                                    {currentLang === 'en' ? item.descEn : item.descEs}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-xs text-white/30 border border-dashed border-white/10 italic">
                            {currentLang === 'en' ? 'No contents added. Click the button above to add images or videos.' : 'No hay contenidos. Haz clic en el botón de arriba para añadir imágenes o videos.'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
