import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  View,
  BackHandler,
  Easing,
  Keyboard,
} from "react-native";
import { IScreenProps } from "../../navigation/types/navigator";
import LogoHeader from "../Components/LogoHeader";
import SignForm from "./Components/SignForm";
import { default as theme } from "../../../assets/theme/theme.json";
import LoginRegForm from "./Components/LoginRegForm";

const { width, height } = Dimensions.get("window");
const loginImage = require("../../../assets/images/login.png");

const SignFormMutable: React.SFC<
  Omit<IScreenProps["Sign"], "route"> & {
    onOpen: (short: boolean) => void;
    onKeyboard: (opened: boolean) => void;
  }
> = ({ navigation, onOpen, onKeyboard }) => {
  const formIndex = {
    Default: 0,
    Login: 1,
    Register: 2,
  };

  const [formSelected, setFormSelected] = useState(0);

  const imageMaxHeight = (height / width) * 150;
  const imageShortHeight = (height / width) * 100;
  const imageHeight = useRef(new Animated.Value(imageMaxHeight)).current;
  const imageYOffset = useRef(new Animated.Value(0)).current;

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    onKeyboard(true);
    hideImage(true);
  });

  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    onKeyboard(false);
    hideImage(false);
  });

  const hideImage = (hide: boolean) => {
    Animated.timing(imageHeight, {
      toValue: hide ? 0 : imageShortHeight,
      duration: 500,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  const openForm = (opened: boolean) => {
    onOpen(opened);
    Animated.parallel([
      Animated.timing(imageHeight, {
        toValue: opened ? imageShortHeight : imageMaxHeight,
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(imageYOffset, {
        toValue: opened ? -50 : 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  };

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (formSelected != formIndex.Default) {
      openForm(false);
      setFormSelected(formIndex.Default);
    } else navigation.goBack();

    return true;
  });

  const openSignIn = () => {
    setFormSelected(formIndex.Login);
    openForm(true);
  };

  const openSignUp = () => {
    setFormSelected(formIndex.Register);
    openForm(true);
  };

  const DefaultForm = () => (
    <SignForm onSignInSelected={openSignIn} onSignUpSelected={openSignUp} />
  );

  return (
    <View style={styles.defaultRoot}>
      <Animated.View
        style={{
          height: imageHeight,
          transform: [{ translateY: imageYOffset }],
        }}
      >
        <Image style={styles.slideImage} source={loginImage} />
      </Animated.View>

      {formSelected == formIndex.Default ? (
        <DefaultForm />
      ) : (
        <LoginRegForm
          navigation={navigation}
          type={formSelected == formIndex.Login ? "login" : "register"}
        />
      )}
    </View>
  );
};

const SignScreen: React.SFC<IScreenProps["Sign"]> = ({ navigation }) => {
  const headerHeight = useRef(new Animated.Value(height * 0.6)).current;

  const shortenHeader = (short: boolean) => {
    Animated.timing(headerHeight, {
      toValue: short ? height * 0.4 : height * 0.6,
      duration: 500,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  const keyboardOpened = (opened: boolean) => {
    Animated.timing(headerHeight, {
      toValue: opened ? height * 0.3 : height * 0.4,
      duration: 500,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  return (
    <View style={styles.root}>
      <Animated.View
        style={{
          ...styles.headerBackground,
          height: headerHeight,
        }}
      />
      <LogoHeader background="basic" />

      <SignFormMutable
        onOpen={shortenHeader}
        onKeyboard={keyboardOpened}
        navigation={navigation}
      />
    </View>
  );
};

export default SignScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme["color-primary-500"],
  },
  defaultRoot: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    width: "100%",
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 500,
    backgroundColor: "#fff",
  },
  slideImage: {
    top: 0,
    resizeMode: "center",
    flex: 1,
  },
});
