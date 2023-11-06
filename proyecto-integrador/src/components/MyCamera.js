import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';


class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos: false,
            foto: false
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
                <View style={styles.formContainer}>
                    <Camera style={styles.cameraBody} type={Camera.Constants.Type.back} ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}/>
                    <TouchableOpacity style={styles.button}onPress={()=>this.sacarFoto()}>
                        <Text style={styles.textButton}>Postear</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Image></Image>
                </View>
                {/* <Text>No me diste los permisos de la camara</Text> */}
                }
            </>
        )
    }
}



