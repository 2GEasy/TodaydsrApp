/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
import {navigationRef} from './RootNavigation';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
console.disableYellowBox = true;

import NavigationController from './NavigationController';
import Axios from 'axios';

// const Stack = createStackNavigator();

const App = () => {
  // const navigation = useNavigation();    
  messaging().onMessage(async remoteMessage => {
    Alert.alert(remoteMessage.data.title,remoteMessage.data.message);
    
  });
  useEffect(()=>{
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigationRef.current(remoteMessage.data.url);
    });

  },[])
  // messaging()
  // .getInitialNotification()
  // .then(remoteMessage => {
  //   if (remoteMessage) { 
  //     console.log(
  //       'Notification caused app to open from quit state:',
  //       remoteMessage.notification,
  //     );
  //     setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //   }
  // });
  return (
    <>
      <View style={styles.container} >
        <NavigationController ref={navigationRef}/>
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
