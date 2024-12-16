import React from "react";
import Router from "./navigations/Router";
import { NavigationContainer } from "@react-navigation/native";
 
// değişikliklr 
const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
