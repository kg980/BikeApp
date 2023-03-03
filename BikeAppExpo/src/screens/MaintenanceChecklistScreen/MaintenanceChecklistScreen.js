import React , {useState} from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, Keyboard} from 'react-native';
import CustomButton from "../../components/CustomButton";
import CustomBanner from "../../components/CustomBanner";
import CustomFooter from "../../components/CustomFooter";
import ChecklistCard from "../../components/ChecklistCard";
import DeleteIcon from "../../../assets/images/DeleteIcon.png";


//screen for distance tracker and navigation buttons

const MaintenanceChecklistScreen = () => {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]); //state for an ARRAY, hence [] in the brackets.

    const addTaskPressed = () => { 
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]) //puts out everything that was in taskItems as a new array, and appends the new task to it.
        setTask(null); //clears the textInput box after you've appended the item to the array.
    }

    const deleteTask = (index) => {
        let itemsCopy = [...taskItems]; //creates a copy of the original task list array
        itemsCopy.splice(index, 1); //removes item at {index}
        setTaskItems(itemsCopy); //replace original array with the copy, which is missing the deleted item.
    }




    return (
        <View style={styles.root}>
            <CustomBanner text='Maintenance Checklist'/>
            
            {/* Tasks */}
            <ScrollView>    
                <View style={styles.content}>
                    {/*MANDATORY TASKS*/}
                    <ChecklistCard
                        Task="Tyre Pressure"
                        Info="IHJGOIRESHGSFDLIGHVNEIGHWEWIOGVNESLKGJHNITUHNGLTHGVJRIWNJHVTWRHVINVIWNVW"
                    />

                    {/*user-made CUSTOM TASKS*/}
                    {
                        taskItems.map((item, index) => {  //iterate through the taskItems array, for each item render a task card
                            
                            let deleteButton = 
                            <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                                <Image source={DeleteIcon} style={styles.icons}/>
                            </TouchableOpacity>;

                            return <ChecklistCard Task={item} isCustom='true' DeleteButton={deleteButton}/>
                        })
                    }
                </View>
            </ScrollView>

            {/* user-added tasks */}

        
            <KeyboardAvoidingView
                behavior="height"
                style={styles.writeTaskDivider}
            >
                <View style={styles.writeTaskContainer}>
                    <TextInput style={styles.TaskInputText} placeholder={'Add a task'} value={task} onChangeText={text => setTask(text)}/>
                </View>
                
                <TouchableOpacity onPress={() => addTaskPressed()} style={styles.addButton}><Text style={styles.addButtonText}>+</Text></TouchableOpacity>

            </KeyboardAvoidingView>

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
    writeTaskDivider: {
        display: 'flex',
        flexDirection: 'row',
        //backgroundColor: 'red',
        alignItems: 'stretch',
        height: '8%',
    },
    writeTaskContainer: {
        //backgroundColor: 'red',
        borderRadius: 10,
        borderColor: '#EDEDED',
        //backgroundColor: '#EDEDED',
        borderWidth: 1,
        padding: '3%',
        //height: '100%',
        flex: 8,
    },
    TaskInputText:  {
        padding: '2%',
        fontSize: 16,
    },
    addButton: {
        borderRadius: 10,
        borderColor: '#EDEDED',
        borderWidth: 1,
        padding: '3%',
        flex: 1,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        padding: '2%',
        //backgroundColor: 'red',
    },
    icons: {
        height: 20,
        width: 20,
        marginHorizontal: '2%',
    },
});

export default MaintenanceChecklistScreen;