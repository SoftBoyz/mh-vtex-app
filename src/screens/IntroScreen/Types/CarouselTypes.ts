export type CarouselImages =
  | "selection"
  | "shopping"
  | "on_the_way"
  | "on_available"
  | "client_packages";

export type IntroCarouselItemProps = {
  title: string;
  image: CarouselImages;
};

export type CarouselIndicator = { active: boolean };

export type CarouselIndicatorWrapper = {
  nOfIndicators: number;
  current: number;
};
