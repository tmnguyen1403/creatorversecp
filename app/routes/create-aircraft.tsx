import { useActionData } from "react-router";
import type { Route } from "./+types/create-aircraft";
import { useEffect} from 'react';
import toast from "react-hot-toast";

import AirCraftForm from "../components/aircrafts/AirCraftForm";
import { create as createAirCraft } from "../api/aircraft";
import type { AirCraft } from "../models/AirCraft";

export async function action({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();

  const data: AirCraft = {
    name: String(formData.get("name") || ""),
    url: String(formData.get("url") || ""),
    description: String(formData.get("description") || ""),
    imageURL: String(formData.get("imageURL") || ""),
  };

  console.log("AirCraft:", data);
  const result = await createAirCraft(data)
  if (!result.success) {
    return { ok: false, error: result.error };
  }

  return { ok: true };
}

export default function CreateAirCraftPage() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.ok) {
      toast.success("AirCraft added successfully!");
    } else if (actionData?.error) {
      toast.error("Failed to add aircraft");
    }
  }, [actionData]);

  return (
  <>
    <AirCraftForm />;
  </>
  );
}