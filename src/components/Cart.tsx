import React, { useState } from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Minus, Plus, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelection: (id: string) => void;
  removeItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ cart, updateQuantity, toggleSelection, removeItem, onCheckout }: CartProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const selectedItems = cart.filter(item => item.selected);
  const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onCheckout();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-500">Hãy thêm một vài sản phẩm vào giỏ hàng của bạn.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-10 flex justify-center"
          >
            <div className="bg-emerald-50 text-emerald-800 px-6 py-4 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span className="font-medium">Đặt hàng thành công! Cảm ơn bạn đã mua sắm.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-100">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 sm:p-6 flex items-center gap-4 sm:gap-6"
                >
                  <div className="flex items-center h-full">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelection(item.id)}
                      className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                  </div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2 pr-4">{item.name}</h3>
                        <p className="text-indigo-600 font-semibold mt-1">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tổng quan đơn hàng</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Sản phẩm đã chọn:</span>
              <span className="font-medium">{selectedItems.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Tổng cộng:</span>
              <span className="text-xl font-bold text-indigo-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`w-full py-3.5 px-4 rounded-xl font-medium transition-colors ${
              selectedItems.length > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Xác nhận mua hàng
          </button>
        </div>
      </div>
    </div>
  );
}
