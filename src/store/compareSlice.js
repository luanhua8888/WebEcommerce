import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // Products being compared
  maxItems: 4, // Maximum number of products that can be compared
}

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload
      if (state.items.length >= state.maxItems) {
        return
      }
      if (!state.items.find(item => item.id === product.id)) {
        state.items.push(product)
      }
    },
    removeFromCompare: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
    },
    clearCompare: (state) => {
      state.items = []
    },
  },
})

// Selectors
export const selectCompareItems = (state) => state.compare.items
export const selectIsInCompare = (state, productId) =>
  state.compare.items.some(item => item.id === productId)
export const selectCanAddToCompare = (state) =>
  state.compare.items.length < state.compare.maxItems

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions
export default compareSlice.reducer