// StepCounter.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function StepCounter() {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);

  useEffect(() => {
    // Check if the pedometer is available
    Pedometer.isAvailableAsync().then(
      result => setIsPedometerAvailable(result),
      error => console.error(error)
    );

    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });

    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Tracker</Text>
      {isPedometerAvailable ? (
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Steps Today:</Text>
          <Text style={styles.stepNumber}>{stepCount}</Text>
        </View>
      ) : (
        <Text style={styles.errorText}>Pedometer not available on this device</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5FE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  stepContainer: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  stepText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
