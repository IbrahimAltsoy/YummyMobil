import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import styles from "./Home.Style";
import AuthContext from "../../../context/AuthContext";

// Navigation prop'unun tipi
interface Props {
  navigation: {
    openDrawer: () => void;
  };
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { logout }: any = useContext(AuthContext);
  const { user }: any = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(); // logout fonksiyonunu çağırıyoruz
    } catch (error) {
      Alert.alert("Logout Hatası", "Çıkış işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()} // Burada menüyü açıyoruz
          style={styles.menuButton}
        >
          {/* <Icon name="menu" size={30} color="black" /> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>Home Screen</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.mainText}>Welcome to Bawer AKAR!</Text>
        <Text style={styles.mainText}>user: {user}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;
