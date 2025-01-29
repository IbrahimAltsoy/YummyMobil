import React from "react";
import HomeScreen from "../screens/Main/Home/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import ProfileScreen from "../screens/Main/Profile/ProfileScreen";
import ServiceScreen from "../screens/Main/Service/ServiceScreen";
import TabStack from "./TabStack";
import BusinessDetailScreen from "../screens/Main/BusinessDetail/BusinessDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";

// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  // <AuthProvider>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen name="profile" component={ProfileScreen} />
    <Stack.Screen name="service" component={ServiceScreen} />
    <Stack.Screen
      name="businessdetails"
      component={BusinessDetailScreen}
      options={{ title: "İşletme Detayı" }}
    />
  </Stack.Navigator>
  // </AuthProvider>
);

export default MainStack;
