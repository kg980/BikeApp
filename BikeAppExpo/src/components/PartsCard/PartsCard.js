import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';

const PartsCard = ({title}) => {
    

    return (
        <View style={styles.root}>
            <Text>Part Name</Text>
            <Text>Click to expand</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        borderTopColor: 'lightgrey',
        borderBottomColor: 'lightgrey',
        borderRadius: 15,
        borderColor: '#EDEDED',
        borderWidth: 1,
        padding: '3%',
        
        
    },
});

export default PartsCard