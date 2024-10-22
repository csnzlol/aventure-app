import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Gebruik router om programmatisch te navigeren

  return (
    <ImageBackground
      source={require('../assets/images/login_aventure.jpg')} // Achtergrondafbeelding (zorg ervoor dat deze in de map assets staat)
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Accountherstel */}
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Wachtwoord Herstellen</Text>

          {/* E-mail */}
          <TextInput
            style={styles.input}
            placeholder="E-Mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A9A9A9" // Lichtgrijze kleur voor plaatsaanduiding
          />

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => console.log('Accountherstel ingedrukt')} // Hier logica voor inloggen afhandelen
          >
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableOpacity>

          {/* Forgot password link */}
          <TouchableOpacity onPress={() => console.log('Wachtwoord vergeten klik')}>
            <Text style={styles.forgotPasswordText}>Wachtwoord vergeten?</Text>
          </TouchableOpacity>
        </View>

        {/* Register link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Nog geen account?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Maak hier een account aan</Text>
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
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  loginTitle: {
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
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#000',
  },
  registerLink: {
    color: '#007BFF',
    fontSize: 14,
    marginTop: 5,
  },
});
