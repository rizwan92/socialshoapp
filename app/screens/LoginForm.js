import React, { Component } from 'react';
import Meteor from 'react-native-meteor';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TextInput,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';

export default class LoginForm  extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }
  handleLogin(props){
    const email =this.state.email.trim();
    const password = this.state.password.trim();

    if (email === '') {
      this.setState({error:`Email field is empty`})
      return false;
    }
    if (password === '') {
      this.setState({error:`Password field is empty`})
      return false;
    }

        Meteor.call('user.check',email,password,(err,res)=>{
          if (res) {
           AsyncStorage.setItem('user_id',res._id);
              Meteor.call('shop.check',res._id,function (error,result){
                if (result) {
                  AsyncStorage.setItem('shop_id',result._id);
                  props.navigation.navigate('Admin');
                }else {
                  props.navigation.navigate('Login');
                }
              });
          }else {
            ToastAndroid.show('Wrong Email and Password', ToastAndroid.SHORT);
          }
        }
        )
        this.setState({
         password:'',
        });
  }

  render(){
    var {height, width} = Dimensions.get('window');
    let sixtypercent = width*60/100;

    return(
      <View >

      <View style={{shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',margin:5}}>
      <Text style={{color:'black',fontSize:15}}>To Register Your Shop You need to Signup and then Login</Text>
      </View>

      <View style={{shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',margin:5}}>
      <Text style={{color:'red',fontSize:13}}>{this.state.error}</Text>
      </View>

      <View style={{justifyContent:'center',alignItems:'center'}}>

        <TextInput
           style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,color:'black'}}
           placeholder="email"
           onChangeText={(email) => this.setState({email})}
           underlineColorAndroid="transparent"
           value={this.state.email}
           />

         <TextInput
           style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
           placeholder="password"
           onChangeText={(password) => this.setState({password})}
           underlineColorAndroid="transparent"
           secureTextEntry={true}
           value={this.state.password}
          />


            <Button
              onPress={this.handleLogin.bind(this,this.props)}
              title="Login"
              style={{margin:5}}
            />
      </View>
      </View>
    );
  }
}
