declare module 'react-native-snap-carousel' {
    import { FlatListProps } from 'react-native';
  
    export interface CarouselProps<T> extends FlatListProps<T> {
      sliderWidth: number;
      itemWidth: number;
      renderItem: ({ item, index }: { item: T, index: number }) => React.ReactNode;
      loop?: boolean;
      autoplay?: boolean;
      autoplayInterval?: number;
      onSnapToItem?: (index: number) => void;
    }
  
    export default class Carousel<T> extends React.Component<CarouselProps<T>, any> {}
  }
  