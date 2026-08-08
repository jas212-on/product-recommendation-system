import { useState } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 dark:bg-neutral-950 dark:text-neutral-500 py-16 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Information */}
        <div className="space-y-4">
          <span className="text-2xl font-bold tracking-widest text-white font-serif">VÉLOURE</span>
          <p className="text-xs font-light leading-relaxed text-neutral-450">
            A contemporary fashion house crafting modern staples and statement outerwear from sustainably sourced premium materials.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        {/* Links: Collection */}
        <div className="space-y-4">
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider">Collections</h3>
          <ul className="space-y-2.5 text-xs font-light">
            <li><a href="#" className="hover:text-white transition-colors">Autumn/Winter 2026</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Capsule Wardrobe</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Signature Coats</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
          </ul>
        </div>

        {/* Links: Customer Service */}
        <div className="space-y-4">
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider">Help & Support</h3>
          <ul className="space-y-2.5 text-xs font-light">
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sizing Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability Care</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider">Join our list</h3>
          <p className="text-xs font-light leading-relaxed text-neutral-450">
            Enjoy 10% off your first purchase and exclusive access to new releases.
          </p>
          {subscribed ? (
            <p className="text-emerald-450 text-xs font-medium">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-neutral-900 border-none rounded-full py-3.5 pl-5 pr-12 text-xs text-white focus:outline-none focus:ring-1 focus:ring-neutral-700"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2 p-1.5 bg-white hover:bg-neutral-200 text-neutral-950 rounded-full transition-colors"
                aria-label="Subscribe"
              >
                <Send size={12} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-900 text-center text-[10px] tracking-wider text-neutral-600">
        © 2026 VÉLOURE. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
