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
    name: "Yeme & İçme",
    color: "#F4A261",
    types: [
      { label: "Restoran", value: "restaurant", icon: "restaurant" },
      { label: "Kafe", value: "cafe", icon: "cafe" },
      { label: "Bar", value: "bar", icon: "beer" },
      { label: "Fırın", value: "bakery", icon: "bread" },
      { label: "Yemek Dağıtımı", value: "meal_delivery", icon: "fast-food" },
      { label: "Paket Yemek", value: "meal_takeaway", icon: "cart" },
      { label: "Süpermarket", value: "supermarket", icon: "cart-outline" },
      { label: "İçki Mağazası", value: "liquor_store", icon: "wine" },
    ],
  },
  {
    name: "Ulaşım & Seyahat",
    color: "#457B9D",
    types: [
      { label: "Havalimanı", value: "airport", icon: "airplane" },
      { label: "Otobüs Durağı", value: "bus_station", icon: "bus" },
      { label: "Tren İstasyonu", value: "train_station", icon: "train" },
      { label: "Metro İstasyonu", value: "subway_station", icon: "subway" },
      { label: "Taksi Durağı", value: "taxi_stand", icon: "car-sport" },
      { label: "Araç Kiralama", value: "car_rental", icon: "car" },
      { label: "Otopark", value: "parking", icon: "car-outline" },
      { label: "Benzin İstasyonu", value: "gas_station", icon: "flame" },
    ],
  },
  {
    name: "Sağlık",
    color: "#D32F2F",
    types: [
      { label: "Hastane", value: "hospital", icon: "medkit" },
      { label: "Doktor", value: "doctor", icon: "person" },
      { label: "Diş Hekimi", value: "dentist", icon: "happy-outline" },
      { label: "Eczane", value: "pharmacy", icon: "medkit-outline" },
      { label: "Veteriner", value: "veterinary_care", icon: "paw" },
      { label: "Fizyoterapist", value: "physiotherapist", icon: "body" },
    ],
  },
  {
    name: "Alışveriş",
    color: "#2A9D8F",
    types: [
      { label: "Giyim Mağazası", value: "clothing_store", icon: "shirt" },
      { label: "Ayakkabı Mağazası", value: "shoe_store", icon: "walk" },
      {
        label: "Elektronik Mağazası",
        value: "electronics_store",
        icon: "phone-portrait",
      },
      { label: "Hırdavatçı", value: "hardware_store", icon: "construct" },
      { label: "Mobilya Mağazası", value: "furniture_store", icon: "bed" },
      { label: "Kitapçı", value: "book_store", icon: "book" },
      {
        label: "Alışveriş Merkezi",
        value: "shopping_mall",
        icon: "storefront",
      },
      { label: "Bakkal", value: "convenience_store", icon: "basket" },
    ],
  },
  {
    name: "Kültür & Eğlence",
    color: "#E76F51",
    types: [
      { label: "Müze", value: "museum", icon: "book" },
      { label: "Sanat Galerisi", value: "art_gallery", icon: "brush" },
      { label: "Stadyum", value: "stadium", icon: "football" },
      { label: "Tiyatro", value: "theater", icon: "musical-notes" },
      { label: "Sinema", value: "movie_theater", icon: "videocam" },
      { label: "Gece Kulübü", value: "night_club", icon: "musical-notes" },
      { label: "Lunapark", value: "amusement_park", icon: "sparkles" },
      { label: "Akvaryum", value: "aquarium", icon: "fish" },
      { label: "Hayvanat Bahçesi", value: "zoo", icon: "paw" },
      { label: "Turistik Yer", value: "tourist_attraction", icon: "compass" },
      { label: "Park", value: "park", icon: "leaf" },
    ],
  },
  {
    name: "Eğitim",
    color: "#1D3557",
    types: [
      { label: "Okul", value: "school", icon: "school" },
      { label: "İlkokul", value: "primary_school", icon: "pencil" },
      {
        label: "Ortaokul / Lise",
        value: "secondary_school",
        icon: "pencil-sharp",
      },
      { label: "Üniversite", value: "university", icon: "library" },
      { label: "Kütüphane", value: "library", icon: "book" },
    ],
  },

  {
    name: "Kamu & Resmi Kurumlar",
    color: "#264653",
    types: [
      { label: "Polis Merkezi", value: "police", icon: "shield" },
      { label: "İtfaiye", value: "fire_station", icon: "flame" },
      { label: "Postane", value: "post_office", icon: "mail" },
      { label: "Belediye Binası", value: "city_hall", icon: "business" },
      { label: "Mahkeme", value: "courthouse", icon: "hammer" },
      { label: "Büyükelçilik", value: "embassy", icon: "flag" },
      {
        label: "Yerel Yönetim",
        value: "local_government_office",
        icon: "people",
      },
    ],
  },

  {
    name: "Finans & Hukuk",
    color: "#14213D",
    types: [
      { label: "Banka", value: "bank", icon: "cash" },
      { label: "ATM", value: "atm", icon: "card" },
      {
        label: "Sigorta Acentesi",
        value: "insurance_agency",
        icon: "document-text",
      },
      { label: "Avukat", value: "lawyer", icon: "document" },
    ],
  },
  {
    name: "Hizmetler",
    color: "#00BFFF",
    types: [
      { label: "Çamaşırhane", value: "laundry", icon: "water" },
      { label: "Çilingir", value: "locksmith", icon: "key" },
      { label: "Tesisatçı", value: "plumber", icon: "construct" },
      { label: "Elektrikçi", value: "electrician", icon: "flash" },
      { label: "Boya & Dekorasyon", value: "painter", icon: "color-fill" },
      { label: "Kuaför", value: "hair_care", icon: "cut" },
      { label: "Güzellik Salonu", value: "beauty_salon", icon: "sparkles" },
      { label: "SPA", value: "spa", icon: "flower" },
      { label: "Araba Yıkama", value: "car_wash", icon: "car" },
      { label: "Araba Tamiri", value: "car_repair", icon: "construct" },
      { label: "Nakliye Şirketi", value: "moving_company", icon: "cube" },
      { label: "Cenaze Hizmetleri", value: "funeral_home", icon: "skull" },
    ],
  },
];

const SearchFilterSection = ({ onCategorySelect }: any) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleSelectType = (type: any) => {
    onCategorySelect(type);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryButton,
              {
                backgroundColor: category.color,
                borderWidth: selectedCategory.name === category.name ? 2 : 0,
              },
            ]}
            onPress={() => handleSelectCategory(category)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCategory.name} Seç</Text>

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
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 5,
    borderColor: "#FFF",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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