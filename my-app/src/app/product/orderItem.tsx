import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { APP_COLOR } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';
import { userDelivery } from '@/redux/slices/userSlice';

export default function OrderItem({ restaurantId }: { restaurantId: string }) {
    const order = useSelector((state: RootState) => state.user.order || {});
    // const totalQuantity = Object.values(order).reduce((acc, restaurant) => acc + restaurant.quantity, 0);

    // const totalPrice = Object.values(order).reduce((acc, restaurant) => acc + restaurant.sum, 0);
    // Lọc các sản phẩm của cửa hàng cụ thể
    const orderItems = Object.entries(order)
        .filter(([key]) => key === restaurantId) // Chỉ lấy các sản phẩm từ cửa hàng có ID là restaurantId
        .map(([_, restaurantData]) => restaurantData); // Lấy thông tin của cửa hàng

    const totalQuantity = orderItems.reduce((acc, restaurant) => acc + restaurant.quantity, 0);
    const totalPrice = orderItems.reduce((acc, restaurant) => acc + restaurant.sum, 0);
    const handleDelivery = () => {
        router.navigate({
            pathname: "/product/delivery",
            params: { restaurantId }
        });
    }
    if (totalPrice === 0) return (<></>);
    return (
        <View style={styles.footer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 0.8, paddingHorizontal: 10, alignItems: "center" }}>
                <View>
                    <FontAwesome5 name="shopping-basket" size={30} color={APP_COLOR.ORANGE} />
                    <Text style={{ position: "absolute", right: -17, top: -5, backgroundColor: APP_COLOR.ORANGE, color: "#fff", fontWeight: "600", borderWidth: 1, borderRadius: 100, paddingHorizontal: 3, borderColor: APP_COLOR.ORANGE }}>
                        {totalQuantity}
                    </Text>
                </View>
                <Text style={{ color: APP_COLOR.ORANGE, fontWeight: 600, fontSize: 18 }}>${totalPrice}</Text>
            </View>
            <Pressable onPress={handleDelivery} style={({ pressed }) => ([{ opacity: pressed === true ? 0.5 : 1 }, { flex: 0.3, backgroundColor: APP_COLOR.ORANGE, width: "100%", alignItems: "center", justifyContent: "center" }])}>
                <Text style={{ color: "#fff" }}>Delivery</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "14%",
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "grey",
        paddingBottom: 55
    }
});

