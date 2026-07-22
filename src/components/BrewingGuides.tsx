import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Timer, Droplets, Scale, Thermometer, Clock, CheckCircle2, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

interface MethodGuide {
  id: string;
  name: string;
  grindSize: string;
  ratio: string;
  defaultCoffeeGrams: number;
  waterTemp: string;
  brewTime: string;
  description: string;
  iconSvg: string;
  steps: {
    title: string;
    duration: string;
    instruction: string;
    tip?: string;
  }[];
}

const BREWING_METHODS: MethodGuide[] = [
  {
    id: 'pour-over',
    name: 'Pour Over / V60',
    grindSize: 'Medium-Fine (Sea Salt Consistency)',
    ratio: '1 : 16 (Coffee to Water)',
    defaultCoffeeGrams: 20,
    waterTemp: '93°C / 200°F',
    brewTime: '3:00 min',
    description: 'Highlights sparkling floral, peach, and citrus notes with crystal-clear cup purity.',
    iconSvg: 'PourOver',
    steps: [
      {
        title: 'Rinse Filter & Preheat',
        duration: '0:00 - 0:15',
        instruction: 'Place paper filter in V60 cone and rinse thoroughly with boiling water. Discard rinse water.',
        tip: 'Eliminates paper taste and warms your mug.'
      },
      {
        title: 'The Bloom Pour',
        duration: '0:15 - 0:45',
        instruction: 'Pour 50g of hot water in gentle concentric circles over 20g ground coffee. Allow CO2 gas to bloom.',
        tip: 'Watch the coffee expand and bubble for 30 seconds.'
      },
      {
        title: 'Main Pour Phase',
        duration: '0:45 - 2:00',
        instruction: 'Pour water in steady spirals until reaching 320g total weight. Keep water level steady.',
        tip: 'Avoid pouring directly onto paper filter edges.'
      },
      {
        title: 'Final Drawdown & Serve',
        duration: '2:00 - 3:00',
        instruction: 'Give cone a gentle swirl. Let water drain completely. Swirl server before pouring.',
        tip: 'Enjoy as it cools slightly for fuller flavor expression.'
      }
    ]
  },
  {
    id: 'french-press',
    name: 'French Press',
    grindSize: 'Coarse (Breadcrumb Consistency)',
    ratio: '1 : 15 (Coffee to Water)',
    defaultCoffeeGrams: 30,
    waterTemp: '96°C / 205°F',
    brewTime: '4:00 min',
    description: 'Full-bodied, velvety extraction with rich chocolate notes and lingering mouthfeel.',
    iconSvg: 'FrenchPress',
    steps: [
      {
        title: 'Preheat & Add Grounds',
        duration: '0:00',
        instruction: 'Warm French Press beaker with hot water, discard, and add 30g coarse ground coffee.',
      },
      {
        title: 'Saturation Pour',
        duration: '0:00 - 0:30',
        instruction: 'Pour 450g of hot water rapidly, ensuring all coffee grounds are fully saturated.',
        tip: 'No stirring needed yet — let natural convection happen.'
      },
      {
        title: 'The Four-Minute Steep',
        duration: '0:30 - 4:00',
        instruction: 'Place lid on top with plunger raised. Let steep undisturbed for 4 minutes.',
        tip: 'At 4 minutes, gently break surface crust with a spoon for cleaner cup.'
      },
      {
        title: 'Gentle Press & Serve',
        duration: '4:00',
        instruction: 'Press plunger down slowly with uniform pressure. Decant immediately into cup.',
        tip: 'Do not leave brewed coffee in press to avoid over-extraction.'
      }
    ]
  },
  {
    id: 'espresso',
    name: 'Espresso Extraction',
    grindSize: 'Fine (Table Salt / Powder)',
    ratio: '1 : 2 (Yield Ratio)',
    defaultCoffeeGrams: 18,
    waterTemp: '92°C / 198°F',
    brewTime: '0:28 sec',
    description: 'Intense micro-extraction with dense golden velvet crema and lingering dark cocoa finish.',
    iconSvg: 'Espresso',
    steps: [
      {
        title: 'Dose & WDT Distribution',
        duration: 'Preparation',
        instruction: 'Dose 18g finely ground coffee into dry portafilter basket. Use WDT needle to de-clump.',
      },
      {
        title: 'Level & Tamp Firmly',
        duration: 'Preparation',
        instruction: 'Tamp level with 15kg (30lbs) of uniform downward pressure.',
        tip: 'Keep tamp strictly level to prevent water channeling.'
      },
      {
        title: 'Pre-Infusion & Pull Shot',
        duration: '0:00 - 0:28',
        instruction: 'Lock portafilter and start shot immediately. Target 36g liquid yield in 28-30 seconds.',
        tip: 'Crema should look rich hazelnut with tiger-stripe flecks.'
      }
    ]
  },
  {
    id: 'cold-brew',
    name: 'Slow Cold Brew',
    grindSize: 'Extra Coarse (Kosher Salt Consistency)',
    ratio: '1 : 8 (Concentrate Ratio)',
    defaultCoffeeGrams: 100,
    waterTemp: 'Room Temp / Chilled Filtered Water',
    brewTime: '18 - 24 Hours',
    description: 'Ultra-smooth, zero-bitterness cold steep with naturally high sweetness and low acidity.',
    iconSvg: 'ColdBrew',
    steps: [
      {
        title: 'Mix Grounds & Cold Water',
        duration: '0:00',
        instruction: 'Combine 100g extra coarse grounds with 800ml cold filtered water in a glass vessel.',
      },
      {
        title: 'Gently Submerge & Steep',
        duration: '18 - 24 Hours',
        instruction: 'Gently stir to wet all grounds. Seal and let steep at room temperature or in fridge.',
        tip: 'Longer steep time equals richer chocolate sweetness.'
      },
      {
        title: 'Double Filter & Dilute',
        duration: 'Completion',
        instruction: 'Filter through fine mesh strainer and paper filter. Dilute concentrate 1:1 with ice or milk.',
      }
    ]
  }
];

