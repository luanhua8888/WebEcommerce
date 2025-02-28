import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: action.payload.items,
        total: action.payload.total,
      }
      state.orders.unshift(order)
    },
  },
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer