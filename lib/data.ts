import { createSupabaseServerClient } from "./supabase";
import type { Course } from "@/types";

export async function getCourses(): Promise<Course[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    return [];
  }
}
