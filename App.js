import RasoiDetails from "./src/screens/RasoiDetails/RasoiDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RasoiList from "./src/screens/RasoiList/RasoiList";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import store from "./src/store/store";
import Basket from "./src/screens/Basket/Basket";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="Rasoi Ghar">
        <Stack.Screen name="Rasoi Ghar" component={RasoiList} />
        <Stack.Screen name="Rasoi Details" component={RasoiDetails} />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Orders") {
                iconName = focused ? "receipt" : "receipt-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Basket" component={Basket} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
