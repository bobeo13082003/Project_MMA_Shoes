import { RootState } from '@/redux/store';
import { APP_COLOR } from '@/utils/constant';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Checkout from './checkout';
import ShareInput from '@/components/input/share.input';
import { Formik } from 'formik';
import { OrderSchema } from '@/utils/validate.schema';
import { useLocalSearchParams } from 'expo-router';

const Delivery = () => {
    const order = useSelector((state: RootState) => state.user.order || {});
    // const orderItems = Object.entries(order);
    const handleOrder = (fullName: string, address: string, phone: string) => {

    }
    const { restaurantId } = useLocalSearchParams();
    // Lọc các sản phẩm của cửa hàng có ID tương ứng với restaurantId
    const orderItems = Object.entries(order)
        .filter(([key]) => key === restaurantId) // Chỉ lấy các sản phẩm của cửa hàng có ID là restaurantId
        .map(([_, restaurantData]) => restaurantData); // Lấy dữ liệu của cửa hàng

    const totalPrice = orderItems.reduce((acc, restaurant) => acc + restaurant.sum, 0);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Orders</Text>
            {orderItems.length === 0 ?
                <Text style={styles.header}>No Order</Text> :
                <Formik
                    validationSchema={OrderSchema}
                    initialValues={{ fullName: '', address: '', phone: '' }}
                    onSubmit={values => handleOrder(values.fullName, values.address, values.phone)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <ShareInput error={errors.fullName} onChangeText={handleChange('fullName')} onBlur={handleBlur('fullName')} value={values.fullName} title="Full Name" />
                            <ShareInput error={errors.address} onChangeText={handleChange('address')} onBlur={handleBlur('address')} value={values.address} title="Address" />
                            <ShareInput error={errors.phone} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} value={values.phone} title="Phone" />

                            <FlatList
                                data={orderItems}
                                keyExtractor={(item, index) => String(item.title) + index}
                                renderItem={({ item }) => {
                                    const restaurantData = item;
                                    return (
                                        <View style={styles.restaurantContainer}>
                                            <Text style={styles.restaurantTitle}>{restaurantData.title}</Text>
                                            <FlatList
                                                data={Object.entries(restaurantData.items)}
                                                keyExtractor={(product) => product[0]}
                                                renderItem={({ item }) => {
                                                    const [, productDetails] = item;
                                                    const { quantity, data } = productDetails;
                                                    return (
                                                        <View style={styles.productContainer}>
                                                            <Image source={{ uri: data.image }} style={{ width: 60, height: 60 }} />
                                                            <View>
                                                                <Text style={[{ fontWeight: "600" }, styles.productText]}>{data.title}</Text>
                                                                <Text style={styles.productText}>${data.price}</Text>
                                                                <Text style={styles.productText}>x{quantity}</Text>
                                                            </View>
                                                        </View>
                                                    );
                                                }}
                                            />
                                            <Text style={styles.totalText}>Total: {restaurantData.sum} VND</Text>
                                        </View>
                                    );
                                }}
                            />
                            <Checkout restaurantId={restaurantId} handleSubmit={handleSubmit} formValue={values} />
                        </>
                    )}
                </Formik>
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 140
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: APP_COLOR.ORANGE,
    },
    restaurantContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    restaurantTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productContainer: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: "row",
        gap: 10
    },
    productText: {
        fontSize: 16,
        color: "grey"
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
        color: APP_COLOR.ORANGE,
    },
    inputContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginBottom: 10,
    },
});
export default Delivery;