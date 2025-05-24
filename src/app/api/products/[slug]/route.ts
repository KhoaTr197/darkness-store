import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { ProductApiResponse } from "@/interfaces/api";
// -------------------------------------

// Get product by slug
export async function GET(
  req: NextRequest,
  { params }: { params: {
    slug: string
  }}
) {
  try {
    const { slug } = params;    

    const { data, error } = await supabase
      .from("Products")
      .select(`
        *, 
        Brands(name, logo_url),
        Categories(name, url_slug)
      `)
      .eq("url_slug", slug);

    if (error) throw error;

    const ProductApiResponse: ProductApiResponse = {
      status: "success",
      message: "Successfully fetched product",
      url: req.url,
      data: data[0]
    }

    return new Response(JSON.stringify(ProductApiResponse), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error: any) {    
    return new Response(JSON.stringify({
      status: "error",
      message: "Failed to fetch product",
      error: error.message,
      url: req.url,
      data: null
    }), { status: 404, headers: { "Content-Type": "application/json" } });
  }
}