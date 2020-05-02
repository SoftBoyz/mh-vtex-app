import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { ISignForm } from "../Types";
import { default as theme } from "../../../../assets/theme/theme.json";

const SignForm: React.SFC<ISignForm> = ({
  onSignInSelected,
  onSignUpSelected,
}) => {
  return (
    <Layout style={styles.container}>
      <Button
        onPress={onSignInSelected}
        accessibilityLabel="Fazer Login"
        status="basic"
        style={{ ...styles.button, ...styles.firstButton }}
      >
        Fazer Login
      </Button>
      <Button
        onPress={onSignUpSelected}
        accessibilityLabel="Criar Conta"
        appearance="outline"
        status="control"
        style={{ ...styles.button, ...styles.secondButton }}
      >
        Criar Conta
      </Button>
    </Layout>
  );
};

export default SignForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 25,
    backgroundColor: "transparent",
  },
  button: {
    width: "80%",
    margin: 2,
    fontFamily: "sans-serif-condensed",
  },
  firstButton: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 50,
    marginBottom: 10,
  },
  secondButton: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 30,
    backgroundColor: theme["color-primary-500"],
    color: "#FFF",
    borderWidth: 2,
  },
});
