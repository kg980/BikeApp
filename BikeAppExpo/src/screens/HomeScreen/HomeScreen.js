import React , {useState, useEffect, useReducer} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native';
import Bicycle from "../../../assets/images/Bicycle.png";
import BicycleRed from "../../../assets/images/BicycleRed.png";
import LogoutIcon from "../../../assets/images/LogoutIcon.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { getDoc, onSnapshot, query, where } from "firebase/firestore";


//screen for distance tracker and navigation buttons

const HomeScreen = () => {

    const userStatsCollectionRef = collection(db, 'UserStats');
    const maintenanceCollectionRef = collection(db, 'MaintenanceHistory');

    const user = authentication.currentUser;
    const[userRepairDist, setUserRepairDist] = useState('');
    const[userDataId, setUserDataId] = useState('');
    const[userDataList, setUserDataList] = useState([]);
    const[currentUserStats, setCurrentUserStats] = useState([]);
    const [refreshMe, forceUpdate] = useReducer(x => x + 1, 0);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    //fetch user data
    useEffect(() => {
        const getUserDataList = async () => { 
        //this is an async function. Bad practise to make the useEffect async. create a function inside the useEffect instead, then call the functions.
            //const q = await query(userStatsCollectionRef, where("user_id", "==", "sdJhKPRlqwZLvQdrtcVm9Dgemn93"));
            const usersStatsData = await getDocs(userStatsCollectionRef); //await  handles the promise
            setUserDataList(usersStatsData.docs
                .filter((doc) => doc.user_id == user.id)
                .map((doc) => ({ ...doc.data(), id: doc.id }))); //gives an array of doc OBJECTS
            //console.log(userDataList);
        };
        getUserDataList();
    }, [refreshMe])

    

    const myBikesPressed = () => {
        //
        navigation.navigate("PartsScreen");
    };

    const forumPressed = () => {
        //
        navigation.navigate("ForumScreen");
    };

    const maintListPressed = () => {
        //
        navigation.navigate("MaintenanceChecklistScreen");
    };

    const journeysPressed = () => {
        //
        navigation.navigate("JourneyHistoryScreen");
    };

    const pumpIt = async (id) => {
        //alert(id);
        //currentUserStats  => setCurrentUserStats([])
        const repairDistance = 0;
        const statsDocRef = doc(db, "UserStats", id); //returns document reference instance
        console.log("statsDocRef: ", statsDocRef)

        //retrieve and store the repair distance value in a variable, to be stored in the maintenance record
        // docData = await getDoc(statsDocRef)
        // .then((snapshot) => {
        //     //console.log("snapshot data: ", snapshot.doc.data())
        //     snapshot.docs.map(doc => doc.data())
        // })
        
        // try{
        //     const statsDocSnap = await getDoc(statsDocRef)
        //         .then((snapshot) => {console.log("Doc Data: ", snapshot.data())});
            
        // } catch (e) {
        //     console.log("Error getting document: ", e);
        // }

        // await getDoc(statsDocRef)
        // .then((doc) => {
        //     console.log("Getting the doc")
        //     //add the distanceValue to the UserStats collection repair distance value.
        //     console.log("test alert 1: ", doc.id)
        //     console.log("test alert 2: ", doc)
        //     console.log("test alert 3: ", doc.data())
        // }).catch((error) => {
        //     console.log(error);
        // });
		


        
        
        //update the value of statsDoc.repair_distance to 0    
        const NewValue = {user_repair_distance: 0};
        updateDoc(statsDocRef, NewValue);
        
        //add a maintenance record to the DB
        addMaintenanceRecord(repairDistance);
        alert("Maintenance record added to your maintenance history.")

        //refresh to render updated DB on UI:
        forceUpdate();
    };

    const addMaintenanceRecord = async (repairDistance) => {
        const creationTimeStamp = dbTimeStamp.now();
    
        //create doc in DB
        await addDoc(maintenanceCollectionRef, {
            user_id: user.uid,
            maintenance_date: creationTimeStamp,
            maintenance_notes: "", //user can edit this themselves on the maintenance history screen to add notes.
            maintenance_distance: repairDistance,
            maintenance_part: ""
        }).then(() => {
            console.log("Maintenance Record submitted")
        }).catch((error) => {
            console.log(error);
        });

        //refresh & close pop-up
        forceUpdate();
    };

    const tempRefresh = () => {
        forceUpdate();
    }

    const logoutPressed = () => {
        //logout user
        signOut(authentication)
        .then((re) => {
            //setIsLoggedIn(false);
            navigation.replace("LoginOptionsScreen")
        })
        //must use REPLACE not NAVIGATE because we dont want to  add the  login page to the stack 
        //(user would be able  to swipe back and access the home screen)
        .catch(error => alert(error.message)) 
        
    };
    



    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Profile' 
                ButtonL={<CustomButton text='   ' type='icon'/>} 
                ButtonR={<TouchableOpacity onPress={logoutPressed}><Image style={styles.icons} source={LogoutIcon}/></TouchableOpacity>}

                />
            <View style={styles.content}>
                <View style={styles.distance}>
                    <TouchableOpacity onPress={tempRefresh}><Image source={Bicycle} resizeMode="contain"/></TouchableOpacity>
                    
                    
                    {
                        userDataList
                        .filter((item) => item.user_id == 'sdJhKPRlqwZLvQdrtcVm9Dgemn93')
                        .map((userData) => {
                            //setUserDataId(userData.id);  //this causes infinite loop  of re-renders. dont use setter here.
                            return(
                                <View key={userData.id} style={styles.userStats}>
                                    <Text style={styles.distanceText}>{userData.user_repair_distance}/4000km</Text>
                                    <Text style={styles.meter}></Text>
                                    <TouchableOpacity onPress={() => pumpIt(userData.id)} style={styles.pumpIt}><Text style={styles.pumpItText}>PumpIt!</Text></TouchableOpacity>
                                </View>
                            )
                            //<Text style={styles.meter}></Text>
                        })
                    
                    }
                        
                    
                    
                </View>

                <View style={styles.buttonsBox}>
                    <View style={styles.buttonsCol}>
                        <CustomButton text="My Bikes" type="nav" onPress={myBikesPressed}/>
                        <CustomButton text="Maintenance Checklist" type="nav" onPress={maintListPressed}/>
                    </View>
                    <View style={styles.buttonsCol}>
                        <CustomButton text="Journeys" type="nav" onPress={journeysPressed}/>
                        <CustomButton text="Forum" type="nav" onPress={forumPressed}/>

                    </View>
                </View>
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
    distance: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '60%',
        alignItems: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        //backgroundColor: 'yellow',
    },
    userStats: {
        //backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        //height: '60%',
        width: '100%',
        alignItems: 'center',
    },
    buttonsBox: {
        display: 'flex',
        flexDirection: 'row',
        //alignItems: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: '40%',
    },
    buttonsCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        //justifyContent: 'space-around',
        justifyContent: 'center',
        //justifyContent: 'space-between',
        //backgroundColor: 'yellow',
        //padding: '1%',
    },
    pumpIt: {
        backgroundColor: '#FF8001',
        borderColor: '#FF8001',
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 20,
        marginBottom: '1%',
    },
    pumpItText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    distanceText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    distanceTextRed: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
    },
    meter: {
        backgroundColor: 'white',
        width: '80%',
        height: '30%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'white',
        },
    icons: {
        height: 40,
        width: 40,
        marginHorizontal: 8,
    }
});

export default HomeScreen;