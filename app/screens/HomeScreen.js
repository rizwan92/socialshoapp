
import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

class HomeScreen extends Component {
  constructor(props){
    super(props);
     this.state = {text: ''};
  }

  render() {
    const { navigate } = this.props.navigation;

    var {height, width} = Dimensions.get('window');
    let searchshps = this.props.shops.filter((shop)=>{
    return(shop.sname.toLowerCase().indexOf(this.state.text.toLowerCase()) !==-1)
  })
    return (
      <ScrollView style={styles.container}>
      <View style={{padding: 10}}>
        <TextInput
             style={{height: 40,borderWidth:1,borderRadius:5,zIndex:2,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
             placeholder="Search Local Shops By Name..."
             onChangeText={(text) => this.setState({text})}
             underlineColorAndroid="transparent"
           />
      </View>

      {this.props.todosReady ? <Text  style={styles.item}>Wait</Text>
      :
      <View>
         {
        this.props.shops.length == 0 ? null :
        <View style={{display:'flex',flexDirection:'row',flex:1,flexWrap:'wrap',marginTop:10,marginLeft:5,marginRight:5,justifyContent:'center',borderStyle:'solid'}}>
        {
        searchshps.map((shop,i)=>{
          let cardheight = height/3;
          let halfcard = cardheight/1.3;
          return(
            <View key={i} style={[styles.cardContainer,{flexBasis:width/2.2,height:height/2.5}]}>
            <TouchableWithoutFeedback onPress={()=>navigate('MyShop',{shop:shop})}>
            <Image source={shop.image == '' ? require('../images/noi.jpg') : {uri:shop.image}} style={{width:"100%", height:halfcard}} />
            </TouchableWithoutFeedback>
            <Text style={{paddingLeft:5,fontSize:15,color:'blue'}} onPress={()=>navigate('MyShop',{shop:shop})}>{shop.sname}</Text>
            <Text style={{paddingLeft:5,fontSize:11,color:'green'}}>Email: {shop.userdetail.email}</Text>
            <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Contact: {shop.userdetail.number}</Text>
            <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>GSTIN: {shop.scode}</Text>
            <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Addres: {shop.sadd}</Text>
            </View>
          )
        })
        }
        </View>
      }
      </View>
      }
      </ScrollView>
    );
  }
}
export default createContainer(params=>{
  const handle = Meteor.subscribe('shop');
  return {
    todosReady: !handle.ready(),
    shops: Meteor.collection('shop').find(),
  };
}, HomeScreen)

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: 'white',
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
