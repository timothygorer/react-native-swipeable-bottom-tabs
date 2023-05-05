import React from "react";
import {HomeScreen} from "../HomeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {SecondScreen} from "../SecondScreen";

const Stack = createStackNavigator();

export const HomeStack = (props) => {
    const {animatedBottomTabBarValue} = props.route.params;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                initialParams={{animatedBottomTabBarValue}}
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
};

export const SecondStack = (props) => {
    const {animatedBottomTabBarValue} = props.route.params;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SecondScreen"
                initialParams={{animatedBottomTabBarValue}}
                component={SecondScreen}
            />
        </Stack.Navigator>
    );
}
