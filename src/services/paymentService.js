// In a real application, these would make API calls to payment providers
// For now, we'll simulate payment processing

export const PaymentMethods = {
  MOMO: 'momo',
  VNPAY: 'vnpay',
  CREDIT_CARD: 'credit_card',
  COD: 'cod',
}

export const processPayment = async (paymentMethod, orderData) => {
  console.log(`Processing payment with ${paymentMethod}...`)

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  switch (paymentMethod) {
    case PaymentMethods.MOMO:
      // In real app, would redirect to Momo payment gateway
      return simulateMomoPayment(orderData)

    case PaymentMethods.VNPAY:
      // In real app, would redirect to VNPay payment gateway
      return simulateVNPayPayment(orderData)

    case PaymentMethods.CREDIT_CARD:
      // In real app, would make call to payment processor
      return simulateCreditCardPayment(orderData)

    case PaymentMethods.COD:
      // Cash on delivery
      return {
        success: true,
        message: 'Đơn hàng đã được xác nhận. Thanh toán khi nhận hàng.',
        transactionId: `COD${Date.now()}`,
      }

    default:
      throw new Error('Phương thức thanh toán không hợp lệ')
  }
}

// Simulate payment processing
const simulateMomoPayment = (orderData) => {
  return {
    success: true,
    message: 'Thanh toán qua Momo thành công',
    transactionId: `MOMO${Date.now()}`,
    provider: 'Momo',
    amount: orderData.total,
  }
}

const simulateVNPayPayment = (orderData) => {
  return {
    success: true,
    message: 'Thanh toán qua VNPay thành công',
    transactionId: `VNPAY${Date.now()}`,
    provider: 'VNPay',
    amount: orderData.total,
  }
}

const simulateCreditCardPayment = (orderData) => {
  return {
    success: true,
    message: 'Thanh toán thẻ thành công',
    transactionId: `CC${Date.now()}`,
    provider: 'Credit Card',
    amount: orderData.total,
  }
}

// Validate credit card information
export const validateCreditCard = (cardData) => {
  const { number, expiry, cvv, name } = cardData

  const errors = {}

  // Card number validation (simple length check)
  if (!number || number.replace(/\s/g, '').length !== 16) {
    errors.number = 'Số thẻ không hợp lệ'
  }

  // Expiry validation (MM/YY format)
  if (!expiry || !expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
    errors.expiry = 'Ngày hết hạn không hợp lệ (MM/YY)'
  } else {
    const [month, year] = expiry.split('/')
    const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
    if (expDate < new Date()) {
      errors.expiry = 'Thẻ đã hết hạn'
    }
  }

  // CVV validation (3-4 digits)
  if (!cvv || !cvv.match(/^[0-9]{3,4}$/)) {
    errors.cvv = 'Mã CVV không hợp lệ'
  }

  // Name validation
  if (!name || name.trim().length < 3) {
    errors.name = 'Vui lòng nhập tên chủ thẻ'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Format credit card number
export const formatCreditCardNumber = (number) => {
  const cleaned = number.replace(/\s/g, '')
  const chunks = cleaned.match(/.{1,4}/g) || []
  return chunks.join(' ')
}