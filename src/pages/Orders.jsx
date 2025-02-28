import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Orders() {
  const { orders } = useSelector((state) => state.orders)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Đơn hàng #{order.id}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-5">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-20 w-20">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 rounded-md object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Số lượng: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {item.price.toLocaleString('vi-VN')}₫
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <div className="text-sm font-medium text-gray-900">
                  Tổng cộng:{' '}
                  <span className="font-bold">
                    {order.total.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}