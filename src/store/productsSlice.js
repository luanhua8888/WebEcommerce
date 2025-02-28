import { createSlice } from '@reduxjs/toolkit'
import { products as initialProducts } from '../data/products'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    loading: false,
    error: null
  },
  reducers: {
    addProduct: (state, action) => {
      // Generate a new ID by finding the maximum ID and adding 1
      const maxId = Math.max(...state.items.map(product => product.id))
      const newProduct = {
        ...action.payload,
        id: maxId + 1
      }
      state.items.push(newProduct)
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { 
  addProduct, 
  updateProduct, 
  deleteProduct,
  setLoading,
  setError
} = productsSlice.actions

export const selectAllProducts = state => state.products.items
export const selectProductById = (state, productId) => 
  state.products.items.find(product => product.id === productId)
export const selectProductsLoading = state => state.products.loading
export const selectProductsError = state => state.products.error

export default productsSlice.reducer