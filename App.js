import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RasoiDetails from "./src/screens/RasoiDetails/RasoiDetails";

export default function App() {
  return (
    <View style={styles.container}>
      <RasoiDetails />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
