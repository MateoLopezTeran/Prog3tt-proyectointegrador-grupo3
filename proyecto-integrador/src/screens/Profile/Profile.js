import { Component } from "react";
import {TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";
import Post from "../../components/Post";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      posteos: []
    };
  }

  componentDidMount(){
    db.collection("users").where('owner', '==', auth.currentUser.email).onSnapshot(
      docs => {
        let profile = [];
        docs.forEach( doc => {
          profile.push({
            usuario: doc.usuario,
            minibio: doc.minibio,
            foto: doc.foto
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

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    console.log(this.state.profile);
    return (
      <View>
        <Text>User</Text>
        <View style={styles.seccionProfile}>
          <Text style = {styles.texto}>{auth.currentUser.email}</Text>
          <FlatList 
            data= {this.state.profile}
            keyExtractor={ profiles => profiles.id }
            renderItem={ ({item}) => <Text>Username: {item.data.username}</Text> }
          />
          <TouchableOpacity onPress={() => this.logout()}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text>Mis posteos</Text>
        {/* {this.state.posteos === 0 
        ?
        <Text>Cargando...</Text>
        :
        <FlatList 
            data= {this.state.posteos}
            keyExtractor={ unPost => unPost.id }
            renderItem={ ({item}) => <Post infoPost = { item } /> }
          />} */}
      </View>
    );
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
  seccionProfile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around"
},
  texto: {
    color: "black",
    fontSize: 15,
  },
});

export default Profile;