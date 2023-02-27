import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';

const PartsCard = ({part, brand, description}) => {
    const [showContent, setShowContent] = useState(false);
    

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Part: {part}</Text>
                    <Text style={styles.titleArrow}>></Text>
                </View>
            </TouchableOpacity>
            
            {showContent && ( //if showContent = true, then display the following:
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyText}>Brand: </Text>
                    <View style={styles.bodyInput}>
                        <Text style={styles.bodyText}>{brand} </Text>
                    </View>
                    
                    <Text style={styles.bodyText}>Description: </Text>
                    <View style={styles.bodyInput}>
                        <Text style={styles.bodyText}>{description}</Text>
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
});

export default PartsCard