import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
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
} from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";
import { fetchStores } from "../Functions/stores";
import { IDatabaseTypes } from "../Types";
import { IMainRoute } from "../Types/navigation";

const { width } = Dimensions.get("screen");

const StoresList: React.SFC<IMainRoute["Stores"]> = ({
  navigate,
  toggleLogoHeader,
}) => {
  const [storesIds, setStoresIds] = useState<string[]>([])
  const [stores, setStores] = useState<IDatabaseTypes["Stores"][]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toggleLogoHeader) toggleLogoHeader(false);

    fetchStores().then((storesVal) => {
      if (storesVal) {
        setStores(Object.values(storesVal));
        setStoresIds(Object.keys(storesVal))
      }
      setLoading(false);
    });
  }, []);

  const getRandomRating = () => {
    return (Math.random() * 4 + 1).toFixed(1);
  };

  const renderItemIconRight = (props: any) => (
    <View style={styles.itemIconRight}>
      <Text>{getRandomRating()}</Text>
      <Icon {...props} fill={theme["color-warning-500"]} name="star" />
    </View>
  );

  const renderItemIcon = (props: any) => (
    <Avatar
      borderRadius={15}
      size="giant"
      style={styles.avatar}
      source={require("../../../../assets/images/rastaurant_logo_1.png")}
    />
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IDatabaseTypes["Stores"];
    index: number;
  }) => (
    <ListItem
      onPress={() => navigate("Stores", "Products", {...item, uid: storesIds[index]})}
      activeOpacity={0.5}
      style={styles.listItem}
      title={() => (
        <Text category="s1" style={{ marginLeft: 10 }}>
          {item.name}
        </Text>
      )}
      description={() => (
        <Text category="s2" style={{ marginLeft: 10, color: "#858585" }}>
          {"Categoria"}
        </Text>
      )}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemIconRight}
    />
  );

  const Filter = () => {
    const FitlerIcon = (props: any, icon: string) => (
      <Icon {...props} name={icon} fill="#000" />
    );

    const PinIcon = (props: any) => (
      <Icon {...props} name="pin-outline" fill="#FFF" />
    );

    return (
      <View style={styles.filterMenu}>
        <View style={styles.buttonWrapper}>
          <Select style={styles.locationButton} placeholder="Endereço"></Select>
        </View>

        <View style={styles.filter}>
          <Select placeholder="Filtrar por">
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
        data={stores}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBackdrop} />
      <Filter />

      {renderLoading()}
    </View>
  );
};

export default StoresList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "visible",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  containerBackdrop: {
    position: "absolute",
    left: 20,
    top: -10,
    width: width - 40,
    height: "100%",
    backgroundColor: theme["color-primary-500"],
    transform: [{ translateY: -10 }],
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  buttonWrapper: {
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    elevation: 2,
    width: "50%",
    borderTopLeftRadius: 15,
  },
  locationButton: {
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 30,
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
});
