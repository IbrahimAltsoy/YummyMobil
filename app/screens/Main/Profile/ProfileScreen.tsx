import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Switch,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    name: "İbrahim Altsoy",
    email: "ibrahim@example.com",
    phone: "555-123-4567",
    address: "İstanbul, Türkiye",
    socialAccounts: ["Google", "Facebook"],
    imageUrl: "https://via.placeholder.com/150",
    theme: false,
    notifications: true,
    language: i18n.language, // Başlangıçta i18n'den al
  });

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("user-language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        setUser((prev) => ({ ...prev, language: savedLanguage }));
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (newLanguage: any) => {
    await i18n.changeLanguage(newLanguage);
    await AsyncStorage.setItem("user-language", newLanguage);
    setUser((prev) => ({ ...prev, language: newLanguage }));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(t("İzin Gerekli"), t("Galeri izni gerekli"));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, imageUrl: result.assets[0].uri });
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    Alert.alert(t("Çıkış Başarılı"), t("Çıkış Mesajı"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("Profil Bilgileri")}</Text>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
          <View style={styles.imageEditIcon}>
            <MaterialIcons name="photo-camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
        <Text style={styles.userAddress}>{user.address}</Text>
        <Text style={styles.userSocial}>
          {t("Hesapları bağla")}: {user.socialAccounts.join(", ")}
        </Text>
      </View>

      {/* Dil Seçeneği */}
      <View style={styles.switchContainer}>
        <Text>{t("Dil Seçeneği")}: </Text>
        <TouchableOpacity
          onPress={() => changeLanguage(user.language === "tr" ? "en" : "tr")}
        >
          <Text style={styles.languageButton}>
            {user.language === "tr" ? "🇹🇷 Türkçe" : "🇬🇧 English"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setDeleteModalVisible(true)}
      >
        <Text style={styles.buttonText}>{t("Hesabı Sil")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>{t("Çıkış")}</Text>
      </TouchableOpacity>

      <Modal visible={deleteModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>{t("Onayla")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("Silme Nedeni")}
            value={deleteReason}
            onChangeText={setDeleteReason}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteModalVisible(false)}
          >
            <Text style={styles.buttonText}>{t("Hesabı Sil")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setDeleteModalVisible(false)}
          >
            <Text style={styles.buttonText}>{t("İptal")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#ff5733",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
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
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  imageEditIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007bff",
    borderRadius: 15,
    padding: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  userPhone: {
    fontSize: 14,
    color: "gray",
  },
  userAddress: {
    fontSize: 14,
    color: "gray",
  },
  userSocial: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "90%",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
  },
  picker: {
    height: 40,
    width: 150,
  },
  languageButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  newLanguage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc3545",
  },
});

export default ProfileScreen;
