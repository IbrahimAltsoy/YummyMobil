import React from "react";
import HomeScreen from "../screens/Main/Home/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContext, { AuthProvider } from "../context/AuthContext";
const Stack = createStackNavigator();

const MainStack = () => (
  // <AuthProvider>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
  // </AuthProvider>
);

export default MainStack;
