import { redirect } from "react-router";
import type { Route } from "./+types/create-edit";

import AirCraftForm from "../components/aircrafts/AirCraftForm";
import type { AirCraft } from "../models/AirCraft";
import { useActionData } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useLocation, useLoaderData } from "react-router";
import { getById as getAirCraft, update as updateAirCraft } from "~/api/aircraft";
import AirCraftEditForm from "~/components/aircrafts/AirCraftEditForm";

export async function loader({ params }: Route.LoaderArgs) {
  const aircraft = await getAirCraft(params.id!);
  return { aircraft };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const data: AirCraft = {
    id: Number(formData.get("id") || -1),
    name: String(formData.get("name") || ""),
    url: String(formData.get("url") || ""),
    description: String(formData.get("description") || ""),
    imageURL: String(formData.get("imageURL") || ""),
  };

  console.log("Update AirCraft:", data);
  const result = await updateAirCraft(data);
  if (!result.success) {
    return { ok: false, error: result.error };
  }

  return { ok: true };
}

export default function EditAirCraftPage() {
  const location = useLocation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const stateAirCraft = location.state?.aircraft as AirCraft | undefined;
  const aircraft = stateAirCraft || loaderData.aircraft;

  useEffect(() => {
    if (actionData?.ok) {
      toast.success("AirCraft updated successfully!");
    } else if (actionData?.error) {
      toast.error("Failed to update aircraft");
    }
  }, [actionData]);

  return (
    <>
      <AirCraftEditForm aircraft={aircraft} />;
    </>
  );
}
