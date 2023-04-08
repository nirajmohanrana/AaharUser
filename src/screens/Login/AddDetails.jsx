import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import auth from "@react-native-firebase/auth";

const AddDetails = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleSubmitPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setShowOTPInput(true);
  };

  const handleSubmitOTP = async () => {
    try {
      await confirm.confirm(otp);
      console.log("ho gaya bhai");
    } catch (error) {
      console.log(error);
      console.log("Invalid code.");
    }
  };

  useEffect(() => {
    console.log("Phone Number\n", phoneNumber);
    console.log("OTP\n", otp);
    console.log("confirm\n", confirm);
  }, [phoneNumber, otp, confirm]);

  return (
    <View style={styles.detailsCon}>
      {!showOTPInput && (
        <View style={styles.inputCon}>
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            maxLength={13}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmitPhoneNumber}
          >
            <Text style={styles.submitBtnText}>Submit Number</Text>
          </TouchableOpacity>
        </View>
      )}
      {showOTPInput && (
        <View style={styles.inputCon}>
          <TextInput
            placeholder="OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOTP}
            style={styles.input}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitOTP}>
            <Text style={styles.submitBtnText}>Submit OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddDetails;

const styles = StyleSheet.create({
  detailsCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputCon: {
    width: "70%",
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 15,
  },
  submitBtn: {
    marginVertical: 10,
    backgroundColor: "#f97316",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
  },
});
