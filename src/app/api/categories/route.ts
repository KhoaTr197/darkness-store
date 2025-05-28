import { supabase } from "@/lib/supabase";
// -------------------------------------

export async function GET() {
  try {
    const { data, error } = await supabase.rpc("get_category_tree");

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories", details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}