import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basktet",
  initialState: [],
  reducers: {
    addDish(state, action) {
      const item = action.payload;
      const existingItem = state.find((i) => i.dishId === item.dishId);

      if (existingItem) {
        existingItem.dishCounts = item.dishCounts;
        if (existingItem.dishCounts === 0) {
          const index = state.findIndex(
            (i) => i.dishId === existingItem.dishId
          );
          state.splice(index, 1);
        }
      } else {
        state.push(item);
      }

      console.log("23 Add BasketSlice", state);
    },

    removeDish(state, action) {
      const item = action.payload;
      const index = state.findIndex((i) => i.dishId === item.dishId);
      state.splice(index, 1);
    },

    removeAllDish(state, action) {
      state.splice(0, state.length);
    },
  },
});

export default basketSlice.reducer;
export const { addDish } = basketSlice.actions;
