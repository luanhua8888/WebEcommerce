import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HomeIcon, CartIcon, ElectronicsIcon } from './Icons'

export default function NavbarMobile({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist)
  const { isAuthenticated, user, role } = useSelector((state) => state.auth)

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const isAdmin = role === 'admin'

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'
  }

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed right-4 top-4 z-[101] p-2 rounded-lg bg-white shadow-lg hover:bg-primary/10 transition-all duration-300"
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white/95 shadow-xl backdrop-blur-lg">
          {/* Header */}
          <div className="sticky top-0 p-4 bg-gradient-primary shadow-md">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-2xl font-extrabold text-white flex items-center gap-2"
                onClick={toggleMenu}
              >
                <ElectronicsIcon className="w-7 h-7" />
                MinLun Shop
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-white/10 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="h-[calc(100vh-5rem)] overflow-y-auto bg-gray-50/90">
            <div className="p-4 space-y-4">
              {/* User Info Section */}
              {isAuthenticated && (
                <div className="mb-4 p-4 bg-white/80 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">Xin chào,</p>
                  <p className="font-medium text-lg bg-gradient-primary bg-clip-text text-transparent">
                    {user?.name || 'Khách'}
                  </p>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                  onClick={toggleMenu}
                >
                  <HomeIcon className="w-6 h-6" />
                  <span className="font-medium">Trang chủ</span>
                </Link>

                <Link
                  to="/products"
                  className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                  onClick={toggleMenu}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span className="font-medium">Sản phẩm</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm relative"
                  onClick={toggleMenu}
                >
                  <CartIcon className="w-6 h-6" />
                  <span className="font-medium">Giỏ hàng</span>
                  {itemCount > 0 && (
                    <span className="absolute top-3 left-8 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm relative"
                  onClick={toggleMenu}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">Yêu thích</span>
                  {wishlistCount > 0 && (
                    <span className="absolute top-3 left-8 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Admin Dashboard Link */}
                {/* {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                    onClick={toggleMenu}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15" />
                    </svg>
                    <span className="font-medium">Quản trị</span>
                  </Link>
                )} */}

                {/* User Account Links */}
                {isAuthenticated ? (
                  <>
                    <Link
                      to={isAdmin ? "/admin" : "/profile"}
                      className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                      onClick={toggleMenu}
                    >
                      {isAdmin ? (
                        <>
                         
                        
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15" /> 
                          </svg>

                          <span className="font-medium">Quản trị</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium">Tài khoản</span>
                        </>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                      onClick={toggleMenu}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="font-medium">Lịch sử đơn hàng</span>
                    </Link>

                    <button
                      onClick={() => {
                        onLogout()
                        toggleMenu()
                      }}
                      className="w-full flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm text-left"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Đăng xuất</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                      onClick={toggleMenu}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Đăng nhập</span>
                    </Link>

                    <Link
                      to="/register"
                      className="flex items-center gap-3 p-4 bg-white/80 hover:bg-primary/20 rounded-lg transition-all shadow-sm"
                      onClick={toggleMenu}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span className="font-medium">Đăng ký</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
