import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Coffee, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface CoffeeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedProduct: (product: Product) => void;
}

export default function CoffeeQuizModal({
  isOpen,
  onClose,
  onSelectRecommendedProduct,
}: CoffeeQuizModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    brewMethod: '',
    flavorProfile: '',
    roastPreference: '',
  });

  if (!isOpen) return null;

  const handleSelectAnswer = (key: keyof typeof answers, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Recommendation step
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ brewMethod: '', flavorProfile: '', roastPreference: '' });
  };

  // Logic to calculate recommendation match
  const getRecommendation = (): Product => {
    if (answers.roastPreference === 'Light' || answers.flavorProfile === 'Floral & Peach') {
      return PRODUCTS.find((p) => p.id === 'ethiopia-yirgacheffe') || PRODUCTS[0];
    }
    if (answers.brewMethod === 'Espresso' || answers.flavorProfile === 'Dark Chocolate & Nuts') {
      return PRODUCTS.find((p) => p.id === 'velvet-espresso') || PRODUCTS[2];
    }
    if (answers.flavorProfile === 'Tropical Fruit & Guava') {
      return PRODUCTS.find((p) => p.id === 'colombia-pink-bourbon') || PRODUCTS[1];
    }
    return PRODUCTS[0];
  };

  const recommendedProduct = getRecommendation();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2937]/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FFF8F2] w-full max-w-lg rounded-3xl p-6 sm:p-8 soft-shadow-lg border border-[#F2EDE7] relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#F2EDE7] text-[#1F2937] hover:bg-[#FF6B35] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {step <= 3 && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB703] text-[#1F2937] text-[11px] font-extrabold mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Interactive Roast Quiz · Step {step} of 3</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1F2937]">
                  {step === 1 && 'How do you usually brew your coffee?'}
                  {step === 2 && 'What flavor notes speak to your palate?'}
                  {step === 3 && 'Which roast level intensity do you prefer?'}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {step === 1 && (
                  <>
                    {[
                      { title: 'Pour Over / Chemex / V60', icon: '☕' },
                      { title: 'Espresso Machine / Moka Pot', icon: '⚡' },
                      { title: 'French Press / Immersion', icon: '🫖' },
                      { title: 'Drip Coffee Maker / Cold Brew', icon: '🧊' },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        onClick={() => handleSelectAnswer('brewMethod', opt.title)}
                        className="w-full text-left p-4 rounded-2xl bg-[#F2EDE7] hover:bg-[#FFB703]/30 border border-transparent hover:border-[#FFB703] text-sm font-bold text-[#1F2937] flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xl">{opt.icon}</span>
                          <span>{opt.title}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
                      </button>
                    ))}
                  </>
                )}

                {step === 2 && (
                  <>
                    {[
                      { title: 'Floral & Peach', desc: 'Tea-like, jasmine floral & juicy peach' },
                      { title: 'Dark Chocolate & Nuts', desc: 'Rich cocoa, toasted hazelnut & caramel' },
                      { title: 'Tropical Fruit & Guava', desc: 'Exotic guava, raw honey & vibrant acidity' },
                      { title: 'Toffee & Smooth Spices', desc: 'Balanced butter toffee & subtle spice' },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        onClick={() => handleSelectAnswer('flavorProfile', opt.title)}
                        className="w-full text-left p-4 rounded-2xl bg-[#F2EDE7] hover:bg-[#FFB703]/30 border border-transparent hover:border-[#FFB703] text-[#1F2937] flex items-center justify-between transition-all"
                      >
                        <div>
                          <span className="text-sm font-bold block">{opt.title}</span>
                          <span className="text-xs text-[#1F2937]/70 block">{opt.desc}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
                      </button>
                    ))}
                  </>
                )}

                {step === 3 && (
                  <>
                    {[
                      { title: 'Light', desc: 'Vibrant acidity, origin characteristics highlighted' },
                      { title: 'Medium-Light', desc: 'Balanced sweetness & floral aromatics' },
                      { title: 'Medium-Dark', desc: 'Full-bodied, chocolate depth & low acidity' },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        onClick={() => handleSelectAnswer('roastPreference', opt.title)}
                        className="w-full text-left p-4 rounded-2xl bg-[#F2EDE7] hover:bg-[#FFB703]/30 border border-transparent hover:border-[#FFB703] text-[#1F2937] flex items-center justify-between transition-all"
                      >
                        <div>
                          <span className="text-sm font-bold block">{opt.title} Roast</span>
                          <span className="text-xs text-[#1F2937]/70 block">{opt.desc}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Recommendation Result */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFB703] text-[#1F2937] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider block">
                  100% Match Recommendation
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-[#1F2937] mt-1">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs text-[#1F2937]/80 mt-2">
                  {recommendedProduct.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2EDE7] text-left space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#1F2937]/70">Flavor Notes:</span>
                  <span className="font-bold text-[#1F2937]">{recommendedProduct.notes.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1F2937]/70">Roast Profile:</span>
                  <span className="font-bold text-[#FF6B35]">{recommendedProduct.roastLevel}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-3 rounded-full bg-[#F2EDE7] text-[#1F2937] text-xs font-bold hover:bg-[#FFB703] flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSelectRecommendedProduct(recommendedProduct);
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#FF6B35] text-white font-bold text-xs shadow-md hover:bg-[#FFB703] hover:text-[#1F2937] transition-all"
                >
                  View Matched Coffee (${recommendedProduct.price.toFixed(2)})
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
