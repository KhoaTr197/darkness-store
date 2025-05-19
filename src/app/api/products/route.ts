import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
// -------------------------------------

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  try {
    console.log(req, params);
    const { data, error } = await supabase
      .from("Products")
      .select(`
        *, 
        Brands(name, logo_url),
        Categories(name, url_slug)
      `);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}