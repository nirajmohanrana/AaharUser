import { View, FlatList, Text, TouchableOpacity } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import BasketItem from "./BasketItem";
import { useEffect, useState } from "react";

import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "./styles";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { removeAllDish } from "../../store/slices/basketSlice";

import RazorpayCheckout from "react-native-razorpay";
import { Alert } from "react-native";
import { TextInput } from "react-native";

function Basket({ navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const [rasoiId, setRasoiId] = useState(0);

  const [selectedOption, setSelectedOption] = useState("Cash on delivery");
  const [latLong, setLatLong] = useState(null);
  const [addressLine1, setAddressLine1] = useState(null);
  const [formattedAddress, setFormattedAddres] = useState(null);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const basketItems = useSelector((state) => {
    return state.basket;
  });

  const dispatch = useDispatch();

  const GOOGLE_MAPS_APIKEY = "AIzaSyBqXPoD7q3vpxLtnMpclh4u0GLXcUjmlvw";

  useEffect(() => {
    let newTotal = 0;
    let rasoiIds = [];
    basketItems.forEach((basketItem) => {
      rasoiIds.push(basketItem.rasoiId);
      newTotal += basketItem.dishCounts * basketItem.dishPrice;
    });

    setTotalPrice(newTotal);
    setRasoiId(rasoiIds[0]);
  }, [basketItems]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const options = ["Pay Now", "Cash on delivery"];

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    console.log(user);
    setUser(user);

    return subscriber;
  }, [user]);

  async function handlePayment() {
    const ordersRef = firestore().collection("orders");
    if (formattedAddress == "" && latLong === null) {
      Alert.alert("Please Provide Address Details");
      return;
    }

    if (selectedOption === "Cash on delivery") {
      ordersRef
        .add({
          userId: user.uid,
          rasoiId: rasoiId,
          basketItems: basketItems,
          userLocation: latLong,
          userFormattedAddress: addressLine1 + " " + formattedAddress,
          paymentMode: "Cash On Delivery",
          orderStatus: 0,
        })
        .then((order) => {
          ordersRef.doc(order.id).update({ orderId: order.id });

          dispatch(removeAllDish());
          navigation.navigate("Profile");
        });
    } else if (selectedOption === "Pay Now") {
      var options = {
        description: "Credits towards consultation",
        image: "https://gdurl.com/0PTl",
        currency: "INR",
        key: "rzp_test_Rvjdz8Ti7D3bKs",
        amount: totalPrice * 100,
        name: user.displayName,
        order_id: "",
        prefill: {
          email: user.email,
          contact: user.phoneNumber,
          name: user.displayName,
        },
        theme: { color: "#f97316" },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          console.log("data", data);
          ordersRef
            .add({
              userId: user.uid,
              rasoiId: rasoiId,
              basketItems: basketItems,
              userLocation: latLong,
              userFormattedAddress: addressLine1 + " " + formattedAddress,
              paymentMode: "Paid Online",
              orderStatus: 0,
            })
            .then((order) => {
              console.log(order.id);
              ordersRef.doc(order.id).update({ orderId: order.id });

              dispatch(removeAllDish());
              navigation.navigate("Profile");
            });
        })
        .catch((error) => {
          // handle failure.
          Alert.alert(
            "Payment Unsuccessful",
            `Your payment was not successful. Please try again later.\n\n ${error.error.description}`,
            [
              {
                text: `Error Code: ${error.code}`,
                style: "ok",
              },
              {
                text: `Cancel`,
                style: "cancel",
              },
            ],
            {
              titleStyle: { color: "red", fontSize: 20, fontWeight: "bold" },
              messageStyle: { fontSize: 16, marginBottom: 10 },
              containerStyle: {
                borderWidth: 2,
                borderColor: "red",
                borderRadius: 10,
                padding: 10,
              },
            }
          );
        });
    } else return;
  }

  return (
    <>
      <View style={{ height: "88%" }}>
        {basketItems.length > 0 ? (
          <>
            <View style={{ height: "40%" }}>
              <FlatList
                data={basketItems}
                renderItem={({ item }) => <BasketItem dish={item} />}
                keyExtractor={(item) => item.dishId}
                ListFooterComponent={() => <View style={{ height: 50 }} />}
              />
            </View>

            <TextInput
              placeholder="Address Line 1"
              keyboardType="default"
              value={addressLine1}
              onChangeText={setAddressLine1}
              style={styles.input}
            />

            <GooglePlacesAutocomplete
              placeholder="Where to Deliver"
              query={{ key: GOOGLE_MAPS_APIKEY, language: "en" }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
              enablePoweredByContainer={false}
              fetchDetails={true}
              onPress={(data, details = null) => {
                setFormattedAddres(
                  data.description + details.formatted_address
                );
                setLatLong(details.geometry.location);
              }}
            />

            <View style={styles.totalCon}>
              <Text style={{ fontSize: 16 }}>Total</Text>
              <Text style={{ fontSize: 18, fontWeight: 900, color: "#f97316" }}>
                ₹ {totalPrice}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 10,
              }}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleOptionSelect(option)}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOptionButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      selectedOption === option &&
                        styles.selectedOptionButtonText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyBasketCon}>
            <Feather name="shopping-bag" size={125} color="black" />
            <Text style={styles.emptyTitle}>Your Basket is Empty</Text>
            <Text style={styles.emptySubitle}>
              add food items from your favourite rasoi ghar
            </Text>
          </View>
        )}
      </View>
      <View style={styles.bottomBtns}>
        <TouchableOpacity
          style={styles.resIcon}
          onPress={() => {
            navigation.navigate("Rasoi Ghar");
          }}
        >
          <Ionicons name="restaurant" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.payBtn,
            { backgroundColor: basketItems.length === 0 ? "gray" : "#000" },
          ]}
          onPress={() => {
            handlePayment();
          }}
          disabled={basketItems.length === 0 ? true : false}
        >
          <Text style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>
            Proceed To Pay{totalPrice ? " ₹" + totalPrice : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Basket;
