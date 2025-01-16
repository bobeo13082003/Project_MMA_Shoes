import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import BannerHome from "./banner.home";
import React from "react";


const listData = [
    { key: 1, name: "Bread", source: require('@/assets/categories/banhmy.jpg') },
    { key: 2, name: "Chicken", source: require('@/assets/categories/ga.jpg') },
    { key: 3, name: "Pizza", source: require('@/assets/categories/pizza.jpg') },
    { key: 4, name: "Noodles", source: require('@/assets/categories/bunmy.png') },
    { key: 5, name: "Rice", source: require('@/assets/categories/com.png') },
    { key: 6, name: "Bread", source: require('@/assets/categories/banhmy.jpg') },
    { key: 7, name: "Chicken", source: require('@/assets/categories/ga.jpg') },
    { key: 8, name: "Pizza", source: require('@/assets/categories/pizza.jpg') },
    { key: 9, name: "Noodles", source: require('@/assets/categories/bunmy.png') },
    { key: 10, name: "Rice", source: require('@/assets/categories/com.png') },
    { key: 11, name: "Bread", source: require('@/assets/categories/banhmy.jpg') },
    { key: 12, name: "Chicken", source: require('@/assets/categories/ga.jpg') },
    { key: 13, name: "Pizza", source: require('@/assets/categories/pizza.jpg') },
    { key: 14, name: "Noodles", source: require('@/assets/categories/bunmy.png') },
];

const styles = StyleSheet.create({
    topList: {
        height: "100%",
        marginBottom: 6,
        width: "100%",
        paddingTop: 5,
    }
})

const Mycomponent = () => {
    return (
        <>
            <View style={styles.topList}>
                <BannerHome />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                >
                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        numColumns={Math.ceil(listData.length / 2)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={listData}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ padding: 10, margin: 5, borderRadius: 5 }}>
                                    <Image source={item.source} style={{ width: 50, height: 50, borderRadius: 30 }} />
                                    <Text style={{ textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </View>
        </>
    )
}

export default Mycomponent;