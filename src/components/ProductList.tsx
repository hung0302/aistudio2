import React from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function ProductList({ products, onProductClick }: ProductListProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow group flex flex-col"
            onClick={() => onProductClick(product)}
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-indigo-600 font-semibold text-lg">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
