import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Pressable, SafeAreaView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { APP_COLOR } from '@/utils/constant';
import { getMenues, getRestaurant } from '@/services/api/api';
import OrderItem from './orderItem';
import { useDispatch } from 'react-redux';
import { userOrder } from '@/redux/slices/userSlice';
const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const [menues, setMenues] = useState<IMenuesData[]>([]);
    const [restaurant, setRestaurant] = useState<IRestaurantData | undefined>(undefined)
    const dispatch = useDispatch();
    const getDetailRestaurant = async () => {
        try {
            const res = await getRestaurant(id as string);
            if (res && res.data?.code === 200) {
                setRestaurant(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    const getMenuRestaurant = async () => {
        try {
            const res = await getMenues(id as string);
            if (res && res.data?.code === 200) {
                setMenues(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleOrder = (item: IMenuesData) => {
        dispatch(userOrder({
            product: item
        }));
    }


    useEffect(() => {
        getDetailRestaurant()
        getMenuRestaurant()
    }, [id])

    return (
        <View style={styles.container}>
            <FlatList
                data={menues}
                keyExtractor={(item) => item._id.toString()}
                ListHeaderComponent={
                    <>
                        <Image
                            source={{ uri: restaurant?.image }}
                            style={styles.productImage}
                        />
                        <View style={styles.contentContainer}>
                            <Text style={styles.productName}>{restaurant?.title}</Text>
                            <Text style={styles.productRating}>
                                ⭐ {restaurant?.rating} -{" "}
                                <Text style={{ color: restaurant?.status === "active" ? "green" : "red" }}>
                                    {restaurant?.status}
                                </Text>
                            </Text>
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.navigate({
                                pathname: "/product/productDetail",
                                params: { idProduct: item._id }
                            })
                        }
                    >
                        <View style={styles.product}>
                            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                            <View style={styles.productContent}>
                                <Text style={{ fontSize: 20, fontWeight: "600" }}>{item.title}</Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: 250, color: "#888" }}>
                                    {item.description}
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ color: APP_COLOR.ORANGE, fontSize: 16, fontWeight: "500" }}>
                                        {item.price}$
                                    </Text>
                                    <Entypo onPress={() => handleOrder(item)} name="squared-plus" size={27} color={APP_COLOR.ORANGE} />
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
                contentContainerStyle={{ paddingBottom: 130 }}
            />
            <OrderItem restaurantId={restaurant?._id as string} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    productImage: { width: "100%", height: 300, resizeMode: "cover" },
    contentContainer: { padding: 20 },
    productName: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    productRating: { fontSize: 16, color: "#888", marginBottom: 5 },
    productDescription: { fontSize: 16, color: "#555", marginBottom: 20 },
    product: {
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 5
    },
    productContent: {
        flex: 1,
        paddingHorizontal: 10,
        gap: 10
    },
});

export default ProductDetailScreen;
