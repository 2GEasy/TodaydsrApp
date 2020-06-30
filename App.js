/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import NavigationController from './NavigationController';
import Axios from 'axios';
const App = () => {

  messaging().onMessage(async remoteMessage => {
    Alert.alert(remoteMessage.data.title,remoteMessage.data.message);
    
  });
  return (
    <>
      <View style={styles.container} >
        <NavigationController />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    // alignItems: 'center',
    
    flexDirection:'column'
  }
});

export default App;
