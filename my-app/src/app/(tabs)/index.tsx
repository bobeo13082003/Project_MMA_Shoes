import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

function HomeTab() {
    const handleProduct = () => {
        router.navigate("/product")
    }
    return (
        <View>
            <Text>HomeTab</Text>
            <View>
                <Button title='Go Product' onPress={handleProduct} />
            </View>
        </View>
    )
}

export default HomeTab