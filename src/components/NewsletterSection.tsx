import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Check, Copy } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('AURA15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#F7F3EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-[#FFF8F2] rounded-3xl p-8 sm:p-12 soft-shadow-lg border-2 border-[#FFB703]/40 text-center relative overflow-hidden"
        >
          
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB703]/20 rounded-bl-full pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB703] text-[#1F2937] text-xs font-extrabold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Roaster's Guild</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
              Get 15% Off Your First Micro-Lot
            </h2>

            <p className="text-sm text-[#1F2937]/80 leading-relaxed">
              Subscribe for exclusive early access to rare single-origin drops, coffee brewing guides, and secret discounts. No spam, only pristine coffee notes.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2937]/50" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#F2EDE7] text-xs font-medium text-[#1F2937] placeholder-[#1F2937]/50 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#FF6B35] text-white font-bold text-xs shadow-md hover:bg-[#FFB703] hover:text-[#1F2937] transition-all duration-200 shrink-0"
                  data-cursor
                >
                  Claim 15% Off
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-[#F2EDE7] border border-[#FF6B35]/30 space-y-3 mt-4"
              >
                <div className="flex items-center justify-center gap-2 text-[#FF6B35] font-bold text-sm">
                  <Check className="w-5 h-5" />
                  <span>Welcome to Aura Artisan Coffee!</span>
                </div>
                <p className="text-xs text-[#1F2937]">
                  Use promo code <strong className="text-[#FF6B35]">AURA15</strong> at checkout for 15% off your entire order.
                </p>

                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB703] text-[#1F2937] text-xs font-bold hover:bg-[#FF6B35] hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Code Copied!' : 'Copy Code: AURA15'}</span>
                </button>
              </motion.div>
            )}

            <span className="text-[11px] text-[#1F2937]/60 block pt-2">
              🔒 Unsubscribe anytime with 1-click. We respect your inbox privacy.
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
