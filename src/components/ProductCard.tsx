import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Sparkles, Eye, Flame, MapPin } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, grind: 'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso') => void;
}

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedGrind, setSelectedGrind] = useState<'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso'>('Whole Bean');

  // Handle 3D Tilt calculation based on mouse coordinates relative to card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
      className="relative rounded-3xl bg-coffee-latte p-6 soft-shadow border border-coffee-milk flex flex-col justify-between group overflow-hidden"
      data-cursor
      data-cursor-text="View Product"
    >
      {/* Subtle #C89B5C glow appearing at the tilt angle on hover */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.8 : 0,
          background: `radial-gradient(600px circle at ${tilt.y * 10 + 150}px ${tilt.x * -10 + 150}px, rgba(255, 183, 3, 0.25), transparent 60%)`,
        }}
      />

      {/* Top Header Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coffee-milk text-coffee-espresso text-xs font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-coffee-roasted" />
            <span>{product.roastLevel} Roast</span>
          </span>

          {product.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-coffee-caramel text-coffee-espresso text-[11px] font-extrabold uppercase tracking-wide">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Visual Container */}
        <div
          onClick={() => onSelectProduct(product)}
          className="relative w-full h-48 sm:h-52 rounded-2xl bg-coffee-milk p-4 flex items-center justify-center cursor-pointer overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 mb-5"
        >
          {/* Subtle Abstract Graphic Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Product Image (if available) or Coffee Bag Visual Representation */}
          <div className="product-image-wrapper">
            {product.image ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }}
                  className="relative z-10 w-full h-full object-cover"
                />
                <div className="product-image-overlay" />
                <div className="price-badge">${product.price.toFixed(2)}</div>
              </>
            ) : (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-28 h-36 rounded-xl bg-gradient-to-b from-coffee-milk to-coffee-latte border-2 border-coffee-caramel/40 shadow-md flex flex-col justify-between p-2.5 text-center">
                  <div className="w-full h-2 rounded bg-coffee-roasted" />
                  <div>
                    <span className="font-serif text-xs font-bold text-coffee-espresso block line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-[9px] text-coffee-espresso/70 block mt-0.5">
                      {product.origin.split(',')[0]}
                    </span>
                  </div>
                  <div className="w-4 h-4 mx-auto rounded-full bg-coffee-espresso flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-coffee-caramel" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick View Floating Eye Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-coffee-milk/90 text-coffee-espresso opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-coffee-roasted hover:text-white"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Name & Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3
              onClick={() => onSelectProduct(product)}
              className="font-serif text-xl font-bold text-coffee-espresso hover:text-coffee-roasted cursor-pointer transition-colors"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-coffee-espresso">
              <Star className="w-3.5 h-3.5 fill-coffee-caramel text-coffee-caramel" />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-xs text-coffee-espresso/80 line-clamp-2">
            {product.tagline}
          </p>

          {/* Origin Badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-coffee-espresso/70 pt-1">
            <MapPin className="w-3 h-3 text-coffee-roasted" />
            <span className="truncate">{product.origin}</span>
          </div>

          {/* Flavor Notes Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {product.notes.slice(0, 3).map((note, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-coffee-milk text-coffee-espresso/90 border border-coffee-espresso/5"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Price & Add to Cart Action */}
      <div className="pt-6 mt-4 border-t border-coffee-espresso/10 space-y-3">
        {/* Grind Quick Selector */}
        {product.category !== 'pastries' && (
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-coffee-espresso/70 font-medium">Grind:</span>
            <select
              value={selectedGrind}
              onChange={(e) => setSelectedGrind(e.target.value as any)}
              className="bg-coffee-milk border border-coffee-espresso/15 rounded-lg px-2 py-0.5 text-coffee-espresso font-semibold focus:outline-none focus:border-coffee-roasted"
            >
              <option value="Whole Bean">Whole Bean</option>
              <option value="Drip / Filter">Drip / Filter</option>
              <option value="French Press">French Press</option>
              <option value="Espresso">Espresso</option>
            </select>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-coffee-espresso/60 block font-medium">Price</span>
            <span className="text-xl font-bold font-serif text-coffee-espresso">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart Button: Fill animation sweeps in #8B4E2F from left to right on hover */}
          <button
            onClick={() => onAddToCart(product, selectedGrind)}
            className="relative group/btn overflow-hidden px-5 py-2.5 rounded-full bg-coffee-milk border border-coffee-roasted text-coffee-roasted font-bold text-xs shadow-xs hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            {/* Left to right sweep fill animation */}
            <span className="absolute inset-0 w-full h-full bg-coffee-roasted transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out -z-0" />
            <ShoppingBag className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
