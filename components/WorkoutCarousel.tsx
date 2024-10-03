import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { WorkoutDetailNavigationProp } from '../types/navigation'; // Import from central navigation file

// Define the type for workout items
type WorkoutItem = {
  id: string;
  title: string;
  image: any;
};

type WorkoutCarouselProps = {
  data: WorkoutItem[];  // The workout items array
  navigation: WorkoutDetailNavigationProp;  // Correct navigation type
};

const WorkoutCarousel: React.FC<WorkoutCarouselProps> = ({ data, navigation }) => {
  const renderWorkoutItem = ({ item }: { item: WorkoutItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetail', { exerciseId: item.id })}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderWorkoutItem}
      sliderWidth={300}
      itemWidth={250}
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
