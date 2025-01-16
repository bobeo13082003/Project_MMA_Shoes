import CustomFlatList from '@/components/CustomFlatList/CustomFlatList';
import CollectionHome from '@/components/home/collection.home';
import Header from '@/components/home/header.home';
import Search from '@/components/home/search.home';
import Mycomponent from '@/components/home/topList';
import { router } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
    { key: 1, name: "Top 5 *", ref: "" },
    { key: 2, name: "Top Vip *", ref: "" },
    { key: 3, name: "Top Top *", ref: "" },
];

function HomeTab() {
    const handleProduct = () => {
        router.navigate("/product")
    }

    return (
        <CustomFlatList
            data={data}
            style={styles.list}
            renderItem={(item) => <CollectionHome name={item.item.name} />}
            HeaderComponent={<Header />}
            StickyElementComponent={<Search />}
            TopListElementComponent={<Mycomponent />}
        />
    )
}

const styles = StyleSheet.create({

    list: {
        overflow: "hidden"
    },
})

export default HomeTab