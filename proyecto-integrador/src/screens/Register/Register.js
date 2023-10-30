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
        else if (email < 6){
            return this.setState({
                err: "La contraseña debe tener mas de 6 caracteres"
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
            <>
              <Text>gsgsgs</Text>
            </>
        )
    }
}

export default Register;