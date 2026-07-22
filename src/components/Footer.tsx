import React from 'react';
import { Coffee, ShieldCheck, Heart, Leaf, Award, Globe, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-coffee-milk border-t border-coffee-latte pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Social Proof Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-coffee-latte text-center">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-coffee-roasted" />
            <span className="text-xs font-bold text-coffee-espresso">Direct Trade Certified</span>
            <span className="text-[11px] text-coffee-espresso/70">Farmers paid 3.5x Fair Trade</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Leaf className="w-6 h-6 text-coffee-caramel" />
            <span className="text-xs font-bold text-coffee-espresso">Zero Carbon Roasting</span>
            <span className="text-[11px] text-coffee-espresso/70">Eco-convection air technology</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Award className="w-6 h-6 text-coffee-roasted" />
            <span className="text-xs font-bold text-coffee-espresso">B-Corp Certified</span>
            <span className="text-[11px] text-coffee-espresso/70">Highest environmental standard</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Globe className="w-6 h-6 text-coffee-caramel" />
            <span className="text-xs font-bold text-coffee-espresso">Compostable Packaging</span>
            <span className="text-[11px] text-coffee-espresso/70">100% plastic-free tactile bags</span>
          </div>
        </div>

        {/* Main Footer Navigation & Brand info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-coffee-roasted flex items-center justify-center text-white">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-coffee-espresso">
                AURA ARTISAN COFFEE
              </span>
            </div>

            <p className="text-xs text-coffee-espresso/80 max-w-sm leading-relaxed">
              Elevating daily morning rituals through tactile 3D design, high-altitude micro-lot coffee beans, and transparent direct-trade sourcing.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="p-2 rounded-full bg-coffee-latte text-coffee-espresso hover:bg-coffee-roasted hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 rounded-full bg-coffee-latte text-coffee-espresso hover:bg-coffee-roasted hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#facebook" className="p-2 rounded-full bg-coffee-latte text-coffee-espresso hover:bg-coffee-roasted hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-coffee-espresso">Shop Reserve</h4>
            <ul className="space-y-2 text-xs text-coffee-espresso/80">
              <li><a href="#products-section" className="hover:text-coffee-roasted">Single Origin Beans</a></li>
              <li><a href="#products-section" className="hover:text-coffee-roasted">Velvet Espresso Blend</a></li>
              <li><a href="#products-section" className="hover:text-coffee-roasted">Swiss Water Decaf</a></li>
              <li><a href="#products-section" className="hover:text-coffee-roasted">Cold Brew Extracts</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-coffee-espresso">Our Mission</h4>
            <ul className="space-y-2 text-xs text-coffee-espresso/80">
              <li><a href="#story-section" className="hover:text-coffee-roasted">Sourcing Transparency</a></li>
              <li><a href="#story-section" className="hover:text-coffee-roasted">Fluid Bed Roasting</a></li>
              <li><a href="#reviews-section" className="hover:text-coffee-roasted">Customer Stories</a></li>
              <li><a href="#stats-section" className="hover:text-coffee-roasted">Roastery Impact</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-coffee-espresso">Artisan Roastery Lab</h4>
            <p className="text-xs text-coffee-espresso/80">
              450 Coffee Micro-Lot Way, Suite 100<br />
              Seattle, WA 98101<br />
              hello@auraartisancoffee.com
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-coffee-latte flex flex-col sm:flex-row items-center justify-between text-xs text-coffee-espresso/60 gap-4">
          <p>© {new Date().getFullYear()} Aura Artisan Coffee Roasters. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-coffee-roasted">Privacy Policy</a>
            <a href="#terms" className="hover:text-coffee-roasted">Terms of Service</a>
            <a href="#shipping" className="hover:text-coffee-roasted">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
