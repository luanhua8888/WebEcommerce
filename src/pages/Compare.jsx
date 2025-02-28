import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCompareItems, removeFromCompare, clearCompare } from '../store/compareSlice'
import { addToCart } from '../store/cartSlice'
import { StarRating } from '../components/ReviewForm'
import { selectProductRating } from '../store/reviewsSlice'

export default function Compare() {
  const dispatch = useDispatch()
  const products = useSelector(selectCompareItems)

  const handleRemove = (productId) => {
    dispatch(removeFromCompare(productId))
  }

  const handleClearAll = () => {
    dispatch(clearCompare())
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">So sánh sản phẩm</h1>
        <p className="text-gray-600 mb-8">
          Bạn chưa chọn sản phẩm nào để so sánh.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
        >
          Xem sản phẩm
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">So sánh sản phẩm</h1>
        <button
          onClick={handleClearAll}
          className="text-gray-600 hover:text-gray-800"
        >
          Xóa tất cả
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border-b bg-gray-50 w-40">
                Thông tin sản phẩm
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-4 border-b bg-gray-50">
                  <div className="relative">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Image */}
            <tr>
              <td className="p-4 border-b"></td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </td>
              ))}
            </tr>

            {/* Name */}
            <tr>
              <td className="p-4 border-b font-medium">Tên sản phẩm</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b">
                  <Link
                    to={`/products/${product.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="p-4 border-b font-medium">Đánh giá</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b">
                  <StarRating
                    rating={Math.round(
                      useSelector((state) =>
                        selectProductRating(state, product.id)
                      )
                    )}
                    editable={false}
                  />
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr>
              <td className="p-4 border-b font-medium">Giá</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b font-bold text-lg">
                  {product.price.toLocaleString('vi-VN')}₫
                </td>
              ))}
            </tr>

            {/* Description */}
            <tr>
              <td className="p-4 border-b font-medium">Mô tả</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b text-gray-600">
                  {product.description}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="p-4 border-b font-medium">Danh mục</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b">
                  {product.category}
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-4 border-b"></td>
              {products.map((product) => (
                <td key={product.id} className="p-4 border-b">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    Thêm vào giỏ
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}