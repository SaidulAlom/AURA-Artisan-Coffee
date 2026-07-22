import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Bean, Award, Droplets, MapPin, Compass, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onStoryClick: () => void;
}

interface HeroProductCard {
  id: string;
  name: string;
  origin: string;
  altitude: string;
  process: string;
  score: number;
  roastLevel: 'Light' | 'Light-Medium' | 'Medium';
  roastFill: number; // percentage for roast bar
  notes: string[];
  bagsLeft: number;
  bgGradient: string;
  accentColor: string;
}

const FEATURED_HARVESTS: HeroProductCard[] = [
  {
    id: 'ethiopia-yirga',
    name: 'Ethiopian Yirgacheffe',
    origin: 'Gedeo Zone, 2,100m',
    altitude: '2,100 Meters',
    process: 'Washed Micro-Lot',
    score: 94,
    roastLevel: 'Light-Medium',
    roastFill: 35,
    notes: ['Jasmine Floral', 'Crisp White Peach', 'Bergamot Zest'],
    bagsLeft: 28,
    bgGradient: 'from-[#F9F1E7] via-[#F4E6D6] to-[#E6D2BD]',
    accentColor: '#8B4E2F',
  },
  {
    id: 'guatemala-huehue',
    name: 'Guatemala Huehuetenango',
    origin: 'Los Cuchumatanes, 1,850m',
    altitude: '1,850 Meters',
    process: 'Honey Process',
    score: 92,
    roastLevel: 'Medium',
    roastFill: 55,
    notes: ['Dark Chocolate', 'Blood Orange', 'Raw Sugar'],
    bagsLeft: 42,
    bgGradient: 'from-[#F9F1E7] via-[#F3E3CD] to-[#E6D2BD]',
    accentColor: '#C89B5C',
  },
  {
    id: 'colombia-pink-bourbon',
    name: 'Colombia Pink Bourbon',
    origin: 'Huila Micro-Lot, 1,950m',
    altitude: '1,950 Meters',
    process: 'Anaerobic Fermentation',
    score: 95,
    roastLevel: 'Light',
    roastFill: 25,
    notes: ['Wild Strawberry', 'Pink Grapefruit', 'Honeyed Rose'],
    bagsLeft: 16,
    bgGradient: 'from-[#F9F1E7] via-[#EFD8C6] to-[#E6D2BD]',
    accentColor: '#8B4E2F',
  },
];

