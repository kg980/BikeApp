import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import EditIcon from "../../../assets/images/EditIcon.png";
import DeleteIcon from "../../../assets/images/DeleteIcon.png";
import ReplyIcon from "../../../assets/images/ReplyIcon.png";
import CustomButton from "../CustomButton";

const ForumCard = ({Title, Body, Username, Timestamp, EditAction, DeleteAction, ReplyAction, postId, userId}) => {
    const [showContent, setShowContent] = useState(false);
    const [showComments, setShowComments] = useState(false);

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.titleContainer}>
                    <Text multiline={true} style={styles.titleText}>{Title}</Text>
                    <View>
                        <Text style={styles.usernameText}>posted by: {Username}</Text>
                        
                    </View>
                    
                </View>
            </TouchableOpacity>
            
            {showContent && ( //if showContent = true, then display the following:
                <View style={styles.bodyContainer}>
                    <View style={styles.bodyInput}>
                        <Text style={styles.timestampText}>{Timestamp}</Text>
                        <Text style={styles.bodyText}>{Body} </Text>
                    </View>
                    
                    <View style={styles.iconButtons}>
                        <TouchableOpacity onPress={EditAction}><Image source={EditIcon} resizeMode="contain" style={styles.icons}/></TouchableOpacity>
                        <TouchableOpacity onPress={DeleteAction}><Image source={DeleteIcon} resizeMode="contain" style={styles.icons}/></TouchableOpacity>
                        <TouchableOpacity onPress={ReplyAction}><Image source={ReplyIcon} resizeMode="contain" style={styles.icons}/></TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity>
                        <View style={styles.replyContainer}>
                        {showComments && (<CustomButton text="Hide Replies" type='tertiary' onPress={() => setShowComments(!showComments)}/>)}
                        {!showComments && (<CustomButton text="Show Replies" type='tertiary' onPress={() => setShowComments(!showComments)}/>)}
                        </View>
                    </TouchableOpacity>

                    {showComments && (
                        <View>
                            <View style={styles.bodyInput}>
                                <Text>Reply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply 
                            testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply test</Text>
                            </View>
                            <View style={styles.bodyInput}>
                                <Text>Reply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply 
                            testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply testReply test</Text>
                            </View>
                        </View>
                    )}
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
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleArrow: {
        //fontWeight: 'bold',
        fontSize: 16,
    },
    titleText: {
        padding: '1%',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    usernameText: {
        padding: '1%',
        fontSize: 14,
        color: 'grey',
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
        margin: '1%',
    },
    bodyText: {
        padding: '2%',
        fontSize: 18,
    },
    timestampText: {
        fontSize: 12,
        color: 'grey',
    },
    iconButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 2,
        margin: 5,
    },
    icons:
    {
        height: 20,
        width: 20,
        marginTop: 10,
        marginHorizontal: '2%',
    },
    commentsContainer: {
        //backgroundColor: 'red',
    },
});

export default ForumCard