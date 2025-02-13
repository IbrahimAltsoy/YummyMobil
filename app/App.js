import React from "react";
import Router from "./navigations/Router";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";
import "./i18n";

const App = () => {
  return (
    <>
      <I18nextProvider i18n={i18n}>
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
      </I18nextProvider>
    </>
  );
};

export default App;
