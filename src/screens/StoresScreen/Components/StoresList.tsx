import React from "react";
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
  Button,
} from "@ui-kitten/components";
import { default as theme } from "../../../../assets/theme/theme.json";

const { width } = Dimensions.get("screen");

const data = new Array(50).fill({
  title: "Loja",
  description: "Descrição da loja",
});

const StoresList = () => {
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
      size="giant"
      style={styles.avatar}
      source={require("../../../../assets/images/rastaurant_logo_1.png")}
    />
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: { title: string; description: string };
    index: number;
  }) => (
    <ListItem
      style={styles.listItem}
      title={() => (
        <Text category="s1" style={{ marginLeft: 10 }}>{`${item.title} ${
          index + 1
        }`}</Text>
      )}
      description={() => (
        <Text category="s2" style={{ marginLeft: 10, color: "#858585" }}>{`${
          item.description
        } ${index + 1}`}</Text>
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

          {/* <Button
            style={styles.locationButton}
            accessoryLeft={PinIcon}
            size="small"
          ></Button> */}
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

  return (
    <View style={styles.container}>
      <Filter />
      <List
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
};

export default StoresList;

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
    backgroundColor: "transparent",
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
    borderTopRightRadius: 15,
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
