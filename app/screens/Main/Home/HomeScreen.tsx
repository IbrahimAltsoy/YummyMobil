import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "./Home.Style";
import SearchFilterSection from "@/app/components/SearchFilterSection/SearchFilterSection";
import YCard from "@/app/components/YCard/YCard";
import GooglePlacesService from "../../../services/googlePlacesService";
import { GoogleNearPlaces } from "../../../models/googlePlaces/googleNearPlaces";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";
import LottieView from "lottie-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen: React.FC = () => {
  const navigation: any | undefined = useNavigation();
  const [placesData, setPlacesData] = useState<GoogleNearPlaces[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState(["restaurant"]); // Varsayılan "restaurant"
  const [radius, setRadius] = useState(1000); // API'ye gidecek gerçek değer
  const [tempRadius, setTempRadius] = useState(1000); // Kullanıcının değiştirdiği geçici değer
  const [modalVisible, setModalVisible] = useState(false);

  // 📌 Kategori değiştiğinde çağrılacak fonksiyon
  const handleCategoryChange = async (types: any) => {
    setSelectedTypes(types);
    await fetchPlaces(types, radius);
  };

  // 📌 API'den işletmeleri getirme fonksiyonu
  const fetchPlaces = async (
    categoryTypes: string | string[],
    radius: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      if (!categoryTypes) {
        categoryTypes = ["restaurant"];
      } else if (typeof categoryTypes === "string") {
        categoryTypes = [categoryTypes];
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("❌ Konum izni verilmedi.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
      });

      const selectedCategory = categoryTypes.join(",");
      const data = await GooglePlacesService.getNearbyPlaces(
        selectedCategory,
        location.coords.latitude,
        location.coords.longitude,
        radius // 📌 Kullanıcının seçtiği radius değeri burada kullanılıyor
      );

      setPlacesData(data);
    } catch (err: any) {
      setError("Veriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 İlk yüklemede varsayılan kategori ("restaurant") ile API çağrısı

  const handleBusinessDetails = (place_id: string) => {
    navigation.navigate("businessdetails", { place_id });
  };

  const renderCard = ({ item }: { item: GoogleNearPlaces }) => (
    <YCard
      name={item.name}
      place_id={item.place_id}
      vicinity={item.vicinity}
      rating={item.rating}
      photoUrl={item.photoUrl}
      user_Ratings_Total={item.user_Ratings_Total}
      distance={item.distance}
      onPlacePress={handleBusinessDetails}
    />
  );

  return (
    <View style={styles.container}>
      <SearchFilterSection onCategorySelect={handleCategoryChange} />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 15,
              width: "85%",
              elevation: 5,
            }}
          >
            {/* Başlık */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                📍 Yakınlık Ayarı
              </Text>
            </View>

            {/* Slider */}
            <Slider
              style={{ width: "100%", marginVertical: 10 }}
              minimumValue={500}
              maximumValue={5000}
              step={100}
              value={tempRadius} // Geçici state ile değiştiriyoruz
              onValueChange={(value) => setTempRadius(value)} // Kullanıcı kaydırdıkça güncelleniyor ama istek atmıyor
            />

            {/* Seçilen Çap */}
            {/* <Text
              style={{ textAlign: "center", fontSize: 16, marginBottom: 15 }}
            >
              Seçilen Çap: {tempRadius} metre
            </Text> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 }}
              >
                🔎
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#444" }}>
                Yakınlık Mesafesi {tempRadius} metre
              </Text>
            </View>

            {/* Butonlar */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* İptal Butonu */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#d9534f",
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 5,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  İptal
                </Text>
              </TouchableOpacity>

              {/* Uygula Butonu */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFB800",
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 5,
                }}
                onPress={() => {
                  setRadius(tempRadius); // Asıl radius'u güncelle
                  setModalVisible(false); // Modalı kapat
                  fetchPlaces(selectedTypes, tempRadius); // API çağrısı sadece burada yapılıyor
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Uygula
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          {/* 📌 Küçültülmüş ve Daha Minimal Konum Butonu */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="location-outline" size={18} color="white" />
          </TouchableOpacity>
          {/* 📌 Yakındaki işletmeleri keşfet metnini ortaladık */}
          <View style={styles.textContainer}>
            <Text style={styles.description}>
              👋 Yakındaki işletmeleri keşfet!
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            source={require("../../../assets/json/loading.json")} // Buraya bir animasyon ekleyebilirsin!
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#444",
              marginTop: 10,
            }}
          >
            Mekanları senin için keşfediyoruz...
          </Text>
        </View>
      ) : (
        <FlatList
          data={placesData}
          keyExtractor={(item) => item.place_id}
          renderItem={renderCard}
        />
      )}
    </View>
  );
};

export default HomeScreen;
