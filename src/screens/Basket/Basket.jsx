import { View, FlatList, Text, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import BasketItem from "./BasketItem";
import { useEffect, useState } from "react";

import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "./styles";

import Geolocation from "react-native-geolocation-service";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

function Basket({ navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);

  const basketItems = useSelector((state) => {
    return state.basket;
  });

  useEffect(() => {
    let newTotal = 0;
    basketItems.forEach((basketItem) => {
      newTotal += basketItem.dishCounts * basketItem.dishPrice;
    });

    setTotalPrice(newTotal);
  }, [basketItems]);

  useEffect(() => {
    Geolocation.requestAuthorization("whenInUse").then((result) => {
      console.log("Authorization result:", result);
    });
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("Current position:", position);
        setCurrentLocation(position.coords);
      },
      (error) => {
        console.log("Error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <>
      <View style={{ height: "88%" }}>
        {basketItems.length > 0 ? (
          <>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* AUTOCOMPLETE */}

              <View style={{ flex: 1 }}>
                {currentLocation && (
                  <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={2}
                    autoFocus={false}
                    returnKeyType="search"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      console.log(data, details);
                    }}
                    query={{
                      key: "YOUR_API_KEY",
                      language: "en",
                      components: "country:us",
                      location: `${currentLocation.latitude},${currentLocation.longitude}`,
                      radius: 10000,
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: "rgba(0,0,0,0)",
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: "#5d5d5d",
                        fontSize: 16,
                      },
                      predefinedPlacesDescription: {
                        color: "#1faadb",
                      },
                    }}
                    currentLocation={true}
                    currentLocationLabel="Current location"
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={200}
                  />
                )}
              </View>
            </View>
            <View style={styles.totalCon}>
              <Text style={{ fontSize: 16 }}>Total</Text>
              <Text style={{ fontSize: 18, fontWeight: 900, color: "#f97316" }}>
                ₹ {totalPrice}
              </Text>
            </View>
            <FlatList
              data={basketItems}
              renderItem={({ item }) => <BasketItem dish={item} />}
              keyExtractor={(item) => item.dishId}
              ListFooterComponent={() => <View style={{ height: 100 }} />}
            />
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
