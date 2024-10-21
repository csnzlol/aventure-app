import React from 'react';
import { View, Text, Switch, StyleSheet, ImageBackground } from 'react-native';

export default function Notifications() {
  const [isNotificationEnabled, setIsNotificationEnabled] = React.useState(false);

  const toggleSwitch = () => {
    setIsNotificationEnabled((previousState) => !previousState);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/osiris_achtergrond.jpg')} 
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isNotificationEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isNotificationEnabled}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 242, 242, 0.8)', // Voeg een lichte achtergrondkleur toe met transparantie
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Zorg ervoor dat de tekst zichtbaar is op de achtergrond
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  settingText: {
    fontSize: 18,
    color: '#000', // Zorg ervoor dat de tekst zichtbaar is op de achtergrond
  },
});