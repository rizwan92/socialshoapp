import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
export class HeaderRight extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
      <Image
          source={require('../images/ic_near_me_white_24dp_1x.png')}
          style={{marginRight:15}}/>
      </View>
    )
  }
}
