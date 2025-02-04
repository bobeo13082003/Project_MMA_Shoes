import { View, Text, StyleSheet, Image, FlatList, Pressable } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { getRestaurantHome } from "@/services/api/api";
interface IProps {
    name: string,
    description: string,
    refId: string
}

const styles = StyleSheet.create({
    item: {
        height: 200,
        padding: 5
    },


})

const CollectionHome = (props: IProps) => {
    const { name, description, refId } = props;
    const [restaurants, setRestaurants] = useState<IRestaurantData[]>([])
    const getRestaurants = async () => {
        try {
            const res = await getRestaurantHome(refId);

            if (res && res.data?.code === 200) {
                setRestaurants(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getRestaurants()
    }, [refId])
    return (
        <>
            <View style={{ height: 10, backgroundColor: "white" }}></View>
            <View style={styles.item}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: APP_COLOR.ORANGE }}>{name}</Text>
                    <Text style={{ color: "gray" }}>View all</Text>
                </View>
                <View>
                    <Text style={{ color: "grey" }}>{description}</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={restaurants}
                    contentContainerStyle={{ gap: 5 }}
                    renderItem={(item) => {
                        return (
                            <Pressable onPress={() => router.navigate({
                                pathname: "/product/[id]",
                                params: { id: item.item._id }
                            })}>
                                <View>
                                    <Image source={{ uri: item.item.image }} style={{ width: 100, height: 100 }} />
                                    <View>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 13, fontWeight: 600, maxWidth: 100, paddingVertical: 10 }}>{item.item.title}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )
                    }}
                />

            </View>
        </>
    )
}

export default CollectionHome;