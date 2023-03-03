import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const CustomInput = ({control, fieldname, placeholder, secureTextEntry}) => {

    //updated custominput to work using react hook form;
    //custom inputs now use a controller which renders the text input according to the values assigned to it on the screen
    //the controller is passed a fieldname and the control variable from the outside, based on how it is to be used on each screen.
    return (
        <View style={styles.container}>


            <Controller
                control={control}
                name={fieldname}
                render={({field: {value, onChange, onBlur}}) => (
                   <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        style={styles.text}
                        secureTextEntry={secureTextEntry}
                   />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDEDED',
        width: '100%',
        height: 60,

        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,

        marginVertical: 10,
        paddingHorizontal: 10,

        alignItems: 'center',
        paddingVertical: '5%',
    },
    text: {},
});

export default CustomInput