import React from "react";
import HomeScreen from "../screens/Main/Home/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import ProfileScreen from "../screens/Main/Profile/ProfileScreen";
import ServiceScreen from "../screens/Main/Service/ServiceScreen";
import TabStack from "./TabStack";
const Drawer = createDrawerNavigator();

const MainStack = () => (
  // <AuthProvider>
  <Drawer.Navigator initialRouteName="Tabs">
    <Drawer.Screen
      name="Tabs"
      component={TabStack}
      options={{ headerShown: false }}
    />
    <Drawer.Screen name="profile" component={ProfileScreen} />
    <Drawer.Screen name="service" component={ServiceScreen} />
  </Drawer.Navigator>
  // </AuthProvider>
);

export default MainStack;
