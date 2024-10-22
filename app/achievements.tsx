import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AchievementScreen = () => {
  const [pushupSets, setPushupSets] = useState(0); 
  const [lungeSets, setLungeSets] = useState(0); 
  const [plankSets, setPlankSets] = useState(0);
  const [squatSets, setSquatSets] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationOpacity = useState(new Animated.Value(0))[0];

  // Load workout data from AsyncStorage
  useEffect(() => {
    const fetchSetsData = async () => {
      const storedPushupSets = await AsyncStorage.getItem('pushups_sets');
      const storedLungeSets = await AsyncStorage.getItem('lunges_sets');
      const storedPlankSets = await AsyncStorage.getItem('planks_sets');
      const storedSquatSets = await AsyncStorage.getItem('squats_sets');

      if (storedPushupSets) setPushupSets(parseInt(storedPushupSets, 10));
      if (storedLungeSets) setLungeSets(parseInt(storedLungeSets, 10));
      if (storedPlankSets) setPlankSets(parseInt(storedPlankSets, 10));
      if (storedSquatSets) setSquatSets(parseInt(storedSquatSets, 10));
    };
    fetchSetsData();
  }, []);

  // Celebration effect for achievement completion
  const triggerCelebration = () => {
    setShowCelebration(true);
    Animated.sequence([
      Animated.timing(celebrationOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(celebrationOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => setShowCelebration(false));
  };

  const checkAchievements = () => {
    if (pushupSets >= 10 || lungeSets >= 10 || plankSets >= 10 || squatSets >= 10) {
      Alert.alert("Gefeliciteerd!", "Je hebt 10 sets voltooid!");
      triggerCelebration();
    }
  };

  useEffect(() => {
    checkAchievements();
  }, [pushupSets, lungeSets, plankSets, squatSets]);

  const achievements = [
    {
      title: '10 Workouts Voltooid',
      description: 'Je hebt 10 workouts voltooid. Ga zo door!',
      icon: 'https://your-image-url.com/trophy.png',
    },
    {
      title: `Push-Ups Kampioen (${pushupSets} Sets)`,
      description: `Je hebt ${pushupSets} push-up sets voltooid!`,
      icon: 'https://your-image-url.com/pushup.png',
    },
    {
      title: `Lunges Kampioen (${lungeSets} Sets)`,
      description: `Je hebt ${lungeSets} lunge sets voltooid!`,
      icon: 'https://your-image-url.com/lunge.png',
    },
    {
      title: `Planks Kampioen (${plankSets} Sets)`,
      description: `Je hebt ${plankSets} plank sets voltooid!`,
      icon: 'https://your-image-url.com/plank.png',
    },
    {
      title: `Squats Kampioen (${squatSets} Sets)`,
      description: `Je hebt ${squatSets} squat sets voltooid!`,
      icon: 'https://your-image-url.com/squat.png',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Prestaties</Text>

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

      {/* Celebration Effect */}
      {showCelebration && (
        <Animated.View style={[styles.celebration, { opacity: celebrationOpacity }]}>
          <Text style={styles.celebrationText}>Gefeliciteerd!</Text>
        </Animated.View>
      )}
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
  celebration: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -50 }],
    backgroundColor: 'gold',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  celebrationText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AchievementScreen;
