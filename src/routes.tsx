import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutesDict, RouteNames } from "./navigation/types/route";

import IntroScreen from "./screens/IntroScreen";
import SignScreen from "./screens/SignScreen";
import MainScreen from "./screens/MainScreen";
import { fbAuth } from "./services/firebase-conf";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  let initalRoute: RouteNames | undefined;

  if (fbAuth.currentUser) initalRoute = "Main";

  return (
    <Navigator headerMode="none" initialRouteName={initalRoute}>
      <Screen name={RoutesDict.Intro} component={IntroScreen} />
      <Screen name={RoutesDict.Sign} component={SignScreen} />
      <Screen name={RoutesDict.Main} component={MainScreen} />
    </Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
