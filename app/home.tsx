import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import StepCounter from '../components/StepCounter'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const router = useRouter();

type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string }; 
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function Home({ navigation }: Props) {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen';
    if (hour < 18) return 'Goedemiddag';
    return 'Goedeavond';
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const email = await AsyncStorage.getItem('user_email');
        if (email) {
          const response = await fetch(`http://51.44.11.254/api/getUser.php?email=${email}`);
          const data = await response.json();
          if (response.ok) {
            setUserName(data.name);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserName();
    setGreeting(getGreeting());
  }, []);

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
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.header}>{greeting}, {userName}</Text>
            <Text style={styles.subHeader}>Laten we aan de slag gaan</Text>
          </View>
          <Image
            source={require('../assets/images/KevinVierhuis.jpg')}
            style={styles.profileImage}
          />
        </View>

        {/* Status Boxes */}
        <View style={styles.statusContainer}>
          <View style={styles.row}>
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Afgewerkt</Text>
              <Text style={styles.statusValue}>💪</Text>
            </View>

            {/* Stappen */}
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

        {/* Nieuwe Workouts Section */}
        <Text style={styles.workoutHeader}>Ontdek nieuwe workouts</Text>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
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
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./home')}>
            <MaterialIcons name="home" size={24} color="lightblue" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./workouts')}>
            <MaterialIcons name="fitness-center" size={24} color="gray" />
            <Text style={styles.navText}>Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./Settings')}>
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
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#E4E4E4',
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
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
    height: 120,
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
    width: Dimensions.get('window').width * 0.85, 
    height: 200,
    borderRadius: 5,
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
