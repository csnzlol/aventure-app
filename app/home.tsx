import React, { useState, useRef } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Carousel from 'react-native-snap-carousel'; // For the carousel
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define the type for the navigation prop
type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string }; // Assuming there's a WorkoutDetail screen
};

type WorkoutItem = {
  id: string;
  title: string;
  image: any;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

// Get device width for carousel item width calculation
const { width: viewportWidth } = Dimensions.get('window');

export default function Home({ navigation }: Props) {
  const [workouts] = useState<WorkoutItem[]>([
    { id: '1', title: 'Push Ups', image: require('../assets/workouts/pushups.jpg') },
    { id: '2', title: 'Pull Ups', image: require('../assets/workouts/pullups.jpg') },
    { id: '3', title: 'Squats', image: require('../assets/workouts/squats.jpg') },
  ]);

  const carouselRef = useRef(null);

  // Render each workout in the carousel
  const renderWorkoutItem = ({ item }: { item: WorkoutItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetail', { exerciseId: item.id })}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/images/osiris_achtergrond.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Goedemorgen, Sam</Text>
        <Text style={styles.subHeader}>Laten we aan de slag gaan</Text>

        {/* Status Boxes */}
        <View style={styles.statusContainer}>
          {/* Afgewerkt */}
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Afgewerkt</Text>
          </View>

          {/* In Uitvoering */}
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>In Uitvoering</Text>
          </View>
        </View>

        {/* Workout Carousel */}
        <Text style={styles.workoutHeader}>Ontdek nieuwe workouts</Text>
        <Carousel
          ref={carouselRef}
          data={workouts}
          renderItem={renderWorkoutItem} // Add this line to ensure renderItem is passed
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth * 0.7} // Each item takes 70% of the viewport width
          loop={true} // Loop through the items
          autoplay={true} // Automatically scroll
          autoplayInterval={3000} // 3 seconds interval
        />

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="home" size={24} color="lightblue" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Workouts')}>
            <MaterialIcons name="fitness-center" size={24} color="gray" />
            <Text style={styles.navText}>Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
            <MaterialIcons name="settings" size={24} color="gray" />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#E4E4E4',
    marginBottom: 20,
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusBox: {
    width: '30%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  statusTitle: { // Add the statusTitle here
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Customize this color as you like
    textAlign: 'center',
  },
  workoutHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
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
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 4,
  },
});