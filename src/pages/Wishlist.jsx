import { useSelector } from 'react-redux'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

function Wishlist() {
  const wishlistIds = useSelector(state => state.wishlist)
  const wishlistProducts = products.filter(product => wishlistIds.includes(product.id))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Your wishlist is empty.</p>
        </div>
      )}
    </div>
  )
}

export default Wishlist