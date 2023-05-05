import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { getFontFamily } from "../utils/fontUtils";
import { useTheme } from "@react-navigation/native";

const TabBarItem = ({ itemIndex, onIndexChange, tabIndex, title }) => {
  const { dark } = useTheme();
  const baseTextColors = {
    color: dark ? "rgba(255, 255, 255, 0.9)" : "#5A5A5A",
  };

  const activeTabTextColor = {
    color: dark ? "rgba(255, 255, 255, 0.95)" : "rgba(6, 6, 6, 0.95)",
  };

  const activeItem = tabIndex === itemIndex;
  const handlerChangeStyle = ({ pressed }) =>
    pressed && !activeItem && styles.pressed;

  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onIndexChange.bind(this, itemIndex)}
        style={handlerChangeStyle}
      >
        <View style={styles.innerContainer}>
          <Text
            style={[
              styles.text,
              baseTextColors,
              activeItem && [styles.activeItem, activeTabTextColor],
            ]}
          >
            {title}
          </Text>
          {activeItem && (
            <LinearGradient
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#9E00FE", "#6058F8"]}
            />
          )}
        </View>
      </Pressable>
    </View>);
};

export default TabBarItem;

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 12,
  },
  innerContainer: {
    position: "relative",
  },
  gradient: {
    height: 2,
  },
  text: {
    fontFamily: Platform.OS === "ios" ? getFontFamily("text") : "SFUIDisplay",
    letterSpacing: -0.5,
    textTransform: "capitalize",
    fontWeight: "600",
    fontSize: 19,
  },
  activeItem: {
    fontWeight: "700",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.5,
  },
});
