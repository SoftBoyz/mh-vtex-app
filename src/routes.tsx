import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutesDict, RouteNames } from "./navigation/types/route";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import IntroScreen from "./screens/IntroScreen";
import SignScreen from "./screens/SignScreen";
import StoresScreen from "./screens/StoresScreen";
import { fbAuth } from "./services/firebase-conf";
import { types } from "@babel/core";

const { Navigator, Screen } = createStackNavigator();

interface IHomeNavigator {
  initialRoute: RouteNames;
}

const HomeNavigator: React.SFC<IHomeNavigator> = ({ initialRoute }) => (
  <Navigator headerMode="none" initialRouteName={initialRoute}>
    <Screen name={RoutesDict.Intro} component={IntroScreen} />
    <Screen name={RoutesDict.Home} component={HomeScreen} />
    <Screen name={RoutesDict.Details} component={DetailsScreen} />
    <Screen name={RoutesDict.Sign} component={SignScreen} />
    <Screen name={RoutesDict.Stores} component={StoresScreen} />
  </Navigator>
);

export const AppNavigator = () => {
  const AuthControl = () => {
    const { currentUser } = fbAuth;
    let initialRoute: RouteNames = RoutesDict.Intro;

    if (currentUser) initialRoute = RoutesDict.Stores;

    return <HomeNavigator initialRoute={initialRoute} />;
  };

  return (
    <NavigationContainer>
      <AuthControl />
    </NavigationContainer>
  );
};
