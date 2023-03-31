import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Basket from "./src/screens/Basket/Basket";

import { Provider } from "react-redux";
import store from "./src/store/store";

import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./src/navigations/HomeStack";
import Profile from "./src/screens/Profile/Profile";
import BasketBadge from "./src/components/BasketBadge";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
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
          })}
        >
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Basket" component={Basket} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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
