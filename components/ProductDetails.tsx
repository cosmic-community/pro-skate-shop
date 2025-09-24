'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { metadata } = product
  
  const images = metadata?.product_images || []
  const currentPrice = metadata?.sale_price || metadata?.price
  const originalPrice = metadata?.sale_price ? metadata?.price : null
  const isOnSale = metadata?.sale_price && metadata?.sale_price < (metadata?.price || 0)
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
          {images.length > 0 && images[selectedImageIndex] ? (
            <img
              src={`${images[selectedImageIndex].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={metadata?.name || product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl text-gray-400">📦</span>
            </div>
          )}
        </div>
        
        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="flex space-x-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index 
                    ? 'border-primary' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={`${metadata?.name || product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Breadcrumb */}
        {metadata?.collections?.[0] && (
          <nav className="text-sm">
            <Link 
              href={`/collections/${metadata.collections[0].slug}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {metadata.collections[0].metadata?.name || metadata.collections[0].title}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {metadata?.name || product.title}
            </span>
          </nav>
        )}

        {/* Product Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {metadata?.name || product.title}
        </h1>

        {/* Brand and SKU */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {metadata?.brand && (
            <span>Brand: <span className="font-medium">{metadata.brand}</span></span>
          )}
          {metadata?.sku && (
            <span>SKU: <span className="font-medium">{metadata.sku}</span></span>
          )}
          {metadata?.size && (
            <span>Size: <span className="font-medium">{metadata.size}</span></span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-4">
          {currentPrice && (
            <span className="text-3xl font-bold text-gray-900">
              ${currentPrice.toFixed(2)}
            </span>
          )}
          {originalPrice && isOnSale && (
            <span className="text-xl text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {isOnSale && (
            <span className="bg-accent text-white px-3 py-1 text-sm font-semibold rounded-md">
              ON SALE
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          {metadata?.in_stock === false ? (
            <span className="text-red-600 font-medium">Out of Stock</span>
          ) : (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">In Stock</span>
              {metadata?.stock_quantity !== undefined && (
                <span className="text-gray-600">
                  ({metadata.stock_quantity} available)
                </span>
              )}
            </>
          )}
        </div>

        {/* Description */}
        {metadata?.description && (
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: metadata.description }} />
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="pt-6">
          <button 
            className={`w-full btn text-lg py-4 ${
              metadata?.in_stock === false 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'btn-primary'
            }`}
            disabled={metadata?.in_stock === false}
          >
            {metadata?.in_stock === false ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Free shipping on orders over $75</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>30-day return policy</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Warranty included</span>
          </div>
        </div>
      </div>
    </div>
  )
}