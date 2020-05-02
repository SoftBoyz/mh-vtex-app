export type RouteNames = "Intro" | "Home" | "Details" | "Sign";

export type AppRoutes = { [K in RouteNames]: K };

export const RoutesDict: AppRoutes = {
  Intro: "Intro",
  Home: "Home",
  Details: "Details",
  Sign: "Sign",
  Login: "Login",
  Register: "Register",
};
