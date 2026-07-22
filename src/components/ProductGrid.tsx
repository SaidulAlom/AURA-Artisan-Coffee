import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, grind: 'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso') => void;
}

export default function ProductGrid({ onSelectProduct, onAddToCart }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [roastFilter, setRoastFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'single-origin', label: 'Single Origin' },
    { id: 'espresso', label: 'Espresso Roasts' },
    { id: 'decaf', label: 'Swiss Decaf' },
    { id: 'cold-brew', label: 'Cold Brew' },
    { id: 'pastries', label: 'Artisanal Pastries' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRoast = roastFilter === 'all' || product.roastLevel.toLowerCase().includes(roastFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesRoast;
  });

  return (
    <section id="products-section" className="py-20 lg:py-28 bg-coffee-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coffee-milk border border-coffee-caramel text-xs font-bold text-coffee-espresso">
            <Sparkles className="w-3.5 h-3.5 text-coffee-roasted" />
            <span>Seasonal Harvest Reserve</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-coffee-espresso tracking-tight">
            Curated Single Origins & Signature Blends
          </h2>

          <p className="text-base text-coffee-espresso/80">
            Hand-selected from high-altitude micro-lots. Roasted to highlight distinct floral, citrus, and cocoa flavor nuances.
          </p>
        </motion.div>

        {/* Category Tabs & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-coffee-milk p-4 sm:p-6 rounded-3xl soft-shadow border border-coffee-latte mb-12 space-y-4"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                   key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-coffee-roasted text-white shadow-md'
                      : 'bg-coffee-latte text-coffee-espresso hover:bg-coffee-caramel/30'
                  }`}
                  data-cursor
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-espresso/50" />
              <input
                type="text"
                placeholder="Search notes, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-coffee-latte text-xs font-medium text-coffee-espresso placeholder-coffee-espresso/50 focus:outline-none focus:ring-2 focus:ring-coffee-roasted"
              />
            </div>

          </div>
        </motion.div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-coffee-milk rounded-3xl soft-shadow border border-coffee-latte">
            <p className="text-lg font-serif font-bold text-coffee-espresso">
              No coffee matches your selected criteria.
            </p>
            <p className="text-xs text-coffee-espresso/70 mt-1">
              Try adjusting your search terms or category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setRoastFilter('all');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-coffee-roasted text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
