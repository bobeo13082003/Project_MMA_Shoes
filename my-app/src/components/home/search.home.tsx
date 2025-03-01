import { Pressable, StyleSheet, Text, View } from "react-native"
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from "expo-router";


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C6C6C6",
        flexDirection: "row",
        padding: 7,
        marginHorizontal: 3,
        borderRadius: 5,
        gap: 10,
    }
})


const Search = () => {
    return (
        <Pressable onPress={() => router.navigate("/(auth)/search")}>
            <View style={styles.container}>
                <EvilIcons name="search" size={20} color="black" />
                <Text style={{ fontWeight: "300" }}>Search</Text>
            </View>
        </Pressable>
    )
}

export default Search;
