import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import BrewingGuides from './components/BrewingGuides';
import StoryProcessTimeline from './components/StoryProcessTimeline';
import TestimonialsSection from './components/TestimonialsSection';
import NumberCounters from './components/NumberCounters';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import CoffeeQuizModal from './components/CoffeeQuizModal';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import StickyCheckoutButton from './components/StickyCheckoutButton';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    grind: 'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso',
    quantity: number = 1,
    frequency: 'once' | 'every-2-weeks' | 'monthly' = 'once'
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.grind === grind
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, grind, quantity, subscriptionFrequency: frequency }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-coffee-cream text-coffee-espresso relative selection:bg-coffee-caramel">
      {/* Paper Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Section */}
      <HeroSection
        onShopClick={() => handleNavigateSection('products-section')}
        onStoryClick={() => handleNavigateSection('story-section')}
      />

      {/* Product Showcase Grid */}
      <ProductGrid
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={(product, grind) => handleAddToCart(product, grind, 1)}
      />

      {/* Interactive Brewing Guides */}
      <BrewingGuides />

      {/* Process & Sourcing Story Horizontal Timeline */}
      <StoryProcessTimeline />

      {/* Scroll-Triggered Animated Number Counters */}
      <NumberCounters />

      {/* Customer Testimonials Carousel */}
      <TestimonialsSection />

      {/* Newsletter 15% Discount Generator */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CoffeeQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectRecommendedProduct={(product) => setSelectedProduct(product)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, g, q, freq) => handleAddToCart(p, g, q, freq)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Bottom Sticky Checkout Button */}
      <StickyCheckoutButton
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
