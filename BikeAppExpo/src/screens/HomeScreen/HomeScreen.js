import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import Bicycle from "../../../assets/images/Bicycle.png";
import BicycleRed from "../../../assets/images/BicycleRed.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";

//screen for distance tracker and navigation buttons

const HomeScreen = () => {
    const myBikesPressed = () => {
        //
        console.warn("Load My Bikes Page");
    };

    const forumPressed = () => {
        //
        console.warn("Load Forum Page");
    };

    const maintListPressed = () => {
        //
        console.warn("Load maintenance Checklist Page");
    };

    const journeysPressed = () => {
        //
        console.warn("Load Journey History Page");
    };
    const pumpIt = () => {
        //Reset distance in database / on screen
        //reset logo to normal
        //add record to maintenance history
        console.warn("Reset Distance");
    };
    

    return (
        <View style={styles.root}>
            <CustomBanner text='Profile'/>
            <View style={styles.content}>
                <View style={styles.distance}>
                    <Image source={Bicycle} resizeMode="contain"/>
                    <Text style={styles.distanceText}>/4000km</Text>
                    <Text style={styles.meter}></Text>
                    <Pressable onPress={pumpIt} style={styles.pumpIt}><Text style={styles.pumpItText}>PumpIt!</Text></Pressable>
                </View>
                <View style={styles.buttonsBox}>
                    <View style={styles.buttonsCol}>
                        <CustomButton text="My Bikes" style={styles.navButton} type="secondary" onPress={myBikesPressed}/>
                        <CustomButton text="Maintenance Checklist" style={styles.navButton} type="secondary" onPress={maintListPressed}/>
                    </View>
                    <View style={styles.buttonsCol}>
                        <CustomButton text="               Forum               " style={styles.navButton} type="secondary" onPress={forumPressed}/>
                        <CustomButton text="Journeys" style={styles.navButton} type="secondary" onPress={journeysPressed}/>
                    </View>
                </View>
            </View>
            <CustomFooter />
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
    distance: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '60%',
        alignItems: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
    },
    buttonsBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: '40%',
    },
    buttonsCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        //backgroundColor: 'yellow',
        padding: '1%',
    },
    navButton: {
        alignItems: 'center',
        margin: '15%',
        padding: '5%',
        paddingHorizontal: '50%',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        height: '45%',
    },
    pumpIt: {
        backgroundColor: '#FF8001',
        borderColor: '#FF8001',
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 20,
        marginBottom: '1%',
    },
    pumpItText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    distanceText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    distanceTextRed: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
    },
    meter: {
        backgroundColor: 'white',
        width: '80%',
        height: '15%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'white',
        },
});

export default HomeScreen;