import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../store/notificationSlice'

function Toast() {
  const { message, type, show } = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, dispatch])

  if (!show) return null

  const bgColor = {
    success: 'bg-green-500/80',
    error: 'bg-red-500/80',
    info: 'bg-blue-500/80'
  }[type] || 'bg-gray-500/80'

  const glowColor = {
    success: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
    error: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    info: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'
  }[type] || 'shadow-[0_0_15px_rgba(107,114,128,0.3)]'

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${show ? 'animate-slide-in' : ''}`}>
      <div className={`${bgColor} backdrop-blur-md text-white px-6 py-3 rounded-lg border border-white/10 flex items-center gap-2 ${glowColor}`}>
        {type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        )}
        {type === 'error' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>
        )}
        {type === 'info' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast