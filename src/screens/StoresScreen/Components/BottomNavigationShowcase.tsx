import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";

const CartIcon = (props: any, index: number) => (
  <Icon
    {...props}
    fill={index == 0 ? theme["color-primary-500"] : "#b9bfc7"}
    name={index == 0 ? "shopping-bag" : "shopping-bag-outline"}
  />
);

const BellIcon = (props: any, index: number) => (
  <View>
    <Icon
      {...props}
      fill={index == 1 ? theme["color-primary-500"] : "#b9bfc7"}
      name={index == 1 ? "shopping-cart" : "shopping-cart-outline"}
    />
    <View style={styles.tabIconBadge} />
  </View>
);

const EmailIcon = (props: any, index: number) => (
  <Icon
    {...props}
    fill={index == 2 ? theme["color-primary-500"] : "#b9bfc7"}
    name={index == 2 ? "person" : "person-outline"}
  />
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const BottomNavigationShowcase = () => {
  const topState = useBottomNavigationState();

  return (
    <React.Fragment>
      <BottomNavigation style={styles.bottomNavigation} {...topState}>
        <BottomNavigationTab
          title="LOJAS"
          icon={(p) => CartIcon(p, topState.selectedIndex)}
        />
        <BottomNavigationTab
          title="PEDIDOS"
          icon={(p) => BellIcon(p, topState.selectedIndex)}
        />
        <BottomNavigationTab
          title="PERFIL"
          icon={(p) => EmailIcon(p, topState.selectedIndex)}
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default BottomNavigationShowcase;

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: 10,
  },
  tabIconBadge: {
    aspectRatio: 1,
    width: 12,
    backgroundColor: theme["color-warning-500"],
    position: "absolute",
    top: 0,
    right: -5,
    borderRadius: 12,
  },
});
