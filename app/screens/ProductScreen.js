
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ProductScreen extends Component {
    static navigationOptions = {
  title: 'Product',
  heder:true,
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('../images/ic_near_me_white_24dp_1x.png')}
      style={[styles.icon, {tintColor: tintColor}]}
    />
  ),
  };

  render() {
    return (
      <View style={{display:'flex',flex:1,backgroundColor:'#229bdc'}}>

        <View style={{backgroundColor:'#229bdc',shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white',fontSize:20}}>Searching Products Near Your Area is not available right now we are still working on that</Text>
        </View>
      </View>
    );
  }
}
