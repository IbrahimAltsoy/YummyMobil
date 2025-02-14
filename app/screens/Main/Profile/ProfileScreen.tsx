import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import userService from "../../../services/userService";
import { GetUserByIdResponse } from "../../../models/user/GetUserByIdQueryResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useNavigation } from "@react-navigation/native"; // 📌 Navigation için ekledik
import authService from "@/app/services/authService";
import * as SecureStore from "expo-secure-store";
import AuthContext from "@/app/context/AuthContext";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation(); // 📌 Navigation hook'u
  const [user, setUser] = useState<GetUserByIdResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState("tr");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const authContext = useContext(AuthContext); // 📌 Önce değişkene atayalım

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { logout } = authContext; // 📌 logout fonksiyonunu güvenli şekilde al
  useEffect(() => {
    const fetchUserAndLanguage = async () => {
      setLoading(true);

      try {
        const userData = await userService.getUserById();
        if (userData) {
          setUser(userData);
        } else {
          Alert.alert(t("Hata"), t("Kullanıcı bilgileri getirilemedi."));
        }

        const storedLanguage = await AsyncStorage.getItem("appLanguage");
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        Alert.alert(t("Hata"), t("Veri yüklenirken bir hata oluştu."));
      }

      setLoading(false);
    };

    fetchUserAndLanguage();
  }, []);

  const changeLanguage = async (lang: any) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem("appLanguage", lang);
    setModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      //await userService.deleteUser();
      Alert.alert(t("Başarılı"), t("Hesabınız başarıyla silindi."));
      //navigation.navigate("Login"); // 📌 Hesap silindikten sonra login ekranına yönlendir
    } catch (error) {
      Alert.alert(t("Hata"), t("Hesap silinirken bir hata oluştu."));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      Alert.alert(t("Başarılı"), t("Başarıyla çıkış yapıldı."));
    } catch (error) {
      Alert.alert(t("Hata"), t("Çıkış yapılırken bir hata oluştu."));
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("Profil Bilgileri")}</Text>

      <Image
        source={{ uri: user?.imageUrl || "https://via.placeholder.com/150" }}
        style={styles.profileImage}
      />

      <Text style={styles.userName}>
        {user?.name} {user?.surname}
      </Text>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <Text style={styles.userPhone}>
        {user?.phoneNumber || t("Telefon Yok")}
      </Text>

      <View style={styles.languageWrapper}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>
            {selectedLanguage === "tr" ? "🇹🇷  Türkçe" : "🇬🇧  English"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>{t("Çıkış Yap")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setDeleteModalVisible(true)}
      >
        <Text style={styles.buttonText}>{t("Hesabımı Sil")}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Dil Seç")}</Text>

            <TouchableOpacity
              onPress={() => changeLanguage("tr")}
              style={styles.modalOption}
            >
              <Text>🇹🇷 Türkçe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguage("en")}
              style={styles.modalOption}
            >
              <Text>🇬🇧 English</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={deleteModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Hesabını Sil")}</Text>
            <Text style={styles.modalText}>
              {t(
                "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
              )}
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.buttonText}>{t("Evet, Sil")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>{t("İptal")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007bff",
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  userPhone: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  languageWrapper: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  languageButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderWidth: 1,
    borderColor: "#bbb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 15,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  exitButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
});

export default ProfileScreen;
