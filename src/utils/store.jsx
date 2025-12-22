import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice.jsx"
import searchSlice from "./searchSlice.jsx"
const store = configureStore({
    reducer:
    {
        app: appSlice,
        search: searchSlice,
    }
});

export default store;