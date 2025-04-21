import reducer from "./treeReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: reducer
})