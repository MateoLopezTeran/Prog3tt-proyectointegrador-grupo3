import { Component } from "react";
import {TouchableOpacity,View,Text, FlatList } from "react-native";
import { auth, db } from "../../firebase/config";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: []
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
          foto: doc.foto,
          })
          this.setState({
            profile: profile,
            loading: false
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
        <View>
          <Text>{auth.currentUser.email}</Text>
          <FlatList 
            data= {this.state.profile}
            keyExtractor={ profiles => profiles.id }
            renderItem={ ({item}) => <Text>Username: {item.data.username}</Text> }
          />
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Profile;