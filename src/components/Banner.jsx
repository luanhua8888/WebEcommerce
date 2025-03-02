import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const bannerData = [
  {
    id: 1,
    title: "Công nghệ tương lai",
    description: "Khám phá thế giới công nghệ tiên tiến",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920",
    link: "/products"
  },
  {
    id: 2,
    title: "Không gian vũ trụ",
    description: "Trải nghiệm công nghệ đột phá",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1920",
    link: "/products"
  },
  {
    id: 3,
    title: "Thiết bị thông minh",
    description: "Nâng tầm cuộc sống với công nghệ",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1920",
    link: "/products"
  },
  {
    id: 4,
    title: "Gaming Gear",
    description: "Trang bị tối ưu cho game thủ",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1920",
    link: "/products"
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
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
            style={{
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-[2s]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-sm">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div
                  className={`max-w-xl text-white transition-all duration-1000 transform ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    {banner.title}
                  </h2>
                  <p className="text-xl mb-8 text-gray-200">
                    {banner.description}
                  </p>
                  <Link
                    to={banner.link}
                    className="inline-block bg-blue-500/80 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold border border-white/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105 hover:bg-blue-600/80"
                  >
                    Khám phá ngay
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