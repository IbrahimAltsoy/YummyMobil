import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login/Login";
import Home from "../screens/Main/Home/Home";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      {/* Auth ekranlarını burada tanımlayın */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthStack;
