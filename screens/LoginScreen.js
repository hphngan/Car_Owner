import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [emailFromUI, setEmailFromUI] = useState("");
  const [passwordFromUI, setPasswordFromUI] = useState("");
  const [errorMessageLabel, setErrorMessageLabel] = useState("Error messages go here");

  const loginPressed = async () => {
    console.log("Attempting to login");

    try {
      await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI);
      checkLoginStatus();
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Invalid email or password");
      setErrorMessageLabel(err.message);
    }
  };

  const logoutPressed = async () => {
    auth.signOut();
    alert("User is logged out!");
  };

  const checkLoginStatus = () => {
    // if user is logged in, then this will contain an object
    // if no one is logged in, then thsi will be null
    console.log(auth.currentUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Turo Car Owner!</Text>
      <Text style={styles.text}>Login</Text>
      {/* email tb */}
      <TextInput
        placeholder="Enter email"
        autoCapitalize="none"
        onChangeText={setEmailFromUI}
        value={emailFromUI}
        style={styles.tb}
      />

      {/* password tb */}
      <TextInput
        placeholder="Enter password"
        onChangeText={setPasswordFromUI}
        autoCapitalize="none"
        secureTextEntry={true}
        value={passwordFromUI}
        style={styles.tb}
      />

      {/* button */}

      <Pressable onPress={loginPressed} style={[styles.btn, { backgroundColor: "yellow" }]}>
        <Text style={styles.btnLabel}>Login</Text>
      </Pressable>

      {errorMessageLabel === null ? <Text>{errorMessageLabel}</Text> : ""}
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  tb: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#efefef",
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#141D21",
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 8,
  },
  btnLabel: {
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    fontSize: 16,
    textAlign: "center",
    color: "blue",
  },
  heading: {
    fontSize: 25,
    fontWeight: 700,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
  },
});
