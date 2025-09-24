# 🛹 Pro Skate Shop

![App Preview](https://imgix.cosmicjs.com/9989ef00-995c-11f0-8514-01c284615a47-photo-1578662996442-48f60103fc96-1758728343657.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce skateboard store built with Next.js 15 and powered by Cosmic CMS. Features a complete product catalog, customer reviews, and collection-based organization.

## ✨ Features

- **Modern Product Catalog** - Browse complete skateboards, decks, and hardware
- **Collection Organization** - Products organized by categories with filtering
- **Customer Reviews** - Verified purchase reviews with star ratings
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Dynamic Content** - Powered by Cosmic CMS for easy content management
- **Product Details** - Rich descriptions, multiple images, and specifications
- **Professional Design** - Clean, skateboarding-inspired aesthetic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d4101be4b13704227fb095&clone_repository=68d4126ae4b13704227fb0bc)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce skate store with products, collections, and customer reviews"

### Code Generation Prompt

> Based on the content model I created for "Design a content model for an e-commerce skate store with products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React** - Component-based UI library

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Your Cosmic API keys

## 🛠️ Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables in `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Products
```typescript
const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Getting Product Reviews
```typescript
const reviews = await cosmic.objects
  .find({ type: 'reviews' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching Collections
```typescript
const collections = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## 🎨 Cosmic CMS Integration

This application integrates with the following Cosmic object types:

- **Products** - Skateboard products with images, descriptions, pricing, and specifications
- **Collections** - Product categories (Complete Skateboards, Decks, Wheels & Hardware)
- **Reviews** - Customer reviews with ratings and verified purchase status

The content model supports rich product catalogs with multiple images, detailed descriptions, inventory management, and customer feedback systems.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy with automatic builds on git push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` (for static export)
4. Add environment variables in Netlify dashboard

### Environment Variables
Set these variables in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->