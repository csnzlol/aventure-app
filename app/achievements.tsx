import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated, Vibration } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Example achievements data
const achievementsData = [
  {
    title: '10 Workouts Voltooid',
    description: 'Je hebt 10 workouts voltooid!',
    icon: '../assets/workouts/achievement.png',
    completed: true, // Example of a completed achievement
  },
  {
    title: 'Eerste Week Streak',
    description: 'Je hebt een hele week oefeningen gedaan!',
    icon: '../assets/workouts/achievement.jpg',
    completed: false,
  },
  {
    title: '500 Push-ups',
    description: 'Je hebt 500 push-ups voltooid in totaal!',
    icon: '../assets/workouts/achievement.jpg',
    completed: false,
  },
  {
    title: '50 Squats',
    description: 'Je hebt 50 squats in totaal gedaan!',
    icon: '../assets/workouts/achievement.jpg',
    completed: true,
  },
  {
    title: '10 Sets Voltooid',
    description: 'Je hebt 10 sets voltooid in één oefening!',
    icon: '../assets/workouts/achievement.jpg',
    completed: true,
  },
  {
    title: '1000 Calorieën Verbrand',
    description: 'Je hebt in totaal 1000 calorieën verbrand!',
    icon: '../assets/workouts/achievement.jpg',
    completed: false,
  },
];

export default function AchievementScreen() {
  const [achievements, setAchievements] = useState(achievementsData);
  const [animatedValue] = useState(new Animated.Value(1)); // Animation state
  const router = useRouter();

  useEffect(() => {
    // Run animation for achievements
    achievements.forEach((achievement, index) => {
      if (achievement.completed) {
        unlockAchievementAnimation(index);
      }
    });
  }, []);

  const unlockAchievementAnimation = (index: number) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Vibration.vibrate(300); // Vibration feedback
      // Show congratulation message
      console.log(`Achievement Unlocked: ${achievements[index].title}`);
    });
  };

  const renderAchievements = () => {
    return achievements.map((achievement, index) => {
      return (
        <Animated.View
          key={index}
          style={[
            styles.achievementCard,
            achievement.completed && styles.achievementCompleted,
            { transform: [{ scale: achievement.completed ? animatedValue : 1 }] },
          ]}
        >
          <Image source={{ uri: achievement.icon }} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
          </View>
          {achievement.completed && (
            <MaterialIcons name="check-circle" size={24} color="green" style={styles.completedIcon} />
          )}
        </Animated.View>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Prestaties</Text>
      {renderAchievements()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E0F0D9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  achievementCompleted: {
    borderColor: '#FFD700', // Gold border for completed achievements
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 5,
  },
  completedIcon: {
    marginLeft: 10,
  },
});
