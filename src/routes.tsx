import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutesDict } from "./navigation/types/route";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import IntroScreen from "./screens/IntroScreen";
import SignScreen from "./screens/SignScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name={RoutesDict.Intro} component={IntroScreen} />
    <Screen name={RoutesDict.Home} component={HomeScreen} />
    <Screen name={RoutesDict.Details} component={DetailsScreen} />
    <Screen name={RoutesDict.Sign} component={SignScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
