import Head from 'next/head';
import Link from 'next/link';
import { Code, Smartphone, Bot, MessageCircle, ShieldCheck, Video, ArrowRight, Check, Mic, Workflow } from 'lucide-react';
import AnimateOnScroll from '../src/components/AnimateOnScroll';

const SERVICES = [
  {
    icon: Code,
    title: 'Web Development & Custom Software',
    description: 'We design and build high-performance web applications, SaaS platforms, admin dashboards, and enterprise software tailored to your workflows.',
    features: ['React, Next.js & Node.js', 'Scalable cloud architecture', 'API design & integrations', 'Admin panels & dashboards'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Beautiful, high-performing native and cross-platform mobile apps for iOS and Android that your users will love.',
    features: ['React Native & Flutter', 'Native iOS & Android', 'App Store optimization', 'Push notifications & analytics'],
  },
  {
    icon: Bot,
    title: 'Chatbot & Voice Bot Solutions',
    description: 'Intelligent conversational AI that automates customer support, qualifies leads, and delivers personalized experiences around the clock.',
    features: ['AI-powered NLP engines', 'Multi-channel deployment', 'Lead qualification flows', 'Human handoff integration'],
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Bot Development',
    description: 'Powerful WhatsApp Business API automation — from customer support to order processing — on the world\'s most used messaging platform.',
    features: ['WhatsApp Business API', 'Automated order processing', 'Broadcast & campaigns', 'Payment collection flows'],
  },
  {
    icon: Mic,
    title: 'Voice Bot Solutions',
    description: 'AI-powered voice assistants for IVR systems, customer service, and hands-free interactions that handle calls intelligently around the clock.',
    features: ['AI voice recognition', 'IVR & call routing', 'Natural language understanding', 'Multi-language support'],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Streamline repetitive tasks, connect your tools, and build intelligent automation pipelines that save hours and eliminate human error.',
    features: ['Process automation', 'Tool integrations', 'Custom workflows', 'Real-time monitoring'],
  },
  {
    icon: ShieldCheck,
    title: 'Business Registration with Meta',
    description: 'Complete Meta Business verification and platform setup — ensuring your brand is verified, compliant, and ready to scale across Meta\'s ecosystem.',
    features: ['Meta Business verification', 'WhatsApp Business setup', 'Facebook & Instagram pages', 'Commerce catalog setup'],
  },
  {
    icon: Video,
    title: 'UGC & AI Video Ads',
    description: 'Scroll-stopping video content crafted with AI tools and authentic UGC creators that drives engagement, builds trust, and converts.',
    features: ['AI-generated ad creatives', 'UGC creator network', 'Performance-optimized edits', 'A/B tested ad variants'],
  },
];

export default function Services() {
  return (
    <>
      <Head>
        <title>Services — HARISYNC</title>
        <meta name="description" content="Explore HARISYNC's full range of digital services — from web development to AI video ads." />
      </Head>

      {/* Page Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="max-w-3xl">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
              Our Services
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
              End-to-end digital solutions.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              From concept to deployment, we offer a comprehensive suite of services designed to digitize, automate, and scale your business.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Detail Grid */}
      <section className="py-20 lg:py-28 bg-[#fafaf9] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <AnimateOnScroll key={service.title} delay={i * 0.05}>
                <div className="bg-white border border-neutral-200 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:shadow-lg transition-shadow duration-300">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-sm flex items-center justify-center">
                        <service.icon size={22} className="text-neutral-700" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-neutral-500 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-600">
                          <Check size={16} className="text-neutral-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-6">
              Have a project in mind?
            </h2>
            <p className="text-neutral-400 text-lg font-light mb-10 max-w-xl mx-auto">
              Tell us what you&rsquo;re looking to build and we&rsquo;ll put together a tailored plan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm tracking-widest uppercase px-10 py-5 transition-all"
            >
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
