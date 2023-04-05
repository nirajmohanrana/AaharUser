import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";

const AddDetails = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState("");

  const handleSubmitPhoneNumber = () => {
    setShowOTPInput(true);
  };

  const handleSubmitOTP = () => {
    setShowOTPInput(false);
  };

  return (
    <View style={styles.detailsCon}>
      {!showOTPInput && (
        <View style={styles.phoneCon}>
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            maxLength={10}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
          <Pressable style={styles.submitBtn} onPress={handleSubmitPhoneNumber}>
            <Text>Submit Number</Text>
          </Pressable>
        </View>
      )}
      {showOTPInput && (
        <View style={styles.otpCon}>
          <TextInput
            placeholder="OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOTP}
            style={styles.input}
          />
          <Pressable style={styles.submitBtn} onPress={handleSubmitOTP}>
            <Text>Submit OTP</Text>
          </Pressable>
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
});
