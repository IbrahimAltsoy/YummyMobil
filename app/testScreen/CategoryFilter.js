import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Icon kütüphanesi

const categories = [
  { id: 1, name: "Restoranlar", icon: "restaurant" },
  { id: 2, name: "Plajlar", icon: "sunny" },
  { id: 3, name: "Kafeler", icon: "cafe" },
  { id: 4, name: "Barlar", icon: "beer" },
  { id: 5, name: "Spor Salonları", icon: "fitness" },
  { id: 6, name: "Telefon Dükkanları", icon: "phone-portrait" },
  { id: 7, name: "Güzellik Merkezleri", icon: "heart" },
];

const CategoryDropdown = ({ onCategorySelect }) => {
  // Başlangıçta "Restoranlar" seçili
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // İlk kategori olarak "Restoranlar" seçiliyor

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    setIsOpen(false); // Dropdown'u kapat
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.dropdownButton}
      >
        <View style={styles.selectedCategoryContainer}>
          <Icon
            name={selectedCategory.icon}
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.dropdownText}>
            {selectedCategory ? selectedCategory.name : "Kategori Seç"}
          </Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectCategory(item)}
                    style={styles.optionButton}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      color="#FFB800"
                      style={styles.icon}
                    />
                    <Text style={styles.optionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: "#FFB800",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CategoryDropdown;
