import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IntroScreenProps } from "../../navigation/types/navigator";
import { Button, Layout } from "@ui-kitten/components";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const IntroScreen: React.SFC<IntroScreenProps> = ({ navigation }) => {
  return (
    <Layout style={styles.root}>
      <Button onPress={() => navigation.navigate("Home")}>
        Details Screen
      </Button>
    </Layout>
  );
};

export default IntroScreen;
