import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons, you can use any icon library

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/images/osiris_achtergrond.jpg')}
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="gray" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="fitness-center" size={24} color="lightblue" />
          <Text style={styles.navText}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color="gray" />
          <Text style={styles.navText}>Settings</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#E4E4E4',
    marginBottom: 20,
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  loginBox: {
    width: 161,
    height: 209,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Bottom Navigation Bar styles
  bottomNav: {
    position: 'absolute',
    bottom: 20, // Move it up a bit from the bottom to make it look like it's floating
    left: 20, // Add spacing from the sides for the floating effect
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF', // White background for the nav bar
    paddingVertical: 15, // Padding for vertical space
    borderRadius: 30, // Rounded corners for the floating effect
    shadowColor: '#000', // Shadow color for the floating effect
    shadowOffset: { width: 0, height: 5 }, // Shadow offset to make it float
    shadowOpacity: 0.15, // Slight shadow opacity
    shadowRadius: 10, // Blur effect for the shadow
    elevation: 10, // Android shadow elevation
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'gray', // Gray text for navigation items
    fontSize: 14,
    marginTop: 4, // Spacing between icon and text
  },
});
