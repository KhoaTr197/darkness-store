import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import FilterSection from "@/components/ui/FilterSection";
import { notFound } from 'next/navigation';
import { ProductsApiResponse } from "@/interfaces/api";
import { ProductList } from '@/components/ui/ProductList';
import { getProducts, ITEMS_PER_PAGE } from '@/lib/api';
// -------------------------------

export default async function CategoryBrowsePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const queryParams = {
    page: Number(query.page) || 1
  }

  let initialData: ProductsApiResponse;
  try {
    initialData = await getProducts(slug, queryParams.page);
  } catch (error) {
    return notFound();
  }

  return (
    <>
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
            <div className="flex-4/5">
              <ProductList
                initialData={initialData}
                slug={slug}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 