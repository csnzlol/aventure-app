import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  Account: undefined;
  Privacy: undefined;
  Notifications: undefined;
  Login: undefined;
  WorkoutDetail: { exerciseId: string }; // Define this screen
};

// Define WorkoutDetailNavigationProp
export type WorkoutDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;


export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type WorkoutsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Workouts'>;
export type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type WorkoutsRouteProp = RouteProp<RootStackParamList, 'Workouts'>;
export type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>;