import { AppRoutes, RouteNames } from "./route";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type NavigatorParams = {
  [K in RouteNames]: undefined;
};

export interface IntroScreenProps {
  navigation: StackNavigationProp<NavigatorParams, AppRoutes["Intro"]>;
  route: RouteProp<NavigatorParams, AppRoutes["Intro"]>;
}

export interface HomeScreenProps {
  navigation: StackNavigationProp<NavigatorParams, AppRoutes["Home"]>;
  route: RouteProp<NavigatorParams, AppRoutes["Home"]>;
}

export interface DetailsScreenProps {
  navigation: StackNavigationProp<NavigatorParams, AppRoutes["Details"]>;
  route: RouteProp<NavigatorParams, AppRoutes["Details"]>;
}
