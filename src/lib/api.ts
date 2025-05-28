import { ProductsApiResponse } from "@/interfaces/api";

export const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE) || 12;

export async function getProducts(slug: string, page: number): Promise<ProductsApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/categories/${slug}?page=${page}&limit=${ITEMS_PER_PAGE}`);
  console.log(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/categories/${slug}?page=${page}&limit=${ITEMS_PER_PAGE}`)

  if (!response.ok) {
    throw new Error("Failed to fetch category data");
  }

  return await response.json();
}