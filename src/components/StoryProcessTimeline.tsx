import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/mockData';
import { Sprout, Flame, PackageCheck, Truck, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function StoryProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-[#8B4E2F]" />;
      case 'Flame':
        return <Flame className="w-7 h-7 text-[#8B4E2F]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-7 h-7 text-[#8B4E2F]" />;
      case 'Truck':
        return <Truck className="w-7 h-7 text-[#8B4E2F]" />;
      default:
        return <Sprout className="w-7 h-7 text-[#8B4E2F]" />;
    }
  };

  return (
    <section id="story-section" className="py-20 lg:py-28 bg-[#EFE3D2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F1E7] border border-[#C89B5C] text-xs font-bold text-[#2A1710]">
            <Sparkles className="w-3.5 h-3.5 text-[#8B4E2F]" />
            <span>Traceable Farm to Cup Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2A1710] tracking-tight">
            The Craft Behind Every Roast
          </h2>

          <p className="text-base text-[#2A1710]/80">
            From high-elevation mountain slopes to our zero-emissions roastery, explore how every step preserves distinct origin aromatics.
          </p>
        </motion.div>

        {/* Separated #E6D2BD Panel for Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-[#E6D2BD] rounded-3xl p-6 sm:p-10 soft-shadow-lg border border-[#F9F1E7] relative overflow-hidden"
        >
          
          {/* Step Selector Controls */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`relative text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? 'bg-[#F9F1E7] soft-shadow border-2 border-[#8B4E2F] scale-[1.02]'
                      : 'bg-[#EFE3D2]/80 hover:bg-[#F9F1E7]/60 border border-transparent'
                  }`}
                  data-cursor
                >
                  {/* Step numbers in a soft circular badge, #C89B5C background, #2A1710 text */}
                  <div className="w-9 h-9 rounded-full bg-[#C89B5C] text-[#2A1710] font-serif font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    0{step.number}
                  </div>

                  <div className="min-w-0">
                    <span className="text-xs font-extrabold text-[#2A1710] block truncate">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-[#8B4E2F] font-semibold block truncate">
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card Content */}
          <div className="bg-[#F9F1E7] rounded-2xl p-6 sm:p-8 soft-shadow border border-[#E6D2BD] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                {/* SVG Icon Draw-in animation */}
                <div className="p-3 rounded-2xl bg-[#E6D2BD] border border-[#C89B5C]/30">
                  {getIconComponent(PROCESS_STEPS[activeStep].icon)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#8B4E2F] uppercase tracking-wider block">
                    Step 0{PROCESS_STEPS[activeStep].number} Â· {PROCESS_STEPS[activeStep].location}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1710]">
                    {PROCESS_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-[#2A1710]/90 leading-relaxed font-normal">
                {PROCESS_STEPS[activeStep].description}
              </p>

              {/* Detail Stats Badge */}
              <div className="p-4 rounded-xl bg-[#E6D2BD] border-l-4 border-[#8B4E2F] text-xs font-bold text-[#2A1710]">
                âœ¨ {PROCESS_STEPS[activeStep].detailStats}
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-5 h-64 rounded-2xl bg-[#E6D2BD] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-[#F9F1E7]">
              <div className="w-20 h-20 rounded-full bg-[#C89B5C]/30 flex items-center justify-center mb-4">
                {getIconComponent(PROCESS_STEPS[activeStep].icon)}
              </div>
              <span className="font-serif text-lg font-bold text-[#2A1710]">
                {PROCESS_STEPS[activeStep].subtitle}
              </span>
              <span className="text-xs text-[#2A1710]/70 mt-1">
                Precision Craftsmanship at every phase
              </span>
            </div>

          </div>

          {/* Horizontal Next/Prev Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9F1E7] text-xs font-bold text-[#2A1710] hover:bg-[#C89B5C] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Phase</span>
            </button>

            <span className="text-xs font-bold text-[#2A1710]/60">
              Phase {activeStep + 1} of {PROCESS_STEPS.length}
            </span>

            <button
              onClick={() => setActiveStep((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0))}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B4E2F] text-xs font-bold text-white hover:bg-[#C89B5C] hover:text-[#2A1710] transition-colors shadow-sm"
            >
              <span>Next Phase</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
