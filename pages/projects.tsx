import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import AnimateOnScroll from '../src/components/AnimateOnScroll';

const PROJECTS = [
  {
    title: 'FinFlow Dashboard',
    category: 'Web Application',
    description: 'A comprehensive financial analytics platform with real-time data visualization, automated reporting, and multi-currency support for a fintech startup.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'MediConnect App',
    category: 'Mobile App',
    description: 'Telemedicine mobile app connecting patients with healthcare providers for video consultations, prescription management, and health tracking.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    tags: ['React Native', 'Firebase', 'WebRTC'],
  },
  {
    title: 'ShopEase Bot',
    category: 'WhatsApp Bot',
    description: 'Full-featured WhatsApp shopping assistant processing 10,000+ daily interactions — product browsing, cart management, and payment collection.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    tags: ['WhatsApp API', 'Node.js', 'Stripe'],
  },
  {
    title: 'BrandVoice AI',
    category: 'AI Video Ads',
    description: 'AI-generated video campaign for a D2C skincare brand achieving 3x ROAS with scroll-stopping UGC-style creatives across Meta and TikTok.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    tags: ['AI Generation', 'Meta Ads', 'TikTok'],
  },
  {
    title: 'CloudSync Platform',
    category: 'Custom Software',
    description: 'Enterprise file synchronization and collaboration tool with real-time editing, version control, and granular access permissions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js', 'AWS', 'WebSocket'],
  },
  {
    title: 'MetaLaunch Suite',
    category: 'Meta Business',
    description: 'Complete Meta business verification and onboarding suite for an agency managing 200+ client accounts across Facebook, Instagram, and WhatsApp.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?q=80&w=800&auto=format&fit=crop',
    tags: ['Meta API', 'Dashboard', 'Automation'],
  },
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — HARISYNC</title>
        <meta name="description" content="Explore our portfolio of web apps, mobile apps, bots, and AI solutions." />
      </Head>

      {/* Page Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="max-w-3xl">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
              Our Work
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
              Projects built to perform.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Real solutions we&rsquo;ve delivered for real businesses. Each project reflects our commitment to quality, performance, and measurable outcomes.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-[#fafaf9] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <AnimateOnScroll key={project.title} delay={i * 0.1}>
                <div className="group bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <span className="bg-white text-neutral-900 text-xs font-bold uppercase tracking-widest px-5 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                        View Details <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 mt-2 mb-3 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-neutral-400 border border-neutral-200 px-2.5 py-1 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
              Your project could be next.
            </h2>
            <p className="text-neutral-400 text-lg font-light mb-10 max-w-xl mx-auto">
              Let&rsquo;s build something that makes an impact.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm tracking-widest uppercase px-10 py-5 transition-all"
            >
              Start Your Project <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
