import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Banner from '../components/Banner'

function Home() {
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* Banner Section */}
      <Banner />

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn btn-primary"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      {/* <section className="bg-black/80 backdrop-blur-lg py-12 border-y border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              to="/compare"
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-md border border-white/5 text-center group hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <h3 className="text-gray-300 group-hover:text-blue-400 transition-colors">So sánh</h3>
              </div>
            </Link>

            <Link
              to="/orders"
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-md border border-white/5 text-center group hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15" />
                </svg>
                <h3 className="text-gray-300 group-hover:text-blue-400 transition-colors">Đơn hàng</h3>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-md border border-white/5 text-center group hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <h3 className="text-gray-300 group-hover:text-blue-400 transition-colors">Yêu thích</h3>
              </div>
            </Link>

            <button
              onClick={() => document.querySelector('[data-testid="chat-widget"]')?.click()}
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-md border border-white/5 text-center group hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <h3 className="text-gray-300 group-hover:text-blue-400 transition-colors">Hỗ trợ</h3>
              </div>
            </button>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home