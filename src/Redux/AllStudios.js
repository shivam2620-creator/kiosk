import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studios: [],

};
const allStudiosSlice = createSlice({
    name: "studios",
    initialState,
    reducers: {
        setAllStudios: (state, action) => {
            state.studios = action.payload;
        },

        resetStudios: () => initialState 
    }
});

export const { setAllStudios, resetStudios } = allStudiosSlice.actions;
export default allStudiosSlice.reducer;