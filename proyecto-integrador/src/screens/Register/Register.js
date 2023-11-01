import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email: '',
            password: '',
            userName: '',
            bio: '',
            profilepic: '',
            err: false
        }
    }

    register(email, pass){
        if(email === ""){
            return this.setState({
                err: "No puedes registarte sin email"
            })
        }
        else if (pass === ""){
            return this.setState({
                err: "No puedes registrarte sin contraseña"
            })
        }
        else if (userName === ""){
            return this.setState({
                err: "No puedes registrarte sin nombre de usuario"
            })
        }

        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                
                console.log('Registrado ok', response);

                 //Cambiar los estados a vacío como están al inicio.

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
                placeholder='user name'
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
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text>Ya tengo cuenta. Ir al login</Text>
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