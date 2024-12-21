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
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 0,
  },
  linkButton: {
    backgroundColor: "transparent",
    borderColor: "transparent", // Link butonları için sınır yok
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  socialButtonContainer: {
    width: "80%",
  },
  socialButton: {
    backgroundColor: "transparent",
    borderColor: "#FFD700",
    borderWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export default styles;
