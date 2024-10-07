import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SettingsNavigationProp } from '../types/navigation'; // Zorg ervoor dat je het juiste pad gebruikt

type Props = {
  navigation: SettingsNavigationProp;
};

export default function Settings({ navigation }: Props) {

  // Uitlogfunctie
  const handleLogout = () => {
    console.log('User logged out');
    navigation.replace('Login'); 
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <View style={styles.container}>

        {/* Profielfoto en naam */}
        <View style={styles.profileSection}>
          <Image
            // Voeg je profielfoto toe
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Sam Langkamp</Text>

          {/* Uitlog Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
            <MaterialIcons name="logout" size={20} color="white" style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>

        {/* Instellingen opties */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Account')}>
            <MaterialIcons name="account-circle" size={24} color="black" />
            <Text style={styles.optionText}>Account</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Privacy')}>
            <MaterialIcons name="security" size={24} color="black" />
            <Text style={styles.optionText}>Privacy</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name="notifications" size={24} color="black" />
            <Text style={styles.optionText}>Notificaties</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 120, // Verhoogd om alles verder naar beneden te schuiven
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Voeg kleur toe
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
     // Verander de tekstkleur naar wit
  },
  logoutIcon: {
    marginLeft: 5,
    color: 'black'
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
