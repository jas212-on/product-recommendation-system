import { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import type { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlistCount: number;
  onCartClick: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export default function Navbar({
  cart,
  wishlistCount,
  onCartClick,
  searchTerm,
  onSearchChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 dark:bg-neutral-900/80 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold tracking-widest text-neutral-950 dark:text-white font-serif">
              VÉLOURE
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <a href="#" className="text-neutral-900 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-400 transition-colors">
              NEW ARRIVALS
            </a>
            <a href="#" className="text-neutral-900 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-400 transition-colors">
              COLLECTIONS
            </a>
            <a href="#" className="text-neutral-900 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-400 transition-colors">
              WOMEN
            </a>
            <a href="#" className="text-neutral-900 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-400 transition-colors">
              MEN
            </a>
            <a href="#" className="text-rose-600 dark:text-rose-400 hover:opacity-80 transition-opacity">
              SALE
            </a>
          </div>

          {/* Search Bar & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative hidden sm:block w-48 md:w-64">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 text-neutral-850 dark:text-white pl-10 pr-4 py-2 rounded-full border-none focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all text-xs"
              />
              <Search className="absolute left-3.5 top-2.5 text-neutral-400" size={14} />
            </div>

            {/* Profile */}
            <button className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-2">
              <User size={20} />
            </button>

            {/* Wishlist */}
            <button className="relative text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-2">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onCartClick}
              className="relative text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-2"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900 px-4 pt-2 pb-6 space-y-3 transition-all duration-300">
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search collection..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-55 dark:bg-neutral-800 text-neutral-850 dark:text-white pl-10 pr-4 py-2 rounded-full border-none focus:outline-none text-xs"
            />
            <Search className="absolute left-3.5 top-2.5 text-neutral-400" size={14} />
          </div>
          <a href="#" className="block text-sm font-medium tracking-wide text-neutral-900 dark:text-neutral-100">NEW ARRIVALS</a>
          <a href="#" className="block text-sm font-medium tracking-wide text-neutral-900 dark:text-neutral-100">COLLECTIONS</a>
          <a href="#" className="block text-sm font-medium tracking-wide text-neutral-900 dark:text-neutral-100">WOMEN</a>
          <a href="#" className="block text-sm font-medium tracking-wide text-neutral-900 dark:text-neutral-100">MEN</a>
          <a href="#" className="block text-sm font-medium tracking-wide text-rose-600 dark:text-rose-400">SALE</a>
        </div>
      )}
    </nav>
  );
}
