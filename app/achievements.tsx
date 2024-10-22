import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AchievementScreen = () => {
  const achievements = [
    {
      title: '10 Workouts Completed',
      description: 'You’ve completed 10 workouts. Keep it up!',
      icon: 'https://your-image-url.com/trophy.png',
    },
    {
      title: 'First Week Streak',
      description: 'You completed a full week of workouts!',
      icon: 'https://your-image-url.com/streak.png',
    },
    {
      title: '500 Push-ups',
      description: 'You’ve done 500 push-ups in total.',
      icon: 'https://your-image-url.com/pushup.png',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Achievements</Text>
      
      {/* Achievement Cards */}
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementCard}>
          <Image source={{ uri: achievement.icon }} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

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
});

export default AchievementScreen;
