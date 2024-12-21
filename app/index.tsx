import React from "react";
import Router from "./navigations/Router";
import { AuthProvider } from "./context/AuthContext";

export default function Page() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
