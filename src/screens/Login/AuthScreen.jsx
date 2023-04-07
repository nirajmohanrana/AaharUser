import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";

const AuthScreen = ({ navigation }) => {
  function handleGoogleSignIn() {
    console.log("first");
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
    });
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  }

  return (
    <View style={styles.authCon}>
      <TouchableOpacity
        style={[styles.btnCon, { backgroundColor: "#fff" }]}
        onPress={() => {
          handleGoogleSignIn();
        }}
      >
        <AntDesign name="google" size={20} color="#000" />
        <Text style={{ fontSize: 16, fontWeight: 700 }}>
          Sign In With Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnCon, { backgroundColor: "#4267B2" }]}
        onPress={() => {
          handleFacebookSignIn();
        }}
      >
        <AntDesign name="facebook-square" size={20} color="#fff" />
        <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
          Sign In With Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  authCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCon: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 10,
    borderWidth: 1,
    borderRadius: 20,
    elevation: 4,
  },
});
