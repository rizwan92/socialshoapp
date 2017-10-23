
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AboutUs extends Component {
    static navigationOptions = {
  title: 'AboutUs',
  heder:true,
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('../images/ic_near_me_white_24dp_1x.png')}
      style={{tintColor: tintColor}}
    />
  ),
  };

  render() {
    return (
      <View style={{display:'flex',flex:1,backgroundColor:'#229bdc'}}>

        <View style={{height:60,backgroundColor:'#229bdc',shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white',fontSize:20}}>Shopbook</Text>
        </View>

        <View style={{backgroundColor:'#229bdc',shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,padding:5}}>
        <Text style={{color:'white',fontSize:15}}> If you have Any Business, Shop or Store then Registere Your self at our website and after registeration logged in You will see an option at header `"Create Shop"` click on it and fill the details and your are done  </Text>
        </View>
      </View>
    );
  }
}
