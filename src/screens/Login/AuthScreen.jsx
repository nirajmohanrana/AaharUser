import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const AuthScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [showOTPInput, setShowOTPInput] = useState(false);

  const imgUrl =
    "https://api.dicebear.com/6.x/fun-emoji/svg?seed=Oscar&backgroundColor=059ff2,71cf62,fcbc34,ffdfbf,d1d4f9&backgroundRotation=0&eyes=closed,closed2,cute,sleepClose&mouth=cute,lilSmile,smileLol,smileTeeth,wideSmile";

  const [prompt, setPrompt] = useState(
    "Please Provider Country\nlike +91 for India"
  );
  const [promptStyle, setPromptStyle] = useState({
    fontWeight: 300,
    color: "gray",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPhoneNumber = async () => {
    setIsLoading(true);
    if (!/^\+\d+$/g.test(phoneNumber)) {
      Alert.alert("Please enter a valid phone number with country code.");
      setIsLoading(false);
      return;
    }
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setIsLoading(false);
    setPrompt("Please Enter OTP\nSent to your given number");
    setPromptStyle({
      fontWeight: 500,
      color: "#000",
    });
    setShowOTPInput(true);
  };

  const handleSubmitOTP = async () => {
    try {
      setIsLoading(true);
      await confirm.confirm(otp).then(async () => {
        await auth().currentUser.updateProfile({ displayName: userName });
        await auth().currentUser.updateEmail(email);
      });
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      setIsLoading(true);
      setPrompt("Please Enter Correct OTP\nOr Else Please Try Again");
      setPromptStyle({
        fontWeight: 800,
        color: "#f00",
      });
      setIsLoading(false);
    }
  };

  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.detailsCon}>
      {!showOTPInput && (
        <>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName
                ? userName
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()
                : "आहार"}
            </Text>
          </View>
          <View style={styles.inputCon}>
            <TextInput
              placeholder="Your Name"
              keyboardType="default"
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              maxLength={13}
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
            <TouchableOpacity
              disabled={isLoading || phoneNumber === ""}
              style={styles.submitBtn}
              onPress={handleSubmitPhoneNumber}
            >
              {isLoading ? (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <MaterialCommunityIcons
                    name="dots-circle"
                    size={16}
                    color="#fff"
                  />
                </Animated.View>
              ) : (
                <Text style={styles.submitBtnText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
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
          <TouchableOpacity
            disabled={isLoading || otp === ""}
            style={styles.submitBtn}
            onPress={handleSubmitOTP}
          >
            {isLoading ? (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialCommunityIcons
                  name="dots-circle"
                  size={16}
                  color="#fff"
                />
              </Animated.View>
            ) : (
              <Text style={styles.submitBtnText}>Submit OTP</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {/* Prompts && Errors*/}
      <TouchableOpacity>
        <Text
          style={[
            promptStyle,
            { marginVertical: 10, textAlign: "center", fontSize: 14 },
          ]}
        >
          {prompt}
        </Text>
      </TouchableOpacity>
      {showOTPInput ? (
        <TouchableOpacity
          onPress={() => {
            setShowOTPInput(false);
          }}
        >
          <Text style={{ color: "#00f", textDecorationLine: "underline" }}>
            Go Back
          </Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  detailsCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#f97316",
    width: 80,
    height: 80,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    elevation: 4,
  },
  avatarText: {
    fontWeight: 900,
    fontSize: 30,
    color: "#fff",
    elevation: 4,
  },
  inputCon: {
    width: "75%",
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
