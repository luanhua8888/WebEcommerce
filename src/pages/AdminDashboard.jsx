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
  const [activeTab, setActiveTab] = useState('orders')
  const [userRoleFilter, setUserRoleFilter] = useState('all')
  const [productCategoryFilter, setProductCategoryFilter] = useState('all')
  const [productStatusFilter, setProductStatusFilter] = useState('all')
  const [orderStatusFilter, setOrderStatusFilter] = useState('all')

  const tabs = [
    { id: 'orders', label: 'Đơn hàng' },
    { id: 'users', label: 'Người dùng' },
    { id: 'products', label: 'Sản phẩm' },
    { id: 'categories', label: 'Danh mục' },
    { id: 'promotions', label: 'Khuyến mãi' },
    { id: 'statistics', label: 'Thống kê' }
  ]
  
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
      <h1 className="text-3xl font-bold mb-6">Trang quản trị</h1>
      
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Order Management Section */}
      {activeTab === 'orders' && (
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
                          onClick={() => {/* TODO: Handle view order */}}
                        >
                          Chi tiết
                        </button>
                        <button 
                          className="text-primary hover:text-primary-dark"
                          onClick={() => {/* TODO: Handle status update */}}
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
      )}

      {/* User Management Section */}
      {activeTab === 'users' && (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          className="text-primary hover:text-primary-dark mr-3"
                          onClick={() => {/* TODO: Handle edit user */}}
                        >
                          Sửa
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {/* TODO: Handle delete user */}}
                        >
                          Xóa
                        </button>
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
      )}

      {/* Product Management Section */}
      {activeTab === 'products' && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              onClick={() => navigate('/products/add')}
            >
              Thêm sản phẩm
            </button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          className="text-primary hover:text-primary-dark mr-3"
                          onClick={() => {/* TODO: Handle edit product */}}
                        >
                          Sửa
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {/* TODO: Handle delete product */}}
                        >
                          Xóa
                        </button>
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
      )}

      {/* Category Management Section */}
      {activeTab === 'categories' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Quản lý danh mục</h2>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              onClick={() => {/* TODO: Handle add category */}}
            >
              Thêm danh mục
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map(category => (
                  <tr key={category}>
                    <td className="px-6 py-4">{category}</td>
                    <td className="px-6 py-4">
                      {products.filter(p => p.category === category).length}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        className="text-primary hover:text-primary-dark mr-3"
                        onClick={() => {/* TODO: Handle edit category */}}
                      >
                        Sửa
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {/* TODO: Handle delete category */}}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Promotions Management Section */}
      {activeTab === 'promotions' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Quản lý khuyến mãi</h2>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              onClick={() => {/* TODO: Handle add promotion */}}
            >
              Thêm khuyến mãi
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid gap-6">
              {/* Example promotion card */}
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">Giảm 20% cho đơn hàng trên 1 triệu</h3>
                  <p className="text-gray-600">Hiệu lực: 01/03/2025 - 31/03/2025</p>
                  <p className="text-gray-600">Mã: SALE20</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-primary hover:text-primary-dark">Sửa</button>
                  <button className="text-red-600 hover:text-red-800">Xóa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      {activeTab === 'statistics' && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Thống kê</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Revenue Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Doanh thu</h3>
              <p className="text-2xl font-bold mt-2">
                {orders.reduce((total, order) => total + order.total, 0).toLocaleString('vi-VN')}₫
              </p>
              <p className="text-green-600 text-sm mt-2">+15% so với tháng trước</p>
            </div>

            {/* Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Đơn hàng</h3>
              <p className="text-2xl font-bold mt-2">{orders.length}</p>
              <p className="text-green-600 text-sm mt-2">+5% so với tháng trước</p>
            </div>

            {/* Products Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Sản phẩm</h3>
              <p className="text-2xl font-bold mt-2">{products.length}</p>
              <p className="text-sm mt-2">
                <span className="text-red-600">
                  {products.filter(p => p.quantity <= 0).length} sản phẩm hết hàng
                </span>
              </p>
            </div>

            {/* Users Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Người dùng</h3>
              <p className="text-2xl font-bold mt-2">{users.length}</p>
              <p className="text-green-600 text-sm mt-2">+10% so với tháng trước</p>
            </div>
          </div>

          {/* Charts would go here */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Doanh thu theo thời gian</h3>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                Biểu đồ doanh thu
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Sản phẩm bán chạy</h3>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                Biểu đồ sản phẩm
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}