import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import {
  Input,
  Button,
  InputProps,
  Icon,
  Text,
  Spinner,
} from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";
import { ILoginRefForm, SignErrors } from "../Types";
import { registerNewUser, loginUser } from "../Functions/register.validation";
import { IScreenProps } from "../../../navigation/types/navigator";
import { TouchableHighlight } from "react-native-gesture-handler";

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const FormInput: React.SFC<
  Omit<InputProps, "style" | "size" | "status"> & {
    error: boolean;
    errorLabel: string;
  }
> = (props) => {
  const renderErrorMessage = () => {
    if (props.error)
      return (
        <Text style={styles.inputError} status="warning">
          {props.errorLabel}
        </Text>
      );
  };

  return (
    <>
      <View
        style={{
          borderColor: props.error ? theme["color-warning-500"] : "#FFF",
          ...styles.inputControl,
        }}
      >
        <Input {...props} style={styles.input} size="large" status="control" />
      </View>

      {renderErrorMessage()}
    </>
  );
};

const LoginRegForm: React.SFC<
  ILoginRefForm & Omit<IScreenProps["Sign"], "route">
> = ({ type, navigation }) => {
  const [submitMessage, setSubmitMessage] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [formLoading, setFormLoading] = useState(false);

  const [signErrors, setSignErrors] = useState<SignErrors>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const toggleSecureEntry = () => setSecurePasswordEntry(!securePasswordEntry);

  const renderPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        fill="#FFF"
        name={securePasswordEntry ? "eye-off" : "eye"}
      />
    </TouchableWithoutFeedback>
  );

  const handleSignIn = () => {
    setFormLoading(true);
    loginUser(email, password)
      .then(() => {
        navigation.navigate("Stores");
      })
      .catch((err: any) => {
        setSubmitMessage(err.code);
      })
      .finally(() => setFormLoading(false));
  };

  const handleSignUp = () => {
    setFormLoading(true);
    registerNewUser(email, password, passwordConfirmation)
      .then((res) => {
        if (res == "signup/success") {
          setSubmitMessage("");
          navigation.navigate("Stores");
        } else setSubmitMessage(res);
      })
      .catch((e: SignErrors) => {
        setSignErrors(e);
      })
      .finally(() => setFormLoading(false));
  };

  return (
    <View style={styles.root}>
      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        error={signErrors.email != ""}
        errorLabel={signErrors.email}
        keyboardType="email-address"
        autoCompleteType="email"
      />
      <FormInput
        value={password}
        onChangeText={setPassword}
        accessoryRight={renderPasswordIcon}
        placeholder="Senha"
        secureTextEntry={securePasswordEntry}
        error={signErrors.password != ""}
        errorLabel={signErrors.password}
      />
      {(() => {
        if (type == "register")
          return (
            <FormInput
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              placeholder="Confirmação de Senha"
              secureTextEntry={true}
              error={signErrors.passwordConfirmation != ""}
              errorLabel={signErrors.passwordConfirmation}
            />
          );
      })()}

      <Text style={styles.inputError} status="warning">
        {submitMessage}
      </Text>

      {type == "login" ? (
        <>
          <Button
            onPress={handleSignIn}
            accessibilityLabel="Entrar"
            appearance="outline"
            status="control"
            size="large"
            style={{ ...styles.button, ...styles.firstButton }}
            accessoryRight={formLoading ? LoadingIndicator : undefined}
            disabled={formLoading}
          >
            {formLoading ? "" : "Entrar"}
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
          onPress={handleSignUp}
          accessibilityLabel="Criar Conta"
          appearance="outline"
          status="control"
          size="large"
          style={{ ...styles.button, ...styles.firstButton }}
          accessoryRight={formLoading ? LoadingIndicator : undefined}
          disabled={formLoading}
        >
          {formLoading ? "" : "Criar Conta"}
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
  inputError: {
    fontFamily: "sans-serif-condensed",
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
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
