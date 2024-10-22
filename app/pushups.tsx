import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Animated, Vibration, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';  // Voor voortgangsbalken
import AsyncStorage from '@react-native-async-storage/async-storage'; // Voor het opslaan van de aantal sets

const workoutImage = require('../assets/workouts/pushups.jpg');

// Motivatie citaten
const quotes = [
  "Duw harder dan gisteren als je een andere morgen wilt.",
  "Stop niet als je moe bent. Stop als je klaar bent!",
  "De pijn die je vandaag voelt, zal de kracht zijn die je morgen voelt.",
  "Succes begint met zelfdiscipline.",
];

export default function Pushups() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60); // Timer voor de oefening
  const [isRunning, setIsRunning] = useState(false); // Houd bij of de oefening loopt
  const [setsCompleted, setSetsCompleted] = useState(0); // Aantal voltooide sets
  const [repsCompleted, setRepsCompleted] = useState(0); // Aantal voltooide reps binnen een set
  const [randomReps, setRandomReps] = useState(10); // Willekeurig aantal reps per set
  const [currentQuote, setCurrentQuote] = useState(quotes[0]); // Huidig motivatie citaat
  const [progress, setProgress] = useState(0);  // Vooruitgang van de set

  let timer: NodeJS.Timeout | null = null;

  // Laad opgeslagen sets bij het openen van de pagina
  useEffect(() => {
    const loadSetsData = async () => {
      const storedSets = await AsyncStorage.getItem('pushups_sets');
      if (storedSets) {
        setSetsCompleted(parseInt(storedSets, 10));
      }
    };
    loadSetsData();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);  // Opruimen van de timer
    };
  }, [isRunning, timeLeft]);

  const handleStartWorkout = () => {
    setIsRunning(true);
    setRandomReps(generateRandomReps()); // Genereer willekeurig aantal reps
  };

  const handleCompleteSet = async () => {
    if (repsCompleted >= randomReps) {
      const newSetsCompleted = setsCompleted + 1;
      setSetsCompleted(newSetsCompleted); // Verhoog het aantal voltooide sets
      setCurrentQuote(generateRandomQuote()); // Verander het motivatie citaat
      setProgress((prev) => prev + 0.25); // Update de voortgangsbalk
      Vibration.vibrate(500); // Trillen bij voltooien van een set
      setRepsCompleted(0); // Reset het aantal reps voor de volgende set
      setRandomReps(generateRandomReps()); // Genereer nieuwe reps voor de volgende set

      // Sla het aantal voltooide sets op in AsyncStorage
      await AsyncStorage.setItem('pushups_sets', newSetsCompleted.toString());
    }
  };

  const handleRepIncrement = () => {
    setRepsCompleted(repsCompleted + 1);
    if (repsCompleted + 1 >= randomReps) {
      handleCompleteSet(); // Voltooi de set zodra het aantal reps is bereikt
    }
  };

  const generateRandomReps = () => {
    return Math.floor(Math.random() * (15 - 8 + 1)) + 8;  // Willekeurig aantal reps tussen 8 en 15
  };

  const generateRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const handleEndWorkout = () => {
    setIsRunning(false);
    Alert.alert('Training Voltooid', `Je hebt ${setsCompleted} sets voltooid!`);
    router.push('/workouts');
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(60); // Reset de timer
    setSetsCompleted(0); // Reset het aantal sets
    setRepsCompleted(0); // Reset het aantal reps
    setProgress(0); // Reset de voortgangsbalk
    setCurrentQuote(quotes[0]); // Reset de motivatie citaten
    AsyncStorage.removeItem('pushups_sets'); // Verwijder opgeslagen sets
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Titel */}
        <Text style={styles.title}>Push Ups</Text>

        {/* Oefening afbeelding */}
        <Image source={workoutImage} style={styles.workoutImage} />

        {/* Set en Reps */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Set: {setsCompleted + 1}</Text>
          <Text style={styles.statsText}>Reps: {repsCompleted}/{randomReps}</Text>
        </View>

        {/* Voortgangsbalk */}
        <Progress.Bar progress={progress} width={300} height={15} color="#28A745" style={styles.progressBar} />

        {/* Motivatie citaat */}
        <Text style={styles.motivationalQuote}>{currentQuote}</Text>

        {/* Start oefening knop */}
        <TouchableOpacity onPress={handleStartWorkout} style={styles.startButton}>
          <Text style={styles.startButtonText}>{isRunning ? 'Doorgaan' : 'Start Oefening'}</Text>
        </TouchableOpacity>

        {/* Rep toevoegen knop */}
        <TouchableOpacity onPress={handleRepIncrement} style={styles.repButton}>
          <Text style={styles.repButtonText}>+1 Rep</Text>
        </TouchableOpacity>

        {/* Einde oefening knop */}
        <TouchableOpacity onPress={handleEndWorkout} style={styles.endButton}>
          <Text style={styles.endButtonText}>Stop Oefening</Text>
        </TouchableOpacity>

        {/* Reset knop */}
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Oefening</Text>
        </TouchableOpacity>

        {/* Terug naar Workouts knop */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/workouts')}>
          <MaterialIcons name="arrow-back" size={24} color="#444" />
          <Text style={styles.backButtonText}>Terug naar Workouts</Text>
        </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  workoutImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  motivationalQuote: {
    fontSize: 16,
    color: '#FFD700',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  progressBar: {
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  repButton: {
    backgroundColor: '#17A2B8',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  repButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  endButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  backButtonText: {
    color: '#444',
    fontSize: 16,
    marginLeft: 10,
  },
});
