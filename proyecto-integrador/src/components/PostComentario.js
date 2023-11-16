import react, { Component } from 'react';
import {View, Text, StyleSheet, Flatlist} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class PostComentario extends Component {
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

    render(){
        console.log(this.props.infoPostComentario.datos.comments);
        return(
            <View style={styles.formContainer}>
                {/* <Flatlist
                    data= {this.props.infoPostComentario.datos.comments}
                    keyExtractor={ id => id.toString() }
                    renderItem={ ({item}) => <Text style = {styles.textButton}>{item}</Text> }
                /> */}
                <Text style = {styles.textButton}>{this.props.infoPostComentario.datos.comments}</Text>
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
    textButton: {
      color: "black",
      fontSize: 15,
    },
});

export default PostComentario