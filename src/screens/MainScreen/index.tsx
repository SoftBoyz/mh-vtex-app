import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  BackHandler,
  Animated,
  Easing,
} from "react-native";
import { IScreenProps } from "../../navigation/types/navigator";
import BottomNavigationShowcase from "./Components/BottomNavigationShowcase";
import StoresList from "./Components/StoresList";
import MapView from "react-native-maps";
import { fbAuth } from "../../services/firebase-conf";
import { MainRoutesNames } from "./Types/navigation";
import ProductsList from "./Components/ProductsList";

import { default as theme } from "../../../assets/theme/theme.json";

const { width, height } = Dimensions.get("screen");

const ListRoutes: React.SFC<{
  onComponentChange: (component: MainRoutesNames) => void;
  toggleLogoHeader: (toggle: boolean) => void;
}> = ({ onComponentChange, toggleLogoHeader }) => {
  const [currentMain, setCurrentMain] = useState<MainRoutesNames>("Stores");
  const [previous, setPrevious] = useState<MainRoutesNames>("Stores");

  useEffect(() => {
    onComponentChange(currentMain);
  }, [currentMain]);

  const MainComponents = () => {
    switch (currentMain) {
      case "Stores":
        return (
          <StoresList
            navigate={navigate}
            previous={previous}
            toggleLogoHeader={toggleLogoHeader}
          />
        );
      case "Products":
        return (
          <ProductsList
            navigate={navigate}
            previous={previous}
            toggleLogoHeader={toggleLogoHeader}
          />
        );
      default:
        return (
          <StoresList
            navigate={navigate}
            previous={previous}
            toggleLogoHeader={toggleLogoHeader}
          />
        );
    }
  };

  const navigate = (origin: MainRoutesNames, destination: MainRoutesNames) => {
    setPrevious(origin);
    setCurrentMain(destination);
  };

  return <MainComponents />;
};

const useAuthentication = ({
  navigate,
}: IScreenProps["Main"]["navigation"]) => {
  useEffect(() => {
    if (!fbAuth.currentUser) return navigate("Sign");
  });
};

const MainScreen: React.SFC<IScreenProps["Main"]> = ({ navigation }) => {
  useAuthentication(navigation);

  const [currentComponent, setCurrentComponent] = useState<MainRoutesNames>();
  const [logoHeader, setLogoHeader] = useState<boolean>(false);

  BackHandler.addEventListener("hardwareBackPress", () => {
    console.log("Close");
    BackHandler.exitApp();
    return true;
  });

  const MainHeader = () => {
    const OpacityLogo = require("../../../assets/images/logo_black_opacity.png");

    const defaultViewWidth = width - 40;
    const defaultViewTop = height * 0.1 + 30;

    const viewWidth = new Animated.Value(width - 40);
    const viewTop = new Animated.Value(height * 0.1 + 30);

    const grownHeader = (grown: boolean) => {
      Animated.parallel([
        Animated.timing(viewWidth, {
          toValue: grown ? width : defaultViewWidth,
          duration: 600,
          easing: Easing.in(Easing.exp),
        }),
        Animated.timing(viewTop, {
          toValue: grown ? 0 : defaultViewTop,
          duration: 600,
          easing: Easing.in(Easing.exp),
        }),
      ]).start();
    };

    useEffect(() => {
      grownHeader(logoHeader);
    }, [logoHeader]);

    return (
      <>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -9.669969,
            longitude: -35.71947,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Animated.View
          style={{
            ...styles.logoHolder,
            width: viewWidth,
            borderRadius: 15,
            marginTop: viewTop,
          }}
        >
          <Image style={styles.logoHeader} source={OpacityLogo} />
        </Animated.View>
      </>
    );
  };

  return (
    <View style={styles.root}>
      <MainHeader />

      <View style={styles.header}>
        {/* <Image style={styles.logo} source={logoImagePrimary} /> */}
      </View>

      <ListRoutes
        onComponentChange={setCurrentComponent}
        toggleLogoHeader={setLogoHeader}
      />

      <BottomNavigationShowcase />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoHolder: {
    flex: 1,
    height: height * 0.2,
    position: "absolute",
    zIndex: 0,
    backgroundColor: theme["color-primary-500"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoHeader: {
    width: 65,
    height: 65,
    aspectRatio: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: height * 0.1,
    marginTop: 50,
  },
  map: {
    flex: 1,
    width: "100%",
    height: height * 0.3,
    position: "absolute",
    zIndex: 0,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "center",
  },
});
