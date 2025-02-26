import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { APP_COLOR } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { userDelivery } from '@/redux/slices/userSlice';
import { userOrder } from '@/services/api/api';
import { toast } from '@/utils/toast';
import { router } from 'expo-router';

export default function Checkout({ handleSubmit, formValue, restaurantId, navigation }: any) {
    const dispatch = useDispatch()
    const order = useSelector((state: RootState) => state.user.order || {});
    const orderItems = Object.entries(order)
        .filter(([key]) => key === restaurantId) // Chỉ lấy các sản phẩm của cửa hàng có ID là restaurantId
        .map(([_, restaurantData]) => restaurantData); // Lấy dữ liệu của cửa hàng

    const totalPrice = orderItems.reduce((acc, restaurant) => acc + restaurant.sum, 0);
    const [selectedMethod, setSelectedMethod] = useState<"VNPAY" | "CASH" | null>("CASH");
    const handleDelivery = async () => {
        try {
            if (!formValue.fullName || !formValue.address || !formValue.phone) {
                toast('error', 'Please fill your information')
                return;
            }
            const restaurantData = order[restaurantId];
            const formattedOrderItems = Object.values(restaurantData.items).map((item: any) => ({
                title: item.data.title,
                image: item.data.image,
                price: item.data.price,
                quantity: item.quantity
            }));
            const totalQuantity = Object.values(restaurantData.items).reduce((acc: number, item: any) => acc + item.quantity, 0);
            const data = {
                restaurantId,
                totalPrice: restaurantData.sum,
                totalQuantity,
                orderItems: formattedOrderItems,
                fullName: formValue.fullName,
                address: formValue.address,
                phone: formValue.phone,
            };
            const res = await userOrder(data)
            if (res && res.data.code === 200) {
                toast('success', 'Check out successfully')
                // dispatch(userDelivery({ restaurantId }))
            }
        } catch (error) {
            console.error('Error placing order for restaurant', error);
        }

        handleSubmit();
    }
    const hadnleCheckout = () => {
        router.navigate({ pathname: "/product/VNPayScreen", params: { orderId: "123456", amount: 10000 } })
    }
    return (
        <View style={styles.footer}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", gap: 5 }}>
                <Pressable onPress={() => hadnleCheckout()} style={[styles.textStyle, selectedMethod === "VNPAY" && styles.selected]}>
                    <Text>VNPAY</Text>
                </Pressable>
                <Pressable onPress={() => setSelectedMethod("CASH")} style={[styles.textStyle, selectedMethod === "CASH" && styles.selected]}>
                    <Text>CASH</Text>
                </Pressable>
            </View>
            <Pressable onPress={hadnleCheckout} style={{ borderWidth: 1, alignItems: "center", justifyContent: "center", borderColor: APP_COLOR.ORANGE, backgroundColor: APP_COLOR.ORANGE }}>
                <Text style={{ padding: 17, color: "#fff", fontSize: 15, fontWeight: 500 }}>Place an order - ${totalPrice}</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "30%",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "grey",
        paddingBottom: 70,
        paddingHorizontal: 15
    },
    textStyle: {
        flex: 1,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: "#D4D4D4",
        alignItems: "center",
        justifyContent: "center"
    },
    selected: {
        backgroundColor: "#fff",
        borderColor: APP_COLOR.ORANGE
    },
});

