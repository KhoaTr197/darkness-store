import Link from "next/link";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }: { product: any }) => (
  <Link
    href={`/products/${product.product_id}`}
    className="bg-white rounded-lg shadow-xs overflow-hidden group transition-all duration-300 hover:shadow-md border border-gray-100"
  >
    <div className="aspect-square relative overflow-hidden">
      <img
        src={product.thumbnail_url}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {product.stock < 5 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Low Stock
        </span>
      )}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-white/80 backdrop-blur-xs p-2 rounded-full text-primary-600 hover:bg-white transition-colors"
        >
          <FaHeart size={14} />
        </button>
      </div>
    </div>
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">{product.category}</span>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 w-4 h-4" />
          <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
          <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
        </div>
      </div>
      <h3 className="font-medium text-gray-900 mb-1 truncate" title={product.name}>
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold text-gray-900">
          ${product.new_price.toLocaleString()}
        </span>
        <button
          className="bg-primary-600 text-white px-3 py-2 rounded-md text-sm hover:bg-primary-700 transition-all duration-300 shadow-xs hover:shadow-sm group-hover:scale-105"
        >
          <FaShoppingCart size={14} className="inline mr-1" />
          <span>Add</span>
        </button>
      </div>
    </div>
  </Link>
);

export default ProductCard;