'use client';

import { FaSearch } from "react-icons/fa";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { ProductsApiResponse } from "@/interfaces/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api";
import useSWR from "swr";
import { EmptyState } from "./EmptyState";
// --------------------------------

export const ProductList = ({
  initialData,
  slug,
  itemsPerPage
}: {
  initialData: ProductsApiResponse,
  slug: string,
  itemsPerPage: number
}) => {
  const searchParams = useSearchParams();
  const [currentData, setCurrentData] = useState<ProductsApiResponse>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || itemsPerPage.toString(), 10);

  const fetcher = ([slug, page]: [string, number]) =>
    getProducts(slug, page);

  const { data: fetchedData, error, isLoading, mutate } = useSWR<ProductsApiResponse, Error>(
    page === initialData.page
      ? null // Skip fetch if page matches initialData
      : [slug, page, limit, process.env.NEXT_PUBLIC_HOSTNAME || 'http://localhost:3000'],
    fetcher,
    {
      revalidateOnFocus: true, // Revalidate on browser Back/Forward or tab focus
      revalidateOnReconnect: true, // Revalidate on network reconnect
      dedupingInterval: 2000, // Avoid duplicate requests within 2 seconds
    }
  );

  useEffect(() => {
    if (page === initialData.page) {
      setCurrentData(initialData);
    } else if (fetchedData) {
      setCurrentData(fetchedData);
    }
  }, [fetchedData, page, initialData]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <EmptyState
        title="Error"
        description={error.message}
      />
    );
  }

  if (!currentData.list?.length) {
    return (
      <EmptyState
        title="No products found"
        description="We couldn't find any products. Please try again."
      />
    );
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{currentData.total}</span> products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.list.map((product) => (
          <ProductCard key={product.product_id} data={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        baseUrl={`/category/${slug}`}
        currentPage={currentData.page || 1}
        totalPages={Math.ceil((currentData.total || 0) / itemsPerPage)}
        limit={itemsPerPage}
        className='mt-8 justify-center'
      />
    </>
  )
};