// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    sale_price?: number | null;
    sku?: string;
    in_stock?: boolean;
    stock_quantity?: number;
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    collections?: Collection[];
    brand?: string;
    size?: string;
  };
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name?: string;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    display_order?: number;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    customer_name?: string;
    rating?: {
      key: string;
      value: string;
    };
    review_title?: string;
    review_text?: string;
    verified_purchase?: boolean;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}