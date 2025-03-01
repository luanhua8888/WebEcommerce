import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../store/authSlice'
import { users } from '../../data/users'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      dispatch(login(userWithoutPassword))
      navigate(user.role === 'admin' ? '/admin' : '/')
    } else {
      setError('Email hoặc mật khẩu không chính xác')
    }
  }

  return (
    <div className="min-h-[100dvh] md:h-auto md:py-20 flex items-center justify-center bg-gradient-primary px-4">
      <div className="max-w-md w-full space-y-4 sm:space-y-6 p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl">
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
            Đăng nhập
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Chào mừng bạn trở lại!
          </p>
        </div>
        <form className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm bg-white/50 backdrop-blur-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm bg-white/50 backdrop-blur-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50/50 backdrop-blur-sm p-3 sm:p-4 border border-red-100">
              <div className="text-sm text-red-700 font-medium">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Đăng nhập
            </button>
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}