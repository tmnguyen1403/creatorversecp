import { useSearchParams, useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect} from 'react';
import toast from "react-hot-toast";
import {getAll as getAllAirCraft } from "../api/aircraft";
import type { AirCraft }  from "../models/AirCraft";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  console.log("Loading aircraft data");
  const aircrafts: AirCraft[] = await getAllAirCraft();
  if (!aircrafts || aircrafts.length === 0) {
    console.log("Found no aircrafts");
  }

  return { aircrafts };
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const aircrafts: AirCraft[] = data?.aircrafts || [];

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("deleted") == "success") {
      toast.success("AirCraft removed successfully");
      setSearchParams({}, {replace: true});
    }
  }, [searchParams]);

  return <Welcome aircrafts={aircrafts}/>;
}
