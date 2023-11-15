import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            todosUsers: [],
            usersFiltrados: [],
            searchText: ''
        }
    }

    componentDidMount(){
        //Traer datos
        db.collection('users').onSnapshot(
            usuarios => {
                let usersDeDb = [];

                usuarios.forEach( unUsuario => {
                    usersDeDb.push(
                        {
                            id: unUsuario.id,
                            datos: unUsuario.data()
                        }
                    )
                })

                this.setState({
                    todosUsers: usersDeDb
                })
            }
        )
    }

    searchUsers(searchText){
        this.state.todosUsers.forEach( unUsuario => {
          if (searchText.length==0){
              this.setState({
                  usersFiltrados: []
              })
          }
          if (unUsuario.datos.owner.includes(searchText) ) {
              if(this.state.usersFiltrados.includes(unUsuario))
              {null}
              else{this.state.usersFiltrados.push(unUsuario)}
          }
        })
      }
  

    actualizarInput(){
        //que me muestre el usuario que estoy clickeando
        if (this.render.userId != "") {
            <Profile props = {this.id}></Profile>
        }
    }

    render(){
        return(
            <ScrollView>

            <Text style={styles.screenTitle}>Search Results</Text>
                <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=> (this.searchUsers(text), this.setState({searchText: text}))}
                    placeholder='Search user'
                    keyboardType='default'
                    value={this.state.searchText}>
                </TextInput>
                </View>

                {
                    this.state.usersFiltrados.length === 0 
                    ?
                    <Text> Esperando busqueda...</Text>
                    :
                   
                    <FlatList 
                        data= {this.state.usersFiltrados}
                        keyExtractor={ unUsuario => unUsuario.id }
                        renderItem={ ({item}) => <Text>{item.datos.owner}</Text> }
                    />
                    
                }

            </ScrollView>
        )
    }
}

const styles = new StyleSheet.create({
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
        margin: 5,
      },
      textButton: {
        color: "#fff",
      },
})

export default Search;