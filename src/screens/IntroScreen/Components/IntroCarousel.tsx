import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Text } from "@ui-kitten/components";
import {
  IntroCarouselItemProps,
  CarouselIndicatorWrapper,
  CarouselIndicator,
  CarouselImages,
} from "../Types/CarouselTypes";

const { width, height } = Dimensions.get("window");

const requireFile = (imageKey: CarouselImages): NodeRequire => {
  const images: { [key in CarouselImages]: NodeRequire } = {
    selection: require("../../../../assets/images/selection.png"),
    shopping: require("../../../../assets/images/shopping.png"),
    on_the_way: require("../../../../assets/images/on_the_way.png"),
    client_packages: require("../../../../assets/images/client_packages.png"),
    on_available: require("../../../../assets/images/on_available.png"),
  };

  return images[imageKey];
};

const CarouselIndicators: React.SFC<CarouselIndicatorWrapper> = ({
  nOfIndicators,
  current,
}) => {
  const iterator = Array.from({ length: nOfIndicators });

  const Indicator: React.SFC<CarouselIndicator> = ({ active }) => (
    <View
      style={
        active
          ? styles.activeCarouselIndicator
          : styles.disabledCarouselIndicator
      }
    />
  );

  return (
    <View style={styles.carouselIndicatorsWrapper}>
      {iterator.map((value, index) => {
        return <Indicator key={index} active={current == index} />;
      })}
    </View>
  );
};

const IntroCarousel = () => {
  const carouselRef = useRef(null);

  const [currentIndex, handleCurrentIndex] = useState<number>(0);

  const entries: IntroCarouselItemProps[] = [
    { title: "Escolha seus itens", image: "selection" },
    { title: "Adicione ao seu carrinho", image: "shopping" },
    { title: "Acompanhe seu pedido", image: "on_the_way" },
  ];

  const renderItem = ({
    item,
    index,
  }: {
    item: IntroCarouselItemProps;
    index: number;
  }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.slideImageWrapper}>
          <Image style={styles.slideImage} source={requireFile(item.image)} />
        </View>
        <Text category="h5" style={styles.textTitle}>
          {item.title}
        </Text>
        <Text category="s1" style={styles.textDesc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsam
          neque beatae eligendi vitae perferendis aspernatur labore, nobis sed
          dolore!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={entries}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => handleCurrentIndex(index)}
      />

      <CarouselIndicators
        nOfIndicators={entries.length}
        current={currentIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
  slide: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  slideImageWrapper: {
    height: (height / width) * 150,
  },
  slideImage: {
    top: 0,
    resizeMode: "center",
    flex: 1,
  },
  textTitle: {
    fontWeight: "bold",
    letterSpacing: 0.6,
    fontFamily: "sans-serif-condensed",
    color: "rgba(0, 0, 0, .6)",
  },
  textDesc: {
    marginTop: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "rgba(0, 0, 0, .5)",
  },
  carouselIndicatorsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  disabledCarouselIndicator: {
    marginHorizontal: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  activeCarouselIndicator: {
    marginHorizontal: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#536dfe",
  },
});

export default IntroCarousel;
