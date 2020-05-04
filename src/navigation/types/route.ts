export type RouteNames = "Intro" | "Sign" | "Main";

export type AppRoutes = { [K in RouteNames]: K };

export const RoutesDict: AppRoutes = {
  Intro: "Intro",
  Sign: "Sign",
  Main: "Main",
};
