import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import LoginOptionsScreen from '../screens/LoginOptionsScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PartsScreen from '../screens/PartsScreen';
import JourneyHistoryScreen from '../screens/JourneyHistoryScreen';
import MaintenanceHistoryScreen from '../screens/MaintenanceHistoryScreen';
import JourneyScreen from '../screens/JourneyScreen';
import ForumScreen from '../screens/ForumScreen/ForumScreen';
import SignUpScreen from "../screens/SignUpScreen";
import MaintenanceChecklistScreen from "../screens/MaintenanceChecklistScreen";

const Navigation =  () => {

    const Stack = createNativeStackNavigator();


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name = "LoginOptionsScreen" component={LoginOptionsScreen}/>
                <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
                <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
                <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
                <Stack.Screen name = "PartsScreen" component={PartsScreen}/>
                <Stack.Screen name = "JourneyHistoryScreen" component={JourneyHistoryScreen}/>
                <Stack.Screen name = "MaintenanceHistoryScreen" component={MaintenanceHistoryScreen}/>
                <Stack.Screen name = "JourneyScreen" component={JourneyScreen}/>
                <Stack.Screen name = "ForumScreen" component={ForumScreen}/>
                <Stack.Screen name = "MaintenanceChecklistScreen" component={MaintenanceChecklistScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation