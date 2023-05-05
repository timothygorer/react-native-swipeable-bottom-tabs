import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./navigation/stacks";
import { navigationRef } from "./navigation/RootNavigation";
import {TabNavigator} from "./navigation/TabNavigator";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
        <TabNavigator/>
    </NavigationContainer>
  );
}
