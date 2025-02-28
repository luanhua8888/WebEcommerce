import { useSelector, useDispatch } from 'react-redux'
import {
  selectPoints,
  selectPointsHistory,
  selectRewards,
  selectAvailableRewards,
  usePoints,
} from '../store/pointsSlice'
import { showNotification } from '../store/notificationSlice'

export default function PointsSection() {
  const dispatch = useDispatch()
  const points = useSelector(selectPoints)
  const history = useSelector(selectPointsHistory)
  const rewards = useSelector(selectRewards)
  const availableRewards = useSelector(selectAvailableRewards)

  const handleRedeemReward = (reward) => {
    const success = dispatch(
      usePoints({
        amount: reward.points,
        reason: `Đổi điểm thưởng: ${reward.name}`,
        rewardId: reward.id,
      })
    )

    if (success) {
      dispatch(
        showNotification({
          message: `Đã đổi thành công ${reward.name}`,
          type: 'success',
        })
      )
    } else {
      dispatch(
        showNotification({
          message: 'Không đủ điểm thưởng',
          type: 'error',
        })
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Points Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Điểm thưởng của bạn</h3>
            <p className="text-gray-500 text-sm">
              Tích điểm với mỗi đơn hàng và đánh giá sản phẩm
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{points}</div>
            <div className="text-sm text-gray-500">điểm</div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Phần thưởng khả dụng</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {rewards.map((reward) => {
            const isAvailable = availableRewards.includes(reward)
            return (
              <div
                key={reward.id}
                className={`border rounded-lg p-4 ${
                  isAvailable
                    ? 'border-primary/20 bg-primary/5'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {reward.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">
                      {reward.points} điểm
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRedeemReward(reward)}
                  disabled={!isAvailable}
                  className={`w-full mt-4 px-4 py-2 rounded-lg ${
                    isAvailable
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isAvailable ? 'Đổi ngay' : 'Chưa đủ điểm'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Lịch sử điểm thưởng</h3>
        <div className="space-y-4">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Chưa có giao dịch điểm thưởng nào
            </p>
          ) : (
            history.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <div className="font-medium">{transaction.reason}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div
                  className={`font-medium ${
                    transaction.type === 'earned'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'earned' ? '+' : ''}
                  {transaction.amount} điểm
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}