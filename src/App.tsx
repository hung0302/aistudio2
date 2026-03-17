/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import { Product, CartItem } from './types';
import { products } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cart'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, selected: true }];
    });
    setSelectedProduct(null); // Close modal after adding
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleCartItemSelection = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const checkout = () => {
    const selectedItems = cart.filter(item => item.selected);
    if (selectedItems.length === 0) {
      return;
    }
    // Remove selected items from cart after successful checkout
    setCart(prevCart => prevCart.filter(item => !item.selected));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartItemCount={cartItemCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' ? (
          <ProductList
            products={products}
            onProductClick={setSelectedProduct}
          />
        ) : (
          <Cart
            cart={cart}
            updateQuantity={updateCartItemQuantity}
            toggleSelection={toggleCartItemSelection}
            removeItem={removeFromCart}
            onCheckout={checkout}
          />
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
