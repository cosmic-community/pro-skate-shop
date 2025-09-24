import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { metadata } = collection
  
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="card hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Collection Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {metadata?.featured_image ? (
            <img
              src={`${metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={metadata?.name || collection.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-5xl text-gray-400">🏷️</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
          
          {/* Collection Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">
              {metadata?.name || collection.title}
            </h3>
            {metadata?.description && (
              <div 
                className="text-sm text-gray-200 line-clamp-2"
                dangerouslySetInnerHTML={{ 
                  __html: metadata.description.replace(/<[^>]*>/g, '') 
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}