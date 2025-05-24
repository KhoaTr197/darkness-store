import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { ReviewsApiResponse } from "@/interfaces/api";
import { Review } from "@/interfaces/review";
// -------------------------------------

// Get all reviews of a product by id
export async function GET(
  req: NextRequest,
  { params }: {
    params: Promise<{
      slug: string
    }>
  }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const queryParams = {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 50
    };

    const { data, error } = await supabase
      .from("Reviews")
      .select(`
        *,
        Users(full_name, created_at),
      `)
      .eq("Products.url_slug", slug)
      .range(
        queryParams.limit * (queryParams.page - 1),
        queryParams.limit * queryParams.page - 1
      );

    if (error) throw error;

    const ReviewsApiResponse: ReviewsApiResponse = {
      status: "success",
      message: "Successfully fetched reviews",
      url: req.url,
      data: data
    }

    return new Response(
      JSON.stringify(ReviewsApiResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {    
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to fetch reviews",
        error: error.message,
        url: req.url,
        data: null
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}