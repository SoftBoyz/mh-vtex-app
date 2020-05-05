export type MainRoutesNames = "Stores" | "Products" | "Orders" | "Profile" | "Map";

export const MainRoutesDict: { [K in MainRoutesNames]: K } = {
  Stores: "Stores",
  Products: "Products",
  Orders: "Orders",
  Profile: "Profile",
  Map: "Map",
};

export type IMainRoute = {
  [K in MainRoutesNames]: {
    previous: MainRoutesNames;
    navigate: (origin: K, destination: MainRoutesNames) => void;
    toggleLogoHeader?: (toggle: boolean | 'off') => void;
  };
};