export default function HeroSection({ onShopClick, onStoryClick }: HeroSectionProps) {
  const [activeHarvestId, setActiveHarvestId] = useState<string>('ethiopia-yirga');

  const activeHarvest = FEATURED_HARVESTS.find((h) => h.id === activeHarvestId) || FEATURED_HARVESTS[0];

  // Line by line reveal variants for text
  const heroEase: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.15 + i * 0.12,
        ease: heroEase,
      },
    }),
  };

  return (
    <section className="hero-section relative min-h-[90vh] pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden flex flex-col justify-center">
      
      {/* Refined Minimalist Background Architecture (No 3D) */}
      {/* Soft Ambient Light Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C89B5C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#8B4E2F]/08 rounded-full blur-3xl pointer-events-none" />

      {/* Abstract Architectural SVG Grid Lines & Warm Concentric Arches */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2A1710" strokeWidth="0.5" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
          {/* Subtle Accent Concentric Arches on the right side */}
          <circle cx="85%" cy="50%" r="320" fill="none" stroke="#C89B5C" strokeWidth="1" strokeDasharray="6 6" opacity="0.25" />
          <circle cx="85%" cy="50%" r="220" fill="none" stroke="#8B4E2F" strokeWidth="1" opacity="0.15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F9F1E7] border border-[#C89B5C]/40 text-[#2A1710] text-xs font-bold shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B4E2F] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#8B4E2F]" />
              <span>Small-Batch Micro-Lot Harvests Â· Roasted Fresh Daily</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#2A1710] tracking-tight leading-[1.08]"
                >
                  Tactile Motion.
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#8B4E2F] tracking-tight leading-[1.08]"
                >
                  Artisanal Coffee.
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="text-base sm:text-lg text-[#2A1710]/80 font-normal max-w-xl pt-3 leading-relaxed"
                >
                  Experience direct-trade, single-origin beans roasted with zero-emissions convection heat. Pure floral clarity, rich velvet crema, delivered to your doorstep within 48 hours.
                </motion.p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA button */}
              <button
                onClick={onShopClick}
                className="relative group px-8 py-4 rounded-full bg-[#8B4E2F] text-white font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center gap-3 overflow-hidden"
                data-cursor
                data-cursor-text="Explore"
              >
                <span className="absolute inset-0 w-full h-full bg-[#C89B5C] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0" />
                <span className="relative z-10 group-hover:text-[#2A1710] transition-colors">
                  Shop Fresh Harvests
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:text-[#2A1710] transition-all" />
              </button>

              {/* Secondary text button */}
              <button
                onClick={onStoryClick}
                className="relative py-2 px-4 text-base font-bold text-[#2A1710] hover:text-[#8B4E2F] transition-colors group flex items-center gap-2"
                data-cursor
              >
                <span>Explore Sourcing Story</span>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C89B5C] transition-transform duration-300 group-hover:scale-x-105" />
              </button>
            </motion.div>

            {/* Key Micro Value Guarantees */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-[#2A1710]/10"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#8B4E2F] shrink-0" />
                <span className="text-xs font-semibold text-[#2A1710]/90">Roasted Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C89B5C] shrink-0" />
                <span className="text-xs font-semibold text-[#2A1710]/90">Direct Trade Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Bean className="w-4 h-4 text-[#8B4E2F] shrink-0" />
                <span className="text-xs font-semibold text-[#2A1710]/90">Nitrogen Sealed Fresh</span>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Column: Clean Minimal Aesthetic Showcase Card (Zero 3D) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              
              {/* Micro-Lot Harvest Selector Tabs */}
              <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
                {FEATURED_HARVESTS.map((harvest) => (
                  <button
                    key={harvest.id}
                    onClick={() => setActiveHarvestId(harvest.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                      activeHarvestId === harvest.id
                        ? 'bg-[#8B4E2F] text-white shadow-sm scale-105'
                        : 'bg-[#F9F1E7] text-[#2A1710]/80 hover:bg-[#E6D2BD] border border-[#2A1710]/5'
                    }`}
                    data-cursor
                  >
                    <span>{harvest.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Main Minimal Aesthetic Showcase Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHarvest.id}
                  initial={{ opacity: 0, scale: 0.97, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`bg-gradient-to-br ${activeHarvest.bgGradient} rounded-3xl p-6 sm:p-8 soft-shadow-lg border border-[#F9F1E7] relative overflow-hidden`}
                >
                  
                  {/* Top Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8B4E2F] uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{activeHarvest.origin}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A1710]">
                        {activeHarvest.name}
                      </h3>
                    </div>

                    {/* Score Badge */}
                    <div className="bg-[#F9F1E7] p-2.5 rounded-2xl soft-shadow border border-[#C89B5C]/30 text-center shrink-0">
                      <div className="flex items-center justify-center gap-1 text-[#C89B5C]">
                        <Award className="w-4 h-4 fill-[#C89B5C]" />
                        <span className="font-mono text-base font-extrabold text-[#2A1710]">
                          {activeHarvest.score}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#2A1710]/60 block uppercase">
                        SCA Score
                      </span>
                    </div>
                  </div>

                  {/* Flavor Profile Tasting Chips */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold text-[#2A1710]/70 uppercase tracking-wider block">
                      Tasting Aromas & Notes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeHarvest.notes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-[#F9F1E7] text-[#2A1710] text-xs font-bold border border-[#E6D2BD] shadow-xs flex items-center gap-1.5"
                        >
                          <Droplets className="w-3 h-3 text-[#8B4E2F]" />
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                    <div className="bg-[#F9F1E7]/80 p-3 rounded-2xl border border-[#E6D2BD]">
                      <span className="text-[10px] text-[#2A1710]/60 font-semibold block">Processing</span>
                      <span className="font-bold text-[#2A1710]">{activeHarvest.process}</span>
                    </div>
                    <div className="bg-[#F9F1E7]/80 p-3 rounded-2xl border border-[#E6D2BD]">
                      <span className="text-[10px] text-[#2A1710]/60 font-semibold block">Altitude</span>
                      <span className="font-bold text-[#2A1710]">{activeHarvest.altitude}</span>
                    </div>
                  </div>

                  {/* Roast Level Bar */}
                  <div className="bg-[#F9F1E7] p-3.5 rounded-2xl border border-[#E6D2BD] space-y-2 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#2A1710] flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#8B4E2F]" />
                        <span>Roast Profile</span>
                      </span>
                      <span className="font-bold text-[#8B4E2F] text-xs">{activeHarvest.roastLevel}</span>
                    </div>

                    <div className="w-full bg-[#E6D2BD] h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeHarvest.roastFill}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#C89B5C] to-[#8B4E2F] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#2A1710]/80 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#8B4E2F]" />
                      <span><strong>{activeHarvest.bagsLeft} bags</strong> remaining in batch</span>
                    </div>

                    <button
                      onClick={onShopClick}
                      className="px-4 py-2 rounded-full bg-[#2A1710] text-white text-xs font-bold hover:bg-[#8B4E2F] transition-colors flex items-center gap-1.5"
                      data-cursor
                    >
                      <span>Reserve Lot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Decorative Subtle Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-4 -right-2 sm:right-4 bg-[#F9F1E7] px-4 py-2 rounded-2xl soft-shadow border border-[#C89B5C]/40 flex items-center gap-2.5 z-20 pointer-events-none"
              >
                <div className="w-3 h-3 rounded-full bg-[#8B4E2F] animate-ping" />
                <span className="text-xs font-extrabold text-[#2A1710]">Roaster's Choice Â· Fresh Batch</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
