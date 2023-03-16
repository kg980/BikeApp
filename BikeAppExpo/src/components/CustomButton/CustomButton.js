import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';

const CustomButton = ({text, onPress, type,}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${type}`]]}> 
            <Text multiline='true' style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </TouchableOpacity>  //text and container use the default styles + specific styles for their type.
    )
}

const styles = StyleSheet.create({
    container: { //generic button settings for all buttons. These are overridden by settings in primary or secondary.
        width: '100%',
        height: 60,

        borderWidth: 1,
        borderRadius: 15,

        marginVertical: 10,
        paddingHorizontal: 10,

        alignItems: 'center',
        paddingVertical: '5%',
    },
    container_primary: { //orange main buttons only
        backgroundColor: '#FF8001',
        borderColor: '#FF8001',
    },
    container_secondary: { //grey subtle buttons only
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
    },
    container_tertiary: { //minimal invisible button with only text
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        //marginVertical: 1,
        paddingVertical: '1%',
    },

    container_nav: { //grey subtle buttons only
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        height: 100,
        justifyContent: 'center',
        width: 190,
    },

    text_nav: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
    },

    container_icon: {
        backgroundColor: '#FF8001',
        borderColor: '#FF8001',
    },
    text_icon: {
        color: 'white',
        fontSize: 30,
        padding: '2%',
        fontWeight: 'normal',
    },


    text: { //generic button text
        //enter defaults here
    },
    text_primary: { //primary button text (white + bold font)
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    text_secondary: { //secondary button text (default dark grey, non-bold)
        //enter secondaries here
    },
    text_tertiary: { //secondary button text (default dark grey, non-bold)
        fontWeight: 'bold',
        color: '#9196cc',
        textDecorationLine: 'underline',
    },


});

export default CustomButton