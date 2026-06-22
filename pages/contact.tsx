import { useState } from 'react';
import Head from 'next/head';
import { Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';
import AnimateOnScroll from '../src/components/AnimateOnScroll';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Head>
        <title>Contact — HARISYNC</title>
        <meta name="description" content="Get in touch with HARISYNC. Let's discuss your next project." />
      </Head>

      {/* Page Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="max-w-3xl">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] block mb-4">
              Contact
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
              Let&rsquo;s start a conversation.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Have a project in mind? We&rsquo;d love to hear about it. Fill out the form below or reach out directly.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-28 bg-[#fafaf9] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <AnimateOnScroll>
                <h2 className="font-serif text-2xl tracking-tight mb-8">Get in touch.</h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-sm flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 mb-1">Email</p>
                      <a href="mailto:info@harisync.tech" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                        info@harisync.tech
                      </a>
                    </div>
                  </div>

                  {/* <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-sm flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 mb-1">Phone</p>
                      <a href="tel:+923058884771" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                        +92 305 888 4771
                      </a>
                    </div>
                   </div> */}

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-sm flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 mb-1">Office</p>
                      <p className="text-sm text-neutral-500">
                        Remote-first company<br />
                        Serving clients globally
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-neutral-200">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com/company/harisync"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
                    >
                      LinkedIn <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <AnimateOnScroll delay={0.1}>
                {submitted ? (
                  <div className="bg-white border border-neutral-200 p-12 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send size={24} className="text-neutral-600" />
                    </div>
                    <h3 className="font-serif text-2xl text-neutral-900 mb-3">Message sent!</h3>
                    <p className="text-neutral-500 max-w-md mx-auto">
                      Thank you for reaching out. We&rsquo;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="mt-8 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                          your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                          placeholder="Your Name here"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                          placeholder="your email here"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option value="web-development">Web Development & Custom Software</option>
                        <option value="mobile-app">Mobile App Development</option>
                        <option value="chatbot">Chatbot & Voice Bot Solutions</option>
                        <option value="whatsapp">WhatsApp Bot Development</option>
                        <option value="meta">Business Registration with Meta</option>
                        <option value="video-ads">UGC & AI Video Ads</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors resize-none"
                        placeholder="Tell us about your project, timeline, and budget..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm tracking-widest uppercase py-5 transition-all flex items-center justify-center gap-2"
                    >
                      Send Message <ArrowUpRight size={16} />
                    </button>
                  </form>
                )}
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
