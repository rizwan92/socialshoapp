
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default class LinkScreen extends Component {
  constructor(props){
    super(props);
     this.state = {image: ''};
  }

    static navigationOptions = {
  title: 'Links',
  heder:true,
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('../images/ic_near_me_white_24dp_1x.png')}
      style={{tintColor: tintColor}}
    />
  ),
  };

  render() {
    const { navigate } = this.props.navigation;
    var {height, width} = Dimensions.get('window');

    return (
      <ScrollView style={styles.container}>

      <View style={{display:'flex',flexDirection:'column',flex:1,marginTop:10,justifyContent:'center'}}>

        <View  style={styles.cardContainer}>
        <View style={{display:'flex',width:width/4.5}}>
          <TouchableWithoutFeedback onPress={()=>navigate('MyShop',{shop:shop})}>
          <Image source={this.state.image == '' ? require('../images/noi.jpg') : {uri:this.state.image}} style={{width:80,height:80,borderRadius:50}} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{display:'flex'}}>
          <Text style={{paddingLeft:5,fontSize:15,color:'blue'}} onPress={()=>navigate('MyShop')}>Movie Name</Text>
          <Text style={{paddingLeft:5,fontSize:13,color:'green'}}>bollywood</Text>
          <Text style={{paddingLeft:5,fontSize:13,color:'black'}}>length</Text>
          <Text style={{paddingLeft:5,fontSize:13,color:'black'}}>rating</Text>
          <Text style={{paddingLeft:5,fontSize:13,color:'black'}}>size</Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 5,
    padding:1,
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
})
