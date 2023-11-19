import react, { Component } from "react";
import {TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import Post from '../../components/Post'
import { auth, db } from "../../firebase/config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPost: []
    };
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(
      posteos => {
        let postsAMostrar = [];
        posteos.forEach( unPost => {
          postsAMostrar.push({
            id: unPost.id,
            datos: unPost.data()
          })
        })
        this.setState({
          listaPost: postsAMostrar
        })
      }
    )
  }


  render() {
    
    return (
      <>
        <Text>Lista de Posteos</Text>
          {this.state.listaPost.length === 0 
          ?
          <Text>Cargando...</Text>
          :
          <FlatList 
            data= {this.state.listaPost}
            keyExtractor={ unPost => unPost.id }
            renderItem={ ({item}) => <Post infoPost = { item } navigation = {this.props.navigation}/> }
          />}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});

export default Home;