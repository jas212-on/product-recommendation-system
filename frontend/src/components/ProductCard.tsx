import { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const selectedSize = product.sizes[0] || 'M';
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Neutral');

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image & Overlays */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-neutral-950 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="bg-rose-600 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full shadow-md transition-all duration-300 ${
            isWishlisted
              ? 'bg-rose-550 text-rose-500'
              : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-900'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Actions (Reveal on Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent flex justify-center space-x-3 z-15">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white hover:bg-neutral-100 text-neutral-900 rounded-full shadow-lg transition-transform hover:scale-110"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onAddToCart(product, selectedSize, selectedColor)}
            className="p-3 bg-neutral-950 hover:bg-neutral-900 text-white rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
            title="Add to Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Brand/Category */}
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
            {product.category}
          </span>
          
          {/* Title */}
          <h3 className="mt-1 text-sm font-medium text-neutral-850 dark:text-neutral-100 group-hover:text-neutral-500 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-1.5 space-x-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className="stroke-1"
                />
              ))}
            </div>
            <span className="text-[11px] text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-3">
          {/* Swatches (Color Selection) */}
          <div className="flex space-x-1.5 mb-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-1 ring-neutral-950 dark:ring-white border-white dark:border-neutral-950 scale-110'
                    : 'border-neutral-200 dark:border-neutral-800'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-sm font-semibold text-neutral-950 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
