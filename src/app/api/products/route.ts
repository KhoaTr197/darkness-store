import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/interfaces/product";
import { ProductsApiResponse } from "@/interfaces/api";
// -------------------------------------

// Get all products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 50
    };

    let ProductApiResponse: ProductsApiResponse;

    const startTime = Date.now();
    const { data, error } = await supabase
      .from("Products")
      .select(`
        *, 
        Brands(name, logo_url),
        Categories(name, url_slug)
      `)
      .range(
        queryParams.limit * (queryParams.page - 1),
        queryParams.limit * queryParams.page - 1
      );

    if (error)
      throw error;
   
      ProductApiResponse = {
        status: "success",
        message: "Successfully fetched products",
        queryTime: (Date.now() - startTime) / 1000,
        url: req.url,
        page: queryParams.page,
        total: data?.length,        
        list: data,
      }

    return new NextResponse(
      JSON.stringify(ProductApiResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {    
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Failed to fetch products",
        error: error.message,
        queryTime: 0,
        url: req.url,
        page: 0,
        total: 0,
        list: []
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}