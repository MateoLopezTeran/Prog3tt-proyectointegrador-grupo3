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
        } else if()

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
            <>
                {this.state.err ? <Text>{this.state.err}</Text> : false}
            </>
        )
    }
}

export default Register;