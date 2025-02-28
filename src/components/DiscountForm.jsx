import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  applyDiscount,
  clearDiscount,
  selectCurrentDiscount,
  selectAvailableDiscounts,
} from '../store/discountSlice'

export default function DiscountForm({ orderTotal }) {
  const dispatch = useDispatch()
  const { code: currentCode, amount: discountAmount, error } = useSelector(selectCurrentDiscount)
  const availableDiscounts = useSelector(selectAvailableDiscounts)
  const [code, setCode] = useState('')
  const [showDiscounts, setShowDiscounts] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim()) return

    dispatch(applyDiscount({ code, orderTotal }))
  }

  const handleClear = () => {
    dispatch(clearDiscount())
    setCode('')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={currentCode || code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            disabled={!!currentCode}
            placeholder="Nhập mã giảm giá"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        {currentCode ? (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            Xóa
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Áp dụng
          </button>
        )}
      </form>

      {/* Available Discounts */}
      <div>
        <button
          type="button"
          onClick={() => setShowDiscounts(!showDiscounts)}
          className="text-primary hover:text-primary-dark text-sm flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6z"
            />
          </svg>
          {showDiscounts ? 'Ẩn mã giảm giá' : 'Xem mã giảm giá'}
        </button>

        {showDiscounts && (
          <div className="mt-4 space-y-3">
            {availableDiscounts.map((discount) => (
              <div
                key={discount.code}
                className="border rounded-lg p-3 bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-primary">{discount.code}</div>
                    <div className="text-sm text-gray-600">
                      {discount.description}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCode(discount.code)
                      dispatch(applyDiscount({ code: discount.code, orderTotal }))
                    }}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Sử dụng
                  </button>
                </div>
                {discount.minOrder > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Đơn tối thiểu: {discount.minOrder.toLocaleString('vi-VN')}₫
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Hết hạn: {new Date(discount.expiryDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Applied Discount */}
      {currentCode && discountAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Giảm giá:</span>
          <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
        </div>
      )}
    </div>
  )
}