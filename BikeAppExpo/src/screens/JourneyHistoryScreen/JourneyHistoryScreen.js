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

const JourneyHistoryScreen = () => {
    const addButtonClicked = () => {
        console.warn("Add Bike Clicked");
    };

    const changeBikeName = () => {
        console.warn("changeBikeName");
    };

    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Journeys' 
                ButtonL={<CustomButton text='   ' type='icon'/>} 
                ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
            
                />
            <View style={styles.content}>
                <View style={styles.bikes}>
                    <Pressable onPress={changeBikeName}><Text style={styles.bikesText}>Bike1</Text></Pressable>
                </View>
                <ScrollView style={styles.partsContainer}>
                    <CustomCard Title="Date"  Var1="Distance (km)" Var2="Time (min/sec)"/>
                </ScrollView>
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
    bikes: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '15%',
        alignItems: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 0,
    },
    bikesText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: '4%',
    },
    logo: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        maxHeight: 250,
        maxWidth: 450,
        width: "100%",
    },
    partsContainer: {
        
        backgroundColor: 'white',
    },
});

export default JourneyHistoryScreen;