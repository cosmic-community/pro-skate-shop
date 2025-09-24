import { getProducts, getCollections } from '@/lib/cosmic'
import { Product, Collection } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import CollectionFilter from '@/components/CollectionFilter'

export const metadata = {
  title: 'All Products - Pro Skate Shop',
  description: 'Browse our complete collection of skateboard products including complete skateboards, decks, wheels, and hardware.',
}

export default async function ProductsPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ])

  const typedProducts = products as Product[]
  const typedCollections = collections as Collection[]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete range of skateboarding gear
          </p>
        </div>

        {/* Collection Filter */}
        {typedCollections.length > 0 && (
          <div className="mb-8">
            <CollectionFilter collections={typedCollections} />
          </div>
        )}

        {/* Products Grid */}
        {typedProducts.length > 0 ? (
          <ProductGrid products={typedProducts} />
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">Check back soon for new products!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}