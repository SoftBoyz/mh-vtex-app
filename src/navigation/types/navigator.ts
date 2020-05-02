import { AppRoutes, RouteNames } from "./route";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type NavigatorParams = {
  [K in RouteNames]: undefined;
};

export type IScreenProps = {
  [K in RouteNames]: {
    navigation: StackNavigationProp<NavigatorParams, AppRoutes[K]>;
    route: RouteProp<NavigatorParams, AppRoutes[K]>;
  };
};
