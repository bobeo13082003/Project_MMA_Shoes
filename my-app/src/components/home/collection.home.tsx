import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import demo from "@/assets/images/trasua.jpg"
import { APP_COLOR } from "@/utils/constant";
import React from "react";
interface IProps {
    name: string,
    description: string
}

const styles = StyleSheet.create({
    item: {
        height: 200,
        padding: 5
    },


})

const CollectionHome = (props: IProps) => {
    const { name, description } = props;
    const data = [
        { key: 1, demo, name: "Quan Anh Beo" },
        { key: 2, demo, name: "Quan Anh Beo" },
        { key: 3, demo, name: "Quan Anh Beobhjbhjbb jk" },
        { key: 4, demo, name: "Quan Anh Beo" },
        { key: 5, demo, name: "Quan Anh Beo" },
    ]
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
                    data={data}
                    contentContainerStyle={{ gap: 5 }}
                    renderItem={(item) => {
                        return (
                            <View>
                                <Image source={demo} style={{ width: 100, height: 100 }} />
                                <View>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 13, fontWeight: 600, maxWidth: 100, paddingVertical: 10 }}>{item.item.name}</Text>
                                </View>
                            </View>
                        )
                    }}
                />

            </View>
        </>
    )
}

export default CollectionHome;