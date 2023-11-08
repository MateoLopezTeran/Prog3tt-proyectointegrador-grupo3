import { Component } from "react";
import {TouchableOpacity,View,Text } from "react-native";
import { auth, db } from "../../firebase/config";

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  // esto trae la data de usuarios pero no tenemos la coleccion

/*   data() {
    db.collection("users").onSnapshot(
      docs => {
        let usuarios = [];
        docs.forEach( doc => {
          usuarios.push({
            usuario: doc.usuario,
            minibio: doc.minibio,
            foto: doc.foto,
            posteos: doc.posteos,
          })
          this.setState({
            users: usuarios,
            loading: false
          })
        })
      }
    )
  } */

  render() {
    console.log(this.state.users);
    return (
      <View>
        <Text>User</Text>

        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;
