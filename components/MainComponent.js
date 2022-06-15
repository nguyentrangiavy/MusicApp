import React, { Component } from "react";
import Library from "./LibraryComponent";
import MySongs from "./MySongsComponent";
import SongPlayer from "./SongPlayerComponent";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { fetchComments, fetchSongs } from "../redux/ActionCreators";

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
    </MySongsNavigator.Navigator>
  );
}
const Tab = createBottomTabNavigator();
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === "Music Library") {
                  iconName = "music-box-multiple";
                } else if (route.name === "My Songs") {
                  iconName = "album";
                }
                return (
                  <MaterialIcons name={iconName} size={size} color={color} />
                );
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
          </Tab.Navigator>
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
    backgroundColor: "#222831",
    shadowColor: "#F9F9F9",
    height: 55,
    shadowOffset: {
      height: 12,
      width: 0,
    },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 24,
  },
});
export default connect(null, mapDispatchToProps)(Main);
