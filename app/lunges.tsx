import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Animated, Vibration, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';  // For progress tracking bars

const workoutImage = require('../assets/workouts/pullups.jpg');

// New set of motivational quotes
const quotes = [
  "Duw harder dan gisteren als je een andere morgen wilt.",
  "Stop niet als je moe bent. Stop als je klaar bent!",
  "De pijn die je vandaag voelt, zal de kracht zijn die je morgen voelt.",
  "Success starts with self-discipline.",
];

export default function Pushups() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60); // Countdown timer voor de challenge
  const [isRunning, setIsRunning] = useState(false);
  const [setsCompleted, setSetsCompleted] = useState(0); // Nummer van voltooide sets
  const [repsCompleted, setRepsCompleted] = useState(0); // Nummer van voltooide reps
  const [randomReps, setRandomReps] = useState(10); // Random nummer van reps voor de set
  const [currentQuote, setCurrentQuote] = useState(quotes[0]); // Motivatie quote
  const [progress, setProgress] = useState(0);  // Progressie bar

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);  
    };
  }, [isRunning, timeLeft]);

  const handleStartWorkout = () => {
    setIsRunning(true);
    setRandomReps(generateRandomReps()); 
  };

  const handleCompleteSet = () => {
    if (repsCompleted >= randomReps) {
      setSetsCompleted(setsCompleted + 1); // Update sets
      setCurrentQuote(generateRandomQuote()); // Update motivatie quote
      setProgress((prev) => prev + 0.25); // Update progressie
      Vibration.vibrate(500); // Tril de telefoon
      setRepsCompleted(0); // Reset reps
      setRandomReps(generateRandomReps()); // Genereer nieuwe random reps
    }
  };

  const handleRepIncrement = () => {
    setRepsCompleted(repsCompleted + 1);
    if (repsCompleted + 1 >= randomReps) {
      handleCompleteSet(); // Voltooi de set
    }
  };

  const generateRandomReps = () => {
    return Math.floor(Math.random() * (15 - 8 + 1)) + 8;  // Random nummer tussen 8 en 15
  };

  const generateRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const handleEndWorkout = () => {
    setIsRunning(false);
    Alert.alert('Workout Completed', `You completed ${setsCompleted} sets!`);
    router.push('/workouts');
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(60); // Reset timer
    setSetsCompleted(0); // Reset sets
    setRepsCompleted(0); // Reset reps
    setProgress(0); // Reset progress bar
    setCurrentQuote(quotes[0]); // Reset motivational quote
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Lunges</Text>

        {/* Workout Image */}
        <Image source={workoutImage} style={styles.workoutImage} />

        {/* Set Progress and Reps */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Set: {setsCompleted + 1}</Text>
          <Text style={styles.statsText}>Reps: {repsCompleted}/{randomReps}</Text>
        </View>

        {/* Progress Bar for Set Completion */}
        <Progress.Bar progress={progress} width={300} height={15} color="#28A745" style={styles.progressBar} />

        {/* Motivational Quote */}
        <Text style={styles.motivationalQuote}>{currentQuote}</Text>

        {/* Start/Pause Workout Button */}
        <TouchableOpacity onPress={handleStartWorkout} style={styles.startButton}>
          <Text style={styles.startButtonText}>{isRunning ? 'Continue' : 'Start Workout'}</Text>
        </TouchableOpacity>

        {/* Add Rep Button */}
        <TouchableOpacity onPress={handleRepIncrement} style={styles.repButton}>
          <Text style={styles.repButtonText}>+1 Rep</Text>
        </TouchableOpacity>

        {/* End Workout Button */}
        <TouchableOpacity onPress={handleEndWorkout} style={styles.endButton}>
          <Text style={styles.endButtonText}>End Workout</Text>
        </TouchableOpacity>

        {/* Reset Workout Button */}
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Workout</Text>
        </TouchableOpacity>

        {/* Back to Workouts Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/workouts')}>
          <MaterialIcons name="arrow-back" size={24} color="#444" />
          <Text style={styles.backButtonText}>Back to Workouts</Text>
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
