import { StyleSheet, Text, View, TextInput, TextView, Switch, Pressable} from 'react-native';
import {useState, useEffect} from "react"

// 1. TODO: import the required service  (db, auth, etc) from FirebaseConfig.js
import {db, auth} from "../firebaseConfig"

// 2. TODO: import the specific functions from the service (import ___ from "firebase/firebase auth)
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const LoginScreen = ({navigation}) => {

   // form fields
   const [emailFromUI, setEmailFromUI] = useState("test@test.com")
   const [passwordFromUI, setPasswordFromUI] = useState("testOwner")
   const [errorMessageLabel, setErrorMessageLabel] = useState()

   useEffect(()=>{
        navigation.setOptions({
            headerLeft: () => null
          })
    },[navigation])

   const loginPressed = async () => {
      try {
          await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI)
          //alert("Account created")
          navigation.navigate("Home")    
      } catch (err) {           
          console.log("Error when doing login")
          console.log(`Error code: ${err.code}`)
          console.log(`Error message: ${err.message}`)
          setErrorMessageLabel(err.message)
      }  
   }

  return(
      <View style={styles.container}> 
           <Text style={styles.heading}>Welcome to Car Owner App!</Text>
           <Text style={styles.text}>Login</Text>
           {/* email tb */}
           <TextInput placeholder="Enter email" onChangeText={setEmailFromUI} value={emailFromUI} style={styles.tb}/>
        
           {/* password tb */}
           <TextInput placeholder="Enter password" onChangeText={setPasswordFromUI} value={passwordFromUI} style={styles.tb}/>

           {/* button */}
           <Pressable onPress={loginPressed} style={styles.btn}>
               <Text style={styles.btnLabel}>Login</Text>
           </Pressable>

           <Text>{errorMessageLabel}</Text>
      </View>
  )
}
export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    padding:20,
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
      paddingVertical:8,
      marginVertical:8, 
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
  error: {
       fontSize:16,
       textAlign:"center",
       color:"blue"
  },
  heading : {
    fontSize:20,
    textAlign:"center",
  },
  text : {
    fontSize:18,
    marginVertical:8,
  }
});
