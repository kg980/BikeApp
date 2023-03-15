import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, getFirestore, deleteDoc } from 'firebase/firestore/lite';
import CustomCard from "../../components/CustomCard";

const PartsFetch =  () => {
    const [parts, setParts] = useState([]);
    const partsCollectionRef = collection(db, 'BikeParts');
    const [refresh, setRefresh] = useState(false);
 
    useEffect(() => {
        
        const getParts = async () => { 
        //this is an async function. Bad practise to make the useEffect async. 
        //create a function inside the useEffect instead, then call the functions.
            const partData = await getDocs(partsCollectionRef); //await  handles the promise
            setParts(partData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getParts();

    }, [])

    const deletePart = async (id) => {
        //console.warn("delete entry");
        const partDoc = doc(db, "BikeParts", id);
        await deleteDoc(partDoc);

        //refresh
    };

    const editPart = () => {
        console.warn("edit Entry");
    };


    return (
        <ScrollView>
            {parts.map((part) => {
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