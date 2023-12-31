import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'; 

class PostProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            img: '',
            description: '',
            date: '',
            email: '',
            likes: '',
            comments: '',
            autorComments: ''
        }
    }
    
    componentDidMount(){
        let likes = this.props.infoPost.data.likes

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

    likear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(
            this.setState({
                like: true
            })
        )
    }

    desLikear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(
            this.setState({
                like: false
            })
        )
    }

    Comentario(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({autor: auth.currentUser.email,texto: this.state.comments}),
        })
        .then(
            this.setState({
                comments: '',
            })
        )
    }
    
    borrarPost(){
        db.collection('posts').doc(this.props.infoPost.id).delete()
        .then(res=> {
            console.log('Post borrado exitosamente');
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.props);
        return (
            <View style = {styles.formContainer}>               
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text style = {styles.textButton}>{this.props.infoPost.data.owner}</Text>
                </TouchableOpacity>
                <Text style = {styles.textButton}>Descripción: {this.props.infoPost.data.post}</Text>
                <Image style={styles.image} source={this.props.infoPost.data.foto} resizeMode='center'/>
            
                {this.props.infoPost.data.likes.length === 0 
                ?
                <TouchableOpacity onPress={() => this.likear()}>
                    <Text style = {styles.textButton}>Likes: <AntDesign name="like2" size={24} color="black" /> {this.props.infoPost.data.likes.length}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.desLikear()}>
                    <Text style = {styles.textButton}>Likes: <AntDesign name="dislike2" size={24} color="black" /> {this.props.infoPost.data.likes.length}</Text>
                </TouchableOpacity>}
                
                <TouchableOpacity style={styles.buttonComentariosTotales} onPress={() => this.props.navigation.navigate("Comentario", {id: this.props.infoPost})}>
                    <Text style = {styles.textButton}>Cantidad total de comentarios</Text>
                </TouchableOpacity>
                <View style={styles.seccionComments}>
                    <TextInput
                    style={styles.inputComments}
                    onChangeText={(text) => this.setState({ comments: text })}
                    placeholder="Insertar comentario"
                    keyboardType="default"
                    value={this.state.comments}
                    />
                    {this.state.comments === '' ? null : 
                        <TouchableOpacity style={styles.buttonComments} onPress={() => this.Comentario()}>
                            <Text style={styles.textButton}>Comentar</Text>
                        </TouchableOpacity>
                    }
                </View>
                {auth.currentUser.email == this.props.infoPost.data.owner 
                ? 
                <TouchableOpacity style={styles.button} onPress={() => this.borrarPost()}>
                    <Text>Borrar Post</Text>
                </TouchableOpacity>
                :
                null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingTop: 5,
      paddingBottom: 10,
      paddingLeft: 10,
      margin: 15,
      backgroundColor: 'lightgrey',
      borderRadius: 5,

    },
    inputComments: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        width: 225,
    },
    button: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: 100,
    },
    buttonComments: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: "30%",
        height: '60%',
        marginLeft: 10,
        marginTop: 10
    },
    buttonComentariosTotales: {
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: "64%",
        marginTop: 10
    },
    seccionComments: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    textButton: {
      color: "black",
      fontSize: 15,
    },
    image: {
        width: 150,
        height: 150,
    }
});

export default PostProfile;