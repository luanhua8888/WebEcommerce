import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { users } from '../data/users'
import { products } from '../data/products'
import { orders } from '../data/orders'

const getProductStatus = (quantity) => {
  if (quantity <= 0) return { status: 'Hết hàng', color: 'bg-red-100 text-red-800' }
  if (quantity <= 2) return { status: 'Cháy hàng', color: 'bg-orange-100 text-orange-800' }
  if (quantity <= 5) return { status: 'Sắp hết', color: 'bg-yellow-100 text-yellow-800' }
  return { status: 'Còn hàng', color: 'bg-green-100 text-green-800' }
}

const getOrderStatusColor = (status) => {
  switch (status) {
    case 'Đã giao hàng':
      return 'bg-green-100 text-green-800'
    case 'Đang giao hàng':
      return 'bg-blue-100 text-blue-800'
    case 'Đang xử lý':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const PAGE_SIZES = [5, 10, 20, 50]

export default function AdminDashboard() {
  const { role } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [userRoleFilter, setUserRoleFilter] = useState('all')
  const [productCategoryFilter, setProductCategoryFilter] = useState('all')
  const [productStatusFilter, setProductStatusFilter] = useState('all')
  const [orderStatusFilter, setOrderStatusFilter] = useState('all')
  
  // Pagination state
  const [userCurrentPage, setUserCurrentPage] = useState(1)
  const [productCurrentPage, setProductCurrentPage] = useState(1)
  const [orderCurrentPage, setOrderCurrentPage] = useState(1)
  const [userPageSize, setUserPageSize] = useState(10)
  const [productPageSize, setProductPageSize] = useState(10)
  const [orderPageSize, setOrderPageSize] = useState(10)

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/')
    }
  }, [role, navigate])

  // Get unique product categories
  const categories = [...new Set(products.map(product => product.category))]
  // Get unique order statuses
  const orderStatuses = [...new Set(orders.map(order => order.status))]

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

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  // Pagination calculations
  const userTotalPages = Math.ceil(filteredUsers.length / userPageSize)
  const productTotalPages = Math.ceil(filteredProducts.length / productPageSize)
  const orderTotalPages = Math.ceil(filteredOrders.length / orderPageSize)

  const paginatedUsers = filteredUsers.slice(
    (userCurrentPage - 1) * userPageSize,
    userCurrentPage * userPageSize
  )

  const paginatedProducts = filteredProducts.slice(
    (productCurrentPage - 1) * productPageSize,
    productCurrentPage * productPageSize
  )

  const paginatedOrders = filteredOrders.slice(
    (orderCurrentPage - 1) * orderPageSize,
    orderCurrentPage * orderPageSize
  )

  const Pagination = ({ currentPage, totalPages, onChange, pageSize, onPageSizeChange }) => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Hiển thị</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {PAGE_SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span className="text-sm text-gray-700">mục mỗi trang</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {'<<'}
        </button>
        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {'<'}
        </button>
        <span className="text-sm text-gray-700">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {'>'}
        </button>
        <button
          onClick={() => onChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {'>>'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trang quản trị</h1>
      
      {/* Order Management Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Quản lý đơn hàng</h2>
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="border rounded-md p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          >
            <option value="all">Tất cả trạng thái</option>
            {orderStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.userName}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {order.total.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        className="text-primary hover:text-primary-dark mr-3"
                        onClick={() => {/* TODO: View order details */}}
                      >
                        Chi tiết
                      </button>
                      <button 
                        className="text-primary hover:text-primary-dark"
                        onClick={() => {/* TODO: Update order status */}}
                      >
                        Cập nhật
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={orderCurrentPage}
              totalPages={orderTotalPages}
              onChange={setOrderCurrentPage}
              pageSize={orderPageSize}
              onPageSizeChange={setOrderPageSize}
            />
          </div>
        </div>
      </div>

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
                {paginatedUsers.map((user, index) => (
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
            <Pagination
              currentPage={userCurrentPage}
              totalPages={userTotalPages}
              onChange={setUserCurrentPage}
              pageSize={userPageSize}
              onPageSizeChange={setUserPageSize}
            />
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
                {paginatedProducts.map((product) => (
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
            <Pagination
              currentPage={productCurrentPage}
              totalPages={productTotalPages}
              onChange={setProductCurrentPage}
              pageSize={productPageSize}
              onPageSizeChange={setProductPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}