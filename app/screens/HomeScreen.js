import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
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
      <Card>
         <TextInput
              placeholder="Search Local Shops By Name..."
              onChangeText={(text) => this.setState({text})}
              underlineColorAndroid="transparent"
            />
       </Card>

      {this.props.todosReady ? <Text  style={styles.item}>Wait</Text>
      :
      <View>
         {
        this.props.shops.length == 0 ? null :
        <FlatList
                  data={searchshps}
                  keyExtractor={(item, index) => item._id}
                  renderItem={({item}) =>
                  <TouchableWithoutFeedback  onPress={()=>navigate('MyShop',{shop:item})}>
                   <CardItem>
                     <Left>
                       <Thumbnail source={item.image == '' ? require('../images/noi.jpg'):{uri: item.image}} />
                       <Body>
                         <Text>{item.sname}</Text>
                         <Text note>{item.sadd}</Text>
                         <Text note>{item.scode}</Text>
                       </Body>
                     </Left>
                   </CardItem>
                   </TouchableWithoutFeedback>
                }
                />
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
    flexDirection: 'row',
    alignItems: 'center',
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
darkText: {
   color: 'rgba(0 ,0 ,0 , 0.87)'
 },
 lightText: {
   color: 'rgba(255 ,255 ,255 , 0.87)'
 },
})
