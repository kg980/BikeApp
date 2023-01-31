import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

//screen for distance tracker and navigation buttons

const HomeScreen = () => {
    

    return (
        <View style={styles.root}>
            <View style={Header}></View>
            <View style={Content}>
                <View style={Distance}></View>
                <View style={NavButtons}></View>
            </View>
            <View style={Footer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {},
});

export default HomeScreen;