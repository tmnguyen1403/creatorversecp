import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect} from 'react';
import toast from "react-hot-toast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("deleted") == "success") {
      toast.success("Creator removed successfully");
      setSearchParams({}, {replace: true});
    }
  }, [searchParams, setSearchParams]);

  return <Welcome />;
}
