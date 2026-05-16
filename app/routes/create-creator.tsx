import { redirect } from "react-router";
import type { Route } from "./+types/create-creator";

import CreatorForm from "../components/creators/CreatorForm";
import { createCar } from "../api/create-creator";
import type { Creator } from "../models/Creator";
import { useActionData } from "react-router";
import toast from "react-hot-toast";
import { useEffect} from 'react';

export async function action({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();

  const data: Creator = {
    name: String(formData.get("name") || ""),
    url: String(formData.get("url") || ""),
    description: String(formData.get("description") || ""),
    imageURL: String(formData.get("imageURL") || ""),
  };

  console.log("Creator:", data);
  const result = await createCar(data)
  if (!result.success) {
    return { ok: false, error: result.error };
  }

  return { ok: true };
}

export default function CreateCreatorPage() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.ok) {
      toast.success("Creator added successfully!");
    } else if (actionData?.error) {
      toast.error("Failed to add creator");
    }
  }, [actionData]);

  return (
  <>
    <CreatorForm />;
  </>
  );
}