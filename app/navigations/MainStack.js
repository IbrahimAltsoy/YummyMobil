import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Main/Home/Home";
import Login from "../screens/Auth/Login/Login";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* Main ekranlarını burada tanımlayın */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default MainStack;
