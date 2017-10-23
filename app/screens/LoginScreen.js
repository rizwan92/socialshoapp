  import React, { Component } from 'react';
  import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
  } from 'react-native';
  import RegisterationScreen from './RegisterationScreen';
  import LoginForm from './LoginForm';

  export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state={
        text:'Login?',
        condition:true,
      }
    }
handleform(){
  if (this.state.text === 'Login?' ) {
    this.setState({condition:!this.state.condition,text:'Registeration?'})
  }else {
    this.setState({condition:!this.state.condition,text:'Login?'})
  }
}
    render() {
      return (
        <ScrollView style={styles.container}>

        {
          this.state.condition ?
          <RegisterationScreen />
          :
          <LoginForm />
        }

        <View style={{justifyContent:'center',alignItems:'center',marginTop:10,padding:20}}>
        <Text style={{color:'blue'}} onPress={this.handleform.bind(this)}>{this.state.condition ? this.state.text : this.state.text }</Text>
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
  });
