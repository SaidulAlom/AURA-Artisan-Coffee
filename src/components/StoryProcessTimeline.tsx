import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/mockData';
import { Sprout, Flame, PackageCheck, Truck, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function StoryProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-coffee-roasted" />;
      case 'Flame':
        return <Flame className="w-7 h-7 text-coffee-roasted" />;
      case 'PackageCheck':
        return <PackageCheck className="w-7 h-7 text-coffee-roasted" />;
      case 'Truck':
        return <Truck className="w-7 h-7 text-coffee-roasted" />;
      default:
        return <Sprout className="w-7 h-7 text-coffee-roasted" />;
    }
  };

  return (
    <section id="story-section" className="py-20 lg:py-28 bg-coffee-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coffee-milk border border-coffee-caramel text-xs font-bold text-coffee-espresso">
            <Sparkles className="w-3.5 h-3.5 text-coffee-roasted" />
            <span>Traceable Farm to Cup Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-coffee-espresso tracking-tight">
            The Craft Behind Every Roast
          </h2>

          <p className="text-base text-coffee-espresso/80">
            From high-elevation mountain slopes to our zero-emissions roastery, explore how every step preserves distinct origin aromatics.
          </p>
        </motion.div>

        {/* Separated #E6D2BD Panel for Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-coffee-latte rounded-3xl p-6 sm:p-10 soft-shadow-lg border border-coffee-milk relative overflow-hidden"
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
                      ? 'bg-coffee-milk soft-shadow border-2 border-coffee-roasted scale-[1.02]'
                      : 'bg-coffee-cream/80 hover:bg-coffee-milk/60 border border-transparent'
                  }`}
                  data-cursor
                >
                  {/* Step numbers in a soft circular badge, #C89B5C background, #2A1710 text */}
                  <div className="w-9 h-9 rounded-full bg-coffee-caramel text-coffee-espresso font-serif font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    0{step.number}
                  </div>

                  <div className="min-w-0">
                    <span className="text-xs font-extrabold text-coffee-espresso block truncate">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-coffee-roasted font-semibold block truncate">
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card Content */}
          <div className="bg-coffee-milk rounded-2xl p-6 sm:p-8 soft-shadow border border-coffee-latte grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                {/* SVG Icon Draw-in animation */}
                <div className="p-3 rounded-2xl bg-coffee-latte border border-coffee-caramel/30">
                  {getIconComponent(PROCESS_STEPS[activeStep].icon)}
                </div>
                <div>
                  <span className="text-xs font-bold text-coffee-roasted uppercase tracking-wider block">
                    Step 0{PROCESS_STEPS[activeStep].number} · {PROCESS_STEPS[activeStep].location}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-coffee-espresso">
                    {PROCESS_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-coffee-espresso/90 leading-relaxed font-normal">
                {PROCESS_STEPS[activeStep].description}
              </p>

              {/* Detail Stats Badge */}
              <div className="p-4 rounded-xl bg-coffee-latte border-l-4 border-coffee-roasted text-xs font-bold text-coffee-espresso">
                ✨ {PROCESS_STEPS[activeStep].detailStats}
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-5 h-64 rounded-2xl bg-coffee-latte p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-coffee-milk">
              <div className="w-20 h-20 rounded-full bg-coffee-caramel/30 flex items-center justify-center mb-4">
                {getIconComponent(PROCESS_STEPS[activeStep].icon)}
              </div>
              <span className="font-serif text-lg font-bold text-coffee-espresso">
                {PROCESS_STEPS[activeStep].subtitle}
              </span>
              <span className="text-xs text-coffee-espresso/70 mt-1">
                Precision Craftsmanship at every phase
              </span>
            </div>

          </div>

          {/* Horizontal Next/Prev Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-milk text-xs font-bold text-coffee-espresso hover:bg-coffee-caramel transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Phase</span>
            </button>

            <span className="text-xs font-bold text-coffee-espresso/60">
              Phase {activeStep + 1} of {PROCESS_STEPS.length}
            </span>

            <button
              onClick={() => setActiveStep((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0))}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-roasted text-xs font-bold text-white hover:bg-coffee-caramel hover:text-coffee-espresso transition-colors shadow-sm"
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
