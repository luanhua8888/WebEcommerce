import { useState } from 'react'
import { Link } from 'react-router-dom'
import { users } from '../../data/users'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    // Simulate API call
    setTimeout(() => {
      const user = users.find(u => u.email === email)
      
      if (user) {
        // In a real app, this would send a password reset email
        setMessage({
          type: 'success',
          text: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.'
        })
      } else {
        setMessage({
          type: 'error',
          text: 'Không tìm thấy tài khoản với email này.'
        })
      }
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-[100dvh] md:h-auto md:py-20 flex items-center justify-center bg-gradient-primary px-4">
      <div className="max-w-md w-full space-y-4 sm:space-y-6 p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl">
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
            Quên mật khẩu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nhập email của bạn để đặt lại mật khẩu
          </p>
        </div>

        <form className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
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
              disabled={isSubmitting}
            />
          </div>

          {message.text && (
            <div className={`rounded-lg p-3 sm:p-4 ${
              message.type === 'success' 
                ? 'bg-green-50/50 text-green-800 border border-green-100' 
                : 'bg-red-50/50 text-red-800 border border-red-100'
            }`}>
              <div className="text-sm font-medium">{message.text}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Gửi liên kết đặt lại'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}