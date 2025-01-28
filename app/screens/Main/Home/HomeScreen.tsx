import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import styles from "./Home.Style";
import HeaderSection from "../../../testScreen/HeaderSection";
import CategoryFilter from "../../../testScreen/CategoryFilter";
import YCard from "@/app/components/YCard/YCard";
import GooglePlacesService from "../../../services/googlePlacesService";
import { GoogleNearPlaces } from "../../../models/googlePlaces/googleNearPlaces"; // Model

const HomeScreen: React.FC = () => {
  const [placesData, setPlacesData] = useState<GoogleNearPlaces[]>([]); // Veriler
  const [loading, setLoading] = useState<boolean>(false); // Yüklenme durumu
  const [error, setError] = useState<string | null>(null); // Hata mesajı

  // Verileri API'den çekmek için fonksiyon
  const fetchPlaces = async () => {
    try {
      setLoading(true); // Yüklenme başladığında
      setError(null); // Önceki hatayı temizle

      const latitude = 38.4192; // Örnek konum (İzmir)
      const longitude = 27.1287;

      const data = await GooglePlacesService.getNearbyPlaces(
        latitude,
        longitude
      );
      setPlacesData(data); // Verileri kaydet
    } catch (err: any) {
      setError("Veriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false); // Yüklenme bittiğinde
    }
  };

  // İlk yüklemede API çağrısı
  useEffect(() => {
    fetchPlaces();
  }, []);

  const renderCard = ({ item }: { item: GoogleNearPlaces }) => (
    <YCard
      name={item.name}
      place_id={item.place_id}
      vicinity={item.vicinity}
      rating={item.rating}
      photoUrl={item.photoUrl}
      user_Ratings_Total={item.user_Ratings_Total}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderSection onNearbyPress={() => {}} onSearchPress={() => {}} />
      <CategoryFilter
        onCategorySelect={(category: any) => console.log(category)}
      />
      {loading && <ActivityIndicator size="large" color="#000" />}{" "}
      {/* Yüklenme durumu */}
      {error && <Text style={styles.errorText}>{error}</Text>}{" "}
      {/* Hata Mesajı */}
      {!loading && !error && (
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
