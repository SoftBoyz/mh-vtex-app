import React from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import { ILogoHeader } from "../IntroScreen/Types";

const { width, height } = Dimensions.get("window");
const headerHeight = height * 0.4;
const logoImageWhite = require("../../../assets/images/logo_white.png");
const logoImagePrimary = require("../../../assets/images/logo.png");

const LogoHeader: React.SFC<ILogoHeader> = ({ background = "primary" }) => {
  return (
    <>
      <View
        style={{
          ...styles.logoHeaderBackground,
          backgroundColor: background == "primary" ? "#536dfe" : "transparent",
        }}
      />
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={background == "primary" ? logoImageWhite : logoImagePrimary}
        />
      </View>
    </>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  logoHeaderBackground: {
    position: "absolute",
    top: 0,
    height: headerHeight,
    width: "100%",
    backgroundColor: "#536dfe",
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 300,
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 225,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "center",
  },
});
