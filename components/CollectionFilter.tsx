'use client'

import { useState } from 'react'
import { Collection } from '@/types'

interface CollectionFilterProps {
  collections: Collection[]
}

export default function CollectionFilter({ collections }: CollectionFilterProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>('all')

  const handleFilterChange = (collectionSlug: string) => {
    setSelectedCollection(collectionSlug)
    
    if (collectionSlug === 'all') {
      // Show all products - you could implement this with URL params or state management
      window.location.href = '/products'
    } else {
      // Navigate to collection page
      window.location.href = `/collections/${collectionSlug}`
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleFilterChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCollection === 'all'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Products
      </button>
      
      {collections.map((collection) => (
        <button
          key={collection.id}
          onClick={() => handleFilterChange(collection.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCollection === collection.slug
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {collection.metadata?.name || collection.title}
        </button>
      ))}
    </div>
  )
}