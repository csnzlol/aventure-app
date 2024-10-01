import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      {/* Button to navigate to Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>
      
      {/* Button to navigate to Register */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.loginButtonText}>Go to Register</Text>
      </TouchableOpacity>

      {/* Button to navigate to Account Recovery */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/passwordrecovery')}
      >
        <Text style={styles.loginButtonText}>Account Herstel</Text>
      </TouchableOpacity>

      {/* Button to navigate to th  */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/passwordrecovery')}
      >
        <Text style={styles.loginButtonText}>Account Herstel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});