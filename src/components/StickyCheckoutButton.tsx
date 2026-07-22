import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface StickyCheckoutButtonProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export default function StickyCheckoutButton({ cartItems, onOpenCart }: StickyCheckoutButtonProps) {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onClick={onOpenCart}
          className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#8B4E2F] text-white font-bold text-sm shadow-xl hover:bg-[#C89B5C] hover:text-[#2A1710] transition-all duration-300 border-2 border-[#F9F1E7] glow-pulse"
          data-cursor
          data-cursor-text="Checkout"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#2A1710] text-white text-[10px] font-extrabold flex items-center justify-center">
              {totalCount}
            </span>
          </div>

          <span>Checkout Â· ${totalAmount.toFixed(2)}</span>

          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
