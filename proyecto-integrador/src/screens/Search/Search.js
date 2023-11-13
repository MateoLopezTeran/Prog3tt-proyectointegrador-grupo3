import { Text } from "react-native";
import { Component } from "react";

class Search extends Component {
    constructor(){
        super();
        this.state={

        }
    }

    actualizarInput(){
        //que me muestre el usuario logueado que estoy clickeando
        if (this.render.userId != "") {
            <Profile props = {this.id} ></Profile>
        }
    }

    render(){
        return(
            <Text>Search</Text>
        )
    }
}

export default Search;