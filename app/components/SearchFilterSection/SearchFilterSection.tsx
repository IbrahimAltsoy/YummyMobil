import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // İkonlar için

// 📌 ENUMLARA GÖRE KATEGORİLERİN TANIMLANMASI
const categories = [
  {
    name: "Genel",
    color: "#FFA500",
    types: [
      { label: "Restoran", value: "restaurant", icon: "restaurant" },
      { label: "Kafe", value: "cafe", icon: "cafe" },
      { label: "Bar", value: "bar", icon: "beer" },
      { label: "Süpermarket", value: "supermarket", icon: "cart" },
    ],
  },
  {
    name: "Eğlence",
    color: "#8B4513",
    types: [
      { label: "Park", value: "park", icon: "leaf" },
      { label: "Müze", value: "museum", icon: "book" },
      { label: "Sinema", value: "movie_theater", icon: "videocam" },
      { label: "Gece Kulübü", value: "night_club", icon: "musical-notes" },
      { label: "Stadyum", value: "stadium", icon: "football" },
    ],
  },
  {
    name: "Seyahat",
    color: "#800080",
    types: [
      { label: "Tren İstasyonu", value: "train_station", icon: "train" },
      { label: "Otobüs Durağı", value: "bus_station", icon: "bus" },
      { label: "Taksi Durağı", value: "taxi_stand", icon: "car-sport" },
      { label: "Havalimanı", value: "airport", icon: "airplane" },
      { label: "Araç Kiralama", value: "car_rental", icon: "car" },
      { label: "Otopark", value: "parking", icon: "car-outline" },
    ],
  },
  {
    name: "Hizmetler",
    color: "#00BFFF",
    types: [
      { label: "Banka", value: "bank", icon: "cash" },
      { label: "ATM", value: "atm", icon: "card" },
      { label: "Hastane", value: "hospital", icon: "medkit" },
      { label: "Eczane", value: "pharmacy", icon: "medkit-outline" },
      { label: "Polis", value: "police", icon: "shield" },
      { label: "Postane", value: "post_office", icon: "mail" },
    ],
  },
  {
    name: "Diğer",
    color: "#4B0082",
    types: [
      { label: "Hindu Tapınağı", value: "hindu_temple", icon: "home" },
      { label: "Sinagog", value: "synagogue", icon: "star-of-david" },
      { label: "Tren İstasyonu", value: "train_station", icon: "train" },
    ],
  },
];

interface SearchFilterProps {
  onCategorySelect: (selectedType: string) => void;
}

const SearchFilterSection: React.FC<SearchFilterProps> = ({
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Varsayılan kategori
  const [modalVisible, setModalVisible] = useState(false); // Modal kontrolü

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleSelectType = (type: string) => {
    onCategorySelect(type); // Backend'e İngilizce değeri gönder
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 📌 Yatay Scroll Kategoriler */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[styles.categoryButton, { backgroundColor: category.color }]}
            onPress={() => handleSelectCategory(category)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 📌 MODAL - Kullanıcı Dostu Seçenekler */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCategory.name} Seç</Text>

            {/* 📌 Seçenekler (Türkçe + İkonlu) */}
            {selectedCategory.types.map((type, index) => (
              <TouchableOpacity
                key={`${type.value}-${index}`}
                style={styles.modalOption}
                onPress={() => handleSelectType(type.value)}
              >
                <Icon name={type.icon} size={24} color="#333" />
                <Text style={styles.modalOptionText}>{type.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  categoryContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 5,
  },
  // 📌 Modal için stil ayarları
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Arkaplanı saydam yap
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FF4D4D",
    borderRadius: 5,
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SearchFilterSection;
