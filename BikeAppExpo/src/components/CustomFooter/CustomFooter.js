import React from "react";
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import CustomButton from "../CustomButton";
import GoButton from "../../../assets/images/GoButton3.png";
import { useNavigation } from "@react-navigation/native";

const CustomFooter = ({isGo}) => {
    const navigation = useNavigation(); 
   
    const goNavPressed = () => {
        //take to journey screen
        //on journey screen, there is a new button to actually start the journey.
        console.warn("GO navigation Pressed");
        navigation.navigate("JourneyScreen")
    };

    const goStartPressed = () => {
        //start journey timer
        console.warn("Starting Journey");

    };

    //isGo condition
    let footerButton;
    isGo=='true' ? (footerButton = 
    <View style={styles.root}>
        <Pressable onPress={goStartPressed}>
        <Image source={GoButton} styles={styles.go}/>
        </Pressable>
    </View>) 
    : 
    (footerButton = 
    <View style={styles.root}>
        <Pressable onPress={goNavPressed}>
            <Image source={GoButton} styles={styles.go}/>
        </Pressable>
    </View>);
    //conditional to render button to start a journey if 'isGo' prop is true, navigate to the journey page if false/null.
    
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