import { Review } from '@/types'
import Link from 'next/link'

interface ReviewsSectionProps {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No reviews available.</p>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          clipRule="evenodd"
        />
      </svg>
    ))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => {
        const rating = parseInt(review.metadata?.rating?.key || '0')
        const product = review.metadata?.product
        
        return (
          <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Rating and Verified Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex">
                {renderStars(rating)}
              </div>
              {review.metadata?.verified_purchase && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  Verified
                </span>
              )}
            </div>
            
            {/* Review Title */}
            {review.metadata?.review_title && (
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {review.metadata.review_title}
              </h3>
            )}
            
            {/* Review Text */}
            {review.metadata?.review_text && (
              <p className="text-gray-600 mb-4 line-clamp-4">
                {review.metadata.review_text}
              </p>
            )}
            
            {/* Product Info */}
            {product && (
              <div className="border-t border-gray-100 pt-4 mb-4">
                <Link 
                  href={`/products/${product.slug}`}
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Product: {product.metadata?.name || product.title}
                </Link>
              </div>
            )}
            
            {/* Customer Name */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {review.metadata?.customer_name || 'Anonymous'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}