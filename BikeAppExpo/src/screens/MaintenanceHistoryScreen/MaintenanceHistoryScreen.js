import React , {useReducer, useState, useEffect} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal} from 'react-native';
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import CustomCard from "../../components/CustomCard";
import CustomInput from "../../components/CustomInput/CustomInput";
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

//screen for distance tracker and navigation buttons

const MaintenanceHistoryScreen = () => {

    const[parts, setParts] = useState('');
    const[notes, setNotes] = useState('');
    const [maintenanceList, setMaintenanceList] = useState([]);
    const [refreshMe, forceUpdate] = useReducer(x => x + 1, 0);

    const[showModal, setShowModal] = useState(false);
    const[showEditModal, setShowEditModal] = useState(false);

    const [editingMaintenanceParts, setEditingMaintenanceParts] = useState('');
    const [editingMaintenanceId, setEditingMaintenanceId] = useState('');
    const [editingMaintenanceNotes, setEditingMaintenanceNotes] = useState('');

    const maintenanceCollectionRef = collection(db, 'MaintenanceHistory');
    const user = authentication.currentUser;

    //fetch DB data
    useEffect(() => {
        
        const getMaintenanceList = async () => { 

            const maintenanceData = await getDocs(maintenanceCollectionRef); //await  handles the promise
            setMaintenanceList(maintenanceData.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))); //gives an array of doc OBJECTS
            //console.log(journeysList);
        };
        getMaintenanceList();

    }, [refreshMe])

    const addButtonClicked = () => {
        setShowModal(true);
    };

    const hideModal = () => {
        //console.warn("hideModal");
        //hide the add part pop up modal:
        setShowModal(false);
        setShowEditModal(false);

        //clear inputs:
        setParts(null)
        setNotes(null)
    };

    const submitModal = () => {
        //add DB entry
    };

    const setEditMaintenance = async (id, maintenanceParts, maintenanceNotes)  => {
        setShowEditModal(true);
        
        setEditingMaintenanceId(id);
        setEditingMaintenanceParts(maintenanceParts);
        setEditingMaintenanceNotes(maintenanceNotes);
    };

    //update record in DB
    const editMaintenanceData = async () => {
        const MaintenanceParts = {maintenance_parts: parts};
        const MaintenanceNotes = {maintenance_notes: notes};

        const docRef = doc(db, 'MaintenanceHistory', editingMaintenanceId);
        
        //Conditionally update data depending on which field(s) has been filled in/edited in the edit modal pop up.
        if(parts !== null){
            updateDoc(docRef, MaintenanceParts)
            .then(docRef => {
                console.log("Maintenance Parts Updated")
                forceUpdate();
            }).catch((error) => {
                console.log(error);
            });
        }

        if(notes !== null){
            updateDoc(docRef, MaintenanceNotes)
            .then(docRef => {
                console.log("Maintenance Notes Updated")
                forceUpdate();
            }).catch((error) => {
                console.log(error);
            });
        }

        //refresh & close pop-up
        forceUpdate();
        hideModal();
    };

    //delete doc
    const deleteMaintenance = async (id) => {

        //delete doc from collection
        const maintenanceDoc = doc(db, "MaintenanceHistory", id);
        await deleteDoc(maintenanceDoc);

        //refresh to render updated DB on UI:
        forceUpdate();
    };


    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Maintenance History' 
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

                            <CustomInput placeholder='Part(s)' value={parts} setValue={setParts} multiline={true}/>
                            <CustomInput placeholder='Maintenance Notes' value={notes} setValue={setNotes} multiline={true} size='big'/>
                                
                            <View style={styles.modalButtons}>
                                <CustomButton text="Submit" onPress={submitModal} type='primary'/>
                                <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal transparent={true} visible={showEditModal}>
                    <View style={styles.modalbg}>
                        <View style={styles.modal}>
                            <View style={styles.modal_titleContainer}>
                                <Text style={styles.modal_title}>Edit Maintenance Notes</Text>
                            </View>

                            <CustomInput placeholder={editingMaintenanceParts} value={parts} setValue={setParts} multiline={true}/>
                            <CustomInput placeholder={editingMaintenanceNotes} value={notes} setValue={setNotes} multiline={true} size='big'/>
                            
                            <View>
                                <CustomButton text="Submit" onPress={editMaintenanceData} type='primary'/>
                                <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={styles.partsContainer}>
                    {/*<CustomCard Title="Date"  Var1="Part(s)" Var2="Notes" EditAction={setEditMaintenance}/>*/}
                    {maintenanceList.map((maintenance) => {
                        const maintenancedate = new Date(maintenance.maintenance_date.seconds*1000)
                        const datestringarr = maintenancedate.toString().split(" ")
                        const datestring = datestringarr[2] + ' ' + datestringarr[1] + ' ' + datestringarr[3]
                        return(
                            <CustomCard  
                                Title="Date" 
                                TitleValue={datestring} 
                                Var1="Part(s)" 
                                Var1Value={maintenance.maintenance_parts} 
                                Var2="Notes" 
                                Var2Value={maintenance.maintenance_notes}
                                key={maintenance.id}
                                EditAction={() => setEditMaintenance(maintenance.id, maintenance.maintenance_part, maintenance.maintenance_notes)}
                                DeleteAction={() => deleteMaintenance(maintenance.id)}
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
    modalButtons: {
        marginTop: '5%',
        paddingTop: '5%',
        borderTopColor: '#b0b0b0',
        borderTopWidth: 1,
    },
});

export default MaintenanceHistoryScreen;