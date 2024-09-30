import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/images/login_aventure.jpg')} // Background image (ensure it is in the assets folder)
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Login Form */}
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Afgewerkt</Text>
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
    justifyContent: 'flex-start', // Align items to the start of the container
    alignItems: 'flex-start', // Align items to the start of the container
    padding: 20, // Add padding to the container
  },
  loginBox: {
    width: 250, // Set a smaller width
    padding: 20, // Add padding inside the box
    backgroundColor: '#FFFFFF', // Solid white background
    borderRadius: 10, // Rounded corners
    marginTop: 150, // Increase margin from the top to move it down
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  loginTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
});