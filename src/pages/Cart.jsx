import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'
import { showNotification } from '../store/notificationSlice'
import { TrashIcon } from '@heroicons/react/24/outline'

function Cart() {
  const navigate = useNavigate()
  const { items, total } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleUpdateQuantity = (id, newQuantity, name) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id))
      dispatch(showNotification({
        message: `${name} removed from cart`,
        type: 'info'
      }))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
      dispatch(showNotification({
        message: `${name} quantity updated`,
        type: 'success'
      }))
    }
  }

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id))
    dispatch(showNotification({
      message: `${name} removed from cart`,
      type: 'info'
    }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    dispatch(showNotification({
      message: 'Cart cleared',
      type: 'info'
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <Link to={`/products/${item.id}`} className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
            </Link>

            <div className="ml-4 flex-grow">
              <Link
                to={`/products/${item.id}`}
                className="text-lg font-semibold text-gray-800 hover:text-primary"
              >
                {item.name}
              </Link>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                  className="px-3 py-1 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                  className="px-3 py-1 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id, item.name)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-6">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleClearCart()}
            className="w-full btn bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Clear Cart
          </button>
          <button
            onClick={() => {
              dispatch(showNotification({
                message: 'Proceeding to checkout...',
                type: 'info'
              }))
              navigate('/checkout')
            }}
            className="w-full btn btn-primary"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart