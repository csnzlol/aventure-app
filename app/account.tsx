import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Settings</Text>
      {/* Voeg hier notificatie-instellingen toe */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
