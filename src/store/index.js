import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'
import notificationReducer from './notificationSlice'
import reviewsReducer from './reviewsSlice'
import authReducer from './authSlice'
import ordersReducer from './ordersSlice'
import compareReducer from './compareSlice'
import pointsReducer from './pointsSlice'
import discountReducer from './discountSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    notification: notificationReducer,
    reviews: reviewsReducer,
    auth: authReducer,
    orders: ordersReducer,
    compare: compareReducer,
    points: pointsReducer,
    discount: discountReducer,
  },
})