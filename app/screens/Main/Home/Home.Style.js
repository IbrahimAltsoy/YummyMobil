import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  businessCard: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  businessLocation: {
    fontSize: 14,
    color: "#555",
  },
  commentSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  filterAndButtonContainer: {
    display: "flex",

    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryFilter: {
    flex: 1, // Kalan alanı eşit olarak kaplamasını sağlar
  },
  commentButton: {
    flex: 1, // Kalan alanı eşit olarak kaplamasını sağlar
    backgroundColor: "#FFB800",
  },
  buttonText: {
    color: "white",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#FFB800", // Google'ın mavi rengi
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  input: {
    color: "#FFB800",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  locationButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
