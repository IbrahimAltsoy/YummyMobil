import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundLogo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7, // Opaklık vererek logoyu arka plan yapıyoruz
    zIndex: -1, // Arka planda görünsün diye diğer öğelerin altına alıyoruz
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    backgroundImage: "linear-gradient(to right, #FFD700, #FFA500)",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "80%", // Ekranın %80'ini kaplama
    marginBottom: 15,
    borderColor: "#FFD700",
    borderRadius: 25, // Köşeleri yuvarlatma
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700", // Sarı renk
    width: "80%", // Ekranın %80'ini kaplama
    borderRadius: 25,
    marginBottom: 20,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginRight: 10, // Buton ile aralarına mesafe ekliyoruz
    fontWeight: "500",
  },
  linkContainer: {
    flexDirection: "row", // Yatay hizalama
    justifyContent: "flex-start", // Sola yaslama
    alignItems: "center", // Dikeyde ortalama
    width: "80%", // Genişlik
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10, // Butonlar arasına mesafe eklemek için
    borderRadius: 20, // Köşeleri yuvarlatıyoruz
    fontSize: 16,
    color: "#FFD700", // Buton rengi sarı
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row", // Butonları yatay hizalar
    justifyContent: "space-between", // Birini sola, diğerini sağa yaslar
    alignItems: "center", // Dikeyde ortalar
    marginTop: 20,
  },
});
export default styles;
