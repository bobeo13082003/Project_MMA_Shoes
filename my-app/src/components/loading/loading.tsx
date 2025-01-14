import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';

const OverlayLoading = ({ visible = false, message = 'Loading...' }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    {message ? <Text style={styles.message}>{message}</Text> : null}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 150,
        padding: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OverlayLoading;
