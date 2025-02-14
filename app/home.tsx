import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import StepCounter from '../components/StepCounter'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const router = useRouter();

// Definieer de typen voor de navigatieparameters van de root stack
type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string }; 
};

// Definieer de typen voor de navigatie- en routeprops van het Home-scherm
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function Home({ navigation }: Props) {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [bmi, setBMI] = useState<number | null>(null); 

  // Functie om een begroeting te krijgen op basis van het huidige uur van de dag
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen';
    if (hour < 18) return 'Goedemiddag';
    return 'Goedeavond';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('user_email');
        if (email) {
          // Haal gebruikersnaam op
          const response = await fetch(`http://35.180.43.172/api/getUser.php?email=${email}`);
          const data = await response.json();
          if (response.ok) {
            setUserName(data.name);
          }

          // Haal BMI op
          const bmiResponse = await fetch('http://35.180.43.172/api/getBMI.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
          });
          const bmiData = await bmiResponse.json();
          if (bmiResponse.ok && bmiData.success && bmiData.bmi) {
            setBMI(Number(bmiData.bmi)); // Zet BMI als een getal
          } else {
            setBMI(null); // Zet BMI op null als er geen BMI is
          }
        }
      } catch (error) {
        console.error('Fout bij het ophalen van gebruikersgegevens:', error);
      }
    };

    fetchUserData();
    setGreeting(getGreeting());
  }, []);

  // Lijst van workouts met afbeeldingen
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
        <Text style={styles.header}>{greeting}, {userName}</Text>
        <Text style={styles.subHeader}>Laten we aan de slag gaan</Text>
        
        {/* Stappen en BMI naast elkaar */}
        <View style={styles.row}>
          {/* Stappen */}
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Stappen 🥾</Text>
            <StepCounter />
          </View>

          {/* Gebruiker's BMI */}
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Jouw BMI</Text>
            <Text style={styles.statusValue}>
              {bmi !== null ? bmi.toFixed(1) : 'N/A'}  {/* Laat BMI of N/A */}
            </Text>
          </View>
        </View>

        {/* Nieuwe Workouts Sectie */}
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

        {/* Bottom Navigatie Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./home')}>
            <MaterialIcons name="home" size={24} color="gray" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./workouts')}>
            <MaterialIcons name="fitness-center" size={24} color="gray" />
            <Text style={styles.navText}>Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./settings')}>
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
  row: {
    flexDirection: 'row', // Make the boxes appear next to each other
    justifyContent: 'space-between',
    width: '100%',
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
