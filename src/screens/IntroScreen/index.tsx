import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { IScreenProps } from "../../navigation/types/navigator";
import { Button, Layout } from "@ui-kitten/components";
import IntroCarousel from "./Components/IntroCarousel";
import LogoHeader from "../Components/LogoHeader";
import { fbAuth } from "../../services/firebase-conf";

const IntroScreen: React.SFC<IScreenProps["Intro"]> = ({ navigation }) => {
  const [buttonText, setButtonText] = useState("Pular");

  return (
    <Layout style={styles.root}>
      <LogoHeader />
      <IntroCarousel
        onLastItem={(last) => setButtonText(last ? "Continuar" : "Pular")}
      />

      <Button
        onPress={() => navigation.navigate("Sign")}
        style={styles.bottomButton}
      >
        {buttonText}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#536dfe",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 50,
  },
});

export default IntroScreen;
