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
    opacity: 0.7,
    zIndex: -1,
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
    width: "80%",
    marginBottom: 15,
    borderColor: "#FFD700",
    borderRadius: 25,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    width: "80%",
    borderRadius: 25,
    marginBottom: 20,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
    fontWeight: "500",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 20,
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 12,
  },
  errorInput: {
    borderColor: "red",
  },
});
export default styles;
