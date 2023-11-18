import React, { Component } from "react";
import { TextInput, View, Text, FlatList, TouchableOpacity, StyleSheet , Image} from "react-native";
import { auth, db } from "../../firebase/config";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
        resultados: [],
        busqueda: "",
        unSoloUsuario: "",
    };
  }

    componentDidMount() {
        db.collection("users").onSnapshot((search) => {
        let resultadosBusqueda = [];
                search.forEach((doc) => {
            resultadosBusqueda.push({
            id: doc.id,
            datos: doc.data(),
            });
        });

        this.setState({
            //guardamos los resultados de la busqueda en el estado de resultados
            resultados: resultadosBusqueda,
        });
        });
    }

  render() {
    //filtramos el estado de los resultados
    const usuariosEncontrados = this.state.resultados.filter((user) =>
      user.datos.usuario.includes(this.state.busqueda.toLowerCase())
    );

    return (
      <View >
        <TextInput
           
            style={styles.input}
            keyboardType="default"
            placeholder="Busca"
            onChangeText={(cadena) => this.setState({ busqueda: cadena })}
            value={this.state.busqueda}

            
        />

        <FlatList
          data={usuariosEncontrados}
          keyExtractor={(user) => user.id}
          style={styles.container}
          renderItem={({ item }) => (
            
            <TouchableOpacity 

                onPress={() => this.props.navigation.navigate('Profile')}
                style={styles.containerProfile}>
            {item.datos.foto != "" ?
                <Image 
                        style={styles.foto} 
                        source={{uri:item.datos.foto}}
                        resizeMode='contain'/> :
                        <Image 
                            style={styles.foto} 
                            source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                            resizeMode='contain'
                        />}
              <View>
              <Text >{item.datos.usuario}</Text>
              <Text style={styles.email}>{item.datos.owner}</Text>
              
              </View>
            </TouchableOpacity>
          )}
        />
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
        margin: 5,
      },
      textButton: {
        color: "#fff",
      },
});

export default Search;