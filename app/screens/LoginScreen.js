  import React, { Component } from 'react';
  import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    AsyncStorage,
  } from 'react-native';
  import RegisterationScreen from './RegisterationScreen';
  import LoginForm from './LoginForm';
  import CreateShop from './CreateShop';

  export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state={
        text:'Login?',
        condition:true,
        user_id:'',
      }
    }

    componentWillMount(){
      AsyncStorage.getItem('user_id', (err, result) => {
        if (result) {
          this.setState({user_id:result})
        }
      })
    }
    handleLogout(){
      AsyncStorage.clear((error)=>{
        console.log(error);
        this.setState({user_id:null})
      });
    }

    handleform(){
      if (this.state.text === 'Login?' ) {
        this.setState({condition:!this.state.condition,text:'Registeration?'})
      }else {
        this.setState({condition:!this.state.condition,text:'Login?'})
      }
    }
    render() {
      const { navigate } = this.props.navigation;
      return (
            <ScrollView style={styles.container}>

        {
          this.state.user_id ?
          <CreateShop navigation={this.props.navigation}/>
           :
          this.state.condition ?
          <LoginForm navigation={this.props.navigation}/>
          :
          <RegisterationScreen />
        }

          {
            this.state.user_id ?
            <View style={{justifyContent:'center',alignItems:'center',marginTop:10,padding:20}}>
            <Text style={{color:'blue'}} onPress={this.handleLogout.bind(this)}>Logout</Text>
            </View>
            :
            <View style={{justifyContent:'center',alignItems:'center',marginTop:10,padding:20}}>
            <Text style={{color:'blue'}} onPress={this.handleform.bind(this)}>{this.state.condition ? this.state.text : this.state.text }</Text>
            </View>
          }

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
