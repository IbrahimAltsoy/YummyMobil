import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import styles from "./YInput.Style";

interface YInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
}

const YInput: React.FC<YInputProps> = ({
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        {...props} // Diğer opsiyonel props'lar
      />
    </View>
  );
};

export default YInput;
