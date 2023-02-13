import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, Pressable, Image, Easing, Animated} from 'react-native';

const PartsCard = ({title}) => {
    const [open, setOpen] = useState(false);
    const transition = useTransition(open, open ? 0 : 1, open ? 1 : 0, 400, Easing.inOut(Easing.ease))
    //const height = Interpolate(transition, 0, 8);
    //const bottomRadius = Interpolate(transition, 8, 0);

    return (
        <Animated.View style={styles.root}>
            <Text>Part Name</Text>
            <Text>Click to expand</Text>
        </Animated.View>
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