// types.ts (or a better place for shared types)
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Settings: undefined;
  WorkoutDetail: { exerciseId: string };
};

// For navigation prop typing
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type WorkoutDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
