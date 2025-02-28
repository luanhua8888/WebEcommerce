import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReview } from '../store/reviewsSlice'
import { addPoints, POINTS_RULES } from '../store/pointsSlice'
import { showNotification } from '../store/notificationSlice'

const StarRating = ({ rating, setRating, editable = true }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={editable ? 'button' : 'span'}
          onClick={() => editable && setRating(star)}
          className={editable ? 'cursor-pointer' : 'cursor-default'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            className={`w-6 h-6 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={star <= rating ? 0 : 1.5}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function ReviewForm({ productId }) {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setMessage('Vui lòng đăng nhập để đánh giá sản phẩm')
      return
    }

    if (!comment.trim()) {
      setMessage('Vui lòng nhập nội dung đánh giá')
      return
    }

    // Add review
    dispatch(
      addReview({
        productId,
        rating,
        comment,
        userName: user.name,
      })
    )

    // Award points for review
    dispatch(
      addPoints({
        amount: POINTS_RULES.REVIEW_POINTS,
        reason: 'Đánh giá sản phẩm',
        productId,
      })
    )

    // Show notification
    dispatch(
      showNotification({
        message: `Cảm ơn bạn đã đánh giá! Bạn nhận được ${POINTS_RULES.REVIEW_POINTS} điểm thưởng`,
        type: 'success',
      })
    )

    // Reset form
    setRating(5)
    setComment('')
    setMessage('Cảm ơn bạn đã đánh giá sản phẩm')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes('Cảm ơn')
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Đánh giá của bạn
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Nhận xét
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
      >
        Gửi đánh giá
      </button>
    </form>
  )
}

export { StarRating }