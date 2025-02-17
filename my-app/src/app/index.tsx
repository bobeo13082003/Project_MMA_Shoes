import { ErrorBoundary, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { account } from "@/services/api/api";

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const RootPage = () => {
    const [state, setState] = useState<any>()
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
        async function prepare() {
            try {
                await getAccount()
            } catch (e) {
                setState(() => {
                    throw new Error("Can not connect backend")
                })
                console.warn(e);
            } finally {
                // Tell the application to render
                SplashScreen.hide()
            }
        }

        prepare();
    }, []);

    return (
        <>
        </>
    )
}

export default RootPage;