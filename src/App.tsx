import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ArrowUpRight, Search, Globe, Plus, Sparkles, Layout, 
  ShoppingBag, Settings, Menu, X, ChevronRight, ChevronDown, Check,
  Monitor, Smartphone, Play, Palette, DollarSign, Calendar, Sliders,
  BarChart2, RefreshCw, ShoppingCart, User, Users, Lock, ChevronLeft, CreditCard, Star
} from 'lucide-react';

// --- DATA DEFINITIONS & STATIC ASSETS ---

const POPULAR_TEMPLATES = [
  {
    id: 'palo-alto',
    name: 'Palo Alto',
    category: 'Architecture & Design',
    colorPreset: '#ece8e1',  // Linen White
    accentColor: '#1e3a8a',
    bgFill: 'bg-[#f4f1eb]',
    textFill: 'text-[#1c1917]',
    headline: 'Spaces that tell a story.',
    description: 'A structural, clean portfolio designed for architects and modern design studios.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
    author: 'Studio Palo Alto'
  },
  {
    id: 'hester',
    name: 'Hester',
    category: 'Organic Fine Pottery',
    colorPreset: '#fff7ed',  // Warm Sand
    accentColor: '#c2410c',
    bgFill: 'bg-[#fafaf9]',
    textFill: 'text-[#292524]',
    headline: 'Alchemy of clay and fire.',
    description: 'An organic, earth-toned retail storefront designed for independent clay artists.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop',
    author: 'Nora Clay'
  },
  {
    id: 'faro',
    name: 'Faro',
    category: 'Artisanal Bakery & Cafe',
    colorPreset: '#fdf2f8',  // Rose Petal
    accentColor: '#db2777',
    bgFill: 'bg-[#fff5f5]',
    textFill: 'text-[#4a1d1d]',
    headline: 'Wild yeast, baked slowly.',
    description: 'A warm, editorial showcase template with built-in online ordering and cafe details.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    author: 'Faro Bakery'
  },
  {
    id: 'balboa',
    name: 'Balboa',
    category: 'Luxury Apparel Brand',
    colorPreset: '#0f172a',  // Midnight Space
    accentColor: '#a855f7',
    bgFill: 'bg-[#090d16]',
    textFill: 'text-[#f8fafc]',
    headline: 'Design a standard, set a standard.',
    description: 'A bold, cinematic dark template with huge visual containers and full-bleed parallax grids.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
    author: 'Balboa Atelier'
  }
];

const COLOR_PALETTES = [
  { name: 'Alabaster Clean', bg: 'bg-[#faf9f6]', text: 'text-[#111111]', border: 'border-neutral-200', accent: '#000000', label: 'Neutral Light' },
  { name: 'Charcoal Modern', bg: 'bg-[#18181b]', text: 'text-[#ffffff]', border: 'border-neutral-800', accent: '#f43f5e', label: 'Deep Crimson Slate' },
  { name: 'Forest Moss', bg: 'bg-[#fafdf9]', text: 'text-[#1b3022]', border: 'border-emerald-100', accent: '#15803d', label: 'Organic Emerald' },
  { name: 'Tangerine Sunset', bg: 'bg-[#fffbeb]', text: 'text-[#451a03]', border: 'border-amber-200', accent: '#f59e0b', label: 'Amber Indigo' }
];

const DOMAIN_EXTENSIONS = [
  { ext: '.com', price: '$12', status: 'Available', badge: 'Popular', color: 'bg-indigo-50 text-indigo-700' },
  { ext: '.design', price: '$20', status: 'Available', badge: 'Professional', color: 'bg-emerald-50 text-emerald-700' },
  { ext: '.shop', price: '$15', status: 'Available', badge: 'Ecommerce', color: 'bg-amber-50 text-amber-700' },
  { ext: '.online', price: '$9', status: 'Available', badge: 'Promo Price', color: 'bg-rose-50 text-rose-700' },
  { ext: '.net', price: '$14', status: 'Available', badge: 'Premium', color: 'bg-neutral-100 text-neutral-800' }
];

const VIDEO_PRESETS = [
  {
    id: 'abstract-lines',
    name: 'Neural Abstract',
    url: 'https://drive.google.com/file/d/1ShlWnpH6RJkYfyfs0QufvCXBsykgveZI/preview'
  },
  {
    id: 'circuit-flow',
    name: 'Circuit Grid',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-electronic-circuit-board-with-glowing-lines-41804-large.mp4'
  },
  {
    id: 'cyberpunk-matrix',
    name: 'Matrix Data Stream',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-matrix-style-green-code-running-43751-large.mp4'
  }
];

// Helper to extract Google Drive file ID and format for preview embedding
const getGoogleDriveEmbedUrl = (url: string) => {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : '1ShlWnpH6RJkYfyfs0QufvCXBsykgveZI';
  return `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}`;
};

const isGoogleDriveUrl = (url: string) => {
  return url.includes('drive.google.com') || url.includes('docs.google.com');
};

// --- APPLET IMPLEMENTATION ---

