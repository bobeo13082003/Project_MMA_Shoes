import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import debounce from 'debounce';
import { searchRestaurant } from "@/services/api/api";
const ResultSearch = () => {
    const [searchKey, setSearchKey] = useState("");
    const [searchData, setSearchData] = useState<ISearchRestaurantData[]>([])
    const fetchRestaurants = useCallback(
        debounce(async (searchKey) => {
            try {
                if (!searchKey) {
                    setSearchData([]); // Nếu rỗng thì reset data
                    return;
                }
                const res = await searchRestaurant(searchKey);
                if (res?.data?.code === 200) {
                    setSearchData(res.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
            }
        }, 300),
        []
    );
    useEffect(() => {
        fetchRestaurants(searchKey);

    }, [searchKey]);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", gap: 5, padding: 10, alignItems: "center" }}>
                <Ionicons onPress={() => router.back()} name="arrow-back-outline" size={24} color={APP_COLOR.ORANGE} />
                <TextInput
                    onChangeText={(search) => setSearchKey(search)}
                    style={{ flex: 1, backgroundColor: "#D4D4D4" }}
                    placeholder="Search Restaurant" />
            </View>
            <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
                {searchData?.map(item => {
                    return (
                        <Pressable key={item._id} onPress={() => router.navigate({ pathname: "/product/[id]", params: { id: item._id } })}>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
                                <Text style={{ fontSize: 20, fontWeight: 600 }}>{item.title}</Text>
                            </View>
                        </Pressable>

                    )
                })}

            </View>

        </View>
    )
}

export default ResultSearch;