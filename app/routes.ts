import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("creators/new", "routes/create-creator.tsx"),
    route("creators/:id", "routes/creator-details.tsx")
] satisfies RouteConfig;