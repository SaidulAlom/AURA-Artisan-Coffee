import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Sparkles, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum * 1 + item.product.price * item.quantity,
    0
  );

  const discountAmount = rawSubtotal * appliedDiscount;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);

  // Free shipping over $40
  const freeShippingThreshold = 40;
  const progressToFreeShipping = Math.min(100, (subtotalAfterDiscount / freeShippingThreshold) * 100);
  const shippingCost = subtotalAfterDiscount >= freeShippingThreshold || cartItems.length === 0 ? 0 : 4.99;

  const estimatedTax = subtotalAfterDiscount * 0.08; // 8% tax
  const grandTotal = subtotalAfterDiscount + shippingCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA15') {
      setAppliedDiscount(0.15);
      setDiscountMsg('15% Guild Discount Applied!');
    } else {
      setDiscountMsg('Invalid code. Try "AURA15"');
    }
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-[#2A1710]/50 backdrop-blur-sm">
        
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-[#F9F1E7] h-full shadow-2xl flex flex-col justify-between border-l border-[#E6D2BD] relative z-50"
        >
          {/* Cart Header */}
          <div className="p-6 border-b border-[#E6D2BD] flex items-center justify-between bg-[#F9F1E7]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#8B4E2F] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2A1710]">
                  Your Artisan Bag
                </h3>
                <span className="text-xs text-[#2A1710]/70 block -mt-0.5">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#E6D2BD] text-[#2A1710] hover:bg-[#8B4E2F] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator Bar */}
          <div className="p-4 bg-[#E6D2BD] border-b border-[#F9F1E7] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#2A1710]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8B4E2F]" />
                {subtotalAfterDiscount >= freeShippingThreshold ? (
                  <span className="text-[#8B4E2F]">ðŸŽ‰ You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>
                    Add ${(freeShippingThreshold - subtotalAfterDiscount).toFixed(2)} more for Free Express Delivery
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#F9F1E7] overflow-hidden">
              <div
                className="h-full bg-[#8B4E2F] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#C89B5C] text-[#2A1710] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2A1710]">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-[#2A1710]/80">
                  Your beans are queued for fresh roasting. Tracking details sent to your email.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#8B4E2F] text-white text-xs font-bold"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#2A1710]/30" />
                <p className="font-serif text-lg font-bold text-[#2A1710]">
                  Your coffee bag is currently empty.
                </p>
                <p className="text-xs text-[#2A1710]/70">
                  Explore our single-origin micro-lots and roast selections.
                </p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-[#E6D2BD] border border-[#F9F1E7] flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-[#2A1710]">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#8B4E2F] font-semibold block">
                      Grind: {item.grind}
                    </span>
                    <span className="text-xs font-bold text-[#2A1710]">
                      ${item.product.price.toFixed(2)} each
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-full bg-[#F9F1E7] p-1 border border-[#2A1710]/10">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-[#E6D2BD] text-xs font-bold flex items-center justify-center hover:bg-[#C89B5C]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#2A1710]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-[#E6D2BD] text-xs font-bold flex items-center justify-center hover:bg-[#C89B5C]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-1.5 text-[#2A1710]/50 hover:text-[#8B4E2F]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & Checkout */}
          {!orderComplete && cartItems.length > 0 && (
            <div className="p-6 border-t border-[#E6D2BD] bg-[#F9F1E7] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. AURA15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#E6D2BD] text-xs font-semibold text-[#2A1710] focus:outline-none focus:ring-1 focus:ring-[#8B4E2F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C89B5C] text-[#2A1710] font-bold text-xs hover:bg-[#8B4E2F] hover:text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {discountMsg && (
                <span className="text-[11px] font-bold text-[#8B4E2F] block">
                  {discountMsg}
                </span>
              )}

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#2A1710]/80">
                  <span>Subtotal</span>
                  <span>${rawSubtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#8B4E2F] font-bold">
                    <span>Discount (15%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#2A1710]/80">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between font-serif text-base font-extrabold text-[#2A1710] pt-2 border-t border-[#E6D2BD]">
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCompleteOrder}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-[#8B4E2F] text-white font-bold text-sm shadow-md hover:bg-[#C89B5C] hover:text-[#2A1710] transition-all flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Processing Order...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proceed to Seamless Checkout (${grandTotal.toFixed(2)})</span>
                  </>
                )}
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
