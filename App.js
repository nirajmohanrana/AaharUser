import RasoiDetails from "./src/screens/RasoiDetails/RasoiDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RasoiList from "./src/screens/RasoiList/RasoiList";
import { Provider } from "react-redux";

import store from "./src/store/store";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Rasoi Ghar">
          <Stack.Screen name="Rasoi Ghar" component={RasoiList} />
          <Stack.Screen name="Rasoi Details" component={RasoiDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
