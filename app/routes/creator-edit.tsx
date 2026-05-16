import { redirect } from "react-router";
import type { Route } from "./+types/create-edit";

import CreatorForm from "../components/creators/CreatorForm";
import type { Creator } from "../models/Creator";
import { useActionData } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useLocation, useLoaderData } from "react-router";
import { getById as getCreator, update as updateCreator } from "~/api/creator";
import CreatorEditForm from "~/components/creators/CreatorEditForm";

export async function loader({ params }: Route.LoaderArgs) {
  const creator = await getCreator(params.id!);
  return { creator };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const data: Creator = {
    id: Number(formData.get("id") || -1),
    name: String(formData.get("name") || ""),
    url: String(formData.get("url") || ""),
    description: String(formData.get("description") || ""),
    imageURL: String(formData.get("imageURL") || ""),
  };

  console.log("Update Creator:", data);
  const result = await updateCreator(data);
  if (!result.success) {
    return { ok: false, error: result.error };
  }

  return { ok: true };
}

export default function EditCreatorPage() {
  const location = useLocation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const stateCreator = location.state?.creator as Creator | undefined;
  const creator = stateCreator || loaderData.creator;

  useEffect(() => {
    if (actionData?.ok) {
      toast.success("Creator updated successfully!");
    } else if (actionData?.error) {
      toast.error("Failed to update creator");
    }
  }, [actionData]);

  return (
    <>
      <CreatorEditForm creator={creator} />;
    </>
  );
}
