import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { users } from '../data/users'
import { products } from '../data/products'

const getProductStatus = (quantity) => {
  if (quantity <= 0) return { status: 'Hết hàng', color: 'bg-red-100 text-red-800' }
  if (quantity <= 2) return { status: 'Cháy hàng', color: 'bg-orange-100 text-orange-800' }
  if (quantity <= 5) return { status: 'Sắp hết', color: 'bg-yellow-100 text-yellow-800' }
  return { status: 'Còn hàng', color: 'bg-green-100 text-green-800' }
}

export default function AdminDashboard() {
  const { role } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [userRoleFilter, setUserRoleFilter] = useState('all')
  const [productCategoryFilter, setProductCategoryFilter] = useState('all')
  const [productStatusFilter, setProductStatusFilter] = useState('all')

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/')
    }
  }, [role, navigate])

  // Get unique product categories
  const categories = [...new Set(products.map(product => product.category))]

  // Filter users
  const filteredUsers = users.filter(user => {
    if (userRoleFilter === 'all') return true;
    return user.role === userRoleFilter;
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = productCategoryFilter === 'all' || product.category === productCategoryFilter;
    const status = getProductStatus(product.quantity).status;
    const matchesStatus = productStatusFilter === 'all' || status === productStatusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trang quản trị</h1>
      
      {/* User Management Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Quản lý người dùng</h2>
          <select
            value={userRoleFilter}
            onChange={(e) => setUserRoleFilter(e.target.value)}
            className="border rounded-md p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name || "—"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phone || "—"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.address || "—"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Management Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <select
              value={productCategoryFilter}
              onChange={(e) => setProductCategoryFilter(e.target.value)}
              className="border rounded-md p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={productStatusFilter}
              onChange={(e) => setProductStatusFilter(e.target.value)}
              className="border rounded-md p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Sắp hết">Sắp hết</option>
              <option value="Cháy hàng">Cháy hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.price.toLocaleString('vi-VN')}₫</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getProductStatus(product.quantity).color}`}>
                        {getProductStatus(product.quantity).status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}