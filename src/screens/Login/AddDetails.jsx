import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Please enter a valid email.");
      setIsLoading(false);
      return;
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
      <View style={styles.inputCon}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Address"
            keyboardType="default"
            value={address}
            onChangeText={setAddress}
            style={[
              styles.input,
              {
                flexGrow: 1,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              },
            ]}
          />
          <View
            style={{
              backgroundColor: "#fff",
              borderBottomRightRadius: 15,
              borderTopRightRadius: 15,
              height: 40,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <FontAwesome5 name="search-location" size={24} color="#f97316" />
          </View>
        </View>
        <TouchableOpacity
          disabled={isLoading || email === "" || address === ""}
          style={styles.submitBtn}
          onPress={handleSubmit}
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
            <Text style={styles.submitBtnText}>Submit Number</Text>
          )}
        </TouchableOpacity>
      </View>
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
