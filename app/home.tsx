import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/images/osiris_achtergrond.jpg')} // Background image (ensure it is in the assets folder)
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Goedemorgen Sam</Text>
        <Text style={styles.subHeader}>Laten we aan de slag gaan</Text>
        
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
  header: {
    fontSize: 24,
    color: '#FFFFFF', // White color for the header text
    marginTop: 50, 
    marginBottom: 10, // Margin below the header
    fontWeight: 'bold', // Make the text bold
    textShadowColor: '#555555', // Dark gray shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 4, // Shadow radius
  },
  subHeader: {
    fontSize: 16,
    color: '#E4E4E4', // Light gray color for the subheader text
    marginBottom: 20, // Margin below the subheader
    fontWeight: 'bold', // Make the text bold
    textShadowColor: '#555555', // Dark gray shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 4, // Shadow radius
  },
  loginBox: {
    width: 161, // Set a smaller width
    height: 209, // Set a smaller height
    padding: 20, // Add padding inside the box
    backgroundColor: '#FFFFFF', // Solid white background
    borderRadius: 20, // Rounded corners
    marginTop: 50, // Increase margin from the top to move it down
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
});