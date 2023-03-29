import { Image, Text, View } from "react-native";
import styles from "./styles";

function RasoiHeader({ rasoi }) {
  return (
    <View style={styles.page}>
      <View>
        <Image
          source={require("../../../assets/restaurant1.jpeg")}
          style={styles.image}
        />
        {rasoi ? (
          <Image source={{ uri: rasoi.rasoiLogo }} style={styles.logo} />
        ) : (
          ""
        )}
      </View>
      <View style={styles.container}>
        <View style={{ borderBottomWidth: 0.3, paddingBottom: 2 }}>
          <Text style={styles.title}>{rasoi ? rasoi.rasoiName : "Hi"}</Text>
          <Text style={styles.subtitle}>
            {rasoi ? rasoi.locality : "Hi"} &#8226;
            {rasoi ? rasoi.city : "j"}
          </Text>
        </View>

        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
}

export default RasoiHeader;
