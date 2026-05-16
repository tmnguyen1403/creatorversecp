import { supabase } from "./client";
import type { Creator } from "../models/Creator";

const CREATOR_TABLE = "creators";

export const getById = async (id: number) => {
  const { data, error } = await supabase
    .from(CREATOR_TABLE)
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    throw new Response("Creator Not Found", { status: 404 });
  }
  console.log("found creator: ", data);
  return data as Creator;
};

export const getAll = async () => {
  const { data, error } = await supabase
    .from(CREATOR_TABLE)
    .select("*");
  if (error || !data) {
    throw new Response("Creator Not Found", { status: 404 });
  }
  console.log("found creator: ", data);
  return data as [Creator];
};


export const create = async (creator: Creator) => {
  const { error } = await supabase.from(CREATOR_TABLE).insert({
    ...creator,
  });
  if (error) {
    console.error(error);
    return {
      success: false,
      error: error.message
    }
  } else {
    console.log("Success submit to supabase");
    return {
      success: true
    }
  }
};


export const update = async (creator: Creator) => {
  const { data, error } = await supabase.from(CREATOR_TABLE).update({
    ...creator,
  }).eq("id", creator.id);
  
  console.log("Update: ", data);
  if (error) {
    console.error(error);
    return {
      success: false,
      error: error.message
    }
  } else {
    console.log("Success submit to supabase");
    return {
      success: true
    }
  }
};