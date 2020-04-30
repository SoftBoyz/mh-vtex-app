import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { IntroScreenProps } from "../../navigation/types/navigator";
import { Button, Layout, BottomNavigationTab } from "@ui-kitten/components";
import IntroCarousel from "./Components/IntroCarousel";

const logoImage = require("../../../assets/images/logo_white.png");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 225,
    marginBottom: 25,
    backgroundColor: "#536dfe",
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 250,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "center",
  },
  bottomButton: {
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#536dfe",
    borderRadius: 50,
  },
});

const IntroScreen: React.SFC<IntroScreenProps> = ({ navigation }) => {
  return (
    <Layout style={styles.root}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={logoImage} />
      </View>
      <IntroCarousel />

      <Button
        onPress={() => navigation.navigate("Home")}
        style={styles.bottomButton}
      >
        Pular
      </Button>
    </Layout>
  );
};

export default IntroScreen;
