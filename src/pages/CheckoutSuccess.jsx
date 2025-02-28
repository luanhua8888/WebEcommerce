import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import { sendOrderConfirmation } from '../services/emailService'
import { addPoints, calculateOrderPoints, POINTS_RULES } from '../store/pointsSlice'
import { showNotification } from '../store/notificationSlice'

function CheckoutSuccess() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const lastOrder = useSelector((state) => state.orders.orders[0])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (lastOrder && cart.items.length > 0) {
      // Send order confirmation email
      sendOrderConfirmation(lastOrder, user)

      // Award points for the order
      const earnedPoints = calculateOrderPoints(lastOrder.total)
      if (earnedPoints > 0) {
        dispatch(
          addPoints({
            amount: earnedPoints,
            reason: `Đơn hàng #${lastOrder.id}`,
            orderId: lastOrder.id,
          })
        )
        dispatch(
          showNotification({
            message: `Bạn đã nhận được ${earnedPoints} điểm thưởng cho đơn hàng này!`,
            type: 'success',
          })
        )
      }

      // Clear the cart
      dispatch(clearCart())
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-green-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Đặt hàng thành công!
      </h1>
      <p className="text-gray-600 mb-8">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và email xác nhận sẽ được gửi tới {user?.email}.
      </p>

      <div className="space-x-4">
        <Link
          to="/orders"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
        >
          Xem đơn hàng
        </Link>
        <Link
          to="/products"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  )
}

export default CheckoutSuccess