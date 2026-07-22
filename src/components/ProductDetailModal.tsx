import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Flame, MapPin, Mountain, Sprout, Check, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    grind: 'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso',
    quantity: number,
    frequency?: 'once' | 'every-2-weeks' | 'monthly'
  ) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState<'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso'>('Whole Bean');
  const [purchaseType, setPurchaseType] = useState<'once' | 'subscription'>('once');
  const [added, setAdded] = useState(false);

  const finalPrice =
    purchaseType === 'subscription' ? product.price * 0.85 * quantity : product.price * quantity;

  const handleAdd = () => {
    onAddToCart(
      product,
      grind,
      quantity,
      purchaseType === 'subscription' ? 'monthly' : 'once'
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2937]/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FFF8F2] w-full max-w-2xl rounded-3xl p-6 sm:p-8 soft-shadow-lg border border-[#F2EDE7] relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#F2EDE7] text-[#1F2937] hover:bg-[#FF6B35] hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Visual Header */}
            <div className="md:col-span-5 bg-[#F2EDE7] rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-[#FFF8F2]">
              <div className="w-28 h-36 rounded-xl bg-[#FFF8F2] border-2 border-[#FFB703] shadow-md flex flex-col justify-between p-3 mb-4">
                <div className="w-full h-2 rounded bg-[#FF6B35]" />
                <span className="font-serif text-sm font-bold text-[#1F2937]">
                  {product.name}
                </span>
                <span className="text-[10px] text-[#FF6B35] font-extrabold uppercase">
                  {product.roastLevel}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#1F2937]">
                <Star className="w-4 h-4 fill-[#FFB703] text-[#FFB703]" />
                <span>{product.rating} ({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Product Details & Specs */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider block">
                  {product.origin}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#1F2937]/80 mt-1">
                  {product.description}
                </p>
              </div>

              {/* Terroir Specifications */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F2EDE7] p-3 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span><strong>Elev:</strong> {product.elevation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span><strong>Process:</strong> {product.process}</span>
                </div>
              </div>

              {/* Flavor Profile Tags */}
              <div>
                <span className="text-xs font-bold text-[#1F2937] block mb-1">
                  Flavor Profile Notes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F2EDE7] text-[#1F2937] border border-[#1F2937]/10"
                    >
                      🍓 {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              {product.category !== 'pastries' && (
                <div>
                  <label className="text-xs font-bold text-[#1F2937] block mb-1.5">
                    Select Grind Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Whole Bean', 'Drip / Filter', 'French Press', 'Espresso'] as const).map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => setGrind(option)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                            grind === option
                              ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                              : 'bg-[#F2EDE7] text-[#1F2937] border-transparent hover:border-[#FFB703]'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Purchase Options (One-time vs Subscription) */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setPurchaseType('once')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                    purchaseType === 'once'
                      ? 'bg-[#FFF8F2] border-[#FF6B35] soft-shadow'
                      : 'bg-[#F2EDE7] border-transparent'
                  }`}
                >
                  <span>One-time Purchase</span>
                  <span>${product.price.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => setPurchaseType('subscription')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                    purchaseType === 'subscription'
                      ? 'bg-[#FFF8F2] border-[#FF6B35] soft-shadow'
                      : 'bg-[#F2EDE7] border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <div>
                      <span>Monthly Subscription</span>
                      <span className="text-[10px] text-[#FF6B35] block">Save 15% on every bag</span>
                    </div>
                  </div>
                  <span className="text-[#FF6B35]">${(product.price * 0.85).toFixed(2)} / bag</span>
                </button>
              </div>

              {/* Quantity & CTA */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex items-center rounded-full bg-[#F2EDE7] p-1 border border-[#1F2937]/10">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-[#FFF8F2] font-bold text-sm flex items-center justify-center hover:bg-[#FFB703]"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-sm text-[#1F2937]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-[#FFF8F2] font-bold text-sm flex items-center justify-center hover:bg-[#FFB703]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1 py-3.5 rounded-full bg-[#FF6B35] text-white font-bold text-xs shadow-md hover:bg-[#FFB703] hover:text-[#1F2937] transition-all flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${finalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
