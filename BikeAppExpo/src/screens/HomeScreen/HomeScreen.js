import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Bicycle from "../../../assets/images/Bicycle.png";
import BicycleRed from "../../../assets/images/BicycleRed.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";

//screen for distance tracker and navigation buttons

const HomeScreen = () => {
    

    return (
        <View style={styles.root}>
            <CustomBanner text='Profile'/>
            <View style={styles.content}>
                <View style={styles.distance}>
                    <Image source={Bicycle} resizeMode="contain"/>
                    <Text>METER</Text>
                    <Text>Distance</Text>
                    <Text>Button</Text>
                </View>
                <View style={styles.buttonsBox}>
                    <View style={styles.buttonsCol}>
                        <CustomButton text="My Bikes" style={styles.navButton} type="secondary"/>
                        <CustomButton text="Maintenance Checklist" style={styles.navButton} type="secondary"/>
                    </View>
                    <View style={styles.buttonsCol}>
                        <CustomButton text="               Forum               " style={styles.navButton} type="secondary"/>
                        <CustomButton text="History" style={styles.navButton} type="secondary"/>
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
});

export default HomeScreen;