import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
import WorkoutsScreen from './workouts'; // Hernoemen van de import
import Settings from './settings';

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens();

// Define the type for the navigation stack
type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Workouts" component={WorkoutsScreen} /> {/* Gebruik de hernoemde import */}
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
