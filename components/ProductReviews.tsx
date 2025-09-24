import { Review } from '@/types'

interface ProductReviewsProps {
  reviews: Review[]
  productName: string
}

export default function ProductReviews({ reviews, productName }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => {
    const rating = parseInt(review.metadata?.rating?.key || '0')
    return acc + rating
  }, 0) / reviews.length

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
    <div className="bg-white border-t border-gray-200 pt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Customer Reviews for {productName}
        </h2>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-600">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => {
          const rating = parseInt(review.metadata?.rating?.key || '0')
          
          return (
            <div key={review.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex">
                      {renderStars(rating)}
                    </div>
                    {review.metadata?.verified_purchase && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  
                  {review.metadata?.review_title && (
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {review.metadata.review_title}
                    </h3>
                  )}
                  
                  <p className="text-sm text-gray-600">
                    By {review.metadata?.customer_name || 'Anonymous'}
                  </p>
                </div>
              </div>
              
              {review.metadata?.review_text && (
                <p className="text-gray-700 leading-relaxed">
                  {review.metadata.review_text}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}