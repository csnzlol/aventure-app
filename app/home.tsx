import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import WorkoutCarousel from '../components/WorkoutCarousel';
import { HomeScreenNavigationProp, WorkoutDetailNavigationProp } from '../types/navigation'; // Import from central navigation file

type Props = {
  navigation: HomeScreenNavigationProp & WorkoutDetailNavigationProp;
};

export default function Home({ navigation }: Props) {
  const [workouts] = useState([
    { id: '1', title: 'Push Ups', image: require('../assets/workouts/pushups.jpg') },
    { id: '2', title: 'Pull Ups', image: require('../assets/workouts/pullups.jpg') },
    { id: '3', title: 'Squats', image: require('../assets/workouts/squats.jpg') },
  ]);

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Goedemorgen, Sam</Text>
        <Text style={styles.subHeader}>Laten we aan de slag gaan</Text>

        <View style={styles.statusContainer}>
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Afgewerkt</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>In Uitvoering</Text>
          </View>
        </View>

        <Text style={styles.workoutHeader}>Ontdek nieuwe workouts</Text>

        {/* Pass navigation and workouts data */}
        <WorkoutCarousel data={workouts} navigation={navigation} />

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
  },
  subHeader: {
    fontSize: 16,
    color: '#E4E4E4',
    marginBottom: 20,
    fontWeight: 'bold',
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
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  workoutHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
});
