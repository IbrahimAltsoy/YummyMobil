import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8", // Soft background color
    paddingHorizontal: 20, // Left and right padding for better spacing
  },
  logo: {
    width: 200, // Adjust logo size
    height: 200,
    marginBottom: 40, // More space from the title
    borderRadius: 100,
    overflow: "hidden",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333", // Dark color for contrast
    marginBottom: 10, // Space between title and motto
    textAlign: "center", // Center the title
  },
  motto: {
    fontSize: 18,
    fontStyle: "italic", // Make it stand out
    color: "#FFB800", // Yellow color to match button color
    marginBottom: 20, // Space between motto and description
    textAlign: "center", // Center the motto
    lineHeight: 25, // Improved readability with line height
  },
  description: {
    fontSize: 16,
    color: "#666", // Lighter color for the description
    textAlign: "center", // Center the description
    marginBottom: 40, // More space between description and button
    lineHeight: 24, // Improved readability with line height
  },
  button: {
    backgroundColor: "#FFB800", // Yellow color for the button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50, // Rounded corners
    width: "90%", // Make the button fill most of the screen width
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Add some shadow for 3D effect
  },
  buttonText: {
    color: "#fff", // White text on the button
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
