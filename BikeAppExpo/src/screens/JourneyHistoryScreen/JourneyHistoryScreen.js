import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import CustomCard from "../../components/CustomCard";

//screen for distance tracker and navigation buttons

const JourneyHistoryScreen = () => {

    const[showModal, setShowModal] = useState('false');
    const[distance, setDistance] = useState('');
    const[time, setTime] = useState('');

    const addButtonClicked = () => {
        //console.warn("Add Bike Clicked");
        setShowModal(true);
    };

    const submitModal = () => {
        console.warn("submitModal");
    };

    const hideModal = () => {
        //console.warn("hideModal");
        //hide the add part pop up modal:
        setShowModal(false);

        //clear inputs:
        setDistance(null)
        setTime(null)
    };


    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Journeys' 
                ButtonL={<CustomButton text='   ' type='icon'/>} 
                ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
            
                />
            <View style={styles.content}>
                <View style={styles.bikes}>
                    <Pressable><Text style={styles.bikesText}>Bike1</Text></Pressable>
                </View>

                <Modal transparent={true} visible={showModal}>
                    <View style={styles.modalbg}>
                        <View style={styles.modal}>
                            <View style={styles.modal_titleContainer}>
                                <Text style={styles.modal_title}>Add a Journey</Text>
                            </View>

                            <CustomInput placeholder='Distance' value={distance} setValue={setDistance} multiline={true}/>
                            <CustomInput placeholder='Time (seconds)' value={time} setValue={setTime} multiline={true}/>
                                
                            <View style={styles.modalButtons}>
                                <CustomButton text="Submit" onPress={submitModal} type='primary'/>
                                <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={styles.partsContainer}>
                    <CustomCard Title="Date"  Var1="Distance (km)" Var2="Time (min/sec)"/>
                </ScrollView>
            </View>
            <CustomFooter isGo='false'/>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        alignItems: 'stretch',
    },
    header: {
        marginBottom: 'auto',
        //styles applied in CustomBanner.js
        flex: 1,
    },
    footer: {
        marginTop: 'auto', //auto-assigns max possible margin above the component, pushing it to the bottom of the screen
        //styles applied in CustomFooter.js
        flex: 1,
    },
    content: {
        display: 'flex',
        //justifyContent: 'space-around',
        alignItems: 'stretch',
        flexDirection: 'column',
        flex: 5,
    },
    bikes: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '15%',
        alignItems: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 0,
    },
    bikesText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    logo: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        maxHeight: 250,
        maxWidth: 450,
        width: "100%",
    },
    partsContainer: {
        backgroundColor: 'white',
    },
    modal: {
        height: 450,
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
    modalButtons: {
        marginTop: '5%',
        paddingTop: '5%',
        borderTopColor: '#b0b0b0',
        borderTopWidth: 1,
    },
});

export default JourneyHistoryScreen;