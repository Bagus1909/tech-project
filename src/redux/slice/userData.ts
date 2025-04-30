import { createSlice } from "@reduxjs/toolkit";


const userData = createSlice({
    name: "userData",
    initialState: {value: false},
    reducers: {
        setUserData: (state, {payload}) => {
            state.value = payload;
        }
    },
})

export const {setUserData} = userData.actions;
export default userData.reducer;