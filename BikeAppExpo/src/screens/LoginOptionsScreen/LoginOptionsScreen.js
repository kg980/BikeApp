import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

//screen which allows you to choose to log in or sign up

const LoginOptionsScreen = () => {
    const[username, setUsername] = useState('');  //read  input from the app
    const[password, setPassword] =  useState(''); //read input from the app
    const navigation = useNavigation();

    const {height} = useWindowDimensions();
    

    const logInPressed = () => {
        console.warn("Logged in");
        //nav to loginscreen
        navigation.navigate('LoginScreen');
    };
    const signUpPressed = () => {
        console.warn("Sign Up");

        navigation.navigate('SignUpScreen');
    };

    return (
        <View style={styles.root}>
            <Image source={LoginLogo} style={[styles.logo, {height: height *  0.5}]} resizeMode="contain"/>
            <Text style={styles.text}>Welcome Back!</Text>
            <CustomButton text="Log In" onPress={logInPressed} type='primary'/>
            <Text style={styles.text}>Create an account:</Text>
            <CustomButton text="Sign Up" onPress={signUpPressed} type='secondary'/>
        </View>
        //<CustomInput placeholder="Username" value={username} setValue={setUsername}/>
        //<CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
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

export default LoginOptionsScreen;