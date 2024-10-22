import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function StepCounter() {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(null); // Start with null

  useEffect(() => {
    // Check if the pedometer is available
    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(result);
        if (result) {
          const subscription = Pedometer.watchStepCount(result => {
            console.log(result.steps); // Debugging: Log the step count
            setStepCount(result.steps);
          });

          // Clean up the subscription on unmount
          return () => subscription && subscription.remove();
        }
      },
      error => console.error('Error checking pedometer availability:', error)
    );
  }, []);

  return (
    <>
      {isPedometerAvailable === null ? (
        <Text>Checking pedometer...</Text>
      ) : isPedometerAvailable ? (
        <Text>Vandaag: {stepCount}</Text>
      ) : (
        <Text>Pedometer not available</Text>
      )}
    </>
  );
}
