import react, { Component } from "react"
import { auth, db } from "../../firebase/config"
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native"
import MyCamera from "../../components/MyCamera"

class PostForm extends Component {
    constructor(){
        super()
        this.state = {
            post: '', 
            showCamera: true,
            url: ''
        };
    }

    postear(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            post: this.state.post,
            foto: this.state.url,
            likes:[],
            comments: [],
            createdAt: Date.now()
        })
        .then(console.log('Posteaste correctamente'))
        .catch(err => console.log(err))
    }

    onImageUpload(url){
        this.setState({
            url:url,
            showCamera: false
        })
    }

    render(){
        return(
            <View>
                <Text>PostForm</Text>

                { this.state.showCamera? <MyCamera onImageUpload={(url) => this.onImageUpload(url)}/> :
                <>
                <TextInput style={styles.input} onChangeText={(text) => this.setState({post:text})} placeholder='Escribí un post' keyboardType="default" value={this.state.post}/>
                <TouchableOpacity style={styles.button} onPress={() => this.postear()}>
                    <Text style={styles.textButton}>Postear</Text>
                </TouchableOpacity>
                </> }
            </View>
        );
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

export default PostForm;