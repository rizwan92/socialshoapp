
import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

class HomeScreen extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      {this.props.todosReady ? <Text  style={styles.item}>Wait</Text>
      :
      <FlatList
        data={this.props.shops}
        renderItem={({item}) => <Text style={styles.item}>{item.sname}</Text>}
         keyExtractor={(item, index) => index}
      />
      }

      </View>
    );
  }
}
export default createContainer(params=>{
  const handle = Meteor.subscribe('user');
  return {
    todosReady: !handle.ready(),
    shops: Meteor.collection('user').find(),
  };
}, HomeScreen)

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
