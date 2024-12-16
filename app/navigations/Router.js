import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kullanıcı doğrulama durumu

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("accessToken"); // Token'ı kontrol et
      setIsAuthenticated(!!token); // Eğer token varsa, giriş yapmış sayılır
      // console.log(token); // Burada token değerini kontrol edin
      // console.log(isAuthenticated);
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return null; // Token kontrolü yapılırken, yükleniyor mesajı gösterebilirsiniz
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default Router;
