import { useLoaderData, useActionData, Link, Form } from "react-router";
import type { Route } from "./+types/create-aircraft";
import { useEffect } from "react";
import toast from "react-hot-toast";

import type { AirCraft } from "../models/AirCraft";
import { getById as getAirCraft, deleteAirCraft } from "../api/aircraft";
import { redirect, type ActionFunctionArgs } from "react-router";

// 1. The Loader handles the backend/server-side data fetching
export async function loader({ params }: Route.LoaderArgs) {
  const creatorIdString = params.id;
  if (!creatorIdString) {
    throw new Response("Not Found", { status: 404 });
  }

  const aircraft: AirCraft = await getAirCraft(creatorIdString);
  if (!aircraft) {
    throw new Response("AirCraft Not Found", { status: 404 });
  }

  return { aircraft };
}


export async function action({ params }: ActionFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Missing AirCraft Identifier ID", { status: 400 });
  }

  // Execute the delete operation directly inside your Supabase client schema configuration
  console.log("Removing aircraft: ", id);
  const { success, error } = await deleteAirCraft(Number(id));
  if (error) {
    console.log("Failed to remove");
    return { ok: false, error: "Failed to remove aircraft from database" };
  }
  console.log("Success to remove");
  // Redirect the user back to the homepage list on clean completion
  return redirect("/?deleted=success");
}


// 2. The Component handles the frontend UI layout styled with Pico CSS
export default function AirCraftDetail() {
  const data = useLoaderData<typeof loader>();
  const aircraft = data.aircraft;

  // Safe fallback if your Int8Array ID string mapping requires extraction
  const creatorId = aircraft.id ? String(aircraft.id) : "";

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.error) {
      toast.error("Failed to delete aircraft");
    }
  }, [actionData]);

  return (
    <main className="container">
      <article
        style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
      >
        {/* Profile Image Grouping */}
        {aircraft.imageURL && (
          <header
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "0",
            }}
          >
            <img
              src={aircraft.imageURL}
              alt={aircraft.name}
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          </header>
        )}

        {/* Content Section */}
        <h1>{aircraft.name}</h1>
        <p>{aircraft.description}</p>

        {aircraft.url && (
          <p>
            <a
              href={aircraft.url}
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              Visit Website
            </a>
          </p>
        )}

        {/* Footer Actions Panel */}
        <footer>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* 1. Edit Button (Sleek Slate Blue) */}
            <Link
              to={`/aircrafts/${creatorId}/edit`}
              state={{ aircraft }}
              role="button"
              style={{
                width: "100%",
                marginBottom: "0",
                // Override Pico's theme variables for this element
                "--pico-background-color": "#4f46e5",
                "--pico-border-color": "#4f46e5",
                "--pico-color": "#ffffff",
              }}
            >
              ✏️ Edit AirCraft
            </Link>

            {/* 2. Delete Form Container */}
            <Form
              method="post"
              style={{ marginBottom: "0" }}
              onSubmit={(e) => {
                if (!confirm("Are you sure you want to delete this aircraft?")) {
                  e.preventDefault();
                }
              }}
            >
              {/* Delete Button (Muted Crimson Outline) */}
              <button
                type="submit"
                className="outline"
                style={{
                  width: "100%",
                  marginBottom: "0",
                  // Override variables for a clean crimson outline theme
                  "--pico-color": "#dc2626",
                  "--pico-border-color": "#dc2626",
                  "--pico-background-color": "transparent",
                }}
                // Add subtle hover logic using a direct standard fallback if needed
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fef2f2")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                🗑️ Delete AirCraft
              </button>
            </Form>
          </div>
        </footer>
      </article>
    </main>
  );
}
