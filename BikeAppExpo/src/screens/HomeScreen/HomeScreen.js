import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";

//screen for distance tracker and navigation buttons

const HomeScreen = () => {
    

    return (
        <View style={styles.root}>
            <CustomBanner />
            <View style={styles.content}>
                <Text>HELLO</Text>
                <View style={styles.distance}></View>
                <View style={styles.navButtons}></View>
            </View>
            <CustomFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        backgroundColor: '#EDEDED',
        height: '100%',
        //flex: 1,
        //flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        marginBottom: 'auto',
        //styles applied in CustomBanner.js
        //flex: 1,
    },
    footer: {
        marginTop: 'auto', //auto-assigns max possible margin above the component, pushing it to the bottom of the screen
        //styles applied in CustomFooter.js
        //flex: 1,
    },
    content: {
        //make this scrollable?
    },

});

export default HomeScreen;