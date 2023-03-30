import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basktet",
  initialState: [],
  reducers: {
    addDish(state, action) {
      const item = action.payload;
      const existingItem = state.find((i) => i.dishId === item.dishId);

      if (existingItem) {
        existingItem.dishCount += item.dishCount;
      } else {
        state.push(item);
      }
    },

    removeDish(state, action) {},

    removeAllDish(state, action) {},
  },
});

export default basketSlice.reducer;
export const { addDish } = basketSlice.actions;
