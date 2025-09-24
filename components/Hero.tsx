import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://imgix.cosmicjs.com/9989ef00-995c-11f0-8514-01c284615a47-photo-1578662996442-48f60103fc96-1758728343657.jpg?w=1600&h=900&fit=crop&auto=format,compress"
          alt="Skateboarding scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ride the Streets
            <span className="block text-accent">in Style</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Premium skateboard gear for riders of all levels. From complete setups to individual components, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn btn-accent text-lg px-8 py-4"
            >
              Shop All Products
            </Link>
            <Link
              href="/collections/complete-skateboards"
              className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20 text-lg px-8 py-4"
            >
              Complete Boards
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}