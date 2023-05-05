import React, {memo} from 'react';
import {
    StyleSheet
} from 'react-native';
import {HFlatList} from 'react-native-head-tab-view';

const TabViewFlatList = ({data, renderItem, keyExtractorHandler, tabIndex}) => {
    console.log('data is ', data)

    return (
        <HFlatList
            automaticallyAdjustContentInsets={true}
            index={tabIndex}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractorHandler}
            contentContainerStyle={styles.contentContainerStyle}
            bounces={false}
            tabsRefreshEnabled={false}
            onStartRefresh={() => {}}

        />
    );
};

export default memo(TabViewFlatList);

const styles = StyleSheet.create({
    footerContainer: {
        height: 80,
    },
    contentContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange'
    },
});
