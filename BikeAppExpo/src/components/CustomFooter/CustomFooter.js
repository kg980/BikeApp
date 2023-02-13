import React from "react";
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import CustomButton from "../CustomButton";
import GoButton from "../../../assets/images/GoButton3.png";

const CustomFooter = () => {
    const goPressed = () => {
        //take to journey screen
        console.warn("GO Pressed");
    };


    return (
        <View style={styles.root}>
            <Pressable onPress={goPressed}>
                <Image source={GoButton} styles={styles.go}/>
            </Pressable>
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
    },
    go: {
    },
});

export default CustomFooter