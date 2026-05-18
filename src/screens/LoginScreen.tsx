import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@hooks/useAuth';
import { LoginRequest } from '@models/Auth';
import { Colors } from '@utils/common';

export default function LoginScreen() {
  const { login, error, loading } = useAuth();
  const credentialList: LoginRequest[] = [
    { username: 'emilys', password: 'emilyspass' },
    { username: 'michaelw', password: 'michaelwpass' },
  ];

  const [errMsg, setErrMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoPress = (credential: LoginRequest) => {
    setUsername(credential.username);
    setPassword(credential.password);
  };

  const handleLogin = () => {
    if (!username.trim()) {
      setErrMsg('Username is required');
      return;
    }

    if (!password.trim()) {
      setErrMsg('Password is required');
      return;
    }

    setErrMsg('');
    login(username.trim(), password.trim());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Recipe Book</Text>
          <Text style={styles.subtitle}>Sign in to manage your recipes</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Username"
              mode="outlined"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              activeOutlineColor={Colors.primary}
              style={styles.input}
            />

            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              activeOutlineColor={Colors.primary}
              style={styles.input}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
            {errMsg ? <Text style={styles.error}>{errMsg}</Text> : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {loading ? (
              <ActivityIndicator color={Colors.primary} style={styles.loader} />
            ) : null}
          </Card.Content>
        </Card>

        {credentialList.map(credential => (
          <Pressable
            key={credential.username}
            onPress={() => handleDemoPress(credential)}
            style={styles.demoBox}
          >
            <Text style={styles.demoTitle}>Tap to use demo account</Text>
            <Text style={styles.demoText}>Username: {credential.username}</Text>
            <Text style={styles.demoText}>Password: {credential.password}</Text>
          </Pressable>
        ))}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    elevation: 4,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  buttonContent: {
    height: 50,
  },
  loader: {
    marginTop: 16,
  },
  error: {
    color: Colors.danger,
    marginBottom: 12,
    textAlign: 'center',
  },
  demoBox: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
  },
  demoTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  demoText: {
    color: Colors.textSecondary,
  },
});
