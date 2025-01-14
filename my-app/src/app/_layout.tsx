import { Stack } from "expo-router"
import Toast, { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import React from "react";
import { Text, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";

/*
  1. Create the config
*/
const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
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
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
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
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
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

const RootLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/vertify" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerTitle: "My Home" }} />
                <Stack.Screen name="product/index" options={{ headerTitle: "My Product" }} />
            </Stack>
            <Toast config={toastConfig} />
        </>
    )
}


export default RootLayout;