import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";

//screen which allows you to enter your login details and log in.

const SignUpScreen = () => {
    const[username, setUsername] = useState('');  //read  input from the app
    const[password, setPassword] =  useState(''); //read input from the app
    const[confirmPassword, setConfirmPassword] =  useState(''); //read input from the app
    const navigation = useNavigation();
    const {height} = useWindowDimensions();



    const signUpPressed = () => {
        //authenticate
        auth
        .createUserWithEmailAndPassword(username, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.username);
        })
        .catch(error => alert(error.message))

        //navigate to login screen
        //navigation.navigate("LoginScreen")
    };
    const backToLoginPressed = () => {
        //authenticate
        console.warn("Back To Login");
        navigation.navigate("LoginOptionsScreen")
    };

    return (
        <View style={styles.root}>
            <Image source={LoginLogo} style={[styles.logo, {height: height *  0.5}]} resizeMode="contain"/>

            <CustomInput placeholder="Username@testbikeapp.com" value={username} setValue={setUsername()}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true}/>
            
            <CustomButton text="Create Account" onPress={signUpPressed} type='primary'/>
            <CustomButton text="Back to login" onPress={backToLoginPressed} type='tertiary'/>
        </View>
        
    );
};

const styles = StyleSheet.create({
    root: {
        //alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    logo: {
        alignItems: 'center',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        maxHeight: 450,
        maxWidth: 450,
        width: "100%",
        marginBottom: 30,
    },
    text: {
        textAlign: 'left',
        color: 'grey',
    }
});

export default SignUpScreen;