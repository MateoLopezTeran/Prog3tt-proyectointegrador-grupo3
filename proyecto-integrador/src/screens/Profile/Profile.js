import { Component } from "react";
import {TouchableOpacity, View, Text, FlatList, StyleSheet, Image } from "react-native";
import { auth, db } from "../../firebase/config";
import PostProfile from "../../components/PostProfile";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posteos: [],
      profile: [],
    };
  }

  componentDidMount(){
    db.collection("users").where('owner', '==', auth.currentUser.email).onSnapshot(
      docs => {
        let profile = [];
        docs.forEach( doc => {
          profile.push({
           id: doc.id,
           data: doc.data()
          })
          this.setState({
            profile: profile,
          })
        })
      }
    )

    db.collection("posts").where('owner', '==', auth.currentUser.email).onSnapshot(
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

  logout(){
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  eliminarPerfil(id){
    auth.currentUser.delete()
    .then(() => {
      console.log('Usuario eliminado correctamente');
    })
    .then(() => {
      db.collection('users').doc(id).delete()
        this.props.navigation.navigate('Register')
    })
    .catch(error=>{console.log(error);})
  }

  render() {
    console.log(this.state);
    return (
      <View>
        <br/>
        <View style={styles.orden}>
          <View style={styles.seccionFoto}>
            { this.state.profile.length > 0 
            ? 
            <Image style={styles.foto} source={this.state.profile[0].data.foto} resizeMode="center"/>
            : 
            false}
          </View>

          <View style={styles.seccionProfile}>        
            { this.state.profile.length > 0 
            ? 
            <Text style = {styles.texto}>Nombre de Usuario: {this.state.profile[0].data.usuario}</Text>
            
            : 
            false}

            <Text style = {styles.texto}>Email: {auth.currentUser.email}</Text>

            { this.state.profile.length > 0           ? 
            <Text style = {styles.texto}>Biografia: {this.state.profile[0].data.minibio}</Text>
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

        <br/>
        <View style = {styles.seccionBoton}>
          <TouchableOpacity style= {styles.button} onPress={() => this.logout()}>
            <Text style={styles.textoBoton}>Logout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style= {styles.button} onPress={() => this.eliminarPerfil(this.state.profile[0].id)}>
            <Text style={styles.textoBoton}>Eliminar Perfil</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orden: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
  },
  foto: {
    height: 200,
    marginBottom: 40,
    marginTop: 15
  },
  seccionProfile: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginHorizontal: 5
  },
  seccionFoto: {
    flex: 1,
    height: 200,
    width: '100%',
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 55
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
    marginLeft: 95
  },
  textoBoton: {
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
    height: 50
  },
  seccionBoton: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default Profile;