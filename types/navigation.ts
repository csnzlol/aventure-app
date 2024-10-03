import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation stack types
export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string };
};

// Navigation prop types for each screen
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type WorkoutDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
