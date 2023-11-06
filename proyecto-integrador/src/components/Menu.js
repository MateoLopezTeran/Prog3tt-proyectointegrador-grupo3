import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Search from "../screens/Search/Search";
import Profile from "../screens/Profile/Profile";
import PostForm from "../screens/PostForm/PostForm";


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
            <Tab.Screen name="PostForm" component={PostForm}/>
            <Tab.Screen name="Profile" component={Profile}/>
            <Tab.Screen name="Search" component={Search}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;
