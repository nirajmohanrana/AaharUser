import { View, FlatList } from "react-native";

import { useSelector } from "react-redux";
import BasketItem from "./BasketItem";

function Basket() {
  const basketItems = useSelector((state) => {
    return state.basket;
  });

  return (
    <View>
      <FlatList
        data={basketItems}
        renderItem={({ item }) => <BasketItem dish={item} />}
        keyExtractor={(item) => {
          item.id;
        }}
      />
    </View>
  );
}

export default Basket;
