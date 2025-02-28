import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { APP_COLOR } from '@/utils/constant';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getMenues, getProduct, getRestaurant } from '@/services/api/api';
import OrderItem from './orderItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { userDecreaseOrder, userOrder } from '@/redux/slices/userSlice';

const ProductDetailPage = () => {
    const { idProduct } = useLocalSearchParams();
    const [product, setProduct] = useState<IMenuesData>();

    const order = useSelector((state: RootState) => state.user.order || {});

    const dispatch = useDispatch();
    const getDetailProduct = async () => {
        try {
            const res = await getProduct(idProduct as string);
            if (res && res.data?.code === 200) {
                setProduct(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    const productQuantity = Object.values(order)
        .flatMap(od => Object.entries(od.items))
        .find(([id, _]) => id === idProduct)?.[1]?.quantity || 0;
    useEffect(() => {
        getDetailProduct()
    }, [idProduct])


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Image source={{ uri: product?.image }} style={styles.productImage} />
                <View>
                    <Text style={styles.productName}>{product?.title}</Text>
                    <Text style={styles.productDescription}>{product?.description}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 50 }}>
                        <AntDesign onPress={() => dispatch(userDecreaseOrder({
                            product: product
                        }))} name="minussquare" size={24} color={APP_COLOR.ORANGE} />
                        <Text style={{ fontSize: 18 }}>{productQuantity}</Text>
                        <Entypo onPress={() => dispatch(userOrder({
                            restaurantId: product?.restaurant,
                            product: product
                        }))} name="squared-plus" size={27} color={APP_COLOR.ORANGE} />
                    </View>
                    <View style={styles.bottomButtons}>
                        <Text style={{ color: APP_COLOR.ORANGE, fontWeight: 600, fontSize: 20 }}>Price: {product?.price} VND</Text>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderText}>ORDER NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <OrderItem restaurantId={product?.restaurant._id as string} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    productName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    productImage: { width: '100%', height: 300, resizeMode: 'cover' },
    productDescription: { fontSize: 16, color: '#555' },
    bottomButtons: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 70, paddingHorizontal: 5
    },
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

export default ProductDetailPage;
