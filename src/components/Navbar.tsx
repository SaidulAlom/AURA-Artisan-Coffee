import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Coffee, Menu, X, Sparkles, Compass } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onNavigateSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop Beans', id: 'products-section' },
    { name: 'Brewing Guides', id: 'guides-section' },
    { name: 'Sourcing Story', id: 'story-section' },
    { name: 'Reviews', id: 'reviews-section' },
    { name: 'Roaster Stats', id: 'stats-section' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-coffee-espresso/95 backdrop-blur-md border-b border-coffee-caramel/20 transition-all duration-300 ${
          isScrolled
            ? 'soft-shadow py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group text-left"
            data-cursor
            data-cursor-text="Home"
          >
            <div className="w-10 h-10 rounded-full bg-coffee-roasted flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Coffee className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-coffee-milk block leading-tight">
                AURA
              </span>
              <span className="text-[10px] tracking-[0.2em] text-coffee-caramel font-bold uppercase block -mt-1">
                Artisan Coffee
              </span>
            </div>
          </button>

          {/* Desktop Nav Links with Underline-draw animation in #8B4E2F */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigateSection(link.id)}
                 className="relative py-1 text-sm font-semibold text-coffee-milk hover:text-coffee-caramel transition-colors group"
                data-cursor
              >
                <span>{link.name}</span>
                {/* Underline draw animation */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-caramel rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action CTAs: Coffee Quiz & Cart */}
          <div className="flex items-center gap-3">
            {/* Coffee Match Quiz Pill */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-milk border border-coffee-caramel text-coffee-espresso text-xs font-bold hover:bg-coffee-caramel hover:text-coffee-espresso transition-all duration-200 shadow-sm"
              data-cursor
              data-cursor-text="Take Quiz"
            >
              <Compass className="w-3.5 h-3.5 text-coffee-roasted" />
              <span>Coffee Quiz</span>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-coffee-milk hover:bg-coffee-latte text-coffee-espresso transition-all border border-coffee-espresso/10 soft-shadow group"
              aria-label="Open Shopping Cart"
              data-cursor
              data-cursor-text="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-coffee-espresso group-hover:text-coffee-roasted transition-colors" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-coffee-roasted text-white text-[11px] font-bold flex items-center justify-center shadow-md border-2 border-coffee-milk"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-coffee-milk text-coffee-espresso border border-coffee-espresso/10"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[76px] z-40 bg-coffee-espresso/95 border-b border-coffee-caramel/20 soft-shadow-lg p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigateSection(link.id);
                  }}
                  className="text-left py-2 font-serif text-lg font-bold text-coffee-milk hover:text-coffee-caramel border-b border-coffee-milk/10"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-coffee-roasted text-white font-bold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-coffee-caramel" />
                <span>Take Perfect Roast Quiz</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
