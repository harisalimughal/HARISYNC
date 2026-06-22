import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Head from 'next/head';
import { Code, Smartphone, Bot, MessageCircle, ShieldCheck, Video, ArrowRight } from 'lucide-react';
import AnimateOnScroll from '../src/components/AnimateOnScroll';

const HERO_SHOWCASE = [
  {
    title: 'FinFlow',
    navItems: ['Dashboard', 'Analytics', 'Reports'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    dark: false,
    rotation: '-2deg',
  },
  {
    title: 'MediConnect',
    navItems: ['Services', 'Doctors', 'Book Now'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    dark: true,
    rotation: '1deg',
  },
  {
    title: 'ShopEase',
    navItems: ['Shop', 'Collections', 'Cart (0)'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    dark: false,
    rotation: '-1deg',
  },
  {
    title: 'BrandVoice',
    navItems: ['Work', 'Services', 'Contact'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    dark: true,
    rotation: '2deg',
  },
  {
    title: 'CloudSync',
    navItems: ['Features', 'Pricing', 'Login'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    dark: false,
    rotation: '-1.5deg',
  },
  {
    title: 'MetaLaunch',
    navItems: ['Campaigns', 'Analytics', 'Team'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    dark: true,
    rotation: '1.5deg',
  },
];

const SERVICES = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Scalable web applications and tailored software solutions built with modern technologies.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile apps designed for performance and seamless UX.',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Bot,
    title: 'Chatbot & Voice Bots',
    description: 'Intelligent conversational AI that automates support and streamlines operations 24/7.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Bots',
    description: 'Powerful WhatsApp automation to engage customers and deliver instant support.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: ShieldCheck,
    title: 'Meta Business',
    description: 'End-to-end Meta verification — WhatsApp API, Facebook pages, and business manager.',
    image: 'https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Video,
    title: 'UGC & AI Video Ads',
    description: 'Scroll-stopping video content powered by AI and UGC creators that converts.',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop',
  },
];

const FEATURED_PROJECTS = [
  {
    title: 'FinFlow Dashboard',
    category: 'Web Application',
    description: 'A comprehensive financial analytics platform with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'MediConnect App',
    category: 'Mobile App',
    description: 'Telemedicine app connecting patients with healthcare providers instantly.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'ShopEase Bot',
    category: 'WhatsApp Bot',
    description: 'Automated shopping assistant handling 10,000+ daily customer interactions.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'BrandVoice AI',
    category: 'AI Video Ads',
    description: 'AI-generated video campaign that achieved 3x ROAS for a D2C brand.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
  },
];

const GROW_TABS = [
  'Web Apps',
  'Mobile Apps',
  'Chatbots',
  'Voice Bots',
  'WhatsApp Bots',
  'Automation',
  'Meta Business',
  'AI Video Ads',
];

const GROW_CARDS = [
  {
    title: 'Build web apps',
    description: 'Custom dashboards, SaaS platforms, and business tools built with modern frameworks to scale with your growth.',
    bg: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=900&auto=format&fit=crop',
    mockup: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Launch mobile apps',
    description: 'Native and cross-platform apps designed for beautiful UX, performance, and seamless integration.',
    bg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop',
    mockup: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Build chatbots',
    description: 'Intelligent conversational AI that automates support, captures leads, and works around the clock.',
    bg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=900&auto=format&fit=crop',
    mockup: '/chatbot-mockup.svg',
  },
  {
    title: 'Build voice bots',
    description: 'AI-powered voice assistants for IVR, customer service, and hands-free interactions across any channel.',
    bg: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=900&auto=format&fit=crop',
    mockup: '/voicebot-mockup.svg',
  },
  {
    title: 'Automate WhatsApp',
    description: 'Engage customers, process orders, and deliver instant support on the platform they already use.',
    bg: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=900&auto=format&fit=crop',
    mockup: '/whatsapp-mockup.svg',
  },
  {
    title: 'Automate workflows',
    description: 'Streamline repetitive tasks, connect your tools, and build intelligent automation pipelines that save hours.',
    bg: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=900&auto=format&fit=crop',
    mockup: '/workflow-mockup.svg',
  },
  {
    title: 'Register on Meta',
    description: 'End-to-end Meta Business verification — WhatsApp API, Facebook pages, and business manager setup.',
    bg: 'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?q=80&w=900&auto=format&fit=crop',
    mockup: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Create AI video ads',
    description: 'Scroll-stopping video content powered by AI and UGC creators that drives engagement and conversions.',
    bg: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=900&auto=format&fit=crop',
    mockup: 'https://images.pexels.com/photos/8370430/pexels-photo-8370430.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

function SingleDigitRoller({ digit, duration, delay }: { digit: number; duration: number; delay: number }) {
  const stripRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className="inline-block overflow-hidden relative" style={{ height: '1.15em', width: '0.62em' }}>
      <motion.span
        ref={stripRef}
        initial={{ y: '0%' }}
        animate={started ? { y: `${-digit * 10}%` } : { y: '0%' }}
        transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="block text-center" style={{ height: '1.15em', lineHeight: '1.15em' }}>{n}</span>
        ))}
      </motion.span>
    </span>
  );
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  const digits = String(target).split('').map(Number);
  const totalDigits = digits.length;
  const baseDuration = duration / 1000;

  return (
    <span ref={ref} className="inline-flex items-center">
      {hasStarted ? (
        <>
          {digits.map((d, i) => {
            const posFromRight = totalDigits - 1 - i;
            const digitDuration = baseDuration * (0.4 + 0.6 * ((posFromRight + 1) / totalDigits));
            const digitDelay = i * 0.08;
            return <SingleDigitRoller key={i} digit={d} duration={digitDuration} delay={digitDelay} />;
          })}
          <span>{suffix}</span>
        </>
      ) : (
        <>
          {digits.map((_, i) => (
            <span key={i} className="inline-block" style={{ width: '0.62em', height: '1.15em' }}>{' '}</span>
          ))}
          <span>{suffix}</span>
        </>
      )}
    </span>
  );
}

function ServicesCarousel() {
  const [offset, setOffset] = useState(0);
  const maxOffset = SERVICES.length - 4;

  const handlePrev = () => setOffset((prev) => Math.max(0, prev - 1));
  const handleNext = () => setOffset((prev) => Math.min(maxOffset, prev + 1));

  return (
    <section className="py-20 lg:py-28 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl md:text-[44px] tracking-tight mb-5">
            Everything you need to grow.
          </h2>
          <p className="text-neutral-500 text-base font-light leading-relaxed">
            From custom software to AI-powered marketing, we deliver end-to-end digital solutions.
          </p>
        </AnimateOnScroll>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-5"
            animate={{ x: `-${offset * 25.3}%` }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            {SERVICES.map((service) => (
              <div key={service.title} className="flex-shrink-0 w-[calc(85vw-20px)] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
                <Link href="/services" className="group block rounded-2xl overflow-hidden relative" style={{ height: '420px' }}>
                  <img
                    src={service.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-[90%]">{service.description}</p>
                    <div className="mt-auto flex justify-end">
                      <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:border-white group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-2">
            {SERVICES.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i >= offset && i < offset + 4
                    ? 'w-5 h-2 bg-neutral-900'
                    : 'w-2 h-2 bg-neutral-300'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                offset === 0
                  ? 'border-neutral-200 text-neutral-300 cursor-default'
                  : 'border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                offset >= maxOffset
                  ? 'border-neutral-200 text-neutral-300 cursor-default'
                  : 'border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrowTabs({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (i: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updatePill = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const btn = container.children[index + 1] as HTMLElement;
    if (!btn) return;
    setPillStyle({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      opacity: 1,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center md:justify-center gap-2 mt-10 flex-nowrap overflow-x-auto pb-2 px-4 md:px-0 scrollbar-hide"
      onMouseLeave={() => {
        setHovered(null);
        setPillStyle((s) => ({ ...s, opacity: 0 }));
      }}
    >
      <motion.div
        className="absolute top-0 h-full rounded-full bg-neutral-200 pointer-events-none"
        animate={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      {GROW_TABS.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActiveTab(i)}
          onMouseEnter={() => {
            setHovered(i);
            updatePill(i);
          }}
          className="relative z-10 px-4 py-2 rounded-full text-[13px] font-medium text-neutral-600 transition-colors duration-150 hover:text-neutral-900 whitespace-nowrap"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function GrowSection() {
  const [activeTab, setActiveTab] = useState(0);
  const total = GROW_CARDS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-12">
        <AnimateOnScroll>
          <h2 className="font-serif text-3xl md:text-[44px] tracking-tight mb-4">
            Grow your business
          </h2>
          <p className="text-neutral-500 text-base font-light">
            You deserve a digital partner that can do it all.
          </p>
        </AnimateOnScroll>

        <GrowTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="relative" style={{ height: 'clamp(240px, 42vw, 520px)' }}>
        <div className="absolute inset-0 overflow-hidden">
          {GROW_CARDS.map((card, index) => {
            let rel = index - activeTab;
            if (rel > total / 2) rel -= total;
            if (rel < -total / 2) rel += total;
            if (Math.abs(rel) > 2) return null;

            const isCenter = rel === 0;
            const isLeft = rel === -1;
            const isRight = rel === 1;

            return (
              <motion.div
                key={card.title}
                animate={{
                  left: isCenter ? '50%' : isLeft ? '8%' : isRight ? '92%' : rel > 0 ? '130%' : '-30%',
                  x: '-50%',
                  top: '50%',
                  y: '-50%',
                  scale: isCenter ? 1 : (isLeft || isRight) ? 0.92 : 0.7,
                  opacity: (isCenter || isLeft || isRight) ? 1 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="absolute"
                style={{
                  width: 'min(90vw, 820px)',
                  zIndex: isCenter ? 10 : (isLeft || isRight) ? 2 : 0,
                }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl relative" style={{ aspectRatio: '960/500' }}>
                  <img src={card.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="relative z-10 p-5 md:p-14 flex flex-col justify-end h-full">
                    <h3 className="text-white font-serif text-xl md:text-[40px] font-medium mb-2 md:mb-3 leading-tight">{card.title}</h3>
                    <p className="text-white/80 text-xs md:text-[16px] leading-relaxed max-w-full md:max-w-[45%]">{card.description}</p>
                  </div>
                  <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[35%] md:w-[45%] rounded-lg shadow-2xl overflow-hidden border border-white/15 hidden sm:block">
                    <img src={card.mockup} alt="" className="w-full aspect-[4/3] object-cover" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={() => setActiveTab((prev) => (prev - 1 + total) % total)}
          className="absolute left-2 md:left-4 bottom-4 md:bottom-6 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-colors bg-white/80 backdrop-blur-sm"
        >
          <ArrowRight size={16} className="rotate-180" />
        </button>
        <button
          onClick={() => setActiveTab((prev) => (prev + 1) % total)}
          className="absolute right-2 md:right-4 bottom-4 md:bottom-6 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-colors bg-white/80 backdrop-blur-sm"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {GROW_CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`rounded-full transition-all duration-300 ${
              activeTab === i
                ? 'w-5 h-2 bg-neutral-900'
                : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery', description: 'We learn your goals, audience, and challenges through in-depth consultation.' },
  { number: '02', title: 'Strategy & Design', description: 'We craft a tailored solution blueprint with wireframes, user flows, and architecture.' },
  { number: '03', title: 'Development', description: 'Our engineers build your solution with clean code, rigorous testing, and agile sprints.' },
  { number: '04', title: 'Launch & Scale', description: 'We deploy, monitor, and continuously optimize to ensure long-term success.' },
];

const TESTIMONIALS = [
  {
    quote: 'HARISYNC transformed our entire digital presence. Their WhatsApp bot handles thousands of customer queries daily, and our new platform has tripled our conversion rate.',
    name: 'Ahmed Khan',
    role: 'CEO, TechVentures',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'The chatbot they built for us reduced our support tickets by 60%. Their team understood our requirements perfectly and delivered ahead of schedule.',
    name: 'Sarah Mitchell',
    role: 'COO, HealthFirst',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'From Meta verification to a complete e-commerce platform — HARISYNC handled everything. Professional, fast, and the results speak for themselves.',
    name: 'Omar Farooq',
    role: 'Founder, ShopLocal',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'Their AI video ads generated 4x more engagement than our previous campaigns. HARISYNC truly understands modern digital marketing.',
    name: 'Lisa Chen',
    role: 'Marketing Director, NovaBrand',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="py-24 lg:py-32 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="mb-16">
          <h2 className="font-serif text-3xl md:text-[44px] tracking-tight text-center">
            What our clients say
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Large quote */}
          <AnimateOnScroll delay={0.1}>
          <div className="relative min-h-[280px]">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                animate={{
                  opacity: current === i ? 1 : 0,
                  y: current === i ? 0 : 20,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ pointerEvents: current === i ? 'auto' : 'none' }}
              >
                <blockquote className="font-serif text-2xl md:text-[32px] leading-snug tracking-tight text-white/90 mb-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-neutral-500 text-[13px]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </AnimateOnScroll>

          {/* Testimonial cards stack */}
          <AnimateOnScroll delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setCurrent(i)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 ${
                  current === i
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-white/5 border border-transparent hover:bg-white/8'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-neutral-500 text-[11px]">{t.role}</p>
                  </div>
                </div>
                <p className="text-neutral-400 text-[13px] leading-relaxed line-clamp-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </button>
            ))}
          </div>
          </AnimateOnScroll>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                current === i
                  ? 'w-5 h-2 bg-white'
                  : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroShowcase() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = HERO_SHOWCASE.length;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
      className="relative z-10"
      style={{ height: isMobile ? '200px' : 'clamp(340px, 42vw, 540px)', marginBottom: isMobile ? '-40px' : '-80px' }}
    >
      <div className="absolute inset-0 flex items-end justify-center">
        {HERO_SHOWCASE.map((card, index) => {
          let rel = index - current;
          if (rel > total / 2) rel -= total;
          if (rel < -total / 2) rel += total;
          if (Math.abs(rel) > 2) return null;

          const isCenter = rel === 0;
          const isLeft = rel === -1;
          const isRight = rel === 1;

          if (isMobile) {
            return (
              <motion.div
                key={card.title}
                animate={{
                  left: '50%',
                  x: '-50%',
                  bottom: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: isCenter ? 1 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="absolute"
                style={{
                  width: '88vw',
                  maxWidth: '400px',
                  zIndex: isCenter ? 10 : 0,
                }}
              >
                <div className={`${card.dark ? 'bg-neutral-900 border-neutral-700/40' : 'bg-[#f0ece4] border-neutral-300/30'} rounded-xl shadow-2xl overflow-hidden border`}>
                  <div className={`px-3 py-2 border-b ${card.dark ? 'border-neutral-700/40' : 'border-neutral-300/20'} flex items-center justify-between`}>
                    <span className={`text-[9px] font-semibold uppercase tracking-wider ${card.dark ? 'text-neutral-400' : 'text-neutral-700'}`}>{card.title}</span>
                    <div className={`flex gap-2 text-[8px] uppercase tracking-wider ${card.dark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      {card.navItems.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <div className="aspect-[540/300] overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={card.title}
              animate={{
                left: isCenter ? '50%' : isLeft ? '10%' : isRight ? '90%' : rel > 0 ? '125%' : '-25%',
                x: '-50%',
                bottom: isCenter ? 20 : 0,
                scale: isCenter ? 1.15 : (isLeft || isRight) ? 0.78 : 0.55,
                rotate: isCenter ? 0 : isLeft ? -3 : isRight ? 2 : rel > 0 ? 5 : -5,
                opacity: (isCenter || isLeft || isRight) ? 1 : 0,
              }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
              className="absolute"
              style={{
                width: '540px',
                zIndex: isCenter ? 10 : (isLeft || isRight) ? 2 : 0,
              }}
            >
              <div className={`${card.dark ? 'bg-neutral-900 border-neutral-700/40' : 'bg-[#f0ece4] border-neutral-300/30'} rounded-xl shadow-2xl overflow-hidden border`}>
                <div className={`px-4 py-2.5 border-b ${card.dark ? 'border-neutral-700/40' : 'border-neutral-300/20'} flex items-center justify-between`}>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${card.dark ? 'text-neutral-400' : 'text-neutral-700'}`}>{card.title}</span>
                  <div className={`flex gap-3 text-[9px] uppercase tracking-wider ${card.dark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {card.navItems.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
                <div className="aspect-[540/300] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>HARISYNC — Technology That Drives Results</title>
        <meta name="description" content="Custom software, intelligent bots, and digital marketing solutions for modern businesses." />
      </Head>

      {/* ===== HERO SECTION — Video + Overlapping Project Showcase ===== */}
      <section className="relative bg-black text-white overflow-x-clip" style={{ zIndex: 2 }}>
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/8033299/8033299-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Hero text content */}
        <div className="relative z-10 text-center pt-24 md:pt-32 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-[32px] sm:text-[44px] md:text-[60px] font-normal tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6 md:mb-10 px-6"
          >
            Technology that <br className="hidden md:block" />drives results.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              href="/contact"
              className="bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs md:text-sm tracking-widest uppercase px-8 py-3.5 md:px-12 md:py-5 transition-all hover:scale-[1.02] duration-200"
            >
              Get Started
            </Link>
            <p className="text-white/40 text-[11px] font-mono uppercase tracking-[0.2em]">
              Feel free to contact us.
            </p>
          </motion.div>
        </div>

        {/* Project showcase carousel — center focused, sides peeking */}
        <HeroShowcase />
      </section>

      {/* ===== STATS — Dark section directly under hero ===== */}
      <section className="pt-20 md:pt-32 lg:pt-36 pb-16 lg:pb-24 bg-black text-white" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <p className="text-center text-white/50 text-xs md:text-sm font-light mb-10 md:mb-14 tracking-wide">
              Join businesses across the globe who trust HARISYNC to power their digital growth.
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <AnimateOnScroll delay={0.1}>
              <p className="font-sans text-3xl md:text-6xl font-light text-white tracking-tight leading-none"><AnimatedCounter target={20} suffix="+" /></p>
              <p className="text-[9px] md:text-[11px] text-neutral-500 uppercase tracking-[0.15em] mt-2 md:mt-3 font-medium">Projects Delivered</p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="font-sans text-3xl md:text-6xl font-light text-white tracking-tight leading-none"><AnimatedCounter target={5} suffix="+" duration={1500} /></p>
              <p className="text-[9px] md:text-[11px] text-neutral-500 uppercase tracking-[0.15em] mt-2 md:mt-3 font-medium">Countries Served</p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <p className="font-sans text-3xl md:text-6xl font-light text-white tracking-tight leading-none"><AnimatedCounter target={100} suffix="%" /></p>
              <p className="text-[9px] md:text-[11px] text-neutral-500 uppercase tracking-[0.15em] mt-2 md:mt-3 font-medium">Client Satisfaction</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== GROW YOUR BUSINESS — Tabbed cards section ===== */}
      <GrowSection />

      {/* ===== SERVICES — Dark card carousel ===== */}
      <ServicesCarousel />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />
    </>
  );
}
