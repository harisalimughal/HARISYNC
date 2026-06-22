import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Link href="/services" className="group block">
      <div className="bg-white border border-neutral-200 p-8 h-full transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:-translate-y-1">
        <div className="w-12 h-12 bg-neutral-100 rounded-sm flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6">{description}</p>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider group-hover:text-neutral-900 transition-colors">
          Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
