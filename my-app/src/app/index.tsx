import { StyleSheet, Text, View } from "react-native"
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useEffect } from "react";
import { account } from "@/services/api/api";

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    welcomeText: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    welcomeButton: {
        flex: 0.4,
        gap: 15
    },
    heading: {
        fontSize: 40,
        fontWeight: "600"
    },
    body: {
        marginVertical: 10,
        fontSize: 30,
        color: APP_COLOR.ORANGE,
    },
    footer: {
    },
    btnContainer: {

    },
    signinContent: {
        alignItems: "center",
        paddingTop: 10,
        borderBottomColor: APP_COLOR.ORANGE,
        borderBottomWidth: 1,
        marginHorizontal: 50
    },
    signinText: {
        backgroundColor: "#fff",
        position: "relative",
        padding: 10,
        top: 20
    }
})

const RootPage = () => {
    const getAccount = async () => {
        try {
            const res = await account();
            if (res.data && res.data.code === 200) {
                router.replace("/(tabs)")
            } else {
                router.replace("/(auth)/wellcome")
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        async function prepare() {
            try {
                getAccount()
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                SplashScreen.hide()
            }
        }

        prepare();
    }, []);

    return (
        <View>
        </View>
    )
}

export default RootPage;