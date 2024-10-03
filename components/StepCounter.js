// StepCounter.js
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
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
    <>
      {isPedometerAvailable ? (
        <Text>Vandaag: {stepCount}</Text>
      ) : (
        <Text>Pedometer not available</Text>
      )}
    </>
  );
}
