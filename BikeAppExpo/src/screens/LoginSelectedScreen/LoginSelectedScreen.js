import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

//screen which allows you to enter your login details and log in.

const LoginSelectedScreen = () => {
    const[username, setUsername] = useState('');  //read  input from the app
    const[password, setPassword] =  useState(''); //read input from the app

    const {height} = useWindowDimensions();

    const logInEnterPressed = () => {
        //enter username and pass yada yada
    };

    return (
        <View style={styles.root}>
            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomButton text="Log In" onPress={logInPressed} type='primary'/>
        </View>
        
    );
};

const styles = StyleSheet.create({
    root: {
        //alignItems: 'center',
        padding: 20,
    },
});

export default LoginSelectedScreen;