export default function BrewingGuides() {
  const [activeMethodId, setActiveMethodId] = useState<string>('pour-over');
  const [customCoffeeGrams, setCustomCoffeeGrams] = useState<number>(20);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const activeMethod = BREWING_METHODS.find((m) => m.id === activeMethodId) || BREWING_METHODS[0];

  // Calculate proportional water based on coffee grams
  const ratioMultiplier = activeMethod.id === 'french-press' ? 15 : activeMethod.id === 'cold-brew' ? 8 : activeMethod.id === 'espresso' ? 2 : 16;
  const calculatedWater = customCoffeeGrams * ratioMultiplier;

  // Simple Timer effect
  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  return (
    <section id="guides-section" className="py-20 lg:py-28 bg-[#FFF8F2] relative border-t border-[#F2EDE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EDE7] border border-[#FFB703] text-xs font-bold text-[#1F2937]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Interactive Barista Academy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            Precision Brewing Guides
          </h2>

          <p className="text-base text-[#1F2937]/80">
            Master every extraction. Adjust your coffee dose to calculate exact water ratios, grind sizes, and follow step-by-step timers.
          </p>
        </motion.div>

        {/* Method Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar pb-4 mb-10"
        >
          {BREWING_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setActiveMethodId(method.id);
                setCustomCoffeeGrams(method.defaultCoffeeGrams);
                setActiveStepIndex(0);
                resetTimer();
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2.5 ${
                activeMethodId === method.id
                  ? 'bg-[#FF6B35] text-white shadow-md scale-105'
                  : 'bg-[#F2EDE7] text-[#1F2937] hover:bg-[#FFB703]/30'
              }`}
              data-cursor
            >
              <span>{method.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Interactive Guide Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-[#F2EDE7] rounded-3xl p-6 sm:p-10 soft-shadow-lg border border-[#FFF8F2] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Left Column: Method Specifications & Interactive Calculator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFF8F2] rounded-2xl p-6 soft-shadow space-y-4 border border-[#F2EDE7]">
              
              <div className="flex items-center justify-between border-b border-[#F2EDE7] pb-4">
                <div>
                  <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider block">
                    Brewing Method
                  </span>
                  <h3 className="font-serif text-2xl font-extrabold text-[#1F2937]">
                    {activeMethod.name}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFB703]/20 flex items-center justify-center text-[#FF6B35]">
                  <Droplets className="w-6 h-6" />
                </div>
              </div>

              <p className="text-xs text-[#1F2937]/80 leading-relaxed">
                {activeMethod.description}
              </p>

              {/* Water Ratio Interactive Calculator */}
              <div className="bg-[#F2EDE7] p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-[#FF6B35]" />
                    <span>Coffee Dose (Grams)</span>
                  </span>
                  <span className="font-serif font-extrabold text-sm text-[#FF6B35]">
                    {customCoffeeGrams}g
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={customCoffeeGrams}
                  onChange={(e) => setCustomCoffeeGrams(Number(e.target.value))}
                  className="w-full accent-[#FF6B35] cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                  <div className="bg-[#FFF8F2] p-2.5 rounded-lg border border-[#1F2937]/5">
                    <span className="text-[10px] text-[#1F2937]/60 block font-semibold">Water Needed</span>
                    <span className="font-bold text-[#1F2937] text-sm">{calculatedWater} {activeMethod.id === 'espresso' ? 'g yield' : 'ml'}</span>
                  </div>
                  <div className="bg-[#FFF8F2] p-2.5 rounded-lg border border-[#1F2937]/5">
                    <span className="text-[10px] text-[#1F2937]/60 block font-semibold">Target Ratio</span>
                    <span className="font-bold text-[#FF6B35] text-sm">{activeMethod.ratio}</span>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F2EDE7]">
                  <span className="text-[10px] text-[#1F2937]/60 font-semibold block">Grind Size</span>
                  <span className="font-bold text-[#1F2937]">{activeMethod.grindSize}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F2EDE7]">
                  <span className="text-[10px] text-[#1F2937]/60 font-semibold block">Water Temp</span>
                  <span className="font-bold text-[#1F2937]">{activeMethod.waterTemp}</span>
                </div>
              </div>

              {/* Built-in Stopwatch Barista Companion */}
              <div className="p-4 rounded-xl bg-[#1F2937] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#FFB703] font-extrabold uppercase tracking-wider block">
                    Barista Brew Timer
                  </span>
                  <span className="font-mono text-2xl font-bold tracking-wider">
                    {formatTimer(timerSeconds)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2.5 rounded-full bg-[#FF6B35] text-white hover:bg-[#FFB703] hover:text-[#1F2937] transition-colors"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-2.5 rounded-full bg-[#FFF8F2]/20 text-white hover:bg-[#FFF8F2]/40 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Step-by-Step Instructions */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF6B35]" />
              <span>Step-by-Step Extraction Sequence</span>
            </h4>

            <div className="space-y-3">
              {activeMethod.steps.map((step, idx) => {
                const isCurrent = activeStepIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-5 rounded-2xl transition-all cursor-pointer border ${
                      isCurrent
                        ? 'bg-[#FFF8F2] soft-shadow-lg border-[#FF6B35] scale-[1.01]'
                        : 'bg-[#FFF8F2]/70 hover:bg-[#FFF8F2] border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-[#FF6B35] text-white'
                              : 'bg-[#FFB703] text-[#1F2937]'
                          }`}
                        >
                          {idx + 1}
                        </div>

                        <div>
                          <h5 className="font-serif text-base font-bold text-[#1F2937]">
                            {step.title}
                          </h5>
                          <span className="text-[11px] font-semibold text-[#FF6B35]">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      {isCurrent && (
                        <CheckCircle2 className="w-5 h-5 text-[#FF6B35] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-[#1F2937]/90 mt-2 leading-relaxed font-normal pl-10">
                      {step.instruction}
                    </p>

                    {step.tip && (
                      <div className="mt-2 ml-10 p-2.5 rounded-lg bg-[#F2EDE7] text-[11px] text-[#1F2937] font-medium border-l-2 border-[#FFB703]">
                        💡 <strong>Pro Tip:</strong> {step.tip}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
