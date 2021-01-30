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
//import messaging from '@react-native-firebase/messaging';
import dynamic from '@react-native-firebase/dynamic-links';

import {postNotification} from './services/api';
import {Notification, Notifications} from 'react-native-notifications';

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  const getUserNameFromLink = (link: string) =>
    link.substring(link.lastIndexOf('/') + 1, link.indexOf('?'));

  dynamic().onLink((l) => setUsername(getUserNameFromLink(l.url)));

  useEffect(() => {
    dynamic()
      .getInitialLink()
      .then((l) => {
        if (l && l.url) {
          setUsername(getUserNameFromLink(l.url));
        }
      });

    Notifications.events().registerNotificationReceivedForeground(
      (notification) => {
        const payload = notification.payload as any;

        const notificationData: Notification = {
          body: payload['gcm.notification.body'],
          title: payload['gcm.notification.title'],
          identifier: notification.identifier,
          sound: payload['gcm.notification.sound'],
          badge: 1,
          payload: {},
          thread: '',
          type: 'normal',
        };

        Notifications.postLocalNotification(notificationData);
      },
    );
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
                postNotification(username);
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
    maxWidth: '80%',
    alignSelf: 'center',
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
