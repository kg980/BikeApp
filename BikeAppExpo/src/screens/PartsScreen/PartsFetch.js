import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, getFirestore, deleteDoc } from 'firebase/firestore/lite';
import CustomCard from "../../components/CustomCard";

const PartsFetch =  () => {
    const [partsList, setPartsList] = useState([]);
    const partsCollectionRef = collection(db, 'BikeParts');
    const [refreshMe, forceUpdate] = useReducer(x => x + 1, 0); //increment every time forceUpdate() is called
    //emulates forceUpdate, as react re-renders whenever there is a state change (in this case, the state of 'refreshMe' will change as it increments). 
    //DB change does not count as a state change from the app's perspective, and once useEffect runs to fetch data (at the start), it doesnt run again.
    //so to make sure the screen refreshes every time there is a db update, i need this constant to increment (change state) therefore 
    //force a re-render and show updated db info on the UI
 
    useEffect(() => {
        
        const getPartsList = async () => { 
        //this is an async function. Bad practise to make the useEffect async. 
        //create a function inside the useEffect instead, then call the functions.
            const partData = await getDocs(partsCollectionRef); //await  handles the promise
            setPartsList(partData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        
        getPartsList();

    }, [refreshMe])

    const deletePart = async (id) => {
        //console.warn("delete entry");
        const partDoc = doc(db, "BikeParts", id);
        await deleteDoc(partDoc);

        //refresh to render updated DB on UI:
        forceUpdate();
        
    };

    const editPart = () => {
        //console.warn("edit Entry");
    };


    return (
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
                        EditAction={editPart}
                        DeleteAction={() => deletePart(part.id)}
                    />
                )
            })}
        </ScrollView>
    )
};

export default PartsFetch