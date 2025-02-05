import React from "react";
import EventScreen from "../screens/Main/Event/EventScreen";
import ServiceScreen from "../screens/Main/Service/ServiceScreen";
import TabStack from "./TabStack";
import BusinessDetailScreen from "../screens/Main/BusinessDetail/BusinessDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";

// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  // <AuthProvider>
  <Stack.Navigator initialRouteName="TabStack">
    <Stack.Screen
      name="TabStack"
      component={TabStack}
      options={{ headerShown: false }}
    />

    <Stack.Screen name="event" component={EventScreen} />
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
