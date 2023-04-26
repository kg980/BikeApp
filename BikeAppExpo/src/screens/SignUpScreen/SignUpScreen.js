import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Alert, KeyboardAvoidingView} from 'react-native';
import LoginLogo from "../../../assets/images/LoginLogo.png";
import PumpItLogo from "../../../assets/images/PumpItLogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { getDoc } from "firebase/firestore";

//screen which allows you to enter your login details and log in.

const SignUpScreen = () => {
    const[username, setUsername] = useState('');  //read  input from the app
    const[password, setPassword] =  useState(''); //read input from the app
    const[confirmPassword, setConfirmPassword] =  useState(''); //read input from the app
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const statsCollectionRef = collection(db, 'UserStats');
    //const user = authentication.currentUser;
    
    const createUserStats = async (userid) => {
        //add DB entry
        await addDoc(statsCollectionRef, { 
            user_id: userid, 
            user_repair_distance: 0,                                                    
            user_total_distance: 0,
        }).then((doc) => {
            console.log("User Stats Data created")
        }).catch((error) => {
            console.log(error);
        });
    };

    const signUpPressed = () => {
        //authenticate
        if (confirmPassword === password){

            createUserWithEmailAndPassword(authentication,username,password)
            .then((re) => {
                console.log("CREATE ACCOUNT OUTPUT: ", re); //get result and log it
                console.log("ACCOUNT ID: ", re.user.uid);
                createUserStats(re.user.uid);
            })
            .catch((re) => {
                console.log(re);
            })

            

            //navigate to login screen
            navigation.navigate("LoginScreen")

        } else {
            Alert.alert("Passwords do not match.")
        }

    };
    
    const backToLoginPressed = () => {
        //authenticate
        //console.warn("Back To Login");
        navigation.navigate("LoginOptionsScreen")
    };

    return (
        <View style={styles.root}>
            <Image source={PumpItLogo} style={[styles.logo, {height: height *  0.25}]} resizeMode="contain"/>
            
            <KeyboardAvoidingView behavior="height">
                <CustomInput placeholder="Username@pumpit.com" value={username} setValue={setUsername}/>
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                <CustomInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true}/>
            </KeyboardAvoidingView>

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