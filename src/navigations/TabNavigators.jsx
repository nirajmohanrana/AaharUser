import { StyleSheet, View } from "react-native";

import HomeStack from "../navigations/HomeStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import Profile from "../screens/Profile/Profile";
import BasketBadge from "../components/BasketBadge";
import Basket from "../screens/Basket/Basket";
import { useState } from "react";
import Login from "../screens/Login/Login";

function TabNavigators() {
  const [bottomOffset, setBottomOffset] = useState(10);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName, size, style;

          if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
            size = 26;
          } else if (route.name === "Home") {
            iconName = focused ? "restaurant" : "restaurant-outline";
            size = 35;
            color = focused ? "white" : "#f97316";
            style = {
              top: -20,
              width: 60,
              height: 60,
              borderRadius: 50,
              backgroundColor: focused ? "#f97316" : "white",
              padding: 10,

              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              justifyContent: "center",
              alignItems: "center",
            };
          } else if (route.name === "Basket") {
            iconName = focused ? "cart" : "cart-outline";
            size = 24;
          }

          return (
            <View style={style}>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Basket" ? <BasketBadge /> : ""}
            </View>
          );
        },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tabStyle },
        tabBarHideOnKeyboard: true,
        headerShown: route.name === "Home" ? false : true,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="Basket"
        component={Basket}
        options={{ tabBarStyle: { display: "none" } }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,

    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    backgroundColor: "#fff",
    borderRadius: 15,
    height: 50,
  },
});

export default TabNavigators;
