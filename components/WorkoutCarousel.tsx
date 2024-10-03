import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the type for workout items
type WorkoutItem = {
  id: string;
  title: string;
  image: any;
};

// Define the type for the navigation prop
type RootStackParamList = {
  WorkoutDetail: { exerciseId: string };
};

type WorkoutCarouselProps = {
  data: WorkoutItem[]; // An array of WorkoutItem
  navigation: NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
};

const WorkoutCarousel: React.FC<WorkoutCarouselProps> = ({ data, navigation }) => {
  // Render each workout item
  const renderWorkoutItem = ({ item }: { item: WorkoutItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetail', { exerciseId: item.id })}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Carousel
      data={data} // Data for the carousel
      renderItem={renderWorkoutItem} // Render each item
      sliderWidth={300} // Adjust this to your needs
      itemWidth={250} // Adjust this to your needs
      loop
      autoplay
      autoplayInterval={3000}
    />
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  carouselTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default WorkoutCarousel;
