import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import MapView from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import styles from "./styles";
import MapViewDirections from "react-native-maps-directions";

function Profile() {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const progress = 0.57;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const origin = { latitude: 19.464936, longitude: 72.8039986 };
  const destination = { latitude: 19.4453727, longitude: 72.8052631 };
  const waypoint = { latitude: 19.4645314, longitude: 72.8061443 };

  const GOOGLE_MAPS_APIKEY = "AIzaSyBqXPoD7q3vpxLtnMpclh4u0GLXcUjmlvw";

  return (
    <View>
      {/* PROFILE HEADER */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png",
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={{ fontSize: 18, fontWeight: 700 }}>Niraj Rana</Text>
          <Text style={{ fontSize: 12, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit facere
            adipisci sequi blanditiis tempore.
          </Text>
        </View>
        <TouchableOpacity>
          <Feather
            name="edit-3"
            size={18}
            color="#f97316"
            style={{ marginTop: 16 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 10 }}>
        {/* CURRENT ORDER PROGRESS */}
        <View style={styles.currentOrder}>
          {/* CURRENT ORDER HEADER */}
          <View style={styles.currentOrderHeader}>
            <Text style={styles.currentOrderText}>Current Order Progress</Text>
            <Text style={{ fontWeight: 300 }}>
              Progress: Currently at Rasoi
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View style={[styles.progress, { width }]} />
              </View>
            </View>
          </View>

          {/* CURRENT ORDER MAP */}
          <View style={styles.currentOrderMap}>
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: 19.445727,
                longitude: 72.80533,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
            >
              {/* <MapViewDirections
                origin={origin}
                destination={destination}
                // apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#f97316"
              /> */}
            </MapView>
          </View>

          {/* CURRENT ORDER FOOTER */}
          <View style={styles.currentOrderFooter}>
            <TouchableOpacity style={styles.callBtn}>
              <Feather name="phone-call" size={16} color="#fff" />
              <Text style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>
                Call Delivery Professional
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* LINK TO ORDER HISTORY */}
        <TouchableOpacity style={styles.previousOrderHistoryBtn}>
          <Text style={{ fontWeight: 700, fontSize: 14, color: "#f97316" }}>
            See all your Previous Orders
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Profile;
