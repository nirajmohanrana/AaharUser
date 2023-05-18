import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import styles from "./styles";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import CurrentOrderModal from "./CurrentOrderModal";

function Profile() {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [orders, setOrders] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressStatusText, setProgressStatusText] = useState("");

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    setUserId(user.uid);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return () => {
      subscriber();
    };
  }, []);

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

  useEffect(() => {
    const OrdersRef = firestore().collection("orders");

    const unsubscribe = OrdersRef.onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const ordersTemp = [];

        querySnapshot.forEach((user) => {
          ordersTemp.push(user.data());
        });

        const ordersTemp2 = [];

        ordersTemp.forEach((order) => {
          if (order.userId === userId) {
            ordersTemp2.push(order);
          }
        });

        console.log("orderTemp2", ordersTemp2);
        setUserLocation(ordersTemp2[0].userLocation);
        console.log("ordersTemp2[0].orderStatus", ordersTemp2[0].orderStatus);
        const orderStatusProgress = ordersTemp2[0].orderStatus * 0.2;
        setProgress(orderStatusProgress);
        setOrders(ordersTemp2);
      },
    });

    function progressText() {
      switch (progress) {
        case 0.0:
          setProgressStatusText("Order Placed");
          break;

        case 0.2:
          setProgressStatusText("Order Confirmed By Rasoi");
          break;

        case 0.4:
          setProgressStatusText("Delivery Proffesional Accepted Your Request");
          break;

        case 0.6:
          setProgressStatusText("Order Received By Delivery Professional");
          break;

        case 0.8:
          setProgressStatusText(
            "Order Received Confirmation By Delivery Professional"
          );
          break;

        case 1:
          setProgressStatusText("Order Delivered");
          break;

        default:
          break;
      }
    }

    return () => {
      unsubscribe();
      progressText();
    };
  }, [userId]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      {/* PROFILE HEADER */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user
              ? user.displayName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()
              : "आहार"}
          </Text>
        </View>
        <View style={styles.profileDetails}>
          <Text style={{ fontSize: 22, fontWeight: 700 }}>
            {user?.displayName}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>
            {user?.phoneNumber}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{user?.email}</Text>
        </View>
        {/* <TouchableOpacity>
          <Feather
            name="edit-3"
            size={18}
            color="#f97316"
            style={{ marginTop: 16 }}
          />
        </TouchableOpacity> */}
      </View>

      <ScrollView style={{ padding: 10 }}>
        {/* CURRENT ORDER PROGRESS */}
        <View style={styles.currentOrder}>
          {/* CURRENT ORDER HEADER */}
          <View style={styles.currentOrderHeader}>
            <TouchableOpacity onPress={handleOpenModal}>
              <Text style={styles.currentOrderText}>
                Current Order Progress
              </Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 300 }}>
              Progress: <Text>{progressStatusText}</Text>
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
                latitude: userLocation ? userLocation.lat : 19.445727,
                longitude: userLocation ? userLocation.long : 72.80533,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
              provider={PROVIDER_GOOGLE}
            />
            {/* <MapViewDirections
                origin={origin}
                destination={destination}
                // apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#f97316"
              /> */}
            {/* </MapView> */}
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
      <CurrentOrderModal
        visible={modalVisible}
        onClose={handleCloseModal}
        orders={orders}
      />
    </View>
  );
}

export default Profile;
