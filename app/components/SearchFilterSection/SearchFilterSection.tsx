import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const categories = [
  { id: 1, name: "Restoranlar", icon: "restaurant", color: "#FFA500" },
  { id: 2, name: "Plajlar", icon: "sunny", color: "#00BFFF" },
  { id: 3, name: "Kafeler", icon: "cafe", color: "#8B4513" },
  { id: 4, name: "Barlar", icon: "beer", color: "#800080" },
  { id: 5, name: "Spor Salonları", icon: "fitness", color: "#DC143C" },
  {
    id: 6,
    name: "Telefon Dükkanları",
    icon: "phone-portrait",
    color: "#FFD700",
  },
  { id: 7, name: "Güzellik Merkezleri", icon: "heart", color: "#FF69B4" },
];

interface SearchFilterProps {
  onNearbyPress: () => void;
  onSearchPress: () => void;
  onCategorySelect: (category: any) => void;
}

const SearchFilterSection: React.FC<SearchFilterProps> = ({
  onNearbyPress,
  onSearchPress,
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <View style={styles.stickyHeader}>
      {/* 📌 Üst Butonlar */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007BFF" }]}
          onPress={onNearbyPress}
        >
          <Text style={styles.buttonText}>🔍 Yakınımdaki İşletmeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#28A745" }]}
          onPress={onSearchPress}
        >
          <Text style={styles.buttonText}>🔎 İşletme Ara</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 Kategori Seçimi - Yatay Scrollable Liste */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { backgroundColor: category.color },
              selectedCategory.id === category.id && styles.selectedCategory,
            ]}
            onPress={() => handleSelectCategory(category)}
          >
            <Icon name={category.icon} size={18} color="#fff" />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: "#000",
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 5,
  },
});

export default SearchFilterSection;
