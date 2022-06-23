import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AppContext from "../context/AppContext";
import { Avatar, Button, Image } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import { baseUrl } from "./../shared/baseUrl";

const Register = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const avatars = [
    { avatar: "avatars/avatar-1.jfif" },
    { avatar: "avatars/avatar-2.jfif" },
    { avatar: "avatars/avatar-3.jfif" },
    { avatar: "avatars/avatar-4.jfif" },
    { avatar: "avatars/avatar-5.jfif" },
    { avatar: "avatars/avatar-6.jfif" },
    { avatar: "avatars/avatar-7.jfif" },
    { avatar: "avatars/avatar-8.jpg" },
    { avatar: "avatars/avatar-9.jfif" },
    { avatar: "avatars/avatar-10.jfif" },
  ];
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(avatars[0].avatar);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const renderRow = (dataRow, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.avatar}
        onPress={() => setAvatar(dataRow.avatar)}
      >
        <Avatar
          rounded
          size={"medium"}
          source={{
            uri: baseUrl + dataRow.avatar,
          }}
        />
      </TouchableOpacity>
    );
  };
  const handleSignUp = () => {
    createUserWithEmailAndPassword(myContext.auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateProfile(user, { displayName: name, photoURL: baseUrl + avatar })
          .then(() => {
            Alert.alert("SignUp", "SignUp successfully!");
            setEmail("");
            setPassword("");
            setName("");
            setAvatar(avatars[0].avatar);
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          alert("Email already exist!");
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
        <Text style={styles.title}>SIGN UP</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.formRow}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={[styles.input, { width: "70%" }]}
            maxLength={20}
          />
          <ModalDropdown
            options={avatars}
            renderRow={(options, index) => renderRow(options, index)}
            dropdownStyle={styles.dropdown}
          >
            <View style={styles.avatarWrapper}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: baseUrl + avatar,
                }}
              />
            </View>
          </ModalDropdown>
        </View>
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
          title={"SIGN UP"}
          type={"solid"}
          buttonStyle={styles.btn}
          disabled={
            email.trim().length !== 0 &&
            password.length !== 0 &&
            name.trim().length !== 0
              ? false
              : true
          }
          onPress={() => handleSignUp()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingTop: 10,
  },
  avatarWrapper: {
    padding: 10,
  },
  dropdown: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  content: {
    width: Dimensions.get("screen").width * 0.8,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  row: {
    width: 300,
    backgroundColor: "#FFFFFF",
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
