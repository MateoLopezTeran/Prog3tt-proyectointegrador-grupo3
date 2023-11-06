import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Search from "../screens/Search/Search";
import AddPost from "../screens/AddPost/AddPost";
import Profile from "../screens/Profile/Profile";


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
            <Tab.Screen name="Login" component={Login}/>
            <Tab.Screen name="Register" component={Register}/>
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="AddPost" component={AddPost}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;
