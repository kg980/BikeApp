import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView} from 'react-native';
import Bicycle from "../../../assets/images/Bicycle.png";
import BicycleRed from "../../../assets/images/BicycleRed.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import JourneyCard from "../../components/JourneyCard";
import CustomCard from "../../components/CustomCard";

//screen for distance tracker and navigation buttons

const JourneyScreen = () => {
    const addButtonClicked = () => {
        console.warn("Add Bike Clicked");
    };

    let Distance;
    let Time;


    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Current Ride' 
                //ButtonL={<CustomButton text='   ' type='icon'/>} 
                //ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
                />
            <View style={styles.content}>
                <View style={styles.ridebox}>
                
                </View>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>Distance: {Distance}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>Time: {Time}</Text>
                </View>
            </View>
            <CustomFooter isGo='false'/>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        alignItems: 'stretch',
    },
    header: {
        marginBottom: 'auto',
        //styles applied in CustomBanner.js
        flex: 1,
    },
    footer: {
        marginTop: 'auto', //auto-assigns max possible margin above the component, pushing it to the bottom of the screen
        //styles applied in CustomFooter.js
        flex: 1,
    },
    content: {
        display: 'flex',
        //justifyContent: 'space-around',
        alignItems: 'stretch',
        flexDirection: 'column',
        flex: 5,
    },
    ridebox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '75%',
        alignItems: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 0,
    },
    statsContainer: {
        //backgroundColor: '#F9F9F9',
        padding: '2%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F9F9F9',
        padding: '5%',
    },
    statsText: {
        fontSize: 22,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default JourneyScreen;