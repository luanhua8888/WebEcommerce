import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { categories } from '../data/products'
import { selectAllProducts } from '../store/productsSlice'
import LazyLoadedProduct from '../components/LazyLoadedProduct'
import { CategoryIcon, SearchIcon } from '../components/Icons'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const products = useSelector(selectAllProducts)
  const { user } = useSelector(state => state.auth)
  const isAdmin = user?.role === 'admin'
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('categories')?.split(',') || ['All']
  )
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState([])
  const [page, setPage] = useState(1)
  const loadingRef = useRef(null)
  const PRODUCTS_PER_PAGE = 8

  const maxPrice = Math.max(...products.map(p => p.price))

  const filterProducts = useCallback(() => {
    let result = [...products]
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (!selectedCategories.includes('All')) {
      result = result.filter(product => selectedCategories.includes(product.category))
    }

    // Apply price range filter
    if (priceRange.min !== '') {
      result = result.filter(product => product.price >= Number(priceRange.min))
    }
    if (priceRange.max !== '') {
      result = result.filter(product => product.price <= Number(priceRange.max))
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }
    
    setFilteredProducts(result)
    setVisibleProducts(result.slice(0, PRODUCTS_PER_PAGE))
    setPage(1)
  }, [selectedCategories, sortBy, searchQuery, priceRange, products, PRODUCTS_PER_PAGE])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && visibleProducts.length < filteredProducts.length) {
          const nextProducts = filteredProducts.slice(
            visibleProducts.length,
            visibleProducts.length + PRODUCTS_PER_PAGE
          )
          setVisibleProducts(prev => [...prev, ...nextProducts])
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [visibleProducts, filteredProducts, PRODUCTS_PER_PAGE])

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      let newCategories
      if (category === 'All') {
        newCategories = ['All']
      } else if (prev.includes('All')) {
        newCategories = [category]
      } else if (prev.includes(category)) {
        newCategories = prev.filter(c => c !== category)
        if (newCategories.length === 0) newCategories = ['All']
      } else {
        newCategories = [...prev, category]
      }

      const params = new URLSearchParams(searchParams)
      if (newCategories.includes('All')) {
        params.delete('categories')
      } else {
        params.set('categories', newCategories.join(','))
      }
      setSearchParams(params)

      return newCategories
    })
  }

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const toggleFilters = () => {
    setShowFilters(prev => !prev)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={toggleFilters}
          className="md:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm text-gray-700 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Bộ lọc {showFilters ? '▼' : '▶'}
        </button>

        <div className={`${showFilters ? 'block' : 'hidden md:block'} bg-white md:bg-transparent rounded-lg shadow-sm md:shadow-none`}>
          {/* Filters */}
          <div className="w-full p-4 md:p-0 space-y-6">
            {/* Categories */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Danh mục</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                      selectedCategories.includes(category)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {category !== 'All' && <CategoryIcon category={category} className="w-4 h-4" />}
                    {category === 'All' ? 'Tất cả' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Khoảng giá</h2>
              <div className="grid grid-cols-2 md:flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Đến"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    max={maxPrice}
                  />
                </div>
                <button
                  onClick={() => setPriceRange({ min: '', max: '' })}
                  className="col-span-2 md:col-span-1 mt-2 md:mt-0 text-sm text-gray-500 hover:text-gray-700"
                >
                  Đặt lại
                </button>
              </div>
            </div>
          </div>

          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 md:p-0 border-t md:border-0">
            <p className="text-sm text-gray-600">
              Hiển thị {visibleProducts.length} / {filteredProducts.length} sản phẩm
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-white"
            >
              <option value="default">Sắp xếp theo</option>
              <option value="price-low-high">Giá: Thấp đến cao</option>
              <option value="price-high-low">Giá: Cao đến thấp</option>
              <option value="name-asc">Tên: A-Z</option>
              <option value="name-desc">Tên: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="mb-6">
          <Link
            to="/products/add"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm sản phẩm
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {visibleProducts.map(product => (
          <LazyLoadedProduct key={product.id} product={product} />
        ))}
      </div>

      {/* Loading Indicator */}
      {visibleProducts.length < filteredProducts.length && (
        <div
          ref={loadingRef}
          className="flex items-center justify-center p-4 mt-4"
        >
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? `Không tìm thấy sản phẩm nào phù hợp với "${searchQuery}"`
              : 'Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setPriceRange({ min: '', max: '' })
              setSelectedCategories(['All'])
              setSortBy('default')
            }}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  )
}

export default Products