import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./slices/basketSlice";

const store = configureStore({
  reducer: {
    basket: basketSlice,
  },
});

export default store;
