import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomBanner = () => {
    return (
        <View>
            <Text>Banner</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: 60,
        //position: 'fixed',
        backgroundColor: '#FF8001',
    },
});

export default CustomBanner