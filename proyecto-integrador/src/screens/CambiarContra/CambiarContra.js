import React, {Component} from 'react';
import {updatePassword, reauthenticateWithCredential, EmailAuthProvider} from 'firebase/auth';
import {auth } from '../../firebase/config';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import firebase from 'firebase';

class CambiarContra extends Component{
        constructor(){
        super();
        this.state = {
            actPass: '',
            msj: '',
            newPass: '',
            error: ''
            
        }}

        cambio(newPass){
            const credential = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, this.state.actPass)
        
            auth.currentUser.reauthenticateWithCredential(credential)
            .then(() => {
                return auth.currentUser.updatePassword(newPass)
            })
            .then(()=>
            {this.setState({newPass: '', actPass: '', msj: 'Contraseña actualizada con éxito'});
            })
            .catch((error) => {
                if (error.code == 'auth/wrong-password'){
                    this.setState({
                        error: 'Contraseña incorrecta'
                    })
                } else {
                    this.setState({
                        error: "No pudimos cambiar tu contraseña"
                    })
                }
            
            })
              
        
        }

        render(){
            return(
                <View style = {styles.formContainer}>
                 <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({actPass: text})}
                placeholder='Ingresa tu contraseña actual'
                keyboardType='default'
                secureTextEntry={true}
                value={this.state.actPass}/>
                <Text>{this.state.error}</Text>
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({newPass: text})}
                placeholder='Nueva contraseña'
                keyboardType='default'
                secureTextEntry={true}
                value={this.state.newPass}/>
                <TouchableOpacity style={styles.button} onPress={()=>this.cambio(this.state.newPass)}>
                    <Text style={styles.textButton}>Cambiar la contraseña</Text>    
                </TouchableOpacity>
                <Text>{this.state.error}</Text>
                <TouchableOpacity style = {styles.button}onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.textButton}>Volver</Text>
                </TouchableOpacity>
                </View>
                
            )
        }

}
export default CambiarContra;

