import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  points: 0,
  history: [], // Array of point transactions
  rewards: [
    {
      id: 1,
      name: 'Giảm 50.000₫',
      points: 500,
      description: 'Giảm 50.000₫ cho đơn hàng tiếp theo',
      type: 'discount',
      value: 50000,
    },
    {
      id: 2,
      name: 'Giảm 100.000₫',
      points: 1000,
      description: 'Giảm 100.000₫ cho đơn hàng tiếp theo',
      type: 'discount',
      value: 100000,
    },
    {
      id: 3,
      name: 'Miễn phí vận chuyển',
      points: 300,
      description: 'Miễn phí vận chuyển cho đơn hàng tiếp theo',
      type: 'shipping',
      value: 'free',
    },
  ],
}

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    addPoints: (state, action) => {
      const { amount, reason, orderId } = action.payload
      state.points += amount
      state.history.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        amount,
        reason,
        orderId,
        type: 'earned',
      })
    },
    usePoints: (state, action) => {
      const { amount, reason, rewardId } = action.payload
      if (state.points >= amount) {
        state.points -= amount
        state.history.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          amount: -amount,
          reason,
          rewardId,
          type: 'used',
        })
        return true
      }
      return false
    },
  },
})

// Points earning rules
export const POINTS_RULES = {
  ORDER_POINTS_RATIO: 0.01, // 1% of order total in points
  REVIEW_POINTS: 10, // Points for writing a review
  SIGNUP_BONUS: 100, // Welcome points
  MIN_ORDER_FOR_POINTS: 50000, // Minimum order value to earn points
}

// Selectors
export const selectPoints = (state) => state.points.points
export const selectPointsHistory = (state) => state.points.history
export const selectRewards = (state) => state.points.rewards
export const selectAvailableRewards = (state) =>
  state.points.rewards.filter((reward) => reward.points <= state.points.points)

// Helper function to calculate points for an order
export const calculateOrderPoints = (orderTotal) => {
  if (orderTotal < POINTS_RULES.MIN_ORDER_FOR_POINTS) return 0
  return Math.floor(orderTotal * POINTS_RULES.ORDER_POINTS_RATIO)
}

export const { addPoints, usePoints } = pointsSlice.actions
export default pointsSlice.reducer