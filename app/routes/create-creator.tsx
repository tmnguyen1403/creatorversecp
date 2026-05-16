import { useActionData } from "react-router";
import type { Route } from "./+types/create-creator";
import { useEffect} from 'react';
import toast from "react-hot-toast";

import CreatorForm from "../components/creators/CreatorForm";
import { create as createCreator } from "../api/creator";
import type { Creator } from "../models/Creator";

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
  const result = await createCreator(data)
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