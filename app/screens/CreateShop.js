import React, { Component } from 'react';
import Meteor from 'react-native-meteor';
import {checkPermission} from 'react-native-android-permissions';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
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

export default class CreateShop  extends Component {
  constructor() {
    super();
    this.state = {
      userid:'',
      sname:'',
      sadd: '',
      scode: '',
      image: '',
      userdetail: '',
      latitude: '',
      longitude: '',
      country: '',
      states: '',
      city: '',
      pc:'',
    }
  }

  componentWillMount(){

    let keys =['user_id','user_addr','user_city','user_country','user_createdAt','user_email','user_image','user_lat','user_long',
                'user_name','user_number','user_password','user_pc','user_states','user_status',];
                let userdetail = {};
          AsyncStorage.multiGet(keys, (err, result) => {
                    if (result) {
                      result.map((res)=>{
                        let mykey= res[0].split('_');
                        if (mykey[1]=== 'id') {
                          userdetail['_id'] = res[1];
                            this.setState({userid:res[1]})
                        }else {
                          userdetail[mykey[1]] = res[1];
                        }
                        this.setState({userdetail})
                      })
                    }
          })

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


  handleShopCreation(props){
    const sname =this.state.sname.trim();
    const sadd = this.state.sadd.trim();
    const scode = this.state.scode.trim();

    if (sname === '') {
      ToastAndroid.show('Shop name is empty', ToastAndroid.SHORT);
      return false;
    }
    if (sadd === '') {
      ToastAndroid.show('Shop address is empty', ToastAndroid.SHORT);
      return false;
    }
    if (scode === '') {
      ToastAndroid.show('Shop CODE/GSTIN is empty', ToastAndroid.SHORT);
      return false;
    }
    let shop ={
        userid:this.state.userid,
        userdetail:this.state.userdetail,
        sname,
        sadd,
        scode,
        image:'',
        lat:this.state.latitude,
        long:this.state.longitude,
        country:'',
        states:'',
        city:'',
        pc:'',
        }
        Meteor.call('shop.check',this.state.userid,(err,res)=>{
            if (res) {
              ToastAndroid.show('Your Shop has already created', ToastAndroid.SHORT);
              AsyncStorage.setItem('shop_id',res._id);
              AsyncStorage.setItem('shop_city',res.city);
              AsyncStorage.setItem('shop_country',res.country);
              AsyncStorage.setItem('shop_createdAt',res.createdAt.toString());
              AsyncStorage.setItem('shop_image',res.image);
              AsyncStorage.setItem('shop_lat',res.lat.toString());
              AsyncStorage.setItem('shop_long',res.long.toString());
              AsyncStorage.setItem('shop_pc',res.pc);
              AsyncStorage.setItem('shop_sadd',res.sadd);
              AsyncStorage.setItem('shop_scode',res.scode);
              AsyncStorage.setItem('shop_sname',res.sname);
              AsyncStorage.setItem('shop_states',res.states);
              AsyncStorage.setItem('shop_status',res.status.toString());
              AsyncStorage.setItem('shop_userid',res.userid);
              props.navigation.navigate('Login');
            }else {
              Meteor.call('shop.insert',shop,(error,result)=>{
                console.log(error);
                console.log(result);
                if (!error) {
                }
              })
            }
          })

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
           placeholder="Shop Name"
           onChangeText={(sname) => this.setState({sname})}
           underlineColorAndroid="transparent"
           value={this.state.sname}
           />

         <TextInput
           style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
           placeholder="Shop Address"
           onChangeText={(sadd) => this.setState({sadd})}
           underlineColorAndroid="transparent"
           value={this.state.sadd}
          />

          <TextInput
            style={{height: 40,width:sixtypercent,borderWidth:1,borderRadius:5,zIndex:2,margin:5,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
            placeholder="Shop Code /GSTIN"
            onChangeText={(scode) => this.setState({scode})}
            underlineColorAndroid="transparent"
            value={this.state.scode}
           />



            <Button
              onPress={this.handleShopCreation.bind(this,this.props)}
              title="Create Shop"
              style={{margin:5}}
            />
      </View>
      </View>
    );
  }
}
