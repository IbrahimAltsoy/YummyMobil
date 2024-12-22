import React from "react";
import { View, Text } from "react-native";
import styles from "./Service.Style";

const ServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servis tarafıyım ben</Text>
      <Text style={styles.paragraph}>Bu benim ilk React Native sayfam.</Text>
    </View>
  );
};

export default ServiceScreen;
