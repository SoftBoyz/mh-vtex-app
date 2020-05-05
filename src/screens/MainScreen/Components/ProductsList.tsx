import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  BackHandler,
  Image,
  Animated,
  Easing,
  Alert,
} from "react-native";
import {
  List,
  ListItem,
  Icon,
  Avatar,
  Text,
  Divider,
  Select,
  SelectItem,
  SelectGroup,
  Spinner,
  Layout,
  Button,
} from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";
import { fetchProducts } from "../Functions/products";
import { IDatabaseTypes } from "../Types";
import { IMainRoute } from "../Types/navigation";
import ShoppingCart from "../Classes/ShoppingCart";

const { width, height } = Dimensions.get("screen");

const ProductsList: React.SFC<IMainRoute["Products"]> = ({
  navigate,
  previous,
  toggleLogoHeader,
  params
}) => {
  const [products, setProducts] = useState<IDatabaseTypes["Products"][]>();
  const [loading, setLoading] = useState(true);
  const [productSelected, setProductSelected] = useState<IDatabaseTypes['Products']>()
  const [selectorOpened, setSelectorOpened] = useState(false)

  const defaultSelectorHeight = 0.4 * height;
  const selectorHeight = new Animated.Value(0);
  const selectorWrapperHeight = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(selectorHeight, {
        toValue: selectorOpened ? defaultSelectorHeight : 0,
        duration: 500,
        easing: Easing.in(Easing.exp),
      }),
      Animated.timing(selectorWrapperHeight, {
        toValue: selectorOpened ? height : 0,
        duration: 500,
        easing: Easing.in(Easing.exp),
      }),
    ]).start();
  }, [selectorOpened])

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigate("Products", previous);
    return true;
  });

  useEffect(() => {
    if (toggleLogoHeader) toggleLogoHeader(true);

    fetchProducts().then((productsVal) => {
      if (productsVal) setProducts(Object.values(productsVal));
      setLoading(false);
    });
  }, []);

  const renderItemIconRight = (price: string) => (
    <View style={styles.itemIconRight}>
      <Text>{`R$ ${price}`}</Text>
    </View>
  );

  const renderItemIcon = (props: any) => (
    <Avatar
      borderRadius={15}
      size="giant"
      style={styles.avatar}
      source={require("../../../../assets/images/product_image.png")}
    />
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IDatabaseTypes["Products"];
    index: number;
  }) => (
    <ListItem
      onPress={() => {
        const cart = ShoppingCart.getInstance()
        if (cart.getOriginStore() != "" && cart.getOriginStore() != params?.uid) {
          Alert.alert('Limpar Compras?', 'Você já tem uma compra de outro local no carrinho, deseja cancela-la?', 
          [
            {
              text: 'Cancelar',
              onPress: () => {
                return;
              },
              style: 'cancel',
            },
            {text: 'Limpar Carrinho', onPress: () => {
              cart.clearProducts()
              cart.setOriginStore(params!.uid)
              setProductSelected(item)
              setSelectorOpened(true)
            }},
          ],)
        } else {
          setProductSelected(item)
          setSelectorOpened(true)
        }

      }}
      activeOpacity={0.5}
      style={styles.listItem}
      title={() => (
        <Text category="s1" style={{ marginLeft: 10 }}>
          {item.name}
        </Text>
      )}
      description={() => (
        <Text category="s2" style={{ marginLeft: 10, color: "#858585" }}>
          {item.description}
        </Text>
      )}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemIconRight(item.price)}
    />
  );

  const Filter = () => {
    const FitlerIcon = (props: any, icon: string) => (
      <Icon {...props} name={icon} fill="#000" />
    );

    const PinIcon = (props: any) => (
      <Icon {...props} name="pin-outline" fill="#FFF" />
    );

    const StoreImage = require("../../../../assets/images/rastaurant_logo_1.png");

    return (
      <View style={styles.filterMenu}>
        <View style={styles.storeImageWrapper}>
          <Image
            style={styles.storeImage}
            source={StoreImage}
            resizeMode="cover"
            blurRadius={0.5}
          />
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>{params? params.name : 'Restaurante'}</Text>
            <Text style={styles.storeDistance}>1.5Km</Text>
          </View>
        </View>

        <View style={styles.filter}>
          <Select placeholder="Categorias">
            <SelectGroup title="Avaliação">
              <SelectItem
                title="Mais Avaliado"
                accessoryLeft={(p) => FitlerIcon(p, "star")}
              />
              <SelectItem
                title="Menos Avaliado"
                accessoryLeft={(p) => FitlerIcon(p, "star-outline")}
              />
            </SelectGroup>
            <SelectGroup title="Distância">
              <SelectItem
                title="Menor Distância"
                accessoryLeft={(p) => FitlerIcon(p, "pin-outline")}
              />
              <SelectItem
                title="Maior Distância"
                accessoryLeft={(p) => FitlerIcon(p, "pin")}
              />
            </SelectGroup>
          </Select>
        </View>
      </View>
    );
  };

  const ProductSelector = () => {
    return (
      <Animated.View
        style={{
          ...styles.productSelectorWrapper,
          height: selectorWrapperHeight,
        }}
      >
        <Button
          onPress={() => {
            setSelectorOpened(false)
          }}
          style={styles.productSelectorCloseArea}
        />

        <Animated.View
          style={{ ...styles.productSelector, height: selectorHeight }}
        >
          <View style={styles.productSelectorBackground} />
          <View style={styles.productSelectorData}>
            <Avatar
              borderRadius={15}
              size="giant"
              style={styles.selectorAvatar}
              source={require("../../../../assets/images/product_image.png")}
            />

            <Text
              category="s1"
              style={{
                marginTop: 10,
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              {productSelected ? productSelected.name : "Produto"}
            </Text>

            <Text
              category="s1"
              style={{
                fontSize: 16,
                color: "#e4e4e4",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {`R$ ${productSelected ? productSelected.price : "00"}`}
            </Text>

            <View style={styles.selectorActions}>
              <Button
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  borderBottomLeftRadius: 25,
                }}
                status="control"
                activeOpacity={0.5}
                accessoryLeft={(p) => (
                  <Icon {...p} fill="rgba(0, 0, 0, .8)" name="minus" />
                )}
              />

              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 15,
                  backgroundColor: theme["color-primary-900"],
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
                >
                  1
                </Text>
              </View>

              <Button
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  borderBottomRightRadius: 25,
                }}
                status="control"
                activeOpacity={0.5}
                accessoryLeft={(p) => (
                  <Icon {...p} fill="rgba(0, 0, 0, .8)" name="plus" />
                )}
              />
            </View>
            <Button onPress={
              () => {
                const cart = ShoppingCart.getInstance()

                if (cart && productSelected) {
                  
                  cart.addProduct(productSelected)
                  if (params) cart.setOriginStore(params.uid)
                }

                setSelectorOpened(false)
              }
            } appearance="outline" status="control" style={styles.selectorConfirmButton}>ADICIONAR</Button>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderLoading = () => {
    if (loading) {
      return (
        <Layout style={styles.spinnerWrapper}>
          <Spinner size="giant" />
        </Layout>
      );
    }

    return (
      <List
        style={styles.list}
        data={products}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Filter />

        {renderLoading()}
      </View>
      <ProductSelector />
    </>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
  },
  spinnerWrapper: {
    padding: 30,
    display: "flex",
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    elevation: 2,
  },
  listBackdropEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    aspectRatio: 1,
    backgroundColor: "red",
    height: width * 0.1,
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
  storeImageWrapper: {
    backgroundColor: "rgb(247, 249, 252)",
    elevation: 2,
    width: "50%",
    overflow: "hidden",
    borderTopLeftRadius: 15,
    height: 71,
    display: "flex",
    justifyContent: "flex-end",
  },
  storeImage: {
    width: width * 0.5,
    transform: [{ translateY: 150 }],
  },
  storeInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  storeTitle: {
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
  },
  storeDistance: {
    color: "white",
    fontWeight: "100",
    fontSize: 13,
  },
  filterMenu: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  filterLabel: {
    textAlign: "right",
    marginBottom: 5,
  },
  filter: {
    width: "50%",
    padding: 15,
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderLeftColor: "#e6e6e6",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    elevation: 2,
  },
  productSelectorWrapper: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 0,
    width: width,
    backgroundColor: "rgba(255, 255, 255, .5)",
    display: "flex",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  productSelectorCloseArea: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 0.6 * height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
  productSelector: {
    width: width,
    backgroundColor: "white",
    elevation: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    overflow: "hidden",
  },
  productSelectorBackground: {
    width: width,
    height: 0.4 * height * 0.7,
    backgroundColor: theme["color-primary-500"],
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  productSelectorData: {
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectorAvatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 15,
    borderColor: "#FFF",
    borderWidth: 3,
    elevation: 30,
  },
  selectorActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.4,
  },
  selectorConfirmButton: {
    marginTop: 15,
    borderRadius: 20,
    borderWidth: 3,
    color: '#FFF',
  }
});
