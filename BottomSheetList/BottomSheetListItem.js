import React from "react";
import { Text, StyleSheet, Pressable, View, Platform } from "react-native";
import Check from "../assets/images/Check";
import { getFontFamily } from "../utils/fontUtils";
import { useTheme } from "@react-navigation/native";

const BottomSheetListItem = ({ onChange, data, index }) => {
  const { dark } = useTheme();
  const baseTextColor = {
    color: dark ? "rgba(255, 255, 255, 0.8)" : "#5A5A5A",
  };
  const onPressHandler = ({ pressed }) => pressed && styles.pressed;

  return (
    <Pressable
      style={onPressHandler}
      onPress={onChange && onChange.bind(this, index)}
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            baseTextColor,
            data.isActive && { color: dark ? "#FFFFFF" : "#9E00FE" },
          ]}
        >
          {data.title}
        </Text>
        {data.isActive && <Check />}
      </View>
    </Pressable>
  );
};

export default BottomSheetListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    fontFamily: Platform.OS === "ios" ? getFontFamily("text") : "SFUIDisplay",
    fontSize: 23,
    fontWeight: "700",
    marginVertical: 10,
  },
});
