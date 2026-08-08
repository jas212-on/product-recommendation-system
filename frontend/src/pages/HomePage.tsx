import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import type { Product, CartItem } from '../types';
import { SlidersHorizontal } from 'lucide-react';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wool Cashmere Double-Breasted Coat',
    price: 389.0,
    originalPrice: 450.0,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'Coats',
    tags: ['outerwear', 'winter'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#c19a6b' },
      { name: 'Midnight Black', hex: '#111' },
      { name: 'Charcoal', hex: '#4A4A4A' },
    ],
    description: 'A luxurious double-breasted coat crafted from a blend of premium wool and organic cashmere. Features hand-stitched detailing, a relaxed yet tailored fit, and elegant horn buttons.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Silk Habotai Slip Dress',
    price: 180.0,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'Dresses',
    tags: ['silk', 'summer', 'evening'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald', hex: '#004B23' },
      { name: 'Champagne', hex: '#EEDC82' },
      { name: 'Classic Black', hex: '#000000' },
    ],
    description: 'Effortlessly sensual, this slip dress is made from 100% fine Silk Habotai. Featuring delicate adjustable straps and a flattering bias-cut that drapes beautifully over the body.',
    isSale: true,
  },
  {
    id: '3',
    name: 'Ribbed Merino Wool Turtleneck',
    price: 110.0,
    originalPrice: 140.0,
    rating: 4.9,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'Knitwear',
    tags: ['merino', 'basics'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#E8DCC4' },
      { name: 'Rust', hex: '#8B4513' },
      { name: 'Navy', hex: '#000080' },
    ],
    description: 'An essential layering piece spun from extra-fine Australian Merino wool. The ribbed texture provides a snug yet comfortable fit that retains its shape beautifully.',
    isNew: true,
    isSale: true,
  },
  {
    id: '4',
    name: 'Tailored Wide-Leg Trousers',
    price: 165.0,
    rating: 4.5,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'Pants',
    tags: ['tailored', 'workwear'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand', hex: '#E1C699' },
      { name: 'Slate Gray', hex: '#708090' },
      { name: 'Obsidian', hex: '#0B0B0B' },
    ],
    description: 'Modern trousers featuring a high-rise waist, pleated front details, and a flattering wide-leg drape. Perfect for moving seamlessly from office to evening.',
  },
  {
    id: '5',
    name: 'Suede Western Chelsea Boots',
    price: 245.0,
    rating: 4.7,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519748771151-a92a59019938?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'Shoes',
    tags: ['footwear', 'leather'],
    sizes: ['6', '7', '8', '9', '10'],
    colors: [
      { name: 'Taupe Suede', hex: '#b3a394' },
      { name: 'Ebony Suede', hex: '#2c221e' },
    ],
    description: 'An elegant Western take on the classic Chelsea boot. Handcrafted from velvety Italian split suede, featuring elasticated side panels and a comfortable stacked heel.',
    isNew: true,
  },
  {
    id: '6',
    name: 'Organic Cotton Boxy Tee',
    price: 45.0,
    rating: 4.4,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'T-Shirts',
    tags: ['organic', 'basics'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Off-White', hex: '#FAF9F6' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
    description: 'An everyday boxy t-shirt cut from heavy 100% certified organic cotton. Features double-stitched hems and a relaxed collar detail.',
  },
];

const CATEGORIES = ['All', 'Coats', 'Dresses', 'Knitwear', 'Pants', 'Shoes', 'T-Shirts'];

export default function HomePage() {
  // Navigation, Search, and Cart States
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  // Selected category and sort state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity += delta;
      return newCart;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyWishlisted = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyWishlisted) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default Featured
    });
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300">
      {/* Promotion bar */}
      <div className="bg-neutral-950 text-white text-[11px] font-medium tracking-widest text-center py-2.5 uppercase dark:bg-white dark:text-neutral-950">
        COMPLIMENTARY SHIPPING & RETURNS ON ORDERS OVER $150
      </div>

      <Navbar
        cart={cart}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Hero />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-450 uppercase">
              EXPLORE OUR COLLECTION
            </span>
            <h2 className="text-3xl font-serif font-light tracking-wide text-neutral-900 dark:text-white mt-1">
              Curated Style
            </h2>
          </div>

          {/* Filtering & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-4 mt-6 md:mt-0">
            {/* Sort Select */}
            <div className="flex items-center space-x-2">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-neutral-200 dark:border-neutral-700 text-xs py-2 pl-3 pr-8 rounded-full focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 font-medium ${
                selectedCategory === category
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                  : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-350 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-light text-neutral-400">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <Footer />
    </div>
  );
}