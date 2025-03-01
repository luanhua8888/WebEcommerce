import { useSelector, useDispatch } from 'react-redux'
import {
  addToCompare,
  removeFromCompare,
  selectIsInCompare,
  selectCanAddToCompare,
} from '../store/compareSlice'
import { showNotification } from '../store/notificationSlice'

export default function CompareButton({ product, className = '' }) {
  const dispatch = useDispatch()
  const isInCompare = useSelector((state) => selectIsInCompare(state, product.id))
  const canAdd = useSelector(selectCanAddToCompare)

  const handleToggleCompare = () => {
    if (isInCompare) {
      dispatch(removeFromCompare(product.id))
      dispatch(showNotification({
        message: `Đã xóa ${product.name} khỏi danh sách so sánh`,
        type: 'info'
      }))
    } else if (canAdd) {
      dispatch(addToCompare(product))
      dispatch(showNotification({
        message: `Đã thêm ${product.name} vào danh sách so sánh`,
        type: 'success'
      }))
    } else {
      dispatch(showNotification({
        message: 'Chỉ có thể so sánh tối đa 4 sản phẩm',
        type: 'warning'
      }))
    }
  }

  return (
    <button
      onClick={handleToggleCompare}
      className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm ${className} ${
        isInCompare
          ? 'bg-primary text-white hover:bg-primary-dark'
          : canAdd
          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }`}
      disabled={!canAdd && !isInCompare}
      title={
        !canAdd && !isInCompare
          ? 'Đã đạt số lượng tối đa sản phẩm có thể so sánh'
          : isInCompare
          ? 'Xóa khỏi so sánh'
          : 'Thêm vào so sánh'
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
      {isInCompare ? 'Đã thêm' : 'So sánh'}
    </button>
  )
}