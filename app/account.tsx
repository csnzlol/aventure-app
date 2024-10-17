import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountSettings() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('user_email');
        if (email) {
          const response = await fetch(`http://35.180.43.172/api/getUser.php?email=${email}`);
          const data = await response.json();
          if (response.ok) {
            setUserName(data.name);
            setProfileImage(data.profileImage || null); 
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem('user_token');
    router.push('/login');
  };

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  return (
    <ImageBackground 
      source={require('../assets/images/osiris_achtergrond.jpg')} 
      style={styles.background} 
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../assets/images/KevinVierhuis.jpg')} style={styles.profileImage} />
          )}
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Uitloggen</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionHeader}>Instellingen</Text>

          {/* Notification Settings */}
          <View style={styles.settingItem}>
            <Text style={styles.settingTitle}>Notificaties</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>

          {/* Additional Settings */}
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('./profielBewerken')}>
            <Text style={styles.settingTitle}>Bewerk Profiel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/passwordrecovery')}>
            <Text style={styles.settingTitle}>Wijzig Wachtwoord</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#808080',
  },
  settingsContainer: {
    marginTop: 30,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000',
  },
});
