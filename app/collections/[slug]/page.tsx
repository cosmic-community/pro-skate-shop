// app/collections/[slug]/page.tsx
import { getCollection, getProductsByCollection } from '@/lib/cosmic'
import { Collection, Product } from '@/types'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollection(slug) as Collection | null

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id) as Product[]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="mb-12">
          {collection.metadata?.featured_image && (
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
              <img
                src={`${collection.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                alt={collection.metadata?.name || collection.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {collection.metadata?.name || collection.title}
                  </h1>
                </div>
              </div>
            </div>
          )}

          {!collection.metadata?.featured_image && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {collection.metadata?.name || collection.title}
              </h1>
            </div>
          )}

          {collection.metadata?.description && (
            <div className="max-w-3xl mx-auto text-center">
              <div 
                className="text-lg text-gray-600 prose prose-lg mx-auto"
                dangerouslySetInnerHTML={{ __html: collection.metadata.description }}
              />
            </div>
          )}
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Products ({products.length})
              </h2>
            </div>
            <ProductGrid products={products} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products in Collection</h3>
              <p className="text-gray-600">This collection doesn't have any products yet. Check back soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollection(slug) as Collection | null

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  return {
    title: `${collection.metadata?.name || collection.title} - Pro Skate Shop`,
    description: collection.metadata?.description || `Shop the ${collection.title} collection at Pro Skate Shop.`,
  }
}