import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false); // Track if image is updated
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('user_email');
        const savedProfileImage = await AsyncStorage.getItem('profile_image'); // Fetch saved profile image URI

        if (email) {
          const response = await fetch(`http://35.180.43.172/api/getUser.php?email=${email}`);
          const data = await response.json();
          if (response.ok) {
            setUserName(data.name);
            setUserEmail(data.email);
            setProfileImage(savedProfileImage || null); // Set profile image from local storage
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Image Picker to allow the user to change profile picture
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Toestemming voor toegang tot galerie is vereist!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
      setImageChanged(true); // Mark that the image was changed
    }
  };

  // Save profile updates, including storing the profile image locally
  const handleSaveProfile = async () => {
    try {
      const email = await AsyncStorage.getItem('user_email');
      if (!email) {
        Alert.alert('Error', 'Gebruiker niet ingelogd');
        return;
      }

      // Save the updated profile image URI locally
      if (imageChanged && profileImage) {
        await AsyncStorage.setItem('profile_image', profileImage); // Save profile image URI locally
      }

      // Save other profile details
      const response = await fetch('http://13.38.96.31/api/updateUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Alert.alert('Success', 'Profiel succesvol bijgewerkt!');
        router.push('/account'); // Ga terug naar accountinstellingen
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('FProfiel niet bijgewerkt:', error);
      Alert.alert('Error', 'Profiel niet bijgewerkt');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/osiris_achtergrond.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          {/* Profile Image */}
          <TouchableOpacity onPress={handlePickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/images/KevinVierhuis.jpg')} style={styles.profileImage} />
            )}
            <Text style={styles.changePhotoText}>Wijzig Profielfoto</Text>
          </TouchableOpacity>

          {/* Name Field */}
          <Text style={styles.label}>Naam</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Voer je naam in"
            placeholderTextColor="#A9A9A9"
          />

          {/* Email Field */}
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="Voer je e-mail in"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Opslaan</Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f6f6f6',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
