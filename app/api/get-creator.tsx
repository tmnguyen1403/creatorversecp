import { supabase } from "./client";
import type { Creator } from "../models/Creator";

export const getCreator = async (id: number) => {
  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    throw new Response("Creator Not Found", { status: 404 });
  }
  console.log("found creator: ", data);
  return data as Creator;
};
