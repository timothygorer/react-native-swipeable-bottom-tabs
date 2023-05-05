import React, {useLayoutEffect} from 'react';
import CustomTabBar from "./CustomTabView/CustomTabBar";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import BottomSheetList from "./BottomSheetList/BottomSheetList";
import {useAnimatedReaction, useSharedValue, withSpring} from "react-native-reanimated";
import {RefreshControl, View, StyleSheet, Dimensions, TouchableOpacity, Text} from "react-native";
import TabViewFlatList from "./CustomTabView/TabViewFlatList";
import { useCallback, useRef, useState } from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const {width, height} = Dimensions.get('screen');
const marketsBottomSheetSnapPoint = [height * 0.6];
const data = Array(22).fill(0);

export const HomeScreen = ({ navigation,
                               route: {
                                   params: {animatedBottomTabBarValue},
                               }}) => {
  let flatListRef = useRef();
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef(null);
  const [routes] = useState([
        {key: 'tab1', title: 'Tab1'},
        {key: 'tab2', title: 'Tab2'},
        {key: 'tab3', title: 'Tab3'},
        {key: 'tab4', title: 'Tab4'},
        {key: 'tab5', title: 'Tab5'},
        {key: 'tab6', title: 'Tab6'},
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerTitleAlign: 'center',
        });
    }, [navigation]);


    const onTouchMoveHandler = e => {
        if (height - e.nativeEvent.pageY > marketsBottomSheetSnapPoint) {
            bottomSheetRef.current.snapToPosition(marketsBottomSheetSnapPoint);
            return;
        }
        if (animatedCustomTabBar.value === 0) {
            animatedBottomTabBarValue.value = withSpring(100, {
                damping: 100,
                mass: 0.3,
            });
        }

        bottomSheetRef.current.snapToPosition(
            Math.abs(height - e.nativeEvent.pageY),
        );
    };

    const onTouchEndHandler = e => {
        if (Math.abs(height - e.nativeEvent.pageY) > height * 0.3) {
            bottomSheetRef.current.snapToPosition(marketsBottomSheetSnapPoint);
        }
        if (Math.abs(height - e.nativeEvent.pageY - 60) <= height * 0.3) {
            bottomSheetRef.current.snapToPosition(0);
        }
    };

    const {bottom} = useSafeAreaInsets();

    const keyExtractorHandler = (item, index) => index.toString();

  const renderScene = ({ route: { key } }) => {
    const { data, renderItem, tabIndex } = tabsData[key] || {};

    return (
      <TabViewFlatList
        data={data}
        renderItem={renderItem}
        keyExtractorHandler={keyExtractorHandler}
        tabIndex={tabIndex}
      />
    );
  };

  const onChangeIndexHandler = useCallback((tabIndex) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: tabIndex,
      viewPosition: 0.5,
    });
    setIndex(tabIndex);
  }, []);

  const onGetRefHandler = (ref) => {
    flatListRef.current = ref;
  };

  const [animatedValue, setAnimatedValue] = useState(useSharedValue(0));
  const animatedCustomTabBar = useSharedValue(0);
  const SWIPE_THRESHOLD = 2;

    useAnimatedReaction(
        () => animatedValue.value,
        (result, previous) => {
            console.log(result);
            if (result > 1800) {
                return;
            }
            const diff = result - previous;

            if (diff > SWIPE_THRESHOLD) {
                animatedBottomTabBarValue.value = withSpring(100, {
                    damping: 100,
                    mass: 0.3,
                });
                animatedCustomTabBar.value = withSpring(90 - bottom / 2, {
                    damping: 100,
                    mass: 0.3,
                });
            } else if (diff < -SWIPE_THRESHOLD) {
                animatedBottomTabBarValue.value = withSpring(0, {
                    damping: 100,
                    mass: 0.3,
                });
                animatedCustomTabBar.value = withSpring(0, {
                    damping: 100,
                    mass: 0.3,
                });
            }
        },
        [animatedValue],
    );


    const onBottomSheetHandler = () => {
    if (animatedCustomTabBar.value !== 0) {
      return;
    }
    animatedBottomTabBarValue.value = withSpring(0, {
      damping: 100,
      mass: 0.3,
    });
  };

  const renderTabBarHandler = () => null;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("OffersScreen")}
        style={{
          borderRadius: 16,
          width: "100%",
          height: 100,
          backgroundColor: "#aaa",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 4,
        }}
      >
        <Text>{index}</Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const tabsData = {
    tab1: { data: data, renderItem: renderItem, tabIndex: 0 },
    tab2: { data: data, renderItem: renderItem, tabIndex: 1 },
    tab3: { data: data, renderItem: renderItem, tabIndex: 2 },
    tab4: { data: data, renderItem: renderItem, tabIndex: 3 },
    tab5: { data: data, renderItem: renderItem, tabIndex: 4 },
    tab6: { data: data, renderItem: renderItem, tabIndex: 5 },
  };

  return (
    <View style={styles.container}>
      <CollapsibleHeaderTabView
          lazy={true}
          renderScrollHeader={() => <View style={{ height: 200, backgroundColor: '#2F2F2F' }} />}
              navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndexHandler}
        renderTabBar={renderTabBarHandler}
        renderRefreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        makeScrollTrans={(scrollValue) => setAnimatedValue(scrollValue)}
        bouncesEnabled={true}
      />
      <CustomTabBar
        animatedValue={animatedCustomTabBar}
        onIndexChange={onChangeIndexHandler}
        tabIndex={index}
        routes={routes}
        onGetRef={onGetRefHandler}
        onTouchEndHandler={onTouchEndHandler}
        onTouchMoveHandler={onTouchMoveHandler}
      />
      <BottomSheetList
        data={routes}
        onClose={onBottomSheetHandler}
        onChange={onChangeIndexHandler}
        snapPoints={marketsBottomSheetSnapPoint}
        animatedPosition={animatedValue}
        sheetRef={bottomSheetRef}
        title={"All tabs"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
