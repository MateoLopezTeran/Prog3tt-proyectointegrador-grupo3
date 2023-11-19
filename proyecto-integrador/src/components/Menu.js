import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import Home from "../screens/Home/Home";
import Search from "../screens/Search/Search";
import Profile from "../screens/Profile/Profile";
import PostForm from "../screens/PostForm/PostForm";
import CambiarContra from "../screens/CambiarContra/CambiarContra";



const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="NewPost" component={PostForm}/>
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="Profile" component={Profile}/>
            <Tab.Screen name="CambiarContra" component={CambiarContra}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;
