import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, size, multiline}) => {
    return (
        <View style={[styles.container, styles[`container_${size}`]]}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.text}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            />
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
        paddingHorizontal: 10,

        alignItems: 'center',
        paddingVertical: '5%',
        alignItems: 'center',
    },
    text: {},
    container_big: {
        height: 200,
    },
});

export default CustomInput