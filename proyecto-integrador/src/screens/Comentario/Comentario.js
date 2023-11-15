import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db } from '../../firebase/config';
import PostComentario from '../../components/PostComentario';

class Comentario extends Component {
    constructor(props){
        super(props)
        this.state={
            listaComments:[]
        }
    }

    componentDidMount(){
        db.collection('posts').where(this.state.listaComments[0].id, '==').onSnapshot(
            comentarios => {
                let comentariosAMostrar = [];
                comentarios.forEach( unComentario => {
                    comentariosAMostrar.push({
                            id: unComentario.id,
                            datos: unComentario.data()
                        })
                })
                this.setState({
                    listaComments: comentariosAMostrar
                })
            }
        )
    }

    // cree un nuevo componente y screen para comentarios pero no se si esta bien. Hay que ver si se puede iterar la FlatList
    render(){
        console.log(this.props);
        {this.state.listaComments.length > 0 ? console.log(this.state.listaComments[0].datos): false}
        return(
            <View>
                <Text>Comentarios</Text>
                {this.state.listaComments.length === 0 
                ?
                <Text>Cargando...</Text>
                :
                <FlatList 
                    data= {this.state.listaComments}
                    keyExtractor={ unComentario => unComentario.id }
                    renderItem={ ({item}) => <PostComentario infoPostComentario = { item } navigation = {this.props.navigation} id = {this.state.listaComments.id}/> }
                />}
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
    textButton: {
      color: "black",
      fontSize: 15,
    },
    image: {
        width: 150,
        height: 150,
    }
});

export default Comentario;