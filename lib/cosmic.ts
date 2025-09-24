import { createBucketClient } from '@cosmicjs/sdk'
import { Collection } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all products
export async function getProducts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

// Get single product by slug
export async function getProduct(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}

// Get all collections
export async function getCollections() {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by display_order with proper typing
    const collections = (response.objects as Collection[]).sort((a: Collection, b: Collection) => {
      const orderA = a.metadata?.display_order || 999;
      const orderB = b.metadata?.display_order || 999;
      return orderA - orderB;
    });
    
    return collections;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching collections:', error);
    throw new Error('Failed to fetch collections');
  }
}

// Get single collection by slug
export async function getCollection(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching collection:', error);
    throw new Error('Failed to fetch collection');
  }
}

// Get reviews for a specific product
export async function getProductReviews(productId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
}

// Get all reviews
export async function getReviews() {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
}

// Get products by collection
export async function getProductsByCollection(collectionId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collections': collectionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching products by collection:', error);
    throw new Error('Failed to fetch products by collection');
  }
}