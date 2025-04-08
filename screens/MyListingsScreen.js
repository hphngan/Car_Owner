import { StyleSheet, Text, View, FlatList, Image, Button, Pressable } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const MyListingsScreen = ({navigation}) => {
    const [listings, setListings] = useState();
    const [errorMessage, setErrorMessage] = useState(null);

    /*useEffect(() => {
        getListings();
    }, []);*/

    useFocusEffect(
        React.useCallback(() => {
            getListings();
        }, [])
    ); 

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
              <Button onPress={btnPressed} title="Add New" />
            ),
            headerLeft: () => (
                <Button onPress={logOutPressed} title="Logout" />
            )
          })
     },[navigation])
   

     const logOutPressed = async() => {
        try {
                await signOut(auth)
                alert("LogOut Successfully")
                navigation.navigate("Login Screen")    
            } catch (err) {           
                console.log("Error when doing logout")
                console.log(`Error code: ${err.code}`)
                console.log(`Error message: ${err.message}`)
                setErrorMessageLabel(err.message)
            }  
     }

     const btnPressed = () => {
        navigation.navigate("Create Listings")    
     }

    const getListings = async () => {
        try {
            const userId = auth.currentUser.uid; 
            const q = query(collection(db, "Listings"), where("ownerID", "==", userId));
            const querySnapshot = await getDocs(q);

            const tempListings = [];
            for (const listingDoc of querySnapshot.docs) {
                const listingData = { ...listingDoc.data(), id: listingDoc.id };
                
                if (listingData.isBooked) {
                    const bookingQuery = query(collection(db, "Bookings"), where("listingID", "==", listingDoc.id));
                    const bookingSnapshot = await getDocs(bookingQuery);
                    if (!bookingSnapshot.empty) {
                        const bookingData = bookingSnapshot.docs[0].data();
                        
                        const renterName = await getRenter(bookingData.renterID);
                        listingData.booking = {
                            renterName: renterName, 
                            confirmationCode: bookingData.confirmationCode,
                            renterId: bookingData.renterID, 
                        };
                    }
                }
                tempListings.push(listingData)
            }
            setListings([...tempListings])
            setErrorMessage()
            
        } catch (err) {
            console.log("Error fetching listings:", err);
            setErrorMessage("Failed to load listings. Please try again.");
        }
    };

    const getRenter = async (renterId) => {
        try {
            const userDocSnap = await getDoc(doc(db, "Users", renterId));
            if (userDocSnap.exists()) {
                return userDocSnap.data().name;
            } else {
                return "Unknown"; 
            }
        } catch (err) {
            console.log("Error fetching renter name:", err);
            return "Unknown";
        }
    };

    const cancelBooking = async (listingId, renterId) => {
        try {
            await deleteDoc(doc(db, "Bookings", renterId));
            await updateDoc(doc(db, "Listings", listingId), { isBooked: false });
            getListings();
            
        } catch (err) {
            console.log("Error cancelling booking:", err);
            setErrorMessage("Failed to cancel booking. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            {listings?.length > 0 &&
            <FlatList
                data={listings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.carPhoto }}
                        />
                        <View style={styles.details}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.carModel} ({item.licensePlate})</Text>
                            <Text style={styles.text}>Price: ${item.price}</Text>
                            <Text style={styles.text}>Location: {item.address}, {item.city}</Text>
                            {item.isBooked && item.booking ? (
                                <View>
                                    <Text style={styles.text}>Booked by: {item.booking.renterName}</Text>
                                    <Text style={styles.text}>Confirmation Code: {item.booking.confirmationCode}</Text>
                                    <Button onPress={() => cancelBooking(item.id, item.booking.renterId)} color="red" title='Cancel Booking'></Button>
                                    
                                </View>
                            ) : (
                                <Text style={styles.text}>Status: Available</Text>
                            )}
                        
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator}></View>
                )}
            />}
            {listings?.length == 0 && 
            <Text style={styles.error}>No Listings Available</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    btnCancel: {
        color: "red"
    },
    btn: {
        borderWidth:1,
        borderColor:"#141D21",
        borderRadius:8,
        paddingVertical:8,
        marginVertical:8, 
        backgroundColor: "red", 
    },
    btnLabel: {
        fontSize:16,
        textAlign:"center", 
        color: "white", 
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    details: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginVertical: 2,
    },
    error: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    separator: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 4,
    },
});

export default MyListingsScreen;