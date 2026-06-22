import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  Services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Mobile Apps', href: '/services' },
    { label: 'Chatbot & Voice Bots', href: '/services' },
    { label: 'WhatsApp Bots', href: '/services' },
    { label: 'Automation', href: '/services' },
    { label: 'Meta Business', href: '/services' },
    { label: 'UGC & AI Video Ads', href: '/services' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-16 lg:py-24 border-t border-neutral-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="HARISYNC" className="h-12 w-12 object-contain" />
              <span className="text-[19px] font-normal tracking-[0.15em] uppercase" style={{ fontFamily: '"Gotham Book", "Gotham", "Inter", sans-serif' }}>HARISYNC</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mb-4">
              We build custom software, intelligent bots, and digital marketing solutions that help businesses grow and scale.
            </p>
            <div className="space-y-1.5 text-sm text-neutral-500">
              <a href="mailto:info@harisync.tech" className="block hover:text-white transition-colors">info@harisync.tech</a>
              {/* <a href="tel:+923058884771" className="block hover:text-white transition-colors">+92 305 888 4771</a> */}
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://linkedin.com/company/harisync"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight size={10} />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">
                {category}
              </span>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Harisync. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
