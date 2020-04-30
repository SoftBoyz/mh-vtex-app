export type RouteNames = "Intro" | "Home" | "Details";
export type AppRoutes = { [K in RouteNames]: K };
export const RoutesDict: AppRoutes = {
  Intro: "Intro",
  Home: "Home",
  Details: "Details",
};
