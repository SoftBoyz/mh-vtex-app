import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { Text, List, Divider, ListItem, Avatar, Button, Icon } from "@ui-kitten/components";
import { View, BackHandler } from 'react-native';
import { IMainRoute } from '../Types/navigation';
import { IDatabaseTypes } from '../Types';
import ShoppingCart from '../Classes/ShoppingCart';

const OrdersComponent: React.SFC<IMainRoute["Orders"]> = ({ navigate, previous,toggleLogoHeader }) => {
  const [products, setProducts] = useState<IDatabaseTypes['Products'][]>([])
  const [total, setTotal] = useState(0)

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigate("Orders", previous);
    return true;
  });

  const reloadCart = () => {
    const cart = ShoppingCart.getInstance()
    if (cart) {
      setProducts(cart.getProducts())
      setTotal(cart.getProducts().reduce<number>((total, value) => {
        return total += parseInt(value.price)
      }, 0))
    }
  }
  
  useEffect(() => {
    if (toggleLogoHeader) toggleLogoHeader(true)
    reloadCart()
  }, [])

  const renderItem = ({item, index}: {
    item: IDatabaseTypes['Products'],
    index: number
  }) => {
    const renderItemIcon = (props: any) => (
      <Avatar
        borderRadius={15}
        size="giant"
        style={styles.avatar}
        source={require("../../../../assets/images/product_image.png")}
      />
    );

    const renderItemIconRight = (price: string) => (
      <View style={styles.itemIconRight}>
        <Text>{`R$ ${price}`}</Text>
      </View>
    );

    return (
      <ListItem
      activeOpacity={1}
      style={styles.listItem}
      title={() => (
        <Text category="s1" style={{ marginLeft: 10 }}>
          {item.name}
        </Text>
      )}
      description={() => (
        <Button onPress={
          () => {
            ShoppingCart.getInstance().removeProduct(index)
            reloadCart()
          }
        } style={{
          width: 100,
          marginLeft: 10
        }} size="tiny">Remover</Button>
      )}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemIconRight(item.price)}
    />
    )
  }

  const renderConfirmIcon = (props: any) => (
    <Icon
    {...props}
      name="shopping-cart"
      fill="black"
    />
  );

  return (
    <View style={styles.container}>
      <List
        style={styles.list}
        data={products}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />

    <View style={styles.confirmView}>
<ListItem
      activeOpacity={1}
      style={{...styles.listItem}}
      title={() => (
        <Text category="s1" style={{ marginLeft: 10 }}>
          {"TOTAL"}
        </Text>
      )}
      description={() => (
        <Text category="s2" style={{ marginLeft: 10, color: "#858585" }}>
          {`R$ ${total}`}
        </Text>
      )}
      accessoryLeft={renderConfirmIcon}
      accessoryRight={() => (
        <Button 
          onPress={() => {
            navigate('Orders', 'Map')
          }}
        disabled={total == 0}
        style={{
          borderRadius: 30
        }}>Comprar</Button>
      )}
    />
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    elevation: 2,
  },
  listItem: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "rgb(247, 249, 252)",
  },
  itemIconRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    marginRight: 5,
  },
  avatar: {
    margin: 8,
    borderRadius: 15,
  },
  confirmView: {
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    elevation: 10,
  },
});

export default OrdersComponent;

