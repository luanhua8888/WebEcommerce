import { createSlice } from '@reduxjs/toolkit'

// Sample discount codes (in a real app, these would come from a backend API)
const availableDiscounts = {
  'WELCOME10': {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrder: 0,
    description: 'Giảm 10% cho đơn hàng',
    expiryDate: '2025-12-31',
  },
  'FREESHIP': {
    code: 'FREESHIP',
    type: 'shipping',
    value: 'free',
    minOrder: 500000,
    description: 'Miễn phí vận chuyển cho đơn hàng từ 500.000₫',
    expiryDate: '2025-12-31',
  },
  'SAVE50K': {
    code: 'SAVE50K',
    type: 'fixed',
    value: 50000,
    minOrder: 200000,
    description: 'Giảm 50.000₫ cho đơn hàng từ 200.000₫',
    expiryDate: '2025-12-31',
  },
}

const initialState = {
  currentCode: null,
  discountAmount: 0,
  error: null,
  availableDiscounts, // In real app, this would be loaded from API
}

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    applyDiscount: (state, action) => {
      const { code, orderTotal } = action.payload
      const discount = availableDiscounts[code.toUpperCase()]

      if (!discount) {
        state.error = 'Mã giảm giá không hợp lệ'
        return
      }

      if (new Date(discount.expiryDate) < new Date()) {
        state.error = 'Mã giảm giá đã hết hạn'
        return
      }

      if (orderTotal < discount.minOrder) {
        state.error = `Đơn hàng tối thiểu ${discount.minOrder.toLocaleString('vi-VN')}₫`
        return
      }

      let amount = 0
      switch (discount.type) {
        case 'percentage':
          amount = (orderTotal * discount.value) / 100
          break
        case 'fixed':
          amount = discount.value
          break
        case 'shipping':
          amount = 30000 // Assuming standard shipping fee
          break
      }

      state.currentCode = code.toUpperCase()
      state.discountAmount = amount
      state.error = null
    },
    clearDiscount: (state) => {
      state.currentCode = null
      state.discountAmount = 0
      state.error = null
    },
  },
})

// Selectors
export const selectCurrentDiscount = (state) => ({
  code: state.discount.currentCode,
  amount: state.discount.discountAmount,
  error: state.discount.error,
})

export const selectAvailableDiscounts = (state) =>
  Object.values(state.discount.availableDiscounts)

export const { applyDiscount, clearDiscount } = discountSlice.actions
export default discountSlice.reducer