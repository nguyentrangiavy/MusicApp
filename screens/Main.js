import React, { Component } from "react";
import Library from "./Library";
import MySongs from "./MySongs";
import SongPlayer from "./SongPlayer";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { fetchComments, fetchSongs } from "../redux/ActionCreators";
import Comment from "./Comment";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

const mapDispatchToProps = (dispatch) => ({
  fetchSongs: () => dispatch(fetchSongs()),
  fetchComments: () => dispatch(fetchComments()),
});

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator initialRouteName="Library">
      <HomeNavigator.Screen
        name="Library"
        component={Library}
        options={{ headerShown: false }}
      ></HomeNavigator.Screen>
      <HomeNavigator.Screen
        name="SongPlayer"
        component={SongPlayer}
        options={{ headerShown: false, presentation: "modal" }}
      ></HomeNavigator.Screen>
      <HomeNavigator.Screen
        name="Comment"
        component={Comment}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      ></HomeNavigator.Screen>
    </HomeNavigator.Navigator>
  );
}
function MySongsNavigatorScreen() {
  const MySongsNavigator = createStackNavigator();
  return (
    <MySongsNavigator.Navigator initialRouteName="MySongs">
      <MySongsNavigator.Screen
        name="MySongs"
        component={MySongs}
        options={{ headerShown: false }}
      ></MySongsNavigator.Screen>
      <MySongsNavigator.Screen
        name="SongPlayer"
        component={SongPlayer}
        options={{ headerShown: false, presentation: "modal" }}
      ></MySongsNavigator.Screen>
      <MySongsNavigator.Screen
        name="Comment"
        component={Comment}
        options={{ headerShown: false, presentation: "modal" }}
      ></MySongsNavigator.Screen>
    </MySongsNavigator.Navigator>
  );
}
function HomeTabNavigatorScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Music Library") {
            iconName = "music-box-multiple";
          } else if (route.name === "My Songs") {
            iconName = "album";
          } else if (route.name === "Profile") {
            iconName = "account-circle";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F15412",
        tabBarInactiveTintColor: "#EEEEEE",
        tabBarStyle: {
          backgroundColor: styles.tabBar.backgroundColor,
          shadowColor: styles.tabBar.shadowColor,
          height: styles.tabBar.height,
          borderTopColor: "#222831",
          shadowOffset: styles.tabBar.shadowOffset,
          shadowOpacity: styles.tabBar.shadowOpacity,
          shadowRadius: styles.tabBar.shadowRadius,
          elevation: styles.tabBar.elevation,
        },
      })}
    >
      <Tab.Screen
        name="Music Library"
        component={HomeNavigatorScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Songs"
        component={MySongsNavigatorScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
function LoginTabNavigatorScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Login") {
            iconName = "account-key";
          } else if (route.name === "Register") {
            iconName = "account-plus";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F15412",
        tabBarInactiveTintColor: "#EEEEEE",
        tabBarStyle: {
          backgroundColor: styles.tabBar.backgroundColor,
          shadowColor: styles.tabBar.shadowColor,
          height: styles.tabBar.height,
          borderTopColor: "#222831",
          shadowOffset: styles.tabBar.shadowOffset,
          shadowOpacity: styles.tabBar.shadowOpacity,
          shadowRadius: styles.tabBar.shadowRadius,
          elevation: styles.tabBar.elevation,
        },
      })}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
function MainNavigatorScreen() {
  const MainNavigator = createStackNavigator();
  return (
    <MainNavigator.Navigator initialRouteName="LoginTabNavigator">
      <MainNavigator.Screen
        name="LoginTabNavigator"
        component={LoginTabNavigatorScreen}
        options={{ headerShown: false }}
      ></MainNavigator.Screen>
      <MainNavigator.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigatorScreen}
        options={{ headerShown: false }}
      ></MainNavigator.Screen>
    </MainNavigator.Navigator>
  );
}
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationContainer>
          <MainNavigatorScreen></MainNavigatorScreen>
        </NavigationContainer>
      </React.Fragment>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchSongs();
    this.props.fetchComments();
  }
}
const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: "#222831",
    backgroundColor: "#222831",
    shadowColor: "#FFFFFF",
    height: 55,
    shadowOffset: {
      height: -10,
      width: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 20,
  },
});
export default connect(null, mapDispatchToProps)(Main);
