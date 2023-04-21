import React , {useState, useEffect} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal, TouchableOpacity} from 'react-native';
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import MapImage from "../../../assets/images/map.png";

//screen for distance tracker and navigation buttons

const JourneyScreen = () => {

    const[distance, setDistance] = useState('0');
    const[time, setTime] = useState('0:00:00');
    const {height} = useWindowDimensions();
    const[stopModal, showStopModal] = useState(false);
    const[remainingSecs, setRemainingSecs] = useState(0);
    const[active, setActive] = useState(false);
    
    const formatNumber = number => `0${number}`.slice(-2);
    const getRemaining = (time) => {
        const mins = Math.floor(time / 60);
        const hours = mins / 60
        const secs = time - mins * 60;
        return {hours: formatNumber(hours), mins: formatNumber(mins), secs: formatNumber(secs)};
    };

    const { hours, mins, secs } = getRemaining(remainingSecs);

    const toggle = () => {
        setActive(!active);
    }

    useEffect(() => {
        let interval = null
        if(active) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
            }, 1000)
        } else if(!active && remainingSecs !== 0){
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [active, remainingSecs])



    const goStartPressed  = () => {
        setActive(!active);
        showStopModal(true);
    }

    const stopPressed  = () => {
        setActive(!active)
        showStopModal(false);
    }

    return (
        <View style={styles.root}>
            <CustomBanner 
                text='Current Ride' 
                //ButtonL={<CustomButton text='   ' type='icon'/>} 
                //ButtonR={<CustomButton text="+" type='icon' onPress={addButtonClicked}/>}
                />
            <View style={styles.content}>

                {/*<View style={styles.ridebox}></View>*/}

                <Image source={MapImage} style={[styles.ridebox, {width: height *  0.49}]}/>

                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>Distance: {distance} (km)</Text>
                </View>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>Time: {`${hours}:${mins}:${secs}`}</Text>
                </View>
            </View>

            <Modal transparent={true} visible={stopModal}>
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.stopButton} onPress={stopPressed}>
                        <Text style={styles.stopButtonText}>☐</Text>
                    </TouchableOpacity>
                </View>    
            </Modal>

            <CustomFooter isGo='true' goStartPressedProp={goStartPressed}/>
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
        alignSelf: 'center',
        //marginBottom: 'auto',
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 15,
        margin: 4,
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
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    },
    stopButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height:  67,
        width: 67,
        borderWidth: 5,
        borderRadius: 50,
        borderColor: 'red',
        margin: 7,
    },
    stopButtonText: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default JourneyScreen;