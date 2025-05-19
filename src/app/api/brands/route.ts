import { supabase } from "@/lib/supabase";
// -------------------------------------

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Brands")
      .select("*");

    console.log(data, error);
    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch brands" }), { status: 500 });
  }
}
