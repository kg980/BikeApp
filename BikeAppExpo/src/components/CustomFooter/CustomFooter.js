import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomFooter = () => {
    return (
        <View style={styles.root}>
            <Text>Footer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FF8001',
        height: 100,
        alignItems: 'center',
    }
});

export default CustomFooter