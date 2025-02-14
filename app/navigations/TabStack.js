import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Main/Home/HomeScreen";
import EventScreen from "../screens/Main/Event/EventScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import ProfileScreen from "../screens/Main/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Event") {
          iconName = focused ? "calendar" : "calendar-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "settings" : "settings-outline";
        }

        return (
          <Ionicons
            name={iconName}
            size={focused ? size + 2 : size}
            color={color}
          />
        );
      },
      tabBarLabel: ({ focused, color }) => (
        <Text
          style={{
            fontSize: 12,
            fontWeight: focused ? "bold" : "normal",
            color,
          }}
        >
          {route.name}
        </Text>
      ),
      tabBarStyle: {
        backgroundColor: "#fff",
        height: 60,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -2 },
      },
      tabBarActiveTintColor: "#FF5733",
      tabBarInactiveTintColor: "#8E8E8E",
    })}
  >
    <Tab.Screen
      name="Home"
      options={{ headerShown: false }}
      statusBarStyle="auto"
      component={HomeScreen}
    />
    <Tab.Screen
      name="Event"
      statusBarStyle="auto"
      component={EventScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default TabStack;
