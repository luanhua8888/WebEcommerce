import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HomeIcon, CartIcon, ElectronicsIcon } from './Icons'
import { logout } from '../store/authSlice'
import NavbarMobile from './NavbarMobile'

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist)
  const compareItems = useSelector((state) => state.compare.items)
  const { isAuthenticated, user, role } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const compareCount = compareItems.length
  const isAdmin = role === 'admin'

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {/* Add padding to body for fixed navbar */}
      <div className="h-14"></div>
      
      <nav className="bg-black/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-[0_2px_15px_-3px_rgba(0,123,255,0.2)]">
        <div className="container mx-auto px-3">
          <div className="relative flex justify-between items-center h-14 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent">
            {/* Logo - visible on all screens */}
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-1.5 transform transition-all duration-300 hover:scale-105 hover:-rotate-2 absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]">
              <ElectronicsIcon className="w-6 h-6" />
              <span className="inline">MinLun Shop</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center lg:gap-6">
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-300 hover:text-blue-400 flex items-center gap-1.5 py-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300 after:shadow-[0_0_10px_rgba(59,130,246,0.5)] group">
                  <HomeIcon className="w-4 h-4 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-sm">Trang chủ</span>
                </Link>
                
                <Link to="/products" className="text-gray-300 hover:text-blue-400 flex items-center gap-1.5 py-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300 after:shadow-[0_0_10px_rgba(59,130,246,0.5)] group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span className="text-sm">Sản phẩm</span>
                </Link>
              </div>

              {/* Wishlist & Cart */}
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <Link to="/wishlist" className="relative flex items-center transform hover:scale-110 transition-transform duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300 hover:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-500/80 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-white/20">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link to="/compare" className="relative flex items-center transform hover:scale-110 transition-transform duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300 hover:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                  {compareCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-500/80 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-white/20">
                      {compareCount}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative flex items-center transform hover:scale-110 transition-transform duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <CartIcon className="w-5 h-5 text-gray-300 hover:text-blue-400" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-500/80 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-white/20">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Menu */}
              <div className="border-l border-white/10 pl-6">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">
                      Xin chào, <span className="font-medium text-blue-400">{user?.name || 'Khách'}</span>
                    </span>
                    <div className="flex items-center gap-4">
                      <Link to={isAdmin ? "/admin" : "/profile"} className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        {isAdmin ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        )}
                      </Link>
                      <Link to="/orders" className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15" />
                        </svg>
                      </Link>
                      <button onClick={handleLogout} className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link to="/login" className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-200 text-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      Đăng nhập
                    </Link>
                    <Link to="/register" className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-200 text-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            <NavbarMobile onLogout={handleLogout} />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar