import { useState } from 'react';
import { X, Star, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Neutral');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-neutral-800/80 rounded-full hover:bg-white dark:hover:bg-neutral-700 text-neutral-800 dark:text-white transition-all"
        >
          <X size={20} />
        </button>

        {/* Gallery Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-neutral-50 dark:bg-neutral-950/20 overflow-y-auto">
          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden mb-4">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Thumbnails */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                  selectedImage === img ? 'border-neutral-900' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-none">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {product.category}
            </span>
            <h2 className="text-2xl font-serif font-light text-neutral-900 dark:text-white mt-1 mb-3">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    className="stroke-1"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {product.rating.toFixed(1)} ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-2xl font-semibold text-neutral-950 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-neutral-450 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-450 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-350 mb-3">
                Color: <span className="font-light text-neutral-500">{selectedColor}</span>
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-neutral-900 dark:ring-white border-white dark:border-neutral-900 scale-110'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Swatches */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-350 mb-3">
                Size: <span className="font-light text-neutral-500">{selectedSize}</span>
              </h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 h-10 px-3 border rounded text-xs font-medium uppercase transition-all ${
                      selectedSize === size
                        ? 'bg-neutral-950 border-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product, selectedSize, selectedColor);
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-4 rounded-full hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-colors font-medium text-xs tracking-wider"
          >
            <ShoppingBag size={16} />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
}
