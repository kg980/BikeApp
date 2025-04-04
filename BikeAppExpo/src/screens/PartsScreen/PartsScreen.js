import React , { useState, useReducer, useEffect } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal, Touchable, TouchableOpacity} from 'react-native';
import Bicycle from "../../../assets/images/Bicycle.png";
import BicycleRed from "../../../assets/images/BicycleRed.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import PartsCard from "../../components/PartsCard";
import CustomCard from "../../components/CustomCard";
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { onSnapshot, query, where, orderBy, QuerySnapshot, FirestoreError } from 'firebase/firestore';
//import 'react-native-get-random-values';
//import { v4 as uuidv4 } from 'uuid';
import PartsFetch from "./PartsFetch";
import { useNavigation } from "@react-navigation/native";

//screen for distance tracker and navigation buttons

const PartsScreen = () => {

    const navigation = useNavigation();
    
    const[part, setPart] = useState('');  //read input from the app
    const[description, setDescription] =  useState(''); //read input from the app
    const[brand, setBrand] =  useState(''); //read input from the app
    const[showModal, setShowModal] = useState(false);
    const [partsList, setPartsList] = useState([]);
    const [refreshMe, forceUpdate] = useReducer(x => x + 1, 0); //increment every time forceUpdate() is called
    //emulates forceUpdate, as react re-renders whenever there is a state change (in this case, the state of 'refreshMe' will change as it increments). 
    //DB change does not count as a state change from the app's perspective, and once useEffect runs to fetch data (at the start), it doesnt run again.
    //so to make sure the screen refreshes every time there is a db update, i need this constant to increment (change state) therefore 
    //force a re-render and show updated db info on the UI
    const [editingPartName, setEditingPartName] = useState('');
    const [editingPartId, setEditingPartId] = useState('');
    const[showEditModal, setShowEditModal] = useState(false);
    const [editingPartBrand, setEditingPartBrand] = useState('');
    const [editingPartDescription, setEditingPartDescription] = useState('');
    const [loading, setLoading] = useState(false);

    //firebase stuff
    const partsCollectionRef = collection(db, 'BikeParts');
    const user = authentication.currentUser;

    const addButtonClicked = () => {
        //console.warn("Add Bike Clicked");
        //show the modal pop up for parts input
        setShowModal(true);
    };

    const maintenanceHistoryClicked = () => {
        navigation.navigate("MaintenanceHistoryScreen");
    };

    const changeBikeName = () => {
        alert("Changing your bike name is not available in this prototype, but will be implemented in the final version.");
    };

    const hideModal = () => {
        //console.warn("hideModal");
        setShowModal(false); //hide the add part pop up modal:
        setShowEditModal(false); //works for both modals

        //clear inputs:
        setPart(null)
        setDescription(null)
        setBrand(null)
        
        //clear editPart ID and name
        //setEditingPartName(null)
        //setEditingPartId(null)
        //setEditingPartBrand(null)
        //setEditingPartDescription(null)
    };

    //FIRESTORE IMPLEMENTATION:

    //FETCH DB DATA one-time
    {/*
    useEffect(() => {
        
        const getPartsList = async () => { 
        //this is an async function. Bad practise to make the useEffect async. create a function inside the useEffect instead, then call the functions.
            const partData = await getDocs(partsCollectionRef); //await  handles the promise
            setPartsList(partData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(partsList);
        };
        getPartsList();
    }, [refreshMe])
    */}

    //{/*
    useEffect(() => {
        
        const getPartsList = async () => { 
        //this is an async function. Bad practise to make the useEffect async. create a function inside the useEffect instead, then call the functions.
            const partData = await getDocs(partsCollectionRef); //await  handles the promise
            setPartsList(partData.docs
                .filter((doc) => doc.part_userid == user.id)
                .map((doc) => ({ ...doc.data(), id: doc.id }))); //gives an array of doc OBJECTS
            console.log(partsList);
        };
        getPartsList();
    }, [refreshMe])
    //*/}

    //REALTIME FETCH DATA
    {/*
    useEffect(() => {
        const queryData = query(
                partsCollectionRef, 
                where('part_userid', '==', 'sdJhKPRlqwZLvQdrtcVm9Dgemn93')
            );
            
        const getPartsList = onSnapshot(queryData, (snapshot) => {
            let items = []
            snapshot.docs.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id })
            });
            console.log(items);
            setPartsList(items);
        });
        getPartsList();

        return () => {
            getPartsList();
        };

    }, [refreshMe])
    */}

    {/*
    useEffect(() => {
        //const partsCollectionRef = collection(db, 'BikeParts'); //this is already defined, pasted it here for easy reference.
        const q = query(
            partsCollectionRef, 
            //where('part_userid', '==', 'sdJhKPRlqwZLvQdrtcVm9Dgemn93')
            orderBy('part_timestamp', 'asc')
        ); 
        //temp user.id: sdJhKPRlqwZLvQdrtcVm9Dgemn93
        
        setLoading(true);

        const unsub = onSnapshot(q, (querySnapshot) => { //querySnapshot is a list of items returned by the query
            const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            //setPartsList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

            // querySnapshot.forEach((doc) => {
            //     console.log(doc.data());
            //     //items.push(doc.data());
            // });
            setPartsList(items);
            setLoading(false);
        });

        return () => {
            unsub();
        };
    }, [refreshMe]);
    */}

    {/*
    useEffect(() => {
        const getPartsList = async () => { 
            const items = []

            const queryData = query(
                partsCollectionRef, 
                where('part_userid', '==', authentication.currentUser.id)
            );

            const querySnapshot = await getDocs(queryData)
            .then(docRef => {
                console.log("querySnapshot Docs aquired")
            })
            .catch((error) => {
                console.log(error);
            });


            items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            .then(docRef => {
                console.log("querySnapshot Docs aquired")
            })
            .catch((error) => {
                console.log(error);
            });

            setPartsList(items);

        };

        getPartsList();

    }, [refreshMe])
    */}
    
    //ADD A DOC
    const createPartData = async () => {
        //set vars from app State
        //const partId = user.uid; //corresponds to user ID
        //const RandomID = uuidv4(); //random number using the uuid package
        const PartValue = part;
        const BrandValue = brand;
        const DescriptionValue = description;
        const creationTimeStamp = dbTimeStamp.now();
    
        //create doc in DB
        await addDoc(collection(db, "BikeParts"), { //addDoc = auto-generates an ID. SetDoc = must specify an ID yourself. overwrites docs with same ID.
            part_userid: user.uid, //in the future, can make this correspond to a particular bicycle ID instead, so that you can display parts corresponding to each bike.
            part_name: PartValue,                                                       //the bicycle Id can then correspond to the user ID to link it all to the user.
            part_brand: BrandValue,
            part_description: DescriptionValue,
            part_timestamp: creationTimeStamp,
        }).then(() => {
            console.log("Data submitted")
        }).catch((error) => {
            console.log(error);
        });

        //refresh & close pop-up
        forceUpdate();
        hideModal();
    };

    //DELETE DOC
    const deletePart = async (id) => {
        //console.warn("delete entry");
        const partDoc = doc(db, "BikeParts", id);
        await deleteDoc(partDoc);
        //refresh to render updated DB on UI:
        forceUpdate();
    };

    //UPDATE DOC - set states to show correct placeholders on the modal
    const setEditPart = async (id, partName, Brand, Description)  => {
        setEditingPartName(partName);
        setEditingPartId(id);
        setEditingPartBrand(Brand);
        setEditingPartDescription(Description);
        setShowEditModal(true);
    };
    
    //UPDATE DOC IN THE DB
    const editPartData = async () => {
        const updateTimeStamp = dbTimeStamp.now();
        //const TimestampValue = {part_timestamp: updateTimeStamp};
        const PartValue = {part_name: part, part_timestamp: updateTimeStamp};
        const BrandValue = {part_brand: brand, part_timestamp: updateTimeStamp};
        const DescriptionValue = {part_description: description, part_timestamp: updateTimeStamp};

        docRef = doc(db, 'BikeParts', editingPartId);
        
        //Conditionally update data depending on which field(s) has been filled in/edited in the edit modal pop up.
        if(part !== null){
            updateDoc(docRef, PartValue)
            .then(docRef => {
                console.log("Part Name Updated")
                forceUpdate();
            }).catch((error) => {
                console.log(error);
            });
        }

        if(brand !== null){
            updateDoc(docRef, BrandValue)
            .then(docRef => {
                console.log("Part Brand Updated")
                forceUpdate();
            }).catch((error) => {
                console.log(error);
            });
        }

        if(description !== null){
            updateDoc(docRef, DescriptionValue)
            .then(docRef => {
                console.log("Part Description Updated")
                forceUpdate();
            }).catch((error) => {
                console.log(error);
            });
        }

        //refresh & close pop-up
        forceUpdate();
        hideModal();
    };

    const homeButtonClicked = () => {
        navigation.navigate("HomeScreen");
    }

    //render screen-------------------------------------------------------------------------

    return (
        <View style={styles.root}>
            <CustomBanner 
                text='My Bikes' 
                ButtonL={<CustomButton text='☖' type='icon' onPress={homeButtonClicked}/>} 
                ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
                />

            <View style={styles.content}>

                

                <View style={styles.bikes}>
                    <Pressable onPress={changeBikeName}><Text style={styles.bikesText}>Bike1 ✎</Text></Pressable>
                    <Image source={Bicycle} resizeMode="contain" style={styles.logo}/>
                    <TouchableOpacity style={styles.maintenanceHistoryContainer} onPress={maintenanceHistoryClicked}>
                        <Text style={styles.maintenanceHistoryText}>Maintenance History</Text>
                    </TouchableOpacity>
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

                <Modal transparent={true} visible={showEditModal}>
                    <View style={styles.modalbg}>
                        <View style={styles.modal}>
                            <View style={styles.modal_titleContainer}>
                                <Text style={styles.modal_title}>Edit {editingPartName}</Text>
                            </View>

                            <CustomInput placeholder={editingPartName} value={part} setValue={setPart} multiline={true}/>
                            <CustomInput placeholder={editingPartBrand} value={brand} setValue={setBrand} multiline={true}/>
                            <CustomInput placeholder={editingPartDescription} value={description} setValue={setDescription} size='big' multiline={true}/>
                            
                            <View>
                                <CustomButton text="Submit" onPress={editPartData} type='primary'/>
                                <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView>
                    {partsList.map((part) => {
                        return(
                            <CustomCard 
                                Title="Part" 
                                TitleValue={part.part_name} 
                                Var1="Brand" 
                                Var1Value={part.part_brand} 
                                Var2="Description" 
                                Var2Value={part.part_description}
                                EditAction={() => setEditPart(part.id, part.part_name, part.part_brand, part.part_description)}
                                DeleteAction={() => deletePart(part.id)}
                                key={part.id}
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
        height: '40%',
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
    maintenanceHistoryText: {
        fontSize: 18,
        color: 'white',
        //fontWeight: 'bold',
    },
    maintenanceHistoryContainer: {
        backgroundColor: '#FF8001',
        padding: '2%',
        margin: '2%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#FF8001',
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3.5%',
    },
});

export default PartsScreen;