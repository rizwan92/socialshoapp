
import React, { Component } from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterationScreen from './screens/RegisterationScreen';
import ProfileScreen from './screens/ProfileScreen';
import Meteor from 'react-native-meteor';
import settings from './settings';
Meteor.connect(settings.METEOR_URL);
  const MyNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    Registeration: { screen: RegisterationScreen },
    Profile: { screen: ProfileScreen },
  });

export default class App extends Component {
  render() {
    return (
      <MyNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
