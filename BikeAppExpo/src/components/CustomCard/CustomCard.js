import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';
import EditIcon from "../../../assets/images/EditIcon.png";
import DeleteIcon from "../../../assets/images/DeleteIcon.png";

const CustomCard = ({Title, TitleValue, Var1, Var1Value, Var2, Var2Value, EditAction, DeleteAction}) => {
    const [showContent, setShowContent] = useState(false);
    

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{Title}: {TitleValue}</Text>
                    <Text style={styles.titleArrow}>></Text>
                </View>
            </TouchableOpacity>
            
            {showContent && ( //if showContent = true, then display the following:
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyText}>{Var1}: </Text>
                    <View style={styles.bodyInput}>
                        <Text style={styles.bodyText}>{Var1Value} </Text>
                    </View>
                    
                    <Text style={styles.bodyText}>{Var2}: </Text>
                    <View style={styles.bodyInput}>
                        <Text style={styles.bodyText}>{Var2Value}</Text>
                    </View>
                    <View style={styles.iconButtons}>
                        <Pressable><Image source={EditIcon} resizeMode="contain" style={styles.icons} onPress={EditAction}/></Pressable>
                        <Pressable><Image source={DeleteIcon} resizeMode="contain" style={styles.icons} onPress={DeleteAction}/></Pressable>
                    </View>
                </View>
            )}
            
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
    titleArrow: {
        //fontWeight: 'bold',
        fontSize: 16,
    },
    titleText: {
        padding: '1%',
        fontSize: 16,
    },
    bodyContainer: {
        borderColor: '#EDEDED',
        borderTopWidth: 1,
        padding: '2%',
    },
    bodyInput: {
        backgroundColor: '#F9F9F9',
        padding: '2%',
        borderRadius: 10,
        borderColor: '#F9F9F9',
    },
    bodyText: {
        padding: '2%',
    },
    iconButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        padding: 2,
        marginTop: 5,
    },
    icons:
    {
        height: 25,
        width: 25,
        marginTop: 10,
    }
});

export default CustomCard