import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { router, useLocalSearchParams } from 'expo-router';
import { checkPaymentStatus, createPayment } from '@/services/api/api';
import { toast } from '@/utils/toast';

const VNPayScreen = () => {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const { amount } = useLocalSearchParams();
    const handlePayment = async () => {
        try {
            const response = await createPayment(Number(amount) * 1000)
            if (response) {
                setPaymentUrl(response.data)
            }
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };
    const handleWebViewNavigation = async (event: any) => {
        const { url } = event;

        if (url.includes("vnpay_return")) { // Khi VNPAY redirect về
            const queryParams = Object.fromEntries(new URL(url).searchParams.entries()); // Lấy query params
            try {
                const response = await checkPaymentStatus(queryParams); // Truyền query params khi gọi API
                if (response.data) {
                    if (response.data.success === true) {
                        toast("success", "Payment successful!");
                        router.replace("/(tabs)/order")
                    } else {
                        toast("error", "Payment Fail!")
                        router.navigate("/")
                    }
                }
            } catch (error) {
                toast("error", "Error When Payment!, Please Try Again")
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {paymentUrl ? (
                <WebView source={{ uri: paymentUrl }} onNavigationStateChange={handleWebViewNavigation} />
            ) : (
                <Button title="Thanh toán VNPAY" onPress={handlePayment} />
            )}
        </View>
    );
};

export default VNPayScreen;
