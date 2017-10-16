/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import App from './app/App';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';



export default class socialshop extends Component {
  render() {
    return (
      <App />
    );
  }
}
AppRegistry.registerComponent('socialshop', () => socialshop);
