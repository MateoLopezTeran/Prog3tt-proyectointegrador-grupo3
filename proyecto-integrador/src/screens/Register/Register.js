import react, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            userName: '',
            bio: '',
            profilepic: '',
            err: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate("Login");
          }
        });
    }

    register(email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                db.collection("users").add({
                    owner: this.state.email,
                    usuario: userName,
                    minibio: this.state.bio,
                    foto: this.state.profilepic,
                })
                console.log('Registrado ok', response);
                this.props.navigation.navigate("Login");
            })
            .catch( error => {
                //Cuando Firebase responde con un error
                console.log(error);

            })
    }

    render(){
        return (
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({email: text})}
                placeholder='email'
                keyboardType='email-address'
                value={this.state.email}
                />
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({password: text})}
                placeholder='password'
                keyboardType='default'
                secureTextEntry={true}
                value={this.state.password}
                />
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({userName: text})}
                placeholder='userName'
                keyboardType='default'
                value={this.state.userName}
                />
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({bio: text})}
                placeholder='bio'
                keyboardType='default'
                value={this.state.bio}
                />
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({userName: profilepic})}
                placeholder='profile pic'
                keyboardType='default'
                value={this.state.profilepic}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')}>
                   <Text style={styles.textButton}>Ya tengo cuenta. Ir al login</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = new StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
      },
      input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
      },
      button: {
        backgroundColor: "blue",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
        margin: 5,
      },
      textButton: {
        color: "#fff",
      },
})

export default Register;