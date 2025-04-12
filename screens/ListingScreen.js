import { StyleSheet, Text, View, TextInput, TextView, Switch, Pressable, Button} from 'react-native';
import {useState} from "react"

// 1. TODO: import the required service  (db, auth, etc) from FirebaseConfig.js
import {db, auth} from "../firebaseConfig"

// 2. TODO: import the specific functions from the service (import ___ from "firebase/firebase auth)
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, addDoc } from "firebase/firestore";


const ListingScreen = ({navigation}) => {
    const [carModel, setCarModel] = useState()
    const [carLicensePlate, setCarLicensePlate] = useState()
    const [carPrice, setCarPrice] = useState()
    const [carPhoto, setCarPhoto] = useState()
    const [city, setCity] = useState()
    const [address, setAddress] = useState()

    const listingPressed = async () => {
        const priceAsNumber = parseFloat(carPrice)

        try {
            // add new listing
            const documentToInsert = {
                ownerID: auth.currentUser.uid, 
                carModel: carModel, 
                licensePlate: carLicensePlate, 
                carPhoto: carPhoto, 
                price: priceAsNumber,
                city: city, 
                address: address, 
                isBooked: false
            }
            await addDoc(collection(db, "Listings"), documentToInsert);

            // reset input field
            setCarModel("");
            setCarLicensePlate("");
            setCarPrice("");
            setCarPhoto("");
            setCity("");
            setAddress("");
            alert("Listing successfully")
            navigation.navigate("My Listings")    
        }
        catch (err){
            console.log("Error when listing")
            console.log(`Error code: ${err.code}`)
            console.log(`Error message: ${err.message}`)
        }

    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Car Model:</Text>
            <TextInput placeholder="Enter Car Model" onChangeText={setCarModel} value={carModel} style={styles.tb}/>
            <Text style={styles.text}>License Plate:</Text>
            <TextInput placeholder="Enter License Plate" onChangeText={setCarLicensePlate} value={carLicensePlate} style={styles.tb}/>
            <Text style={styles.text}>Car Price:</Text>
            <TextInput placeholder="Enter Car Price" onChangeText={setCarPrice} value={carPrice} style={styles.tb}/>
            <Text style={styles.text}>Car Photo:</Text>
            <TextInput placeholder="Enter Car Photo" onChangeText={setCarPhoto} value={carPhoto} style={styles.tb}/>
            <Text style={styles.text}>Address:</Text>
            <TextInput placeholder="Enter Address" onChangeText={setAddress} value={address} style={styles.tb}/>
            <Text style={styles.text}>City:</Text>
            <TextInput placeholder="Enter City" onChangeText={setCity} value={city} style={styles.tb}/>
            <Pressable onPress={listingPressed} style={styles.btn}>
                <Text style={styles.btnLabel}>Listing my Car</Text>
            </Pressable>
        </View>
    )
}

export default ListingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',    
      padding:20,
    },
    text: {
        fontWeight: "bold"
    },
    tb: {
        width:"100%",  
        borderRadius:5,
        backgroundColor:"#efefef",
        color:"#333",
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,      
    }, 
    btn: {
        borderWidth:1,
        borderColor:"#141D21",
        borderRadius:8,
        paddingVertical:10,
        marginVertical:10, 
    },
    darkBtn: {
      borderWidth:1,
      backgroundColor:"#000",    
      borderRadius:8,
      paddingVertical:16,
      marginVertical:8
    },
    btnLabel: {
        fontSize:16,
        textAlign:"center"
    },
});