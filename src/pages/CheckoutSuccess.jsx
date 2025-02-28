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

      // Clear the cart and redirect to orders page
      dispatch(clearCart())
      dispatch(showNotification({
        message: 'Đơn hàng đã được đặt thành công!',
        type: 'success'
      }))
      navigate('/orders')
    }
  }, [dispatch, navigate, lastOrder, cart.items.length, user, isAuthenticated])

  return null
}

export default CheckoutSuccess