import React, { useContext, useState } from "react";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import AuthContext from "../context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default Router;
