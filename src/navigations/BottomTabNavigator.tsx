import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { faHandsHolding } from "@fortawesome/free-solid-svg-icons";
import Duas from "../screens/Duas";
import Home from "../screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Compass from "../screens/Compass";
import Settings from "../screens/Settings";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [lazyLoad, setLazyLoad] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLazyLoad(false);
    }, 5000);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={{
        lazy: lazyLoad,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarOptions,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.focusedCircle,
                  {
                    backgroundColor: focused
                      ? "rgba(255,255,255,0.5)"
                      : "transparent",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="home"
                  size={hp(4)}
                  color="white"
                />
              </View>
              <Text style={styles.text}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Compass"
        component={Compass}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.focusedCircle,
                  {
                    backgroundColor: focused
                      ? "rgba(255,255,255,0.5)"
                      : "transparent",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="compass"
                  size={hp(4)}
                  color="white"
                />
              </View>
              <Text style={styles.text}>Qibla</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Duas"
        component={Duas}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.focusedCircle,
                  {
                    backgroundColor: focused
                      ? "rgba(255,255,255,0.5)"
                      : "transparent",
                  },
                ]}
              >
                <FontAwesomeIcon
                  size={hp(4)}
                  color="white"
                  icon={faHandsHolding}
                />
              </View>
              <Text style={styles.text}>Duas</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.focusedCircle,
                  {
                    backgroundColor: focused
                      ? "rgba(255,255,255,0.5)"
                      : "transparent",
                  },
                ]}
              >
                <MaterialCommunityIcons size={hp(4)} color="white" name="cog" />
              </View>
              <Text style={styles.text}>Settings</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarOptions: {
    backgroundColor: "rgba(255,255,255,0)",
    elevation: 0,
    marginHorizontal: 10,
    paddingTop: 20,
    height: 95,
    borderTopWidth: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(23), // Adjusted width to prevent text wrapping
  },
  focusedCircle: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
  },
  text: {
    color: "#fff",
    fontSize: hp(1.8),
    fontFamily: "Righteous_400Regular",
    textAlign: "center",
    marginTop: 5, // Added margin for better spacing
  },
});

export default BottomTabNavigator;
