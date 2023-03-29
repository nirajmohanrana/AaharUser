import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function DishItem({ dish }) {
  return (
    <Pressable style={styles.container}>
      {dish && <Image source={{ uri: dish.dishImgUrl }} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish ? dish.dishName : ""}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish ? dish.dishDesc : ""}
        </Text>
        <Text style={styles.price}>₹{dish ? dish.dishPrice : ""}</Text>
      </View>
      <View style={styles.add}>
        <MaterialIcons name="add-circle-outline" size={24} color="#f97316" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 5,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
    aspectRatio: 1,
    marginHorizontal: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#f97316",
  },
  add: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default DishItem;
