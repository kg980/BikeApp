import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView, Modal} from 'react-native';
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import ForumCard from "../../components/ForumCard";
import SearchIcon from "../../../assets/images/SearchIcon.png";
//import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";

//screen for distance tracker and navigation buttons

const ForumScreen = () => {

    const[showModal, setShowModal] = useState('true');
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');



    const addButtonClicked = () => {
        //console.warn("Add Post Clicked");
        setShowModal(true);
    };

    const searchButtonClicked = () => {
        console.warn("Search Clicked");
    };

    const submitModal = () => {
        console.warn("submitModal");
    };

    const hideModal = () => {
        //console.warn("hideModal");
        //hide the add part pop up modal:
        setShowModal(false);

        //clear inputs:
        setTitle(null)
        setBody(null)
    };

    let Distance;
    let Time;


    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Forum' 
                ButtonL=<TouchableOpacity onPress={searchButtonClicked}><Image source={SearchIcon} resizeMode="contain" style={styles.bannerIcons}/></TouchableOpacity>
                ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
                />
            
            <Modal transparent={true} visible={showModal}>
                <View style={styles.modalbg}>
                    <View style={styles.modal}>
                        <View style={styles.modal_titleContainer}>
                            <Text style={styles.modal_title}>Create a post</Text>
                        </View>

                        <CustomInput placeholder='Title' value={title} setValue={setTitle} multiline={true}/>
                        <CustomInput placeholder='Body' value={body} setValue={setBody} size='big' multiline={true}/>
                            
                        <View>
                            <CustomButton text="Submit" onPress={submitModal} type='primary'/>
                            <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                        </View>
                    </View>
                </View>
            </Modal>
                
            <View style={styles.content}>
                <ScrollView>
                    <ForumCard Title="Title" Body="Hello world!"/>
                    <ForumCard Title="Help my tyre is flat" Body="Do i need a whole new tyre or just an inner tube? I cant see any marks"/>
                    <ForumCard Title="which type of brakes does this bike need?" Body="My brakes broke and im not sure which type im supposed to buy"/>
                    <ForumCard Title="what tools do you need to tighten a chain?" Body="The chain keeps slipping off the gears"/>
                    
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
    ridebox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '75%',
        alignItems: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 0,
    },
    statsContainer: {
        //backgroundColor: '#F9F9F9',
        padding: '2%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F9F9F9',
        padding: '5%',
    },
    statsText: {
        fontSize: 22,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    bannerIcons: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    modal: {
        height: 550,
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

export default ForumScreen;