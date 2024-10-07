import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Voor iconen
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Definieer het type voor de navigatieprop
type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;
type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;

type Props = {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
};

export default function Settings({ navigation }: Props) {
  return (
    <ImageBackground
      source={require('../assets/images/osiris_achtergrond.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Instellingen</Text>

        {/* Instelling opties */}
        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingOption}>
            <MaterialIcons name="account-circle" size={24} color="black" />
            <Text style={styles.optionText}>Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingOption}>
            <MaterialIcons name="security" size={24} color="black" />
            <Text style={styles.optionText}>Privacy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingOption}>
            <MaterialIcons name="notifications" size={24} color="black" />
            <Text style={styles.optionText}>Notificaties</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingOption}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={styles.optionText}>Uitloggen</Text>
          </TouchableOpacity>
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
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 20,
    fontWeight: 'bold',
    textShadowColor: '#555555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  settingsContainer: {
    marginTop: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 4,
  },
});
