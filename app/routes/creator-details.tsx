import { useLoaderData } from "react-router";
import type { Creator } from "../models/Creator";
import type { Route } from "./+types/create-creator";
import { getCreator } from "~/api/get-creator";

// 1. The Loader handles the backend/server-side data fetching
export async function loader({ params }: Route.LoaderArgs) {
    
    const creatorIdString = params.id; // This comes from the URL :id
    console.log ("creatorIdString", creatorIdString);

  if (!creatorIdString) {
    throw new Response("Not Found", { status: 404 });
  }
  const creator: Creator = await getCreator(creatorIdString);

  if (!creator) {
    throw new Response("Creator Not Found", { status: 404 });
  }

  return { creator };
}

// 2. The Component handles the frontend UI layout
export default function CreatorDetail() {
  const data = useLoaderData<typeof loader>();
  const creator = data.creator;
  console.log ("creator data: ", creator);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={creator.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        )}
        <h1 className="text-3xl font-bold mt-4 text-gray-900">
          {creator.name}
        </h1>
        <p className="text-gray-600 mt-2 text-center">{creator.description}</p>

        {creator.url && (
          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}
