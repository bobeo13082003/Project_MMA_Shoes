import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';

const VNPayScreen = () => {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const { orderId, amount } = useLocalSearchParams();
    useEffect(() => {
        axios.post("http://192.168.1.100:3000/api/v1/create_payment_url", { orderId, amount })
            .then(response => setPaymentUrl(response.data.paymentUrl))
            .catch(error => Alert.alert("Lỗi", "Không thể tạo URL thanh toán"));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {!paymentUrl ? <ActivityIndicator size="large" color="#00ff00" /> :
                <WebView
                    source={{ uri: paymentUrl }}
                    onNavigationStateChange={(navState) => {
                        if (navState.url.includes("vnpay_return")) {
                            router.replace("/product/checkout");
                        }
                    }}
                />
            }
        </View>
    );
};

export default VNPayScreen;
