import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { ProductsApiResponse } from "@/interfaces/api";
// -------------------------------------

// Get all products by category slug with pagination
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{
    slug: string
  }>}
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const queryParams = {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 50
    };

    const { data, count, error } = await supabase
      .from("Products")
      .select(`
        *, 
        Brands(name, logo_url),
        Categories(name, url_slug)
      `, { count: "exact" })
      .eq("Categories.url_slug", slug)
      .range(
        queryParams.limit * (queryParams.page - 1),
        queryParams.limit * queryParams.page - 1
      );

    if (error) throw error;

    if (!data || data.length === 0 || count === null) {
      throw new Error("Category not found");
    }

    const ProductApiResponse: ProductsApiResponse = {
      status: "success",
      message: "Successfully fetched product",
      url: req.url,
      page: queryParams.page,
      total: count,
      list: data
    }

    return new Response(JSON.stringify(ProductApiResponse), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error: any) {    
    return new Response(JSON.stringify({
      status: "error",
      message: "Failed to fetch product",
      error: error.message,
      url: req.url,
      list: []
    }), { status: 404, headers: { "Content-Type": "application/json" } });
  }
}