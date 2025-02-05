import React from "react";
import Router from "./navigations/Router";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        translucent={false}
        backgroundColor="#f4f4f4"
      />
      <AuthProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
};

export default App;