export default function App() {
  // Navigation states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState(VIDEO_PRESETS[0]);

  // Customizer Platform (Fluid Engine Sandbox) States
  const [selectedTemplate, setSelectedTemplate] = useState(POPULAR_TEMPLATES[0]);
  const [currentPalette, setCurrentPalette] = useState(COLOR_PALETTES[0]);
  const [customTitle, setCustomTitle] = useState(selectedTemplate.headline);
  const [gridBlocks, setGridBlocks] = useState<Array<{ id: string, type: string, text: string, order: number }>>([
    { id: '1', type: 'image', text: 'Overlay Splash', order: 1 },
    { id: '2', type: 'text', text: 'Explore our latest structural collection available now online.', order: 2 },
    { id: '3', type: 'button', text: 'E-Store Catalog', order: 3 }
  ]);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [notification, setNotification] = useState<string | null>(null);

  // Sell Anything Dashboard State
  const [sellCategory, setSellCategory] = useState<'physical' | 'memberships' | 'bookings'>('physical');
  const [productColor, setProductColor] = useState<string>('Oatmeal Raw');
  const [productCount, setProductCount] = useState<number>(1);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartItems, setCartItems] = useState<Array<{ name: string, price: number, qty: number }>>([]);
  const [showInvoice, setShowInvoice] = useState(false);

  // Domain searcher states
  const [domainQuery, setDomainQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Array<{ ext: string, domain: string, price: string, status: string, claimed: boolean }>>([]);
  const [isSearching, setIsSearching] = useState(false);

  // AI Onboarding design states
  const [aiBrandName, setAiBrandName] = useState('');
  const [aiIndustry, setAiIndustry] = useState('Personal Brand');
  const [aiTone, setAiTone] = useState('Sophisticated');
  const [aiGeneratedMock, setAiGeneratedMock] = useState<any | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Triggering visual notice helpers
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Sync title on template change
  useEffect(() => {
    setCustomTitle(selectedTemplate.headline);
  }, [selectedTemplate]);

  // Set up window scroll listener for sticky/transparent header transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mock domain searching
  const handleDomainSearch = () => {
    if (!domainQuery) return;
    setIsSearching(true);
    const cleanQuery = domainQuery.replace(/\s+/g, '').toLowerCase().replace(/\.[a-zA-Z]+$/, '');
    
    setTimeout(() => {
      const results = DOMAIN_EXTENSIONS.map(item => ({
        ext: item.ext,
        domain: `${cleanQuery}${item.ext}`,
        price: item.price,
        status: 'Available',
        claimed: false
      }));
      setSearchResult(results);
      setIsSearching(false);
      triggerNotification('Domain extensions analyzed successfully.');
    }, 800);
  };

  // Build AI Template mock
  const generateAITemplate = () => {
    if (!aiBrandName) {
      triggerNotification('Please provide a brand name to continue.');
      return;
    }
    setIsGeneratingAI(true);
    setTimeout(() => {
      setAiGeneratedMock({
        brand: aiBrandName,
        industry: aiIndustry,
        tone: aiTone,
        title: aiTone === 'Sophisticated' ? `Redefining ${aiBrandName} elegance.` : aiTone === 'Minimal' ? `Pure ${aiBrandName} structure.` : `Savoring ${aiBrandName} craft.`,
        subtitle: `Artfully designed to capture modern audiences in the ${aiIndustry} space.`,
        bg: aiTone === 'Sophisticated' ? 'bg-[#18181b]' : aiTone === 'Minimal' ? 'bg-[#faf9f6]' : 'bg-[#fffbeb]',
        text: aiTone === 'Sophisticated' ? 'text-white' : aiTone === 'Minimal' ? 'text-neutral-900' : 'text-[#451a03]',
        accent: aiTone === 'Sophisticated' ? 'border-[#db2777] text-[#db2777]' : 'border-black text-black'
      });
      setIsGeneratingAI(false);
      triggerNotification(`Created customized Blueprint for ${aiBrandName}!`);
    }, 1200);
  };

  // Drag-and-drop / Grid Blocks rearrangement simulation
  const cycleBlockOrder = (id: string) => {
    setGridBlocks(prev => {
      return prev.map(block => {
        if (block.id === id) {
          const nextOrder = (block.order % 3) + 1;
          return { ...block, order: nextOrder };
        }
        return block;
      }).sort((a,b) => a.order - b.order);
    });
    triggerNotification("Fluid Engine grid alignment dynamic shift!");
  };

  const addGridBlock = () => {
    const types = ['newsletter', 'benefit', 'social'];
    const labels = [
      { type: 'newsletter', text: 'Subscribe to newsletter container' },
      { type: 'benefit', text: 'Free shipping on orders above $100' },
      { type: 'social', text: 'Follow our digital process @Instagram' }
    ];
    const rawChoice = types[Math.floor(Math.random() * types.length)];
    const chosen = labels.find(l => l.type === rawChoice)!;

    setGridBlocks(prev => [
      ...prev,
      { id: Date.now().toString(), type: chosen.type, text: chosen.text, order: prev.length + 1 }
    ]);
    triggerNotification("Added custom Fluid Engine layout container.");
  };

  // Add items to virtual invoice cart
  const addToCart = (product: string, price: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product);
      if (existing) {
        return prev.map(item => item.name === product ? { ...item, qty: item.qty + productCount } : item);
      }
      return [...prev, { name: product, price, qty: productCount }];
    });
    setCartTotal(prev => prev + (price * productCount));
    triggerNotification(`Added ${productCount}x ${product} to your build config.`);
    setShowInvoice(true);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 font-sans tracking-tight select-none">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[9999] bg-neutral-950 text-white px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 border border-neutral-800 text-sm font-medium tracking-wide"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREMIUM NAVBAR NAVIGATION --- */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-white/10 text-white shadow-xl py-1' 
          : 'bg-transparent text-white border-none py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Authentic HARISYNC Wordmark with SVG logo */}
          <div className="flex items-center gap-12">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <svg className="w-6.5 h-6.5 text-[#a78bfa] fill-none stroke-current shrink-0 mr-1" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12a8 8 0 0 1 14.54-4.5" />
                <path d="M20 12a8 8 0 0 1-14.54 4.5" />
                <path d="M18 4v4h-4" />
                <path d="M6 20v-4h4" />
                <circle cx="12" cy="12" r="2.2" className="fill-current text-[#a78bfa]" />
              </svg>
              <span className="text-base font-extrabold tracking-[0.25em] uppercase text-white font-sans">
                HARISYNC
              </span>
            </div>

            {/* Flat navigation menus, styled with hover dropdowns */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold tracking-wider text-white/90">
              
              {/* PRODUCTS */}
              <div 
                className="relative cursor-pointer py-2 hover:text-white flex items-center gap-1 uppercase"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Products <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-10 left-0 w-80 bg-neutral-900 border border-white/10 p-6 rounded-none shadow-2xl text-left z-50 text-white"
                    >
                      <div>
                        <span className="font-extrabold text-[10px] text-neutral-400 uppercase tracking-widest block mb-3">CREATE & TRANSACT</span>
                        <div className="grid gap-2 text-sm text-neutral-300 font-normal">
                          <a href="#customizer" className="hover:text-white py-1 transition-colors flex justify-between items-center group">
                            <span>Fluid Engine Website Editor</span>
                            <span className="bg-white/10 text-[9px] px-1.5 py-0.5 font-bold uppercase rounded text-white font-mono">v7.1 Live</span>
                          </a>
                          <a href="#sell-anything" className="hover:text-white py-1 transition-colors">Advanced Commerce Engine</a>
                          <a href="#sell-anything" className="hover:text-white py-1 transition-colors">Scheduling & Bookings</a>
                          <a href="#domains" className="hover:text-white py-1 transition-colors">Custom Domain Registration</a>
                          <a href="#ai-builder" className="hover:text-white py-1 transition-colors">Blueprint AI Studio</a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SOLUTIONS */}
              <div 
                className="relative cursor-pointer py-2 hover:text-white flex items-center gap-1 uppercase"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Solutions <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-10 left-0 w-80 bg-neutral-900 border border-white/10 p-6 rounded-none shadow-2xl text-left z-50 text-white"
                    >
                      <div>
                        <span className="font-extrabold text-[10px] text-neutral-400 uppercase tracking-widest block mb-3">Tailored Solutions</span>
                        <div className="grid gap-2.5 text-sm text-neutral-300 font-normal">
                          <a href="#sell-anything" className="hover:text-white py-0.5 transition-colors block">Online Retail Storefronts</a>
                          <a href="#customizer" className="hover:text-white py-0.5 transition-colors block">Bespoke Creative Portfolios</a>
                          <a href="#customizer" className="hover:text-white py-0.5 transition-colors block">Independent Clay Artists</a>
                          <a href="#customizer" className="hover:text-white py-0.5 transition-colors block">Artisanal Cafes & Services</a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RESOURCES */}
              <div 
                className="relative cursor-pointer py-2 hover:text-white flex items-center gap-1 uppercase"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Resources <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-10 left-0 w-80 bg-neutral-900 border border-white/10 p-6 rounded-none shadow-2xl text-left z-50 text-white"
                    >
                      <div>
                        <span className="font-extrabold text-[10px] text-neutral-400 uppercase tracking-widest block mb-3">Design Tools & Help</span>
                        <div className="grid gap-2 text-sm text-neutral-300 font-normal">
                          <a href="#customizer" className="hover:text-white py-0.5 transition-colors block">Interactive Live Sandbox</a>
                          <a href="#domains" className="hover:text-white py-0.5 transition-colors block">Global DNS Management</a>
                          <a href="#ai-builder" className="hover:text-white py-0.5 transition-colors block">Harisync AI Blueprints</a>
                          <a href="#invoice" className="hover:text-white py-0.5 transition-colors block">Configuration Invoicing</a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </nav>
          </div>

          {/* Call to Actions (Right Side) */}
          <div className="flex items-center gap-6">

            <a 
              href="#customizer" 
              className="bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-[13px] tracking-wider uppercase px-6 py-3.5 rounded-none transition-all duration-200"
            >
              GET STARTED
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-white hover:opacity-85"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-neutral-950 border-t border-white/10 absolute w-full left-0 overflow-hidden shadow-2xl text-white"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-lg font-medium">
                <a onClick={() => setMobileMenuOpen(false)} href="#customizer" className="hover:text-neutral-300">Fluid Engine Playground</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#domains" className="hover:text-neutral-300">Domain Registration</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#sell-anything" className="hover:text-neutral-300">Sell Products & Bookings</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#ai-builder" className="hover:text-indigo-300 text-indigo-400 flex items-center gap-2">
                  Blueprint AI Platform <Sparkles size={16} className="animate-bounce" />
                </a>
                <hr className="border-white/10 py-1" />
                <div className="flex flex-col gap-4">
                  <a href="#invoice" className="flex items-center gap-2 text-sm text-neutral-300 pb-2">
                    <ShoppingCart size={18} /> View Workspace Build Cart
                  </a>
                  <a href="#customizer" className="bg-white text-black text-center py-4 uppercase text-xs tracking-widest font-black rounded-none">
                    GET STARTED
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO CORE BANNER --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white select-none">
        
        {/* Dynamic Looping Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#050505]">
          {isGoogleDriveUrl(activeVideo.url) ? (
            <div className="absolute inset-0 w-full h-full opacity-40 scale-[1.3] pointer-events-none">
              <iframe
                src={getGoogleDriveEmbedUrl(activeVideo.url)}
                className="w-full h-full border-0 pointer-events-none"
                allow="autoplay; encrypted-media"
                referrerPolicy="no-referrer"
                style={{ pointerEvents: 'none' }}
                title="HariSync Dynamic Loop"
              />
            </div>
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              key={activeVideo.url}
              className="absolute inset-0 w-full h-full object-cover opacity-50 scale-[1.01] transition-opacity duration-700"
            >
              <source src={activeVideo.url} type="video/mp4" />
              <source src="https://assets.mixkit.co/videos/preview/mixkit-tech-abstract-loop-of-connecting-lines-and-dots-41819-large.mp4" type="video/mp4" />
            </video>
          )}
          {/* Aesthetic Overlay Gradient */}
          <div className="absolute inset-0 bg-black/65 z-[1]" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent z-[1]" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/50 to-transparent z-[1]" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 text-center w-full flex flex-col justify-between min-h-[85vh]">
          <div className="my-auto">

            {/* Squarespace Core Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="font-sans text-5xl md:text-7xl lg:text-[85px] font-light tracking-tight leading-[1.05] max-w-3xl mx-auto mb-12"
            >
              A website <br />
              makes it real.
            </motion.h1>

            {/* Core GET STARTED Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <a 
                href="#customizer" 
                className="bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-sm tracking-widest uppercase px-10 py-5 rounded-none transition-all hover:scale-[1.02] duration-200"
              >
                GET STARTED
              </a>
              
              <p className="text-white/60 text-[11px] font-mono uppercase tracking-[0.2em] mt-2">
                Start for free. No credit card required.
              </p>
            </motion.div>
          </div>

          {/* Clean and Balanced Quick Info footer inside Hero Section */}
          <div className="mt-16 pt-8 border-t border-white/10 max-w-3xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center justify-center">
              <div>
                <p className="font-sans text-2xl font-light text-white leading-none">#1</p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-2">Design Platform Choice</p>
              </div>
              <div>
                <p className="font-sans text-2xl font-light text-white leading-none">100%</p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-2">Responsive Fluid Control</p>
              </div>
              <div>
                <p className="font-sans text-2xl font-light text-white leading-none">E-Store</p>
                <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-2">Multi-Vendor Integration</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2: DYNAMIC CUSTOMIZER STUDIO (FLUID ENGINE PLAYGROUND) --- */}
      <section id="customizer" className="py-20 lg:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-neutral-500 tracking-[0.3em] uppercase block mb-4">STUDIO PLAYGROUND</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
                Design with the <span className="italic">Fluid Engine.</span>
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                Try out our interactive website builder sandbox below. Pick beautiful template starters, select luxury styling colors, tweak headlines, and simulate modifying grid blocks real-time.
              </p>

              {/* LIVE CUSTOMIZER CONTROLLER PANEL */}
              <div className="bg-white border border-neutral-200/80 rounded-xl p-6 shadow-md space-y-6">
                <div>
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-3">1. Select Luxury Template Starter</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {POPULAR_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          setSelectedTemplate(tpl);
                          triggerNotification(`Loaded structural design of ${tpl.name}!`);
                        }}
                        className={`p-3 text-left border rounded-lg transition-all flex items-center gap-2 ${selectedTemplate.id === tpl.id ? 'border-neutral-900 bg-neutral-50 font-bold' : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'}`}
                      >
                        <Layout size={14} className="text-neutral-500" />
                        <span className="text-xs">{tpl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-3">2. Choose Theme Palette</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {COLOR_PALETTES.map((pt) => (
                      <button
                        key={pt.name}
                        onClick={() => {
                          setCurrentPalette(pt);
                          triggerNotification(`Applied theme colorway: ${pt.name}`);
                        }}
                        className={`p-3 text-left border rounded-lg transition-all flex flex-col gap-1 ${currentPalette.name === pt.name ? 'border-neutral-900 bg-neutral-50 font-bold' : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'}`}
                      >
                        <span className="text-xs font-semibold">{pt.name}</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-3.5 h-3.5 rounded-full border border-neutral-300 ${pt.bg}`} />
                          <div className="text-[10px] text-neutral-400 uppercase font-mono">{pt.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-2">3. Edit Mock Header Text</label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter customized slogan..."
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">4. Fluid Engine Elements ({gridBlocks.length})</label>
                    <button 
                      onClick={addGridBlock}
                      className="text-[11px] font-mono uppercase tracking-wide text-indigo-700 hover:underline flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Container block
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 mb-3">Click on any container inside the builder device frame to simulate alignment grid repositioning.</p>
                  
                  <div className="space-y-1.5">
                    {gridBlocks.map(block => (
                      <div 
                        key={block.id}
                        onClick={() => cycleBlockOrder(block.id)}
                        className="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 p-2.5 rounded-md cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2 text-neutral-700">
                          <div className="w-4 h-4 rounded-full bg-neutral-200 text-[10px] font-mono flex items-center justify-center font-bold text-neutral-600">
                            {block.order}
                          </div>
                          <span className="capitalize font-mono text-[11px] text-neutral-500">[{block.type}]</span>
                          <span className="truncate max-w-[170px] text-neutral-900">{block.text}</span>
                        </div>
                        <Sliders size={12} className="text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE THEME DEVICE DISPLAY PREVIEW */}
            <div className="lg:col-span-7">
              <div className="sticky top-24">
                
                {/* Viewport controls */}
                <div className="flex items-center justify-between mb-4 bg-white/40 p-1.5 rounded-lg border border-neutral-200/50 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-neutral-400 ml-2">Device preview: {selectedTemplate.name} Studio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewMode('desktop')}
                      className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
                      title="Desktop View"
                    >
                      <Monitor size={15} />
                    </button>
                    <button
                      onClick={() => setViewMode('mobile')}
                      className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
                      title="Mobile View"
                    >
                      <Smartphone size={15} />
                    </button>
                  </div>
                </div>

                {/* Main frame display container */}
                <motion.div 
                  layout
                  className={`mx-auto bg-white border border-neutral-200 shadow-2xl overflow-hidden transition-all duration-500 ${viewMode === 'desktop' ? 'w-full rounded-xl aspect-[16/10]' : 'w-[320px] rounded-[24px] aspect-[9/16] border-[8px] border-neutral-900'}`}
                >
                  {/* Web Frame Header Bar */}
                  <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px]">
                      <Globe size={11} />
                      <span className="truncate max-w-[200px]">https://www.{selectedTemplate.name.toLowerCase()}.harisync.com</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-200 px-2 py-0.5 rounded uppercase">Built with 7.1</span>
                  </div>

                  {/* Web Page Frame Interior (Live Customizer Output) */}
                  <div className={`w-full h-full overflow-y-auto p-8 relative flex flex-col justify-between transition-colors duration-500 ${currentPalette.bg} ${currentPalette.text}`}>
                    
                    {/* Interior Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-300/30">
                      <span className="font-serif italic font-bold tracking-tight text-lg">{selectedTemplate.name} Design</span>
                      <div className="flex gap-4 text-[11px] uppercase tracking-wider font-semibold opacity-80">
                        <span>Studio</span>
                        <span>Inventory</span>
                        <span>Inquiries</span>
                      </div>
                    </div>

                    {/* Interior Hero Content Area */}
                    <div className="my-auto py-8">
                      <div className={`${viewMode === 'desktop' ? 'grid grid-cols-12 gap-8 items-center' : 'space-y-6'}`}>
                        
                        <div className={`${viewMode === 'desktop' ? 'col-span-7 text-left' : 'text-center'}`}>
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block mb-2">{selectedTemplate.category}</span>
                          <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight mb-4 break-words">
                            {customTitle}
                          </h3>
                          <p className="text-xs opacity-75 max-w-md leading-relaxed mb-6">
                            {selectedTemplate.description}
                          </p>
                          <button 
                            style={{ backgroundColor: currentPalette.accent }}
                            onClick={() => triggerNotification(`Simulated checkout for ${selectedTemplate.name}!`)}
                            className="text-white text-xs px-6 py-3 font-semibold uppercase tracking-wider shadow-md hover:opacity-90 inline-flex items-center gap-2 transition-opacity"
                          >
                            Explore Collection <ArrowRight size={12} />
                          </button>
                        </div>

                        {/* Image overlay box */}
                        <div className={`${viewMode === 'desktop' ? 'col-span-5' : 'w-full'}`}>
                          <div className={`relative rounded-lg overflow-hidden border ${currentPalette.border} shadow-lg aspect-[4/3]`}>
                            <img 
                              src={selectedTemplate.image} 
                              alt="Template Visual"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-black text-[9px] font-mono font-bold px-2 py-1 rounded">
                              Preset Alpha
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Dynaimc Fluid Grid Blocks Simulator container */}
                      <div className="mt-12 pt-8 border-t border-neutral-300/20">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block mb-4">Fluid Engine Grid Align: Active Draft</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {gridBlocks.map((block) => (
                            <motion.div
                              layout
                              key={block.id}
                              onClick={() => cycleBlockOrder(block.id)}
                              className={`p-4 border rounded-xl relative hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group flex flex-col justify-between ${currentPalette.border} bg-black/5`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-mono text-[9px] uppercase opacity-55">[{block.type}]</span>
                                <span className="font-bold text-[9px] bg-neutral-200/50 text-neutral-700 px-1.5 py-0.5 rounded">Grid #{block.order}</span>
                              </div>
                              <p className="text-xs font-light leading-relaxed">{block.text}</p>
                              
                              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                <span className="bg-indigo-600 text-white text-[9px] px-2 py-1 flex items-center gap-1 rounded font-mono">
                                  <Sliders size={8} /> Align Shift
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Interior Footer */}
                    <div className="pt-8 border-t border-neutral-300/20 flex flex-col sm:flex-row items-center justify-between text-[10px] opacity-60">
                      <span>&copy; {selectedTemplate.author} Co. Hosted on Harisync.</span>
                      <div className="flex gap-4 mt-2 sm:mt-0">
                        <span>Privacy Policy</span>
                        <span>Terms</span>
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* Bottom Frame helper triggers */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={() => {
                      setSelectedTemplate(POPULAR_TEMPLATES[Math.floor(Math.random() * POPULAR_TEMPLATES.length)]);
                      triggerNotification("Randomized Base Theme!");
                    }}
                    className="bg-white hover:bg-neutral-100 text-neutral-800 text-xs px-4 py-2 border border-neutral-200 font-medium tracking-wide flex items-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw size={12} /> Shuffle Theme template
                  </button>
                  <button 
                    onClick={() => triggerNotification("Design draft configured! Add to plan subscription above.")}
                    className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs px-5 py-2.5 font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    <Check size={12} /> Pick Hester & Continue
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 3: DOMAINS SEARCH CHECKER ENGINE --- */}
      <section id="domains" className="py-20 bg-neutral-950 text-white relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs text-indigo-400 tracking-[0.3em] uppercase block mb-4">DOMAIN SERVICE REGISTRY</span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-5">
              Claim <span className="italic">your corner</span> of the internet.
            </h2>
            <p className="text-neutral-400 font-light">
              Enter your preferred brand name or web title. We will inspect availability across popular luxury extensions and offer real-time registration pricing.
            </p>
          </div>

          {/* Interactive domain search input form */}
          <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-none flex items-center max-w-2xl mx-auto mb-8 shadow-2xl">
            <div className="pl-3.5 text-neutral-500">
              <Globe size={18} />
            </div>
            <input
              type="text"
              value={domainQuery}
              onChange={(e) => setDomainQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDomainSearch()}
              className="w-full bg-transparent border-0 ring-0 outline-none text-white px-3.5 py-3 text-base placeholder:text-neutral-600 focus:ring-0"
              placeholder="mybrandname"
            />
            <button
              onClick={handleDomainSearch}
              disabled={isSearching}
              className="bg-white hover:bg-neutral-100 text-neutral-950 px-6 py-3.5 font-medium text-xs uppercase tracking-wider flex items-center gap-2 font-bold shrink-0"
            >
              {isSearching ? 'Analyzing...' : 'Search'}
              <Search size={14} />
            </button>
          </div>

          {/* Domain suggestion results display */}
          <AnimatePresence>
            {searchResult.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto text-left bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-3.5 shadow-2xl"
              >
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800 text-xs font-mono text-neutral-500">
                  <span>Domain Extension</span>
                  <span>Subscription Price</span>
                </div>

                {searchResult.map((dm) => {
                  const extDetails = DOMAIN_EXTENSIONS.find(e => e.ext === dm.ext)!;
                  return (
                    <div 
                      key={dm.ext} 
                      className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-neutral-800 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={15} className="text-neutral-500" />
                        <div>
                          <p className="text-sm font-semibold text-white tracking-wide">{dm.domain}</p>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-1 inline-block ${extDetails.color}`}>
                            {extDetails.badge}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif text-sm font-bold text-neutral-200">{dm.price}<span className="text-[10px] font-light text-neutral-500">/year</span></span>
                        
                        <button
                          onClick={() => {
                            setSearchResult(prev => {
                              return prev.map(item => item.ext === dm.ext ? { ...item, claimed: !item.claimed } : item);
                            });
                            if (!dm.claimed) {
                              addToCart(`${dm.domain} Domain Registration`, parseFloat(extDetails.price.replace('$','')));
                            } else {
                              triggerNotification(`Removed ${dm.domain} from build reservation.`);
                            }
                          }}
                          className={`text-[11px] font-mono font-bold uppercase tracking-widest px-3.5 py-2.5 transition-all ${dm.claimed ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-neutral-100 text-neutral-900'}`}
                        >
                          {dm.claimed ? 'CLAIMED' : 'ADD'}
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="text-center pt-3 text-[11px] text-neutral-500 font-light">
                  All domain purchases include free WHOIS SSL Privacy Protection and Harisync DNS tools.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Domain highlights */}
          {searchResult.length === 0 && (
            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-neutral-500 mt-2">
              <span>Try:</span>
              <button onClick={() => { setDomainQuery('clayartisans'); triggerNotification('Loaded test domain'); }} className="underline text-neutral-400 hover:text-white">clayartisans</button>
              <span>&middot;</span>
              <button onClick={() => { setDomainQuery('pacificdwellings'); triggerNotification('Loaded test domain'); }} className="underline text-neutral-400 hover:text-white">pacificdwellings</button>
              <span>&middot;</span>
              <button onClick={() => { setDomainQuery('slowferment'); triggerNotification('Loaded test domain'); }} className="underline text-neutral-400 hover:text-white">slowferment</button>
            </div>
          )}

        </div>
      </section>

      {/* --- SECTION 4: SELL ANYTHING E-COMMERCE HUB --- */}
      <section id="sell-anything" className="py-20 lg:py-28 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-neutral-500 tracking-[0.3em] uppercase block mb-4">EVERYTHING TO SELL</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Sell products, <span className="italic">services, or courses.</span>
            </h2>
            <p className="text-neutral-600 font-light text-lg">
              Harisync gives you a robust transaction powerhouse. Switch between categories below to test our direct merchant checkout simulation.
            </p>
          </div>

          {/* Seller Option Toggles */}
          <div className="flex justify-center gap-3 mb-12 border-b border-neutral-200 pb-4 max-w-md mx-auto">
            {(['physical', 'memberships', 'bookings'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSellCategory(cat)}
                className={`py-2 px-5 text-sm uppercase tracking-wider font-semibold transition-all border-b-2 ${sellCategory === cat ? 'border-neutral-900 text-black' : 'border-transparent text-neutral-400 hover:text-neutral-700'}`}
              >
                {cat === 'physical' ? 'Physical items' : cat === 'memberships' ? 'Digital Courses' : 'Appointment Bookings'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Curated Description */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">Featured checkout flow</span>
              
              <AnimatePresence mode="wait">
                {sellCategory === 'physical' && (
                  <motion.div
                    key="p-info"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl font-serif tracking-tight font-light text-neutral-900">Physical Goods Storefront</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Meticulously manage tangible collections. Features comprehensive stock tracking, variable sizing options, customer cart controls, and direct shipping integrations.
                    </p>
                    <ul className="text-neutral-500 text-xs font-mono space-y-2 pt-2">
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Integrated Shipping Calculator</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Variable SKU Attributes</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Fast checkout integrations</li>
                    </ul>
                  </motion.div>
                )}

                {sellCategory === 'memberships' && (
                  <motion.div
                    key="m-info"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl font-serif tracking-tight font-light text-neutral-900">Member Sites & Courses</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Turn expertise into a thriving business. Generate paid newsletters, video series courses, or structured community forums in secure password-guarded workspaces.
                    </p>
                    <ul className="text-neutral-500 text-xs font-mono space-y-2 pt-2">
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Secure user log-in workspaces</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Automated billing schedules</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Video lesson player streaming</li>
                    </ul>
                  </motion.div>
                )}

                {sellCategory === 'bookings' && (
                  <motion.div
                    key="b-info"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl font-serif tracking-tight font-light text-[#111]">Client Appointment Scheduling</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Power custom bookings with a neat scheduler. Clients can browse services, confirm appointment openings, fill questionnaire details, and pre-pay securely online.
                    </p>
                    <ul className="text-neutral-500 text-xs font-mono space-y-2 pt-2">
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Real-time Google Calendar sync</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Automated SMS appointment alerts</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Flexible deposit pricing</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: High-Fidelity Simulation Card */}
            <div className="lg:col-span-7 bg-[#faf9f6] border border-neutral-200/80 rounded-2xl p-8 relative overflow-hidden shadow-lg">
              
              <AnimatePresence mode="wait">
                {sellCategory === 'physical' && (
                  <motion.div
                    key="p-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                  >
                    <div className="md:col-span-5">
                      <img 
                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop" 
                        alt="Fine Craft Item"
                        className="w-full aspect-[4/5] object-cover rounded-lg shadow-md border border-neutral-200"
                      />
                    </div>

                    <div className="md:col-span-7 text-left space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">Hester Collection</span>
                        <h4 className="text-2xl font-serif text-neutral-900 font-bold mt-1">Earthenware Tea Pitcher</h4>
                        <p className="text-sm text-neutral-400 mt-0.5">Crafted with speckled volcanic glaze.</p>
                      </div>

                      <p className="text-xl font-serif text-neutral-900">$58.00</p>

                      {/* Color variant selectors */}
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">Selection: {productColor}</span>
                        <div className="flex gap-2.5 mt-2">
                          {['Oatmeal Raw', 'Basalt Charcoal', 'Terracotta Red'].map((col) => (
                            <button
                              key={col}
                              onClick={() => setProductColor(col)}
                              className={`w-7 h-7 rounded-full border-2 ${productColor === col ? 'border-neutral-900 scale-110' : 'border-transparent'} transition-all`}
                              style={{ 
                                backgroundColor: col === 'Oatmeal Raw' ? '#e5e5e0' : col === 'Basalt Charcoal' ? '#262626' : '#c2410c' 
                              }}
                              title={col}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Qty Selector */}
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">Quantity</span>
                        <div className="flex items-center border border-neutral-300 bg-white">
                          <button onClick={() => setProductCount(Math.max(1, productCount - 1))} className="px-3 py-1 font-mono hover:bg-neutral-100 border-r border-neutral-300">-</button>
                          <span className="px-4 font-mono text-sm">{productCount}</span>
                          <button onClick={() => setProductCount(productCount + 1)} className="px-3 py-1 font-mono hover:bg-neutral-100 border-l border-neutral-300">+</button>
                        </div>
                      </div>

                      {/* Buy trigger */}
                      <button
                        onClick={() => addToCart(`Earthenware Tea Pitcher (${productColor})`, 58)}
                        className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Add to Build Inventory
                      </button>
                    </div>
                  </motion.div>
                )}

                {sellCategory === 'memberships' && (
                  <motion.div
                    key="m-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6 text-left"
                  >
                    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded font-bold">WORKSPACE ACCESS</span>
                          <h4 className="text-xl font-serif text-neutral-900 font-bold mt-1">Symmetry Ceramics Masterclass</h4>
                          <span className="text-xs text-neutral-400">12 On-Demand Video Chapters & Downloadable Guides</span>
                        </div>
                        <Lock size={20} className="text-neutral-400" />
                      </div>

                      <div className="p-4 bg-neutral-50 border border-neutral-150 rounded-lg flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-serif font-black shadow-inner">
                          S
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-800">Exclusive Ceramicist Hub Community</p>
                          <p className="text-[11px] text-neutral-500">Access peer forums, technical kiln charts, and live Q&A feeds.</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                        <div>
                          <p className="text-[10px] font-mono text-neutral-400 uppercase">One-time payment</p>
                          <p className="text-2xl font-serif font-bold text-neutral-900">$149</p>
                        </div>
                        <button
                          onClick={() => addToCart('Symmetry Ceramics Course', 149)}
                          className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5"
                        >
                          Enroll Today
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {sellCategory === 'bookings' && (
                  <motion.div
                    key="b-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6 text-left"
                  >
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3.5 mb-6">
                        <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-950 text-sm">1-on-1 Studio Consultation</h4>
                          <p className="text-xs text-neutral-500">Duration: 45 minutes &middot; Private Session</p>
                        </div>
                        <span className="ml-auto font-serif text-lg font-bold text-neutral-900">$75</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {['May 15 &bull; 10 AM', 'May 15 &bull; 2 PM', 'May 16 &bull; 11 AM'].map((tSlot, idx) => (
                          <button
                            key={idx}
                            onClick={() => triggerNotification(`Selected consultation time: ${tSlot.replace('&bull;', '')}`)}
                            className={`p-3 text-center rounded-lg border text-xs font-medium transition-all ${idx === 0 ? 'bg-neutral-950 text-white border-neutral-900' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'}`}
                            dangerouslySetInnerHTML={{ __html: tSlot }}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => addToCart('1-on-1 Studio Consultation', 75)}
                        className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-4 text-xs font-bold uppercase tracking-wider text-center"
                      >
                        Reserve Appointment Slot
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 5: SQUARESPACE AI BLUEPRINT GENERATOR --- */}
      <section id="ai-builder" className="py-20 lg:py-28 bg-[#fafaf9] border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono text-[10px] uppercase rounded-full">
                <Sparkles size={11} className="animate-spin" /> Next-Gen AI Blueprint
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-none mb-4">
                Describe <span className="italic">your brand.</span> We will build it live.
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Describe who you are and select your preferred design vibe. The AI platform generates an initial landing page preview so you can start custom edits on a custom template.
              </p>

              {/* LIVE BRAND GENERATION CONTROLLER FORM */}
              <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-1.5">Company or Brand Name</label>
                  <input
                    type="text"
                    value={aiBrandName}
                    onChange={(e) => setAiBrandName(e.target.value)}
                    placeholder="e.g. Alchemist Perfumes"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-3 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-1.5">Vibe / Aesthetics</label>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-3 text-xs text-neutral-900"
                    >
                      <option>Sophisticated</option>
                      <option>Minimal</option>
                      <option>Casual Craft</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-1.5">Industry Segment</label>
                    <select
                      value={aiIndustry}
                      onChange={(e) => setAiIndustry(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-3 text-xs text-neutral-900"
                    >
                      <option>Personal Brand</option>
                      <option>E-Commerce Store</option>
                      <option>Local Restaurant</option>
                      <option>Creative Gallery</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateAITemplate}
                  disabled={isGeneratingAI}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  {isGeneratingAI ? 'Generating Blueprint...' : 'Generate AI Web Draft'}
                  <Sparkles size={14} />
                </button>
              </div>
            </div>

            {/* RIGHT: LIVE DRAFTER WORKSPACE PREVIEW */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-8 relative overflow-hidden aspect-[4/3] flex flex-col justify-between">
                
                {/* Visual Draft Watermark */}
                <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 border border-indigo-150 font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                  AI PROTOTYPE DRAFT
                </div>

                <AnimatePresence mode="wait">
                  {aiGeneratedMock ? (
                    <motion.div
                      key="ai-result"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={`h-full flex flex-col justify-between p-6 rounded-lg ${aiGeneratedMock.bg} ${aiGeneratedMock.text} transition-colors duration-500`}
                    >
                      <div>
                        {/* Mock site header */}
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-500/10 mb-6">
                          <span className="font-serif italic font-bold text-sm tracking-wide">{aiGeneratedMock.brand}</span>
                          <span className="text-[9px] uppercase tracking-widest font-mono">Blueprint Generated</span>
                        </div>

                        {/* Mock site body */}
                        <div className="space-y-4">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">AI GENERATION OUTPUT</span>
                          <h4 className="font-serif text-2xl md:text-4xl font-light tracking-tight leading-tight">
                            {aiGeneratedMock.title}
                          </h4>
                          <p className="text-xs opacity-80 max-w-md leading-relaxed">
                            {aiGeneratedMock.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Mock site footer triggers */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-500/10">
                        <span className="text-[10px] font-mono opacity-50">&copy; {aiGeneratedMock.brand} Co.</span>
                        <button
                          onClick={() => {
                            setSelectedTemplate({
                              id: 'custom-ai',
                              name: aiGeneratedMock.brand,
                              category: aiGeneratedMock.industry,
                              colorPreset: aiTone === 'Sophisticated' ? '#18181b' : '#faf9f6',
                              accentColor: '#db2777',
                              bgFill: aiGeneratedMock.bg,
                              textFill: aiGeneratedMock.text,
                              headline: aiGeneratedMock.title,
                              description: aiGeneratedMock.subtitle,
                              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
                              author: aiGeneratedMock.brand
                            });
                            triggerNotification(`Transferred AI Draft into Fluid Engine Customizer!`);
                          }}
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-2 border ${aiGeneratedMock.accent} hover:bg-neutral-50 hover:text-black transition-all`}
                        >
                          Transfer to Studio Editor &rarr;
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ai-empty"
                      className="h-full flex flex-col items-center justify-center text-center opacity-70 p-6"
                    >
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-400">
                        <Sparkles size={28} className="animate-pulse" />
                      </div>
                      <h4 className="font-serif text-xl tracking-tight text-neutral-800 font-bold mb-2">Configure Brand Input Guidelines</h4>
                      <p className="text-neutral-500 text-xs max-w-sm leading-relaxed">
                        Insert your digital company title and select the industry type. Click 'Generate' to trigger the mockup platform draft!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 6: THE LUXURY TEMPLATES GALLERY --- */}
      <section className="py-20 bg-neutral-950 text-white leading-none relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block mb-4">THE THEMES GALLERY</span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-5">
              Websites crafted <span className="italic">to sell.</span>
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Explore our best-seller luxury design system starting states. Click 'Apply Design' to load individual theme attributes directly into our live Fluid Engine simulation above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_TEMPLATES.map((tpl) => (
              <div 
                key={tpl.id}
                className="group bg-neutral-900 border border-neutral-800 rounded-none overflow-hidden hover:border-neutral-700 transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={tpl.image} 
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-750"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedTemplate(tpl);
                        window.scrollTo({ top: document.getElementById('customizer')?.offsetTop, behavior: 'smooth' });
                        triggerNotification(`Loaded design parameters of ${tpl.name}!`);
                      }}
                      className="bg-white text-black text-xs font-mono font-bold uppercase tracking-widest px-4 py-2.5 rounded shadow-lg hover:bg-neutral-100"
                    >
                      Apply Design
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif text-lg font-bold text-white tracking-tight">{tpl.name}</h4>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#db2777]">PRO 7.1</span>
                    </div>
                    <span className="inline-block text-[10px] font-mono text-neutral-500 tracking-wide uppercase mb-3">{tpl.category}</span>
                    <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-neutral-800 text-[10px] font-mono text-neutral-500">
                    <span>By: {tpl.author}</span>
                    <span className="underline group-hover:text-white transition-colors">Launch Starter</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 7: EDITORIAL TESTIMONIAL CAROUSEL --- */}
      <section className="py-20 lg:py-28 bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="flex justify-center mb-6">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">MEMBER PORTFOLIO SUCCESSES</span>
          </div>

          <blockquote className="font-serif italic text-3xl md:text-4xl text-neutral-950 mb-8 leading-snug">
            "We migrated our complete pottery checkout, members list, and lessons structure to Harisync. The Fluid Engine design freedom gives our organic brand an incredible luxury polish."
          </blockquote>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                alt="Representative" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-sans text-sm font-bold text-neutral-900 mt-1">Nora Clay Atelier</span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">FINE EARTHENWARE ARTIST &middot; MEMBER SINCE 2024</span>
          </div>

        </div>
      </section>

      {/* --- SECTION 8: CONFIG BUILD RESERVATION INVOICE CART --- */}
      <section id="invoice" className="py-16 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-neutral-300 rounded-none p-8 shadow-md">
            
            <div className="flex justify-between items-center pb-6 border-b border-neutral-200 mb-6">
              <div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">WORKSPACE ACCOUNT BUILD CONFIG</span>
                <h3 className="text-xl font-serif font-bold text-black flex items-center gap-2">
                  <ShoppingCart size={18} /> Cart System Verification
                </h3>
              </div>
              <span className="font-mono text-xs text-neutral-400 uppercase">INC-2026-HQ</span>
            </div>

            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-neutral-100 text-sm">
                    <div>
                      <p className="font-bold text-neutral-800">{item.name}</p>
                      <span className="text-xs text-neutral-400 block font-mono">Quantity: {item.qty} &middot; Unit Price: ${item.price}</span>
                    </div>
                    <span className="font-serif font-bold text-neutral-900">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Virtual Package Setup Discount (100% OFF)</span>
                    <span className="text-emerald-600">-$0.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-dashed border-neutral-200">
                    <span>Active Domain & Commerce Config Total</span>
                    <span className="font-serif text-lg">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      setCartItems([]);
                      setCartTotal(0);
                      triggerNotification("Cleared workspace reservation items.");
                    }}
                    className="text-xs font-mono uppercase tracking-wider underline text-neutral-500 hover:text-black py-2.5 px-4"
                  >
                    Clear Config Builder
                  </button>
                  <button 
                    onClick={() => triggerNotification("Proceeding to Harisync.com premium subscription payment portal!")}
                    className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-none shadow"
                  >
                    Confirm Subscription &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-400">
                <p className="text-sm">Your subscription build configuration is currently empty.</p>
                <p className="text-xs mt-1">Claim a custom domain or add commerce products to run active checkout calculations!</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* --- SECTIONS: THE DETAILED DIRECTORY FOOTER --- */}
      <footer className="bg-neutral-950 text-white py-16 lg:py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-start mb-16">
            
            {/* Column 1 */}
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-black tracking-[0.3em] uppercase block mb-4 text-white">HARISYNC</span>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs">
                Harisync is an all-in-one content platform to register domains, create beautiful portfolios, and host highly scalable checkout engines.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">Product</span>
              <ul className="text-xs text-neutral-400 space-y-2 font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Fluid Engine 7.1</li>
                <li className="hover:text-white cursor-pointer transition-colors">Custom Websites</li>
                <li className="hover:text-white cursor-pointer transition-colors">Domains & DNS Engine</li>
                <li className="hover:text-white cursor-pointer transition-colors">Integrations & Extension API</li>
                <li className="hover:text-white cursor-pointer transition-colors">Enterprise Systems</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">Templates</span>
              <ul className="text-xs text-neutral-400 space-y-2 font-light">
                <li className="hover:text-white cursor-pointer transition-colors">E-Commerce Blocks</li>
                <li className="hover:text-white cursor-pointer transition-colors">Bespoke Design Portfolios</li>
                <li className="hover:text-white cursor-pointer transition-colors">Local Restaurant Starters</li>
                <li className="hover:text-white cursor-pointer transition-colors">Personal Blogs</li>
                <li className="hover:text-white cursor-pointer transition-colors">Wedding Invitations</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">Resources</span>
              <ul className="text-xs text-neutral-400 space-y-2 font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Marketing Analytics</li>
                <li className="hover:text-white cursor-pointer transition-colors">Paid Courses Guide</li>
                <li className="hover:text-white cursor-pointer transition-colors">Email Campaign System</li>
                <li className="hover:text-white cursor-pointer transition-colors">Harisync Blueprint™</li>
                <li className="hover:text-white cursor-pointer transition-colors">Logos & Fonts Studio</li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">Company</span>
              <ul className="text-xs text-neutral-400 space-y-2 font-light">
                <li className="hover:text-white cursor-pointer transition-colors">About Harisync</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers & Research</li>
                <li className="hover:text-white cursor-pointer transition-colors">Investor Relations</li>
                <li className="hover:text-white cursor-pointer transition-colors">Press & Media Hub</li>
                <li className="hover:text-white cursor-pointer transition-colors">Partners Program</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <span className="hover:text-white cursor-pointer">Security Standards</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span className="hover:text-white cursor-pointer">Privacy Guidelines</span>
              <span className="hover:text-white cursor-pointer">Cookies preferences</span>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-1 font-mono text-[10px] uppercase text-neutral-600">
              <span>&copy; 2026 Harisync, Inc. All rights reserved.</span>
              <span className="tracking-widest">Model Stack: React 19 &middot; Tailwind &middot; Motion</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
