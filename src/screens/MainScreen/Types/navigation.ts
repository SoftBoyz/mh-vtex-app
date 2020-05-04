export type MainRoutesNames = "Stores" | "Products" | "Orders" | "Profile";

export const MainRoutesDict: { [K in MainRoutesNames]: K } = {
  Stores: "Stores",
  Products: "Products",
  Orders: "Orders",
  Profile: "Profile",
};

export type IMainRoute = {
  [K in MainRoutesNames]: {
    previous: MainRoutesNames;
    navigate: (origin: K, destination: MainRoutesNames) => void;
    toggleLogoHeader?: (toggle: boolean) => void;
  };
};
