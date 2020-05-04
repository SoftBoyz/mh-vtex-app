import React from 'react';
import { Text } from "@ui-kitten/components";
import { View, BackHandler } from 'react-native';
import { IMainRoute } from '../Types/navigation';

const OrdersComponent: React.SFC<IMainRoute["Orders"]> = ({ navigate, previous }) => {
  BackHandler.addEventListener("hardwareBackPress", () => {
    navigate("Orders", previous);
    return true;
  });

  return (
    <View><Text>Hello World</Text></View>
  )
};

export default OrdersComponent;

