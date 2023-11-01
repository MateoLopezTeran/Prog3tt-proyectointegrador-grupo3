import react, { Component } from "react";
import { auth } from "../../firebase/config";
import {TextInput, TouchableOpacity, View, Text, StyleSheet,} from "react-native";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Menu");
      }
    });
  }

  login(email, contra) {
    if (email === '') {
      return this.setState({
        error: 'Es necesario rellenar el campo de email'
      })
    } else if (contra === '') {
        return this.setState({
          error: 'Es necesario rellenar el campo de password'
        })
    }

    auth.signInWithEmailAndPassword(email, contra)
      .then((response) => {
        console.log("Login ok", response);
        this.props.navigation.navigate("Menu");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="email"
          keyboardType="email-address"
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="password"
          keyboardType="default"
          secureTextEntry={true}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.textButton}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.textButton}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
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
    backgroundColor: "#15d41f",
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

export default Login;