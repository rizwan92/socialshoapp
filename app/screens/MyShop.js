import React, { Component } from 'react';
import Meteor, { connectMeteor } from 'react-native-meteor';
import moment from 'moment';
import {
  StyleSheet,
  View,
  ScrollView,
  Button as Button1,
  Image,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'; class MyShop extends Component {
  static navigationOptions = ({ navigation }) => ({
     title: `${navigation.state.params.shop.sname}`,
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
     visits: Meteor.collection('visit').findOne({shopid:this.props.navigation.state.params.shop._id}),
     products: Meteor.collection('productMaster').find({shopid:this.props.navigation.state.params.shop._id}),
   };
 }
  render() {
      const { visits } = this.data;
      const { products } = this.data;
    var {height, width} = Dimensions.get('window');
    var seventypercent = width *70/100;
    const { navigate } = this.props.navigation;

    return (
      <Container>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{this.props.navigation.state.params.shop.sname}</Text>
                    <Text note>{this.props.navigation.state.params.shop.sadd}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={this.props.navigation.state.params.shop.image == '' ? require('../images/noi.jpg'):{uri: this.props.navigation.state.params.shop.image}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Text>{visits == undefined ? null: visits.visit} visits</Text>
                  </Button>
                </Left>
                <Right>
                <Text>{visits == undefined ? null: moment(visits.createdAt).fromNow()} </Text>
                </Right>
              </CardItem>

              <CardItem>
                <Left>
                  <Button1
                    onPress={() => {}}
                    title="Messenger"
                  />
                </Left>
                <Body>
                  <Button1
                    onPress={() => {}}
                    title="Whatsapp"
                    color="green"
                  />
                </Body>
              </CardItem>

            </Card>


            <Card>
            <CardItem>
            <Text>Products</Text>
            </CardItem>
            <FlatList
                      data={products}
                      keyExtractor={(item, index) => item._id}
                      renderItem={({item}) =>{
                        return(
                          <TouchableWithoutFeedback  onPress={()=>navigate('MyProduct',{product:item})}>
                           <CardItem>
                             <Left>
                               <Thumbnail source={item.image == '' || item.image == null ? require('../images/noi.jpg'):{uri: item.image}} />
                               <Body>
                                 <Text>{item.name}</Text>
                               </Body>
                             </Left>
                           </CardItem>
                           </TouchableWithoutFeedback>
                        )
                      }
                    }
                      />
              </Card>
          </Content>
        </Container>
          );
  }
}
connectMeteor(MyShop);
 export default MyShop;
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
