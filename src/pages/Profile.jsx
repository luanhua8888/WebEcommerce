import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import PointsSection from '../components/PointsSection'

export default function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    address: user?.address || '',
    notifications: {
      email: true,
      orders: true,
      promotions: false,
    },
  })
  const [message, setMessage] = useState('')

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('Thông tin đã được cập nhật')
    dispatch(login({ ...user, ...formData }))
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Mật khẩu mới không khớp')
      return
    }
    setMessage('Mật khẩu đã được cập nhật')
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }))
  }

  const tabs = [
    { id: 'personal', label: 'Thông tin', icon: 'user' },
    { id: 'security', label: 'Bảo mật', icon: 'lock' },
    { id: 'preferences', label: 'Tùy chọn', icon: 'cog' },
    { id: 'points', label: 'Điểm thưởng', icon: 'star' },
  ]

  const renderTabIcon = (icon) => {
    switch (icon) {
      case 'user':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      case 'lock':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      case 'cog':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      case 'star':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Quản lý tài khoản</h1>

      {message && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg shadow-sm">
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 rounded-lg transition-colors flex flex-col items-center justify-center ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            {renderTabIcon(tab.icon)}
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'personal' && (
          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Lưu thay đổi
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handlePasswordChange} className="p-4 md:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Đổi mật khẩu
            </button>
          </form>
        )}

        {activeTab === 'preferences' && (
          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông báo
              </label>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleChange}
                    className="w-5 h-5 rounded text-primary focus:ring-primary"
                  />
                  <span className="ml-3">Nhận thông báo qua email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="orders"
                    checked={formData.notifications.orders}
                    onChange={handleChange}
                    className="w-5 h-5 rounded text-primary focus:ring-primary"
                  />
                  <span className="ml-3">Cập nhật đơn hàng</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="promotions"
                    checked={formData.notifications.promotions}
                    onChange={handleChange}
                    className="w-5 h-5 rounded text-primary focus:ring-primary"
                  />
                  <span className="ml-3">Chương trình khuyến mãi</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Lưu tùy chọn
            </button>
          </form>
        )}

        {activeTab === 'points' && (
          <div className="p-4 md:p-6">
            <PointsSection />
          </div>
        )}
      </div>
    </div>
  )
}
