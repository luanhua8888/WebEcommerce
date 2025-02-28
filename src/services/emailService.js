// In a real application, this would make API calls to your backend email service
// For now, we'll simulate email sending and log to console

export const sendOrderConfirmation = (order, user) => {
  console.log('Sending order confirmation email...')
  // This would be an API call in production
  const emailContent = generateOrderConfirmationEmail(order, user)
  console.log('Email content:', emailContent)
  return Promise.resolve({ success: true })
}

export const sendWelcomeEmail = (user) => {
  console.log('Sending welcome email...')
  const emailContent = generateWelcomeEmail(user)
  console.log('Email content:', emailContent)
  return Promise.resolve({ success: true })
}

// Email template generators
const generateOrderConfirmationEmail = (order, user) => {
  return {
    to: user.email,
    subject: `Xác nhận đơn hàng #${order.id}`,
    content: `
      Xin chào ${user.name},

      Cảm ơn bạn đã đặt hàng tại E-Shop. Đơn hàng của bạn đã được xác nhận.

      Thông tin đơn hàng:
      Mã đơn hàng: #${order.id}
      Ngày đặt: ${new Date(order.date).toLocaleDateString('vi-VN')}
      
      Chi tiết đơn hàng:
      ${order.items
        .map(
          (item) =>
            `- ${item.name} x ${item.quantity}: ${item.price.toLocaleString(
              'vi-VN'
            )}₫`
        )
        .join('\n')}

      Tổng cộng: ${order.total.toLocaleString('vi-VN')}₫

      Chúng tôi sẽ thông báo cho bạn khi đơn hàng được gửi đi.

      Trân trọng,
      E-Shop Team
    `,
  }
}

const generateWelcomeEmail = (user) => {
  return {
    to: user.email,
    subject: 'Chào mừng bạn đến với E-Shop',
    content: `
      Xin chào ${user.name},

      Chào mừng bạn đến với E-Shop! Chúng tôi rất vui mừng vì bạn đã tham gia cùng chúng tôi.

      Tài khoản của bạn đã được tạo thành công. Bạn có thể:
      - Mua sắm các sản phẩm chất lượng
      - Theo dõi đơn hàng
      - Lưu sản phẩm yêu thích
      - Nhận thông tin về khuyến mãi

      Nếu bạn cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi.

      Trân trọng,
      E-Shop Team
    `,
  }
}