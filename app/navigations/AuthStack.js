import React from "react";
import Login from "../screens/Auth/Login/LoginScreen";
import WelcomeScreen from "../screens/Welcome";
import RegisterScreen from "../screens/Auth/Register";
import ForgotPasswordScreen from "../screens/Auth/ForgotPassword/ForgotPassword";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      options={{ headerShown: false }}
    >
      {/* Auth ekranlarını burada tanımlayın */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
