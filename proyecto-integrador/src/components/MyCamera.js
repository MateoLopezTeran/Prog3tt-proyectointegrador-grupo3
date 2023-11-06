import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';


class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos: false,
            foto: '',
            showCamera: true
        }
    }
    
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(res => {
            if (res.granted === true) {
                this.setState({
                    permisos: true
                })
            }
        })
        .catch( err => console.log(err))
    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(foto => {
            this.setState({
                foto: foto.uri,
                showCamera: false
            })
        })
        .catch(err => console.log(err))
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }

    aceptarFoto(){
        fetch(this.state.foto)
        .then(res => res.blob())
        .then(image => {
            const ref = storage.ref(`foto/${Date.now()}.jpg`)
            ref.put(image)
            .then(() => {
                ref.getDownloadURL()
                .then(url => {
                    this.props.onImageUpLoad(url)
                })
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.state.foto);
        return(
            <>
                {this.state.permisos ?
                this.state.showCamera ?
                <View style={styles.formContainer}>
                    <Camera style={styles.cameraBody} type={Camera.Constants.Type.back} ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}/>
                    <TouchableOpacity style={styles.button}onPress={()=>this.sacarFoto()}>
                        <Text style={styles.textButton}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camera} source={{uri: this.state.foto}}/>
                    <TouchableOpacity style={styles.button} onPress={() => this.aceptarFoto()}>
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.rechazarFoto()}>
                        <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text>No me diste los permisos de la camara</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    camera: {
        widht: '100%',
        height: '100%',
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
    },
    textButton: {
      color: "#fff",
    },
  });


export default MyCamera