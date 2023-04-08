import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";

const AuthScreen = ({ navigation }) => {
  function handleGoogleSignIn() {}

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
