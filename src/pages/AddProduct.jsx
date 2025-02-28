import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { categories } from '../data/products'
import { addProduct } from '../store/productsSlice'
import { showNotification } from '../store/notificationSlice'

export default function AddProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: categories[0]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      dispatch(showNotification({
        message: 'Vui lòng điền đầy đủ thông tin sản phẩm',
        type: 'error'
      }))
      return
    }

    try {
      // Format the product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      }

      // Dispatch action to add product
      dispatch(addProduct(productData))
      
      dispatch(showNotification({
        message: 'Thêm sản phẩm thành công',
        type: 'success'
      }))
      navigate('/products')
    } catch (error) {
      dispatch(showNotification({
        message: 'Có lỗi xảy ra khi thêm sản phẩm',
        type: 'error'
      }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Giá (VND)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            step="10000"
            placeholder="VD: 1000000"
            required
          />
          {formData.price && (
            <p className="mt-1 text-sm text-gray-600">
              Giá hiển thị: {parseInt(formData.price).toLocaleString('vi-VN')}₫
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            URL hình ảnh
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150'
                  dispatch(showNotification({
                    message: 'URL hình ảnh không hợp lệ',
                    type: 'error'
                  }))
                }}
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Danh mục
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {categories.filter(cat => cat !== 'All').map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  )
}