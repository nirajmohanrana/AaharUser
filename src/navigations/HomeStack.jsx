import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RasoiDetails from "../screens/RasoiDetails/RasoiDetails";
import RasoiList from "../screens/RasoiList/RasoiList";
import Basket from "../screens/Basket/Basket";
import Login from "../screens/Login/Login";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Rasoi Ghar">
      <Stack.Screen name="Rasoi Ghar" component={RasoiList} />
      <Stack.Screen name="Rasoi Details" component={RasoiDetails} />
      <Stack.Screen name="Basket" component={Basket} />
    </Stack.Navigator>
  );
};

export default HomeStack;
