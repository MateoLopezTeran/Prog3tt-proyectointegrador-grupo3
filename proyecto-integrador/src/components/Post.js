import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'; 

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
            comments: [],
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
            comments: firebase.firestore.FieldValue.arrayUnion(this.state.comments)
        })
        .then(
            this.setState({
                comments: ''
            })
        )
    }

    render(){
        console.log(this.props);
        return (
            <View style = {styles.formContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text style = {styles.textButton}>{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Text style = {styles.textButton}>Descripción: {this.props.infoPost.datos.post}</Text>
                <Image style={styles.image} source={this.props.infoPost.datos.foto} resizeMode='center'/>
            
                {this.props.infoPost.datos.likes.length === 0 
                ?
                <TouchableOpacity onPress={() => this.likear()}>
                    <Text style = {styles.textButton}>Likes: <AntDesign name="like2" size={24} color="black" /> {this.props.infoPost.datos.likes.length}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.desLikear()}>
                    <Text style = {styles.textButton}>Likes: <AntDesign name="dislike2" size={24} color="black" /> {this.props.infoPost.datos.likes.length}</Text>
                </TouchableOpacity>}
                
                {/* <FlatList 
                    data= {this.props.infoPost.datos.comments}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post infoPost = { item } /> }
                /> */}
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
        width: 225
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

export default Post;