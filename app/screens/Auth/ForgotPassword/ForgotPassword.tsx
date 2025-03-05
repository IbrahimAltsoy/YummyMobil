import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YButton from "../../../components/YButton/YButton"; // YButton bileşeninizin olduğu yeri doğru şekilde import edin
import authService from "@/app/services/authService";
import { PasswordResetCommandRequest } from "../../../models/auth/PasswordResetCommandRequest";
interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}
const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>(""); // email state'i tanımlandı

  const handleResetPassword = async () => {
    if (email) {
      const request: PasswordResetCommandRequest = { email }; // Email'i bir obje olarak gönder
      try {
        const response = await authService.forgotPassword(request);
        Alert.alert(
          response.success ? "Başarılı" : "Başarısız",
          response.message
        );
        navigation.navigate("Login"); // İşlem tamamlandıktan sonra login ekranına yönlendir
      } catch (error) {
        Alert.alert(
          "Hata",
          "Şifre sıfırlama işlemi sırasında bir hata oluştu."
        );
      }
    } else {
      Alert.alert("Hata", "Lütfen e-posta adresinizi girin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifremi Sıfırla</Text>
      <Text style={styles.subtitle}>
        Şifrenizi sıfırlamak için e-posta adresinizi girin.
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)} // email state'ini güncelle
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <YButton
        title="Gönder"
        onPress={handleResetPassword} // Fonksiyonu doğru şekilde atadık
        style={styles.resetButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ForgotPasswordScreen;
