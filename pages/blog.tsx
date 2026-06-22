import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateOnScroll from '../src/components/AnimateOnScroll';

const BLOG_POSTS = [
  {
    title: 'Why Every Business Needs a WhatsApp Bot in 2026',
    excerpt: 'With over 2 billion users worldwide, WhatsApp has become the primary communication channel for businesses. Here\'s why automation on this platform is no longer optional.',
    date: 'June 15, 2026',
    category: 'Automation',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'The Rise of AI Video Ads: How UGC is Changing Digital Marketing',
    excerpt: 'AI-generated UGC content is outperforming traditional ads by 3x. We break down the strategies behind successful AI video campaigns.',
    date: 'June 8, 2026',
    category: 'Marketing',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1626908013351-800dfd7c0db5?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Meta Business Verification: A Complete Guide for 2026',
    excerpt: 'Getting verified on Meta unlocks powerful business tools. Our step-by-step guide covers everything from documentation to approval timelines.',
    date: 'May 28, 2026',
    category: 'Guide',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Building Scalable Web Apps: Lessons from 150+ Projects',
    excerpt: 'After delivering over 150 projects, we\'ve distilled the key architectural patterns and practices that make web applications truly scalable.',
    date: 'May 20, 2026',
    category: 'Engineering',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Chatbot vs. Voice Bot: Which One Does Your Business Need?',
    excerpt: 'Text-based chatbots and voice bots serve different purposes. We compare their strengths and help you choose the right solution for your use case.',
    date: 'May 12, 2026',
    category: 'Automation',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1531746790095-e5995fba0cbc?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'How to Launch a Mobile App in 90 Days',
    excerpt: 'From ideation to the App Store — our proven process for shipping high-quality mobile apps in three months without cutting corners.',
    date: 'May 5, 2026',
    category: 'Mobile',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — HARISYNC</title>
        <meta name="description" content="Insights, guides, and stories from the HARISYNC team on software, bots, and digital marketing." />
      </Head>

      {/* Page Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="max-w-3xl">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
              Blog
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
              Insights & ideas.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Thoughts on technology, automation, and digital growth from our team.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#fafaf9] border border-neutral-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={BLOG_POSTS[0].image}
                  alt={BLOG_POSTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    {BLOG_POSTS[0].category}
                  </span>
                  <span className="text-neutral-300">&middot;</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    {BLOG_POSTS[0].date}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-4 text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-neutral-500 leading-relaxed mb-6">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(1).map((post, i) => (
              <AnimateOnScroll key={post.title} delay={i * 0.1}>
                <article className="group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100 mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-neutral-300">&middot;</span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-2 group-hover:text-neutral-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                    {post.date}
                  </span>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
