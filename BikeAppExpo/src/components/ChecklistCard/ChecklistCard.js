import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import InfoIcon from "../../../assets/images/InfoIcon.png";
import DeleteIcon from "../../../assets/images/DeleteIcon.png";
import CustomButton from "../CustomButton";



const ForumCard = ({Task, Info, isCustom, DeleteButton}) => {
    const [showContent, setShowContent] = useState(false);

    let renderButton;
    isCustom=='true' ? (renderButton =                      //'isCustom' only applies to user-made tasks. Mandatory tasks cannot be deleted, so we hide the button.
        {DeleteButton}
    ) 
    : 
    (renderButton = 
        <TouchableOpacity onPress={() => setShowContent(!showContent)}>
            <Image source={InfoIcon} style={styles.icons}/>
        </TouchableOpacity>
    );

    return (
        <View style={styles.root}>
            <View>
                <View>
                    <View style={styles.titleContainer}>

                        <Text style={styles.titleText}>{Task}</Text>

                        <View style={styles.iconButtons}>
                            {/* 
                            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                                <Image source={InfoIcon} style={styles.icons}/>
                            </TouchableOpacity>
                            */}

                            {renderButton}

                            <TouchableOpacity style={styles.checkBox}></TouchableOpacity>
                        </View>

                    </View>
                </View>
                
                {showContent && ( //if showContent = true, then display the following:
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity>
                            <Text style={styles.bodyText}>{Info}</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </View> 

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#EDEDED',
        borderWidth: 1,
        padding: '3%',
        //marginTop: '2%',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkBox: {
        //fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 2,
        height: 25,
        width: 25,
        borderRadius: 8,
    },
    titleText: {
        padding: '2%',
        fontSize: 16,
    },
    bodyContainer: {
        borderColor: '#EDEDED',
        borderTopWidth: 1,
        padding: '2%',
        marginTop: '5%',
    },
    bodyInput: {
        backgroundColor: '#F9F9F9',
        padding: '2%',
        borderRadius: 10,
        borderColor: '#F9F9F9',
        margin: '1%',
    },
    bodyText: {
        padding: '2%',
    },
    iconButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 2,
        margin: 5,
        alignItems: 'center',
        //width: '30%', //30% if using 3 icons
        width: '20%',
        //backgroundColor: 'red',
    },

    icons: {
        height: 20,
        width: 20,
        marginHorizontal: '2%',
    },
});

export default ForumCard