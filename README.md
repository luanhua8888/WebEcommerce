# E-Commerce Frontend

Dự án frontend cho website thương mại điện tử, được xây dựng với React và Tailwind CSS.

## Tính năng

- 🛍️ Hiển thị và tìm kiếm sản phẩm
- 🛒 Giỏ hàng và thanh toán
- ❤️ Danh sách yêu thích
- 🔄 So sánh sản phẩm
- ⭐ Đánh giá sản phẩm
- 💰 Hệ thống điểm thưởng
- 🎫 Mã giảm giá
- 👤 Quản lý tài khoản

## Công nghệ sử dụng

- React + Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- React Icons

## Cài đặt

```bash
# Clone dự án
git clone https://github.com/yourusername/ecommerce-frontend.git

# Di chuyển vào thư mục
cd ecommerce-frontend

# Cài đặt dependencies
npm install

# Chạy môi trường development
npm run dev
```

## Cấu trúc thư mục

```
ecommerce-frontend/
├── src/
│   ├── components/     # Các component có thể tái sử dụng
│   ├── pages/         # Các trang của ứng dụng
│   ├── store/         # Redux store và slices
│   ├── services/      # Các service gọi API
│   ├── data/          # Dữ liệu mẫu
│   └── App.jsx        # Component gốc
├── public/            # Tài nguyên tĩnh
└── package.json       # Dependencies và scripts
```

## Responsive Design

Ứng dụng được thiết kế responsive cho:
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (> 1024px)

## Tính năng nổi bật

### So sánh sản phẩm
- So sánh chi tiết các thuộc tính
- Thêm/xóa sản phẩm từ danh sách so sánh
- Xem lịch sử so sánh

### Hệ thống điểm thưởng
- Tích điểm qua mỗi đơn hàng
- Điểm thưởng cho đánh giá sản phẩm
- Xem lịch sử điểm thưởng
- Đổi điểm lấy ưu đãi

### Giảm giá
- Áp dụng mã giảm giá
- Giảm giá theo % hoặc số tiền cố định
