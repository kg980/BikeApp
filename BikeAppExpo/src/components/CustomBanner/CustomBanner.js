import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomBanner = () => {
    return (
        <View style={styles.root}>
            <Text>Banner</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FF8001',
        height: 125,
        alignItems: 'center',
    },
});

export default CustomBanner