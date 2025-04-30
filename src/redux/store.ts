import { configureStore } from "@reduxjs/toolkit";
import userData from "./slice/userData";

export default configureStore({
    reducer: {
        userData: userData
    },
})