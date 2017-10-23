import Meteor from 'react-native-meteor';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TextInput,
} from 'react-native';
import {checkPermission} from 'react-native-android-permissions';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


export default class RegisterationScreen extends Component {
  constructor(props){
    super(props);
     this.state = {
       name: '',
       email: '',
       number: '',
       password: '',
       cpassword: '',
       latitude: '',
       longitude: '',
       error: '',
     };
  }

  componentWillMount(){

          checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {

            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                 message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                 ok: "YES",
                 cancel: "NO",
                 enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
                 showDialog: true, // false => Opens the Location access page directly
                 openLocationServices: true // false => Directly catch method is called if location services are turned off
             }).then(function(success) {

               navigator.geolocation.getCurrentPosition(
                  (position) => {
                     this.setState({ latitude:position.coords.latitude,longitude:position.coords.longitude });
                  },
                  (error) => console.log(error.message),
               );

                 }.bind(this)
             ).catch((error) => {
                 console.log(error.message);
             });



          }, (result) => {

          });

  }


  handleRegistration(){
    const name = this.state.name.trim();
    const email =this.state.email.trim();
    const number = this.state.number.trim();
    const password = this.state.password.trim();
    const cpassword = this.state.cpassword.trim();

    if (name === '') {
      this.setState({error:`Name field is empty`})
      return false;
    }
    if (email === '') {
      this.setState({error:`Email field is empty`})
      return false;
    }
    if (number === '') {
      this.setState({error:`Number field is empty`})
      return false;
    }

    if (password === cpassword && password != '' && cpassword != '') {
      Meteor.call('user.check',email,password,(err,res)=>{
        if (res) {
          this.setState({error:`Email Already Exist`,password:'',cpassword:''})
        }else {
          const user={
            name,email,number,password,image:'',lat:this.state.latitude,long:this.state.longitude,addr:'',country:'',states:'',city:'',pc:'',
          }
            Meteor.call('user.insert',user,(error1,result1)=>{
              if (error1) {
                this.setState({error:error1})
              }
              if (result1) {
                this.setState({error:`Registeration Successfull now click on login below`,
                  password:'',
                  cpassword:'',
                  name:'',
                  email:'',
                  number:'',
                })
              }
            })
        }
      })
    }else {
      this.setState({error:`password doesn't match`})
    }


  }

  render() {
    var {height, width} = Dimensions.get('window');
    let sixtypercent = width*60/100;
    return (
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
           placeholder="Name"
           onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            keyboardType="default"
           underlineColorAndroid="transparent"
           />

         <TextInput
           style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
           placeholder="Email"
           onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            keyboardType="email-address"
           underlineColorAndroid="transparent"
          />

         <TextInput
           style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
           placeholder="Number"
           onChangeText={(number) => this.setState({number})}
            value={this.state.number}
            keyboardType="numeric"
           underlineColorAndroid="transparent"
          />

          <TextInput
            style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
             value={this.state.password}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
           />
           <TextInput
             style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
             placeholder="Confirm Password"
             onChangeText={(cpassword) => this.setState({cpassword})}
              value={this.state.cpassword}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
            />

            <Button
              onPress={this.handleRegistration.bind(this)}
              title="Register"
              style={{margin:5}}
            />
      </View>
      </View>
    );
  }
}
