// app/products/[slug]/page.tsx
import { getProduct, getProductReviews } from '@/lib/cosmic'
import { Product, Review } from '@/types'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'
import ProductReviews from '@/components/ProductReviews'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug) as Product | null

  if (!product) {
    notFound()
  }

  const reviews = await getProductReviews(product.id) as Review[]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
        
        {reviews.length > 0 && (
          <div className="mt-16">
            <ProductReviews reviews={reviews} productName={product.metadata?.name || product.title} />
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug) as Product | null

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.metadata?.name || product.title} - Pro Skate Shop`,
    description: product.metadata?.description || `Shop the ${product.title} at Pro Skate Shop. Quality skateboarding gear for all skill levels.`,
  }
}