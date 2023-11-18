import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {Image, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import PostProfile from '../../components/PostProfile'

class DistintoProfile extends Component{
    constructor(props){
        super(props)
        this.state ={
            posteos: [],
            perfil: []
        }
    }

    componentDidMount(){
        db.collection("users").where('owner', '==', this.props.route.params.datos).onSnapshot(
            docs => {
              let profile = [];
              docs.forEach( doc => {
                profile.push({
                 id: doc.id,
                 data: doc.data()
                })
                this.setState({
                  perfil: profile,
                })
              })
            }
        )

        db.collection("posts").where('owner', '==', this.props.route.params.datos).onSnapshot(
            posts => {
              let posteosDelUsuario = [];
              posts.forEach(doc => {
                posteosDelUsuario.push({
                  id: doc.id,
                  data: doc.data()
                })
              this.setState({
                posteos: posteosDelUsuario
              })
              })
            }
        )
    }

    render(){
        console.log(this.state.perfil);
        return(
            <View>
                <br/>
                <View style={styles.orden}>
                    <View style={styles.foto}>
                        <Text>Foto de Perfil: </Text>
                        { this.state.perfil.length > 0 
                        ? 
                        <Image style={styles.foto} source={this.state.perfil[0].data.foto} resizeMode="contain"/>
                        : 
                        false}
                    </View>

                    <View style={styles.seccionProfile}>        
                        { this.state.perfil.length > 0 
                        ?        
                        <Text style = {styles.texto}>Nombre de Usuario: {this.state.perfil[0].data.usuario}</Text>
                        : 
                        false}

                        <Text style = {styles.texto}>Email: {this.props.route.params.datos}</Text>

                        { this.state.perfil.length > 0           
                        ? 
                        <Text style = {styles.texto}>Biografia: {this.state.perfil[0].data.minibio}</Text>
                        : 
                        false}
                    </View>
                </View>

                <View style = {styles.seccionDos}>
                    <Text style = {styles.texto}>Mis posteos:</Text>
                    {this.state.posteos === 0 
                    ?
                    <Text style = {styles.texto}>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.posteos}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <PostProfile infoPost = { item } navigation = {this.props.navigation} /> }
                    />}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    orden: {
      flex: 1,
      flexDirection: 'row',
    },
    foto: {
      width: 170,
      height: 100,
    },
    seccionProfile: {
      flex: 1,
      flexDirection: 'column',
      paddingBottom: 100,
      height: 200,
      width: 200,
      justifyContent: "center",
    },
    seccionDos: {
      paddingTop: 5,
      paddingBottom: 10,
      paddingLeft: 10,
      flex: 1,
      justifyContent:"flex-start",
    },
    texto: {
      textAlign: "left",
      color: "black",
      fontSize: 15,
    },
    button: {
      backgroundColor: "red",
      paddingHorizontal: 10,
      paddingVertical: 6,
      justifyContent: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
      margin: 5,
      width: 80,
    },
  });

export default DistintoProfile