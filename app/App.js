import React from "react";
import Router from "./navigations/Router";
import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "react-native";
const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
