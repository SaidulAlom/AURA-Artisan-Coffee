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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-espresso/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-coffee-milk w-full max-w-2xl rounded-3xl p-6 sm:p-8 soft-shadow-lg border border-coffee-latte relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-coffee-latte text-coffee-espresso hover:bg-coffee-roasted hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Visual Header */}
            <div className="md:col-span-5 bg-coffee-latte rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-coffee-milk">
              <div className="w-28 h-36 rounded-xl bg-coffee-milk border-2 border-coffee-caramel shadow-md flex flex-col justify-between p-3 mb-4">
                <div className="w-full h-2 rounded bg-coffee-roasted" />
                <span className="font-serif text-sm font-bold text-coffee-espresso">
                  {product.name}
                </span>
                <span className="text-[10px] text-coffee-roasted font-extrabold uppercase">
                  {product.roastLevel}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-coffee-espresso">
                <Star className="w-4 h-4 fill-coffee-caramel text-coffee-caramel" />
                <span>{product.rating} ({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Product Details & Specs */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <span className="text-xs font-bold text-coffee-roasted uppercase tracking-wider block">
                  {product.origin}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-coffee-espresso">
                  {product.name}
                </h2>
                <p className="text-xs text-coffee-espresso/80 mt-1">
                  {product.description}
                </p>
              </div>

              {/* Terroir Specifications */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-coffee-latte p-3 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-coffee-roasted" />
                  <span><strong>Elev:</strong> {product.elevation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-coffee-roasted" />
                  <span><strong>Process:</strong> {product.process}</span>
                </div>
              </div>

              {/* Flavor Profile Tags */}
              <div>
                <span className="text-xs font-bold text-coffee-espresso block mb-1">
                  Flavor Profile Notes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full bg-coffee-latte text-coffee-espresso border border-coffee-espresso/10"
                    >
                      🍎 {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              {product.category !== 'pastries' && (
                <div>
                  <label className="text-xs font-bold text-coffee-espresso block mb-1.5">
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
                              ? 'bg-coffee-roasted text-white border-coffee-roasted'
                              : 'bg-coffee-latte text-coffee-espresso border-transparent hover:border-coffee-caramel'
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
                      ? 'bg-coffee-milk border-coffee-roasted soft-shadow'
                      : 'bg-coffee-latte border-transparent'
                  }`}
                >
                  <span>One-time Purchase</span>
                  <span>${product.price.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => setPurchaseType('subscription')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                    purchaseType === 'subscription'
                      ? 'bg-coffee-milk border-coffee-roasted soft-shadow'
                      : 'bg-coffee-latte border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-coffee-roasted" />
                    <div>
                      <span>Monthly Subscription</span>
                      <span className="text-[10px] text-coffee-roasted block">Save 15% on every bag</span>
                    </div>
                  </div>
                  <span className="text-coffee-roasted">${(product.price * 0.85).toFixed(2)} / bag</span>
                </button>
              </div>

              {/* Quantity & CTA */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex items-center rounded-full bg-coffee-latte p-1 border border-coffee-espresso/10">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-coffee-milk font-bold text-sm flex items-center justify-center hover:bg-coffee-caramel"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-sm text-coffee-espresso">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-coffee-milk font-bold text-sm flex items-center justify-center hover:bg-coffee-caramel"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1 py-3.5 rounded-full bg-coffee-roasted text-white font-bold text-xs shadow-md hover:bg-coffee-caramel hover:text-coffee-espresso transition-all flex items-center justify-center gap-2"
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
