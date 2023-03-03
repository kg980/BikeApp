import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
//screen which allows you to enter your login details and log in.

const LoginScreen = () => {
    const[username, setUsername] = useState('');  //read input from the app
    const[password, setPassword] =  useState(''); //read input from the app
    const navigation = useNavigation();

    const {height} = useWindowDimensions();

    const logInEnterPressed = () => {
        //validate user
        auth
            .signInWithEmailAndPassword(username, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                //console.log('Logged in as: ', user.username);
                
                //navigate to home screen
                navigation.navigate("HomeScreen");
                    
            })
            .catch(error => alert(error.message))

    };
    const forgotPassPressed = () => {
        //authenticate
        console.warn("Forgot Password doesnt work yet :)");
    };

    return (
        <View style={styles.root}>
            <Image source={LoginLogo} style={[styles.logo, {height: height *  0.5}]} resizeMode="contain"/>
            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomButton text="Log In" onPress={logInEnterPressed} type='primary'/>
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