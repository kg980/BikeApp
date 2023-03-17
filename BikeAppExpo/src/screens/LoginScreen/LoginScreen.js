import React , {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import PumpItLogo from "../../../assets/images/PumpItLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import { auth } from "../../../firebase";
import { authentication } from "../../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

//screen which allows you to enter your login details and log in.

const LoginScreen = () => {
    const[username, setUsername] = useState('');  //read input from the app
    const[password, setPassword] =  useState(''); //read input from the app
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    //updates because of firebase v9:
    const [isLoggedIn, setIsLoggedIn] = useState(false);

     
    useEffect(() => { //listener to test whether or not a user has logged in. Updated to firebase v9 version
        const unsubscribe = onAuthStateChanged(authentication, (user)  => {
            if (user) {
                const uid = user.uid;
                //if a user exists (i.e. when someone has successfully logged in, firebase auth changes state)
                //navigate to home screen
                navigation.replace("HomeScreen");
            }
        })
        return unsubscribe //when leave this screen, app unsubscribes from this listener so that we stop pinging for user login. We only need this at the start, on this screen.
    }, []) //empty array to ensure this listener only runs once.
    

    const logInEnterPressed = () => {
        //validate user
        signInWithEmailAndPassword(authentication, username, password)
        .then((re) => {
            //const user = userCredentials.user;
            //setIsLoggedIn(true);
        })
        .catch((re)=>{
            console.log(re);
            alert(re.message);
        }) 
    }

    const forgotPassPressed = () => {
        //authenticate
        console.warn("Forgot Password doesnt work yet :)");
    };
    
    //<Image source={LoginLogo} style={[styles.logo, {height: height *  0.5}]} resizeMode="contain"/>
    //add logo writing
    
    return (
        <View style={styles.root}>
            <Image source={PumpItLogo} style={[styles.logo, {height: height *  0.25}]} resizeMode="contain"/>

            <KeyboardAvoidingView behavior="height">
                <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            </KeyboardAvoidingView>
            
            <CustomButton text="Log In" onPress={logInEnterPressed} type='primary'/>
            <CustomButton text="Forgot Password" onPress={forgotPassPressed} type='tertiary'/>
        </View>
        
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        height: '100%',
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