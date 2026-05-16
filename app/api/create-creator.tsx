import { supabase } from "./client";
import type { Creator } from "../models/Creator";

export const createCar = async (creator: Creator) => {
  const { error } = await supabase.from("creators").insert({
    ...creator,
  });
  //const testerror = {message: "test failure"};  
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