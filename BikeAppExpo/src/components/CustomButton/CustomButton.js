import React from "react";
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({text, onPress, type,}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}> 
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>  //text and container use the default styles + specific styles for their type.
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