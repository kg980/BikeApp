import React , {useEffect, useReducer, useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView, Modal, FlatList} from 'react-native';
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import ForumCard from "../../components/ForumCard";
import SearchIcon from "../../../assets/images/SearchIcon.png";
//import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";
//firebase imports
import { authentication, db, dbTimeStamp } from "../../../firebase";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { onSnapshot, query, where, orderBy, QuerySnapshot, FirestoreError } from 'firebase/firestore';
import { async } from "@firebase/util";
//screen for distance tracker and navigation buttons

const ForumScreen = () => {

    const forumPostsCollection = collection(db, 'ForumPosts');
    const user = authentication.currentUser;

    const[showModal, setShowModal] = useState('true');
    const [refreshMe, forceUpdate] = useReducer(x => x + 1, 0);
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const [postsList, setPostsList] = useState([]);

    //Fetch data

    // useEffect(() => {
        
    //     const getPostsList = async () => { 
    //     //this is an async function. Bad practise to make the useEffect async. create a function inside the useEffect instead, then call the functions.
    //         const postData = await getDocs(forumPostsCollection); //await  handles the promise
    //         setPostsList(postData.docs
    //             .map((doc) => ({ ...doc.data(), id: doc.id }))); //gives an array of doc OBJECTS
    //         console.log(postsList);
    //     };
    //     getPostsList();
    //     // return () => {
    //     //     getPostsList();
    //     // };
        
    // }, [refreshMe])

    

    // const fetchdata = async() => {
    //     onSnapshot(forumPostsCollection, (querySnapshot) => {
    //         const posts = []
    //         querySnapshot.forEach((doc) => 
    //         {
    //             const { 
    //                 post_username, 
    //                 post_userid, 
    //                 post_timestamp, 
    //                 post_title, 
    //                 post_body 
    //             } = doc.data()

    //             posts.push({
    //                 id: doc.id,
    //                 post_username, 
    //                 post_userid, 
    //                 post_timestamp, 
    //                 post_title, 
    //                 post_body
    //             })
    //         })
    //         setPostsList(posts)
    //     })
    // };
    
    // useEffect( () => {fetchdata(); }, [])

    // const getForumPosts = async() => {
    //     forumPosts = await getDocs(forumPostsCollection)
    //     .then((snapshot) => {
    //         let posts = []
    //         snapshot.docs.forEach((doc) => {
    //             posts.push({ ...doc.data(), id: doc.id })
    //         })
    //         console.log(posts)
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })
    // };

    // useEffect(()  => {getForumPosts();}, [])

    useEffect(() => {
        const getPostsList = async () => {
            const postData = await getDocs(forumPostsCollection);
            setPostsList(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(postsList);
        };
        getPostsList();
        

    }, [refreshMe])



    const addButtonClicked = () => {
        //console.warn("Add Post Clicked");
        setShowModal(true);
    };

    //ADD A DOC
    const createPostData = async () => {
        const creationTimeStamp = dbTimeStamp.now();
        const displayName = user.email.split("@")[0]
    
        //create doc in DB
        await addDoc(forumPostsCollection, {
            post_username: displayName,
            post_userid: user.uid,
            post_timestamp: creationTimeStamp,
            post_title: title,
            post_body: body,
        }).then(() => {
            console.log("Post submitted")
        }).catch((error) => {
            console.log(error);
        });

        //refresh & close pop-up
        forceUpdate();
        hideModal();
    };
    

    const searchButtonClicked = () => {
        console.warn("Search Clicked");
    };

    const hideModal = () => {
        //console.warn("hideModal");
        //hide the add part pop up modal:
        setShowModal(false);

        //clear inputs:
        setTitle(null)
        setBody(null)
    };

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
                            <CustomButton text="Submit" onPress={createPostData} type='primary'/>
                            <CustomButton text="Discard" onPress={hideModal} type='secondary'/>
                        </View>
                    </View>
                </View>
            </Modal>
                
            <View style={styles.content}>
            
                {/* <ScrollView>
                    <ForumCard Title="Title" Body="Hello world!" Username="Kinga" Timestamp="15:30"/>
                    <ForumCard Title="Help my tyre is flat" Body="Do i need a whole new tyre or just an inner tube? I cant see any marks" Username="Kinga" Timestamp="15:30"/>
                    <ForumCard Title="which type of brakes does this bike need?" Body="My brakes broke and im not sure which type im supposed to buy" Username="Kinga" Timestamp="15:30"/>
                    <ForumCard Title="what tools do you need to tighten a chain?" Body="The chain keeps slipping off the gears" Username="Kinga" Timestamp="15:30"/>
                    
                </ScrollView> */}

                {/* <ScrollView> 
                    {postsList.map((post) => {
                        return(
                            <ForumCard 
                                Title={post.post_title} 
                                Body={post.post_body}
                                Username={post.post_username}
                                Timestamp={post.post_timestamp}
                            />
                        )
                    })}   
                </ScrollView> */}

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