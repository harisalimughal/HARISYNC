import { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '6+', label: 'Years of Experience' },
];

function AnimatedNumber({ value, label }: StatItem) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');
    const duration = 1500;
    const steps = 40;
    const increment = numericPart / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numericPart);
      setDisplay(`${current}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 leading-none">
        {isInView ? display : '0'}
      </p>
      <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.2em] mt-3">
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat) => (
            <AnimatedNumber key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
