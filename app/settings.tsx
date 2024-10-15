import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export default function Settings() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the saved profile image from AsyncStorage when the component mounts
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error('Failed to load profile image:', error);
      }
    };

    loadProfileImage();
  }, []);

  // Function to handle image picking
  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    // Let user pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;

      // Move the selected image to the app's FileSystem directory
      const newPath = `${FileSystem.cacheDirectory}${imageUri.split('/').pop()}`;
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });

      // Save the new image path locally
      setProfileImage(newPath);
      await AsyncStorage.setItem('profileImage', newPath);
      console.log('Image saved locally:', newPath);
    }
  };

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
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../assets/images/KevinVierhuis.jpg')} // Show the picked image if available
                style={styles.profileImage}
              />
              <Text style={styles.changePhotoText}>Change Photo</Text> {/* Text to show user they can press */}
            </TouchableOpacity>
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
              <View style={styles.optionContent}>
                <MaterialIcons name="account-circle" size={24} color="black" />
                <Text style={styles.optionText}>Account</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push('./privacy')}>
              <View style={styles.optionContent}>
                <MaterialIcons name="security" size={24} color="black" />
                <Text style={styles.optionText}>Privacy</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push('./notifications')}>
              <View style={styles.optionContent}>
                <MaterialIcons name="notifications" size={24} color="black" />
                <Text style={styles.optionText}>Notificaties</Text>
              </View>
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
  changePhotoText: {
    fontSize: 14,
    color: 'white',
    textDecorationLine: 'underline', // To make it clear the photo can be changed
    marginTop: 5,
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
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
