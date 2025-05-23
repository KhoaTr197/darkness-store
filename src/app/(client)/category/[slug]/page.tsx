import Link from 'next/link';
import { FaChevronRight, FaSearch } from 'react-icons/fa';
import { Header } from "@/components/layout";
import FilterSection from "@/components/ui/FilterSection";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from '@/interfaces/product';
import sampleProducts from "@/data/products_sample.json";
import { notFound } from 'next/navigation';
import { ApiResponse } from '@/interfaces/api';
// -------------------------------

const ITEMS_PER_PAGE = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || 12;

async function getData(slug: string, page: number): Promise<ApiResponse> {
  // Replace with your actual API endpoint
  // const response = await fetch(
  //   `https://api.example.com/categories/${slug}?page=${page}&limit=${ITEMS_PER_PAGE}`,
  //   { next: { revalidate: 3600 } } // ISR with 1-hour revalidation
  // );

  // if (!response.ok) {
  //   throw new Error("Failed to fetch category data");
  // }

  // return response.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: sampleProducts,
        page: 1,
        total: 12
      });
    }, 1000);
  });
}

export default async function CategoryBrowsePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  let data: ApiResponse;
  try {
    data = await getData(slug, 1);
  } catch (error) {
    console.error(error);
    return notFound();
  }

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

          {/* Main Content */}
          <div className="flex gap-4">
            {/* Filters & Sort */}
            <div className="flex-1/5 sticky z-50 top-filterBar h-full border-r-gray-200 border-r">
              <div className="sticky top-filterBar h-full">
                <FilterSection
                  title="Price"
                  options={['$0 - $50', '$50 - $100', '$100 - $200', '$200+']}
                  selected={[]}
                />
                <FilterSection
                  title="Brand"
                  options={['NVIDIA', 'AMD', 'Intel', 'MSI', 'ASUS']}
                  selected={[]}
                />
                <FilterSection
                  title="Rating"
                  options={['4.5+', '4.0+', '3.5+', '3.0+']}
                  selected={[]}
                />
              </div>

            </div>

            {/* Products List */}
            {data.items.length > 0 ? (
              <div className='flex-4/5'>
                <div className="flex justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">{data.items.length}</span> products
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.items.map((product) => (
                    <ProductCard key={product.product_id} data={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className='pagination'>
                  <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Previous
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    1
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-4/5 bg-white rounded-lg shadow-xs p-8 text-center border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <FaSearch className="text-gray-400" size={24} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">We couldn't find any products. Please try again</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 