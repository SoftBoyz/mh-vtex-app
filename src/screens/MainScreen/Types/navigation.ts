export type MainRoutesNames = "Stores" | "Products" | "Cart" | "Profile";

export const MainRoutesDict: { [K in MainRoutesNames]: K } = {
  Stores: "Stores",
  Products: "Products",
  Cart: "Cart",
  Profile: "Profile",
};

export type IMainRoute = {
  [K in MainRoutesNames]: {
    previous: MainRoutesNames;
    navigate: (origin: K, destination: MainRoutesNames) => void;
    toggleLogoHeader?: (toggle: boolean) => void;
  };
};
