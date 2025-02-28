import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload)
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter(productId => productId !== action.payload)
    }
  }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer