import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("aircrafts/new", "routes/create-aircraft.tsx"),
    route("/aircrafts/:id", "routes/view-aircraft.tsx"),
    route("aircrafts/:id/edit", "routes/edit-aircraft.tsx")
] satisfies RouteConfig;