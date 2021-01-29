/**
 * @format
 */

import firebase, {ReactNativeFirebase} from '@react-native-firebase/app';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const firebaseConfig: ReactNativeFirebase.FirebaseAppOptions = {
  appId: '1:889257921512:android:b3e2f831e9ccd4b0a5f25d',
  projectId: 'meanChallenge',
  apiKey:
    'AAAAzwvnC-g:APA91bElIhHiygwEbEujhA5hpegdbXYsV-q_ZncwRgoR7OHwOd9tglUmiY6V3939htL168C8tDcNoi8NdxxNZStaE2vxOMX8mutj0uFM4crtElTy2F-xiGje8YgkJQT-__KjjOlFpfOb',
  databaseURL: 'https://meanchallenge-default-rtdb.firebaseio.com/',
  messagingSenderId: '889257921512',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
