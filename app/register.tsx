import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      console.log('Wachtwoorden komen niet overeen');
      return;
    }

    
    fetch('http://35.180.43.172/api/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,  
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Gebruiker succesvol geregistreerd') {
          console.log('Succesvolle registratie');
          router.push('/login'); // Redirect naar login
        } else {
          console.log(data.message); // Toon foutmelding
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/images/login_aventure.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.registerBox}>
          <Text style={styles.registerTitle}>Maak Een Account</Text>

          {/* Naam veld */}
          <TextInput
            style={styles.input}
            placeholder="Voornaam"  
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="#A9A9A9"
            autoCapitalize="words"
          />

          {/* E-mail veld */}
          <TextInput
            style={styles.input}
            placeholder="E-Mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password veld */}
          <TextInput
            style={styles.input}
            placeholder="Wachtwoord"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#A9A9A9"
            secureTextEntry
          />

          {/* Confirm wachtwoord veld */}
          <TextInput
            style={styles.input}
            placeholder="Herhaal Wachtwoord"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#A9A9A9"
            secureTextEntry
          />

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>REGISTREER</Text>
          </TouchableOpacity>

          {/* Terug naar login */}
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.backToLoginText}>Terug naar inloggen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  registerBox: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    width: 350,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 55,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f6f6f6',
  },
  registerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backToLoginText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
