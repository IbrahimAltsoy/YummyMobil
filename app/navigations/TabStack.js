import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Main/Home/HomeScreen";
import ProfileScreen from "../screens/Main/Profile/ProfileScreen";
import ServiceScreen from "../screens/Main/Service/ServiceScreen";
import { Ionicons } from "@expo/vector-icons"; // İkonları import ediyoruz.

const Tab = createBottomTabNavigator();

const TabStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Service") {
          iconName = focused ? "settings" : "settings-outline";
        }

        // Ionicons ile ikon oluşturuluyor
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato", // Aktif sekmenin rengi
      tabBarInactiveTintColor: "gray", // İnaktif sekmenin rengi
    })}
  >
    <Tab.Screen
      name="Home"
      options={{ headerShown: false }}
      component={HomeScreen}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Service" component={ServiceScreen} />
  </Tab.Navigator>
);

export default TabStack;
