import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";
import { fbAuth } from "../../../services/firebase-conf";
import { MainRoutesNames } from "../Types/navigation";

const BagIcon = (props: any, index: number) => (
  <Icon
    {...props}
    fill={index == 0 ? theme["color-primary-500"] : "#b9bfc7"}
    name={index == 0 ? "shopping-bag" : "shopping-bag-outline"}
  />
);

const CartIcon = (props: any, index: number) => (
  <View>
    <Icon
      {...props}
      fill={index == 1 ? theme["color-primary-500"] : "#b9bfc7"}
      name={index == 1 ? "shopping-cart" : "shopping-cart-outline"}
    />
    <View style={styles.tabIconBadge} />
  </View>
);

const LogOutIcon = (props: any, index: number) => (
  <Icon
    {...props}
    fill={index == 2 ? theme["color-primary-500"] : "#b9bfc7"}
    name="log-out"
  />
);

const BottomNavigationShowcase: React.SFC<{
  onTabChange: React.Dispatch<React.SetStateAction<MainRoutesNames>>
}> = ({ onTabChange }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (selectedIndex == 2) {
      fbAuth.signOut()
    } else if (selectedIndex == 0) {
      onTabChange('Stores')
    } else if (selectedIndex == 1) {
      onTabChange('Orders')
    }
    
  }, [selectedIndex])

  return (
    <React.Fragment>
      <BottomNavigation selectedIndex={selectedIndex} onSelect={setSelectedIndex} style={styles.bottomNavigation}>
        <BottomNavigationTab
          title="LOJAS"
          icon={(p) => BagIcon(p, selectedIndex)}
        />
        <BottomNavigationTab
          title="PEDIDOS"
          icon={(p) => CartIcon(p, selectedIndex)}
        />
        <BottomNavigationTab
          title="SAIR"
          icon={(p) => LogOutIcon(p, selectedIndex)}
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
