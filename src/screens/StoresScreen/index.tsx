import React, { useEffect } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import { IScreenProps } from "../../navigation/types/navigator";
import BottomNavigationShowcase from "./Components/BottomNavigationShowcase";
import StoresList from "./Components/StoresList";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("screen");

const logoImagePrimary = require("../../../assets/images/logo_white.png");

const StoresScreen: React.SFC<IScreenProps["Stores"]> = ({ navigation }) => {
  useEffect(() => {
    console.log("Ok");
  }, []);

  return (
    <View style={styles.root}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles.header}>
        {/* <Image style={styles.logo} source={logoImagePrimary} /> */}
      </View>

      <StoresList />

      <BottomNavigationShowcase />
    </View>
  );
};

export default StoresScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
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
