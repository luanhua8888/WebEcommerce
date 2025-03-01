import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Compare from './pages/Compare'
import AddProduct from './pages/AddProduct'
import AdminDashboard from './pages/AdminDashboard'
import Toast from './components/Toast'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toast />
      <Navbar />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/compare" element={<Compare />} />
          <Route
            path="/products/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Chat />
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container text-center">
          <p> ❤️‍🔥Mayiu❤️‍🔥  </p>
        </div>
      </footer>
    </div>
  )
}

export default App