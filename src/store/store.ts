import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";

const store = configureStore({
    reducer: {
        products: productSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// RootState = "What does my whole Redux store state look like?"

// AppDispatch = "What kind of things am I allowed to send (dispatch) to Redux?"



export default store;
