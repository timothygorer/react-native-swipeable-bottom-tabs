import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import HomeOpen from './HomeOpen';
import HomeClosed from './HomeClosed';
import HeartOpen from './HeartOpen';
import HeartClosed from './HeartClosed';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

export const CustomBottomTabBar = ({
                                       state,
                                       descriptors,
                                       animatedBottomTabBarValue,
                                   }) => {
    const {colors, dark} = useTheme();
    const navigation = useNavigation();

    const TabBarIcons = [
        {
            index: 0,
            open: <HomeOpen color={dark ? '#b3b3b3' : '#262626'} />,
            closed: <HomeClosed color={dark ? 'white' : '#262626'} />,
            title: 'Home',
        },
        {
            index: 1,
            open: <HeartOpen color={dark ? '#b3b3b3' : '#262626'} />,
            closed: <HeartClosed color={dark ? 'white' : '#262626'} />,
            title: 'Second',
        },
    ];

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: animatedBottomTabBarValue.value,
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <LinearGradient
                colors={
                    dark
                        ? ['rgba(0,0,0,0)', 'rgba(18, 18, 18, 1)']
                        : ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
                }
                locations={[0.1, 0.8]}>
                <View style={styles.itemsContainer}>
                    {state.routes.map((route, index) => {
                        const {options} = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            if (!isFocused) {
                                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                                navigation.navigate({name: route.name, merge: true});
                            }
                        };

                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? {selected: true} : {}}
                                onPress={onPress}
                                style={styles.item}>
                                {isFocused
                                    ? TabBarIcons[index].closed
                                    : TabBarIcons[index].open}
                                <Text style={{color: colors.primaryText}}>
                                    {TabBarIcons[index].title}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 30,
        paddingTop: 35,
    },
    item: {
        alignItems: 'center',
    },
});
