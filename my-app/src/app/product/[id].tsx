import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { APP_COLOR } from '@/utils/constant';
import { getMenues, getRestaurant } from '@/services/api/api';
const DATA = [
    {
        id: 1,
        title: "matcha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
        description: "hjj",
        price: "123"
    },
    {
        id: 2,
        title: "matcha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
        description: "hjdsjsjsdinjsdiiusuuiiusuifajjaisusuifiuiusj",
        price: "123"
    },
    {
        id: 3,
        title: "matcha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
        description: "hjj",
        price: "123"
    },
    {
        id: 4,
        title: "matcha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
        description: "hjjjefdeauii",
        price: "123"
    },
    {
        id: 5,
        title: "matcha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
        description: "hjj",
        price: "123"
    }
]

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const [menues, setMenues] = useState<IMenuesData[]>([]);
    const [restaurant, setRestaurant] = useState<IRestaurantData | undefined>(undefined)
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


    useEffect(() => {
        getDetailRestaurant()
        getMenuRestaurant()
    }, [id])

    return (
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
                        <Text style={styles.productRating}>⭐ {restaurant?.rating} - <Text style={{ color: restaurant?.status === "active" ? "green" : "red" }}>{restaurant?.status}</Text></Text>
                        {/* <Text style={styles.productDescription}>
                            {restaurant.}
                        </Text> */}
                    </View>
                </>
            }
            renderItem={({ item }) => (
                <View style={styles.product}>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                    <View style={styles.productContent}>
                        <Text style={{ fontSize: 20, fontWeight: 600 }}>{item.title}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: 250, color: "#888" }}>{item.description}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={{ color: APP_COLOR.ORANGE, fontSize: 16, fontWeight: "500" }}>{item.price}$</Text>
                            <Text><Entypo name="squared-plus" size={27} color={APP_COLOR.ORANGE} /></Text>
                        </View>
                    </View>
                </View>
            )}
            ListFooterComponent={
                <View style={styles.bottomButtons}>
                    {/* <TouchableOpacity style={styles.priceButton}>
                    <Text style={styles.priceText}>${id}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderText}>ORDER NOW</Text>
                </TouchableOpacity> */}
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    productImage: { width: '100%', height: 300, resizeMode: 'cover' },
    contentContainer: { padding: 20 },
    productName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    productRating: { fontSize: 16, color: '#888', marginBottom: 5 },
    productDescription: { fontSize: 16, color: '#555', marginBottom: 20 },
    bottomButtons: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 70, position: 'fixed',
        bottom: 0,
        width: '100%'
    },
    priceButton: { backgroundColor: '#ff6b6b', padding: 15, borderRadius: 10 },
    priceText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    orderButton: { backgroundColor: '#333', padding: 15, borderRadius: 10 },
    orderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    product: {
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 5
    },
    productContent: {
        flex: 1,
        paddingHorizontal: 10,
        gap: 10
    }
});

export default ProductDetailScreen;
