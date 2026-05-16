import { supabase } from "./client";
import type { AirCraft } from "../models/AirCraft";

const AIRCRAFT_TABLE = "aircrafts";

export const getById = async (id: number) => {
  const { data, error } = await supabase
    .from(AIRCRAFT_TABLE)
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    throw new Response("AirCraft Not Found", { status: 404 });
  }
  console.log("found aircraft: ", data);
  return data as AirCraft;
};

export const getAll = async () => {
  console.log("get all aircrafts");
  const { data, error } = await supabase
    .from(AIRCRAFT_TABLE)
    .select("*");
  if (error || !data) {
    throw new Response("AirCraft Not Found", { status: 404 });
  }
  console.log("found aircraft: ", data);
  return data as [AirCraft];
};


export const create = async (aircraft: AirCraft) => {
  const { error } = await supabase.from(AIRCRAFT_TABLE).insert({
    ...aircraft,
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


export const update = async (aircraft: AirCraft) => {
  const { data, error } = await supabase.from(AIRCRAFT_TABLE).update({
    ...aircraft,
  }).eq("id", aircraft.id);
  
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


export const deleteAirCraft = async (id: number) => {
  const { data, error } = await supabase.from(AIRCRAFT_TABLE).delete().eq("id", id);
  
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