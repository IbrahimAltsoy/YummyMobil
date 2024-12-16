import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#B22222",
    textAlign: "center",
    marginBottom: 20,
  },
  tag: {
    fontSize: 18,
    color: "#00008B",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  tagline: {
    fontSize: 26,
    color: "#00008B",

    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#5F9EA0",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
