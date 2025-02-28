import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice'
import { showNotification } from '../store/notificationSlice'
import CompareButton from './CompareButton'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const wishlist = useSelector(state => state.wishlist)
  const isInWishlist = wishlist.includes(product.id)
const handleAddToCart = () => {
  dispatch(addToCart(product))
  dispatch(showNotification({
    message: `Đã thêm ${product.name} vào giỏ hàng`,
    type: 'success'
  }))
}

const toggleWishlist = () => {
  if (isInWishlist) {
    dispatch(removeFromWishlist(product.id))
    dispatch(showNotification({
      message: `Đã xóa ${product.name} khỏi danh sách yêu thích`,
      type: 'info'
    }))
  } else {
    dispatch(addToWishlist(product.id))
    dispatch(showNotification({
      message: `Đã thêm ${product.name} vào danh sách yêu thích`,
      type: 'success'
    }))
  }
}

return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        {isInWishlist ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )}
      </button>
      
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-1">{product.category}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-primary">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          <div className="flex gap-2">
            <CompareButton product={product} />
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard