import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import StepCounter from '../components/StepCounter'; // Import the step counter component
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define the type for the navigation prop
type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string }; // Add this for workout detail navigation
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function Home({ navigation }: Props) {
  const workoutImages = [
    { id: '1', title: 'Push Ups', image: require('../assets/workouts/pushups.jpg') },
    { id: '2', title: 'Squats', image: require('../assets/workouts/squats.jpg') },
    { id: '3', title: 'Pull Ups', image: require('../assets/workouts/pullups.jpg') },
  ];

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
          <View style={styles.row}>
            {/* Afgewerkt */}
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Afgewerkt</Text>
              <Text style={styles.statusValue}>💪</Text>
            </View>

            {/* In Uitvoering */}
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Stappen 🥾</Text>
              <StepCounter />
            </View>
          </View>

          <View style={styles.row}>
            {/* Bestede Tijd */}
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Bestede Tijd</Text>
              <Text style={styles.statusValue}>⏱</Text>
            </View>
          </View>
        </View>

        {/* New Workouts Section */}
        <Text style={styles.workoutHeader}>Ontdek nieuwe workouts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {workoutImages.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              onPress={() => navigation.navigate('WorkoutDetail', { exerciseId: workout.id })}
              style={styles.workoutImageContainer}
            >
              <Image source={workout.image} style={styles.workoutImage} />
              <Text style={styles.workoutTitle}>{workout.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="home" size={24} color="gray" />
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
    width: '100%',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusBox: {
    width: '47%',
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
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 28,
  },
  workoutHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  workoutImageContainer: {
    marginRight: 20,
  },
  workoutImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  workoutTitle: {
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
