import { Button, Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { IScreenProps } from "../../navigation/types/navigator";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const HomeScreen: React.SFC<IScreenProps["Home"]> = ({ navigation }) => {
  return (
    <Layout style={styles.root}>
      <Button onPress={() => navigation.navigate("Details")}>
        Details Screen
      </Button>
    </Layout>
  );
};

export default HomeScreen;
