import React from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";

const LoginScreen = () => {
    const {height} = useWindowDimensions();
    return (
        <View style={styles.root}>
            <Image source={LoginLogo} style={[styles.logo, {height: height *  0.5}]} resizeMode="contain"/>
            <CustomInput />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        maxHeight: 450,
        maxWidth: 450,
        width: "100%",
    },
});

export default LoginScreen;