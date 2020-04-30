import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutesDict } from "./navigation/types/route";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import IntroScreen from "./screens/IntroScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name={RoutesDict.Intro} component={IntroScreen} />
    <Screen name={RoutesDict.Home} component={HomeScreen} />
    <Screen name={RoutesDict.Details} component={DetailsScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
