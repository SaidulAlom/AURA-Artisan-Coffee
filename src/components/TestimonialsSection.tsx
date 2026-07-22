import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews-section" className="py-20 lg:py-28 bg-[#F7F3EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F2] border border-[#FFB703] text-xs font-bold text-[#1F2937] mb-3">
              <Star className="w-3.5 h-3.5 fill-[#FFB703] text-[#FFB703]" />
              <span>1,200+ Verified 5-Star Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1F2937] tracking-tight">
              Loved by Coffee Connoisseurs
            </h2>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-[#FFF8F2] border border-[#1F2937]/10 text-[#1F2937] hover:bg-[#FF6B35] hover:text-white transition-all soft-shadow"
              aria-label="Previous Testimonial"
              data-cursor
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-[#FFF8F2] border border-[#1F2937]/10 text-[#1F2937] hover:bg-[#FF6B35] hover:text-white transition-all soft-shadow"
              aria-label="Next Testimonial"
              data-cursor
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Drag-to-scroll Card Carousel in #FFF8F2 */}
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="w-[320px] sm:w-[380px] shrink-0 snap-start bg-[#FFF8F2] rounded-3xl p-6 sm:p-8 soft-shadow border border-[#F2EDE7] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Small #FF6B35 quotation mark accent */}
              <div className="absolute top-6 right-6 p-2 rounded-full bg-[#F2EDE7]">
                <Quote className="w-5 h-5 text-[#FF6B35] fill-[#FF6B35]" />
              </div>

              <div>
                {/* Rating Stars in #FFB703 */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB703] text-[#FFB703]" />
                  ))}
                </div>

                <p className="text-sm text-[#1F2937]/90 leading-relaxed font-normal mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F2937]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#FF6B35] bg-[#F2EDE7] px-2.5 py-1 rounded-full">
                    Favorite: {t.favoriteBean}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#1F2937]/70 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#FFB703]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1F2937]">
                      {t.author}
                    </h4>
                    <span className="text-[11px] text-[#1F2937]/70 block">
                      {t.role} · {t.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
