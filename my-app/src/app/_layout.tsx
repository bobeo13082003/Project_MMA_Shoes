import { Stack } from "expo-router"
import Toast, { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import React from "react";
import { Text, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";
// import { DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";


const toastConfig = {

    success: (props: ToastConfigParams<any>) => (
        <BaseToast
            {...props}
            style={{ backgroundColor: "#5BAD36" }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                color: "white",
                fontWeight: '600'
            }}
        />
    ),
    error: (props: ToastConfigParams<any>) => (
        <ErrorToast
            {...props}
            text1Style={{
                color: "white",
                fontSize: 17
            }}
            text2Style={{
                color: "white",
                fontSize: 15,
            }}
            style={{
                backgroundColor: APP_COLOR.ORANGE
            }}
        />
    ),
    tomatoToast: (props: ToastConfigParams<any>) => {
        const { text, uuid } = props as any;
        return (
            <View style={{ height: 60, width: '100%', backgroundColor: "tomato" }}>
                <Text>{text}</Text>
                <Text>{uuid}</Text>
            </View>
        )
    }
};
// const MyTheme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         background: 'transparent'
//     },
// };

const RootLayout = () => {
    return (
        <>
            {/* <ThemeProvider value={MyTheme}> */}
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Stack
                        screenOptions={
                            {
                                headerTintColor: APP_COLOR.ORANGE,
                                headerTitleStyle: {
                                    color: "black"
                                }
                            }
                        }
                    >
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/wellcome" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/vertify" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="product/[id]" options={{ headerTitle: "" }} />
                        <Stack.Screen name="product/productDetail" options={{ headerTitle: "" }} />
                        <Stack.Screen name="product/delivery" options={{ headerTitle: "" }} />
                        <Stack.Screen name="product/VNPayScreen" options={{ headerTitle: "" }} />
                        <Stack.Screen name="(auth)/search" options={{ headerShown: false }} />
                        <Stack.Screen name="product/viewAllRestaurant" options={{ headerTitle: "All Restaurant" }} />
                    </Stack>
                    <Toast config={toastConfig} />
                </PersistGate>
            </Provider >
            {/* </ThemeProvider> */}
        </>

    )
}


export default RootLayout;