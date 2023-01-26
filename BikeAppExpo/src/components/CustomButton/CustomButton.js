import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({text, onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF8001',
        width: '100%',
        height: 60,

        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,

        marginVertical: 10,
        paddingHorizontal: 10,

        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginVertical: 2,
    },
});

export default CustomButton