import { createSlice } from '@reduxjs/toolkit'
import { sendWelcomeEmail } from '../services/emailService'

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      // Send welcome email
      sendWelcomeEmail(action.payload)
    },
    login: (state, action) => {
      state.user = action.payload
      state.role = action.payload.role
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.role = null
      state.isAuthenticated = false
    },
  },
})

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer