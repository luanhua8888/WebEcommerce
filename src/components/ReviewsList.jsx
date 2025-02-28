import { useSelector } from 'react-redux'
import { selectProductReviews, selectProductRating } from '../store/reviewsSlice'
import { StarRating } from './ReviewForm'

export default function ReviewsList({ productId }) {
  const reviews = useSelector((state) => selectProductReviews(state, productId))
  const averageRating = useSelector((state) =>
    selectProductRating(state, productId)
  )

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg mb-2">Chưa có đánh giá nào</p>
        <p className="text-gray-400 text-sm">
          Hãy là người đầu tiên đánh giá sản phẩm này
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h3 className="text-lg font-semibold">Đánh giá từ khách hàng</h3>
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} editable={false} />
            <span className="text-sm text-gray-600">
              ({averageRating.toFixed(1)}/5)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sắp xếp:</span>
          <select className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="newest">Mới nhất</option>
            <option value="highest">Đánh giá cao nhất</option>
            <option value="lowest">Đánh giá thấp nhất</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-4">{reviews.length} đánh giá</p>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 space-y-4 bg-white shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium text-lg">
                      {review.userName[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} editable={false} />
              </div>

              <div className="pl-0 sm:pl-15">
                <p className="text-gray-600 whitespace-pre-line">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}