import React , {useState, useReducer, useEffect} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import CustomCard from "../../components/CustomCard";
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

//screen for distance tracker and navigation buttons

const JourneyHistoryScreen = () => {

    const navigation = useNavigation();

    const[showModal, setShowModal] = useState('false');
    const[distance, setDistance] = useState('');
    const[time, setTime] = useState('');
    const [journeysList, setJourneysList] = useState([]);
    const [refreshMe, forceUpdate] = useReducer(x => x + 1, 0);

    const journeysCollectionRef = collection(db, 'Journeys');
    const user = authentication.currentUser;

    const userStatsCollectionRef = collection(db, 'UserStats');

    //Fetch DB data
    useEffect(() => {
        
        const getJourneysList = async () => { 
        //this is an async function. Bad practise to make the useEffect async. create a function inside the useEffect instead, then call the functions.
            const journeysData = await getDocs(journeysCollectionRef); //await  handles the promise
            setJourneysList(journeysData.docs
                .filter((doc) => doc.journey_userid == user.id)
                .map((doc) => ({ ...doc.data(), id: doc.id }))); //gives an array of doc OBJECTS
            //console.log(journeysList);
        };
        getJourneysList();
    }, [refreshMe])


    const addButtonClicked = () => {
        //console.warn("Add Bike Clicked");
        setShowModal(true);
    };

    const homeButtonClicked = () => {
        navigation.navigate("HomeScreen");
    };

    //add doc to DB
    const submitModal = async () => {
        const distanceValue = distance;
        const timeValue = time;
        const creationTimeStamp = dbTimeStamp.now();
    
        //create doc in DB
        await addDoc(journeysCollectionRef, { //addDoc = auto-generates an ID. SetDoc = must specify an ID yourself. overwrites docs with same ID.
            journey_userid: user.uid, //in the future, can make this correspond to a particular bicycle ID instead, so that you can display parts corresponding to each bike.
            journey_distance: distanceValue,                                                       //the bicycle Id can then correspond to the user ID to link it all to the user.
            journey_time: timeValue,
            journey_date: creationTimeStamp,
        }).then((doc) => {
            console.log("Journey Data submitted")
            //add the distanceValue to the UserStats collection repair distance value.
            //console.log("test alert: ", doc.id)
            //console.log("test alert 2: ", doc)
            addRepairDistance(distanceValue, 'SHjSXllFLUfNF8scEtrK');
        }).catch((error) => {
            console.log(error);
        });


        //refresh & close pop-up
        forceUpdate();
        hideModal();
    };

    const addRepairDistance = async (addDistance, id) => {
        //fetch the user's userStats (userStatsCollectionRef)
        const docRef = doc(db, 'UserStats', id); //need to update this later so we fetch based on user id
        console.log("docRef: ", docRef)

        //update the value of statsDoc.repair_distance to 0  
        //const newDistance = docRef.data().user_repair_distance + addDistance 
        const NewValue = {user_repair_distance: addDistance};
        updateDoc(docRef, NewValue);
        
        //logic to check whether we have exceeded 4km, 
        //in which case the user should get a notification that they should do maintenance.

        forceUpdate();
    };

    //delete doc
    const deleteJourney = async (id) => {
        //update the repair distance.
        //subtract the deleted value from the current userStats repair distance
        //if the new value is less than 0, set it to 0.

        //delete doc from collection
        const journeyDoc = doc(db, "Journeys", id);
        await deleteDoc(journeyDoc);

        //refresh to render updated DB on UI:
        forceUpdate();
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
                ButtonL={<CustomButton text='☖' type='icon' onPress={homeButtonClicked}/>} 
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

                            <CustomInput placeholder='Distance (km)' value={distance} setValue={setDistance} multiline={true}/>
                            <CustomInput placeholder='Time (minutes)' value={time} setValue={setTime} multiline={true}/>
                                
                            <View style={styles.modalButtons}>
                                <CustomButton text="Submit" onPress={submitModal} type='primary'/>
                                <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={styles.partsContainer}>
                    {/*<CustomCard Title="Date"  Var1="Distance (km)" Var2="Time (minutes)"/>*/}

                    {journeysList.map((journey) => {
                        const journeydate = new Date(journey.journey_date.seconds*1000)
                        const datestringarr = journeydate.toString().split(" ")
                        const datestring = datestringarr[2] + ' ' + datestringarr[1] + ' ' + datestringarr[3]
                        return(
                            <CustomCard  
                                Title="Date" 
                                TitleValue={datestring} 
                                Var1="Distance (km)" 
                                Var1Value={journey.journey_distance} 
                                Var2="Time (minutes)" 
                                Var2Value={journey.journey_time}
                                key={journey.id}
                                DeleteAction={() => deleteJourney(journey.id)}
                            />
                        )
                    })}    

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