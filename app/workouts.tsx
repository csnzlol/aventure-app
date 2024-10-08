import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import local images
const workout1Image = require('../assets/workouts/pushups.jpg');
const workout2Image = require('../assets/workouts/squats.jpg');
const workout3Image = require('../assets/workouts/pullups.jpg');
const workout4Image = require('../assets/workouts/planks.jpg');

export default function Workouts() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Ontdek nieuwe Workouts</Text>
        
        {/* Workout Blokken */}
        <View style={styles.workoutContainer}>
          <TouchableOpacity style={styles.workoutCard}>
            <Image
              source={workout1Image} // Use local image
              style={styles.workoutImage}
            />
            <Text style={styles.workoutText}>Push Ups</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.workoutCard}>
            <Image
              source={workout2Image} // Use local image
              style={styles.workoutImage}
            />
            <Text style={styles.workoutText}>Squats</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.workoutCard}>
            <Image
              source={workout3Image} // Use local image
              style={styles.workoutImage}
            />
            <Text style={styles.workoutText}>Lunges</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.workoutCard}>
            <Image
              source={workout4Image} // Use local image
              style={styles.workoutImage}
            />
            <Text style={styles.workoutText}>Planks</Text>
          </TouchableOpacity>
        </View>
    
        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
            <MaterialIcons name="home" size={24} color="gray" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/workouts')}>
            <MaterialIcons name="fitness-center" size={24} color="lightblue" />
            <Text style={styles.navText}>Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  workoutContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  workoutCard: {
    width: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  workoutImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  workoutText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
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