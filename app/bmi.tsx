import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BMICalculator() {
  const [height, setHeight] = useState(''); // Height in centimeters
  const [weight, setWeight] = useState(''); // Weight in kilograms
  const [bmi, setBMI] = useState<number | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch user email from AsyncStorage
    const fetchUserEmail = async () => {
      const userEmail = await AsyncStorage.getItem('user_email');
      if (userEmail) {
        setEmail(userEmail);
      }
    };
    fetchUserEmail();
  }, []);

  // Function to calculate BMI
  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (!heightInMeters || !weightInKg) {
      Alert.alert('Error', 'Please enter valid height and weight.');
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBMI(bmiValue);
  };

  // Function to save BMI to the database
  const saveBMI = async () => {
    if (!bmi || !email) {
      Alert.alert('Error', 'BMI not calculated or user not logged in.');
      return;
    }

    try {
      const response = await fetch('http://35.180.43.172/api/saveBMI.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          height: parseFloat(height),
          weight: parseFloat(weight),
          bmi: bmi,
        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'BMI saved successfully!');
      } else {
        Alert.alert('Error', data.message || 'Failed to save BMI');
      }
    } catch (error) {
      console.error('Error saving BMI:', error);
      Alert.alert('Error', 'Failed to save BMI');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bereken je BMI</Text>

        {/* Input for height */}
        <TextInput
          style={styles.input}
          placeholder="Lengte (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholderTextColor="#A9A9A9"
        />

        {/* Input for weight */}
        <TextInput
          style={styles.input}
          placeholder="Gewicht (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholderTextColor="#A9A9A9"
        />

        {/* Calculate Button */}
        <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Bereken BMI</Text>
        </TouchableOpacity>

        {/* Show the BMI result */}
        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Je BMI is: {bmi.toFixed(2)}</Text>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveBMI}>
          <Text style={styles.buttonText}>Sla BMI op</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f6f6f6',
    color: '#000',
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
