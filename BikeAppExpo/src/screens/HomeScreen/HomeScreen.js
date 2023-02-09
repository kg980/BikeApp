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
                <View style={styles.distance}>
                    <Text>~HELLO</Text>
                </View>
                <View style={styles.buttonsBox}>
                    <View style={styles.buttonsRow}>
                        <Text>Button1</Text>
                        <Text>Button2</Text>
                    </View>
                    <View style={styles.buttonsRow}>
                        <Text>Button3</Text>
                        <Text>Button4</Text>
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
        height: '50%',
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
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'red',
        height: '50%',
    },
    buttonsRow: {
        backgroundColor: 'yellow',
    },
});

export default HomeScreen;