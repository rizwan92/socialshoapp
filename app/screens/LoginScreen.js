  import React, { Component } from 'react';
  import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
  import Swiper from 'react-native-deck-swiper';


  export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state={
        question:[
          {name:'rizwan',lastname:'couhan'},
          {name:'rizwan1',lastname:'couhan1'},
          {name:'rizwan2',lastname:'couhan2'},
        ]
      }
    }

    render() {
      return (
       <Swiper
           cards={this.state.question}
           renderCard={(card) => {
               return (
                   <View style={styles.card}>
                       <Text style={styles.text}>{card.name}</Text>
                   </View>
               )
           }}
           onSwiped={(cardIndex) => {console.log(cardIndex)}}
           onSwipedAll={() => {console.log('onSwipedAll')}}
           cardIndex={0}
           horizontalSwipe={false}
           backgroundColor={'#4FD0E9'}>
       </Swiper>
      );
    }
  }
  const styles = StyleSheet.create({
    card: {
      display:'flex',
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    text: {
      textAlign: 'center',
      fontSize: 50,
      backgroundColor: 'transparent'
    }
  })
