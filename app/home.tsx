import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons, you can use any icon library
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Import the types

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={24} color="lightblue" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Workouts')}>
          <MaterialIcons name="fitness-center" size={24} color="gray" />
          <Text style={styles.navText}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
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
    justifyContent: 'flex-start', // Align items to the start of the container
    alignItems: 'flex-start', // Align items to the start of the container
    padding: 20, // Add padding to the container
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF', // White color for the header text
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'gray',
  },
  navTextActive: {
    color: '#007BFF', // Light blue text
  },
});