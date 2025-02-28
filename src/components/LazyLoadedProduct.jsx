import { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'

function LazyLoadedProduct({ product }) {
  const [isVisible, setIsVisible] = useState(false)
  const productRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (productRef.current) {
      observer.observe(productRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div ref={productRef} className="min-h-[300px]">
      {isVisible ? (
        <ProductCard product={product} />
      ) : (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md h-full animate-pulse">
          <div className="h-52 sm:h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LazyLoadedProduct