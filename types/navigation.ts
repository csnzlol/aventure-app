import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define the navigation stack
export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string };
};

// Navigation types for Home screen
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

// Navigation types for WorkoutDetail
export type WorkoutDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
export type WorkoutDetailRouteProp = RouteProp<RootStackParamList, 'WorkoutDetail'>;
