import React from 'react';
import { ShoppingCart, Store } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'cart';
  setCurrentView: (view: 'home' | 'cart') => void;
  cartItemCount: number;
}

export default function Navbar({ currentView, setCurrentView, cartItemCount }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <Store className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MiniShop</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Sản phẩm
            </button>
            <button
              onClick={() => setCurrentView('cart')}
              className={`relative p-2 rounded-full transition-colors ${
                currentView === 'cart' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
