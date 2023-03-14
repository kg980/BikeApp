import React , {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal} from 'react-native';
import Bicycle from "../../../assets/images/Bicycle.png";
import BicycleRed from "../../../assets/images/BicycleRed.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import PartsCard from "../../components/PartsCard";
import CustomCard from "../../components/CustomCard";
import { authentication, db } from "../../../firebase";
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';

//screen for distance tracker and navigation buttons

const PartsScreen = () => {
    const[part, setPart] = useState('');  //read input from the app
    const[description, setDescription] =  useState(''); //read input from the app
    const[brand, setBrand] =  useState(''); //read input from the app

    const[showModal, setShowModal] = useState('false');
    const user = authentication.currentUser;

    const addButtonClicked = () => {
        //console.warn("Add Bike Clicked");
        //show the modal pop up for parts input
        setShowModal(true);
    };

    const changeBikeName = () => {
        console.warn("changeBikeName");
    };


    const hideModal = () => {
        //console.warn("hideModal");
        //hide the add part pop up modal:
        setShowModal(false);

        //clear inputs:
        setPart(null)
        setDescription(null)
        setBrand(null)
    };

    //FIRESTORE IMPLEMENTATION:
    const getPartData = async () => {
        const partsCollection = collection(db, 'BikeParts');
        const partsSnapshot = await getDocs(partsCollection); //gets all the docs from the specified collection
        //create a list of all the parts
        const partsList = partsSnapshot.docs.map(doc => doc.data());

        const PartValue = "";
        const BrandValue = "";
        const DescriptionValue = "";

        return(
            <CustomCard Title="Part" TitleValue="TitleHere" Var1="Brand" Var1Value="BrandHere" Var2="Description" Var2Value="DescriptionHere"/>
        );
    };

    const createPartData = async () => {
        //set vars from app State
        //const partId = user.uid; //corresponds to user ID
        const RandomID = "";
        const PartValue = part;
        const BrandValue = brand;
        const DescriptionValue = description;
    
        //create doc in DB
        await setDoc(doc(db, "BikeParts", RandomID), { 
            part_Id: user.uid,
            part_name: PartValue,
            part_brand: BrandValue,
            part_description: DescriptionValue
        }).then(() => {
            console.log("Data submitted")
        }).catch((error) => {
            console.log(error);
        });

        //clear the fields and close the modal
        //setPart(null)
        //setDescription(null)
        //setShowModal(false);
        hideModal();

    };

    return (
        <View style={styles.root}>
            <CustomBanner 
                text='My Bikes' 
                ButtonL={<CustomButton text='   ' type='icon'/>} 
                ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
                />

            <View style={styles.content}>

                

                <View style={styles.bikes}>
                    <Pressable onPress={changeBikeName}><Text style={styles.bikesText}>Bike1</Text></Pressable>
                    <Image source={Bicycle} resizeMode="contain" style={styles.logo}/>
                </View>

                <Modal transparent={true} visible={showModal}>
                    <View style={styles.modalbg}>
                        <View style={styles.modal}>
                            <View style={styles.modal_titleContainer}>
                                <Text style={styles.modal_title}>Add a part</Text>
                            </View>

                            <CustomInput placeholder="Part Name" value={part} setValue={setPart} multiline={true}/>
                            <CustomInput placeholder="Brand" value={brand} setValue={setBrand} multiline={true}/>
                            <CustomInput placeholder="Description" value={description} setValue={setDescription} size='big' multiline={true}/>
                            
                            <View>
                                <CustomButton text="Submit" onPress={createPartData} type='primary'/>
                                <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={styles.partsContainer}>
                    <CustomCard Title="Part" TitleValue="TitleHere" Var1="Brand" Var1Value="BrandHere" Var2="Description" Var2Value="DescriptionHere"/>
                    <CustomCard Title="Part"  Var1="Brand" Var2="Description"/>
                    <CustomCard Title="Part"  Var1="Brand" Var2="Description"/>
                    <CustomCard Title="Part"  Var1="Brand" Var2="Description"/>
                    <CustomCard Title="Part"  Var1="Brand" Var2="Description"/>
                    <CustomCard Title="Part"  Var1="Brand" Var2="Description"/>
                    <CustomCard Title="Part"  Var1="Brand" Var2="Description"/>
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
        height: '35%',
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
        marginBottom: 0,
        marginTop: '4%',
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
        height: 625,
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

export default PartsScreen;