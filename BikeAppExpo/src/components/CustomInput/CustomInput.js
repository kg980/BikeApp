import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = () => {
    return (
        <View style={styles.container}>
            <TextInput placeholder="placeholder" style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDEDED',
        width: '100%',
        height: 60,
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
    },
    input: {},
});

export default CustomInput