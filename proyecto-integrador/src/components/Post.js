import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'; 

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            numeroLikes: this.props.infoPost.datos.likes.length,
            description: '',
            comments: ''
        }
    }
    
    componentDidMount(){
        if (this.props.infoPost.datos.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
    }

    crearPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            likes: [],
            comments: [],
            autorComments: [],
            img: '',
            createdAt: Date.now(),
        })
        .then()
        .catch(err => console.log(e))
    }

    likear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(res => {
            this.setState({
                like: true,
                numeroLikes: this.props.infoPost.datos.likes.length,
            })
        })
        .catch(err => console.log(err))
    }

    desLikear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(res => {
            this.setState({
                like: false,
                numeroLikes: this.props.infoPost.datos.likes.length,
            })
        })
        .catch(err => console.log(err))
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

    render(){
        console.log(this.state);
        return (
            <View style = {styles.formContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DistintoProfile', {datos: this.props.infoPost.datos.owner, navigation: this.props.navigation})}>
                    <Text style = {styles.textButton}>{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Text style = {styles.textButton}>Descripción: {this.props.infoPost.datos.post}</Text>
                <Image style={styles.image} source={this.props.infoPost.datos.foto} resizeMode='center'/>
            
                {this.state.like 
                ?
                <TouchableOpacity onPress={() => this.desLikear()}>
                    <Text style = {styles.textButton}>Likes: <AntDesign name="dislike2" size={24} color="black"/> {this.state.numeroLikes}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.likear()}>
                    <Text style = {styles.textButton}>Likes: <AntDesign name="like2" size={24} color="black"/> {this.state.numeroLikes}</Text>
                </TouchableOpacity>}

                <TouchableOpacity style={styles.buttonCommentariosTotales} onPress={() => this.props.navigation.navigate("Comentario", {id: this.props.infoPost})}>
                    <Text style = {styles.textButton}>Cantidad total de comentarios</Text>
                </TouchableOpacity>
                
                {this.props.infoPost.datos.comments.length > 0 
                ?
                <FlatList
                    data={this.state.comments}
                    keyExtractor={comment => comment.text + comment.user}
                    initialNumToRender={4}
                    renderItem={(comentario) => 
                    <View style={styles.seccionComments}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DistintoProfile', { datos: comentario.item.autor, navigation: this.props.navigation})}>
                            <Text style={styles.texto}>{comentario.item.autor}:</Text>
                        </TouchableOpacity>
                        <Text style={styles.texto}>{comentario.texto}</Text>
                    </View>}/>
                : 
                null}

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
    buttonCommentariosTotales: {
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
    texto: {
        textAlign: "left",
        color: "black",
        fontSize: 15,
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

export default Post;