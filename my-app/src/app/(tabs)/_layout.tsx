import { APP_COLOR } from "@/utils/constant";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
const TabLayout = () => {
    const getIcons = (routeName: string, focused: boolean, size: number) => {
        if (routeName === "index") {
            return (
                <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={focused ? APP_COLOR.ORANGE : "##C6C6C6"} />
            )
        } else if (routeName === "order") {
            return (
                <FontAwesome5 name="list-alt" size={size} color={focused ? APP_COLOR.ORANGE : "##C6C6C6"} />
            )
        } else if (routeName === "favorite") {
            return (
                <AntDesign name="hearto" size={size} color={focused ? APP_COLOR.ORANGE : "##C6C6C6"} />
            )
        } else if (routeName === "notification") {
            return (
                <Ionicons name="notifications-outline" size={size} color={focused ? APP_COLOR.ORANGE : "##C6C6C6"} />
            )
        } else if (routeName === "account") {
            return (
                <Octicons name="people" size={size} color={focused ? APP_COLOR.ORANGE : "##C6C6C6"} />
            )
        }
    }

    return (
        <Tabs

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return getIcons(route.name, focused, size)
                },
                headerShown: false,
                tabBarLabelStyle: { paddingBottom: 3 },
                tabBarActiveTintColor: APP_COLOR.ORANGE
            })}>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="order" options={{ title: "Order" }} />
            <Tabs.Screen name="favorite" options={{ title: "Favorite" }} />
            <Tabs.Screen name="notification" options={{ title: "Notification" }} />
            <Tabs.Screen name="account" options={{ title: "Account" }} />
        </Tabs>
    )
}

export default TabLayout;