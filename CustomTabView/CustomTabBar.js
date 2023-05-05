import React, {useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {BlurView} from 'expo-blur';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import TabBarItem from "./TabBarItem";

const {width} = Dimensions.get('screen');

const CustomTabBar = ({
                          onGetRef,
                          onIndexChange,
                          tabIndex,
                          routes,
                          animatedValue,
                          onTouchEndHandler,
                          onTouchMoveHandler,
                          style,
                      }) => {
    const {dark} = useTheme();
    const absoluteStyles = {
        backgroundColor: dark
            ? 'rgba(24, 25, 27, 0.8)'
            : 'rgba(255, 255, 255, 0.7)',
    };

    const renderItem = useCallback(
        ({item, index}) => (
            <TabBarItem
                onIndexChange={onIndexChange}
                itemIndex={index}
                tabIndex={tabIndex}
                {...item}
            />
        ),
        [onIndexChange, tabIndex],
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: animatedValue?.value || 0,
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.outerContainer, animatedStyle, style]}>
            <View style={styles.innerContainer}>
                <View style={styles.mainContainer}>
                    <BlurView
                        style={[styles.absolute, absoluteStyles]}
                        blurType={dark ? 'dark' : 'light'}
                        blurAmount={16}
                    />
                    <View
                        onTouchMove={onTouchMoveHandler}
                        onTouchEnd={onTouchEndHandler}
                        style={styles.openBottomSheetContainer}>
                        <View style={styles.block} />
                    </View>
                    <View style={styles.container}>
                        <FlatList
                            ref={onGetRef}
                            initialScrollIndex={tabIndex}
                            data={routes}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        width: width - 20,
        bottom: 100,
        alignSelf: 'center',
        shadowColor: 'rgba(75, 75, 75, 0.33)',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 12,

        elevation: 12,
    },
    innerContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    mainContainer: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderWidth: 1.25,
        borderRadius: 6,
        borderColor: 'rgba(98, 98, 98, 0.7)',
    },
    container: {
        paddingVertical: 16.5,
    },
    contentContainerStyle: {
        paddingHorizontal: 12,
    },
    gradient: {
        position: 'absolute',
        height: '100%',
        width: 30,
        zIndex: 20,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    openBottomSheetContainer: {
        height: 15,
        width: '25%',

        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        zIndex: 50,
    },
    block: {
        backgroundColor: '#A3A2A3',
        height: 4,
        width: 32,
        borderRadius: 10,
    },
});
