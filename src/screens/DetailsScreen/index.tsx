import { Button, Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { DetailsScreenProps } from "../../navigation/types/navigator";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const DetailsScreen: React.SFC<DetailsScreenProps> = ({ navigation }) => {
  return (
    <Layout style={styles.root}>
      <Button onPress={() => navigation.navigate("Home")}>Home Screen</Button>
    </Layout>
  );
};

export default DetailsScreen;
