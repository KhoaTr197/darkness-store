import Link from 'next/link';
import { FaFilter, FaSort, FaTimes, FaCheck, FaStar, FaShoppingCart, FaChevronRight, FaHeart, FaSearch } from 'react-icons/fa';
import { Header } from "@/components/layout";
import ProductCard from "./_components/ProductCard";
import products from "@/data/products_sample.json";

const FilterSection = ({ title, options, selected, onChange }: any) => (
  <div className="mb-6">
    <h3 className="text-md font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">{title}</h3>
    <div className="space-y-2">
      {options.map((option: string) => (
        <label key={option} className="flex items-center hover:text-primary-600 cursor-pointer transition-colors duration-150">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
          />
          <span className="ml-2 text-gray-700 text-sm group-hover:text-primary-600 transition-colors">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;

  console.log(products)

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f7] min-h-screen pt-(--headerHeight)">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
            <span className="text-gray-900 font-medium">Browse Products</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Products
            </h1>
          </div>

          <div className="flex-1">
            {products.length > 0 ? (
              <>
                <div className="flex justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">{products.length}</span> products
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-xs p-8 text-center border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <FaSearch className="text-gray-400" size={24} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">We couldn't find any products matching your current filters. Try adjusting your filters or search query.</p>
                <button
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 