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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1710]/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#F9F1E7] w-full max-w-2xl rounded-3xl p-6 sm:p-8 soft-shadow-lg border border-[#E6D2BD] relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#E6D2BD] text-[#2A1710] hover:bg-[#8B4E2F] hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Visual Header */}
            <div className="md:col-span-5 bg-[#E6D2BD] rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-[#F9F1E7]">
              <div className="w-28 h-36 rounded-xl bg-[#F9F1E7] border-2 border-[#C89B5C] shadow-md flex flex-col justify-between p-3 mb-4">
                <div className="w-full h-2 rounded bg-[#8B4E2F]" />
                <span className="font-serif text-sm font-bold text-[#2A1710]">
                  {product.name}
                </span>
                <span className="text-[10px] text-[#8B4E2F] font-extrabold uppercase">
                  {product.roastLevel}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#2A1710]">
                <Star className="w-4 h-4 fill-[#C89B5C] text-[#C89B5C]" />
                <span>{product.rating} ({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Product Details & Specs */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <span className="text-xs font-bold text-[#8B4E2F] uppercase tracking-wider block">
                  {product.origin}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A1710]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#2A1710]/80 mt-1">
                  {product.description}
                </p>
              </div>

              {/* Terroir Specifications */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#E6D2BD] p-3 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-[#8B4E2F]" />
                  <span><strong>Elev:</strong> {product.elevation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#8B4E2F]" />
                  <span><strong>Process:</strong> {product.process}</span>
                </div>
              </div>

              {/* Flavor Profile Tags */}
              <div>
                <span className="text-xs font-bold text-[#2A1710] block mb-1">
                  Flavor Profile Notes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E6D2BD] text-[#2A1710] border border-[#2A1710]/10"
                    >
                      ðŸ“ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              {product.category !== 'pastries' && (
                <div>
                  <label className="text-xs font-bold text-[#2A1710] block mb-1.5">
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
                              ? 'bg-[#8B4E2F] text-white border-[#8B4E2F]'
                              : 'bg-[#E6D2BD] text-[#2A1710] border-transparent hover:border-[#C89B5C]'
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
                      ? 'bg-[#F9F1E7] border-[#8B4E2F] soft-shadow'
                      : 'bg-[#E6D2BD] border-transparent'
                  }`}
                >
                  <span>One-time Purchase</span>
                  <span>${product.price.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => setPurchaseType('subscription')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                    purchaseType === 'subscription'
                      ? 'bg-[#F9F1E7] border-[#8B4E2F] soft-shadow'
                      : 'bg-[#E6D2BD] border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#8B4E2F]" />
                    <div>
                      <span>Monthly Subscription</span>
                      <span className="text-[10px] text-[#8B4E2F] block">Save 15% on every bag</span>
                    </div>
                  </div>
                  <span className="text-[#8B4E2F]">${(product.price * 0.85).toFixed(2)} / bag</span>
                </button>
              </div>

              {/* Quantity & CTA */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex items-center rounded-full bg-[#E6D2BD] p-1 border border-[#2A1710]/10">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-[#F9F1E7] font-bold text-sm flex items-center justify-center hover:bg-[#C89B5C]"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-sm text-[#2A1710]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-[#F9F1E7] font-bold text-sm flex items-center justify-center hover:bg-[#C89B5C]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1 py-3.5 rounded-full bg-[#8B4E2F] text-white font-bold text-xs shadow-md hover:bg-[#C89B5C] hover:text-[#2A1710] transition-all flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag Â· ${finalPrice.toFixed(2)}</span>
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
