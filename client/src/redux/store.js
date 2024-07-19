import { configureStore } from "@reduxjs/toolkit";
import authReducer from "D:/Projects/tasktrekkk/client/src/slices/authSlice.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        
    },
});

export default store;
