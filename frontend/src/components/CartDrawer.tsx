import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out bg-white dark:bg-neutral-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center space-x-2">
              <ShoppingBag size={20} />
              <span>SHOPPING CART ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center text-neutral-400 dark:text-neutral-500">
                <ShoppingBag size={48} className="stroke-1 mb-4" />
                <p className="text-sm font-light">Your shopping cart is empty.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex space-x-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
                  {/* Product Thumbnail */}
                  <div className="w-20 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-neutral-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Size: {item.selectedSize} / Color: {item.selectedColor}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-full px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="text-neutral-500 hover:text-neutral-900 p-1"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-semibold px-3 text-neutral-800 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="text-neutral-550 hover:text-neutral-900 p-1"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      {/* Item Total Price */}
                      <span className="text-sm font-semibold text-neutral-950 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary Checkout */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
              <div className="flex justify-between text-sm font-medium text-neutral-550 dark:text-neutral-400">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-neutral-950 dark:text-white">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 py-4 rounded-full font-medium text-xs tracking-wider hover:opacity-90 transition-opacity">
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
