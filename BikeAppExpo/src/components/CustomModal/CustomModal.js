import React, { useState, useTransition } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Modal} from 'react-native';
import EditIcon from "../../../assets/images/EditIcon.png";
import DeleteIcon from "../../../assets/images/DeleteIcon.png";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";


const CustomModal = ({Heading, Text, setHeading, setText, placeholderHeading, placeholderText, submitModal, showModal}) => {
    
    const[setShowModal] = useState('');

    const hideModal = () => {
        //console.warn("hideModal");
        //hide the add part pop up modal:
        setShowModal({showModal: false});

        //clear inputs:
        setHeading(null)
        setText(null)
    };

    return (
        <Modal transparent={true} visible={showModal}>

            <View style={styles.modalbg}>
                <View style={styles.modal}>

                    <View style={styles.modal_titleContainer}>
                        <Text style={styles.modal_title}>Add a part</Text>
                    </View>
                    <CustomInput placeholder={placeholderHeading} value={Heading} setValue={setHeading}/>
                    <CustomInput placeholder={placeholderText} value={Text} setValue={setText} size='big'/>
                    <View>
                        <CustomButton text="Submit" onPress={submitModal} type='primary'/>
                        <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                    </View>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        height: '75%',
        display: 'flex',
        padding: '5%',
        backgroundColor: 'lightgrey',
        margin: '5%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'lightgrey',
    },
    modal_title: {
        padding: '2%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modal_titleContainer: {
        alignSelf: 'center',
    },
    modalbg: {
        backgroundColor: '#000000aa',
        height: '100%',
    },
});

export default CustomModal