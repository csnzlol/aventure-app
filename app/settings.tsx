import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  // Uitlogfunctie
  const handleLogout = () => {
    console.log('User logged out');
    router.push('/login');
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* Profielfoto */}
            <Image
              source={require('../assets/images/KevinVierhuis.jpg')} // Lokale profielfoto
              style={styles.profileImage}
            />
            
            <Text style={styles.profileName}>Kevin Vierhuis</Text>
            
            {/* Uitlog Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="white" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Uitloggen</Text>
            </TouchableOpacity>
          </View>

          {/* Instellingen opties */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option} onPress={() => router.push('./account')}>
              <MaterialIcons name="account-circle" size={24} color="black" />
              <Text style={styles.optionText}>Account</Text>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push('./privacy')}>
              <MaterialIcons name="security" size={24} color="black" />
              <Text style={styles.optionText}>Privacy</Text>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push('./notifications')}>
              <MaterialIcons name="notifications" size={24} color="black" />
              <Text style={styles.optionText}>Notificaties</Text>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  logoutIcon: {
    marginRight: 5,
    color: 'white',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
