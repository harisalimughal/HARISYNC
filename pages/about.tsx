import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Target, Lightbulb, Users, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import AnimateOnScroll from '../src/components/AnimateOnScroll';

const Globe = dynamic(() => import('../src/components/Globe'), { ssr: false });

const VALUES = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay ahead of the curve, leveraging cutting-edge technologies like AI, automation, and cloud-native architectures to deliver solutions that future-proof your business.',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every line of code we write serves a purpose. We measure success by the tangible impact our solutions create — increased revenue, reduced costs, and happier customers.',
  },
  {
    icon: Users,
    title: 'True Partnership',
    description: 'We don\'t just build and disappear. We become an extension of your team, providing ongoing support, strategic guidance, and continuous improvement.',
  },
];

const MILESTONES = [
  { year: '2026', event: 'HARISYNC founded by Haris Ali Mughal with a mission to deliver enterprise-grade technology to growing businesses.' },
  { year: '2026', event: 'Launched web development, mobile apps, and chatbot solutions — delivering 20+ projects within the first year.' },
  { year: '2026', event: 'Expanded into WhatsApp Bot development, Meta Business registration, and AI-powered video advertising.' },
  { year: '2026', event: 'Grew to serve clients across 5+ countries with 100% client satisfaction.' },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — HARISYNC</title>
        <meta name="description" content="Learn about HARISYNC — our story, mission, and the values that drive us." />
      </Head>

      {/* Page Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="max-w-3xl">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
              About Us
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
              We build technology that matters.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              HARISYNC is a service-based technology company founded in 2026, helping businesses scale through custom software, intelligent automation, and modern digital marketing.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-[#fafaf9] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="HARISYNC team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.3em] block mb-4">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
                From a vision to a trusted partner.
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded in 2026 by Haris Ali Mughal, HARISYNC was born from a simple observation: growing businesses need enterprise-grade technology solutions without the enterprise-grade price tag.
                </p>
                <p>
                  We started by building custom web applications and intelligent bots. As our clients grew, so did our capabilities — expanding into mobile development, conversational AI, WhatsApp automation, voice bots, and AI-driven marketing.
                </p>
                <p>
                  Today, we serve clients across 5+ countries, helping them automate operations, reach more customers, and build digital experiences that truly drive results.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Founder / CEO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll delay={0.1}>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.3em] block mb-4">
                Meet Our Founder
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
                Haris Ali Mughal
              </h2>
              <p className="text-[13px] font-medium text-neutral-400 uppercase tracking-wider mb-6">
                CEO & Founder — HARISYNC
              </p>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  A competent software architect, trainer, and AI expert, Haris founded HARISYNC in 2026 with the vision of making cutting-edge technology accessible to businesses of all sizes.
                </p>
                <p>
                  With deep expertise in software architecture, artificial intelligence, and automation, he leads the team in designing and delivering solutions that combine technical excellence with real business impact.
                </p>
                <p>
                  Under his leadership, HARISYNC has delivered 20+ projects across 5+ countries, maintaining a 100% client satisfaction rate.
                </p>
              </div>
              <a
                href="mailto:harisalimughal077@gmail.com"
                className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors underline underline-offset-4"
              >
                Contact our CEO directly <ArrowUpRight size={16} />
              </a>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
                <img
                  src="/ceo-haris.jpeg"
                  alt="Haris Ali Mughal — CEO & Founder"
                  className="w-full h-auto object-contain object-center"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 lg:py-28 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <Globe />
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
                Global Presence
              </span>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-6">
                Delivered worldwide.
              </h2>
              <p className="text-neutral-400 text-base font-light leading-relaxed mb-10">
                From our headquarters in Pakistan, we serve businesses across the globe — building software, bots, and digital solutions that drive real results.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <span className="font-serif text-4xl font-light text-white">20+</span>
                  <div>
                    <p className="text-white font-semibold text-sm">Projects Delivered</p>
                    <p className="text-neutral-500 text-sm">Across web, mobile, bots, and AI solutions</p>
                  </div>
                </div>
                <div className="border-t border-neutral-800" />
                <div className="flex items-start gap-5">
                  <span className="font-serif text-4xl font-light text-white">5+</span>
                  <div>
                    <p className="text-white font-semibold text-sm">Countries Served</p>
                    <p className="text-neutral-500 text-sm">Pakistan, US, UK, Morocco, Australia</p>
                  </div>
                </div>
                <div className="border-t border-neutral-800" />
                <div className="flex items-start gap-5">
                  <span className="font-serif text-4xl font-light text-white">100%</span>
                  <div>
                    <p className="text-white font-semibold text-sm">Client Satisfaction</p>
                    <p className="text-neutral-500 text-sm">Every project delivered on time and beyond expectations</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.3em] block mb-4">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
              What drives everything we do.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, i) => (
              <AnimateOnScroll key={value.title} delay={i * 0.15}>
                <div className="text-center p-8">
                  <div className="w-14 h-14 bg-neutral-100 rounded-sm flex items-center justify-center mx-auto mb-6">
                    <value.icon size={24} className="text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{value.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateOnScroll className="text-center mb-16">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
              Key milestones.
            </h2>
          </AnimateOnScroll>

          <div className="space-y-0">
            {MILESTONES.map((item, i) => (
              <AnimateOnScroll key={item.year} delay={i * 0.1}>
                <div className="flex gap-8 py-8 border-t border-neutral-800">
                  <span className="font-serif text-3xl font-light text-neutral-500 shrink-0 w-20">
                    {item.year}
                  </span>
                  <p className="text-neutral-300 leading-relaxed">{item.event}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#fafaf9] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-6">
              Want to work with us?
            </h2>
            <p className="text-neutral-500 text-lg font-light mb-10 max-w-xl mx-auto">
              We&rsquo;d love to hear about your project and explore how we can help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm tracking-widest uppercase px-10 py-5 transition-all"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
