
import React, { Component } from 'react';
import { StyleSheet,Text,View,Image ,TouchableHighlight} from 'react-native';
import { StackNavigator ,NavigationActions} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterationScreen from './screens/RegisterationScreen';
import ProfileScreen from './screens/ProfileScreen';
import NearByScreen from './screens/NearByScreen';
import AboutUs from './screens/AboutUs';
import MyShop from './screens/MyShop';
import MyProduct from './screens/MyProduct';
import Meteor from 'react-native-meteor';
import settings from './settings';
Meteor.connect(settings.METEOR_URL);
  handleevent=()=>{

  }
  const Headerrigth =({navigation})=>{
    const { navigate } = navigation;
    return(
      <View style={{display:'flex',flexDirection:'row'}}>
          <TouchableHighlight onPress={()=>{navigate('AboutUs')}}>
              <Image
              source={require('./images/ic_contacts_white_24dp_1x.png')}
              style={{marginRight:20}}/>
            </TouchableHighlight>
          <TouchableHighlight onPress={()=>{navigate('NearBy')}}>
              <Image
              source={require('./images/ic_near_me_white_24dp_1x.png')}
              style={{marginRight:20}}/>
          </TouchableHighlight>
      </View>
        )
  }
  const MyNavigator = StackNavigator({
    Home: {
           screen: HomeScreen,
           navigationOptions: ({navigation}) => ({
             title:'Shopbook',
             headerTitleStyle:{
               color:'white'
             },
             headerStyle:{
               backgroundColor:'#229bdc'
             },
             headerRight:<Headerrigth navigation={navigation}/>,
           }),
       },
    Login: {
        screen: LoginScreen
      },
    Registeration: {
         screen: RegisterationScreen
      },
    Profile: {
        screen: ProfileScreen
     },
    MyShop: {
         screen: MyShop
      },
    MyProduct: {
         screen: MyProduct
      },
    AboutUs: {
         screen: AboutUs,
        navigationOptions: ({navigation}) => ({
          title:'About Us',
          headerTitleStyle:{
            color:'white'
          },
          headerStyle:{
            backgroundColor:'#229bdc'
          },
        }),
     },
    NearBy: {
        screen: NearByScreen,
        navigationOptions: ({navigation}) => ({
          title:'NearBy',
          headerTitleStyle:{
            color:'white'
          },
          headerStyle:{
            backgroundColor:'#229bdc'
          },
          headerLeft:null,
        }),
     },
  });

export default class App extends Component {
  someEvent() {
  this.navigator && this.navigator.dispatch(
    NavigationActions.navigate({ Home: Home })
  );
}
  render() {
    return (
      <MyNavigator ref={nav => { this.navigator = nav; }} />
    );
  }
}
