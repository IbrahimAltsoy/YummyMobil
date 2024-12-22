import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HeaderSection = ({ onNearbyPress, onSearchPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonOnNearby} onPress={onNearbyPress}>
        <Text style={styles.buttonText}>Yakınındaki İşletmeler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOnSrearch} onPress={onSearchPress}>
        <Text style={styles.buttonText}>İşletme Ara</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Yatay hizalama
    justifyContent: "space-between", // Eşit boşluk
    alignItems: "center",
    padding: 10,
  },
  buttonOnNearby: {
    flex: 1, // İki butonun eşit genişlikte olması
    marginHorizontal: 0, // Butonlar arası boşluk
    backgroundColor: "#FFB800",
    paddingVertical: 12,
    borderTopLeftRadius: 10,
    alignItems: "center",
  },
  buttonOnSrearch: {
    flex: 1, // İki butonun eşit genişlikte olması
    marginHorizontal: 0, // Butonlar arası boşluk
    backgroundColor: "#FFB800",
    paddingVertical: 12,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HeaderSection;
