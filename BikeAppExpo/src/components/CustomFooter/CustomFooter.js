import React from "react";
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import CustomButton from "../CustomButton";
import GoButton from "../../../assets/images/GoButton3.png";

const CustomFooter = ({isNav, buttonTask}) => {
    
   
    const goNavPressed = () => {
        //take to journey screen
        //on journey screen, there is a new button to actually start the journey.
        console.warn("GO navigation Pressed");
    };

    //isGo condition
    let footerButton;
    !buttonTask ? (footerButton = 
    <View style={styles.root}>
        <Pressable onPress={goNavPressed}>
            <Image source={GoButton} styles={styles.go}/>
        </Pressable>
    </View>
    ) 
    : 
    (footerButton = 
    <View style={styles.root}>
        <Pressable onPress={buttonTask}>
            <Image source={GoButton} styles={styles.go}/>
        </Pressable>
    </View>);
    //conditional function: if a buttonTask is provided, then that will be the button's function. Else, the default function is to navigate to the journey screen.
    
    //buttonTask ? (onPress = {buttonTask}) : (onPress = goNavPressed)
    
    return (
        
        <View style={styles.root}>
            {footerButton}
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