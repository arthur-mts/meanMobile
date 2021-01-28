/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, Text, StatusBar, Button} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    messaging()
      .subscribeToTopic('allApps')
      .then(() => console.log('Subscibed'));

    messaging().onMessage(console.log);

    messaging()
      .getToken()
      .then((token) => console.log('My token :' + token));
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Heelp</Text>
        <Button
          title="Click me"
          onPress={() => {
            console.log('send message');
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
