import React from "react";
import { CustomBottomTabBar } from "../CustomBottomTabBar";
import {BetsStack, HomeStack, LikedStack, ProfileStack, SecondStack} from "./stacks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSharedValue } from "react-native-reanimated";

const SCREENS_WITHOUT_TABBAR = [
  "OffersModalStack",
  "Notifications",
  "SharpSportsScreen",
  "SettingsStack",
  "PaymentsScreen",
  "LoginStack",
  "SignupStack",
  "CaptureSearchScreen",
  "FilterModal",
  "SearchScreen",
  "OffersScreen",
];

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ spinnerActive, setSpinnerActive }) => {
  const animatedBottomTabBarValue = useSharedValue(0);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
      tabBar={(props) => {
        const visibleStackIndex = props.state.index;
        const visibleStack = props.state.routes?.[visibleStackIndex];
        const visibleStackScreens = visibleStack?.state?.routes;
        const visibleScreen =
          visibleStackScreens?.[visibleStackScreens?.length - 1];
        const visibleScreenName = visibleScreen
          ? visibleScreen?.name
          : visibleStack.name;

        return SCREENS_WITHOUT_TABBAR.includes(visibleScreenName) ? null : (
          <CustomBottomTabBar
            navigation={props.navigation}
            {...props}
            animatedBottomTabBarValue={animatedBottomTabBarValue}
          />
        );
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        initialParams={{
          spinnerActive,
          setSpinnerActive,
          animatedBottomTabBarValue,
        }}
      />
      <Tab.Screen
          name="SecondStack"
          component={SecondStack}
          initialParams={{
            spinnerActive,
            setSpinnerActive,
            animatedBottomTabBarValue,
          }}
      />
    </Tab.Navigator>
  );
};
