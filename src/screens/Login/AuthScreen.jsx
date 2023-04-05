import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const AuthScreen = ({ navigation }) => {
  function onPress() {
    navigation.navigate("AddDetails");
  }

  return (
    <View style={styles.authCon}>
      <TouchableOpacity
        style={[styles.btnCon, { backgroundColor: "#fff" }]}
        onPress={() => {
          onPress();
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
          onPress();
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
