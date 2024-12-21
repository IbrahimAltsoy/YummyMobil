import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

import styles from "./YButton.Style";

type YButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
};

const YButton: React.FC<YButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  backgroundColor = "#007bff",
  textColor = "#fff",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[{ backgroundColor, padding: 12, borderRadius: 5 }, style]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text style={[{ color: textColor, fontSize: 16 }, textStyle]}>
          {loading ? "Yükleniyor..." : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default YButton;
