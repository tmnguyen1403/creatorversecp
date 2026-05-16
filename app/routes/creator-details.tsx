import { useLoaderData, Link, Form } from "react-router";
import type { Creator } from "../models/Creator";
import type { Route } from "./+types/create-creator";
import { getCreator } from "~/api/get-creator";

// 1. The Loader handles the backend/server-side data fetching
export async function loader({ params }: Route.LoaderArgs) {
  const creatorIdString = params.id;
  if (!creatorIdString) {
    throw new Response("Not Found", { status: 404 });
  }

  const creator: Creator = await getCreator(creatorIdString);
  if (!creator) {
    throw new Response("Creator Not Found", { status: 404 });
  }

  return { creator };
}

// 2. The Component handles the frontend UI layout styled with Pico CSS
export default function CreatorDetail() {
  const data = useLoaderData<typeof loader>();
  const creator = data.creator;

  // Safe fallback if your Int8Array ID string mapping requires extraction
  const creatorId = creator.id ? String(creator.id) : "";

  return (
    <main className="container">
      <article
        style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
      >
        {/* Profile Image Grouping */}
        {creator.imageURL && (
          <header
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "0",
            }}
          >
            <img
              src={creator.imageURL}
              alt={creator.name}
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
        <h1>{creator.name}</h1>
        <p>{creator.description}</p>

        {creator.url && (
          <p>
            <a
              href={creator.url}
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
              to={`/creators/${creatorId}/edit`}
              state={{ creator }}
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
              ✏️ Edit Creator
            </Link>

            {/* 2. Delete Form Container */}
            <Form
              method="post"
              action={`/creators/${creatorId}/delete`}
              style={{ marginBottom: "0" }}
              onSubmit={(e) => {
                if (!confirm("Are you sure you want to delete this creator?")) {
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
                🗑️ Delete Creator
              </button>
            </Form>
          </div>
        </footer>
      </article>
    </main>
  );
}
