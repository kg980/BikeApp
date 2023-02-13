import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';
import CustomButton from "../../components/CustomButton";

const CustomBanner = ({text, ButtonL, ButtonR}) => {
    return (
        <View>
        <View style={styles.strip}><Text>Strip</Text></View>
        <View style={styles.root}>
            <Pressable>{ButtonL}</Pressable>
            <Text style={styles.text}>{text}</Text>
            <Pressable>{ButtonR}</Pressable>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FF8001',
        height: 80,
        alignItems: 'center',
        padding: '5%',
        marginBottom: 10,
    },
    strip: {
        height: 50,
        backgroundColor: '#CD6700',
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
});

export default CustomBanner