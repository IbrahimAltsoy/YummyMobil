import React from "react";
import Router from "./navigations/Router";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function Page() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
