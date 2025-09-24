import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { metadata } = product
  
  const primaryImage = metadata?.product_images?.[0]
  const currentPrice = metadata?.sale_price || metadata?.price
  const originalPrice = metadata?.sale_price ? metadata?.price : null
  const isOnSale = metadata?.sale_price && metadata?.sale_price < (metadata?.price || 0)
  
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          {primaryImage ? (
            <img
              src={`${primaryImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={metadata?.name || product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
          )}
          
          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 text-xs font-semibold rounded-md">
              SALE
            </div>
          )}
          
          {/* Out of Stock Badge */}
          {metadata?.in_stock === false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-gray-900 text-white px-3 py-1 text-sm font-semibold rounded-md">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {metadata?.name || product.title}
          </h3>
          
          {metadata?.brand && (
            <p className="text-sm text-gray-500 mb-2">{metadata.brand}</p>
          )}
          
          {metadata?.size && (
            <p className="text-sm text-gray-500 mb-2">Size: {metadata.size}</p>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {currentPrice && (
                <span className="text-xl font-bold text-gray-900">
                  ${currentPrice.toFixed(2)}
                </span>
              )}
              {originalPrice && isOnSale && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {metadata?.stock_quantity !== undefined && metadata.stock_quantity > 0 && (
              <span className="text-xs text-gray-500">
                {metadata.stock_quantity} in stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}