import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            img: '',
            description: '',
            date: '',
            email: '',
            likes: '',
            comments: '',
        }
    }
    
    componentDidMount(){
        //Indicar si el post ya está likeado o no
        let likes = this.props.infoPost.datos.likes

        if(likes.length === 0){
            this.setState({
                like: false
            })
        }

        if (likes.length >0) {
            likes.forEach(like => {{if (like === auth.currentUser.email) {
                this.setState({ like: true })
            }}});
        }
    }

    crearPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            likes: [],
            img: '',
            createdAt: Date.now(),
        })
        .then()
        .catch(err => console.log(e))
    }

    likear(){
         //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
    db.collection("posts").doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(this.setState({like: true}))
    }

    render(){
        if (users == datos.currentUser) {
            return (
                <View>
                    <Text>----------------------------------------------------</Text>
                        <Text>Datos del Post</Text>
                        <Text>Email: {this.props.infoPost.datos.owner}</Text>
                        <Text>Texto: {this.props.infoPost.datos.post}</Text>
                        <Text>Cantidad de Likes: {this.props.infoPost.datos.likes.length}</Text>
                    <TouchableOpacity></TouchableOpacity>
                </View>
               )
               
        } else () => {
            return (
                <Text>No estas logueado</Text>
            )
        }
       
    }


}

const styles = StyleSheet.create({
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
      backgroundColor: "salmon",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "salmon",
      width: "30%",
    },
    textButton: {
      color: "#fff",
    },

  });

export default Post;