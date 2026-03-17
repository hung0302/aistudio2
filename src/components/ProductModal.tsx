import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row relative max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-gray-500 hover:text-gray-900 z-10 transition-colors hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100 flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-2xl text-indigo-600 font-semibold mb-6">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </p>
            
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Mô tả sản phẩm</h4>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(product, quantity)}
                className="w-full flex items-center justify-center py-3.5 px-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-100 shadow-sm"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
