import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";
import AppContext from "./../context/AppContext";
import { signOut } from "firebase/auth";

function Profile({ navigation }) {
  const myContext = useContext(AppContext);
  const handleSignOut = () => {
    Alert.alert(
      "Sign out?",
      "Are you sure?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "OK",
          onPress: () => {
            signOut(myContext.auth);
            myContext.setUser({});
            navigation.navigate("LoginTabNavigator", { screen: "Login" });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#222831" />
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.avatar}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: myContext.user.avatar,
              }}
            />
          </View>
          <View style={styles.row}>
            <MaterialIcons
              name="card-account-details"
              size={20}
              color={"#FFFFFF"}
            />
            <Text style={styles.name}>{myContext.user.name}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="email" size={20} color={"#FFFFFF"} />
            <Text style={styles.email}>{myContext.user.email}</Text>
          </View>
        </View>
        <View style={styles.control}>
          <TouchableOpacity
            style={styles.controlItem}
            onPress={() => handleSignOut()}
          >
            <MaterialIcons name="logout" size={30} color={"#FFFFFF"} />
            <Text style={styles.controlText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width + 50,
    backgroundColor: "#222831",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  info: {
    backgroundColor: "#F14512",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    padding: 20,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    alignSelf: "center",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  email: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
  control: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.1,
    backgroundColor: "#F14512",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  controlItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
  },
  controlText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
});
