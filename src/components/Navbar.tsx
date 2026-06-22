import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_ITEMS = [
  {
    label: 'About',
    href: '/about',
    dropdown: {
      columns: [
        {
          heading: 'Company',
          links: [
            { label: 'Our Story', href: '/about' },
            { label: 'Mission & Values', href: '/about' },
            { label: 'Our Journey', href: '/about' },
          ],
        },
        {
          heading: 'Why HARISYNC',
          links: [
            { label: '20+ Projects Delivered', href: '/about' },
            { label: 'Clients in 5+ Countries', href: '/about' },
            { label: '100% Client Satisfaction', href: '/about' },
          ],
        },
      ],
    },
  },
  {
    label: 'Services',
    href: '/services',
    dropdown: {
      columns: [
        {
          heading: 'Development',
          links: [
            { label: 'Web Development & Custom Software', href: '/services' },
            { label: 'Mobile App Development', href: '/services' },
          ],
        },
        {
          heading: 'Automation',
          links: [
            { label: 'Chatbot & Voice Bot Solutions', href: '/services' },
            { label: 'WhatsApp Bot Development', href: '/services' },
          ],
        },
        {
          heading: 'Marketing & Meta',
          links: [
            { label: 'Business Registration with Meta', href: '/services' },
            { label: 'UGC & AI Video Ads', href: '/services' },
          ],
        },
      ],
    },
  },
  {
    label: 'Projects',
    href: '/projects',
    dropdown: {
      columns: [
        {
          heading: 'Featured Work',
          links: [
            { label: 'FinFlow Dashboard', href: '/projects' },
            { label: 'MediConnect App', href: '/projects' },
            { label: 'ShopEase WhatsApp Bot', href: '/projects' },
          ],
        },
        {
          heading: 'By Category',
          links: [
            { label: 'Web Applications', href: '/projects' },
            { label: 'Mobile Apps', href: '/projects' },
            { label: 'AI & Automation', href: '/projects' },
          ],
        },
      ],
    },
  },
  {
    label: 'Blog',
    href: '/blog',
    dropdown: {
      columns: [
        {
          heading: 'Latest Posts',
          links: [
            { label: 'Why Every Business Needs a WhatsApp Bot', href: '/blog' },
            { label: 'The Rise of AI Video Ads', href: '/blog' },
            { label: 'Meta Business Verification Guide', href: '/blog' },
          ],
        },
        {
          heading: 'Topics',
          links: [
            { label: 'Engineering', href: '/blog' },
            { label: 'Automation', href: '/blog' },
            { label: 'Marketing', href: '/blog' },
          ],
        },
      ],
    },
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const isHome = router.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [router.pathname]);

  const showSolid = isScrolled || !isHome;
  const textColor = 'text-white';
  const logoColor = 'text-white';
  const dropdownBg = 'bg-neutral-950 border-neutral-800';
  const dropdownHeading = 'text-neutral-500';
  const dropdownLink = 'text-neutral-300 hover:text-white';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showSolid
          ? 'bg-black/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className={`flex items-center gap-2.5 ${logoColor} hover:opacity-80 transition-opacity`}>
          <img src="/logo.png" alt="HARISYNC" className="h-12 w-12 object-contain" />
          <span className="text-[19px] font-normal tracking-[0.15em] uppercase" style={{ fontFamily: '"Gotham Book", "Gotham", "Inter", sans-serif' }}>HARISYNC</span>
        </Link>

        <nav className={`hidden lg:flex items-center gap-7 text-[13px] font-semibold tracking-wide uppercase ${textColor}`}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`py-2 transition-colors hover:opacity-70 flex items-center gap-1 ${
                  router.pathname === item.href ? 'opacity-100' : 'opacity-80'
                }`}
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 mt-0 pt-2`}
                  >
                    <div className={`${dropdownBg} border shadow-2xl p-6 min-w-[420px] flex gap-8`}>
                      {item.dropdown.columns.map((col) => (
                        <div key={col.heading} className="flex-1">
                          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-3 ${dropdownHeading}`}>
                            {col.heading}
                          </span>
                          <ul className="space-y-2">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  className={`text-[13px] font-normal normal-case tracking-normal transition-colors block py-0.5 ${dropdownLink}`}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-flex text-[13px] font-semibold tracking-wider uppercase px-6 py-3 transition-all duration-200 bg-white text-neutral-900 hover:bg-neutral-100"
          >
            Contact Us
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden p-2 ${textColor}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={`text-lg font-medium text-neutral-800 hover:text-neutral-500 transition-colors ${
                      router.pathname === item.href ? 'text-neutral-900 font-bold' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="mt-2 ml-4 space-y-1.5">
                      {item.dropdown.columns.map((col) =>
                        col.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="block text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="bg-neutral-900 text-white text-center py-4 text-sm font-bold uppercase tracking-widest mt-2"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
