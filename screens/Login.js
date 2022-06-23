import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Button } from "react-native-elements";

const Login = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkLogedIn = () => {
    onAuthStateChanged(myContext.auth, (user) => {
      if (user) {
        navigation.navigate("HomeTabNavigator", { screen: "Music Library" });
        myContext.setUser({
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        });
        return true;
      }
      return false;
    });
  };
  useEffect(() => {
    checkLogedIn();
  }, []);
  const handleSignIn = () => {
    signInWithEmailAndPassword(myContext.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("SignIn", "SignIn successfully!");
        setEmail("");
        setPassword("");
        navigation.navigate("HomeTabNavigator", {
          screen: "Music Library",
        });
        myContext.setUser({
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          alert("Incorrect password!");
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          alert("Invalid email!");
        } else {
          alert("Failed");
        }
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>SIGN IN</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Button
          title={"SIGN IN"}
          type={"solid"}
          buttonStyle={styles.btn}
          disabled={
            email.trim().length !== 0 && password.length !== 0 ? false : true
          }
          onPress={() => handleSignIn()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#222831",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F14512",
  },
  content: {
    width: Dimensions.get("screen").width * 0.8,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  input: {
    margin: 10,
    backgroundColor: "#FFFFFF",
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    margin: 10,
    backgroundColor: "#F14512",
    borderRadius: 10,
    height: 50,
  },
});
