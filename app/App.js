import React from "react";
import Router from "./navigations/Router";
import AuthContext, { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
