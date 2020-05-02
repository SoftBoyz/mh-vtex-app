import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, InputProps } from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";
import { ILoginRefForm } from "../Types";

const FormInput: React.SFC<
  Omit<InputProps, "style" | "size" | "status"> & { error: boolean }
> = (props) => {
  return (
    <View
      style={{
        borderColor: props.error ? theme["color-danger-500"] : "#fff",
        ...styles.inputControl,
      }}
    >
      <Input {...props} style={styles.input} size="large" status="control" />
    </View>
  );
};

const LoginRegForm: React.SFC<ILoginRefForm> = ({ type }) => {
  return (
    <View style={styles.root}>
      <FormInput
        placeholder={type == "login" ? "Login" : "E-mail"}
        error={false}
      />
      <FormInput placeholder="Senha" error={false} />
      {(() => {
        if (type == "register")
          return <FormInput placeholder="Confirmação de Senha" error={false} />;
      })()}

      {type == "login" ? (
        <>
          <Button
            accessibilityLabel="Entrar"
            appearance="outline"
            status="control"
            size="large"
            style={{ ...styles.button, ...styles.firstButton }}
          >
            Entrar
          </Button>

          <Button
            accessibilityLabel="Esqueci minha senha"
            appearance="outline"
            status="primary"
            size="large"
            style={{ ...styles.button, ...styles.secondButton }}
          >
            Esqueci minha senha
          </Button>
        </>
      ) : (
        <Button
          accessibilityLabel="Entrar"
          appearance="outline"
          status="control"
          size="large"
          style={{ ...styles.button, ...styles.firstButton }}
        >
          Criar Conta
        </Button>
      )}
    </View>
  );
};

export default LoginRegForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputControl: {
    width: "80%",
    marginVertical: 10,
    borderWidth: 3,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 40,
  },
  input: {
    width: "100%",
    marginBottom: -5,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  button: {
    width: "80%",
    margin: 2,
    fontFamily: "sans-serif-condensed",
  },
  firstButton: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 50,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: theme["color-primary-800"],
    color: "red",
    borderWidth: 0,
  },
  secondButton: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 40,
    backgroundColor: "#FFF",
    borderWidth: 0,
  },
});
