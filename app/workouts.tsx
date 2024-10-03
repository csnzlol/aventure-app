import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';


// Define the type for the navigation prop
type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
};

type WorkoutsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Workouts'>;
type WorkoutsScreenRouteProp = RouteProp<RootStackParamList, 'Workouts'>;

type Props = {
  navigation: WorkoutsScreenNavigationProp;
  route: WorkoutsScreenRouteProp;
};

export default function Settings({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Workouts"
        onPress={() => navigation.navigate('Workouts')}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={24} color="gray" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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