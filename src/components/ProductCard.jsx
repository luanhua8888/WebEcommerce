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
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden relative flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-white/20">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-90"
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
          className="w-full h-52 sm:h-48 object-cover transition-all duration-500 hover:opacity-90 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://i.imgur.com/lC6QQZn.png'
          }}
        />
      </Link>
      <div className="relative p-4 flex flex-col flex-grow overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-1 mb-2">{product.category}</p>
        <div className="mt-auto">
          <div className="relative mb-3 group">
            <span className="block text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-110">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            <div className="absolute -inset-1 bg-gradient-primary opacity-20 rounded-lg blur group-hover:opacity-30 transition-opacity"></div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <CompareButton product={product} className="w-full" />
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-primary text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 relative overflow-hidden group"
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