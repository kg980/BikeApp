import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from "../../components/CustomButton";

const CustomBanner = ({text, ButtonL, ButtonR}) => {
    return (
        <View>
        <View style={styles.strip}><Text>Strip</Text></View>
        <View style={styles.root}>
            <TouchableOpacity>{ButtonL}</TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity>{ButtonR}</TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FF8001',
        height: 80,
        alignItems: 'center',
        padding: '2%',
        marginBottom: 10,
    },
    strip: {
        height: 50,
        backgroundColor: '#CD6700',
    },
    text: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
    },
});

export default CustomBanner