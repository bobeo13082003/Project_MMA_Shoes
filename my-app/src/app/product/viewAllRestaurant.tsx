import { allRestaurants } from '@/services/api/api';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';

const ViewAllRestaurant = () => {
    const [restaurants, setRestaurants] = useState<ISearchRestaurantData[]>([]);
    const [page, setPage] = useState(1);
    const getAllRestaurant = async () => {
        try {
            const res = await allRestaurants(`all-restaurant?page=1`);
            if (res && res.data.code === 200) {
                setRestaurants(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAllRestaurantbyPage = async () => {
        try {
            const res = await allRestaurants(`all-restaurant?page=${page}`);
            if (res && res.data.code === 200) {
                setRestaurants([...restaurants, ...res.data.data])
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllRestaurant();
    }, [])
    useEffect(() => {
        if (page > 1) {
            getAllRestaurantbyPage();
        }
    }, [page])

    const handleEndReached = () => {
        setPage(prev => prev + 1)
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                onEndReachedThreshold={0.5}
                onEndReached={handleEndReached}
                keyExtractor={(item) => item._id}
                data={restaurants}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => router.navigate({ pathname: "/product/[id]", params: { id: item._id } })}>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
                                <Text style={{ fontSize: 20, fontWeight: 600 }}>{item.title}</Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>

    );
};

export default ViewAllRestaurant;