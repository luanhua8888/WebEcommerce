import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { products } from '../data/products'
import { selectProductRating } from '../store/reviewsSlice'
import { StarRating } from '../components/ReviewForm'
import ReviewForm from '../components/ReviewForm'
import ReviewsList from '../components/ReviewsList'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const product = products.find(p => p.id === parseInt(id))
  const rating = useSelector(state => selectProductRating(state, parseInt(id)))

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
        >
          Quay lại trang sản phẩm
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }))
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden bg-white p-2 md:p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <StarRating rating={Math.round(rating)} editable={false} />
              <span className="text-sm text-gray-600">
                {rating.toFixed(1)}/5
              </span>
            </div>
          </div>

          <p className="text-gray-600">
            {product.description}
          </p>

          <div className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('vi-VN')}₫
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-top md:static md:p-0 md:shadow-none md:bg-transparent">
            <div className="container mx-auto">
              <div className="flex flex-col gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">Số lượng:</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xl"
                    >
                      -
                    </button>
                    <span className="w-16 text-center text-xl font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark font-medium"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add padding to account for fixed bottom bar on mobile */}
      <div className="pb-32 md:pb-0">
        {/* Reviews Section */}
        <div className="bg-gray-50 rounded-xl p-4 md:p-6 space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Đánh giá sản phẩm</h2>
              <p className="text-sm text-gray-500">Rating: {rating.toFixed(1)}/5</p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              {showReviewForm ? 'Đóng' : 'Viết đánh giá'}
            </button>
          </div>

          {showReviewForm && (
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
              <ReviewForm productId={parseInt(id)} />
            </div>
          )}

          <ReviewsList productId={parseInt(id)} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail