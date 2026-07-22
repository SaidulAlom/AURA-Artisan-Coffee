import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HERO_STATS } from '../data/mockData';

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(value * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  const displayValue = value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className="text-center p-6 rounded-2xl bg-coffee-milk border border-coffee-latte soft-shadow"
    >
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-coffee-roasted tracking-tight mb-2">
        {displayValue}
        <span>{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-coffee-espresso/90 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

export default function NumberCounters() {
  return (
    <section id="stats-section" className="py-16 bg-coffee-latte border-y border-coffee-milk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_STATS.map((stat, i) => (
            <AnimatedCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
