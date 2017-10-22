  import React, { Component } from 'react';
  import {
    StyleSheet,
    Text,
    View,
    Button,
    Switch,
    Dimensions,
    ScrollView,
    Image,
    BackHandler,
  } from 'react-native';
  import Meteor, { createContainer } from 'react-native-meteor';
  import {checkPermission} from 'react-native-android-permissions';
  import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


  class NearByScreen extends Component {
    constructor(){
      super();
      this.state={
        latitude:'',
        longitude:'',
        distance:10,
      }
    }
    static navigationOptions = {
      title:'Shopbook',
      headerTitleStyle:{
        color:'white'
      },
      headerStyle:{
        backgroundColor:'#229bdc'
      },
    }
    watchID: ?number = null;

    componentWillMount(){

    }

    componentDidMount () {

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
              (error) => alert(error.message),
           );

             }.bind(this)
         ).catch((error) => {
             console.log(error.message);
         });



      }, (result) => {

      });
       this.watchID = navigator.geolocation.watchPosition((position) => {
          const lastPosition = JSON.stringify(position);
          this.setState({ lastPosition });
       });
    }
    componentWillUnmount  ()  {
       navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
      var {height, width} = Dimensions.get('window');
      function rad (x) { return x * Math.PI / 180 }
      function haversine(p1, p2) {
       var R = 6371
       var dLat  = rad(p2.lat - p1.lat)
       var dLong = rad(p2.lng - p1.lng)
       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2)
       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
       var d = R * c
       return Math.round(d)
      }

      let nearbyshops = this.props.shops.filter((shop)=>{
      if (this.state.latitude && this.state.longitude) {
        let latLngA = {lat:  parseFloat(this.state.latitude), lng:parseFloat(this.state.longitude)}
        let latLngB = {lat:  parseFloat(shop.lat), lng:parseFloat(shop.long)}
        if ( haversine(latLngA, latLngB) <= parseFloat(this.state.distance)) {
          return (shop.distance=haversine(latLngA, latLngB));
        }
      }})


       return (
         <ScrollView style={styles.container}>
         <GooglePlacesAutocomplete
            placeholder='Search Your Local Shops By Place...'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed='auto'
            fetchDetails={true}
            renderDescription={(row) => row.description}
            onPress={(data, details = null) => {
              console.log(details);
                  this.setState({
                    latitude:details.geometry.location.lat,
                    longitude:details.geometry.location.lng,
                  },()=>{console.log(this.state);})
            }}
            getDefaultValue={() => {
              return '';
            }}
            query={{
              key: 'AIzaSyAGAoS2tRhQ6ODzrSWjOobwjGvZkNsd0kE',
              language: 'en',
            }}
            styles={{
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            currentLocation={true}
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={200}
          />
         {this.props.todosReady ? <Text  style={styles.item}>Wait{this.state.latitude+ '  ' +this.state.longitude}</Text>
         :
         <View>
         {
           nearbyshops.length == 0 ? <Text>No Shop Available At Your Place Right Now Try some other places</Text> :
           <View style={{display:'flex',flexDirection:'row',flex:1,flexWrap:'wrap',marginTop:10,marginLeft:5,marginRight:5,justifyContent:'center',borderStyle:'solid'}}>
           {
           nearbyshops.map((shop,i)=>{
             let cardheight = height/3;
             let halfcard = cardheight/1.3;
             return(
               <View key={i} style={[styles.cardContainer,{flexBasis:width/2.2,height:height/2.5}]}>
               <Image source={shop.image == '' ? require('../images/noi.jpg') : {uri:shop.image}} style={{width:"100%", height:halfcard}} />
               <Text style={{paddingLeft:5,fontSize:13,color:'blue'}}>{shop.sname}</Text>
               <Text style={{paddingLeft:5,fontSize:11,color:'green'}}>Email: {shop.userdetail.email}</Text>
               <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Contact: {shop.userdetail.number}</Text>
               <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>GSTIN: {shop.scode}</Text>
               <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Addres: {shop.sadd}</Text>
               <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Distance: {shop.distance} Km.</Text>
               </View>
             )
           })
           }
           </View>
         }
         </View>
         }
         </ScrollView>
       )
     }
    }


    export default createContainer(params=>{
      const handle = Meteor.subscribe('shop');
      return {
        todosReady: !handle.ready(),
        shops: Meteor.collection('shop').find(),
      };
    }, NearByScreen);

    const styles = StyleSheet.create({
      container: {
       flex: 1,
        backgroundColor: '#F5FCFF',
      },
      cardContainer:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 5,
        padding:1,
        borderWidth:0.5,
        backgroundColor: "#fff",
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.7,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0.3,
        },
    },
    darkText: {
       color: 'rgba(0 ,0 ,0 , 0.87)'
     },
     lightText: {
       color: 'rgba(255 ,255 ,255 , 0.87)'
     },
    })
