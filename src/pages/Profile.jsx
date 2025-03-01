import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../store/authSlice'

export default function Profile() {
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [editMode, setEditMode] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (changePassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({
          type: 'error',
          text: 'Mật khẩu mới không khớp'
        })
        return
      }

      // In a real app, verify current password before updating
      if (formData.currentPassword !== '123') {
        setMessage({
          type: 'error',
          text: 'Mật khẩu hiện tại không đúng'
        })
        return
      }
    }

    // Simulate API call
    const updatedUser = {
      ...user,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    }

    try {
      dispatch(updateProfile(updatedUser))
      setMessage({
        type: 'success',
        text: 'Cập nhật thông tin thành công'
      })
      setEditMode(false)
      setChangePassword(false)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Có lỗi xảy ra khi cập nhật thông tin'
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Thông tin cá nhân</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message.text && (
              <div className={`rounded-lg p-4 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            {!editMode ? (
              // View mode
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Họ tên</label>
                  <p className="mt-1 text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                  <p className="mt-1 text-gray-900">{user.phone || '—'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
                  <p className="mt-1 text-gray-900">{user.address || '—'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            ) : (
              // Edit mode
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                {!changePassword ? (
                  <button
                    type="button"
                    onClick={() => setChangePassword(true)}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Đổi mật khẩu
                  </button>
                ) : (
                  <div className="space-y-4 border-t pt-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required={changePassword}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required={changePassword}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={changePassword}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setChangePassword(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Hủy đổi mật khẩu
                    </button>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false)
                      setChangePassword(false)
                    }}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
