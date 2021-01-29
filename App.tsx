/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import dynamic from '@react-native-firebase/dynamic-links';

import {postNotification} from './services/api';

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  const getUserNameFromLink = (link: string) =>
    link.substring(link.lastIndexOf('/') + 1, link.indexOf('?'));

  dynamic()
    .getInitialLink()
    .then((l) => {
      if (l && l.url) {
        setUsername(getUserNameFromLink(l.url));
      }
    });

  dynamic().onLink((l) => setUsername(l.url));

  useEffect(() => {
    messaging()
      .subscribeToTopic('allApps')
      .then(() => console.log('Subscibed'));

    messaging()
      .getToken()
      .then((token) => console.log('My token :' + token));
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {username ? (
          <>
            <Text style={styles.headerText}>This page is for {username}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('send message');
                postNotification('arthur');
              }}>
              <Text style={styles.buttonText}>
                Send notification to {username}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.headerText}>Nothing to see here</Text>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 12,
    marginTop: 24,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
