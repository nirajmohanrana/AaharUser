import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/Ionicons";

function RasoiCard({ rasoi, navigation }) {
  function onPress() {
    navigation.navigate("Rasoi Details", { rasoi });
  }

  return (
    <Pressable style={styles.rasoiContainer} onPress={onPress}>
      <Image
        source={require("../../../assets/restaurant1.jpeg")}
        style={styles.image}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,0.2)", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      />
      <View style={styles.row}>
        <Image source={{ uri: rasoi.rasoiLogo }} style={styles.logo} />
        <View>
          <Text style={styles.title}>{rasoi.rasoiName}</Text>
          <Text style={styles.subtitle}>
            {rasoi.locality} &#8226; {rasoi.city}
          </Text>
        </View>

        <View style={styles.rating}>
          <Text
            style={{
              color: "#f97316",
              fontWeight: 700,
            }}
          >
            <AntDesign name="star" size={15} color="#f97316" />4
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default RasoiCard;

const styles = StyleSheet.create({
  rasoiContainer: {
    width: "100%",
    height: 200,
    marginHorizontal: "auto",
    borderRadius: 15,
    marginVertical: 10,
    position: "relative",
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 0,
    left: 0,
  },
  image: {
    width: "100%",
    height: 240,
    aspectRatio: 5 / 3,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    resizeMode: "contain",
  },
  row: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    bottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 900,
    marginVertical: 2,
    color: "#f97316",
  },
  subtitle: {
    color: "#fff",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    marginRight: 20,
    padding: 2,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
});
