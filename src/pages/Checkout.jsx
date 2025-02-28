import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { processPayment, PaymentMethods, validateCreditCard, formatCreditCardNumber } from '../services/paymentService'
import { addOrder } from '../store/ordersSlice'
import { clearCart } from '../store/cartSlice'
import { sendOrderConfirmation } from '../services/emailService'
import { selectCurrentDiscount, clearDiscount } from '../store/discountSlice'
import DiscountForm from '../components/DiscountForm'

const paymentOptions = [
  {
    id: PaymentMethods.MOMO,
    name: 'Ví Momo',
    icon: '📱',
    description: 'Thanh toán qua ví điện tử Momo',
  },
  {
    id: PaymentMethods.VNPAY,
    name: 'VNPay',
    icon: '🏦',
    description: 'Thanh toán qua cổng VNPay',
  },
  {
    id: PaymentMethods.CREDIT_CARD,
    name: 'Thẻ tín dụng',
    icon: '💳',
    description: 'Thanh toán bằng thẻ Visa, MasterCard, JCB',
  },
  {
    id: PaymentMethods.COD,
    name: 'Thanh toán khi nhận hàng',
    icon: '💵',
    description: 'Thanh toán tiền mặt khi nhận hàng',
  },
]

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { amount: discountAmount } = useSelector(selectCurrentDiscount)

  const [selectedPayment, setSelectedPayment] = useState(PaymentMethods.COD)
  const finalTotal = cart.total - discountAmount
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  })
  const [address, setAddress] = useState({
    street: user?.address || '',
    city: '',
    phone: user?.phone || '',
  })
  const [cardErrors, setCardErrors] = useState({})

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (cart.items.length === 0) {
      navigate('/cart')
    }

    // Cleanup function to clear discount when unmounting
    return () => {
      dispatch(clearDiscount())
    }
  }, [isAuthenticated, cart.items.length, navigate, dispatch])

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method)
    setError('')
  }

  const handleCardInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'number') {
      setCardData((prev) => ({
        ...prev,
        [name]: formatCreditCardNumber(value),
      }))
    } else {
      setCardData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    setCardErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!address.street.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng')
      return false
    }
    if (!address.city.trim()) {
      setError('Vui lòng nhập thành phố')
      return false
    }
    if (!address.phone.trim()) {
      setError('Vui lòng nhập số điện thoại')
      return false
    }

    if (selectedPayment === PaymentMethods.CREDIT_CARD) {
      const validation = validateCreditCard(cardData)
      if (!validation.isValid) {
        setCardErrors(validation.errors)
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setProcessing(true)
    setError('')

    try {
      const orderData = {
        items: cart.items,
        total: cart.total,
        finalTotal,
        discount: discountAmount,
        paymentMethod: selectedPayment,
        address,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }

      // Process payment
      const paymentResult = await processPayment(selectedPayment, orderData)

      if (paymentResult.success) {
        // Create order
        const order = {
          items: cart.items,
          total: cart.total,
          finalTotal,
          discount: discountAmount,
          address,
          paymentMethod: selectedPayment,
          paymentDetails: paymentResult,
        }

        dispatch(addOrder(order))
        sendOrderConfirmation(order, user)
        dispatch(clearCart())
        navigate('/checkout/success')
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi xử lý thanh toán')
    } finally {
      setProcessing(false)
    }
  }

  if (!isAuthenticated || cart.items.length === 0) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 ${
                      selectedPayment === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPayment === option.id}
                      onChange={() => handlePaymentSelect(option.id)}
                      className="hidden"
                    />
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Credit Card Form */}
            {selectedPayment === PaymentMethods.CREDIT_CARD && (
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="font-semibold">Thông tin thẻ</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số thẻ
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border rounded-lg px-3 py-2"
                    maxLength="19"
                  />
                  {cardErrors.number && (
                    <p className="text-red-500 text-sm mt-1">
                      {cardErrors.number}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày hết hạn
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardData.expiry}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      className="w-full border rounded-lg px-3 py-2"
                      maxLength="5"
                    />
                    {cardErrors.expiry && (
                      <p className="text-red-500 text-sm mt-1">
                        {cardErrors.expiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardData.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      className="w-full border rounded-lg px-3 py-2"
                      maxLength="4"
                    />
                    {cardErrors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên chủ thẻ
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cardData.name}
                    onChange={handleCardInputChange}
                    placeholder="NGUYEN VAN A"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {cardErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{cardErrors.name}</p>
                  )}
                </div>
              </div>
            )}

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="font-semibold">Địa chỉ giao hàng</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Số nhà, tên đường"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thành phố
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Thành phố"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Số điện thoại nhận hàng"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-4">
            <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
            
            <div className="border-b pb-4 space-y-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Form */}
            <div className="border-b pb-4">
              <DiscountForm orderTotal={cart.total} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{cart.total.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Tổng cộng</span>
                <span>{finalTotal.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={processing}
              className={`w-full bg-primary text-white py-3 rounded-lg font-medium ${
                processing
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:bg-primary-dark'
              }`}
            >
              {processing ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}