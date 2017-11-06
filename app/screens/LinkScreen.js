import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Linking,
  TextInput,
  ToastAndroid,
} from 'react-native';

 class LinkScreen extends Component {
  constructor(props){
    super(props);
     this.state = {search: ''};
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
  handleLinking(url){
    try {
      Linking.openURL(url).catch(err => console.error('An error occurred', err));

    } catch (e) {
    ToastAndroid.show('Link is Not Available', ToastAndroid.SHORT);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    var {height, width} = Dimensions.get('window');
    let searchlinks = this.props.links.filter((link)=>{
    return(link.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1)
  })
    return (
      <ScrollView style={styles.container}>
      <View style={{padding: 10}}>
        <TextInput
             style={{height: 40,borderWidth:1,borderRadius:5,zIndex:2,shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,backgroundColor:'#F5FCFF',color:'black'}}
             placeholder="Search Latest Movies To Download..."
             onChangeText={(search) => this.setState({search})}
             underlineColorAndroid="transparent"
           />
      </View>

      {this.props.todosReady ? <Text>Wait</Text>
      :
      <View style={{display:'flex',flexDirection:'column',flex:1,marginTop:10,justifyContent:'center'}}>

        {
          searchlinks.length == 0 ? null :
          <View>
          {
            searchlinks.map((link,i)=>{
              let timesplit =link.length.split('.')
              return(
                <View key={i}  style={styles.cardContainer}>
                <View style={{display:'flex',width:width/4.5}}>
                  <TouchableWithoutFeedback onPress={this.handleLinking.bind(this,link.dlink)}>
                  <Image source={link.image == '' ? require('../images/noi.jpg') : {uri:link.image}} style={{width:80,height:80,borderRadius:50}} />
                  </TouchableWithoutFeedback>
                </View>
                <View style={{display:'flex'}}>
                  <Text style={{paddingLeft:5,fontSize:15,color:'blue'}} onPress={this.handleLinking.bind(this,link.dlink)}>{link.name}</Text>
                  <Text style={{paddingLeft:5,fontSize:13,color:'green'}}>Category: {link.category}</Text>
                  <Text style={{paddingLeft:5,fontSize:13,color:'black'}}>length: {`${timesplit[0] ? timesplit[0] : null } : ${timesplit[1] ? timesplit[1] : null} : ${timesplit[2] ? timesplit[2] : null}`} Hrs.</Text>
                  <Text style={{paddingLeft:5,fontSize:13,color:'black'}}>IMDB: {link.rating} </Text>
                  <Text style={{paddingLeft:5,fontSize:13,color:'black'}}>Size: {link.size+' '+link.sizein}</Text>
                  </View>
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
  const handle = Meteor.subscribe('link');
  return {
    todosReady: !handle.ready(),
    links: Meteor.collection('link').find(),
  };
}, LinkScreen)

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
})
