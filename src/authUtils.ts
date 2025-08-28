import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function signIn() {
      const userInfo = await GoogleSignin.signIn();
      console.log('Google user info:', userInfo);
      const { data } = userInfo;
      const { idToken, user } = data; 
  const res = await fetch('http://127.0.0.1:8000/auth/google', {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}` },
  });

  if (!res.ok) throw new Error('Login failed');

  const authData = await res.json();
  await AsyncStorage.setItem('access_token', authData.access_token); // store your JWT
  return authData.user;
}

export async function getMe() {
  const jwt = await AsyncStorage.getItem('access_token');
  console.log("jwt: ",jwt)
  const res = await fetch('http://127.0.0.1:8000/me', {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  console.log("FrontEnd Unauthorized")
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function signOut() {
  await GoogleSignin.signOut();
  await AsyncStorage.removeItem('access_token');
}
