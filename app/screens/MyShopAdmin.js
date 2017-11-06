import React, { Component } from 'react';
import Meteor, { connectMeteor } from 'react-native-meteor';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';

 class MyShopAdmin extends Component {
   constructor() {
     super();
     this.state = {
       user_id:'',
       shop_id:'',
       shop_image:'',
       shop_sadd:'',
       shop_scode:'',
       shop_sname:''
      }
   }

  static navigationOptions = ({ navigation }) => ({
     title: 'Admin',
     headerTitleStyle:{
       color:'white'
     },
     headerStyle:{
       backgroundColor:'#229bdc'
     },
   });

   getMeteorData() {
     const handle = Meteor.subscribe('visit');
     const handle1 = Meteor.subscribe('productMaster');
   return {
     visits: Meteor.collection('visit').findOne({shopid:this.state.shop_id}),
     products: Meteor.collection('productMaster').find({shopid:this.state.shop_id}),
   };
 }
  render() {
      const { visits } = this.data;
      const { products } = this.data;
    var {height, width} = Dimensions.get('window');
    var seventypercent = width *70/100;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Image source={this.state.shop_image == '' ? require('../images/noi.jpg') : {uri:this.state.shop_image}} style={{width:"100%", height:seventypercent}} />

        <View style={{display:'flex',padding:2}}>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'blue',fontSize:15}}>{this.state.shop_sname} </Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: '#5dac48',fontSize:13}}>{this.state.shop_sadd}</Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'black',fontSize:13}}>{this.state.user_email}</Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'black',fontSize:13}}>{this.state.user_number}</Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'black',fontSize:13}}>{this.state.shop_scode}</Text>
          </View>
        </View>


        <View style={{display:'flex',flexDirection:'row',height:40,justifyContent:'space-between',alignItems:'center',padding:2,borderTopWidth:0.5,borderBottomWidth:0.5}}>
          <View style={{display:'flex',flexDirection:'row'}}>
          <Text>Last Visit : {visits == undefined ? null: moment(visits.createdAt).fromNow()} </Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text>{visits == undefined ? null: visits.visit}</Text>
          <Image source={require('../images/ic_visibility_black_24dp_1x.png')} style={{marginRight:5,marginLeft:5}} />
          </View>
        </View>


        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',padding:2,margin:5}}>
          <Button
            onPress={() => {}}
            title="Messenger"
          />
          <Button
            onPress={() => {}}
            title="Whatsapp"
            color="green"
          />
        </View>


        <View>
           {
          products.length == 0 ? null :
          <View style={{display:'flex',flexDirection:'row',flex:1,flexWrap:'wrap',marginTop:10,marginLeft:5,marginRight:5,justifyContent:'center',borderStyle:'solid'}}>
          {
          products.map((product,i)=>{
            let cardheight = height/3;
            let halfcard = cardheight/1.3;
            return(
              <View key={i} style={[styles.cardContainer,{flexBasis:width/2.2,height:height/2.5}]}>
              <TouchableWithoutFeedback onPress={()=>navigate('MyProduct',{product:product})}>
              <Image source={product.image == '' ? require('../images/noi.jpg') : {uri:product.image}} style={{width:"100%", height:halfcard}} />
              </TouchableWithoutFeedback>
              <Text style={{paddingLeft:5,fontSize:15,color:'blue'}} onPress={()=>navigate('MyProduct',{product:product}  )}>{product.name}</Text>
              <Text style={{paddingLeft:5,fontSize:11,color:'green'}}>Price: ₹ {product.sellprice} </Text>
              <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Discount {product.discount} %</Text>
              <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Tax {product.tax ? product.tax : 0} %</Text>
              <Text style={{paddingLeft:5,fontSize:11,color:'black'}}>Stock {product.stock}</Text>
              </View>
            )
          })
          }
          </View>
        }
        </View>


      </ScrollView>
    );
  }
}
connectMeteor(MyShopAdmin);
 export default MyShopAdmin;
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
});
