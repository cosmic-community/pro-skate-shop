import { getProducts, getCollections, getReviews } from '@/lib/cosmic'
import { Product, Collection, Review } from '@/types'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import CollectionGrid from '@/components/CollectionGrid'
import ReviewsSection from '@/components/ReviewsSection'

export default async function Home() {
  const [products, collections, reviews] = await Promise.all([
    getProducts(),
    getCollections(),
    getReviews()
  ])

  const typedProducts = products as Product[]
  const typedCollections = collections as Collection[]
  const typedReviews = reviews as Review[]

  // Get featured products (first 8)
  const featuredProducts = typedProducts.slice(0, 8)

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections of premium skateboarding gear
            </p>
          </div>
          
          {typedCollections.length > 0 ? (
            <CollectionGrid collections={typedCollections} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No collections available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our most popular skateboarding gear
            </p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real reviews from verified customers
            </p>
          </div>
          
          {typedReviews.length > 0 ? (
            <ReviewsSection reviews={typedReviews.slice(0, 3)} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}