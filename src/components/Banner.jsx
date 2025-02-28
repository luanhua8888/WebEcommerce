import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const bannerData = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Up to 50% off on selected items",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920",
    link: "/products"
  },
  {
    id: 2,
    title: "New Electronics",
    description: "Latest gadgets and accessories",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1920",
    link: "/products?category=Electronics"
  },
  {
    id: 3,
    title: "Home & Living",
    description: "Make your home beautiful",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1920",
    link: "/products?category=Home"
  }
]

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)
  }

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-xl mb-8">{banner.description}</p>
                  <Link
                    to={banner.link}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner