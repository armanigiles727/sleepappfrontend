/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Button,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { getMe, signIn, signOut } from './src/authUtils';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const IOS_CLIENT_ID =
    '367244143502-134j94jrrb8fjnk7c3miv6p8n2jqumms.apps.googleusercontent.com'; // paste yours

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: IOS_CLIENT_ID, // iOS client from Step 5
      // do NOT set webClientId since you’re forbidding web tokens
      scopes: ['email', 'profile'], // optional
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LoginScreen />
      <SignOutButton />
    </View>
  );
}

function LoginScreen() {
  // const handleLogin = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('Google user info:', userInfo);
  //     const { data } = userInfo;
  //     const { idToken, user } = data;

  //     const res = await fetch('http://127.0.0.1:8000/auth/google', {
  //       method: 'POST',
  //       headers: { Authorization: `Bearer ${idToken}` },
  //     });

  //     if (!res.ok) throw new Error('Login failed');

  //     const session = await res.json();
  //     console.log('✅ User logged in:', user.email, session);
  //   } catch (err) {
  //     console.error('❌ Error signing in:', err);
  //   }
  // };

  return <Button title="Sign in with Google" onPress={() => signIn()} />;
}

function SignOutButton() {
  return <Button title="Sign Out with Google" onPress={signOut} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default App;
