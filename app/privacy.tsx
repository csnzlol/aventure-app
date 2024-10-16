import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage to get the logged-in user's email
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store the user's email
  const router = useRouter();

  // Fetch the logged-in user's email from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('user_email');
        if (email) {
          setUserEmail(email); // Set the user's email in the state
        }
      } catch (error) {
        console.error('Failed to retrieve user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Bevestiging',
      'Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
      [
        { text: 'Annuleren', style: 'cancel' },
        { text: 'Ja, verwijder mijn account', onPress: () => deleteAccount() },
      ],
    );
  };

  const deleteAccount = async () => {
    if (!userEmail) {
      Alert.alert('Fout', 'Geen e-mailadres gevonden voor de huidige gebruiker.');
      return;
    }

    try {
      const response = await fetch('http://13.38.96.31/api/deleteAccount.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }), // Use the logged-in user's email
      });

      const data = await response.json();
      
      console.log('API Response:', data); // Log the entire API response

      if (data.success) {
        Alert.alert('Account Verwijderd', 'Je account is succesvol verwijderd.');
        router.push('/login'); // Redirect to login page after account deletion
      } else {
        Alert.alert('Fout', data.message || 'Er is iets misgegaan. Probeer het later opnieuw.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Fout', 'Er is een probleem opgetreden.');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.privacyBox}>
            <Text style={styles.title}>Privacy Instellingen</Text>

            <Text style={styles.paragraph}>
              Hier kun je jouw privacy-instellingen beheren en bepalen hoe we jouw gegevens gebruiken. Bekijk hieronder de beschikbare opties.
            </Text>

            {/* Manage data option */}
            <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Gegevens beheren', 'Je kunt je gegevens hier beheren.')}>
              <View style={styles.optionContent}>
                <MaterialIcons name="storage" size={24} color="black" />
                <Text style={styles.optionText}>Gegevens beheren</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>

            {/* Enable/Disable tracking */}
            <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Tracking', 'Schakel tracking hier in of uit.')}>
              <View style={styles.optionContent}>
                <MaterialIcons name="security" size={24} color="black" />
                <Text style={styles.optionText}>Tracking in-/uitschakelen</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>

            {/* Delete account */}
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.deleteButtonText}>Account Verwijderen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  privacyBox: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
