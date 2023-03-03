import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, KeyboardAvoidingView} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

//screen which allows you to enter your login details and log in.

const LoginScreen = () => {
    const[username, setUsername] = useState('');  //read  input from the app
    const[password, setPassword] =  useState(''); //read input from the app
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const {control, handleSubmit}  = useForm(); //handlesubmit is for validation  (ensure correct format has been enterred), then send data to the server

    const logInSubmitPressed = (data) => {
        //validate user
        console.log(data);

        //navigate to home screen
        navigation.navigate("HomeScreen");
    };
    const forgotPassPressed = () => {
        //authenticate
        console.warn("Forgot Password");
    };

    return (
        <View style={styles.root}>
            <KeyboardAvoidingView>
                <Image source={LoginLogo} style={[styles.logo, {height: height *  0.5}]} resizeMode="contain"/>
            
            
                <CustomInput 
                    fieldname={username}
                    placeholder="Username" 
                    control={control}
                />


                <CustomInput 
                    fieldname={password}
                    placeholder="Password" 
                    secureTextEntry={true}
                    control={control}
                />

            </KeyboardAvoidingView>

            <CustomButton text="Log In" onPress={handleSubmit(logInSubmitPressed)} type='primary'/>
            <CustomButton text="Forgot Password" onPress={forgotPassPressed} type='tertiary'/>
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

export default LoginScreen;