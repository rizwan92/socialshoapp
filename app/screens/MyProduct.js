import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

export default class MyProduct extends Component {
  static navigationOptions = ({ navigation }) => ({
     title: `${navigation.state.params.product.name}`,
     headerTitleStyle:{
       color:'white'
     },
     headerStyle:{
       backgroundColor:'#229bdc'
     },
   });
  render() {
    var {height, width} = Dimensions.get('window');
    var seventypercent = width *70/100;
    return (
      <ScrollView style={styles.container}>
        <Image source={this.props.navigation.state.params.product.image == '' || this.props.navigation.state.params.product.image == null ? require('../images/noi.jpg') : {uri:this.props.navigation.state.params.product.image}} style={{width:"100%", height:seventypercent}} />

        <View style={{display:'flex',padding:2}}>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: '#d75229',margin:2,fontSize:20}}>Product Name : {this.props.navigation.state.params.product.name} </Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: '#5dac48',margin:2,fontSize:18}}>Price: ₹ {this.props.navigation.state.params.product.sellprice}</Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'black',margin:2,fontSize:18}}>Discount: {this.props.navigation.state.params.product.discount}%</Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'black',margin:2,fontSize:18}}>Tax: {this.props.navigation.state.params.product.tax}%</Text>
          </View>

          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Text style={{color: 'black',margin:2,fontSize:18}}>Stock {this.props.navigation.state.params.product.stock}</Text>
          </View>

        </View>
      </ScrollView>
    );
  }
}

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
