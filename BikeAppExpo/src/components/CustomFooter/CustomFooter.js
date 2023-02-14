import React from "react";
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import CustomButton from "../CustomButton";
import GoButton from "../../../assets/images/GoButton3.png";

const CustomFooter = ({type}) => {
    const goNavPressed = () => {
        //take to journey screen
        //on journey screen, there is a new button to actually start the journey.
        console.warn("GO navigation Pressed");
    };


    //conditional to show nav or start button based on parameter 'type' -  'nav' or 'start'
    return (
        <View style={styles.root}>
            <Pressable onPress={goNavPressed}>
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