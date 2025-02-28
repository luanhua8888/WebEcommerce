import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reviews: {
    // productId: [{ rating, comment, userName, date }]
  }
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const { productId, rating, comment, userName } = action.payload
      if (!state.reviews[productId]) {
        state.reviews[productId] = []
      }
      state.reviews[productId].push({
        rating,
        comment,
        userName,
        date: new Date().toISOString(),
        id: Date.now().toString()
      })
    },
    deleteReview: (state, action) => {
      const { productId, reviewId } = action.payload
      if (state.reviews[productId]) {
        state.reviews[productId] = state.reviews[productId].filter(
          review => review.id !== reviewId
        )
      }
    }
  }
})

// Selectors
export const selectProductReviews = (state, productId) => 
  state.reviews.reviews[productId] || []

export const selectProductRating = (state, productId) => {
  const reviews = selectProductReviews(state, productId)
  if (reviews.length === 0) return 0
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  return totalRating / reviews.length
}

export const { addReview, deleteReview } = reviewsSlice.actions
export default reviewsSlice.reducer