import Link from 'next/link';

const PROJECTS = [
  {
    title: 'FinFlow',
    category: 'Financial Dashboard',
    navItems: ['Dashboard', 'Analytics', 'Reports', 'Settings'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    accent: '#3b82f6',
  },
  {
    title: 'MediConnect',
    category: 'Healthcare Platform',
    navItems: ['Services', 'Doctors', 'Book', 'About'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    accent: '#10b981',
  },
  {
    title: 'ShopEase',
    category: 'E-Commerce Store',
    navItems: ['Shop', 'Collections', 'About', 'Cart (0)'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    accent: '#f59e0b',
  },
  {
    title: 'BrandVoice',
    category: 'Creative Agency',
    navItems: ['Work', 'Services', 'About', 'Contact'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    accent: '#8b5cf6',
  },
  {
    title: 'CloudSync',
    category: 'SaaS Platform',
    navItems: ['Features', 'Pricing', 'Docs', 'Login'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    accent: '#06b6d4',
  },
  {
    title: 'MetaLaunch',
    category: 'Marketing Suite',
    navItems: ['Campaigns', 'Analytics', 'Team', 'Settings'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?q=80&w=800&auto=format&fit=crop',
    accent: '#ec4899',
  },
];

function BrowserMockup({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const rotations = ['-3deg', '0deg', '2deg', '-1deg', '3deg', '-2deg'];
  const rotation = rotations[index % rotations.length];

  return (
    <div
      className="w-[340px] md:w-[420px] shrink-0 group cursor-pointer"
      style={{ transform: `rotate(${rotation})` }}
    >
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-neutral-200/60 transition-transform duration-500 group-hover:scale-[1.03] group-hover:shadow-3xl">
        {/* Browser chrome */}
        <div className="bg-neutral-100 px-4 py-2.5 border-b border-neutral-200 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-neutral-400 font-mono truncate border border-neutral-200">
            www.{project.title.toLowerCase()}.com
          </div>
        </div>

        {/* Fake website nav */}
        <div className="bg-white px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-900 tracking-wide uppercase">
            {project.title}
          </span>
          <div className="hidden md:flex items-center gap-4">
            {project.navItems.map((item) => (
              <span key={item} className="text-[10px] text-neutral-500 uppercase tracking-wider">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Website screenshot */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <span className="bg-white text-neutral-900 text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              View Project
            </span>
          </div>
        </div>
      </div>

      {/* Label below */}
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-neutral-900">{project.title}</p>
        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
          {project.category}
        </p>
      </div>
    </div>
  );
}

export default function ProjectMarquee() {
  const doubled = [...PROJECTS, ...PROJECTS];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.3em] block mb-3">
              Our Recent Work
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
              Projects we&rsquo;re <em>proud of.</em>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors items-center gap-1"
          >
            View all projects &rarr;
          </Link>
        </div>
      </div>

      <div className="relative py-8">
        <div className="flex gap-8 marquee-strip w-max items-start px-4">
          {doubled.map((project, i) => (
            <BrowserMockup
              key={`${project.title}-${i}`}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 md:hidden">
        <Link
          href="/projects"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          View all projects &rarr;
        </Link>
      </div>
    </section>
  );
}
